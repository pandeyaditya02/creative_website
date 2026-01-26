"use client";
import React from "react";
import { motion } from "framer-motion";

const AboutSection = () => {
    return (
        <section className="relative min-h-screen bg-black text-white py-20 px-8 sm:px-16 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-[128px]" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-16 text-center"
                >
                    About Us
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center w-full">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col gap-8"
                    >
                        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                            <h3 className="text-xl font-bold mb-4 text-orange-400">SMALL PLAYGROUND</h3>
                            <p className="text-gray-300 leading-relaxed text-sm">
                                We started as a small team with a big vision. Our playground was limited, but our ideas were boundless.
                                We believe in experimenting, failing fast, and learning faster to create visuals that truly stand out.
                            </p>
                        </div>

                        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm self-end md:ml-12">
                            <h3 className="text-xl font-bold mb-4 text-orange-400">COMPANY TRIGGERED HISTORY</h3>
                            <p className="text-gray-300 leading-relaxed text-sm">
                                From a single camera to a full-scale production house, our history is triggered by passion.
                                Every project we undertake adds a new chapter to our story, pushing the boundaries of what's possible in digital storytelling.
                            </p>
                        </div>
                    </motion.div>

                    {/* Visual/Timeline Element */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative h-[600px] flex justify-center items-center"
                    >
                        {/* Center Line */}
                        <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-orange-500 to-transparent opacity-50" />

                        {/* Glowing Dots */}
                        <div className="absolute top-1/3 w-4 h-4 bg-orange-500 rounded-full shadow-[0_0_20px_rgba(249,115,22,0.8)]" />
                        <div className="absolute bottom-1/3 w-4 h-4 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.8)]" />

                        {/* Decorative text around line */}
                        <span className="absolute top-[30%] left-[55%] text-[10px] tracking-widest text-gray-500 rotate-90 origin-left">EST. 2020</span>
                        <span className="absolute bottom-[30%] right-[55%] text-[10px] tracking-widest text-gray-500 -rotate-90 origin-right">EXPANSION</span>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
