'use client';
import { urlFor } from '@/lib/sanity';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import BookingButton from '../BookingButton';
import { useState, useEffect } from 'react';

interface HeroBlockProps {
    title: string;
    subtitle?: string;
    backgroundImage?: any;
    backgroundImages?: any[];
    backgroundVideo?: string;
    globalSettings?: any;
}

export default function HeroBlock(props: HeroBlockProps) {
    const { title, subtitle, backgroundImage, backgroundImages, backgroundVideo } = props;

    // Slideshow Logic
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = backgroundImages || (backgroundImage ? [backgroundImage] : []);
    const hasSlideshow = slides.length > 1;

    useEffect(() => {
        if (!hasSlideshow) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000); // 5 seconds per slide
        return () => clearInterval(timer);
    }, [hasSlideshow, slides.length]);

    return (
        <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            {/* Background Layer */}
            <div className="absolute inset-0 z-0 bg-kp-green">
                {backgroundVideo ? (
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster={slides[0] ? urlFor(slides[0]).width(1920).format('webp').url() : undefined}
                        className="w-full h-full object-cover opacity-80"
                    >
                        <source src={backgroundVideo} type="video/mp4" />
                    </video>
                ) : (
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="absolute inset-0"
                        >
                            {slides[currentSlide] && (
                                <Image
                                    src={urlFor(slides[currentSlide]).width(1920).url()}
                                    alt={title}
                                    fill
                                    className="object-cover"
                                    priority={currentSlide === 0}
                                    sizes="100vw"
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>
                )}

                {/* Gradient Overlay for better text contrast */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
            </div>

            {/* Content Layer */}
            <div className="relative z-10 text-center text-kp-cream max-w-4xl px-4">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="uppercase tracking-[0.3em] text-sm md:text-base mb-4 text-kp-gold"
                >
                    {subtitle || "Welcome to Paradise"}
                </motion.p>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6 drop-shadow-lg"
                >
                    {title}
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.5 }}
                >
                    <BookingButton
                        roomTitle="General Inquiry"
                        whatsappNumber={(props as any).globalSettings?.whatsappNumber || ''}
                        className="inline-block bg-kp-gold text-kp-dark px-8 py-3 uppercase tracking-widest text-sm font-bold hover:bg-white transition-colors shadow-lg"
                    >
                        Check Availability
                    </BookingButton>
                </motion.div>
            </div>
        </section>
    );
}
