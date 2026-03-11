"use client";

import { CallHandling } from "@/components/sections/CallHandling";
import { CaseStudy } from "@/components/sections/CaseStudy";
import { DIYDemo } from "@/components/sections/DIYDemo";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Problem } from "@/components/sections/Problem";
import { motion } from "framer-motion";
import { ArrowLeft, CalendarDays, Mail, Phone, PhoneCall } from "lucide-react";
import Link from "next/link";
import Script from "next/script";
import { useCallback, useEffect, useMemo, useState } from "react";

const DEMO_CONFIGS = [
    {
        hostId: "ghl-tradies2-widget",
        widgetId: "69a7bdf999dd5635833c8454",
        scriptSrc: "https://beta.leadconnectorhq.com/loader.js",
        resourcesUrl: "https://beta.leadconnectorhq.com/chat-widget/loader.js",
        title: "Voice AI Demo",
        subtitle: "Click the Orb and Start Talking",
        description:
            "Test how the AI handles after-hours overflow, urgent trade calls, quote requests, and callbacks for local service businesses.",
        avatarSrc: "/images/ai-avatar-female.png",
        accentBar: "from-neon via-cyan-400 to-neon",
        accentText: "text-neon",
        idleHaloClass: "bg-cyan-400/26",
        idleConicClass:
            "bg-[conic-gradient(from_0deg,rgba(255,255,255,0)_0deg,rgba(125,211,252,0.2)_70deg,rgba(34,211,238,0.18)_150deg,rgba(14,165,233,0.16)_230deg,rgba(255,255,255,0)_320deg)]",
        idleOrbClass:
            "border-cyan-300/70 bg-[radial-gradient(circle_at_34%_26%,rgba(224,242,254,0.82)_0%,rgba(125,211,252,0.26)_20%,rgba(34,211,238,0.34)_38%,rgba(8,47,73,0.92)_70%,rgba(5,14,30,1)_100%)] shadow-[0_0_0_1px_rgba(103,232,249,0.16),0_0_64px_rgba(56,189,248,0.24)] hover:border-cyan-100 hover:shadow-[0_0_0_1px_rgba(165,243,252,0.24),0_0_84px_rgba(56,189,248,0.32)]",
        idleIconClass: "border-cyan-200/55 bg-cyan-300/10 text-cyan-100",
        idleInnerRingClass: "border-cyan-100/18",
        idleShimmerClass:
            "bg-[radial-gradient(circle_at_28%_24%,rgba(255,255,255,0.34),transparent_18%),radial-gradient(circle_at_72%_74%,rgba(34,211,238,0.18),transparent_26%)]",
    },
    {
        hostId: "ghl-plumbing-example-widget",
        widgetId: "69b161140ec30015b844b0d2",
        scriptSrc: "https://widgets.leadconnectorhq.com/loader.js",
        resourcesUrl: "https://widgets.leadconnectorhq.com/chat-widget/loader.js",
        title: "Tradies Example",
        subtitle: "Plumbing, Hot Water, Burst Pipes, Emergency Callouts",
        description:
            "A plumbing-specific example focused on urgent callouts, hot water issues, pipe bursts, and booking the next available callback.",
        avatarSrc: "/images/ai-avatar.png",
        accentBar: "from-sky-300 via-cyan-300 to-teal-300",
        accentText: "text-cyan-200",
        idleHaloClass: "bg-teal-300/26",
        idleConicClass:
            "bg-[conic-gradient(from_0deg,rgba(255,255,255,0)_0deg,rgba(153,246,228,0.18)_65deg,rgba(45,212,191,0.18)_145deg,rgba(56,189,248,0.14)_225deg,rgba(255,255,255,0)_320deg)]",
        idleOrbClass:
            "border-teal-200/75 bg-[radial-gradient(circle_at_34%_24%,rgba(255,255,255,0.8)_0%,rgba(204,251,241,0.28)_18%,rgba(45,212,191,0.32)_36%,rgba(14,116,144,0.26)_50%,rgba(9,32,48,0.98)_78%)] shadow-[0_0_0_1px_rgba(94,234,212,0.16),0_0_64px_rgba(20,184,166,0.22)] hover:border-teal-100 hover:shadow-[0_0_0_1px_rgba(153,246,228,0.24),0_0_84px_rgba(45,212,191,0.28)]",
        idleIconClass: "border-teal-100/55 bg-teal-300/10 text-teal-100",
        idleInnerRingClass: "border-teal-100/18",
        idleShimmerClass:
            "bg-[radial-gradient(circle_at_28%_24%,rgba(255,255,255,0.3),transparent_18%),radial-gradient(circle_at_74%_72%,rgba(45,212,191,0.2),transparent_24%)]",
    },
] as const;

type CallState = "idle" | "connecting" | "live" | "error";

type DemoConfig = (typeof DEMO_CONFIGS)[number];

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

function useGhlVoiceDemo(config: DemoConfig) {
    const [callState, setCallState] = useState<CallState>("idle");
    const [isWidgetReady, setIsWidgetReady] = useState(false);
    const [isBusy, setIsBusy] = useState(false);
    const [hasCalledOnce, setHasCalledOnce] = useState(false);
    const [isPrewarmed, setIsPrewarmed] = useState(false);

    const getWidgetHost = useCallback(() => {
        const selector = [
            `chat-widget[widget-id="${config.widgetId}"]`,
            `chat-widget[data-widget-id="${config.widgetId}"]`,
            `chat-widget#${config.hostId}-script`,
            `chat-widget#${config.hostId}`,
        ].join(", ");

        return document.querySelector(selector) as HTMLElement | null;
    }, [config.hostId, config.widgetId]);

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
        const styleId = `${config.hostId}-voice-style`;
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
    }, [config.hostId, getWidgetHost]);

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
        if (callState === "connecting") return "Connecting to the voice agent...";
        if (callState === "live") return "Live call in progress";
        if (callState === "error") return "Could not start call. Check mic permission and try again.";
        if (!isWidgetReady) return "Voice engine is loading. Tap the orb to retry.";
        return "Tap the orb to start a voice conversation.";
    }, [callState, isWidgetReady]);

    return {
        callState,
        isBusy,
        orbLabel,
        statusText,
        handleOrbClick,
    };
}

function VoiceDemoCard({ config }: { config: DemoConfig }) {
    const { callState, isBusy, orbLabel, statusText, handleOrbClick } = useGhlVoiceDemo(config);
    const isActive = callState === "live" || callState === "connecting";

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="w-full"
        >
            <Script
                id={`${config.hostId}-script`}
                src={config.scriptSrc}
                data-resources-url={config.resourcesUrl}
                data-widget-id={config.widgetId}
                strategy="afterInteractive"
            />

            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-ocean-900 to-ocean-950 shadow-2xl">
                <div className={`absolute top-0 left-0 h-2 w-full bg-gradient-to-r ${config.accentBar}`} />

                <div className="absolute top-6 left-1/2 z-20 -translate-x-1/2">
                    <div className="h-28 w-28 rounded-full border-2 border-neon bg-black p-[2px] shadow-[0_0_25px_rgba(0,255,255,0.35)]">
                        <img
                            src={config.avatarSrc}
                            alt={config.title}
                            className="h-full w-full rounded-full object-cover"
                        />
                    </div>
                </div>

                <div className="px-8 pb-8 pt-40 text-center">
                    <p className="mb-5 font-mono text-lg font-bold tracking-tighter text-white">
                        allconvos<span className={config.accentText}>_</span>
                    </p>

                    <h2 className="mb-2 text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
                        {config.title}
                    </h2>
                    <p className={`mb-7 text-sm font-bold italic uppercase tracking-widest ${config.accentText}`}>
                        {config.subtitle}
                    </p>

                    <div className="mb-6 rounded-2xl border border-white/5 bg-ocean-950 p-6">
                        <div className="flex items-center justify-center py-3">
                            <div className="relative">
                                <motion.div
                                    aria-hidden="true"
                                    className={`absolute inset-[-18px] rounded-full blur-2xl ${isActive ? "bg-red-400/24" : config.idleHaloClass}`}
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
                                        className={`absolute inset-[-8px] rounded-full blur-md ${config.idleConicClass}`}
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
                                    className={`group relative flex h-36 w-36 items-center justify-center overflow-hidden rounded-full border transition-all duration-300 md:h-40 md:w-40 ${
                                        isActive
                                            ? "border-red-300/55 bg-[radial-gradient(circle_at_50%_30%,rgba(140,26,26,0.22),transparent_42%),linear-gradient(180deg,rgba(20,10,20,0.98),rgba(9,6,16,1))] shadow-[0_0_0_1px_rgba(248,113,113,0.14),0_0_46px_rgba(248,113,113,0.16)]"
                                            : config.idleOrbClass
                                    }`}
                                >
                                    {!isActive ? (
                                        <>
                                            <motion.div
                                                aria-hidden="true"
                                                className={`absolute inset-0 rounded-full ${config.idleShimmerClass}`}
                                                animate={{ opacity: [0.38, 1, 0.38], scale: [0.985, 1.018, 0.985] }}
                                                transition={{ duration: 1.9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                                            />
                                            <motion.div
                                                aria-hidden="true"
                                                className={`absolute inset-[8px] rounded-full border ${config.idleInnerRingClass}`}
                                                animate={{ rotate: [0, -360] }}
                                                transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                            />
                                        </>
                                    ) : null}
                                    <div className="absolute inset-[10px] rounded-full border border-white/5" />
                                    <div className="relative flex flex-col items-center gap-3 px-5 text-center">
                                        <div
                                            className={`flex h-12 w-12 items-center justify-center rounded-full border ${
                                                isActive ? "border-red-300/40 bg-red-500/10 text-red-100" : config.idleIconClass
                                            }`}
                                        >
                                            <PhoneCall className="h-4 w-4" />
                                        </div>
                                        <div className="space-y-1">
                                            <div className="text-[10px] font-mono uppercase tracking-[0.34em] text-gray-400">
                                                {isActive ? "End Call" : "Voice Demo"}
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

                    <p className="mb-1 text-sm leading-relaxed text-gray-400">{config.description}</p>
                </div>
            </div>
        </motion.div>
    );
}

export default function TradiesPage() {
    return (
        <main className="min-h-screen overflow-hidden bg-ocean-950 text-white selection:bg-white/20">
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#24324b_1px,transparent_1px),linear-gradient(to_bottom,#24324b_1px,transparent_1px)] bg-[size:42px_42px] opacity-[0.18] pointer-events-none" />
            <div className="fixed inset-x-0 top-[-10%] mx-auto h-[36rem] w-[36rem] rounded-full bg-cyan-400/8 blur-[120px] pointer-events-none" />

            <div className="relative z-10 mx-auto max-w-7xl px-6 py-10 md:py-14">
                <nav className="mb-10 flex items-center">
                    <Link href="/" className="font-mono text-2xl font-bold tracking-tighter text-white">
                        allconvos<span className="text-neon">_</span>
                    </Link>
                </nav>

                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                    className="mx-auto mb-10 max-w-4xl text-center"
                >
                    <p className="mb-4 text-[11px] font-mono uppercase tracking-[0.34em] text-neon">
                        Tradies Voice AI Demo
                    </p>
                    <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl">
                        Hear Your AI
                        <span className="block bg-gradient-to-r from-neon via-cyan-300 to-white bg-clip-text text-transparent">
                            Receptionist in Action
                        </span>
                    </h1>
                    <p className="mt-5 text-sm font-mono uppercase tracking-[0.28em] text-neon/85 md:text-base">
                        All calls, all convos, no worries.
                    </p>
                    <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-gray-400 md:text-lg">
                        Test two voice AI examples. One helps you talk through your business and role play how an AI
                        receptionist could work for you. The other is a tradie plumber example focused on real
                        callouts, quote requests, and after-hours enquiries.
                    </p>
                    <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-white/85 md:text-base">
                        Call{" "}
                        <a
                            href="tel:0485009296"
                            className="font-mono font-bold tracking-[0.18em] text-neon underline decoration-neon/40 underline-offset-4 transition-colors hover:text-white"
                        >
                            0485 009 296
                        </a>{" "}
                        to hear a live voice AI receptionist in action, or click either example below to compare both
                        conversation styles.
                    </p>
                </motion.div>

                <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
                    {DEMO_CONFIGS.map((config) => (
                        <VoiceDemoCard key={config.hostId} config={config} />
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.08 }}
                    className="mx-auto mt-8 max-w-5xl"
                >
                    <p className="mb-6 text-center text-sm leading-relaxed text-gray-400">
                        Want a tailored rollout plan after testing? Book a walkthrough or send your requirements.
                    </p>

                    <div className="mb-6 grid gap-3 md:grid-cols-2">
                        <a
                            href="https://calendly.com/jessallan/30min"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-neon/40 px-5 py-3 text-sm font-bold uppercase tracking-wide text-neon transition-all hover:border-neon hover:bg-neon/10"
                        >
                            <CalendarDays className="h-4 w-4" />
                            Book In Person Demo
                        </a>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center rounded-lg bg-neon px-5 py-3 text-sm font-bold uppercase tracking-wide text-ocean-950 transition-colors hover:bg-white"
                        >
                            Contact Form
                        </Link>
                    </div>

                    <div className="mb-6 grid gap-3 text-left sm:grid-cols-2">
                        <a
                            href="tel:+61404283605"
                            className="rounded-xl border border-white/10 bg-ocean-900/70 px-4 py-3 transition-colors hover:border-neon/40"
                        >
                            <p className="mb-1 inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-neon">
                                <Phone className="h-3 w-3" />
                                Phone
                            </p>
                            <p className="font-mono text-sm text-gray-300">+61 404 283 605</p>
                        </a>
                        <a
                            href="mailto:jesse@allconvos.ai"
                            className="rounded-xl border border-white/10 bg-ocean-900/70 px-4 py-3 transition-colors hover:border-neon/40"
                        >
                            <p className="mb-1 inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-neon">
                                <Mail className="h-3 w-3" />
                                Email
                            </p>
                            <p className="font-mono text-sm text-gray-300">jesse@allconvos.ai</p>
                        </a>
                    </div>

                    <div className="text-center">
                        <Link
                            href="/demo"
                            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gray-500 transition-colors hover:text-white"
                        >
                            <ArrowLeft className="h-3 w-3" />
                            Back to Main Demo
                        </Link>
                    </div>
                </motion.div>
            </div>

            <section className="relative z-10 border-t border-white/6 bg-ocean-950">
                <DIYDemo
                    heading="Try calling an actual mobile number to get a feel for your receptionist"
                    description="Call the live mobile demo below to hear how your AI receptionist could handle plumbing questions, urgent callouts, pricing, and booking requests before you move into the web demo."
                    featureTitle="Call our tradies mobile demo"
                    featureDescription="Ask about plumbing jobs, emergency callouts, hot water issues, fees, or next availability."
                    phoneEyebrow="CALL THE MOBILE DEMO"
                    phoneHelper="Call this number now"
                    webDemoLabel="Or Start Live Web Demo"
                />
                <Problem />
                <CallHandling />
                <CaseStudy />
                <HowItWorks />
            </section>
        </main>
    );
}
