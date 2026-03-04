"use client";

import FadeUpReveal from "../animations/FadeUpReveal";

export default function StorySection() {
    return (
        <section id="ethos" className="w-full bg-black padding-macro px-6 md:px-12 text-white overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16 md:gap-24">

                {/* Left Side: Body Copy (Small & Highly Tracked) */}
                <div className="w-full md:w-5/12 order-2 md:order-1">
                    <FadeUpReveal delay={0.2}>
                        <p className="font-work-sans text-sm md:text-base leading-relaxed tracking-[0.05em] text-white/80">
                            We are a collective of directors, cinematographers, and visual artists dedicated to elevating brand narratives.
                            Our approach is rooted in cinematic tradition—every frame is calculated, every shadow is intentional.
                            We don't just shoot footage; we build immersive worlds that resonate on a visceral level.
                        </p>
                    </FadeUpReveal>

                    <FadeUpReveal delay={0.4}>
                        <div className="mt-12 h-[1px] w-16 bg-[#FF5C00]"></div>
                    </FadeUpReveal>
                </div>

                {/* Right Side: Large Vertical Cinematic Image Placeholder */}
                <div className="w-full md:w-7/12 order-1 md:order-2">
                    <FadeUpReveal>
                        <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#1A1A1A] rounded-sm group">
                            {/* Note: In a real app we'd use next/image here */}
                            <img
                                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
                                alt="Cinematic production"
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.05]"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                        </div>
                    </FadeUpReveal>
                </div>
            </div>

            {/* Massive Centered H2 */}
            <div className="max-w-7xl mx-auto mt-32 text-center">
                <FadeUpReveal>
                    <h2 className="text-4xl md:text-[84px] leading-[0.9] font-bold uppercase tracking-tight text-white mix-blend-difference">
                        WE TELL STORIES
                    </h2>
                </FadeUpReveal>
            </div>
        </section>
    );
}
