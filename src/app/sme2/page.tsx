"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Phone, Shield, Calendar, Users } from "lucide-react";

export default function SME2Page() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const features = [
        {
            icon: Phone,
            title: "Always Available",
            description: "Answer calls 24/7, even when you're busy or sleeping."
        },
        {
            icon: Calendar,
            title: "Smart Scheduling",
            description: "Books appointments directly into your calendar in real time."
        },
        {
            icon: Shield,
            title: "Your Rules",
            description: "Complete control over what the AI can say and decide."
        },
        {
            icon: Users,
            title: "Lead Qualification",
            description: "Understands caller needs and only sends relevant calls to you."
        }
    ];

    return (
        <main className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
            {/* Animated Background Gradients */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
                {/* Navigation */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-between mb-16"
                >
                    <Link href="/" className="font-mono text-lg font-bold text-white">
                        allconvos
                    </Link>
                    <Link href="/" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
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
                        className="text-5xl md:text-6xl font-bold leading-tight"
                    >
                        Your AI<br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Receptionist</span><br/>
                        is Waiting
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-lg text-gray-300 leading-relaxed max-w-3xl"
                    >
                        Stop missing calls. Start converting leads. Let an intelligent AI handle your incoming calls while you stay focused on your business.
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        className="flex gap-3 pt-2"
                    >
                        <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold">
                            <Phone className="w-4 h-4 mr-2" />
                            Schedule Demo
                        </Button>
                    </motion.div>
                </motion.section>

                {/* Two Column Layout with Glass Cards */}
                <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
                    {/* Left: Process */}
                    <motion.section
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-6"
                    >
                        <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-8">
                            Getting Started
                        </motion.h2>

                        {[
                            { step: 1, title: "Describe Your Business", desc: "Tell us what you do, how you handle calls, and what's important." },
                            { step: 2, title: "Configure Guardrails", desc: "Define what your AI can decide and when it should transfer to you." },
                            { step: 3, title: "We Demo It", desc: "We'll call you to show how your AI receptionist performs." },
                            { step: 4, title: "Go Live", desc: "Once happy, we deploy and sync with your calendar." }
                        ].map((item) => (
                            <motion.div
                                key={item.step}
                                variants={itemVariants}
                                className="relative pl-12 p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all hover:bg-white/10 group"
                            >
                                <div className="absolute left-4 top-4 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 text-white flex items-center justify-center text-sm font-bold group-hover:shadow-lg group-hover:shadow-cyan-500/50 transition-all">
                                    {item.step}
                                </div>
                                <h3 className="font-bold text-lg text-white mb-1">{item.title}</h3>
                                <p className="text-gray-300">{item.desc}</p>
                            </motion.div>
                        ))}
                    </motion.section>

                    {/* Right: Features Grid */}
                    <motion.section
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-6"
                    >
                        <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-8">
                            What You Get
                        </motion.h2>

                        {features.map((feature, idx) => {
                            const Icon = feature.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    variants={itemVariants}
                                    className="p-4 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10 hover:border-cyan-400/50 hover:from-white/15 transition-all group"
                                >
                                    <div className="flex gap-3">
                                        <Icon className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1 group-hover:scale-125 transition-transform" />
                                        <div>
                                            <h3 className="font-bold text-white mb-1">{feature.title}</h3>
                                            <p className="text-sm text-gray-300">{feature.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.section>
                </div>

                {/* Bottom CTA - Large Glass Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="relative p-12 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 hover:border-cyan-400/50 transition-all overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 hover:opacity-100 transition-opacity" />
                    <div className="relative z-10 text-center">
                        <h2 className="text-4xl font-bold mb-4">
                            See It In Action
                        </h2>
                        <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
                            Schedule a demo call and experience how your AI receptionist can transform your business in 15 minutes.
                        </p>
                        <Button className="bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-500 hover:to-blue-500 text-slate-950 font-bold">
                            <Phone className="w-4 h-4 mr-2" />
                            Schedule Demo
                        </Button>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
