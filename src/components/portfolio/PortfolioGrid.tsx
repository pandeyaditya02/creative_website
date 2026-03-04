"use client";

import ProjectCard from "./ProjectCard";
import FadeUpReveal from "../animations/FadeUpReveal";

const PROJECTS = [
    {
        id: 1,
        title: "Neon Nights",
        client: "Cyber Dynamics",
        imageSrc: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop",
    },
    {
        id: 2,
        title: "Desert Silence",
        client: "Vogue Emirates",
        imageSrc: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: 3,
        title: "Urban Echoes",
        client: "Metro Mobility",
        imageSrc: "https://images.unsplash.com/photo-1555848962-6e79363ec58f?q=80&w=2053&auto=format&fit=crop",
    },
    {
        id: 4,
        title: "Velvet Horizons",
        client: "Aer Lux",
        imageSrc: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop",
    }
];

export default function PortfolioGrid() {
    return (
        <section id="work" className="w-full bg-black py-32 px-6 md:px-12 text-white">
            <FadeUpReveal>
                <div className="max-w-screen-2xl mx-auto">
                    {/* Section Header */}
                    <div className="flex justify-between items-end mb-20 border-b border-white/20 pb-8">
                        <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tight">Selected Work</h2>
                        <span className="font-work-sans text-sm tracking-widest text-[#FF5C00] uppercase hidden md:inline-block">View All Archive</span>
                    </div>

                    {/* Masonry / 2-Column Desktop Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[40px] gap-y-24">
                        {PROJECTS.map((project, index) => (
                            <FadeUpReveal key={project.id} delay={index * 0.1}>
                                {/* On desktop, we offset the even columns (right side) to create masonry feel */}
                                <div className={`${index % 2 !== 0 ? 'md:mt-32' : ''}`}>
                                    <ProjectCard
                                        title={project.title}
                                        client={project.client}
                                        imageSrc={project.imageSrc}
                                    />
                                </div>
                            </FadeUpReveal>
                        ))}
                    </div>
                </div>
            </FadeUpReveal>
        </section>
    );
}
