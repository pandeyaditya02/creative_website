"use client";
import React from "react";
import { motion } from "framer-motion";

const articles = [
    {
        title: "Behind the Scenes",
        category: "Production",
        image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=600&auto=format&fit=crop"
    },
    {
        title: "The Art of Color",
        category: "Post-Production",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop"
    }
];

const FeaturedSection = () => {
    return (
        <section className="min-h-screen bg-[#2D3E50] text-white py-24 px-8 relative overflow-hidden">
            {/* Background */}
            <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-red-900/10 rounded-full blur-[128px]" />

            <div className="max-w-7xl mx-auto flex flex-col gap-24 relative z-10">

                {/* Featured Video */}
                <div className="flex flex-col items-center gap-12">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="text-5xl md:text-7xl font-bold uppercase tracking-tighter text-[#F67963]"
                    >
                        Featured
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="w-full aspect-video rounded-3xl overflow-hidden border border-white/10 bg-gray-900 relative shadow-2xl"
                    >
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 rounded-full bg-[#e26954] flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-white border-b-[10px] border-b-transparent ml-1" />
                            </div>
                        </div>
                        {/* Placeholder for video content */}
                        <img src="https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover opacity-50" alt="Featured Video" />

                        {/* Video Controls Bar Mockup */}
                        <div className="absolute bottom-8 left-8 right-8 h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div className="w-1/3 h-full bg-[#e26954]" />
                        </div>
                    </motion.div>
                </div>

                {/* Articles / "Actured" */}
                <div className="flex flex-col items-center gap-12">
                    <h3 className="text-3xl font-bold uppercase tracking-tight text-gray-400">Latest Updates</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
                        {articles.map((article, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1.5, delay: index * 0.3, ease: "easeOut" }}
                                className="flex gap-6 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group"
                            >
                                <div className="w-32 h-24 rounded-lg overflow-hidden shrink-0">
                                    <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <span className="text-xs text-[#F67963] uppercase tracking-widest mb-2">{article.category}</span>
                                    <h4 className="text-xl font-bold group-hover:text-[#F67963] transition-colors">{article.title}</h4>
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
