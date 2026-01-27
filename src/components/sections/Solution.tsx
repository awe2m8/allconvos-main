export function Solution() {
    return (
        <section id="how" className="py-24 bg-ocean-900 border-y border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">We Clone Your Best Days</h2>
                    <div className="h-1 w-24 bg-neon mx-auto" />
                </div>

                <div className="grid md:grid-cols-3 gap-12 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-neon/30 to-transparent -translate-y-1/2 z-0" />

                    {/* Step 1 */}
                    <div className="relative z-10 bg-ocean-950 p-8 border border-white/5 rounded-sm hover:-translate-y-2 transition-transform duration-300">
                        <div className="w-12 h-12 bg-ocean-900 border border-neon text-neon flex items-center justify-center font-mono font-bold text-xl mb-6 mx-auto shadow-[0px_0px_15px_rgba(163,230,53,0.2)]">1</div>
                        <h3 className="text-xl font-bold text-white text-center mb-3">It Rings (Or Pings)</h3>
                        <p className="text-center text-gray-400 text-sm">Whether it&apos;s a phone call, SMS, or Instagram DM, we pick up instantly. 24/7 coverage. No sick days.</p>
                    </div>

                    {/* Step 2 */}
                    <div className="relative z-10 bg-ocean-950 p-8 border border-white/5 rounded-sm hover:-translate-y-2 transition-transform duration-300">
                        <div className="w-12 h-12 bg-ocean-900 border border-neon text-neon flex items-center justify-center font-mono font-bold text-xl mb-6 mx-auto shadow-[0px_0px_15px_rgba(163,230,53,0.2)]">2</div>
                        <h3 className="text-xl font-bold text-white text-center mb-3">It Chats & Qualifies</h3>
                        <p className="text-center text-gray-400 text-sm">Our AI sounds like your best apprentice. Friendly, local, and focused on getting the details (Name, Issue, Location).</p>
                    </div>

                    {/* Step 3 */}
                    <div className="relative z-10 bg-ocean-950 p-8 border border-white/5 rounded-sm hover:-translate-y-2 transition-transform duration-300">
                        <div className="w-12 h-12 bg-ocean-900 border border-neon text-neon flex items-center justify-center font-mono font-bold text-xl mb-6 mx-auto shadow-[0px_0px_15px_rgba(163,230,53,0.2)]">3</div>
                        <h3 className="text-xl font-bold text-white text-center mb-3">It Books or Escalates</h3>
                        <p className="text-center text-gray-400 text-sm">If it&apos;s a qualified lead, it goes straight into your calendar. If it&apos;s urgent/complex, we text you immediately.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
