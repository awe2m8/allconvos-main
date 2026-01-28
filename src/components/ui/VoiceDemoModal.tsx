"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mic, Terminal, Shield } from "lucide-react";

interface VoiceDemoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function VoiceDemoModal({ isOpen, onClose }: VoiceDemoModalProps) {
    const frameRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        if (!isOpen) return;

        const checkPermissions = () => {
            if (navigator.permissions && navigator.permissions.query) {
                navigator.permissions.query({ name: 'microphone' as PermissionName })
                    .then(result => {
                        if (result.state === 'granted') {
                            console.log('Microphone access already granted');
                        } else if (result.state === 'prompt') {
                            console.log('User will be prompted for microphone access');
                        }
                    })
                    .catch(err => {
                        console.warn('Permission query failed:', err);
                    });
            }
        };

        const handleLoad = () => {
            console.log('Voice AI Assistant Frame Loaded');
            checkPermissions();
        };

        const currentFrame = frameRef.current;
        if (currentFrame) {
            currentFrame.addEventListener('load', handleLoad);
        }

        return () => {
            if (currentFrame) {
                currentFrame.removeEventListener('load', handleLoad);
            }
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/90 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-lg bg-ocean-900 border border-neon/20 rounded-2xl shadow-[0_0_50px_rgba(163,230,53,0.15)] overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-black/40 border-b border-white/5 p-4 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded bg-neon/10 border border-neon/20">
                                    <Mic className="w-4 h-4 text-neon" />
                                </div>
                                <div>
                                    <h3 className="text-white font-mono text-sm font-bold uppercase tracking-tight">VOICE_DEMO_ACTIVE</h3>
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse" />
                                        <span className="text-[10px] font-mono text-neon/60 uppercase tracking-widest">Awaiting_Voice_Input</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-gray-500 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Iframe Container */}
                        <div className="p-0 bg-black/20">
                            <div className="w-full h-[200px] relative">
                                <iframe
                                    ref={frameRef}
                                    src="https://iframes.ai/o/1760439406132x932462890577297400?color=30c326&icon=bot"
                                    allow="microphone"
                                    className="w-full h-full border-none"
                                    id="assistantFrame"
                                    title="Voice AI Assistant"
                                />
                            </div>
                        </div>

                        {/* Technical Footer */}
                        <div className="p-4 bg-black/40 border-t border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                                <Shield className="w-3 h-3 text-neon/40" />
                                Secure_Session_Encrypted
                            </div>
                            <div className="text-[10px] font-mono text-neon/40 uppercase tracking-widest">
                                [ MICROPHONE_READY ]
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
