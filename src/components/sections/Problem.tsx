import { GlassCard } from "../ui/GlassCard";
import { TrendingDown, RefreshCcw, Rocket } from "lucide-react";

export function Problem() {
    return (
        <section id="problem" className="py-24 relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Your Voicemail is Where <br />
                    <span className="text-red-500">Money Goes to Die.</span>
                </h2>
                <p className="text-xl text-gray-400 mb-16">
                    Every missed call is a job going to your competitor. You’re good at what you do, but you can’t be everywhere at once.
                </p>

                <div className="grid md:grid-cols-3 gap-8 text-left">
                    {/* Card 1 */}
                    <GlassCard className="border-red-500/20 hover:border-red-500/50 transition-colors">
                        <div className="text-red-500 mb-4"><TrendingDown className="w-8 h-8" /></div>
                        <h3 className="text-lg font-bold text-white mb-2">The Pain</h3>
                        <p className="text-sm text-gray-400">You&apos;re deep in a job, phone rings. You ignore it. That was a $5,000 bathroom reno gone to the next guy on Google.</p>
                    </GlassCard>
                    {/* Card 2 */}
                    <GlassCard className="border-yellow-500/20 hover:border-yellow-500/50 transition-colors">
                        <div className="text-yellow-500 mb-4"><RefreshCcw className="w-8 h-8" /></div>
                        <h3 className="text-lg font-bold text-white mb-2">The Struggle</h3>
                        <p className="text-sm text-gray-400">You spend your nights playing phone tag, returning missed calls, and drowning in admin instead of relaxing.</p>
                    </GlassCard>
                    {/* Card 3 */}
                    <GlassCard className="border-neon/20 hover:border-neon transition-colors relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-neon/10 rounded-bl-full" />
                        <div className="text-neon mb-4"><Rocket className="w-8 h-8" /></div>
                        <h3 className="text-lg font-bold text-white mb-2">The Fix</h3>
                        <p className="text-sm text-gray-400">We clone your best day. Our AI answers instantly, qualifies the lead, and books the time. You just show up.</p>
                    </GlassCard>
                </div>
            </div>
        </section>
    );
}
