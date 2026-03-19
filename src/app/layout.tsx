// NO "use client" at top - keep as Server Component ✅
import type { Metadata } from "next";
import { Space_Grotesk, Archivo } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import ViewportFix from "@/components/ViewportFix";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cinematic Portfolio | Creative Studio",
  description: "Immersive visual storytelling and high-end video production for the digital age.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${spaceGrotesk.variable} ${archivo.variable} font-archivo antialiased`}
      >
        {/* ← ViewportFix runs client-side but doesn't break server metadata */}
        <ViewportFix />
        
        <SmoothScroll>
          <Preloader />
          <CustomCursor />
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}