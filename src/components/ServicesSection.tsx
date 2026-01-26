"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const services = [
    {
        title: "Pre-Production",
        description: "Concept development, scriptwriting, and storyboarding to lay a solid foundation.",
        image: "https://images.unsplash.com/photo-1598899134739-9609c96191b0?q=80&w=600&auto=format&fit=crop"
    },
    {
        title: "Production",
        description: "High-end filming with state-of-the-art equipment and experienced crews.",
        image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=600&auto=format&fit=crop"
    },
    {
        title: "Post-Production",
        description: "Editing, VFX, color grading, and sound design to bring the vision to life.",
        image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44e?q=80&w=600&auto=format&fit=crop"
    }
];

const features = [
    { icon: "🎥", title: "Cinema", desc: "Feature-film quality production values." },
    { icon: "⚡", title: "Fast Turnaround", desc: "Efficient workflows without compromising quality." },
    { icon: "🎨", title: "Visual Arts", desc: "Creative direction that pushes boundaries." }
];

const ServicesSection = () => {
    return (
        <section className="min-h-screen bg-black text-white py-24 px-8 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-900/10 rounded-full blur-[120px]" />

            <div className="max-w-7xl mx-auto flex flex-col gap-24 relative z-10">

                {/* Main Services Grid */}
                <div className="flex flex-col items-center gap-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-bold uppercase tracking-tighter"
                    >
                        Services
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                        {services.map((service, index) => (
                            <ServiceCard key={index} service={service} index={index} />
                        ))}
                    </div>
                </div>

                {/* Features Row */}
                <div className="flex flex-col items-center gap-12">
                    <h3 className="text-3xl font-bold uppercase tracking-tight text-gray-400">Why Choose Us</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="p-8 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm flex flex-col items-center text-center gap-4 hover:bg-white/10 transition-colors"
                            >
                                <span className="text-4xl mb-2">{feature.icon}</span>
                                <h4 className="text-xl font-bold text-orange-500">{feature.title}</h4>
                                <p className="text-gray-400 text-sm">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

const ServiceCard = ({ service, index }: { service: any, index: number }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative h-[400px] rounded-2xl overflow-hidden cursor-pointer group"
        >
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${service.image})` }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 p-8 w-full transform transition-transform duration-500 group-hover:-translate-y-4">
                <h3 className="text-3xl font-bold uppercase mb-2 group-hover:text-orange-500 transition-colors">{service.title}</h3>
                <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                    {service.description}
                </p>
                <div className="w-12 h-1 bg-orange-500 mt-4 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
            </div>
        </motion.div>
    )
}

export default ServicesSection;
