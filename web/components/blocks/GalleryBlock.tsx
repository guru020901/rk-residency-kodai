'use client';
import { urlFor } from '@/lib/sanity';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface GalleryBlockProps {
    title?: string;
    images?: any[];
}

export default function GalleryBlock({ title, images }: GalleryBlockProps) {
    if (!images || images.length === 0) return null;

    return (
        <section className="py-20 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
                {title && (
                    <div className="text-center mb-12">
                        <h2 className="font-serif text-4xl text-kp-green mb-4">{title}</h2>
                        <div className="h-1 w-24 bg-kp-gold mx-auto" />
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((image, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="relative aspect-square overflow-hidden rounded-lg shadow-md group border-b-4 border-transparent hover:border-kp-gold transition-all"
                        >
                            <Image
                                src={urlFor(image).width(800).height(800).url()}
                                alt={image.alt || `Gallery Image ${idx + 1}`}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                            {/* Overlay on Hover */}
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
