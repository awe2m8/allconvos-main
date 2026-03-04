"use client";

import Link from "next/link";
import Script from "next/script";
import { ArrowLeft } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

const GHL_WIDGET_ID = "69a7bdf999dd5635833c8454";
const GHL_WIDGET_HOST_ID = "ghl-voice-demo-widget";

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

declare global {
    interface Window {
        leadConnector?: {
            chatWidget?: {
                openWidget?: () => void;
                closeWidget?: () => void;
                isActive?: () => boolean;
            };
        };
    }
}

export default function GhlVoiceAiDemoPage() {
    const [callState, setCallState] = useState<CallState>("idle");
    const [isWidgetReady, setIsWidgetReady] = useState(false);
    const [isBusy, setIsBusy] = useState(false);
    const [hasCalledOnce, setHasCalledOnce] = useState(false);
    const [isPrewarmed, setIsPrewarmed] = useState(false);

    const getWidgetHost = useCallback(() => {
        const byId = document.querySelector(`chat-widget#${GHL_WIDGET_HOST_ID}`) as HTMLElement | null;
        if (byId) return byId;

        const firstWidget = document.querySelector("chat-widget") as HTMLElement | null;
        if (firstWidget && !firstWidget.id) {
            firstWidget.id = GHL_WIDGET_HOST_ID;
        }
        return firstWidget;
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
        const allWidgets = Array.from(document.querySelectorAll("chat-widget")) as HTMLElement[];
        const target = getWidgetHost();

        allWidgets.forEach((widget) => {
            if (target && widget !== target) {
                widget.style.display = "none";
            }
        });

        if (!target?.shadowRoot) return false;

        // Keep vendor UI mounted but fully off-canvas; orb controls the call flow.
        target.style.position = "fixed";
        target.style.left = "-9999px";
        target.style.top = "-9999px";
        target.style.width = "1px";
        target.style.height = "1px";
        target.style.opacity = "0";
        target.style.pointerEvents = "none";
        target.style.zIndex = "-1";

        const root = target.shadowRoot;
        if (!root.getElementById("ghl-voice-demo-style")) {
            const style = document.createElement("style");
            style.id = "ghl-voice-demo-style";
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

        if (!statusText && !callStatus && !window.leadConnector?.chatWidget?.isActive?.()) {
            setCallState("idle");
        }
    }, [getWidgetRoot]);

    const prewarmWidget = useCallback(async () => {
        if (isPrewarmed) return;

        try {
            applyWidgetStyles();
            const chatApi = await waitForValue(() => window.leadConnector?.chatWidget ?? null, 3500, 70);
            const root = await waitForValue(() => getWidgetRoot(), 3500, 70);
            if (!chatApi || !root) return;

            // Warm the API/root only. Do not open the call UI on load.
            const statusText =
                root.querySelector(".lc_text-widget--voice-status-text")?.textContent?.trim().toLowerCase() ?? "";
            if (statusText.includes("connecting") || statusText.includes("talking")) {
                const endButton = root.querySelector("ion-button.lc_text-widget--voice-end-call-btn") as HTMLElement | null;
                endButton?.click();
                await sleep(120);
                chatApi.closeWidget?.();
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
            const chatApi = await waitForValue(() => window.leadConnector?.chatWidget ?? null, 3500, 60);
            if (!chatApi) {
                setCallState("error");
                return;
            }

            const root = await waitForValue(() => getWidgetRoot(), 3500, 60);
            if (!root) {
                setCallState("error");
                return;
            }

            if (!chatApi.isActive?.()) {
                chatApi.openWidget?.();
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
    }, [applyWidgetStyles, getWidgetRoot, isBusy, syncCallState]);

    const endCall = useCallback(async () => {
        if (isBusy) return;
        setIsBusy(true);

        try {
            const root = await waitForValue(() => getWidgetRoot(), 2200, 60);
            const endButton = root?.querySelector("ion-button.lc_text-widget--voice-end-call-btn");
            if (endButton) {
                (endButton as HTMLElement).click();
            }
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
            const ready = styled && Boolean(getWidgetRoot()) && Boolean(window.leadConnector?.chatWidget);
            setIsWidgetReady(styled && ready);
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
        if (callState === "connecting") return "Connecting to the voice agent...";
        if (callState === "live") return "Live call in progress";
        if (callState === "error") return "Could not start call. Check mic permission and try again.";
        if (!isWidgetReady) return "Voice engine is loading. Tap the orb to retry.";
        return "Tap the orb to start a voice conversation.";
    }, [callState, isWidgetReady]);

    return (
        <main className="min-h-screen bg-ocean-950 text-white selection:bg-white/20">
            <Script
                id={GHL_WIDGET_HOST_ID}
                src="https://beta.leadconnectorhq.com/loader.js"
                data-resources-url="https://beta.leadconnectorhq.com/chat-widget/loader.js"
                data-widget-id={GHL_WIDGET_ID}
                strategy="afterInteractive"
            />

            <div className="fixed inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-10 pointer-events-none" />
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-full bg-white/5 blur-[120px] pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto px-6 pt-12 text-center">
                <p className="font-mono text-lg font-bold tracking-tighter text-white mb-4">
                    allconvos<span className="text-neon">_</span>
                </p>
                <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-3">GHL Voice AI Demo</h1>
                <p className="text-neon font-bold italic uppercase text-sm tracking-widest mb-6">
                    Orb-Controlled Voice Call (No Popup Shell)
                </p>

                <div className="mb-7 flex justify-center">
                    <button
                        type="button"
                        onClick={handleOrbClick}
                        disabled={isBusy}
                        className={`group relative grid place-items-center w-56 h-56 rounded-full border transition-all duration-300 font-mono text-lg uppercase tracking-[0.28em] ${
                            callState === "live" || callState === "connecting"
                                ? "border-red-400/90 text-red-200 bg-[radial-gradient(circle_at_30%_30%,#2a2230_0%,#170f1f_56%,#0b0a16_100%)] shadow-[0_0_0_2px_rgba(248,113,113,0.18),0_0_46px_rgba(248,113,113,0.34)]"
                                : "border-neon/70 text-neon bg-[radial-gradient(circle_at_30%_30%,#0e243a_0%,#0a1628_56%,#070f1e_100%)] shadow-[0_0_0_2px_rgba(192,239,34,0.14),0_0_46px_rgba(0,255,255,0.24)]"
                        } ${callState === "live" || callState === "connecting" ? "animate-pulse" : "hover:scale-[1.015]"}`}
                    >
                        <span className="pointer-events-none">{orbLabel}</span>
                    </button>
                </div>

                <p className="text-sm md:text-base text-gray-300 mb-6">{statusText}</p>

                <Link
                    href="/demo"
                    className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white transition-colors uppercase tracking-wider"
                >
                    <ArrowLeft className="w-3 h-3" />
                    Back to Demo
                </Link>
            </div>
        </main>
    );
}
