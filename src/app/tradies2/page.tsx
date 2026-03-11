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
import { ArrowLeft, CalendarDays, Mail, Phone, PhoneCall } from "lucide-react";
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
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                    className="mx-auto w-full max-w-lg"
                >
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(180deg,#101827_0%,#0b1220_48%,#060b14_100%)] shadow-2xl">
                        <div className="absolute top-0 left-0 h-2 w-full bg-gradient-to-r from-white via-sky-300 to-cyan-400" />

                        <div className="absolute top-8 left-1/2 z-20 -translate-x-1/2">
                            <div className="h-24 w-24 rounded-full border-2 border-sky-200/80 bg-[#050816] p-1 shadow-[0_0_28px_rgba(125,211,252,0.34)]">
                                <img
                                    src="/images/ai-avatar-female.png"
                                    alt="Tradie voice AI"
                                    className="h-full w-full rounded-full object-cover"
                                />
                            </div>
                        </div>

                        <div className="px-8 pb-8 pt-36 text-center">
                            <p className="mb-5 font-mono text-lg font-bold tracking-tighter text-white">
                                allconvos<span className="text-sky-300">_</span>
                            </p>

                            <h1 className="mb-2 text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
                                Tradies Voice Demo
                            </h1>
                            <p className="mb-7 text-sm font-bold italic uppercase tracking-widest text-sky-200">
                                Click the Orb and Start Talking
                            </p>

                            <div className="mb-6 rounded-2xl border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(148,163,184,0.03))] p-6">
                                <div className="flex items-center justify-center py-3">
                                    <div className="relative">
                                        <motion.div
                                            aria-hidden="true"
                                            className={`absolute inset-[-14px] rounded-full blur-2xl ${
                                                callState === "live" || callState === "connecting"
                                                    ? "bg-red-400/20"
                                                    : "bg-sky-300/25"
                                            }`}
                                            animate={
                                                callState === "live" || callState === "connecting"
                                                    ? { scale: [0.96, 1.06, 0.96], opacity: [0.25, 0.55, 0.25] }
                                                    : { scale: [0.94, 1.04, 0.94], opacity: [0.2, 0.42, 0.2] }
                                            }
                                            transition={{ duration: callState === "live" || callState === "connecting" ? 1.8 : 3.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                                        />
                                        <motion.button
                                            type="button"
                                            onClick={handleOrbClick}
                                            disabled={isBusy}
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.985 }}
                                            animate={
                                                callState === "live" || callState === "connecting"
                                                    ? { y: [0, -1, 0], scale: [1, 1.012, 1] }
                                                    : { y: [0, -3, 0], scale: [1, 1.016, 1] }
                                            }
                                            transition={{ duration: callState === "live" || callState === "connecting" ? 1.8 : 3.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                                            className={`group relative flex h-36 w-36 items-center justify-center overflow-hidden rounded-full border transition-all duration-300 md:h-40 md:w-40 ${
                                                callState === "live" || callState === "connecting"
                                                    ? "border-red-300/55 bg-[radial-gradient(circle_at_50%_30%,rgba(140,26,26,0.22),transparent_42%),linear-gradient(180deg,rgba(20,10,20,0.98),rgba(9,6,16,1))] shadow-[0_0_0_1px_rgba(248,113,113,0.14),0_0_46px_rgba(248,113,113,0.16)]"
                                                    : "border-sky-100/80 bg-[radial-gradient(circle_at_34%_28%,rgba(255,255,255,0.92)_0%,rgba(224,242,254,0.7)_20%,rgba(125,211,252,0.42)_38%,rgba(18,42,74,0.94)_72%,rgba(6,14,28,1)_100%)] shadow-[0_0_0_1px_rgba(191,219,254,0.22),0_0_66px_rgba(56,189,248,0.24)] hover:border-white hover:shadow-[0_0_0_1px_rgba(255,255,255,0.3),0_0_82px_rgba(125,211,252,0.34)]"
                                            }`}
                                        >
                                            <div className="absolute inset-[10px] rounded-full border border-white/15" />
                                            <div className="relative flex flex-col items-center gap-3 px-5 text-center">
                                                <div
                                                    className={`flex h-12 w-12 items-center justify-center rounded-full border ${
                                                        callState === "live" || callState === "connecting"
                                                            ? "border-red-300/40 bg-red-500/10 text-red-100"
                                                            : "border-white/35 bg-white/14 text-sky-50"
                                                    }`}
                                                >
                                                    <PhoneCall className="h-4 w-4" />
                                                </div>
                                                <div className="space-y-1">
                                                    <div className="text-[10px] font-mono uppercase tracking-[0.34em] text-gray-400">
                                                        {callState === "live" || callState === "connecting" ? "End Call" : "Voice Demo"}
                                                    </div>
                                                    <div className="text-lg font-black uppercase tracking-[0.16em] text-white md:text-xl">
                                                        {orbLabel}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.button>
                                    </div>
                                </div>
                                <p className="mt-4 text-sm text-gray-300">{statusText}</p>
                            </div>

                            <p className="mb-6 text-sm leading-relaxed text-gray-400">
                                Test how the AI handles after-hours overflow, urgent plumbing calls, quote requests, and callbacks for local service businesses.
                            </p>

                            <div className="mb-6 grid gap-3">
                                <a
                                    href="https://calendly.com/jessallan/30min"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-sky-200/35 px-5 py-3 text-sm font-bold uppercase tracking-wide text-sky-100 transition-all hover:border-sky-200/55 hover:bg-sky-300/10"
                                >
                                    <CalendarDays className="h-4 w-4" />
                                    In-Person Demo
                                </a>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 text-sm font-bold uppercase tracking-wide text-slate-950 transition-colors hover:bg-sky-100"
                                >
                                    Open Contact Form
                                </Link>
                            </div>

                            <div className="mb-6 grid gap-3 text-left sm:grid-cols-2">
                                <a
                                    href="tel:+61404283605"
                                    className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 transition-colors hover:border-sky-200/35"
                                >
                                    <p className="mb-1 inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-sky-200">
                                        <Phone className="h-3 w-3" />
                                        Phone
                                    </p>
                                    <p className="font-mono text-sm text-gray-300">+61 404 283 605</p>
                                </a>
                                <a
                                    href="mailto:jesse@allconvos.ai"
                                    className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 transition-colors hover:border-sky-200/35"
                                >
                                    <p className="mb-1 inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-sky-200">
                                        <Mail className="h-3 w-3" />
                                        Email
                                    </p>
                                    <p className="font-mono text-sm text-gray-300">jesse@allconvos.ai</p>
                                </a>
                            </div>

                            <Link
                                href="/demo"
                                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gray-500 transition-colors hover:text-white"
                            >
                                <ArrowLeft className="h-3 w-3" />
                                Back to Main Demo
                            </Link>
                        </div>
                    </div>
                </motion.div>
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
