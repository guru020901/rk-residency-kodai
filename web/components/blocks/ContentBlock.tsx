'use client';
import { urlFor } from '@/lib/sanity';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import BookingButton from '../BookingButton';

interface ContentBlockProps {
    layout: 'image-left' | 'image-right' | 'centered';
    title: string;
    content: any[];
    image?: any;
    ctaLabel?: string;
    ctaUrl?: string; // We might handle this differently, but keeping standard for now
    globalSettings?: any;
}

export default function ContentBlock({ layout, title, content, image, ctaLabel, globalSettings }: ContentBlockProps) {
    const isCentered = layout === 'centered';
    const isImageRight = layout === 'image-right';

    return (
        <section className="py-12 md:py-24 px-6 bg-white overflow-hidden">
            <div className={`max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-24 ${isCentered ? 'text-center' : ''}`}>

                {/* Image Side (Left) */}
                {!isCentered && !isImageRight && (
                    <div className="w-full md:w-1/2 relative h-[400px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                        {image && (
                            <Image
                                src={urlFor(image).width(800).url()}
                                alt={title}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-700"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        )}
                    </div>
                )}

                {/* Text Content */}
                <div className={`w-full ${isCentered ? 'max-w-4xl mx-auto' : 'md:w-1/2'}`}>
                    <h2 className="font-serif text-4xl md:text-5xl text-kp-green mb-8 leading-tight">{title}</h2>

                    <div className="prose prose-lg prose-headings:font-serif prose-a:text-kp-gold text-gray-600 mb-10">
                        <PortableText value={content} />
                    </div>

                    {ctaLabel && (
                        <BookingButton
                            whatsappNumber={globalSettings?.whatsappNumber || ''}
                            roomTitle={title} // Context for the inquiry
                            className="inline-block border-2 border-kp-dark text-kp-dark px-10 py-3 uppercase tracking-widest font-bold text-sm hover:bg-kp-dark hover:text-white transition-all duration-300"
                        >
                            {ctaLabel}
                        </BookingButton>
                    )}
                </div>

                {/* Image Side (Right) */}
                {!isCentered && isImageRight && (
                    <div className="w-full md:w-1/2 relative h-[400px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl order-first md:order-last">
                        {image && (
                            <Image
                                src={urlFor(image).width(800).url()}
                                alt={title}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-700"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        )}
                    </div>
                )}

            </div>
        </section>
    );
}
