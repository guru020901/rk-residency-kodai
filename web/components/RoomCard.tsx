'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Image as ImageIcon, Wifi, Coffee, Mountain, Waves, Mic, Heater, Tv, BedDouble } from 'lucide-react';
import BookingButton from './BookingButton';
import { urlFor } from '@/lib/sanity';

// Icon Map
const AMENITY_ICONS: Record<string, any> = {
    wifi: Wifi,
    king_bed: BedDouble,
    mountain_view: Mountain,
    private_pool: Waves,
    intercom: Mic,
    heater: Heater,
    kettle: Coffee,
    tv: Tv,
};

interface RoomCardProps {
    room: {
        _id: string;
        title: string;
        price: number;
        originalPrice?: number;
        description: string;
        images: any[];
        amenities?: string[];
    };
    globalSettings: any;
}

export default function RoomCard({ room, globalSettings }: RoomCardProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const images = room.images || [];
    const hasMultipleImages = images.length > 1;

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="bg-white shadow-lg overflow-hidden border-b-4 border-kp-gold translate-y-0 hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full">
            {/* Image Carousel */}
            <div className="relative h-64 bg-gray-100 group">
                {images.length > 0 ? (
                    <div className="relative w-full h-full">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentImageIndex}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={1}
                                onDragEnd={(e, { offset, velocity }) => {
                                    const swipe = offset.x; // +ve is right, -ve is left
                                    if (swipe < -100) nextImage();
                                    else if (swipe > 100) prevImage();
                                }}
                                className="absolute inset-0 cursor-grab active:cursor-grabbing"
                            >
                                <Image
                                    src={urlFor(images[currentImageIndex]).width(600).height(400).url()}
                                    alt={`${room.title} - Image ${currentImageIndex + 1}`}
                                    fill
                                    className="object-cover pointer-events-none" // prevent image drag ghosting
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Arrows */}
                        {hasMultipleImages && (
                            <>
                                <button
                                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full transition-opacity hover:bg-black/70 z-10"
                                    aria-label="Previous image"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full transition-opacity hover:bg-black/70 z-10"
                                    aria-label="Next image"
                                >
                                    <ChevronRight size={20} />
                                </button>

                                {/* Dots Indicator */}
                                <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-1.5 p-2">
                                    {images.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setCurrentImageIndex(idx)}
                                            className={`w-1.5 h-1.5 rounded-full shadow-sm transition-all ${idx === currentImageIndex ? 'bg-white w-3' : 'bg-white/50 hover:bg-white/80'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <div className="text-center">
                            <ImageIcon size={32} className="mx-auto mb-2 opacity-50" />
                            <span className="text-sm">No Images</span>
                        </div>
                    </div>
                )}

                {/* Price Tag */}
                <div className="absolute bottom-4 right-4 z-10 flex flex-col items-end">
                    {room.originalPrice && room.originalPrice > room.price && (
                        <span className="text-white/90 text-sm line-through drop-shadow-md font-sans bg-red-600 px-2 rounded-sm mb-1">
                            ₹{room.originalPrice}
                        </span>
                    )}
                    <div className="bg-kp-gold text-kp-dark px-4 py-2 font-bold font-serif shadow-lg flex items-baseline gap-1">
                        <span className="text-xl">₹{room.price}</span>
                        <span className="text-[10px] uppercase opacity-80 font-sans tracking-wide">/ Night</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-serif mb-2 text-kp-green">{room.title}</h3>

                {/* Amenities */}
                {room.amenities && room.amenities.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {room.amenities.map((amenity, idx) => {
                            const Icon = AMENITY_ICONS[amenity] || Wifi; // Fallback
                            const label = amenity.replace('_', ' '); // simple formatting
                            return (
                                <div key={idx} className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full uppercase tracking-wider" title={label}>
                                    <Icon size={12} />
                                    <span>{label}</span>
                                </div>
                            );
                        })}
                    </div>
                )}

                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{room.description}</p>
                <BookingButton
                    roomTitle={room.title}
                    whatsappNumber={globalSettings?.whatsappNumber || ''}
                    className="block w-full text-center border border-kp-green text-kp-green py-2 uppercase text-xs tracking-widest hover:bg-kp-green hover:text-white transition-colors mt-auto"
                >
                    Book on WhatsApp
                </BookingButton>
            </div>
        </div>
    );
}
