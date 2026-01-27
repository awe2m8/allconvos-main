import { BentoGrid, BentoGridItem } from "../ui/BentoGrid";
import { GlassCard } from "../ui/GlassCard";
import { Calendar, MessageSquare, MapPin, Database } from "lucide-react";

export function Features() {
    return (
        <section className="py-24">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-white mb-12 text-center font-mono">Mission Capabilities</h2>

                <BentoGrid>
                    {/* Large Feature */}
                    <div className="md:col-span-2 md:row-span-2 row-span-1 rounded-sm group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-6 dark:bg-ocean-900/50 dark:border-white/10 bg-white border border-transparent flex flex-col justify-between overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ocean-950/90 z-10" />
                        <div className="relative z-20">
                            <div className="flex items-center gap-2 mb-2 text-white font-bold"><Calendar className="w-5 h-5 text-neon" /> Smart Scheduling</div>
                            <p className="text-gray-400">Syncs directly with your Google/Outlook calendar. No double bookings. Ever.</p>
                        </div>
                        <div className="mt-8 bg-ocean-800/50 border border-white/5 p-4 rounded text-xs font-mono text-neon border-l-4 border-l-neon w-fit z-20">
                            {">"} Appointment Confirmed <br />
                            {">"} Tuesday, 10:00 AM <br />
                            {">"} Site: 12 Shelley St, Lennox
                        </div>
                        <div className="absolute right-0 bottom-0 w-48 h-48 bg-neon/5 rounded-full blur-3xl" />
                    </div>

                    {/* Feature 2 */}
                    <div className="md:col-span-2 row-span-1 rounded-sm group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-6 dark:bg-ocean-900/50 dark:border-white/10 bg-white border border-transparent flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-2 text-white font-bold"><MessageSquare className="w-5 h-5 text-neon" /> Omni-Channel Command</div>
                        <p className="text-gray-400 text-sm">Voice, SMS, Facebook Messenger, Instagram, Email. One brain handling all inputs.</p>
                    </div>

                    {/* Feature 3 */}
                    <GlassCard className="md:col-span-1 border-neon/20 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-2 text-white font-bold"><MapPin className="w-5 h-5 text-neon" /> Local Dialect</div>
                        <p className="text-gray-400 text-xs text-balance">Trained to understand "arvo", "reno", and Northern Rivers geography.</p>
                    </GlassCard>

                    {/* Feature 4 */}
                    <GlassCard className="md:col-span-1 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-2 text-white font-bold"><Database className="w-5 h-5 text-neon" /> CRM Sync</div>
                        <p className="text-gray-400 text-xs text-balance">Pushes lead data straight into your ServiceM8, Tradify, or HubSpot.</p>
                    </GlassCard>
                </BentoGrid>
            </div>
        </section>
    );
}
