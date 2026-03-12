import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { AuthSessionIndicator } from "@/components/auth/AuthSessionIndicator";

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
  title: "allconvos | Voice AI for Local Businesses",
  description: "The AI receptionist that answers every call, qualifies every lead, and books jobs 24/7.",
};

import { CookieConsent } from "@/components/ui/CookieConsent";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} antialiased scroll-smooth`}>
        <body className="relative">
          <CookieConsent />
          <AuthSessionIndicator />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
