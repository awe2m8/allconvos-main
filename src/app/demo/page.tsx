"use client";

import Script from "next/script";

const WIDGET_KEY = "b22b183d-3336-4b9b-973d-12c1e47888c4";

export default function DemoPage() {
    return (
        <main className="min-h-screen bg-ocean-950 text-white">
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

            <div className="min-h-screen flex items-center justify-center p-8">
                <div data-widget-key={WIDGET_KEY} />
            </div>
        </main>
    );
}
