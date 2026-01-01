'use client';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Review {
    guestName: string;
    rating: number;
    comment: string;
    location?: string;
}

interface TestimonialBlockProps {
    title: string;
    reviews: Review[];
}

export default function TestimonialBlock({ title, reviews }: TestimonialBlockProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-advance
    useEffect(() => {
        if (!reviews || reviews.length === 0) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % reviews.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [reviews]);

    if (!reviews || reviews.length === 0) return null;

    return (
        <section className="py-24 bg-kp-green text-white relative overflow-hidden">
            {/* Decorative Background Pattern */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <Quote size={400} className="absolute -top-20 -left-20 rotate-12" />
            </div>

            <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                <h2 className="font-serif text-3xl md:text-4xl mb-16 text-kp-gold">{title}</h2>

                <div className="relative min-h-[300px] flex items-center justify-center">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center"
                    >
                        {/* Stars */}
                        <div className="flex gap-1 mb-8 text-kp-gold">
                            {[...Array(reviews[currentIndex].rating || 5)].map((_, i) => (
                                <Star key={i} fill="currentColor" size={24} />
                            ))}
                        </div>

                        {/* Quote */}
                        <p className="font-serif text-2xl md:text-4xl leading-relaxed mb-10 italic opacity-90">
                            "{reviews[currentIndex].comment}"
                        </p>

                        {/* Author */}
                        <div>
                            <p className="font-bold text-lg tracking-wide uppercase">{reviews[currentIndex].guestName}</p>
                            {reviews[currentIndex].location && (
                                <p className="text-kp-gold/80 text-sm mt-1">{reviews[currentIndex].location}</p>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Indicators */}
                <div className="flex justify-center gap-3 mt-12">
                    {reviews.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-kp-gold' : 'w-2 bg-white/30 hover:bg-white/50'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
