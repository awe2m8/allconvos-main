"use client";

import { CallHandling } from "@/components/sections/CallHandling";
import { CaseStudy } from "@/components/sections/CaseStudy";
import { DIYDemo } from "@/components/sections/DIYDemo";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Problem } from "@/components/sections/Problem";
import { SocialProof } from "@/components/sections/SocialProof";
import { motion } from "framer-motion";
import Link from "next/link";
import Script from "next/script";
import { ArrowLeft, CalendarDays, PhoneCall, Wrench } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

const GHL_WIDGET_ID = "69a7bdf999dd5635833c8454";
const GHL_WIDGET_HOST_ID = "ghl-tradies2-widget";

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

export default function TradiesPage() {
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

        target.style.position = "fixed";
        target.style.left = "-9999px";
        target.style.top = "-9999px";
        target.style.width = "1px";
        target.style.height = "1px";
        target.style.opacity = "0";
        target.style.pointerEvents = "none";
        target.style.zIndex = "-1";

        const root = target.shadowRoot;
        if (!root.getElementById("ghl-tradies-style")) {
            const style = document.createElement("style");
            style.id = "ghl-tradies-style";
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
    }, [applyWidgetStyles, getTalkButton, getWidgetRoot, isBusy, syncCallState]);

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
        <main className="min-h-screen bg-ocean-950 text-white selection:bg-white/20 overflow-hidden">
            <Script
                id={GHL_WIDGET_HOST_ID}
                src="https://beta.leadconnectorhq.com/loader.js"
                data-resources-url="https://beta.leadconnectorhq.com/chat-widget/loader.js"
                data-widget-id={GHL_WIDGET_ID}
                strategy="afterInteractive"
            />

            <div className="fixed inset-0 bg-[linear-gradient(to_right,#182235_1px,transparent_1px),linear-gradient(to_bottom,#182235_1px,transparent_1px)] bg-[size:42px_42px] opacity-12 pointer-events-none" />
            <div className="fixed inset-x-0 top-[-10%] mx-auto h-[36rem] w-[36rem] rounded-full bg-cyan-400/8 blur-[120px] pointer-events-none" />

            <div className="relative z-10 mx-auto max-w-6xl px-6 py-10 md:py-14">
                <nav className="mb-12 flex items-center justify-between">
                    <Link href="/" className="font-mono text-2xl font-bold tracking-tighter text-white">
                        allconvos<span className="text-neon">_</span>
                    </Link>
                    <Link
                        href="/demo"
                        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-gray-400 transition-colors hover:text-white"
                    >
                        <ArrowLeft className="h-3 w-3" />
                        Back to Demo
                    </Link>
                </nav>

                <motion.section
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                    className="mx-auto max-w-4xl text-center"
                >
                    <div className="inline-flex items-center gap-2 rounded-full border border-neon/20 bg-white/[0.04] px-4 py-2 text-[10px] font-mono uppercase tracking-[0.28em] text-neon">
                        <Wrench className="h-3.5 w-3.5" />
                        Tradie Voice AI Demo
                    </div>

                    <div className="mt-8 space-y-4">
                        <h1 className="text-5xl font-black uppercase tracking-tight text-white md:text-7xl">
                            Don&apos;t Let Job Calls
                            <span className="block italic text-neon">Go to Waste</span>
                        </h1>
                        <p className="mx-auto max-w-xl text-sm leading-relaxed text-gray-300 md:text-base">
                            A live voice demo for plumbers, sparkies, builders, and local service crews.
                            Hear how AI handles after-hours calls, urgent triage, and quote requests.
                        </p>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-[10px] font-mono uppercase tracking-[0.24em] text-gray-400">
                        <span className="rounded-full border border-white/8 px-4 py-2">After-Hours Overflow</span>
                        <span className="rounded-full border border-white/8 px-4 py-2">Urgent Job Triage</span>
                        <span className="rounded-full border border-white/8 px-4 py-2">Quote Capture</span>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 18, scale: 0.985 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.08 }}
                        className="relative mx-auto mt-10 max-w-2xl"
                    >
                        <div className="absolute inset-x-24 top-12 h-32 rounded-full bg-cyan-400/8 blur-[80px]" />
                        <div className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(9,18,33,0.74),rgba(3,8,23,0.94))] px-6 py-8 shadow-[0_24px_80px_rgba(0,0,0,0.24)] md:px-10 md:py-10">
                            <div className="mx-auto max-w-lg">
                                <p className="text-[11px] font-mono uppercase tracking-[0.28em] text-neon">
                                    Live Demo
                                </p>
                                <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-gray-400">
                                    Click once and talk like a real customer. Keep it simple.
                                </p>
                            </div>

                            <div className="mt-8 flex justify-center">
                                <button
                                    type="button"
                                    onClick={handleOrbClick}
                                    disabled={isBusy}
                                    className={`group relative flex h-44 w-44 items-center justify-center overflow-hidden rounded-full border transition-all duration-300 md:h-48 md:w-48 ${
                                        callState === "live" || callState === "connecting"
                                            ? "border-red-300/55 bg-[radial-gradient(circle_at_50%_30%,rgba(140,26,26,0.22),transparent_42%),linear-gradient(180deg,rgba(20,10,20,0.98),rgba(9,6,16,1))] shadow-[0_0_0_1px_rgba(248,113,113,0.14),0_0_50px_rgba(248,113,113,0.16)]"
                                            : "border-neon/35 bg-[radial-gradient(circle_at_50%_28%,rgba(196,255,82,0.1),transparent_38%),linear-gradient(180deg,rgba(8,22,40,0.98),rgba(4,10,22,1))] shadow-[0_0_0_1px_rgba(192,239,34,0.08),0_0_50px_rgba(34,211,238,0.12)] hover:border-neon/55 hover:shadow-[0_0_0_1px_rgba(192,239,34,0.12),0_0_64px_rgba(34,211,238,0.16)]"
                                    }`}
                                >
                                    <div className="absolute inset-[10px] rounded-full border border-white/5" />
                                    <div className="relative flex flex-col items-center gap-4 px-6 text-center">
                                        <div
                                            className={`flex h-14 w-14 items-center justify-center rounded-full border ${
                                                callState === "live" || callState === "connecting"
                                                    ? "border-red-300/40 bg-red-500/10 text-red-100"
                                                    : "border-neon/35 bg-neon/10 text-neon"
                                            }`}
                                        >
                                            <PhoneCall className="h-5 w-5" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <div className="text-[10px] font-mono uppercase tracking-[0.34em] text-gray-400">
                                                {callState === "live" || callState === "connecting" ? "End Call" : "Voice Demo"}
                                            </div>
                                            <div className="text-xl font-black uppercase tracking-[0.18em] text-white md:text-2xl">
                                                {orbLabel}
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            </div>

                            <div className="mt-6 text-center">
                                <p className="text-sm text-gray-300">{statusText}</p>
                            </div>

                            <div className="mx-auto mt-8 max-w-lg rounded-[1.5rem] border border-white/6 bg-white/[0.02] p-4 text-left">
                                <p className="mb-3 text-[10px] font-mono uppercase tracking-[0.24em] text-gray-500">
                                    Try saying
                                </p>
                                <div className="space-y-2.5 text-sm text-gray-300">
                                    <div className="rounded-xl border border-white/6 px-4 py-3">
                                        My hot water system burst and I need help tonight.
                                    </div>
                                    <div className="rounded-xl border border-white/6 px-4 py-3">
                                        Can I get a quote for next week?
                                    </div>
                                    <div className="rounded-xl border border-white/6 px-4 py-3">
                                        I need someone to call me back urgently.
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-center">
                                <a
                                    href="https://calendly.com/jessallan/30min"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 rounded-full border border-neon/28 px-6 py-3 text-xs font-bold uppercase tracking-[0.22em] text-neon transition-all hover:border-neon/45 hover:bg-neon/8"
                                >
                                    <CalendarDays className="h-4 w-4" />
                                    Book a Walkthrough
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </motion.section>
            </div>

            <section className="relative z-10 border-t border-white/6 bg-ocean-950">
                <SocialProof />
                <Problem />
                <CallHandling />
                <DIYDemo />
                <CaseStudy />
                <HowItWorks />
            </section>
        </main>
    );
}
