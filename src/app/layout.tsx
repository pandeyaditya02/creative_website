import type { Metadata } from "next";
import { Inter_Tight, Work_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import GSAPInitializer from "@/components/animations/GSAPInitializer";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Creative Video Ads Agency",
  description: "Crafting Visual Legacies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${interTight.variable} ${workSans.variable} antialiased bg-black text-white`}
      >
        <GSAPInitializer />
        <CustomCursor />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
