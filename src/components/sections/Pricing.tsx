import { Button } from "../ui/Button";
import { GlassCard } from "../ui/GlassCard";
import { Check } from "lucide-react";

export function Pricing() {
    return (
        <section id="pricing" className="py-24 relative">
            <div className="max-w-4xl mx-auto px-6 text-center">

                <h2 className="text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
                <p className="text-gray-400 mb-12">One missed job costs you more than our yearly fee.</p>

                <GlassCard className="border-neon/50 shadow-[0px_0px_50px_rgba(163,230,53,0.05)] relative overflow-visible transform transition-transform hover:scale-[1.01] text-left">
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-neon text-ocean-950 font-bold px-6 py-2 rounded-full uppercase text-xs tracking-wider shadow-lg">
                        Most Popular
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 items-center pt-4">
                        <div className="text-left space-y-6">
                            <h3 className="text-2xl font-bold text-white">The &quot;Set & Forget&quot; Retainer</h3>
                            <div className="flex items-baseline gap-2">
                                <span className="text-5xl font-bold text-neon font-mono">$500</span>
                                <span className="text-gray-400">/ month</span>
                            </div>
                            <p className="text-sm text-gray-400">+ $1,000 one-time setup (Custom Training your Digital Staff)</p>

                            <Button className="w-full">Start Your Free Trial</Button>
                            <p className="text-xs text-gray-500 text-center mt-2">More bookings in 30 days or you don’t pay.</p>
                        </div>

                        <div className="text-left border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-8 space-y-4">
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-sm text-gray-300">
                                    <span className="text-neon"><Check className="w-4 h-4" /></span> 24/7 Call & SMS Handling
                                </li>
                                <li className="flex items-center gap-3 text-sm text-gray-300">
                                    <span className="text-neon"><Check className="w-4 h-4" /></span> Direct Calendar Booking
                                </li>
                                <li className="flex items-center gap-3 text-sm text-gray-300">
                                    <span className="text-neon"><Check className="w-4 h-4" /></span> Local &quot;Northern Rivers&quot; Dialect
                                </li>
                                <li className="flex items-center gap-3 text-sm text-gray-300">
                                    <span className="text-neon"><Check className="w-4 h-4" /></span> Unlimited Conversations
                                </li>
                                <li className="flex items-center gap-3 text-sm text-gray-300">
                                    <span className="text-neon"><Check className="w-4 h-4" /></span> Dedicated Account Manager
                                </li>
                            </ul>
                        </div>
                    </div>
                </GlassCard>
            </div>
        </section>
    );
}
