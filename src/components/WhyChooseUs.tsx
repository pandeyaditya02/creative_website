"use client";
import React from "react";
import { useInView } from "@/hooks/useInView";

const points = [
  {
    number: "01",
    title: "Experienced Team",
    description: "Our team consists of seasoned professionals with a passion for creativity and storytelling.",
  },
  {
    number: "02",
    title: "Cutting-Edge Technology",
    description: "We utilize the latest tools and technology to deliver high-quality, impactful content.",
  },
  {
    number: "03",
    title: "Client-Centric Approach",
    description: "We believe in open collaboration, ensuring that our clients' vision is at the heart of everything we produce.",
  },
  {
    number: "04",
    title: "Results-Driven",
    description: "We focus on delivering results that align with your brand's objectives and make a tangible impact.",
  },
];

const WcuPoint = ({ point, index }: { point: (typeof points)[0]; index: number }) => {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.15 });
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex flex-col items-center text-center lg:text-left lg:flex-row ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"}`}
      style={{
        opacity: inView ? undefined : 0,
        animation: inView ? "fadeUpIn 0.9s cubic-bezier(0.16,1,0.3,1) both" : undefined,
      }}
    >
      <div className={`lg:w-[45%] relative ${isLeft ? "lg:text-right lg:pr-16" : "lg:text-left lg:pl-16"}`}>
        <span
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            lg:translate-x-0 lg:left-auto lg:right-auto
            text-[120px] sm:text-[160px] lg:text-[200px]
            font-bold text-white/[0.04] leading-none select-none pointer-events-none
            ${isLeft ? "lg:right-8 lg:left-auto" : "lg:left-8 lg:right-auto"}`}
        >
          {point.number}
        </span>

        <div className="relative z-10">
          <span className="inline-block px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-[#F67963] bg-[#F67963]/10 rounded-full border border-[#F67963]/20 mb-5">
            {point.number}
          </span>
          <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white leading-tight mb-4">
            {point.title}
          </h3>
          <p className="text-[#B0B0B0] text-base sm:text-lg lg:text-xl leading-relaxed max-w-md mx-auto lg:mx-0">
            {point.description}
          </p>
          <div className={`w-16 h-[2px] bg-gradient-to-r from-[#F67963] to-transparent mt-6 mx-auto lg:mx-0 ${isLeft ? "lg:ml-auto" : ""}`} />
        </div>
      </div>

      <div className="hidden lg:flex w-[10%] justify-center">
        <div className="w-3 h-3 rounded-full bg-[#F67963] ring-4 ring-[#F67963]/20 relative z-10" />
      </div>

      <div className="lg:w-[45%]" />
    </div>
  );
};

const WhyChooseUs = () => {
  const [sectionRef, sectionInView] = useInView<HTMLElement>({ threshold: 0.05 });
  const [headingRef, headingInView] = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section
      id="why-choose-us"
      ref={sectionRef}
      className="relative bg-black text-white py-20 md:py-32 lg:py-44 overflow-hidden"
    >
      {/* Heading — animated in with fadeUpIn */}
      <div
        ref={headingRef}
        className="flex flex-col items-center gap-4 mb-16 md:mb-24 lg:mb-36 px-6"
      >
        <span
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.35em] text-[#F67963] font-medium"
          style={{
            opacity: headingInView ? undefined : 0,
            animation: headingInView ? "fadeUpIn 0.6s ease 0ms both" : undefined,
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#F67963] blink-coral" />
          Why choose us
        </span>
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold uppercase tracking-tight text-white text-center"
          style={{
            opacity: headingInView ? undefined : 0,
            animation: headingInView ? "fadeUpIn 0.8s cubic-bezier(0.16,1,0.3,1) 80ms both" : undefined,
          }}
        >
          Built Different
        </h2>
        <div
          className="w-12 h-[2px] bg-gradient-to-r from-[#F67963] to-transparent mt-2"
          style={{
            opacity: headingInView ? undefined : 0,
            animation: headingInView ? "fadeUpIn 0.6s ease 200ms both" : undefined,
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Center line — scaleY transition is fine here, sectionInView fires before SSR concern */}
        <div
          className="wcu-center-line absolute left-1/2 top-0 bottom-0 w-px bg-white/10 origin-top hidden lg:block"
          style={{
            transform: sectionInView ? "scaleY(1)" : "scaleY(0)",
            transition: "transform 1.4s cubic-bezier(0.16,1,0.3,1)",
          }}
        />

        <div className="flex flex-col gap-16 md:gap-24 lg:gap-36">
          {points.map((point, index) => (
            <WcuPoint key={index} point={point} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
