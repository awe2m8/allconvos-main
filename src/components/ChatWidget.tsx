"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, Bot, Send } from "lucide-react";

interface Message {
  text: string;
  sender: "agent" | "user";
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "CORE SYSTEM ACTIVE. I am the allconvos_ AI receptionist. I'm here to qualify your leads and book jobs 24/7. How can I help you today?",
      sender: "agent",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = inputValue.trim();
    if (!val || isTyping) return;

    setMessages((prev) => [...prev, { text: val, sender: "user" }]);
    setInputValue("");
    setIsTyping(true);

    // Mock AI Response logic
    setTimeout(() => {
      setIsTyping(false);
      const scripts = [
        "ROUTING COMMAND: I've verified a technician is available in that sector. Would you like me to book them for you now?",
        "QUALIFYING DATA: Understood. I can handle that qualification immediately. Please provide your contact sequence (phone number).",
        "STATUS UPDATE: System routing complete. Our automation is currently qualifying your request. Expect a confirmation link shortly.",
      ];
      const randomMsg = scripts[Math.floor(Math.random() * scripts.length)];
      setMessages((prev) => [...prev, { text: randomMsg, sender: "agent" }]);
    }, 1400);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[2147483647] font-mono select-none leading-relaxed">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.9, y: 30, filter: "blur(10px)" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-[380px] h-[520px] bg-[#05070a]/98 backdrop-blur-2xl border border-gray-800 rounded-2xl flex flex-col shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(217,255,65,0.05)] mb-6 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#0f1115] border-b border-gray-800 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] shadow-[0_0_8px_rgba(255,95,87,0.5)]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e] shadow-[0_0_8px_rgba(254,188,46,0.5)]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28c840] shadow-[0_0_8px_rgba(40,200,64,0.5)]" />
                </div>
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-black">
                    live_agent_v3.0.sys
                  </span>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="text-gray-500 hover:text-neon p-1 transition-colors"
                type="button"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* System Bar */}
            <div className="bg-[#0a0c10]/60 px-5 py-2 border-b border-gray-800/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse shadow-[0_0_5px_#D9FF41]" />
                <span className="text-[9px] text-neon uppercase font-bold tracking-widest">
                  Core Active
                </span>
              </div>
              <span className="text-[9px] text-gray-600 font-bold uppercase">
                Sector: HQ-Main
              </span>
            </div>

            {/* Messages */}
            <div 
              className="flex-grow p-5 overflow-y-auto custom-scrollbar flex flex-col gap-6"
              style={{
                backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')",
                backgroundAttachment: "local"
              }}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`${
                    msg.sender === "agent"
                      ? "border-l-2 border-neon bg-[#0a0c10] text-neon rounded-[4px_12px_12px_4px] self-start"
                      : "bg-[#1f2937] text-white rounded-xl border border-[#374151] self-end"
                  } p-3.5 text-xs max-w-[88%] shadow-xl`}
                >
                  {msg.text}
                </div>
              ))}
              {isTyping && (
                <div className="text-[11px] text-neon uppercase tracking-[2px] font-bold animate-pulse p-2">
                  <span className="mr-2">&gt;&gt;&gt;</span>Qualifying Routing...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="p-5 bg-[#0f1115] border-t border-gray-800 flex gap-3"
            >
              <div className="relative flex-grow">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neon opacity-50 text-xs font-bold">
                  $
                </span>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  autoComplete="off"
                  placeholder="Type command..."
                  className="w-full bg-[#05070a] border border-gray-800 rounded-xl pl-10 pr-4 py-3 text-sm text-neon focus:outline-none focus:border-neon/40 focus:ring-1 focus:ring-neon/20 placeholder-gray-700 transition-all font-mono"
                />
              </div>
              <button
                type="submit"
                className="bg-neon p-3 rounded-xl text-black hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(217,255,65,0.4)]"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher */}
      <div className="relative">
        <motion.button
          onClick={toggleChat}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.85 }}
          className={`ml-auto w-[68px] h-[68px] bg-[#05070a] border-[1.5px] rounded-full flex items-center justify-center cursor-pointer transition-all duration-400 shadow-[0_10px_40px_rgba(0,0,0,0.6)] ${
            isOpen 
              ? "rotate-90 bg-[#111827] border-gray-700" 
              : "border-neon/20 hover:border-neon hover:shadow-[0_0_35px_rgba(217,255,65,0.5)]"
          }`}
          type="button"
        >
          {isOpen ? (
            <X className="w-9 h-9 text-white" />
          ) : (
            <Bot className="w-9 h-9 text-neon" />
          )}

          {!isOpen && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-black border-2 border-neon rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-neon rounded-full animate-pulse shadow-[0_0_10px_#D9FF41]" />
            </div>
          )}
        </motion.button>

        {/* Tooltip */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-full right-0 mb-5 pointer-events-none"
            >
              <div className="bg-neon text-black text-[11px] font-black uppercase tracking-widest px-5 py-2.5 rounded-xl shadow-[0_15px_30_rgba(217,255,65,0.4)] relative whitespace-nowrap animate-bounce">
                Build My AI Agent
                <div className="absolute top-full right-7 w-4 h-4 bg-neon rotate-45 -translate-y-2" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1f2937;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d9ff41;
        }
      `}</style>
    </div>
  );
}
