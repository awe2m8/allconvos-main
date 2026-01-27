export function CaseStudy() {
    return (
        <section className="py-24 bg-gradient-to-b from-ocean-900 to-ocean-950">
            <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row gap-12 items-center">
                <div className="flex-1">
                    <div className="text-neon font-mono text-sm mb-2">// DETECTED REVENUE UPLIFT</div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">&quot;I used to spend 2 hours a night returning calls.&quot;</h2>
                    <p className="text-xl text-gray-300 italic mb-8">
                        &quot;Now I just check my calendar in the morning. allconvos booked 12 extra jobs in the first month. That&apos;s $15k I would have missed.&quot;
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-600 rounded-full" />
                        <div>
                            <div className="font-bold text-white">Dave M.</div>
                            <div className="text-sm text-gray-500 font-mono">Owner, Lennox Level Plumbing</div>
                        </div>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="bg-ocean-950 p-6 border border-white/10 rounded-sm relative">
                        <div className="absolute -top-4 -right-4 bg-neon text-ocean-950 font-bold px-4 py-2 font-mono text-sm transform rotate-3 shadow-[0px_0px_20px_rgba(163,230,53,0.4)]">
                            +32% REVENUE
                        </div>
                        {/* Stats Stack */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                <span className="text-gray-400 font-mono text-sm">Missed Calls</span>
                                <span className="text-red-400 font-mono">0</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                <span className="text-gray-400 font-mono text-sm">Auto-Replies</span>
                                <span className="text-white font-mono">143</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                <span className="text-gray-400 font-mono text-sm">Appointments</span>
                                <span className="text-neon font-bold font-mono">42</span>
                            </div>
                        </div>
                        <div className="mt-6 aspect-video bg-ocean-900 rounded border border-white/5 flex items-center justify-center text-gray-600 font-mono text-xs">
                            [REVENUE GRAPH PLACEHOLDER]
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
