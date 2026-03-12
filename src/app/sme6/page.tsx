"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Phone, MessageSquare, ArrowRight, Mic, Dumbbell, Wrench } from "lucide-react";
import Image from "next/image";

export default function SME6Page() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      {/* Background grid effect */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(hsl(160 100% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(160 100% 50%) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      {/* Animated background gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-32 left-1/3 w-80 h-80 bg-gradient-to-br from-cyan-500/10 to-slate-900/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-20"
        >
          <Link href="/" className="font-mono text-lg font-bold text-white">
            allconvos
          </Link>
          <Link href="/" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </motion.div>

        {/* Hero Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-24"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-cyan-400">
              AI Voice & SMS Demo
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-6 tracking-tight"
          >
            Stop Losing Jobs
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              To Voicemail.
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Every missed call is a customer calling your competitor instead. Our AI receptionist answers every call and SMS — 24/7 — so you never lose another lead.
          </motion.p>

          {/* Demo Cards Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            {[
              {
                icon: Mic,
                title: "Sales Demo",
                subtitle: "See what the agent can do",
                description: "Watch the AI handle objections, qualify leads, and close — all on autopilot.",
              },
              {
                icon: Dumbbell,
                title: "Gym Demo",
                subtitle: "Membership & class bookings",
                description: "AI handles new member enquiries, class schedules, and trial bookings instantly.",
              },
              {
                icon: Wrench,
                title: "Tradies Demo",
                subtitle: "Plumbing, electrical & more",
                description: "Emergency callouts, quote requests, and job bookings — even after hours.",
              },
            ].map((demo, i) => (
              <motion.div
                key={demo.title}
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                className="group relative rounded-xl bg-slate-900/50 backdrop-blur border border-cyan-500/20 hover:border-cyan-400/50 transition-all overflow-hidden cursor-pointer"
              >
                {/* Gradient border glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Orb container */}
                <div className="relative w-full aspect-square max-h-52 overflow-hidden rounded-t-xl bg-slate-950">
                  <Image
                    src="/images/demo-orb.png"
                    alt={`${demo.title} - Tap to launch AI voice demo`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Pulsing ring overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full border-2 border-cyan-400/60 animate-pulse flex items-center justify-center backdrop-blur-sm bg-slate-900/40">
                      <demo.icon className="w-7 h-7 text-cyan-400" />
                    </div>
                  </div>
                </div>

                {/* Card content */}
                <div className="relative p-5">
                  <h3 className="text-lg font-bold text-white mb-1">{demo.title}</h3>
                  <p className="font-mono text-xs tracking-wider text-cyan-400 uppercase mb-2">{demo.subtitle}</p>
                  <p className="text-sm text-gray-400 leading-relaxed mb-3">{demo.description}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-cyan-400 group-hover:gap-2 transition-all">
                    Tap to launch <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold py-3 px-8 rounded-lg transition-colors inline-flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Try the Live Demo
            </Button>
            <Button className="border-2 border-cyan-500/50 hover:border-cyan-400 bg-transparent text-white font-bold py-3 px-8 rounded-lg hover:bg-cyan-500/10 transition-all inline-flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              See How It Works
            </Button>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            {[
              { value: "0", label: "Missed Calls" },
              { value: "24/7", label: "Availability" },
              { value: "<1s", label: "Response Time" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.section>
      </div>
    </main>
  );
}
