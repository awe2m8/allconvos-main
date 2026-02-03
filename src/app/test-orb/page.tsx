"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TestOrbPage() {
    useEffect(() => {
        // Load the widget script
        const script = document.createElement("script");
        script.src = "https://d2cqc7yqzf8c8f.cloudfront.net/web-widget-v1.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            // Cleanup script on unmount
            const existingScript = document.querySelector(
                'script[src="https://d2cqc7yqzf8c8f.cloudfront.net/web-widget-v1.js"]'
            );
            if (existingScript) {
                existingScript.remove();
            }
        };
    }, []);

    return (
        <main className="min-h-screen bg-ocean-950 relative">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-neon/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="relative z-10 container mx-auto px-6 py-12">
                {/* Header */}
                <div className="mb-12">
                    <Link
                        href="/build"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium mb-6"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Build
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                        Test <span className="text-neon">Orb</span>
                    </h1>
                    <p className="text-gray-400 mt-2">Widget testing area</p>
                </div>

                {/* Widget Container */}
                <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-white/5 border border-white/10">
                    <div data-widget-key="b22b183d-3336-4b9b-973d-12c1e47888c4"></div>
                </div>
            </div>
        </main>
    );
}
