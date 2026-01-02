'use client';
import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import BookingButton from './BookingButton';

interface StickyBarProps {
    phoneNumber: string;
    whatsappNumber: string;
}

export default function StickyBar({ phoneNumber, whatsappNumber }: StickyBarProps) {
    return (
        <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-kp-cream border-t border-kp-gold/30 shadow-2xl p-4 pb-6 md:hidden flex justify-between gap-4"
        >
            <a
                href={`tel:${phoneNumber}`}
                className="flex-1 bg-kp-green text-kp-cream py-3 rounded-none uppercase tracking-widest text-xs font-bold flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all"
            >
                <Phone size={16} />
                Call Desk
            </a>
            <BookingButton
                whatsappNumber={whatsappNumber}
                className="flex-1 bg-kp-gold text-kp-dark py-3 rounded-none uppercase tracking-widest text-xs font-bold flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all"
            >
                <MessageCircle size={16} />
                Check Dates
            </BookingButton>
        </motion.div>
    );
}
