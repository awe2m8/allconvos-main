"use client";

import Link from "next/link";
import Script from "next/script";
import { ArrowLeft, CalendarDays, Mail, MapPin, Phone } from "lucide-react";

const WIDGET_KEY = "b22b183d-3336-4b9b-973d-12c1e47888c4";

export default function DemoPage() {
    return (
        <main className="min-h-screen bg-ocean-950 text-white selection:bg-white/20">
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

            <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 space-y-10">
                <nav className="flex items-center justify-between">
                    <Link href="/" className="font-mono text-2xl font-bold tracking-tighter text-white">
                        allconvos<span className="text-neon">_</span>
                    </Link>
                    <Link
                        href="/build"
                        className="group inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-gray-400 hover:text-white transition-colors uppercase tracking-wider"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Build
                    </Link>
                </nav>

                <section className="bg-gradient-to-b from-ocean-900 to-ocean-950 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                    <div className="h-2 bg-gradient-to-r from-neon via-cyan-400 to-neon" />
                    <div className="px-8 py-10 md:px-12 md:py-12">
                        <p className="font-mono text-xs text-neon uppercase tracking-[0.25em] mb-4">Live Voice Widget Demo</p>
                        <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-3">
                            Try the Orb
                        </h1>
                        <p className="text-gray-400 text-sm md:text-base max-w-3xl">
                            Talk to the live voice widget, then use the options below to continue with a tailored contact workflow.
                        </p>

                        <div className="mt-8 bg-ocean-950/70 rounded-2xl border border-white/10 p-6 md:p-8 flex items-center justify-center">
                            <div data-widget-key={WIDGET_KEY} />
                        </div>

                        <div className="mt-8 grid sm:grid-cols-2 gap-3">
                            <Link
                                href="/go"
                                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm border-2 border-neon/40 text-neon rounded-lg font-bold uppercase tracking-wide font-mono hover:border-neon hover:bg-neon/10 transition-all"
                            >
                                <CalendarDays className="w-4 h-4" />
                                In-Person Demo
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center px-5 py-3 text-sm bg-neon text-ocean-950 rounded-lg font-bold uppercase tracking-wide font-mono hover:bg-white transition-colors"
                            >
                                Open Contact Form
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="grid md:grid-cols-3 gap-4">
                    <div className="rounded-2xl border border-white/10 bg-ocean-900/70 p-5">
                        <p className="inline-flex items-center gap-2 text-neon text-[11px] font-mono uppercase tracking-widest mb-2">
                            <Phone className="w-4 h-4" />
                            Phone
                        </p>
                        <p className="text-sm text-gray-300 font-mono leading-relaxed">
                            +61 404 283 605
                            <br />
                            +61 401 027 141
                        </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-ocean-900/70 p-5">
                        <p className="inline-flex items-center gap-2 text-neon text-[11px] font-mono uppercase tracking-widest mb-2">
                            <Mail className="w-4 h-4" />
                            Email
                        </p>
                        <p className="text-sm text-gray-300 font-mono leading-relaxed">
                            jesse@allconvos.ai
                            <br />
                            giles@allconvos.ai
                        </p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-ocean-900/70 p-5">
                        <p className="inline-flex items-center gap-2 text-neon text-[11px] font-mono uppercase tracking-widest mb-2">
                            <MapPin className="w-4 h-4" />
                            Address
                        </p>
                        <p className="text-sm text-gray-300 font-mono leading-relaxed">
                            50a Habitat Way
                            <br />
                            Lennox Head NSW 2478
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}
