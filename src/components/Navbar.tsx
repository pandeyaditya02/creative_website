"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { href: "#work", label: "WORK" },
  { href: "#services", label: "SERVICES" },
  { href: "#about", label: "ABOUT US" },
  { href: "#contact", label: "CONTACTS" },
];

const Navbar = () => {
  const [time, setTime] = useState("");
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-GB", { hour12: false }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Entrance animations
    tl.fromTo(
      logoRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    )
      .fromTo(
        ".nav-link",
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
        "-=0.6"
      )
      .fromTo(
        timeRef.current,
        { y: -20, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6 },
        "-=0.4"
      );

    // Hide/Show on scroll
    let lastScrollY = 0;
    const showAnim = gsap.fromTo(
      navRef.current,
      { yPercent: -100 },
      { yPercent: 0, duration: 0.4, paused: true, ease: "power2.out" }
    ).progress(1);

    ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        const scrollY = window.scrollY;
        if (scrollY < 100) {
          showAnim.play();
        } else if (self.direction === -1) {
          showAnim.play();
        } else {
          showAnim.reverse();
        }
        lastScrollY = scrollY;
      },
    });

    // Magnetic hover effect for nav links
    const links = document.querySelectorAll(".nav-link");
    links.forEach((link) => {
      const linkEl = link as HTMLElement;

      linkEl.addEventListener("mouseenter", () => {
        gsap.to(linkEl.querySelector(".link-underline"), {
          scaleX: 1,
          transformOrigin: "left center",
          duration: 0.3,
          ease: "power2.out",
        });
      });

      linkEl.addEventListener("mouseleave", () => {
        gsap.to(linkEl.querySelector(".link-underline"), {
          scaleX: 0,
          transformOrigin: "right center",
          duration: 0.3,
          ease: "power2.out",
        });
      });

      linkEl.addEventListener("mousemove", (e: MouseEvent) => {
        const rect = linkEl.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(linkEl, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      linkEl.addEventListener("mouseleave", () => {
        gsap.to(linkEl, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.5)",
        });
      });
    });
  }, { scope: navRef });

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 z-50 w-full px-8 py-6 flex items-center justify-between text-white mix-blend-difference"
    >
      {/* Logo Area */}
      <div ref={logoRef} className="flex leading-none group cursor-pointer">
        <Image
          src="/LOGO SAMP 01.png"
          alt="Creative Chauk Production"
          width={160}
          height={50}
          className="transition-transform duration-300 group-hover:scale-105"
          priority
        />
      </div>

      {/* Navigation Links */}
      <div ref={linksRef} className="flex items-center gap-12 text-[11px] font-semibold tracking-widest">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="nav-link relative py-2 hover:text-[#F67963] transition-colors"
          >
            {link.label}
            <span className="link-underline absolute bottom-0 left-0 w-full h-[2px] bg-[#F67963] scale-x-0" />
          </Link>
        ))}
        <div
          ref={timeRef}
          className="ml-8 text-[#F67963] flex items-center gap-2 tabular-nums"
        >
          <span className="relative">
            <span className="absolute -left-3 w-2 h-2 bg-[#F67963] rounded-full animate-pulse" />
            {time}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
