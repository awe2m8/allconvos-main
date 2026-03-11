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
import { ArrowLeft, CalendarDays, CheckCircle2, PhoneCall, Wrench } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

const GHL_WIDGET_ID = "69a7bdf999dd5635833c8454";
const GHL_WIDGET_HOST_ID = "ghl-tradies-widget";

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

                <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
                    <motion.div
                        initial={{ opacity: 0, x: -18 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.45 }}
                        className="space-y-6"
                    >
                        <div className="inline-flex items-center gap-2 rounded-full border border-neon/30 bg-white/5 px-4 py-2 text-[10px] font-mono uppercase tracking-[0.28em] text-neon">
                            <Wrench className="h-3.5 w-3.5" />
                            Tradie Voice AI Demo
                        </div>

                        <div className="space-y-5">
                            <h1 className="max-w-3xl text-5xl font-black uppercase tracking-tight text-white md:text-7xl">
                                Don&apos;t Let Job Calls
                                <span className="block italic text-neon">Go to Waste</span>
                            </h1>
                            <p className="max-w-2xl text-lg leading-relaxed text-gray-300 md:text-xl">
                                This demo shows how a voice AI can answer after-hours calls, qualify urgent work,
                                capture quote requests, and book callbacks for plumbers, electricians, builders,
                                landscapers, and other local tradies.
                            </p>
                        </div>

                        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                            <p className="mb-4 text-[11px] font-mono uppercase tracking-[0.24em] text-neon">
                                What this handles
                            </p>
                            <div className="grid gap-3">
                                <div className="flex items-start gap-3 text-sm leading-relaxed text-gray-300">
                                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-neon" />
                                    After-hours calls, missed calls, and overflow when the team is on the tools.
                                </div>
                                <div className="flex items-start gap-3 text-sm leading-relaxed text-gray-300">
                                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-neon" />
                                    Urgent triage, quote requests, and clean callback capture.
                                </div>
                                <div className="flex items-start gap-3 text-sm leading-relaxed text-gray-300">
                                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-neon" />
                                    A consistent voice that follows your booking rules and business guardrails.
                                </div>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/6 to-transparent p-6">
                            <p className="mb-4 text-[11px] font-mono uppercase tracking-[0.24em] text-neon">
                                Try these prompts
                            </p>
                            <div className="grid gap-3">
                                <div className="rounded-2xl border border-white/8 bg-ocean-950/70 px-4 py-3 text-sm text-gray-300">
                                    &quot;I need a plumber, the hot water system has burst and it&apos;s after hours.&quot;
                                </div>
                                <div className="rounded-2xl border border-white/8 bg-ocean-950/70 px-4 py-3 text-sm text-gray-300">
                                    &quot;Can someone quote a switchboard upgrade for a small shop next week?&quot;
                                </div>
                                <div className="rounded-2xl border border-white/8 bg-ocean-950/70 px-4 py-3 text-sm text-gray-300">
                                    &quot;I need a builder to call me back about a bathroom renovation in Brisbane.&quot;
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 18, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                    >
                        <div className="absolute -inset-4 rounded-[2rem] bg-cyan-400/8 blur-3xl" />
                        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-ocean-900 via-ocean-950 to-[#030817] shadow-2xl">
                            <div className="h-2 w-full bg-gradient-to-r from-neon via-cyan-400 to-neon" />

                            <div className="px-8 pb-8 pt-10 md:px-10 md:pb-10">
                                <div className="mb-7 text-center">
                                    <p className="mb-3 text-[11px] font-mono uppercase tracking-[0.28em] text-neon">
                                        Live Browser Call
                                    </p>
                                    <h2 className="text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
                                        Start the Demo
                                    </h2>
                                    <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-gray-400">
                                        Click the launch control below and act like a customer calling your business.
                                        Test urgent jobs, quote requests, booking enquiries, or after-hours overflow.
                                    </p>
                                </div>

                                <div className="mb-7 rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(9,17,32,0.98),rgba(3,8,23,0.98))] p-5 md:p-6">
                                    <div className="rounded-[1.75rem] border border-neon/20 bg-[linear-gradient(180deg,rgba(6,13,27,0.94),rgba(4,8,18,0.98))] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
                                        <div className="mb-4 flex items-center justify-between gap-3">
                                            <span className="text-[10px] font-mono uppercase tracking-[0.26em] text-gray-400">
                                                Voice Launch Control
                                            </span>
                                            <span
                                                className={`rounded-full border px-3 py-1 text-[10px] font-mono uppercase tracking-[0.22em] ${
                                                    callState === "live"
                                                        ? "border-red-400/40 bg-red-500/10 text-red-200"
                                                        : callState === "connecting"
                                                          ? "border-amber-300/30 bg-amber-300/10 text-amber-100"
                                                          : "border-neon/30 bg-neon/10 text-neon"
                                                }`}
                                            >
                                                {callState === "live"
                                                    ? "Live"
                                                    : callState === "connecting"
                                                      ? "Dialing"
                                                      : "Ready"}
                                            </span>
                                        </div>

                                        <div className="mb-4 flex justify-center">
                                            <button
                                                type="button"
                                                onClick={handleOrbClick}
                                                disabled={isBusy}
                                                className={`group relative flex h-[19rem] w-full max-w-[22rem] items-center justify-center overflow-hidden rounded-[2.25rem] border transition-all duration-300 md:h-[20rem] ${
                                                    callState === "live" || callState === "connecting"
                                                        ? "border-red-400/70 bg-[radial-gradient(circle_at_top,rgba(120,16,16,0.36),transparent_36%),linear-gradient(180deg,rgba(22,10,22,0.98),rgba(10,6,17,1))] shadow-[0_0_0_2px_rgba(248,113,113,0.14),0_0_52px_rgba(248,113,113,0.18)]"
                                                        : "border-neon/45 bg-[radial-gradient(circle_at_top,rgba(192,239,34,0.14),transparent_34%),linear-gradient(180deg,rgba(7,18,37,0.98),rgba(3,8,23,1))] shadow-[0_0_0_2px_rgba(192,239,34,0.08),0_0_52px_rgba(34,211,238,0.12)] hover:border-neon/70 hover:shadow-[0_0_0_2px_rgba(192,239,34,0.12),0_0_62px_rgba(34,211,238,0.18)]"
                                                }`}
                                            >
                                                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(24,34,53,0.55)_1px,transparent_1px),linear-gradient(to_bottom,rgba(24,34,53,0.55)_1px,transparent_1px)] bg-[size:28px_28px] opacity-20" />
                                                <div
                                                    className={`absolute inset-x-8 top-6 h-px ${
                                                        callState === "live" || callState === "connecting"
                                                            ? "bg-gradient-to-r from-transparent via-red-300/60 to-transparent"
                                                            : "bg-gradient-to-r from-transparent via-neon/60 to-transparent"
                                                    }`}
                                                />
                                                <div className="relative flex flex-col items-center justify-center gap-5 px-6 text-center">
                                                    <div
                                                        className={`flex h-20 w-20 items-center justify-center rounded-full border ${
                                                            callState === "live" || callState === "connecting"
                                                                ? "border-red-300/60 bg-red-500/10 text-red-100"
                                                                : "border-neon/50 bg-neon/10 text-neon"
                                                        }`}
                                                    >
                                                        <PhoneCall className="h-8 w-8" />
                                                    </div>
                                                    <div className="space-y-3">
                                                        <div className="text-[10px] font-mono uppercase tracking-[0.34em] text-gray-400">
                                                            {callState === "live" || callState === "connecting"
                                                                ? "End the call"
                                                                : "Tap to launch"}
                                                        </div>
                                                        <div className="text-2xl font-black uppercase tracking-[0.18em] text-white md:text-[2rem]">
                                                            {orbLabel}
                                                        </div>
                                                        <div className="mx-auto max-w-[15rem] text-xs uppercase tracking-[0.2em] text-gray-400">
                                                            {callState === "live" || callState === "connecting"
                                                                ? "Hang up when you are done"
                                                                : "Talk like a real customer and hear the response"}
                                                        </div>
                                                    </div>
                                                </div>
                                            </button>
                                        </div>

                                        <div className="grid gap-3 text-left md:grid-cols-2">
                                            <div className="rounded-2xl border border-white/8 bg-ocean-950/70 px-4 py-4">
                                                <div className="mb-2 text-[10px] font-mono uppercase tracking-[0.26em] text-neon">
                                                    Best Test
                                                </div>
                                                <p className="text-sm leading-relaxed text-gray-300">
                                                    Try an urgent plumbing or electrical call after hours.
                                                </p>
                                            </div>
                                            <div className="rounded-2xl border border-white/8 bg-ocean-950/70 px-4 py-4">
                                                <div className="mb-2 text-[10px] font-mono uppercase tracking-[0.26em] text-neon">
                                                    What To Check
                                                </div>
                                                <p className="text-sm leading-relaxed text-gray-300">
                                                    Listen for triage, booking logic, and clean caller capture.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 rounded-2xl border border-white/8 bg-ocean-950/60 px-4 py-4">
                                        <p className="text-center text-sm text-gray-300">{statusText}</p>
                                    </div>
                                </div>

                                <div className="grid gap-3">
                                    <a
                                        href="https://calendly.com/jessallan/30min"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-neon/40 px-5 py-4 text-sm font-bold uppercase tracking-[0.18em] text-neon transition-all hover:border-neon hover:bg-neon/10"
                                    >
                                        <CalendarDays className="h-4 w-4" />
                                        Book a Walkthrough
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
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
