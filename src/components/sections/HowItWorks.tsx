"use client";

import { motion } from "framer-motion";
import { MessageSquare, Zap, TrendingUp } from "lucide-react";

const steps = [
    {
        title: "01. INTERCEPT",
        description: "The AI agent answers every call and message instantly. No lead left waiting.",
        icon: MessageSquare,
        color: "text-blue-400",
        bg: "bg-blue-400/10"
    },
    {
        title: "02. AUTOMATE",
        description: "Our engine qualifies the lead, handles FAQs, and books the appointment directly.",
        icon: Zap,
        color: "text-neon",
        bg: "bg-neon/10"
    },
    {
        title: "03. SCALE",
        description: "Your business runs 24/7. Focus on the work while we handle the mission control.",
        icon: TrendingUp,
        color: "text-purple-400",
        bg: "bg-purple-400/10"
    }
];

export function HowItWorks() {
    return (
        <section id="how" className="py-24 bg-ocean-950 relative">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 italic uppercase tracking-tight">
                        THE STRATEGY <span className="text-white/20">/</span> HOW IT WORKS
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto font-mono text-sm leading-relaxed uppercase tracking-widest">
                        // Deploying perfection in 3 steps
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 relative">
                    {/* Connection Lines (Desktop) */}
                    <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2 z-0" />

                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="relative z-10 flex flex-col items-center text-center group"
                        >
                            <div className={`w-20 h-20 rounded-2xl ${step.bg} border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-xl group-hover:shadow-${step.color.split('-')[1]}/20`}>
                                <step.icon className={`w-8 h-8 ${step.color}`} />
                            </div>
                            <h3 className={`text-xl font-bold ${step.color} mb-4 font-mono italic`}>{step.title}</h3>
                            <p className="text-gray-400 font-mono text-sm leading-relaxed max-w-xs uppercase">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
