"use client";
import React from "react";
import { motion } from "framer-motion";

const ContactSection = () => {
    return (
        <section className="relative min-h-[80vh] bg-black text-white py-24 px-8 overflow-hidden block">
            {/* Footer / Map Background */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

            <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center gap-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-6xl md:text-8xl font-bold uppercase tracking-tighter text-center"
                >
                    Contact
                </motion.h2>

                <motion.form
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="w-full bg-white/5 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-3xl flex flex-col gap-6"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input
                            type="text"
                            placeholder="Name"
                            className="bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                        />
                    </div>
                    <textarea
                        rows={4}
                        placeholder="Message"
                        className="bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                    />
                    <button className="bg-orange-600 text-white font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-orange-500 transition-colors shadow-lg shadow-orange-900/50">
                        Send Message
                    </button>
                </motion.form>

                <div className="flex gap-8 text-gray-500 text-sm uppercase tracking-widest">
                    <a href="#" className="hover:text-white transition-colors">Instagram</a>
                    <a href="#" className="hover:text-white transition-colors">Twitter</a>
                    <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                </div>

                <div className="text-gray-600 text-xs mt-8">
                    © 2026 CreativeChauk. All rights reserved.
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
