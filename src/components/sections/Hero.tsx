"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { ArrowRight } from "lucide-react";
import { SelfSellVoiceOrb } from "../app/SelfSellVoiceOrb";
import { marketingUrl } from "@/lib/siteUrls";

export function Hero() {
    const [isHighlighting, setIsHighlighting] = useState(false);
    const tradiesDemoUrl = marketingUrl("/tradies");

    const handleTalkClick = () => {
        setIsHighlighting(true);
        setTimeout(() => setIsHighlighting(false), 2000);
    };

    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)] opacity-20 pointer-events-none" />

            {/* Glow Orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen animate-pulse" />
            <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 text-center">
                <div className="flex w-full max-w-4xl flex-col items-center gap-8 pt-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center space-x-2 bg-ocean-800/50 border border-white/10 px-3 py-1 rounded-full"
                    >
                        <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
                        <span className="text-xs font-mono text-neon uppercase tracking-wider">System Online</span>
                        <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
                        <span className="text-xs font-mono text-neon uppercase tracking-wider">Ready for calls</span>
                        <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
                        <span className="text-xs font-mono text-neon uppercase tracking-wider">24/7/365</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl font-bold leading-[0.9] text-white md:text-6xl lg:text-7xl"
                    >
                        STOP MISSING <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon to-emerald-400">CALLS.</span> <br />
                        START MAKING <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon to-emerald-400">MONEY.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="max-w-2xl text-xl leading-relaxed text-gray-400"
                    >
                        The AI receptionist that answers every call, qualifies every lead, and books jobs 24/7—so you can get back on the tools.
                    </motion.p>

                    <motion.div
                        id="mission-control"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.25 }}
                        className="relative w-full max-w-3xl"
                    >
                        <div className="absolute inset-10 rounded-full bg-neon/10 blur-[90px] pointer-events-none" />
                        <div className="absolute inset-x-16 top-12 h-40 rounded-full bg-cyan-400/8 blur-[80px] pointer-events-none" />

                        {isHighlighting && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 0.35, 0] }}
                                transition={{ duration: 1.5, times: [0, 0.5, 1] }}
                                className="absolute inset-4 z-20 rounded-[2rem] border border-neon/60 bg-neon/6 pointer-events-none"
                            />
                        )}

                        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,18,34,0.96),rgba(4,10,22,1))] shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_40px_120px_rgba(2,8,20,0.85)]">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(163,230,53,0.08),transparent_24%),radial-gradient(circle_at_50%_58%,rgba(56,189,248,0.08),transparent_34%)]" />

                            <div className="relative flex min-h-[340px] items-center justify-center overflow-hidden px-8 py-12 sm:min-h-[380px]">
                                <div className="scale-[1.35] sm:scale-[1.45]">
                                    <SelfSellVoiceOrb />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.28 }}
                        className="w-full max-w-3xl rounded-2xl border border-neon/20 bg-white/[0.04] px-5 py-4 text-left shadow-[0_0_0_1px_rgba(163,230,53,0.05)]"
                    >
                        <div className="flex items-start gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-neon/20 bg-neon/10 text-neon">
                                <ArrowRight className="h-4 w-4 rotate-[-45deg]" />
                            </div>
                            <div>
                                <p className="mb-1 text-[10px] font-mono uppercase tracking-[0.3em] text-neon/80">
                                    Live Mobile Demo
                                </p>
                                <p className="text-sm leading-relaxed text-white/90 md:text-base">
                                    Call{" "}
                                    <a
                                        href="tel:0485009296"
                                        className="font-mono font-bold tracking-[0.18em] text-neon underline decoration-neon/40 underline-offset-4 transition-colors hover:text-white"
                                    >
                                        0485 009 296
                                    </a>{" "}
                                    to hear a live voice AI receptionist in action, or click through for more demos.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col justify-center gap-4 pt-2 sm:flex-row"
                    >
                        <Link
                            href={tradiesDemoUrl}
                            className="inline-flex items-center justify-center px-8 py-4 font-bold rounded-sm uppercase tracking-wide font-mono transition-all duration-200 outline-none focus:ring-2 focus:ring-neon focus:ring-offset-2 focus:ring-offset-ocean-950 bg-neon text-ocean-950 border-2 border-neon shadow-[0px_0px_20px_rgba(163,230,53,0.3)] hover:bg-neon-hover hover:shadow-[0px_0px_30px_rgba(163,230,53,0.5)] active:translate-y-0.5"
                        >
                            More Demos
                        </Link>
                        <Button
                            variant="secondary"
                            className="group"
                            onClick={handleTalkClick}
                        >
                            Try our voice AI now <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="pt-2 text-xs font-mono uppercase tracking-widest text-neon/60"
                    >
                        No complex setup. No "tech bro" jargon. Just results.
                    </motion.p>
                </div>
            </div>
        </section>
    );
}
