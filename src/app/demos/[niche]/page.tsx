"use client";

import { motion } from "framer-motion";
import { ArrowLeft, CalendarDays, Mail, Phone, PhoneCall } from "lucide-react";
import Link from "next/link";
import Script from "next/script";
import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { SelfSellVoiceOrb } from "@/components/app/SelfSellVoiceOrb";
import { Sun, Hammer, Dumbbell, Play, Pause, Stethoscope, Scissors, Sparkles, Wrench, Droplets } from "lucide-react";

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

const NICHES = {
    solar: {
        title: "The AI Receptionist for Solar",
        subtitle: "Solar Installations, Energy Quotes",
        blurb: "Experience how the AI handles solar panel inquiries, qualifies roof types, and books property assessments.",
        phoneNumber: null,
        features: ["Lead Qualification", "Property Assessments", "General Enquiries"],
        widgetId: "69b2e21d4d840e52e6d98441",
        orbLabel: "Solar AI Voice Demo",
        audioFile: null,
        icon: Sun,
        color: "from-yellow-500/20 to-orange-500/20",
        accent: "text-yellow-400",
    },
    gyms: {
        title: "The AI Receptionist for Gyms",
        subtitle: "Fitness Centers, PTs, Studios",
        blurb: "See how the AI books fitness classes, answers membership queries, and qualifies trial passes.",
        phoneNumber: null,
        features: ["Class Scheduling", "Membership Queries", "Trial Booking Automation"],
        widgetId: "69b2e37c6a7fad30792c5b39",
        orbLabel: "Gym AI Voice Demo",
        audioFile: "gymdemoV1.mp3",
        audioTitle: "Gyms",
        audioDesc: "Book trial classes and handle membership enquiries 24/7.",
        icon: Dumbbell,
        color: "from-purple-500/20 to-pink-500/20",
        accent: "text-purple-400",
    },
    tradies: {
        title: "The AI Receptionist for Tradies",
        subtitle: "Plumbers, Electricians, Builders",
        blurb: "Test how the AI handles after-hours overflow, urgent trade calls, quote requests, and callbacks.",
        phoneNumber: "0485 009 296", // Default demo number or user's specific number
        features: ["24/7 Call Answering", "Smart Job Qualification", "Direct Calendar Booking"],
        widgetId: "69b2dd4c6a7fad7efe2a936f",
        orbLabel: "Tradie AI Voice Demo",
        audioFile: "tradies.mp3",
        audioTitle: "Tradies",
        audioDesc: "Dispatch teams and capture job details while you're on tools.",
        icon: Hammer,
        color: "from-blue-500/20 to-cyan-500/20",
        accent: "text-blue-400",
    },
    clinics: {
        title: "The AI Receptionist for Clinics",
        subtitle: "Dental, Physio, Medical",
        blurb: "Experience polite, HIPAA-compliant patient scheduling, FAQ handling, and after-hours routing.",
        phoneNumber: null,
        features: ["Patient Scheduling", "FAQ Handling", "After-hours Routing"],
        widgetId: "69b2f4e90ec3008fc3ae2714",
        orbLabel: "Clinic AI Voice Demo",
        audioFile: null,
    },
    salons: {
        title: "The AI Receptionist for Salon's, Massage and Spa's",
        subtitle: "Hair, Beauty, Spas, Massage Parlours",
        blurb: "Check out how the AI handles appointment adjustments, service questions, and massage bookings.",
        phoneNumber: null,
        features: ["Appointment Management", "Service Pricing Quotes", "Reminders & Follow-Ups"],
        widgetId: "69b2ee934d840e7823dd75f5",
        orbLabel: "Salon AI Voice Demo",
        audioFile: null,
    },
    automotive: {
        title: "The AI Receptionist for Automotive",
        subtitle: "Mechanics, Auto Body, Dealerships",
        blurb: "See how the AI books maintenance services, handles repair status updates, and quotes.",
        phoneNumber: null,
        features: ["Repair Scheduling", "Status Updates", "General Inquiries"],
        widgetId: "69b2db806053f649e8d8eedb",
        orbLabel: "Automotive AI Voice Demo",
        audioFile: null,
    },
    pools: {
        title: "The AI Receptionist for Pool Maintenance",
        subtitle: "Cleaning, Repair, Installation",
        blurb: "Check out how the AI schedules pool cleanings, responds to repair needs, and quotes.",
        phoneNumber: null,
        features: ["Cleaning Schedules", "Repair Quotes", "Emergency Callouts"],
        widgetId: "69b2ecd40ec300037eabb501",
        orbLabel: "Pool Care AI Voice Demo",
        audioFile: null,
    },
};

export default function NicheDemoPage() {
    const params = useParams();
    const nicheSlug = (params?.niche as string) || "tradies";
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    
    // Fallback if niche not found
    const nicheData = (NICHES as any)[nicheSlug] || {
        title: "The AI Receptionist",
        subtitle: "Custom AI Voice Agent",
        blurb: "Experience how an AI Receptionist could transform your call handling and booking flow.",
        phoneNumber: null,
        features: ["24/7 Availability", "Instant Answers", "Automated Booking"],
        audioFile: null,
    };

    const handlePlayAudio = () => {
        if (!audioRef.current || !nicheData.audioFile) return;
        
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play().then(() => {
                setIsPlaying(true);
            }).catch(e => {
                console.error("Audio playback error", e);
                setIsPlaying(false);
            });
        }
    };

    return (
        <main className="min-h-screen overflow-hidden bg-ocean-950 text-white selection:bg-white/20">
            {nicheData.audioFile && (
                <audio
                    ref={audioRef}
                    src={`/audio/${nicheData.audioFile}`}
                    onEnded={() => setIsPlaying(false)}
                    className="hidden"
                />
            )}
            
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
                        <a
                            href="/demos"
                            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white"
                        >
                            <ArrowLeft className="h-3 w-3" />
                            All Demos
                        </a>
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
                            <SelfSellVoiceOrb 
                                variant="compact" 
                                widgetId={nicheData.widgetId} 
                                titleLabel={nicheData.orbLabel || "Quick Demo"} 
                            />
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

                {/* Demo Limitations Block */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.02 }}
                    className="mx-auto mb-16 max-w-3xl"
                >
                    <div className="rounded-2xl border border-white/10 bg-ocean-900/30 p-6 md:p-8 text-left backdrop-blur-sm shadow-sm">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-neon/30 bg-neon/10">
                                <span className="text-sm font-bold text-neon">!</span>
                            </div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-white">Demo Limitations</h3>
                        </div>
                        <ul className="space-y-3 text-sm text-gray-400 leading-relaxed">
                            <li className="flex items-start gap-3">
                                <span className="mt-0.5 text-neon/70">›</span>
                                <div><strong className="text-gray-300 font-medium">Limited Knowledge Base:</strong> These demos are trained on a minimal set of data for display purposes. Before going into production, they will be heavily trained on a significant amount of your specific business materials.</div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="mt-0.5 text-neon/70">›</span>
                                <div><strong className="text-gray-300 font-medium">No Live Calendar Integration:</strong> This public demo does not have a live calendar attached, so actual test bookings or re-scheduling actions will not be completed.</div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="mt-0.5 text-neon/70">›</span>
                                <div><strong className="text-gray-300 font-medium">No Live CRM Pushing:</strong> Real-time internal actions (like transferring your call directly to a human staff member or sending an immediate SMS confirmation) have been disabled for these public demos.</div>
                            </li>
                        </ul>
                    </div>
                </motion.div>

                {/* Pre-recorded Audio Demo Block (Only shows if config has audioFile) */}
                {nicheData.audioFile && (
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.05 }}
                        className="mx-auto max-w-3xl mb-16"
                    >
                        <div className={`relative group p-8 rounded-3xl bg-gradient-to-br ${nicheData.color} border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-500`}>
                            <div className="flex flex-col h-full text-left">
                                <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 ${nicheData.accent}`}>
                                    {nicheData.icon && <nicheData.icon className="w-6 h-6" />}
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                                    {nicheData.audioTitle}
                                </h3>

                                <p className="text-gray-400 mb-8 font-medium leading-relaxed">
                                    {nicheData.audioDesc}
                                </p>

                                <div className="mt-auto">
                                    <button
                                        onClick={handlePlayAudio}
                                        className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-black uppercase tracking-widest text-sm transition-all duration-300 ${
                                            isPlaying
                                                ? "bg-white text-ocean-950 scale-[0.98]"
                                                : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                                        }`}
                                    >
                                        {isPlaying ? (
                                            <div className="flex items-center gap-3">
                                                <Pause className="w-5 h-5 fill-current" /> Stop Demo
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-3">
                                                <Play className="w-5 h-5 fill-current" /> Listen to {nicheData.audioTitle} Demo
                                            </div>
                                        )}
                                    </button>
                                </div>
                            </div>
                            
                            {/* Decorative Pulse when playing */}
                            {isPlaying && (
                                <div className="absolute -inset-1 rounded-[32px] border border-neon/30 animate-pulse pointer-events-none" />
                            )}
                        </div>
                    </motion.div>
                )}

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
                            href="https://contact.allconvos.ai/widget/booking/8FhAQk87HxZX5NEuA4s5"
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
                        <a
                            href="/demos"
                            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gray-500 transition-colors hover:text-white"
                        >
                            <ArrowLeft className="h-3 w-3" />
                            Back to All Demos
                        </a>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
