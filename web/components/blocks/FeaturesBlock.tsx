'use client';
import { urlFor } from '@/lib/sanity';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';

interface Feature {
    icon: string;
    title: string;
    description: string;
}

interface FeaturesBlockProps {
    title: string;
    subtitle?: string;
    features: Feature[];
}

export default function FeaturesBlock({ title, subtitle, features }: FeaturesBlockProps) {
    return (
        <section className="py-24 px-6 bg-kp-cream">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    {subtitle && (
                        <span className="text-kp-gold uppercase tracking-[0.2em] text-sm font-bold block mb-4">
                            {subtitle}
                        </span>
                    )}
                    <h2 className="font-serif text-4xl md:text-5xl text-kp-green mb-6">{title}</h2>
                    <div className="h-1 w-24 bg-kp-gold mx-auto" />
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                    {features?.map((feature, index) => {
                        // Dynamic Icon Lookup
                        // @ts-ignore - We trust the Sanity string matches a Lucide icon
                        const IconComponent = Icons[feature.icon.charAt(0).toUpperCase() + feature.icon.slice(1)] || Icons.Star;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex flex-col items-center text-center group"
                            >
                                <div className="mb-6 p-4 rounded-full bg-kp-green/5 text-kp-green group-hover:bg-kp-green group-hover:text-white transition-colors duration-300">
                                    <IconComponent size={32} strokeWidth={1.5} />
                                </div>
                                <h3 className="font-serif text-2xl mb-3 text-kp-dark">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed max-w-sm">{feature.description}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
