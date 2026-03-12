"use client";

import Link from "next/link";
import { ArrowLeft, Phone, Calendar, Brain, Zap, Shield, BarChart3, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function SME5Page() {
    return (
        <main className="min-h-screen bg-black text-white">
            <div className="max-w-7xl mx-auto px-8 py-20">
                {/* Navigation */}
                <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white mb-20 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </Link>

                {/* Hero Section - Type First (SME1 Style) */}
                <div className="space-y-12 mb-24">
                    <h1 className="text-7xl md:text-8xl font-serif leading-[1.1] font-bold tracking-tight">
                        Meet Your<br />
                        <span className="text-orange-500">AI Receptionist</span>
                    </h1>
                    <p className="text-xl text-gray-400 leading-relaxed max-w-2xl font-light">
                        Let an intelligent AI answer your calls. Define how it should respond, set your rules, and let it work for you—while you focus on what matters.
                    </p>
                </div>

                {/* Demo Cards - Tradies2 Style Orbs */}
                <div className="grid lg:grid-cols-2 gap-12 mb-24">
                    {/* Voice AI Demo Card */}
                    <div className="group relative">
                        {/* Gradient Top Bar */}
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 rounded-t-2xl" />

                        <div className="relative bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-2xl p-12 min-h-[500px] flex flex-col items-center justify-center">
                            {/* Avatar */}
                            <div className="w-28 h-28 rounded-full border-4 border-orange-500 bg-gradient-to-br from-gray-800 to-black p-2 mb-8 shadow-[0_0_40px_rgba(249,115,22,0.3)]">
                                <img
                                    src="/images/ai-avatar-female.png"
                                    alt="AI Assistant"
                                    className="w-full h-full rounded-full object-cover"
                                />
                            </div>

                            {/* Header */}
                            <p className="font-mono text-lg font-bold tracking-tight text-white mb-4">
                                allconvos<span className="text-orange-500">_</span>
                            </p>

                            {/* Title */}
                            <h2 className="text-3xl md:text-4xl font-serif font-bold uppercase tracking-tight text-center mb-2">
                                Voice AI Demo
                            </h2>

                            {/* Subtitle */}
                            <p className="text-orange-500 font-bold italic uppercase text-sm tracking-widest text-center mb-8">
                                Click the Orb and Start Talking
                            </p>

                            {/* Interactive Orb */}
                            <div className="relative w-40 h-40 mb-8">
                                {/* Glowing border circle */}
                                <div className="absolute inset-0 rounded-full border-2 border-cyan-400/40 shadow-[0_0_40px_rgba(34,211,238,0.3)]" />
                                <div className="absolute inset-2 rounded-full border border-cyan-300/20" />

                                {/* Orb background gradient */}
                                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_34%_26%,rgba(224,242,254,0.82)_0%,rgba(125,211,252,0.26)_20%,rgba(34,211,238,0.34)_38%,rgba(8,47,73,0.92)_70%,rgba(5,14,30,1)_100%)]" />

                                {/* Inner shimmer */}
                                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_28%_24%,rgba(255,255,255,0.34),transparent_18%),radial-gradient(circle_at_72%_74%,rgba(34,211,238,0.18),transparent_26%)]" />

                                {/* Icon container */}
                                <div className="absolute inset-0 rounded-full flex items-center justify-center">
                                    <div className="w-14 h-14 rounded-full border-2 border-cyan-200/55 bg-cyan-300/10 flex items-center justify-center">
                                        <Phone className="w-6 h-6 text-cyan-100" />
                                    </div>
                                </div>

                                {/* Orb text */}
                                <div className="absolute inset-0 rounded-full flex items-end justify-center pb-4">
                                    <div className="text-center">
                                        <p className="text-[10px] font-mono text-cyan-300/70 uppercase tracking-widest">Voice Demo</p>
                                        <p className="text-lg font-bold text-white uppercase">Talk</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tradies Example Card */}
                    <div className="group relative">
                        {/* Gradient Top Bar */}
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-400 rounded-t-2xl" />

                        <div className="relative bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-2xl p-12 min-h-[500px] flex flex-col items-center justify-center">
                            {/* Avatar */}
                            <div className="w-28 h-28 rounded-full border-4 border-cyan-400 bg-gradient-to-br from-gray-800 to-black p-2 mb-8 shadow-[0_0_40px_rgba(34,211,238,0.3)]">
                                <img
                                    src="/images/ai-avatar.png"
                                    alt="Tradie AI"
                                    className="w-full h-full rounded-full object-cover"
                                />
                            </div>

                            {/* Header */}
                            <p className="font-mono text-lg font-bold tracking-tight text-white mb-4">
                                allconvos<span className="text-cyan-400">_</span>
                            </p>

                            {/* Title */}
                            <h2 className="text-3xl md:text-4xl font-serif font-bold uppercase tracking-tight text-center mb-2">
                                Tradies Example
                            </h2>

                            {/* Subtitle */}
                            <p className="text-cyan-400 font-bold italic uppercase text-sm tracking-widest text-center mb-8">
                                Plumbing · Emergency · Quotes
                            </p>

                            {/* Interactive Orb */}
                            <div className="relative w-40 h-40 mb-8">
                                {/* Glowing border circle */}
                                <div className="absolute inset-0 rounded-full border-2 border-teal-300/40 shadow-[0_0_40px_rgba(20,184,166,0.3)]" />
                                <div className="absolute inset-2 rounded-full border border-teal-200/20" />

                                {/* Orb background gradient */}
                                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_34%_24%,rgba(255,255,255,0.8)_0%,rgba(204,251,241,0.28)_18%,rgba(45,212,191,0.32)_36%,rgba(14,116,144,0.26)_50%,rgba(9,32,48,0.98)_78%)]" />

                                {/* Inner shimmer */}
                                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_28%_24%,rgba(255,255,255,0.3),transparent_18%),radial-gradient(circle_at_74%_72%,rgba(45,212,191,0.2),transparent_24%)]" />

                                {/* Icon container */}
                                <div className="absolute inset-0 rounded-full flex items-center justify-center">
                                    <div className="w-14 h-14 rounded-full border-2 border-teal-100/55 bg-teal-300/10 flex items-center justify-center">
                                        <Phone className="w-6 h-6 text-teal-100" />
                                    </div>
                                </div>

                                {/* Orb text */}
                                <div className="absolute inset-0 rounded-full flex items-end justify-center pb-4">
                                    <div className="text-center">
                                        <p className="text-[10px] font-mono text-teal-300/70 uppercase tracking-widest">Voice Demo</p>
                                        <p className="text-lg font-bold text-white uppercase">Talk</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Buttons Below Orbs */}
                <div className="flex gap-4 justify-center mb-24">
                    <Button className="bg-orange-500 hover:bg-orange-600 text-black font-bold py-3 px-8 rounded-lg transition-colors">
                        <Phone className="w-4 h-4 mr-2" />
                        Schedule Demo
                    </Button>
                    <Button className="border-2 border-orange-500 hover:border-orange-400 bg-transparent text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-500/10 transition-all">
                        Learn More
                    </Button>
                </div>

                {/* How It Works - Editorial Grid */}
                <div className="mb-24 pb-24 border-b border-gray-800">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-16 tracking-tight">
                        How It Works
                    </h2>

                    <div className="space-y-12">
                        {[
                            { num: "01", title: "Define Your Agent", desc: "Tell us about your business, your typical calls, and how you want to handle customers." },
                            { num: "02", title: "Set the Rules", desc: "Configure guardrails: what it can decide, when to transfer to you, and what to never do." },
                            { num: "03", title: "Deploy & Test", desc: "We'll call you to demo it. When ready, we integrate with your calendar and start handling calls." }
                        ].map((step) => (
                            <div key={step.num} className="grid grid-cols-12 gap-8 items-start">
                                <div className="col-span-2">
                                    <span className="text-sm font-mono text-orange-500 font-bold">{step.num}</span>
                                </div>
                                <div className="col-span-10">
                                    <h3 className="text-2xl font-serif font-bold mb-2">{step.title}</h3>
                                    <p className="text-gray-400">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Key Features - Grid */}
                <div className="mb-24">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-16 tracking-tight">
                        What Your AI Can Do
                    </h2>

                    <div className="grid md:grid-cols-2 gap-12">
                        {[
                            { title: "Answer 24/7", desc: "Never miss a call again, whether you're busy or after hours.", icon: CheckCircle2 },
                            { title: "Book Appointments", desc: "Automatically check your calendar and schedule meetings without you lifting a finger.", icon: CheckCircle2 },
                            { title: "Qualify Leads", desc: "Ask questions to understand what the caller needs before transferring to you.", icon: CheckCircle2 },
                            { title: "Send Info via SMS", desc: "Automatically text details like pricing, hours, or quotes while you're on another call.", icon: CheckCircle2 }
                        ].map((feature, idx) => {
                            const Icon = feature.icon;
                            return (
                                <div key={idx} className="flex gap-4">
                                    <Icon className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                                    <div>
                                        <h3 className="text-lg font-serif font-bold mb-1">{feature.title}</h3>
                                        <p className="text-gray-400">{feature.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Complete Feature Set - Grid */}
                <div className="mb-24">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-16 tracking-tight">
                        Complete Feature Set
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                                <div key={idx} className="p-6 rounded-lg border border-gray-800 hover:border-orange-500/50 transition-colors">
                                    <Icon className="w-6 h-6 text-orange-500 mb-3" />
                                    <h3 className="font-bold text-white mb-2">{cap.label}</h3>
                                    <p className="text-sm text-gray-400">{cap.detail}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Final CTA */}
                <div className="pt-16 text-center border-t border-gray-800">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 tracking-tight">
                        Ready to Try It?
                    </h2>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-lg">
                        Start a demo call today and see how your AI receptionist can handle your calls.
                    </p>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-black font-bold py-3 px-10 rounded-lg transition-colors">
                        <Phone className="w-4 h-4 mr-2" />
                        Start a Demo Call
                    </Button>
                </div>
            </div>
        </main>
    );
}
