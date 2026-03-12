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

export function SelfSellVoiceOrb({ variant = "full" }: { variant?: "full" | "compact" }) {
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
        return "Demo Voice Agent";
    }, [callState, isWidgetReady]);

    const isActive = callState === "live" || callState === "connecting";

    if (variant === "compact") {
        return (
            <>
                <Script
                    id={`${SELF_SELL_HOST_ID}-script`}
                    src="https://beta.leadconnectorhq.com/loader.js"
                    data-resources-url="https://beta.leadconnectorhq.com/chat-widget/loader.js"
                    data-widget-id={SELF_SELL_WIDGET_ID}
                    strategy="afterInteractive"
                />

                <motion.button
                    type="button"
                    onClick={handleOrbClick}
                    disabled={isBusy}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.985 }}
                    className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-ocean-900/90 px-3 py-3 text-left shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_0_36px_rgba(163,230,53,0.12)] transition-all duration-300 hover:border-neon/60 hover:bg-ocean-900"
                >
                    <div className="relative shrink-0">
                        <motion.div
                            aria-hidden="true"
                            className={`absolute inset-[-14px] rounded-full blur-xl ${isActive ? "bg-red-400/24" : "bg-neon/48"}`}
                            animate={
                                isActive
                                    ? { scale: [0.96, 1.08, 0.96], opacity: [0.28, 0.62, 0.28] }
                                    : { scale: [0.9, 1.22, 0.9], opacity: [0.44, 1, 0.44] }
                            }
                            transition={{ duration: isActive ? 1.6 : 2.05, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                        />
                        {!isActive ? (
                            <motion.div
                                aria-hidden="true"
                                className="absolute inset-[-6px] rounded-full blur-sm bg-[conic-gradient(from_0deg,rgba(255,255,255,0)_0deg,rgba(217,255,65,0.42)_70deg,rgba(163,230,53,0.36)_150deg,rgba(34,211,238,0.18)_230deg,rgba(255,255,255,0)_320deg)]"
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 4.8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            />
                        ) : null}
                        <motion.div
                            animate={
                                isActive
                                    ? { y: [0, -1, 0], scale: [1, 1.014, 1] }
                                    : { y: [0, -4, 0], scale: [1, 1.03, 1], rotate: [0, 0.4, 0, -0.4, 0] }
                            }
                            transition={{ duration: isActive ? 1.6 : 2.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                            className={`relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border ${
                                isActive
                                    ? "border-red-300/55 bg-[radial-gradient(circle_at_50%_30%,rgba(140,26,26,0.22),transparent_42%),linear-gradient(180deg,rgba(20,10,20,0.98),rgba(9,6,16,1))] shadow-[0_0_0_1px_rgba(248,113,113,0.14),0_0_34px_rgba(248,113,113,0.16)]"
                                    : "border-neon bg-[radial-gradient(circle_at_34%_26%,rgba(255,255,255,0.24)_0%,rgba(217,255,65,0.18)_18%,rgba(163,230,53,0.14)_34%,rgba(7,30,54,0.95)_72%,rgba(4,12,26,1)_100%)] shadow-[0_0_0_1px_rgba(163,230,53,0.26),0_0_72px_rgba(163,230,53,0.34)]"
                            }`}
                        >
                            <div className="absolute inset-[6px] rounded-full border border-white/5" />
                            <PhoneCall className={`relative h-5 w-5 ${isActive ? "text-red-100" : "text-white"}`} />
                        </motion.div>
                    </div>

                    <div className="pr-3">
                        <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-neon/80">
                            Quick Demo
                        </p>
                        <p className="mt-1 text-sm font-black uppercase tracking-[0.16em] text-white">
                            {isActive ? "Voice AI Live" : "Voice AI Demo"}
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                            {isActive ? "Tap to end call" : "Click here"}
                        </p>
                    </div>
                </motion.button>
            </>
        );
    }

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
                        className={`absolute inset-[-12px] rounded-full blur-lg ${isActive ? "bg-red-400/18" : "bg-neon/32"}`}
                        animate={
                            isActive
                                ? { scale: [0.97, 1.06, 0.97], opacity: [0.22, 0.42, 0.22] }
                                : { scale: [0.92, 1.16, 0.92], opacity: [0.24, 0.54, 0.24] }
                        }
                        transition={{ duration: isActive ? 1.6 : 2.05, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    />
                    {!isActive ? (
                        <motion.div
                            aria-hidden="true"
                            className="absolute inset-[-6px] rounded-full blur-sm bg-[conic-gradient(from_0deg,rgba(255,255,255,0)_0deg,rgba(217,255,65,0.42)_70deg,rgba(163,230,53,0.36)_150deg,rgba(34,211,238,0.18)_230deg,rgba(255,255,255,0)_320deg)]"
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
                                ? { y: [0, -1, 0], scale: [1, 1.014, 1] }
                                : { y: [0, -4, 0], scale: [1, 1.03, 1], rotate: [0, 0.4, 0, -0.4, 0] }
                        }
                        transition={{ duration: isActive ? 1.6 : 2.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                        className={`group relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border transition-all duration-300 md:h-20 md:w-20 ${
                            isActive
                                ? "border-red-300/55 bg-[radial-gradient(circle_at_50%_30%,rgba(140,26,26,0.22),transparent_42%),linear-gradient(180deg,rgba(20,10,20,0.98),rgba(9,6,16,1))] shadow-[0_0_0_1px_rgba(248,113,113,0.14),0_0_34px_rgba(248,113,113,0.16)]"
                                : "border-neon bg-[radial-gradient(circle_at_34%_26%,rgba(255,255,255,0.24)_0%,rgba(217,255,65,0.18)_18%,rgba(163,230,53,0.14)_34%,rgba(7,30,54,0.95)_72%,rgba(4,12,26,1)_100%)] shadow-[0_0_0_1px_rgba(163,230,53,0.26),0_0_72px_rgba(163,230,53,0.34)]"
                        }`}
                    >
                        {!isActive ? (
                            <>
                                <motion.div
                                    aria-hidden="true"
                                    className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_28%_24%,rgba(255,255,255,0.22),transparent_16%),radial-gradient(circle_at_72%_74%,rgba(163,230,53,0.16),transparent_26%)]"
                                    animate={{ opacity: [0.38, 1, 0.38], scale: [0.985, 1.018, 0.985] }}
                                    transition={{ duration: 1.9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                                />
                                <motion.div
                                    aria-hidden="true"
                                    className="absolute inset-[6px] rounded-full border border-neon/18"
                                    animate={{ rotate: [0, -360] }}
                                    transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                />
                            </>
                        ) : null}
                        <div className="absolute inset-[6px] rounded-full border border-white/5" />
                        <div className="relative flex items-center justify-center">
                            <PhoneCall className={`h-5 w-5 md:h-6 md:w-6 ${isActive ? "text-red-100" : "text-white"}`} />
                        </div>
                    </motion.button>
                </div>
                <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/45">{statusText}</p>
            </div>
        </>
    );
}
