"use client";
import React from "react";
import { motion } from "framer-motion";

const articles = [
    {
        title: "Crafting the Hamdard Campaign",
        category: "Brand Film",
        image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=600&auto=format&fit=crop"
    },
    {
        title: "The Harley Davidson Story",
        category: "Automotive",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop"
    }
];

const FeaturedSection = () => {
    return (
        <section className="min-h-screen bg-black text-white py-16 px-6 sm:px-8 relative overflow-hidden">
            {/* Background */}
            <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-[#F67963]/5 rounded-full blur-[200px]" />

            <div className="max-w-7xl mx-auto flex flex-col gap-16 relative z-10">

                {/* Featured Video */}
                <div className="flex flex-col items-center gap-16">
                    <div className="text-center space-y-4">
                        <span className="text-xs uppercase tracking-[0.3em] text-[#A1A1A1]">Watch now</span>
                        <motion.h2
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tighter text-white"
                        >
                            Featured
                        </motion.h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                        className="w-full aspect-video rounded-3xl overflow-hidden border border-white/10 bg-black relative shadow-2xl group"
                    >
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                            <div className="relative">
                                <div className="absolute inset-0 w-24 h-24 rounded-full bg-[#F67963]/30 animate-ping" />
                                <div className="w-24 h-24 rounded-full bg-[#F67963] flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300 relative z-10 shadow-[0_0_40px_rgba(246,121,99,0.4)]">
                                    <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[24px] border-l-white border-b-[12px] border-b-transparent ml-2" />
                                </div>
                            </div>
                        </div>
                        {/* Video Thumbnail */}
                        <img src="https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-500" alt="Featured Video" />

                        {/* Video Controls Bar */}
                        <div className="absolute bottom-8 left-8 right-8 h-1 bg-white/20 rounded-full overflow-hidden">
                            <div className="w-1/3 h-full bg-gradient-to-r from-[#F67963] to-[#e26954] rounded-full" />
                        </div>
                    </motion.div>
                </div>

                {/* Articles */}
                <div className="flex flex-col items-center gap-12">
                    <span className="text-xs uppercase tracking-[0.3em] text-[#A1A1A1]">Latest updates</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                        {articles.map((article, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1.2, delay: 0.4 + index * 0.2, ease: "easeOut" }}
                                className="flex gap-6 p-6 rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 hover:border-[#F67963]/30 transition-all duration-500 cursor-pointer group"
                            >
                                <div className="w-32 h-28 rounded-2xl overflow-hidden shrink-0">
                                    <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <span className="text-[10px] text-[#F67963] uppercase tracking-[0.2em] mb-3">{article.category}</span>
                                    <h4 className="text-xl font-bold text-white group-hover:text-[#F67963] transition-colors duration-300">{article.title}</h4>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default FeaturedSection;
