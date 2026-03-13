"use client";

import Link from "next/link";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { appUrl, marketingUrl } from "@/lib/siteUrls";

export function Navbar() {
    const marketingHomeUrl = marketingUrl("/");
    const tradiesDemoUrl = marketingUrl("/tradies");
    const appOnboardingUrl = appUrl("/app/onboarding");

    return (
        <nav className="fixed w-full z-50 top-0 left-0 bg-ocean-950/80 backdrop-blur-lg border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link href={marketingHomeUrl} className="font-mono text-2xl font-bold tracking-tighter text-white">
                    allconvos<span className="text-neon">_</span>
                </Link>

                <div className="hidden md:flex items-center space-x-8 text-sm font-mono text-gray-400">
                    <Link href={`${marketingHomeUrl}#problem`} className="hover:text-neon transition-colors">The Problem</Link>
                    <Link href={`${marketingHomeUrl}#how`} className="hover:text-neon transition-colors">How It Works</Link>
                    <Link href={`${marketingHomeUrl}#pricing`} className="hover:text-neon transition-colors">Pricing</Link>
                    
                    <div className="flex items-center gap-3 ml-2">
                        {/* Tradie Demo Button */}
                        <div className="relative group">
                            <Link 
                                href={tradiesDemoUrl} 
                                className="bg-[#ff4d00] text-white px-3 py-1.5 rounded-sm font-bold text-[10px] uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center whitespace-nowrap"
                            >
                                Tradie Demo
                            </Link>
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#ff4d00] rotate-45" />
                        </div>

                        {/* More Demos Button */}
                        <div className="relative group">
                            <Link 
                                href={marketingUrl("/demos")} 
                                className="bg-[#ff4d00] text-white px-3 py-1.5 rounded-sm font-bold text-[10px] uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center whitespace-nowrap"
                            >
                                More Demos
                            </Link>
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#ff4d00] rotate-45" />
                        </div>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-3">
                    <SignedIn>
                        <Link
                            href={appOnboardingUrl}
                            className="inline-flex items-center justify-center px-5 py-2 text-sm border-2 border-neon/30 text-neon rounded-sm font-bold uppercase tracking-wide font-mono hover:border-neon hover:bg-neon/10 transition-all"
                        >
                            Open App
                        </Link>
                        <UserButton afterSignOutUrl={marketingHomeUrl} />
                    </SignedIn>
                </div>
            </div>
        </nav>
    );
}
