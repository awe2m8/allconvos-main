"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot } from "lucide-react";

declare global {
  interface Window {
    leadConnector: any;
  }
}

export function ChatWidget() {
  const toggleGHLWidget = () => {
    if (window.leadConnector && window.leadConnector.chatWidget) {
      window.leadConnector.chatWidget.toggleWidget();
    } else {
      console.warn("LeadConnector widget not loaded yet.");
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[2147483647] font-mono select-none leading-relaxed">
      {/* Launcher */}
      <div className="relative">
        <motion.button
          onClick={toggleGHLWidget}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.85 }}
          className="ml-auto w-[68px] h-[68px] bg-[#05070a] border-[1.5px] border-neon/20 rounded-full flex items-center justify-center cursor-pointer transition-all duration-400 shadow-[0_10px_40px_rgba(0,0,0,0.6)] hover:border-neon hover:shadow-[0_0_35px_rgba(217,255,65,0.5)]"
          type="button"
        >
          <Bot className="w-9 h-9 text-neon" />

          <div className="absolute -top-1 -right-1 w-5 h-5 bg-black border-2 border-neon rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-neon rounded-full animate-pulse shadow-[0_0_10px_#D9FF41]" />
          </div>
        </motion.button>

        {/* Tooltip */}
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-full right-0 mb-5 pointer-events-none"
          >
            <div className="bg-neon text-black text-[11px] font-black uppercase tracking-widest px-5 py-2.5 rounded-xl shadow-[0_15px_30px_rgba(217,255,65,0.4)] relative whitespace-nowrap animate-bounce">
              Build My AI Agent
              <div className="absolute top-full right-7 w-4 h-4 bg-neon rotate-45 -translate-y-2" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <style jsx global>{`
        /* Hide the default LeadConnector chat bubble */
        #chat-widget-container div[class*="launcher"],
        #chat-widget-container button[class*="launcher"],
        .lc-chat-widget-launcher {
          display: none !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }
      `}</style>
    </div>
  );
}
