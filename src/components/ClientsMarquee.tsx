"use client";
import React from "react";

const clients = [
    "HAMDARD",
    "TATA",
    "MAHINDRA",
    "DOLBY DIGITAL",
    "WCL",
    "CCL",
    "DUROFLEX",
    "KOHLER",
    "WHISKEY SAMBA",
    "STAR ANISE",
    "AMAZON SELLERS",
    "HARLEY DAVIDSON",
];

/** A single flat list of all clients for one loop */
const TrackItems = () => (
    <>
        {clients.map((client, i) => (
            <React.Fragment key={i}>
                <span className="inline-block text-sm font-bold tracking-[0.25em] text-white/60 uppercase whitespace-nowrap hover:text-[#F67963] transition-colors duration-300 cursor-default px-3">
                    {client}
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#F67963]/60 align-middle shrink-0" />
            </React.Fragment>
        ))}
    </>
);

const ClientsMarquee = () => {
    return (
        <section className="relative bg-black py-10 border-y border-white/[0.06]" style={{ width: "100%", maxWidth: "100%" }}>
            {/* Eyebrow label */}
            <div className="flex justify-center mb-6">
                <span className="inline-block px-4 py-1 text-[10px] uppercase tracking-[0.3em] text-[#A1A1A1] border border-white/10 rounded-full">
                    Brands We Work For
                </span>
            </div>

            {/* Marquee track — strictly contained */}
            <div
                className="relative w-full"
                style={{ overflow: "hidden" }}
            >
                {/* Left / right fade edges */}
                <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

                {/*
                  Two identical tracks placed side-by-side in an inline-flex row.
                  We animate translateX(0) → translateX(-50%) so the second track
                  slides into view seamlessly, then loops. The outer overflow:hidden
                  clips all content that goes outside the track wrapper.
                */}
                <div
                    className="flex items-center"
                    style={{
                        display: "flex",
                        width: "max-content",
                        animation: "marquee-scroll 30s linear infinite",
                    }}
                >
                    {/* Track A */}
                    <div className="flex items-center gap-0 shrink-0">
                        <TrackItems />
                    </div>
                    {/* Track B — exact duplicate for seamless loop */}
                    <div className="flex items-center gap-0 shrink-0">
                        <TrackItems />
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes marquee-scroll {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </section>
    );
};

export default ClientsMarquee;
