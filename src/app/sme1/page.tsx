"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Phone, CheckCircle2 } from "lucide-react";

export default function SME1Page() {
    return (
        <main className="min-h-screen bg-black text-white">
            <div className="max-w-5xl mx-auto px-8 py-20">
                {/* Navigation */}
                <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white mb-16 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </Link>

                {/* Hero Section - Type-First Approach */}
                <div className="space-y-12 mb-24">
                    <h1 className="text-7xl md:text-8xl font-serif leading-[1.1] font-bold tracking-tight">
                        Meet Your<br />
                        <span className="text-orange-500">AI Receptionist</span>
                    </h1>
                    <p className="text-xl text-gray-400 leading-relaxed max-w-2xl font-light">
                        Let an intelligent AI answer your calls. Define how it should respond, set your rules, and let it work for you—while you focus on what matters.
                    </p>
                </div>

                {/* How It Works - Editorial Style */}
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

                {/* Key Features - Grid with Icons */}
                <div className="mb-24">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-16 tracking-tight">
                        What Your AI Can Do
                    </h2>

                    <div className="grid md:grid-cols-2 gap-12">
                        {[
                            { title: "Answer 24/7", desc: "Never miss a call again, whether you're busy or after hours." },
                            { title: "Book Appointments", desc: "Automatically check your calendar and schedule meetings without you lifting a finger." },
                            { title: "Qualify Leads", desc: "Ask questions to understand what the caller needs before transferring to you." },
                            { title: "Send Info via SMS", desc: "Automatically text details like pricing, hours, or quotes while you're on another call." }
                        ].map((feature, idx) => (
                            <div key={idx} className="flex gap-4">
                                <CheckCircle2 className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-lg font-serif font-bold mb-1">{feature.title}</h3>
                                    <p className="text-gray-400">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA - Bold & Simple */}
                <div className="pt-16 text-center">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 tracking-tight">
                        Ready to Try It?
                    </h2>
                    <p className="text-gray-400 mb-8 max-w-md mx-auto text-lg">
                        Start a demo call today and see how your AI receptionist can handle your calls.
                    </p>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-black font-bold text-base py-3 px-8">
                        <Phone className="w-4 h-4 mr-2" />
                        Start a Demo Call
                    </Button>
                </div>
            </div>
        </main>
    );
}
