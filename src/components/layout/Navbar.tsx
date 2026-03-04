"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out px-6 py-8 md:px-12 flex items-center justify-between ${scrolled ? "bg-black/60 backdrop-blur-md py-6" : "bg-transparent"
                }`}
        >
            <Link href="/" className="text-xl font-bold tracking-widest uppercase">
                Montage
            </Link>

            <nav className="hidden md:flex items-center gap-12">
                {[
                    { name: "Work", href: "/#work" },
                    { name: "Ethos", href: "/#ethos" },
                    { name: "Contact", href: "/#contact" },
                ].map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={`text-sm tracking-widest uppercase transition-colors duration-300 hover:text-[#FF5C00] ${pathname === link.href ? "text-[#FF5C00]" : "text-white"
                            }`}
                    >
                        {link.name}
                    </Link>
                ))}
            </nav>

            {/* Mobile Menu Button (Minimalist) */}
            <button className="md:hidden text-sm tracking-widest uppercase">
                Menu
            </button>
        </header>
    );
}
