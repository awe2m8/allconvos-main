"use client";

import { SelfSellVoiceOrb } from "@/components/app/SelfSellVoiceOrb";
import { motion } from "framer-motion";
import { CalendarDays, Mail, Phone, Briefcase, Dumbbell, Stethoscope, Scissors, Sparkles, Wrench, Droplets } from "lucide-react";
import Link from "next/link";
import { marketingUrl } from "@/lib/siteUrls";

const INDUSTRIES = [
    {
        name: "Tradies",
        slug: "tradies",
        description: "Plumbers, Electricians, HVAC & emergency callouts.",
        icon: Briefcase,
    },
    {
        name: "Gyms & Fitness",
        slug: "gyms",
        description: "Membership inquiries, booking classes & trial passes.",
        icon: Dumbbell,
    },
    {
        name: "Clinics",
        slug: "clinics",
        description: "Patient scheduling, FAQs & after-hours routing.",
        icon: Stethoscope,
    },
    {
        name: "Salons & Spas",
        slug: "salons",
        description: "Handling appointment bookings & service questions.",
        icon: Scissors,
    },
    {
        name: "Massage Parlours",
        slug: "massage",
        description: "Booking relaxation sessions & answering service queries.",
        icon: Sparkles,
    },
    {
        name: "Automotive",
        slug: "automotive",
        description: "Mechanic bookings, repair updates & quotes.",
        icon: Wrench,
    },
    {
        name: "Pool Maintenance",
        slug: "pools",
        description: "Scheduling cleanings & quoting out repairs.",
        icon: Droplets,
    },
];

export default function DemosHubPage() {
    return (
        <main className="min-h-screen overflow-hidden bg-ocean-950 text-white selection:bg-white/20">
            {/* Background elements */}
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#24324b_1px,transparent_1px),linear-gradient(to_bottom,#24324b_1px,transparent_1px)] bg-[size:42px_42px] opacity-[0.18] pointer-events-none" />
            <div className="fixed inset-x-0 top-[-10%] mx-auto h-[36rem] w-[36rem] rounded-full bg-cyan-400/8 blur-[120px] pointer-events-none" />

            <div className="relative z-10 mx-auto max-w-7xl px-6 py-10 md:py-14">
                {/* Minimal Header */}
                <nav className="mb-10 flex items-center justify-between gap-4">
                    <div className="flex flex-col items-start">
                        <Link href={marketingUrl("/")} className="font-mono text-2xl font-bold tracking-tighter text-white hover:text-white/80 transition-colors">
                            allconvos<span className="text-neon">_</span>
                        </Link>
                    </div>
                    <div className="hidden md:flex md:items-center md:gap-2">
                        <a
                            href="https://api.leadconnectorhq.com/widget/booking/OYHMC46ijO5WgqMTNb8G"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-md border border-neon/30 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-neon transition-all hover:border-neon hover:bg-neon/10"
                        >
                            Book In
                        </a>
                        <Link
                            href="/demos/contact"
                            className="inline-flex items-center justify-center rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:border-neon/30 hover:bg-white/[0.08]"
                        >
                            Contact
                        </Link>
                    </div>
                </nav>

                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                    className="relative mx-auto mb-16 max-w-5xl text-center"
                >
                    <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl">
                        Hear Your AI
                        <span className="block bg-gradient-to-r from-neon via-cyan-300 to-white bg-clip-text text-transparent">
                            Receptionist in Action
                        </span>
                    </h1>
                    <div className="mx-auto mt-6 max-w-3xl">
                        <p className="text-lg font-bold text-white md:text-2xl">
                            Built for ambitious service businesses ready to scale.
                        </p>
                        <p className="mt-2 text-sm font-mono uppercase tracking-[0.22em] text-neon/80 md:text-[13px]">
                            The AI receptionist that answers every call, so you don't have to.
                        </p>
                    </div>

                    {/* Quick Demo Centered Orb */}
                    <div className="mt-16 flex justify-center">
                        <div className="w-full max-w-[290px] [&>button]:w-full [&>button]:justify-center">
                            <SelfSellVoiceOrb variant="compact" widgetId="69b2dbf34d840e2b50d7bce3" />
                        </div>
                    </div>
                </motion.div>

                {/* Industry Grid */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mx-auto mt-20 max-w-5xl"
                >
                    <div className="mb-10 text-center">
                        <h2 className="font-mono text-sm font-bold uppercase tracking-[0.3em] text-white/50">
                            Explore Industry Demos
                        </h2>
                    </div>
                    
                    <div className="grid gap-6 md:grid-cols-2">
                        {INDUSTRIES.map((industry) => {
                            const Icon = industry.icon;
                            return (
                                <a
                                    key={industry.slug}
                                    href={`/demos/${industry.slug}`}
                                    className="group relative flex flex-col justify-between overflow-hidden rounded-[1.4rem] border border-white/10 bg-gradient-to-b from-ocean-900 to-ocean-950 p-6 shadow-xl transition-all hover:border-neon/40 hover:shadow-[0_0_0_1px_rgba(163,230,53,0.1),0_0_40px_rgba(163,230,53,0.1)]"
                                >
                                    <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-all group-hover:via-neon/50" />
                                    
                                    <div className="mb-6 flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-neon group-hover:bg-neon/10 group-hover:text-neon transition-colors">
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <h3 className="text-xl font-bold uppercase tracking-tight text-white group-hover:text-neon transition-colors">{industry.name}</h3>
                                    </div>
                                    
                                    <p className="mb-6 flex-grow text-sm leading-relaxed text-gray-400">
                                        {industry.description}
                                    </p>
                                    
                                    <div className="inline-flex items-center text-xs font-mono font-bold uppercase tracking-widest text-white/60 group-hover:text-neon transition-colors">
                                        Listen to Demo <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Bottom Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.2 }}
                    className="mx-auto mt-24 max-w-2xl px-4"
                >
                    <div className="rounded-[1.4rem] border border-white/10 bg-ocean-900/50 p-8 text-center backdrop-blur-sm">
                        <h3 className="mb-3 text-2xl font-black uppercase tracking-tight text-white">
                            Ready to transform your business?
                        </h3>
                        <p className="mb-8 text-sm leading-relaxed text-gray-400">
                            Book a quick walkthrough and let's map out exactly how an AI receptionist can work for your specific use-case.
                        </p>

                        <div className="mx-auto max-w-sm flex flex-col gap-3">
                            <a
                                href="https://api.leadconnectorhq.com/widget/booking/OYHMC46ijO5WgqMTNb8G"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-neon px-5 py-3.5 text-sm font-bold uppercase tracking-wide text-ocean-950 transition-all hover:bg-white hover:shadow-[0_0_20px_rgba(163,230,53,0.4)]"
                            >
                                <CalendarDays className="h-4 w-4" />
                                Book Personal Demo
                            </a>
                            <Link
                                href="/demos/contact"
                                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:border-white/30 hover:bg-white/10"
                            >
                                <Mail className="h-4 w-4" />
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
