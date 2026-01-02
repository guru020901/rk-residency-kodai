'use client';

import { urlFor } from '@/lib/sanity';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Users, BedDouble, Maximize, MapPin, Check, ArrowRight } from 'lucide-react';
import BookingButton from '../BookingButton';

interface Room {
    _id: string;
    title: string;
    price: number;
    originalPrice?: number;
    description: string;
    images: any[];
    dimensions?: string;
    floorLevel?: string;
    recommendedFor?: string;
    maxCapacity?: number;
}

interface VillaPricingBlockProps {
    title?: string;
    villaTitle: string;
    villaPrice: number;
    villaOriginalPrice?: number;
    villaCapacity: number;
    villaFeatures: string[];
    villaImage: any;
    rooms: Room[];
    globalSettings: any;
}

export default function VillaPricingBlock({
    title,
    villaTitle,
    villaPrice,
    villaOriginalPrice,
    villaCapacity,
    villaFeatures,
    villaImage,
    rooms,
    globalSettings
}: VillaPricingBlockProps) {



    return (
        <section className="py-20 pt-32 px-4 bg-kp-cream" id="pricing">
            <div className="max-w-7xl mx-auto">
                {/* Section Title */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-serif text-4xl md:text-5xl text-kp-green mb-4"
                    >
                        {title || "Our Accommodation Packages"}
                    </motion.h2>
                    <div className="w-24 h-1 bg-kp-gold mx-auto mb-6" />
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Whether you need the privacy of the entire villa for your group or just a cozy room for two, we have the perfect space for you.
                    </p>
                </div>

                {/* 1. WHOLE VILLA CARD (Premium) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative bg-white rounded-2xl overflow-hidden shadow-2xl border-2 border-kp-gold mb-16 group"
                >
                    {/* Badge */}
                    <div className="absolute top-0 right-0 bg-kp-gold text-kp-dark py-2 px-6 rounded-bl-xl font-bold uppercase tracking-wider z-20 shadow-lg">
                        Best Value for Groups
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-5">
                        {/* Image Side (Larger on Desktop) */}
                        <div className="relative h-64 lg:h-auto lg:col-span-3 overflow-hidden">
                            {villaImage ? (
                                <Image
                                    src={urlFor(villaImage).width(1200).url()}
                                    alt={villaTitle}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                                    <span className="font-serif italic">Villa Image Coming Soon</span>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:bg-gradient-to-r" />
                            <div className="absolute bottom-6 left-6 text-white lg:hidden">
                                <h3 className="font-serif text-3xl font-bold mb-1">{villaTitle}</h3>
                                <p className="opacity-90">{villaCapacity} Guests • Entire Property</p>
                            </div>
                        </div>

                        {/* Content Side */}
                        <div className="p-8 lg:p-10 lg:col-span-2 flex flex-col justify-center bg-gradient-to-br from-white to-kp-cream/50 relative z-10">
                            <div className="hidden lg:block mb-6">
                                <h3 className="font-serif text-3xl xl:text-4xl font-bold text-kp-green mb-2 leading-tight">{villaTitle}</h3>
                                <p className="text-gray-500 text-sm xl:text-base">Exclusive access to the entire 3-bedroom property.</p>
                            </div>

                            {/* Features Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-x-4 gap-y-3 mb-8">
                                {villaFeatures?.map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-gray-700 text-sm">
                                        <div className="bg-kp-green/10 p-1 rounded-full text-kp-green shrink-0">
                                            <Check size={14} strokeWidth={3} />
                                        </div>
                                        <span className="font-medium">{feature}</span>
                                    </div>
                                ))}
                                <div className="flex items-center gap-2 text-gray-700 text-sm">
                                    <div className="bg-kp-green/10 p-1 rounded-full text-kp-green shrink-0">
                                        <Users size={14} strokeWidth={3} />
                                    </div>
                                    <span className="font-medium">Up to {villaCapacity} Guests</span>
                                </div>
                            </div>

                            {/* Price & CTA */}
                            <div className="flex flex-col gap-4 pt-6 border-t border-gray-100">
                                <div>
                                    <p className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-1">Total Package Price</p>
                                    <div className="flex items-baseline gap-2 flex-wrap">
                                        {villaOriginalPrice && villaOriginalPrice > villaPrice && (
                                            <span className="text-red-500 line-through text-lg">₹{villaOriginalPrice}</span>
                                        )}
                                        <span className="text-3xl xl:text-4xl text-kp-green font-serif font-bold">₹{villaPrice}</span>
                                        <span className="text-gray-500 font-medium text-sm">/ Night</span>
                                    </div>
                                </div>
                                <BookingButton
                                    roomTitle={villaTitle + " (WHOLE VILLA)"}
                                    whatsappNumber={globalSettings?.whatsappNumber || ''}
                                    bookingType="villa"
                                    className="bg-kp-green text-white px-6 py-4 rounded-lg font-bold uppercase tracking-widest hover:bg-kp-dark transition-all shadow-lg hover:shadow-xl w-full flex items-center justify-center gap-2 text-sm"
                                >
                                    Book Villa Now <ArrowRight size={18} />
                                </BookingButton>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* 2. INDIVIDUAL ROOMS GRID */}
                <div className="relative">
                    <h3 className="text-xl font-serif text-center text-kp-green mb-8 opacity-80 flex items-center justify-center gap-4">
                        <span className="h-px w-12 bg-kp-green/30" />
                        OR BOOK INDIVIDUALLY
                        <span className="h-px w-12 bg-kp-green/30" />
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {rooms?.filter(room => room && room._id)?.map((room, index) => (
                            <motion.div
                                key={room._id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-100 flex flex-col h-full"
                            >
                                {/* Room Image */}
                                <div className="relative h-48 bg-gray-100 group">
                                    {room.images?.[0] ? (
                                        <Image
                                            src={urlFor(room.images[0]).width(600).url()}
                                            alt={room.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full text-gray-400 bg-gray-50">
                                            <BedDouble size={32} className="opacity-20 mb-2" />
                                            <span className="text-xs uppercase tracking-widest opacity-50">No Image</span>
                                        </div>
                                    )}
                                    {/* Tag */}
                                    {room.recommendedFor && (
                                        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-kp-dark shadow-sm border border-gray-100">
                                            {room.recommendedFor}
                                        </div>
                                    )}
                                </div>

                                {/* Room Details */}
                                <div className="p-5 flex flex-col flex-grow">
                                    <h4 className="font-serif text-xl text-kp-green mb-1">{room.title}</h4>

                                    {/* Meta Grid */}
                                    <div className="grid grid-cols-2 gap-y-2 gap-x-2 text-xs text-gray-500 mb-4 mt-2">
                                        <div className="flex items-center gap-1.5">
                                            <MapPin size={14} className="text-kp-gold" />
                                            <span>{room.floorLevel || 'Standard'}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Maximize size={14} className="text-kp-gold" />
                                            <span>{room.dimensions || 'Standard'}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Users size={14} className="text-kp-gold" />
                                            <span>Max {room.maxCapacity || 2}</span>
                                        </div>
                                    </div>

                                    <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
                                        <div>
                                            {room.originalPrice && room.originalPrice > room.price && (
                                                <span className="text-xs text-red-500 line-through block">₹{room.originalPrice}</span>
                                            )}
                                            {room.price ? (
                                                <span className="text-lg font-bold text-kp-green">₹{room.price}</span>
                                            ) : (
                                                <span className="text-xs font-bold text-gray-400">Rates N/A</span>
                                            )}
                                        </div>
                                        <BookingButton
                                            roomTitle={room.title}
                                            whatsappNumber={globalSettings?.whatsappNumber || ''}
                                            className="text-kp-gold font-bold uppercase text-[10px] tracking-widest hover:text-kp-dark transition-colors flex items-center gap-1 bg-kp-gold/10 px-3 py-2 rounded-full hover:bg-kp-gold/20"
                                        >
                                            Book <ArrowRight size={14} />
                                        </BookingButton>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
