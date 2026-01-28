"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-GB", { hour12: false }));
    };

    updateTime(); // Initial call
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="fixed top-0 left-0 z-50 w-full px-8 py-6 flex items-center justify-between text-white mix-blend-difference">
      {/* Logo Area */}
      <div className="flex flex-col leading-none">
        <span className="text-2xl font-bold tracking-tighter text-primary drop-shadow-[0_0_10px_rgba(204,255,0,0.5)]">CREATIVECHAUK</span>
        <span className="text-[10px] tracking-[0.2em] text-gray-400">PRODUCTION</span>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-12 text-xs font-medium tracking-widest">
        <Link href="#" className="hover:text-primary transition-colors hover:drop-shadow-[0_0_8px_rgba(204,255,0,0.8)]">WORK</Link>
        <Link href="#" className="hover:text-primary transition-colors hover:drop-shadow-[0_0_8px_rgba(204,255,0,0.8)]">SERVICES</Link>
        <Link href="#" className="hover:text-primary transition-colors hover:drop-shadow-[0_0_8px_rgba(204,255,0,0.8)]">ABOUT US</Link>
        <Link href="#" className="hover:text-primary transition-colors hover:drop-shadow-[0_0_8px_rgba(204,255,0,0.8)]">CONTACTS</Link>
        <div className="ml-8 text-primary flex items-center gap-2 tabular-nums drop-shadow-[0_0_5px_rgba(204,255,0,0.5)]">
          <span>{time}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
