"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const portfolios = [
    {
        title: "Fashion Film",
        category: "Commercial",
        views: "1.2k",
        image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=600&auto=format&fit=crop"
    },
    {
        title: "Music Video",
        category: "Artistic",
        views: "8.5k",
        image: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=600&auto=format&fit=crop"
    },
    {
        title: "Documentary",
        category: "Storytelling",
        views: "3.4k",
        image: "https://images.unsplash.com/photo-1550100136-e074fa05d874?q=80&w=600&auto=format&fit=crop"
    },
    {
        title: "Product Launch",
        category: "Corporate",
        views: "5.1k",
        image: "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?q=80&w=600&auto=format&fit=crop"
    },
    {
        title: "Short Film",
        category: "Cinema",
        views: "12k",
        image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=600&auto=format&fit=crop"
    },
    {
        title: "Brand Story",
        category: "Marketing",
        views: "2.9k",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format&fit=crop"
    }
];

const PortfolioSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Reveal Header with Split Text effect
        gsap.from(".section-header h2", {
            opacity: 0,
            y: 50,
            rotateX: -20,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".section-header",
                start: "top 80%",
            }
        });

        // Enhanced Grid Reveal with Clip-Path and Rotation
        gsap.from(".portfolio-item", {
            opacity: 0,
            y: 100,
            rotation: -5,
            scale: 0.8,
            duration: 1.5,
            stagger: {
                amount: 1.2,
                from: "start",
                grid: "auto"
            },
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".portfolio-grid",
                start: "top 75%",
                toggleActions: "play none none reverse"
            }
        });

        // Image Clip-Path Reveal
        gsap.from(".portfolio-item > div:first-child", {
            clipPath: "inset(0 100% 0 0)",
            duration: 1.2,
            ease: "power2.inOut",
            stagger: {
                amount: 1.2,
                from: "start"
            },
            scrollTrigger: {
                trigger: ".portfolio-grid",
                start: "top 75%",
                toggleActions: "play none none reverse"
            }
        });

        // Enhanced Hover Interactions with 3D Tilt
        const items = gsap.utils.toArray<HTMLElement>(".portfolio-item");
        items.forEach((item) => {
            const hoverTl = gsap.timeline({ paused: true });
            hoverTl.to(item, {
                scale: 1.05,
                rotation: 2,
                boxShadow: "0 20px 60px rgba(226,105,84,0.3)",
                duration: 0.4,
                ease: "power2.out"
            });

            item.addEventListener("mouseenter", () => hoverTl.play());
            item.addEventListener("mouseleave", () => hoverTl.reverse());
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="min-h-screen bg-[#2D3E50] text-white py-24 px-8 relative">

            <div className="max-w-7xl mx-auto flex flex-col gap-16">
                <div className="section-header flex flex-col items-center text-center gap-4">
                    <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter">Portfolio / Showreels</h2>
                    <p className="text-gray-400 max-w-lg">
                        A curated selection of our best work, showcasing our versatility and passion for storytelling.
                    </p>
                </div>

                <div className="portfolio-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {portfolios.map((item, index) => (
                        <PortfolioCard key={index} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const PortfolioCard = ({ item }: { item: any }) => {
    return (
        <div className="portfolio-item group relative h-[250px] md:h-[300px] rounded-2xl overflow-hidden bg-gray-900 border border-white/10 cursor-pointer">
            {/* Image */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 opacity-60 group-hover:opacity-40"
                style={{ backgroundImage: `url(${item.image})` }}
            />

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center transform group-hover:scale-125 transition-transform duration-300">
                    <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[16px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                </div>
            </div>

            {/* Info */}
            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                <div className="flex justify-between items-end">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#F67963] transition-colors">{item.title}</h3>
                        <p className="text-xs text-[#F67963] uppercase tracking-widest">{item.category}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                        <span>👁 {item.views}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PortfolioSection;
