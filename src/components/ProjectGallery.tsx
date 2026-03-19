"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Project Alpha",
    category: "Commercial",
    image: "/branded_content.jpg",
    video: "/LOGO LOW RESOLUTION.mp4",
  },
  {
    id: 2,
    title: "Neon Nights",
    category: "Music Video",
    image: "/events.jpg",
    video: "/LOGO LOW RESOLUTION.mp4",
  },
  {
    id: 3,
    title: "Urban Pulse",
    category: "Documentary",
    image: "/branded_content.jpg",
    video: "/LOGO LOW RESOLUTION.mp4",
  },
  {
    id: 4,
    title: "Brand Story 2025",
    category: "Branded Content",
    image: "/events.jpg",
    video: "/LOGO LOW RESOLUTION.mp4",
  },
];

export default function ProjectGallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const items = gsap.utils.toArray(".project-item") as HTMLElement[];

    items.forEach((item) => {
      gsap.fromTo(
        item,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Expansion Logic
      const img = item.querySelector(".project-media") as HTMLElement;
      gsap.to(img, {
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: item,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="work" className="py-32 px-4 md:px-12 bg-noir">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20">
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white uppercase tracking-tighter">
            Selected <span className="text-rose-accent">Work</span>
          </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-item group relative aspect-video overflow-hidden bg-surface cursor-pointer"
            >
              {/* Media Container */}
              <div className="project-media relative w-full h-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-noir/20 group-hover:bg-noir/0 transition-colors duration-500" />
              </div>

              {/* Info Overlay */}
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-noir/80 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-xs font-sans text-rose-accent tracking-widest uppercase mb-1">
                  {project.category}
                </p>
                <h3 className="text-2xl font-display font-medium text-white uppercase">
                  {project.title}
                </h3>
              </div>

              {/* Hover Play Button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm">
                  <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
