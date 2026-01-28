"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, User, Terminal, ShieldCheck } from "lucide-react";
import { Button } from "./Button";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-md bg-ocean-900 border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                    >
                        {/* Technical Header */}
                        <div className="bg-black/40 border-b border-white/5 p-6 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded bg-neon/10 border border-neon/20">
                                    <Terminal className="w-4 h-4 text-neon" />
                                </div>
                                <div>
                                    <h3 className="text-white font-mono font-bold leading-none tracking-tight">ACCESS_PORTAL_v1.0</h3>
                                    <p className="text-[10px] font-mono text-neon/60 uppercase tracking-widest mt-1 italic">Security_Level: Elevated</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-gray-500 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Form Body */}
                        <div className="p-8">
                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest ml-1">
                                        // Identity_Credential
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-neon transition-colors">
                                            <User className="w-4 h-4" />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Email or Username"
                                            className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm font-mono text-white placeholder:text-gray-600 focus:outline-none focus:border-neon/50 focus:ring-1 focus:ring-neon/20 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-center px-1">
                                        <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                                            // Security_Key
                                        </label>
                                        <button type="button" className="text-[10px] font-mono text-neon/40 hover:text-neon transition-colors uppercase tracking-widest">
                                            Lost_Access?
                                        </button>
                                    </div>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-neon transition-colors">
                                            <Lock className="w-4 h-4" />
                                        </div>
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm font-mono text-white placeholder:text-gray-600 focus:outline-none focus:border-neon/50 focus:ring-1 focus:ring-neon/20 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <Button className="w-full font-mono uppercase italic tracking-widest text-xs py-4">
                                        INITIALIZE_SESSION
                                    </Button>
                                    <div className="flex items-center justify-center gap-2 mt-6 text-[10px] font-mono text-gray-600 uppercase tracking-widest">
                                        <ShieldCheck className="w-3 h-3" />
                                        End-to-End Encryption Enabled
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Footer Decoration */}
                        <div className="h-1 bg-gradient-to-r from-transparent via-neon/20 to-transparent" />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
