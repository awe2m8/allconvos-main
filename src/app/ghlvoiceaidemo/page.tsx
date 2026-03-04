"use client";

import Link from "next/link";
import Script from "next/script";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";

const GHL_WIDGET_ID = "69a7bdf999dd5635833c8454";

export default function GhlVoiceAiDemoPage() {
    useEffect(() => {
        const applyVoiceLauncherStyle = () => {
            const allWidgets = Array.from(document.querySelectorAll("chat-widget")) as HTMLElement[];
            allWidgets.forEach((widget) => {
                if (widget.id !== "ghl-voice-demo-widget") {
                    widget.style.display = "none";
                }
            });

            const target = document.querySelector("chat-widget#ghl-voice-demo-widget") as HTMLElement | null;
            if (!target?.shadowRoot) return false;

            target.style.position = "fixed";
            target.style.left = "50%";
            target.style.top = "200px";
            target.style.right = "auto";
            target.style.bottom = "auto";
            target.style.transform = "translateX(-50%)";
            target.style.zIndex = "70";

            const root = target.shadowRoot;
            const existingStyle = root.getElementById("ghl-voice-demo-style");
            if (existingStyle) return true;

            const style = document.createElement("style");
            style.id = "ghl-voice-demo-style";
            style.textContent = `
                #lc_text-widget {
                    left: 50% !important;
                    right: auto !important;
                    top: 0 !important;
                    bottom: auto !important;
                    transform: translateX(-50%) !important;
                }

                .lc_text-widget--prompt,
                .lc_text-widget_prompt--msg-bubble {
                    display: none !important;
                }

                #lc_text-widget--btn {
                    left: 50% !important;
                    right: auto !important;
                    top: 0 !important;
                    bottom: auto !important;
                    transform: translateX(-50%) !important;
                    width: 84px !important;
                    height: 84px !important;
                    border-radius: 9999px !important;
                    background: radial-gradient(circle at 30% 30%, #0e243a 0%, #0a1628 55%, #070f1e 100%) !important;
                    border: 2px solid rgba(192, 239, 34, 0.75) !important;
                    box-shadow: 0 0 0 2px rgba(192, 239, 34, 0.14), 0 0 24px rgba(0, 255, 255, 0.2) !important;
                }
            `;

            root.appendChild(style);
            return true;
        };

        const observer = new MutationObserver(() => {
            applyVoiceLauncherStyle();
        });

        observer.observe(document.body, { childList: true, subtree: true });

        const runFast = window.setTimeout(applyVoiceLauncherStyle, 120);
        const runSlow = window.setTimeout(applyVoiceLauncherStyle, 600);

        return () => {
            observer.disconnect();
            window.clearTimeout(runFast);
            window.clearTimeout(runSlow);
        };
    }, []);

    return (
        <main className="min-h-screen bg-ocean-950 text-white selection:bg-white/20">
            <Script
                id="ghl-voice-demo-widget"
                src="https://beta.leadconnectorhq.com/loader.js"
                data-resources-url="https://beta.leadconnectorhq.com/chat-widget/loader.js"
                data-widget-id={GHL_WIDGET_ID}
                strategy="afterInteractive"
            />

            <style jsx global>{`
                chat-widget:not(#ghl-voice-demo-widget) {
                    display: none !important;
                }
            `}</style>

            <div className="fixed inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-10 pointer-events-none" />
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-full bg-white/5 blur-[120px] pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto px-6 pt-12 text-center">
                <p className="font-mono text-lg font-bold tracking-tighter text-white mb-4">
                    allconvos<span className="text-neon">_</span>
                </p>
                <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-3">GHL Voice AI Demo</h1>
                <p className="text-neon font-bold italic uppercase text-sm tracking-widest mb-6">
                    Voice Launcher Positioned Top-Center
                </p>
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
