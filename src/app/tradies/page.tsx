"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Script from "next/script";
import {
    ArrowLeft,
    CalendarDays,
    CheckCircle2,
    Wrench,
} from "lucide-react";
import { useEffect } from "react";

const WIDGET_KEY = "b22b183d-3336-4b9b-973d-12c1e47888c4";

function initializeWidget() {
    // Re-trigger the vendor widget scan after the script loads on this route.
    document.dispatchEvent(new Event("DOMContentLoaded"));
}

export default function TradiesPage() {
    useEffect(() => {
        const fast = window.setTimeout(initializeWidget, 60);
        const slow = window.setTimeout(initializeWidget, 260);

        return () => {
            window.clearTimeout(fast);
            window.clearTimeout(slow);
        };
    }, []);

    return (
        <main className="min-h-screen bg-ocean-950 text-white selection:bg-white/20 overflow-hidden">
            <Script
                src="https://d2cqc7yqzf8c8f.cloudfront.net/web-widget-v1.js"
                strategy="afterInteractive"
                onLoad={initializeWidget}
                onReady={initializeWidget}
            />

            <style jsx global>{`
                [data-widget-key="${WIDGET_KEY}"] {
                    width: auto !important;
                    display: inline-flex !important;
                    justify-content: center !important;
                    align-items: center !important;
                    margin: 0 auto !important;
                }

                [data-widget-key="${WIDGET_KEY}"] .wcw-widget-wrapper {
                    width: auto !important;
                }

                [data-widget-key="${WIDGET_KEY}"] #web-widget-container,
                [data-widget-key="${WIDGET_KEY}"] #web-widget-container.text-mode,
                [data-widget-key="${WIDGET_KEY}"] #web-widget-container.text-mode.idle,
                [data-widget-key="${WIDGET_KEY}"] #web-widget-container.text-mode.always-expanded {
                    border-radius: 50% !important;
                    padding: 0 !important;
                    gap: 0 !important;
                    width: auto !important;
                    max-width: none !important;
                    background: transparent !important;
                    border: none !important;
                    box-shadow: none !important;
                }

                [data-widget-key="${WIDGET_KEY}"] #web-widget-container .wcw-text-container {
                    display: none !important;
                    width: 0 !important;
                    margin: 0 !important;
                    opacity: 0 !important;
                    pointer-events: none !important;
                }

                [data-widget-key="${WIDGET_KEY}"] #web-widget-container .wcw-state-container {
                    width: 132px !important;
                    height: 132px !important;
                }

                [data-widget-key="${WIDGET_KEY}"] #web-widget-container .wcw-quiet {
                    width: 48px !important;
                    height: 48px !important;
                }
            `}</style>

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
                                        Voice Orb Demo
                                    </p>
                                    <h2 className="text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
                                        Talk to the AI
                                    </h2>
                                    <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-gray-400">
                                        Click the orb and act like a customer calling your business. Test urgent jobs,
                                        quotes, booking requests, or after-hours enquiries.
                                    </p>
                                </div>

                                <div className="mb-7 rounded-[2rem] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(192,239,34,0.06),transparent_30%),linear-gradient(180deg,rgba(7,15,30,0.95),rgba(3,8,23,0.98))] p-7">
                                    <div className="flex items-center justify-center py-4">
                                        <div data-widget-key={WIDGET_KEY} />
                                    </div>
                                </div>

                                <div className="grid gap-3 sm:grid-cols-2">
                                    <a
                                        href="https://calendly.com/jessallan/30min"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-neon/40 px-5 py-4 text-sm font-bold uppercase tracking-[0.18em] text-neon transition-all hover:border-neon hover:bg-neon/10"
                                    >
                                        <CalendarDays className="h-4 w-4" />
                                        Book a Walkthrough
                                    </a>
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center justify-center rounded-xl bg-neon px-5 py-4 text-sm font-bold uppercase tracking-[0.18em] text-ocean-950 transition-colors hover:bg-white"
                                    >
                                        Request a Custom Build
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
