"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, ArrowRight, Phone, Calendar, Shield, Users, Zap, BarChart3, Brain } from "lucide-react";

export default function SME4Page() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.06, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 text-slate-900 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                {/* Large gradient circles */}
                <div className="absolute top-20 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-200/40 to-blue-100/30 rounded-full blur-3xl" />
                <div className="absolute bottom-32 left-1/3 w-80 h-80 bg-gradient-to-br from-blue-100/30 to-slate-100/20 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-radial from-blue-200/20 to-transparent rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
                {/* Navigation */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center justify-between mb-20"
                >
                    <Link href="/" className="font-display text-2xl font-bold text-slate-900">
                        allconvos<span className="text-blue-500">.</span>
                    </Link>
                    <Link href="/" className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </Link>
                </motion.div>

                {/* Hero Section */}
                <motion.section
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="mb-24"
                >
                    <div className="max-w-3xl">
                        <motion.h1
                            variants={itemVariants}
                            className="text-5xl md:text-6xl font-bold leading-[1.2] tracking-tight mb-6"
                        >
                            Meet Your AI<br />
                            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                                Receptionist
                            </span>
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className="text-lg text-slate-600 leading-relaxed max-w-2xl"
                        >
                            Let an intelligent AI answer your calls. Define how it should respond, set your rules, and let it work for you—while you focus on what matters.
                        </motion.p>
                    </div>
                </motion.section>

                {/* Interactive Demos Section - With Orbs */}
                <motion.section
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="mb-24"
                >
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Voice Self-Selling Demo */}
                        <motion.div
                            variants={itemVariants}
                            className="group relative"
                        >
                            <div className="p-8 rounded-2xl bg-white/50 backdrop-blur-sm border border-blue-100/50 hover:border-blue-200/80 transition-all h-full flex flex-col">
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold mb-2">Voice Self-Selling Demo</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        Use the interactive voice orb to describe your business. The AI builds a custom receptionist instantly.
                                    </p>
                                </div>

                                {/* Voice Orb */}
                                <div className="flex-grow bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 border border-blue-100/50 flex items-center justify-center">
                                    <iframe
                                        src="https://iframes.ai/o/1769747339624x746533060485054500?color=d6fa12&icon="
                                        allow="microphone"
                                        className="w-full h-[240px] border-none rounded-lg"
                                        title="Voice Agent Orb"
                                    />
                                </div>

                                <div className="mt-6 text-center">
                                    <p className="text-[12px] font-mono text-slate-500 uppercase tracking-widest">Click the orb to talk</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Tradie Services Demo */}
                        <motion.div
                            variants={itemVariants}
                            className="group relative"
                        >
                            <div className="p-8 rounded-2xl bg-white/50 backdrop-blur-sm border border-blue-100/50 hover:border-blue-200/80 transition-all h-full flex flex-col">
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold mb-2">Tradie Services Demo</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        Experience a live plumbing services demo. Call or chat with the AI receptionist.
                                    </p>
                                </div>

                                {/* Tradie Demo Orb */}
                                <div className="flex-grow bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6 border border-blue-100/50 flex items-center justify-center">
                                    <iframe
                                        src="https://iframes.ai/o/1770341151771x557178828267716600?color=11eddd&icon="
                                        allow="microphone https://iframes.ai; camera https://iframes.ai; autoplay *; encrypted-media *; fullscreen *; display-capture *; picture-in-picture *; clipboard-read *; clipboard-write *;"
                                        className="w-full h-[240px] border-none rounded-lg"
                                        title="Tradie Demo Orb"
                                    />
                                </div>

                                <div className="mt-6 text-center">
                                    <p className="text-[12px] font-mono text-slate-500 uppercase tracking-widest">Plumbing · Emergency · Quotes</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* CTA Buttons Below Orbs */}
                    <motion.div
                        variants={itemVariants}
                        className="flex gap-4 justify-center mt-12"
                    >
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all">
                            <Phone className="w-4 h-4 mr-2" />
                            Schedule Demo
                        </Button>
                        <Button className="border-2 border-blue-200 hover:border-blue-300 bg-white text-slate-900 font-semibold py-3 px-8 rounded-lg hover:bg-blue-50 transition-all">
                            Learn More
                        </Button>
                    </motion.div>
                </motion.section>

                {/* How It Works - Circular Elements */}
                <motion.section
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="mb-24"
                >
                    <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-12">
                        How It Works
                    </motion.h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { num: "01", title: "Define Your Agent", desc: "Tell us about your business, your typical calls, and how you want to handle customers." },
                            { num: "02", title: "Set the Rules", desc: "Configure guardrails: what it can decide, when to transfer to you, and what to never do." },
                            { num: "03", title: "Deploy & Test", desc: "We'll call you to demo it. When ready, we integrate with your calendar and start handling calls." }
                        ].map((step) => (
                            <motion.div
                                key={step.num}
                                variants={itemVariants}
                                whileHover={{ y: -4 }}
                                className="group relative"
                            >
                                {/* Circular background with concentric rings */}
                                <div className="absolute -inset-6 bg-gradient-to-br from-blue-100/50 to-slate-100/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm" />
                                <div className="absolute -inset-6 border-2 border-dashed border-blue-200/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="relative p-8 rounded-xl bg-white/60 backdrop-blur-sm border border-blue-100/50 hover:border-blue-200/80 transition-all">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-400 flex items-center justify-center text-white font-bold mb-4 group-hover:shadow-lg group-hover:scale-110 transition-all">
                                        {step.num}
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                                    <p className="text-slate-600 leading-relaxed">{step.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Features - Grid Layout */}
                <motion.section
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="mb-24"
                >
                    <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-12">
                        What Your AI Can Do
                    </motion.h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { title: "Answer 24/7", desc: "Never miss a call again, whether you're busy or after hours.", icon: Phone },
                            { title: "Book Appointments", desc: "Automatically check your calendar and schedule meetings without you lifting a finger.", icon: Calendar },
                            { title: "Qualify Leads", desc: "Ask questions to understand what the caller needs before transferring to you.", icon: Brain },
                            { title: "Send Info via SMS", desc: "Automatically text details like pricing, hours, or quotes while you're on another call.", icon: Zap }
                        ].map((feature, idx) => {
                            const Icon = feature.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    variants={itemVariants}
                                    whileHover={{ x: 4 }}
                                    className="group relative p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-blue-100/50 hover:border-blue-200/80 hover:bg-white/70 transition-all"
                                >
                                    {/* Subtle gradient overlay on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-blue-100/0 group-hover:from-blue-50/50 group-hover:to-blue-100/30 rounded-xl transition-all pointer-events-none" />

                                    <div className="relative space-y-3">
                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-400/20 flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-blue-400/30 transition-all">
                                            <Icon className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <h3 className="text-lg font-bold">{feature.title}</h3>
                                        <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.section>

                {/* Key Capabilities */}
                <motion.section
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="mb-24"
                >
                    <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-12">
                        Complete Feature Set
                    </motion.h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                            { icon: Phone, label: "Live Call Handling", detail: "Answer and process calls 24/7 with natural conversations" },
                            { icon: Calendar, label: "Calendar Integration", detail: "Auto-sync with your schedule and book appointments" },
                            { icon: Brain, label: "Context Awareness", detail: "Understands your business rules and customer base" },
                            { icon: Shield, label: "Safety Guardrails", detail: "You control exactly what the AI can do and decide" },
                            { icon: BarChart3, label: "Performance Insights", detail: "See call transcripts and outcome tracking" },
                            { icon: Zap, label: "SMS Integration", detail: "Send follow-up messages and information automatically" }
                        ].map((cap, idx) => {
                            const Icon = cap.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    variants={itemVariants}
                                    whileHover={{ y: -2, boxShadow: "0 12px 24px rgba(59, 130, 246, 0.1)" }}
                                    className="p-5 rounded-xl bg-white/40 backdrop-blur-sm border border-blue-100/40 hover:border-blue-200/60 hover:bg-white/60 transition-all group"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-400/20 flex items-center justify-center mb-3 group-hover:from-blue-500/30 group-hover:to-blue-400/30 transition-all">
                                        <Icon className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <h3 className="font-bold text-sm mb-1">{cap.label}</h3>
                                    <p className="text-xs text-slate-600">{cap.detail}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.section>

                {/* Final CTA - Gradient Card */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="relative"
                >
                    <div className="relative p-12 md:p-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-500 text-white overflow-hidden group hover:shadow-2xl transition-all">
                        {/* Animated background circles inside CTA */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32 group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl -ml-24 -mb-24 group-hover:scale-110 transition-transform duration-500" />

                        <div className="relative z-10 text-center space-y-6">
                            <h2 className="text-4xl md:text-5xl font-bold">
                                Ready to Get Started?
                            </h2>
                            <p className="text-blue-50 text-lg max-w-2xl mx-auto leading-relaxed">
                                Schedule a personalized demo or try our voice self-selling tool to build your AI receptionist right now.
                            </p>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button className="bg-white hover:bg-blue-50 text-blue-600 font-bold py-3 px-10 rounded-lg shadow-lg hover:shadow-xl transition-all">
                                    <Phone className="w-4 h-4 mr-2" />
                                    Schedule a Demo
                                </Button>
                            </motion.div>
                        </div>
                    </div>
                </motion.section>
            </div>
        </main>
    );
}
