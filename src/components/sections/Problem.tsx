"use client";

import { motion } from "framer-motion";
import { TrendingDown, RefreshCcw, BellOff, XCircle, AlertTriangle } from "lucide-react";

export function Problem() {
    const painPoints = [
        {
            title: "LEAKING REVENUE",
            description: "A ringing phone you can't answer is a lead going straight to the next guy on Google. You're paying for marketing just to lose the job to the first person who picks up.",
            icon: TrendingDown,
            accent: "text-red-500",
            bg: "bg-red-500/5",
            border: "border-red-500/20"
        },
        {
            title: "ADMIN OVERLOAD",
            description: "Spending your nights returning voicemails and playing phone tag isn't 'growing'—it's drowning. You're a business owner, not a secretary.",
            icon: BellOff,
            accent: "text-yellow-500",
            bg: "bg-yellow-500/5",
            border: "border-yellow-500/20"
        },
        {
            title: "TECH BRO FATIGUE",
            description: "You don't need another 'platform', 'AI chatbot', or complex dashboard. You need an employee that answers the phone and books the work. Period.",
            icon: AlertTriangle,
            accent: "text-blue-500",
            bg: "bg-blue-500/5",
            border: "border-blue-500/20"
        }
    ];

    return (
        <section id="problem" className="py-32 bg-ocean-950 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center gap-2 mb-4"
                    >
                        <div className="h-px w-8 bg-red-500/30" />
                        <span className="text-red-500 text-sm font-black uppercase tracking-[0.3em]">
                            The Hard Truth
                        </span>
                        <div className="h-px w-8 bg-red-500/30" />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-8 tracking-tighter uppercase italic"
                    >
                        YOUR VOICEMAIL IS WHERE <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-white">MONEY GOES TO DIE.</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto font-mono uppercase tracking-widest leading-relaxed"
                    >
                        // EVERY COMPLETED LEAD IS A $500+ LOSS. STOP PAYING THE "SILENCE TAX".
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {painPoints.map((point, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + idx * 0.1 }}
                            className={`p-8 rounded-2xl ${point.bg} border ${point.border} backdrop-blur-sm group hover:border-white/20 transition-all duration-500`}
                        >
                            <div className={`w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-8 ${point.accent} group-hover:scale-110 transition-transform duration-500`}>
                                <point.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-black text-white mb-4 tracking-tight uppercase">
                                {point.title}
                            </h3>
                            <p className="text-gray-400 font-mono text-sm leading-relaxed uppercase opacity-80 group-hover:opacity-100 transition-opacity">
                                {point.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 }}
                    className="mt-20 p-8 rounded-3xl bg-white/5 border border-white/10 text-center max-w-4xl mx-auto"
                >
                    <p className="text-white text-lg font-bold italic tracking-tight">
                        "I WAS MISSING 3-4 CALLS A DAY WHILE ON SITE. SINCE STARTING WITH ALLCONVOS, EVERY SINGLE ONE OF THOSE IS NOW A PITCH OR A BOOKING."
                    </p>
                    <div className="mt-4 text-neon font-mono text-xs tracking-widest uppercase">
                        — MIKE T., PLUMBING & GAS SPECIALISTS
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
