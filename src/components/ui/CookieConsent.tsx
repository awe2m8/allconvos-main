"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ShieldCheck, X } from "lucide-react";

export function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookie-consent", "true");
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.9 }}
                    className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md z-[100]"
                >
                    <div className="relative group">
                        {/* Background Glow */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-neon/50 to-emerald-500/50 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

                        <div className="relative bg-ocean-950/80 backdrop-blur-2xl border border-white/10 p-6 rounded-2xl shadow-2xl overflow-hidden">
                            <div className="absolute inset-0 opacity-5 bg-[url('/tech-grid.svg')] bg-grid" />

                            <div className="relative z-10 flex flex-col gap-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-neon/10 border border-neon/30 flex items-center justify-center">
                                            <ShieldCheck className="w-6 h-6 text-neon" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold text-sm tracking-tight">Privacy Guard</h3>
                                            <p className="text-[10px] font-mono text-neon uppercase tracking-widest">System_Authenticated</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setIsVisible(false)}
                                        className="p-1 text-white/40 hover:text-white transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>

                                <p className="text-gray-400 text-xs leading-relaxed">
                                    We use cookies to enhance your mission control experience and analyze our traffic. No "tech bro" data collection here—just essential tracking.
                                </p>

                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={handleAccept}
                                        className="flex-1 bg-neon text-black font-bold text-xs py-2.5 rounded-lg hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(7,222,20,0.3)] hover:shadow-[0_0_30px_rgba(7,222,20,0.5)] active:scale-95"
                                    >
                                        ACCEPT_PROTOCOLS
                                    </button>
                                    <button
                                        onClick={() => setIsVisible(false)}
                                        className="px-4 py-2.5 rounded-lg border border-white/10 text-white/60 text-xs font-medium hover:bg-white/5 transition-colors"
                                    >
                                        Decline
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
