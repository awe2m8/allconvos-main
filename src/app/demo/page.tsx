"use client";

import Link from "next/link";
import Script from "next/script";
import { motion } from "framer-motion";
import { ArrowLeft, CalendarDays, Mail, Phone } from "lucide-react";

const WIDGET_KEY = "b22b183d-3336-4b9b-973d-12c1e47888c4";

export default function DemoPage() {
    return (
        <main className="min-h-screen bg-ocean-950 text-white selection:bg-white/20 flex items-center justify-center p-4">
            <Script
                src="https://d2cqc7yqzf8c8f.cloudfront.net/web-widget-v1.js"
                strategy="afterInteractive"
                onLoad={() => {
                    // The widget initializes on DOMContentLoaded; re-fire on client route render.
                    document.dispatchEvent(new Event("DOMContentLoaded"));
                }}
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
                    width: 96px !important;
                    height: 96px !important;
                }

                [data-widget-key="${WIDGET_KEY}"] #web-widget-container .wcw-quiet {
                    width: 36px !important;
                    height: 36px !important;
                }
            `}</style>

            <div className="fixed inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-10 pointer-events-none" />
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-full bg-white/5 blur-[120px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="relative z-10 w-full max-w-lg"
            >
                <div className="bg-gradient-to-b from-ocean-900 to-ocean-950 rounded-2xl border border-white/10 overflow-hidden shadow-2xl relative">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-neon via-cyan-400 to-neon" />

                    <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
                        <div className="w-24 h-24 rounded-full border-2 border-neon bg-black p-1 shadow-[0_0_25px_rgba(0,255,255,0.35)]">
                            <img
                                src="/images/ai-avatar.png"
                                alt="AI Analyst"
                                className="w-full h-full rounded-full object-cover"
                            />
                        </div>
                    </div>

                    <div className="px-8 pb-8 pt-36 text-center">
                        <p className="font-mono text-lg font-bold tracking-tighter text-white mb-5">
                            allconvos<span className="text-neon">_</span>
                        </p>

                        <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-2">
                            Live Voice Demo
                        </h1>
                        <p className="text-neon font-bold italic uppercase text-sm tracking-widest mb-7">
                            Click the Orb and Start Talking
                        </p>

                        <div className="bg-ocean-950 rounded-2xl p-6 mb-6 border border-white/5">
                            <div className="flex items-center justify-center py-3">
                                <div data-widget-key={WIDGET_KEY} />
                            </div>
                        </div>

                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Want a tailored rollout plan after testing? Book a walkthrough or send your requirements.
                        </p>

                        <div className="grid gap-3 mb-6">
                            <a
                                href="https://calendly.com/jessallan/30min"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm border-2 border-neon/40 text-neon rounded-lg font-bold uppercase tracking-wide font-mono hover:border-neon hover:bg-neon/10 transition-all"
                            >
                                <CalendarDays className="w-4 h-4" />
                                In-Person Demo
                            </a>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center px-5 py-3 text-sm bg-neon text-ocean-950 rounded-lg font-bold uppercase tracking-wide font-mono hover:bg-white transition-colors"
                            >
                                Open Contact Form
                            </Link>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-3 text-left mb-6">
                            <a
                                href="tel:+61404283605"
                                className="rounded-xl border border-white/10 bg-ocean-900/70 px-4 py-3 hover:border-neon/40 transition-colors"
                            >
                                <p className="inline-flex items-center gap-2 text-neon text-[10px] font-mono uppercase tracking-widest mb-1">
                                    <Phone className="w-3 h-3" />
                                    Phone
                                </p>
                                <p className="text-sm text-gray-300 font-mono">+61 404 283 605</p>
                            </a>
                            <a
                                href="mailto:jesse@allconvos.ai"
                                className="rounded-xl border border-white/10 bg-ocean-900/70 px-4 py-3 hover:border-neon/40 transition-colors"
                            >
                                <p className="inline-flex items-center gap-2 text-neon text-[10px] font-mono uppercase tracking-widest mb-1">
                                    <Mail className="w-3 h-3" />
                                    Email
                                </p>
                                <p className="text-sm text-gray-300 font-mono">jesse@allconvos.ai</p>
                            </a>
                        </div>

                        <Link
                            href="/build"
                            className="inline-flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-white transition-colors uppercase tracking-wider"
                        >
                            <ArrowLeft className="w-3 h-3" />
                            Back to Build Page
                        </Link>
                    </div>
                </div>
            </motion.div>
        </main>
    );
}
