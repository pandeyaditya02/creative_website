"use client";
import React from "react";
import { motion } from "framer-motion";

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
    return (
        <section className="min-h-screen bg-black text-white py-24 px-8 relative">

            <div className="max-w-7xl mx-auto flex flex-col gap-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center text-center gap-4"
                >
                    <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter">Portfolio / Showreels</h2>
                    <p className="text-gray-400 max-w-lg">
                        A curated selection of our best work, showcasing our versatility and passion for storytelling.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {portfolios.map((item, index) => (
                        <PortfolioCard key={index} item={item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const PortfolioCard = ({ item, index }: { item: any, index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="group relative h-[250px] md:h-[300px] rounded-2xl overflow-hidden bg-gray-900 border border-white/10 cursor-pointer"
        >
            {/* Image */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
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
                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-orange-500 transition-colors">{item.title}</h3>
                        <p className="text-xs text-gray-400 uppercase tracking-widest">{item.category}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                        <span>👁 {item.views}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default PortfolioSection;
