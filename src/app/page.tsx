import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { VSL } from "@/components/sections/VSL";
import { SocialProof } from "@/components/sections/SocialProof";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { Features } from "@/components/sections/Features";
import { CaseStudy } from "@/components/sections/CaseStudy";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <main className="bg-ocean-950 min-h-screen relative overflow-x-hidden">
      <Navbar />
      <Hero />
      <VSL />
      <SocialProof />
      <Problem />
      <Solution />
      <Features />
      <CaseStudy />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
