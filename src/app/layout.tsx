import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ChatWidget } from "../components/ChatWidget";
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "allconvos | Mission Control for Local Legends",
  description: "The AI receptionist that answers every call, qualifies every lead, and books jobs 24/7.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} antialiased scroll-smooth`}>
      <body className="relative">
        {children}
        <ChatWidget />
        <Script
          src="https://widgets.leadconnectorhq.com/loader.js"
          data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id="6938c5244ccc570e59720168"
          strategy="lazyOnload"
        />
        <style dangerouslySetInnerHTML={{
          __html: `
          #chat-widget-container, 
          .lc-chat-widget {
            left: 24px !important;
            right: auto !important;
          }
          #chat-widget-container button[class*="launcher"],
          .lc-chat-widget-launcher {
            left: 24px !important;
            right: auto !important;
          }
        `}} />
      </body>
    </html>
  );
}
