"use client";

import { motion } from "framer-motion";
import { PhoneCall } from "lucide-react";
import Script from "next/script";
import { useCallback, useEffect, useMemo, useState } from "react";

const SELF_SELL_WIDGET_ID = "69a7bdf999dd5635833c8454";
const SELF_SELL_HOST_ID = "hero-self-sell-widget";

type CallState = "idle" | "connecting" | "live" | "error";

const sleep = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));

const waitForValue = async <T,>(finder: () => T | null, timeoutMs = 6000, stepMs = 120): Promise<T | null> => {
    const deadline = Date.now() + timeoutMs;
    while (Date.now() < deadline) {
        const value = finder();
        if (value) return value;
        await sleep(stepMs);
    }
    return null;
};

export function SelfSellVoiceOrb() {
    const [callState, setCallState] = useState<CallState>("idle");
    const [isWidgetReady, setIsWidgetReady] = useState(false);
    const [isBusy, setIsBusy] = useState(false);
    const [hasCalledOnce, setHasCalledOnce] = useState(false);
    const [isPrewarmed, setIsPrewarmed] = useState(false);

    const getWidgetHost = useCallback(() => {
        const selector = [
            `chat-widget[widget-id="${SELF_SELL_WIDGET_ID}"]`,
            `chat-widget[data-widget-id="${SELF_SELL_WIDGET_ID}"]`,
            `chat-widget#${SELF_SELL_HOST_ID}-script`,
            `chat-widget#${SELF_SELL_HOST_ID}`,
        ].join(", ");

        return document.querySelector(selector) as HTMLElement | null;
    }, []);

    const getWidgetRoot = useCallback(() => {
        return getWidgetHost()?.shadowRoot ?? null;
    }, [getWidgetHost]);

    const getTalkButton = useCallback((root: ShadowRoot | null) => {
        if (!root) return null;
        return root.querySelector(
            "ion-button.lc_text-widget--voice-talk-button, .lc_text-widget--voice-talk-button"
        ) as HTMLElement | null;
    }, []);

    const applyWidgetStyles = useCallback(() => {
        const target = getWidgetHost();
        if (!target?.shadowRoot) return false;

        target.style.position = "fixed";
        target.style.left = "-9999px";
        target.style.top = "-9999px";
        target.style.width = "1px";
        target.style.height = "1px";
        target.style.opacity = "0";
        target.style.pointerEvents = "none";
        target.style.zIndex = "-1";

        const root = target.shadowRoot;
        const styleId = `${SELF_SELL_HOST_ID}-voice-style`;
        if (!root.getElementById(styleId)) {
            const style = document.createElement("style");
            style.id = styleId;
            style.textContent = `
                #lc_text-widget--btn,
                .lc_text-widget--prompt,
                .lc_text-widget_prompt--msg-bubble {
                    display: none !important;
                    visibility: hidden !important;
                    opacity: 0 !important;
                    pointer-events: none !important;
                }

                #lc_text-widget--box {
                    width: 1px !important;
                    height: 1px !important;
                    min-height: 0 !important;
                    opacity: 0 !important;
                    pointer-events: none !important;
                    overflow: hidden !important;
                    transform: scale(0.9) !important;
                }
            `;
            root.appendChild(style);
        }

        return true;
    }, [getWidgetHost]);

    const syncCallState = useCallback(() => {
        const root = getWidgetRoot();
        if (!root) return;

        const statusText =
            root.querySelector(".lc_text-widget--voice-status-text")?.textContent?.trim().toLowerCase() ?? "";
        const callStatus = root.querySelector(".lc_text-widget--voice-call-status")?.textContent?.trim().toLowerCase() ?? "";

        if (statusText.includes("connecting")) {
            setCallState("connecting");
            return;
        }

        if (statusText.includes("talking")) {
            setCallState("live");
            setHasCalledOnce(true);
            return;
        }

        if (callStatus.includes("call ended")) {
            setCallState("idle");
            return;
        }

        if (!statusText && !callStatus) {
            setCallState("idle");
        }
    }, [getWidgetRoot]);

    const prewarmWidget = useCallback(async () => {
        if (isPrewarmed) return;

        try {
            applyWidgetStyles();
            const root = await waitForValue(() => getWidgetRoot(), 3500, 70);
            if (!root) return;

            const statusText =
                root.querySelector(".lc_text-widget--voice-status-text")?.textContent?.trim().toLowerCase() ?? "";
            if (statusText.includes("connecting") || statusText.includes("talking")) {
                const endButton = root.querySelector("ion-button.lc_text-widget--voice-end-call-btn") as HTMLElement | null;
                endButton?.click();
                await sleep(120);
            }

            setIsWidgetReady(true);
            setIsPrewarmed(true);
        } catch {
            // Best-effort warmup only.
        }
    }, [applyWidgetStyles, getWidgetRoot, isPrewarmed]);

    const startCall = useCallback(async () => {
        if (isBusy) return;
        setIsBusy(true);
        setCallState("connecting");

        try {
            applyWidgetStyles();
            const root = await waitForValue(() => getWidgetRoot(), 3500, 60);
            if (!root) {
                setCallState("error");
                return;
            }

            let talkButton = getTalkButton(root);
            if (!talkButton) {
                const launcherButton = root.querySelector("#lc_text-widget--btn") as HTMLElement | null;
                launcherButton?.click();
                talkButton = await waitForValue(() => getTalkButton(root), 2500, 60);
            }

            if (!talkButton) {
                setCallState("error");
                return;
            }

            talkButton.click();
            setIsWidgetReady(true);
            setIsPrewarmed(true);
            await sleep(120);
            syncCallState();
        } catch {
            setCallState("error");
        } finally {
            setIsBusy(false);
        }
    }, [applyWidgetStyles, getTalkButton, getWidgetRoot, isBusy, syncCallState]);

    const endCall = useCallback(async () => {
        if (isBusy) return;
        setIsBusy(true);

        try {
            const root = await waitForValue(() => getWidgetRoot(), 2200, 60);
            const endButton = root?.querySelector("ion-button.lc_text-widget--voice-end-call-btn") as HTMLElement | null;
            endButton?.click();
            await sleep(120);
            setCallState("idle");
        } catch {
            setCallState("error");
        } finally {
            setIsBusy(false);
        }
    }, [getWidgetRoot, isBusy]);

    const handleOrbClick = useCallback(() => {
        if (callState === "live" || callState === "connecting") {
            void endCall();
            return;
        }

        void startCall();
    }, [callState, endCall, startCall]);

    useEffect(() => {
        const checkWidget = () => {
            const styled = applyWidgetStyles();
            const ready = styled && Boolean(getWidgetRoot());
            setIsWidgetReady(Boolean(ready));
            syncCallState();
        };

        const observer = new MutationObserver(checkWidget);
        observer.observe(document.body, { childList: true, subtree: true });

        const quick = window.setTimeout(checkWidget, 120);
        const medium = window.setTimeout(checkWidget, 420);
        const slow = window.setTimeout(checkWidget, 900);
        const poll = window.setInterval(checkWidget, 650);
        const prewarmFast = window.setTimeout(() => {
            void prewarmWidget();
        }, 420);
        const prewarmSlow = window.setTimeout(() => {
            void prewarmWidget();
        }, 1200);

        return () => {
            observer.disconnect();
            window.clearTimeout(quick);
            window.clearTimeout(medium);
            window.clearTimeout(slow);
            window.clearTimeout(prewarmFast);
            window.clearTimeout(prewarmSlow);
            window.clearInterval(poll);
        };
    }, [applyWidgetStyles, getWidgetRoot, prewarmWidget, syncCallState]);

    const orbLabel = useMemo(() => {
        if (callState === "live" || callState === "connecting") return "End Call";
        return hasCalledOnce ? "Talk Again" : "Talk Here";
    }, [callState, hasCalledOnce]);

    const statusText = useMemo(() => {
        if (callState === "connecting") return "Connecting";
        if (callState === "live") return "Live Call";
        if (callState === "error") return "Retry";
        if (!isWidgetReady) return "Loading Voice";
        return "Self-Sell Ready";
    }, [callState, isWidgetReady]);

    const isActive = callState === "live" || callState === "connecting";

    return (
        <>
            <Script
                id={`${SELF_SELL_HOST_ID}-script`}
                src="https://beta.leadconnectorhq.com/loader.js"
                data-resources-url="https://beta.leadconnectorhq.com/chat-widget/loader.js"
                data-widget-id={SELF_SELL_WIDGET_ID}
                strategy="afterInteractive"
            />

            <div className="flex h-full w-full flex-col items-center justify-center gap-4">
                <div className="relative">
                    <motion.div
                        aria-hidden="true"
                        className={`absolute inset-[-18px] rounded-full blur-2xl ${isActive ? "bg-red-400/24" : "bg-cyan-400/26"}`}
                        animate={
                            isActive
                                ? { scale: [0.96, 1.08, 0.96], opacity: [0.28, 0.62, 0.28] }
                                : { scale: [0.86, 1.18, 0.86], opacity: [0.24, 0.78, 0.24] }
                        }
                        transition={{ duration: isActive ? 1.6 : 2.05, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    />
                    {!isActive ? (
                        <motion.div
                            aria-hidden="true"
                            className="absolute inset-[-8px] rounded-full blur-md bg-[conic-gradient(from_0deg,rgba(255,255,255,0)_0deg,rgba(125,211,252,0.2)_70deg,rgba(34,211,238,0.18)_150deg,rgba(14,165,233,0.16)_230deg,rgba(255,255,255,0)_320deg)]"
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 4.8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        />
                    ) : null}
                    <motion.button
                        type="button"
                        onClick={handleOrbClick}
                        disabled={isBusy}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.985 }}
                        animate={
                            isActive
                                ? { y: [0, -2, 0], scale: [1, 1.014, 1] }
                                : { y: [0, -12, 0], scale: [1, 1.05, 1], rotate: [0, 0.7, 0, -0.7, 0] }
                        }
                        transition={{ duration: isActive ? 1.6 : 2.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                        className={`group relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border transition-all duration-300 md:h-36 md:w-36 ${
                            isActive
                                ? "border-red-300/55 bg-[radial-gradient(circle_at_50%_30%,rgba(140,26,26,0.22),transparent_42%),linear-gradient(180deg,rgba(20,10,20,0.98),rgba(9,6,16,1))] shadow-[0_0_0_1px_rgba(248,113,113,0.14),0_0_46px_rgba(248,113,113,0.16)]"
                                : "border-cyan-300/70 bg-[radial-gradient(circle_at_34%_26%,rgba(224,242,254,0.82)_0%,rgba(125,211,252,0.26)_20%,rgba(34,211,238,0.34)_38%,rgba(8,47,73,0.92)_70%,rgba(5,14,30,1)_100%)] shadow-[0_0_0_1px_rgba(103,232,249,0.16),0_0_64px_rgba(56,189,248,0.24)] hover:border-cyan-100 hover:shadow-[0_0_0_1px_rgba(165,243,252,0.24),0_0_84px_rgba(56,189,248,0.32)]"
                        }`}
                    >
                        {!isActive ? (
                            <>
                                <motion.div
                                    aria-hidden="true"
                                    className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_28%_24%,rgba(255,255,255,0.34),transparent_18%),radial-gradient(circle_at_72%_74%,rgba(34,211,238,0.18),transparent_26%)]"
                                    animate={{ opacity: [0.38, 1, 0.38], scale: [0.985, 1.018, 0.985] }}
                                    transition={{ duration: 1.9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                                />
                                <motion.div
                                    aria-hidden="true"
                                    className="absolute inset-[8px] rounded-full border border-cyan-100/18"
                                    animate={{ rotate: [0, -360] }}
                                    transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                />
                            </>
                        ) : null}
                        <div className="absolute inset-[10px] rounded-full border border-white/5" />
                        <div className="relative flex flex-col items-center gap-2 px-4 text-center">
                            <div
                                className={`flex h-10 w-10 items-center justify-center rounded-full border ${
                                    isActive ? "border-red-300/40 bg-red-500/10 text-red-100" : "border-cyan-200/55 bg-cyan-300/10 text-cyan-100"
                                }`}
                            >
                                <PhoneCall className="h-4 w-4" />
                            </div>
                            <div className="space-y-1">
                                <div className="text-[9px] font-mono uppercase tracking-[0.28em] text-gray-400">
                                    {isActive ? "End Call" : "Voice Demo"}
                                </div>
                                <div className="text-sm font-black uppercase tracking-[0.16em] text-white md:text-base">
                                    {orbLabel}
                                </div>
                            </div>
                        </div>
                    </motion.button>
                </div>
                <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/45">{statusText}</p>
            </div>
        </>
    );
}
