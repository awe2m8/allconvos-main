"use client";

import { motion } from "framer-motion";
import { ArrowLeft, CalendarDays, Mail, Phone, PhoneCall } from "lucide-react";
import Link from "next/link";
import Script from "next/script";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { SelfSellVoiceOrb } from "@/components/app/SelfSellVoiceOrb";

// Using the same generic hook/logic as tradies
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

// Niches configuration
const NICHES = {
    tradies: {
        title: "The AI Receptionist for Tradies",
        subtitle: "Plumbers, Electricians, Builders",
        blurb: "Test how the AI handles after-hours overflow, urgent trade calls, quote requests, and callbacks.",
        phoneNumber: "0485 009 296", // Default demo number or user's specific number
        features: ["24/7 Call Answering", "Smart Job Qualification", "Direct Calendar Booking"],
    },
    gyms: {
        title: "The AI Receptionist for Gyms",
        subtitle: "Fitness Centers, PTs, Studios",
        blurb: "See how the AI books fitness classes, answers membership queries, and qualifies trial passes.",
        phoneNumber: null,
        features: ["Class Scheduling", "Membership Queries", "Trial Booking Automation"],
    },
    clinics: {
        title: "The AI Receptionist for Clinics",
        subtitle: "Dental, Physio, Medical",
        blurb: "Experience polite, HIPAA-compliant patient scheduling, FAQ handling, and after-hours routing.",
        phoneNumber: null,
        features: ["Patient Scheduling", "FAQ Handling", "After-hours Routing"],
    },
    salons: {
        title: "The AI Receptionist for Salons",
        subtitle: "Hair, Beauty, Spas",
        blurb: "Check out how the AI handles appointment adjustments, service questions, and bookings.",
        phoneNumber: null,
        features: ["Appointment Management", "Service Pricing Quotes", "Reminders & Follow-Ups"],
    },
};

export default function NicheDemoPage() {
    const params = useParams();
    const nicheSlug = (params?.niche as string) || "tradies";
    
    // Fallback if niche not found
    const nicheData = (NICHES as any)[nicheSlug] || {
        title: "The AI Receptionist",
        subtitle: "Custom AI Voice Agent",
        blurb: "Experience how an AI Receptionist could transform your call handling and booking flow.",
        phoneNumber: null,
        features: ["24/7 Availability", "Instant Answers", "Automated Booking"],
    };

    return (
        <main className="min-h-screen overflow-hidden bg-ocean-950 text-white selection:bg-white/20">
            {/* Background elements */}
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#24324b_1px,transparent_1px),linear-gradient(to_bottom,#24324b_1px,transparent_1px)] bg-[size:42px_42px] opacity-[0.18] pointer-events-none" />
            <div className="fixed inset-x-0 top-[-10%] mx-auto h-[36rem] w-[36rem] rounded-full bg-cyan-400/8 blur-[120px] pointer-events-none" />

            <div className="relative z-10 mx-auto max-w-7xl px-6 py-10 md:py-14">
                {/* Minimal Header */}
                <nav className="mb-10 flex items-center justify-between gap-4">
                    <div className="flex flex-col items-start">
                        <Link href="/" className="font-mono text-2xl font-bold tracking-tighter text-white hover:text-white/80 transition-colors">
                            allconvos<span className="text-neon">_</span>
                        </Link>
                    </div>
                    <div className="hidden md:flex md:items-center md:gap-2">
                        <Link
                            href="/demos"
                            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white"
                        >
                            <ArrowLeft className="h-3 w-3" />
                            All Demos
                        </Link>
                    </div>
                </nav>

                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                    className="relative mx-auto mb-16 max-w-3xl text-center"
                >
                    <p className="mb-4 text-[11px] font-mono uppercase tracking-[0.34em] text-neon">
                        {nicheData.subtitle}
                    </p>
                    <h1 className="text-4xl font-black tracking-tight text-white md:text-5xl">
                        {nicheData.title}
                    </h1>
                    
                    <div className="mx-auto mt-6 max-w-2xl">
                        <p className="text-lg text-gray-400">
                            {nicheData.blurb}
                        </p>
                    </div>

                    {/* Generic Orb (uses the universal SelfSellVoiceOrb script) */}
                    <div className="mt-16 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                        <div className="w-full max-w-[290px] [&>button]:w-full [&>button]:justify-start">
                            <SelfSellVoiceOrb variant="compact" />
                        </div>
                        
                        {nicheData.phoneNumber && (
                            <a
                                href={`tel:${nicheData.phoneNumber.replace(/\s+/g, '')}`}
                                className="group inline-flex w-full max-w-[290px] items-center justify-between gap-4 rounded-full border border-white/10 bg-ocean-900/90 px-5 py-4 text-left shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_0_36px_rgba(163,230,53,0.12)] transition-all duration-300 hover:border-neon/60 hover:bg-ocean-900"
                            >
                                <div className="min-w-0">
                                    <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-neon/80">
                                        Live Mobile Demo
                                    </p>
                                    <p className="mt-1 text-sm font-black uppercase tracking-[0.16em] text-white">
                                        Call {nicheData.phoneNumber}
                                    </p>
                                    <p className="mt-1 text-xs text-gray-400">
                                        Test from your phone
                                    </p>
                                </div>
                                <ArrowLeft className="h-4 w-4 shrink-0 rotate-180 text-neon transition-transform duration-300 group-hover:translate-x-1" />
                            </a>
                        )}
                    </div>
                </motion.div>

                {/* Features Section */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.1 }}
                    className="mx-auto max-w-3xl"
                >
                    <div className="grid gap-4 sm:grid-cols-3 mb-20 text-center">
                        {nicheData.features.map((feature: string, i: number) => (
                            <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-neon">{feature}</h3>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Bottom Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.2 }}
                    className="mx-auto mt-8 max-w-5xl border-t border-white/10 pt-16"
                >
                    <p className="mb-6 text-center text-sm leading-relaxed text-gray-400">
                        Want a tailored rollout plan? Book a walkthrough or send your requirements.
                    </p>

                    <div className="mb-6 grid gap-3 md:grid-cols-2">
                        <a
                            href="https://api.leadconnectorhq.com/widget/booking/OYHMC46ijO5WgqMTNb8G"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-neon/40 px-5 py-3 text-sm font-bold uppercase tracking-wide text-neon transition-all hover:border-neon hover:bg-neon/10"
                        >
                            <CalendarDays className="h-4 w-4" />
                            Book In Person Demo
                        </a>
                        <Link
                            href="/demos/contact"
                            className="inline-flex items-center justify-center rounded-lg bg-neon px-5 py-3 text-sm font-bold uppercase tracking-wide text-ocean-950 transition-colors hover:bg-white"
                        >
                            Contact Form
                        </Link>
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            href="/demos"
                            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gray-500 transition-colors hover:text-white"
                        >
                            <ArrowLeft className="h-3 w-3" />
                            Back to All Demos
                        </Link>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
