'use client';
import { urlFor } from '@/lib/sanity';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { motion } from 'framer-motion';

interface Stat {
    value: string;
    label: string;
    _key: string;
}

interface AboutBlockProps {
    title: string;
    subtitle?: string;
    description?: any[];
    stats?: Stat[];
    founderQuote?: string;
    founderName?: string;
    mainImage?: any;
    secondaryImages?: any[];
}

export default function AboutBlock({
    title,
    subtitle,
    description,
    stats,
    founderQuote,
    founderName,
    mainImage,
    secondaryImages
}: AboutBlockProps) {

    return (
        <section className="py-12 md:py-24 px-6 bg-white overflow-hidden" id="about">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                {/* 1. VISUAL SIDE (Left) */}
                <div className="relative">
                    {/* Main Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl z-10"
                    >
                        {mainImage ? (
                            <Image
                                src={urlFor(mainImage).width(800).height(1000).url()}
                                alt={title}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 font-serif">
                                Main Image
                            </div>
                        )}

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </motion.div>

                    {/* Secondary Image (Collage Effect) */}
                    {secondaryImages && secondaryImages[0] && (
                        <motion.div
                            initial={{ opacity: 0, y: 40, x: -40 }}
                            whileInView={{ opacity: 1, y: 0, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="absolute -bottom-10 -left-10 w-48 h-48 md:w-64 md:h-64 rounded-xl overflow-hidden shadow-xl border-4 border-white z-20 hidden md:block"
                        >
                            <Image
                                src={urlFor(secondaryImages[0]).width(400).url()}
                                alt="Detail"
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                    )}

                    {/* Stats Card (Floating) */}
                    {stats && stats.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="absolute -top-6 -right-6 md:top-10 md:-right-10 bg-kp-green text-white p-6 rounded-xl shadow-xl z-30 max-w-[200px]"
                        >
                            <div className="flex flex-col gap-4">
                                {stats.map((stat, idx) => (
                                    <div key={stat._key || idx} className={idx !== 0 ? "pt-4 border-t border-white/20" : ""}>
                                        <div className="text-3xl font-serif font-bold text-kp-gold">{stat.value}</div>
                                        <div className="text-xs uppercase tracking-widest opacity-80">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* 2. CONTENT SIDE (Right) */}
                <div>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        {subtitle && <p className="text-kp-gold font-bold uppercase tracking-widest text-sm mb-4">{subtitle}</p>}

                        <h2 className="font-serif text-4xl md:text-5xl text-kp-green mb-8 leading-tight">{title}</h2>

                        {description && (
                            <div className="prose prose-lg text-gray-600 mb-10 font-sans leading-relaxed">
                                <PortableText value={description} />
                            </div>
                        )}

                        {/* Founder Quote */}
                        {founderQuote && (
                            <div className="border-l-4 border-kp-gold pl-6 py-2 italic text-gray-500 bg-gray-50 rounded-r-lg">
                                <p className="text-lg mb-2">"{founderQuote}"</p>
                                {founderName && (
                                    <cite className="block not-italic text-sm font-bold text-kp-dark tracking-wide">— {founderName}</cite>
                                )}
                            </div>
                        )}
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
