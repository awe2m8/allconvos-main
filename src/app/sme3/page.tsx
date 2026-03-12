"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Phone, Calendar, Zap, BarChart3, Brain, Lock, Shield } from "lucide-react";

export default function SME3Page() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0 }
    };

    const capabilities = [
        { icon: Phone, label: "Live Call Handling", detail: "Answer and process calls 24/7 with natural conversations" },
        { icon: Calendar, label: "Calendar Integration", detail: "Auto-sync with your schedule and book appointments" },
        { icon: Brain, label: "Context Awareness", detail: "Understands your business rules and customer base" },
        { icon: Lock, label: "Safety Guardrails", detail: "You control exactly what the AI can do and decide" },
        { icon: BarChart3, label: "Performance Insights", detail: "See call transcripts and outcome tracking" },
        { icon: Zap, label: "SMS Integration", detail: "Send follow-up messages and information automatically" }
    ];

    return (
        <main className="min-h-screen bg-white text-slate-900 relative overflow-hidden">
            {/* Colorful background elements */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-pink-300 to-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse" />
                <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-br from-cyan-300 to-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse animation-delay-2000" style={{ animationDelay: '2s' }} />
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-br from-amber-300 to-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse animation-delay-4000" style={{ animationDelay: '4s' }} />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
                {/* Navigation */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-between mb-16"
                >
                    <div className="text-2xl font-black">
                        allconvos<span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-cyan-500 to-amber-500">_</span>
                    </div>
                    <Link href="/" className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </Link>
                </motion.div>

                {/* Hero Section */}
                <motion.section
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="mb-20 space-y-6"
                >
                    <motion.h1
                        variants={itemVariants}
                        className="text-6xl md:text-7xl font-black leading-[1.1] tracking-tight"
                    >
                        Your AI<br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 animate-pulse">
                            Receptionist
                        </span><br/>
                        Awaits
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-xl text-slate-600 leading-relaxed max-w-3xl"
                    >
                        Stop missing calls. Start converting leads. Let an intelligent AI handle your incoming calls while you stay focused on your business.
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        className="flex gap-3 pt-4"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05, rotate: 2 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Button className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:from-pink-600 hover:via-purple-600 hover:to-cyan-600 text-white font-black text-base py-3 px-8 shadow-lg hover:shadow-2xl transition-all">
                                <Phone className="w-4 h-4 mr-2" />
                                Schedule Demo
                            </Button>
                        </motion.div>
                    </motion.div>
                </motion.section>

                {/* Process Section */}
                <motion.section
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="mb-20 space-y-8"
                >
                    <motion.h2 variants={itemVariants} className="text-4xl font-black tracking-tight">
                        Getting Started
                    </motion.h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { step: "01", title: "Describe Your Business", desc: "Tell us what you do, how you handle calls, and what's important." },
                            { step: "02", title: "Configure Guardrails", desc: "Define what your AI can decide and when it should transfer to you." },
                            { step: "03", title: "We Demo It", desc: "We'll call you to show how your AI receptionist performs." },
                            { step: "04", title: "Go Live", desc: "Once happy, we deploy and sync with your calendar." }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                className="p-6 rounded-2xl bg-gradient-to-br from-white via-pink-50/30 to-cyan-50/30 border-2 border-gradient-to-r from-pink-200 via-purple-200 to-cyan-200 hover:shadow-lg transition-all group cursor-pointer hover:scale-105"
                                style={{
                                    borderImage: `linear-gradient(135deg, rgb(244, 63, 94), rgb(139, 92, 246), rgb(34, 211, 238)) 1`
                                }}
                            >
                                <div className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-cyan-600 mb-3">
                                    {item.step}
                                </div>
                                <h3 className="font-black text-lg mb-2 text-slate-900">{item.title}</h3>
                                <p className="text-slate-600 text-sm">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Features Grid - Colorful Cards */}
                <motion.section
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="mb-20 space-y-8"
                >
                    <motion.h2 variants={itemVariants} className="text-4xl font-black tracking-tight">
                        What You Get
                    </motion.h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { title: "Always Available", desc: "Answer calls 24/7, even when you're busy or sleeping.", color: "from-pink-400 to-pink-600" },
                            { title: "Smart Scheduling", desc: "Books appointments directly into your calendar in real time.", color: "from-purple-400 to-purple-600" },
                            { title: "Your Rules", desc: "Complete control over what the AI can say and decide.", color: "from-cyan-400 to-cyan-600" },
                            { title: "Lead Qualification", desc: "Understands caller needs and only sends relevant calls to you.", color: "from-amber-400 to-amber-600" }
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                className={`p-6 rounded-2xl bg-gradient-to-br ${feature.color} text-white shadow-lg hover:shadow-2xl transition-all group hover:scale-105 cursor-pointer`}
                            >
                                <h3 className="font-black text-lg mb-2">{feature.title}</h3>
                                <p className="text-white/90 leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Capabilities Grid */}
                <motion.section
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="mb-20 space-y-8"
                >
                    <motion.h2 variants={itemVariants} className="text-4xl font-black tracking-tight">
                        Complete Feature Set
                    </motion.h2>

                    <div className="grid md:grid-cols-3 gap-4">
                        {capabilities.map((cap, idx) => {
                            const Icon = cap.icon;
                            const colors = ["from-pink-100 to-pink-50", "from-purple-100 to-purple-50", "from-cyan-100 to-cyan-50", "from-amber-100 to-amber-50", "from-green-100 to-green-50", "from-blue-100 to-blue-50"];
                            const textColors = ["text-pink-600", "text-purple-600", "text-cyan-600", "text-amber-600", "text-green-600", "text-blue-600"];
                            return (
                                <motion.div
                                    key={idx}
                                    variants={itemVariants}
                                    whileHover={{ y: -8, rotate: idx % 2 === 0 ? -2 : 2 }}
                                    className={`p-6 rounded-2xl bg-gradient-to-br ${colors[idx]} border-2 border-slate-200 hover:shadow-lg transition-all group`}
                                >
                                    <Icon className={`w-8 h-8 ${textColors[idx]} mb-3 group-hover:scale-125 group-hover:rotate-12 transition-transform`} />
                                    <h3 className="font-black text-slate-900 mb-2">{cap.label}</h3>
                                    <p className="text-slate-600 text-sm">{cap.detail}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.section>

                {/* Final CTA - Big and Bold */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="relative overflow-hidden"
                >
                    <div className="p-12 md:p-16 rounded-3xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white text-center shadow-2xl">
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.1)_25%,rgba(255,255,255,.1)_50%,transparent_50%,transparent_75%,rgba(255,255,255,.1)_75%,rgba(255,255,255,.1))] bg-[length:30px_30px] animate-pulse" />
                        <div className="relative z-10 space-y-4">
                            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                                Ready to Transform Your Call Handling?
                            </h2>
                            <p className="text-white/95 text-lg max-w-2xl mx-auto">
                                Book a demo today. We'll design and test an AI receptionist customized for your business—for free.
                            </p>
                            <motion.div
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.96 }}
                            >
                                <Button className="bg-white hover:bg-slate-100 text-purple-600 font-black text-base py-3 px-10 shadow-xl">
                                    <Phone className="w-5 h-5 mr-2" />
                                    Schedule Demo Call
                                </Button>
                            </motion.div>
                        </div>
                    </div>
                </motion.section>
            </div>
        </main>
    );
}
