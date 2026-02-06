"use client";

import React from "react";
import { Bot, Phone, MessageSquare, Sparkles, Mic, Zap, Shield } from "lucide-react";

export default function TestGraphicsPage() {
    return (
        <main className="min-h-screen bg-ocean-950 text-white p-8">
            <div className="max-w-4xl mx-auto space-y-16">
                <h1 className="text-2xl font-mono text-gray-500 mb-8">Test Graphics - Unlinked Page</h1>

                {/* ===== VARIATION 1: Original Style ===== */}
                <section className="space-y-4">
                    <p className="text-xs font-mono text-neon uppercase tracking-widest">Variation 1 - Original Style</p>
                    <div className="bg-ocean-950 p-8 md:p-12 rounded-2xl border border-white/10">
                        <div className="flex items-start justify-between gap-8">
                            <div className="flex-1">
                                <p className="font-mono text-xl font-bold tracking-tighter text-white mb-6">
                                    allconvos<span className="text-neon">_</span>
                                </p>
                                <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-tight mb-2">
                                    CREATE YOUR AI
                                </h2>
                                <h2 className="text-4xl md:text-5xl font-black text-neon uppercase italic tracking-tighter leading-tight mb-6">
                                    RECEPTIONIST
                                </h2>
                                <p className="text-xl font-black text-neon italic uppercase tracking-tight mb-8">
                                    — TEST IT FREE
                                </p>
                                <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                                    Use the voice interface to tell us about your business, pricing, and how you handle customers. We'll build your AI agent and call you so you can test it.
                                </p>
                            </div>
                            <div className="hidden md:block relative">
                                <div className="w-32 h-32 rounded-full border-4 border-neon flex items-center justify-center bg-ocean-900 shadow-[0_0_40px_rgba(217,255,65,0.3)]">
                                    <Bot className="w-12 h-12 text-neon" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===== VARIATION 2: Centered Layout ===== */}
                <section className="space-y-4">
                    <p className="text-xs font-mono text-neon uppercase tracking-widest">Variation 2 - Centered Layout</p>
                    <div className="bg-ocean-950 p-8 md:p-12 rounded-2xl border border-white/10 text-center">
                        <p className="font-mono text-xl font-bold tracking-tighter text-white mb-8">
                            allconvos<span className="text-neon">_</span>
                        </p>
                        <div className="w-24 h-24 rounded-full border-4 border-neon flex items-center justify-center bg-ocean-900 shadow-[0_0_40px_rgba(217,255,65,0.3)] mx-auto mb-8">
                            <Phone className="w-10 h-10 text-neon" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-tight mb-2">
                            CREATE YOUR AI
                        </h2>
                        <h2 className="text-3xl md:text-5xl font-black text-neon uppercase italic tracking-tighter leading-tight mb-6">
                            RECEPTIONIST
                        </h2>
                        <p className="text-lg font-black text-neon italic uppercase tracking-tight mb-6">
                            — TEST IT FREE
                        </p>
                        <p className="text-gray-400 text-base leading-relaxed max-w-lg mx-auto">
                            Use the voice interface to tell us about your business, pricing, and how you handle customers. We'll build your AI agent and call you so you can test it.
                        </p>
                    </div>
                </section>

                {/* ===== VARIATION 3: Compact Header ===== */}
                <section className="space-y-4">
                    <p className="text-xs font-mono text-neon uppercase tracking-widest">Variation 3 - Compact Header (for narrow forms)</p>
                    <div className="bg-ocean-950 p-6 md:p-8 rounded-2xl border border-white/10 max-w-md mx-auto">
                        <div className="flex items-center justify-between mb-6">
                            <p className="font-mono text-lg font-bold tracking-tighter text-white">
                                allconvos<span className="text-neon">_</span>
                            </p>
                            <div className="w-12 h-12 rounded-full border-2 border-neon flex items-center justify-center bg-ocean-900">
                                <Mic className="w-5 h-5 text-neon" />
                            </div>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter leading-tight mb-1">
                            CREATE YOUR AI
                        </h2>
                        <h2 className="text-2xl md:text-3xl font-black text-neon uppercase italic tracking-tighter leading-tight mb-4">
                            RECEPTIONIST
                        </h2>
                        <p className="text-sm font-bold text-neon italic uppercase tracking-tight mb-4">
                            — TEST IT FREE
                        </p>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Tell us about your business and we'll build your AI agent.
                        </p>
                    </div>
                </section>

                {/* ===== VARIATION 4: With Gradient Accent ===== */}
                <section className="space-y-4">
                    <p className="text-xs font-mono text-neon uppercase tracking-widest">Variation 4 - With Gradient Accent Bar</p>
                    <div className="bg-ocean-950 rounded-2xl border border-white/10 overflow-hidden">
                        <div className="h-2 bg-gradient-to-r from-neon via-cyan-400 to-neon" />
                        <div className="p-8 md:p-12">
                            <div className="flex items-start justify-between gap-8">
                                <div className="flex-1">
                                    <p className="font-mono text-xl font-bold tracking-tighter text-white mb-6">
                                        allconvos<span className="text-neon">_</span>
                                    </p>
                                    <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-tight mb-2">
                                        CREATE YOUR AI
                                    </h2>
                                    <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon to-cyan-400 uppercase italic tracking-tighter leading-tight mb-6">
                                        RECEPTIONIST
                                    </h2>
                                    <p className="text-xl font-black text-neon italic uppercase tracking-tight mb-8">
                                        — TEST IT FREE
                                    </p>
                                    <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                                        Use the voice interface to tell us about your business, pricing, and how you handle customers. We'll build your AI agent and call you so you can test it.
                                    </p>
                                </div>
                                <div className="hidden md:block relative">
                                    <div className="absolute -inset-3 bg-neon/20 rounded-full blur-xl animate-pulse" />
                                    <div className="relative w-32 h-32 rounded-full border-4 border-neon flex items-center justify-center bg-ocean-900 shadow-[0_0_40px_rgba(217,255,65,0.3)]">
                                        <Bot className="w-12 h-12 text-neon" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===== VARIATION 5: Minimal / Clean ===== */}
                <section className="space-y-4">
                    <p className="text-xs font-mono text-neon uppercase tracking-widest">Variation 5 - Minimal / Clean</p>
                    <div className="bg-ocean-950 p-8 md:p-12 rounded-2xl border border-white/10">
                        <p className="font-mono text-lg font-bold tracking-tighter text-white/50 mb-8">
                            allconvos<span className="text-neon">_</span>
                        </p>
                        <h2 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-2">
                            AI
                        </h2>
                        <h2 className="text-5xl md:text-6xl font-black text-neon uppercase italic tracking-tighter leading-none mb-8">
                            RECEPTIONIST
                        </h2>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-px flex-1 bg-white/10" />
                            <span className="text-neon font-black italic uppercase text-sm tracking-widest">TEST IT FREE</span>
                            <div className="h-px flex-1 bg-white/10" />
                        </div>
                        <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                            Tell us about your business. We'll build your AI agent and call you to test it.
                        </p>
                    </div>
                </section>

                {/* ===== VARIATION 6: Different Headline ===== */}
                <section className="space-y-4">
                    <p className="text-xs font-mono text-neon uppercase tracking-widest">Variation 6 - Alternative Copy</p>
                    <div className="bg-ocean-950 p-8 md:p-12 rounded-2xl border border-white/10">
                        <div className="flex items-start justify-between gap-8">
                            <div className="flex-1">
                                <p className="font-mono text-xl font-bold tracking-tighter text-white mb-6">
                                    allconvos<span className="text-neon">_</span>
                                </p>
                                <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-tight mb-2">
                                    BUILD YOUR
                                </h2>
                                <h2 className="text-4xl md:text-5xl font-black text-neon uppercase italic tracking-tighter leading-tight mb-6">
                                    VOICE AGENT
                                </h2>
                                <p className="text-xl font-black text-white/50 italic uppercase tracking-tight mb-8">
                                    — IN MINUTES
                                </p>
                                <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                                    Describe your business, pricing, and services. Our AI learns and calls you back so you can test it live.
                                </p>
                            </div>
                            <div className="hidden md:block relative">
                                <div className="w-32 h-32 rounded-full border-4 border-white/20 flex items-center justify-center bg-ocean-900">
                                    <Sparkles className="w-12 h-12 text-neon" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===== VARIATION 7: Wide Banner Style ===== */}
                <section className="space-y-4">
                    <p className="text-xs font-mono text-neon uppercase tracking-widest">Variation 7 - Wide Banner (for full-width forms)</p>
                    <div className="bg-gradient-to-r from-ocean-950 via-ocean-900 to-ocean-950 p-6 rounded-2xl border border-white/10">
                        <div className="flex items-center justify-between gap-6">
                            <p className="font-mono text-lg font-bold tracking-tighter text-white">
                                allconvos<span className="text-neon">_</span>
                            </p>
                            <div className="flex-1 text-center">
                                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">
                                    <span className="text-white">CREATE YOUR AI </span>
                                    <span className="text-neon italic">RECEPTIONIST</span>
                                </h2>
                            </div>
                            <p className="text-sm font-bold text-neon italic uppercase tracking-tight">
                                TEST FREE
                            </p>
                        </div>
                    </div>
                </section>

                {/* Instructions */}
                <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-400">
                    <p className="font-bold text-white mb-2">📸 How to use:</p>
                    <ol className="list-decimal list-inside space-y-1">
                        <li>Screenshot any variation above</li>
                        <li>Upload to GoHighLevel form as header image</li>
                        <li>Let me know which style you prefer and I can adjust the copy/colors</li>
                    </ol>
                </div>
            </div>
        </main>
    );
}
