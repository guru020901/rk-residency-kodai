'use client';
import { createPortal } from 'react-dom';
import React, { useEffect, useState } from 'react';
import { DayPicker, DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { X, Calendar as CalendarIcon, User, Minus, Plus, ChevronLeft, Phone, Mail, User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import "react-day-picker/dist/style.css";

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    roomTitle?: string;
    whatsappNumber: string;
}

export default function BookingModal({ isOpen, onClose, roomTitle, whatsappNumber }: BookingModalProps) {
    const [range, setRange] = useState<DateRange | undefined>();
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [mounted, setMounted] = useState(false);

    // Wizard State
    const [step, setStep] = useState<1 | 2>(1);
    const [guestDetails, setGuestDetails] = useState({
        name: '',
        mobile: '',
        email: ''
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    // Reset state on open
    useEffect(() => {
        if (isOpen) {
            setStep(1);
        }
    }, [isOpen]);

    const handleWhatsappRedirect = () => {
        if (!range?.from || !range?.to || !guestDetails.name) return;

        const startDate = format(range.from, 'dd MMM yyyy');
        const endDate = format(range.to, 'dd MMM yyyy');

        const message = `*BOOKING INQUIRY*
--------------------------------
*Room:* ${roomTitle || 'General Stay'}
*Check-in:* ${startDate}
*Check-out:* ${endDate}
*Guests:* ${adults} Adults, ${children} Children

*GUEST DETAILS*
Name: ${guestDetails.name}
Mobile: ${guestDetails.mobile}
Email: ${guestDetails.email}
--------------------------------
Please confirm availability and rates for these dates.`;

        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
        onClose();
    };

    // Prevent hydration mismatch or server rendering
    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 font-sans">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="relative bg-white w-full max-w-xl rounded-xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
                    >
                        {/* Header */}
                        <div className="bg-kp-green text-kp-cream p-6 flex justify-between items-center shrink-0">
                            <div className='flex items-center gap-3'>
                                {step === 2 && (
                                    <button onClick={() => setStep(1)} className="hover:bg-white/10 rounded-full p-1 transition-colors">
                                        <ChevronLeft size={20} />
                                    </button>
                                )}
                                <div>
                                    <h2 className="font-serif text-2xl">Book Your Stay</h2>
                                    <p className="text-sm opacity-80">
                                        {step === 1 ? (roomTitle || "Select Dates & Guests") : "Guest Information"}
                                    </p>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto">
                            {step === 1 ? (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                >
                                    {/* Date Selection Visuals */}
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className={`p-3 border rounded-lg ${!range?.from ? 'border-kp-gold bg-kp-gold/10' : 'border-gray-200'}`}>
                                            <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Check-in</span>
                                            <span className={`block font-serif text-lg ${range?.from ? 'text-kp-dark' : 'text-gray-400'}`}>
                                                {range?.from ? format(range.from, 'dd MMM') : 'Select Date'}
                                            </span>
                                        </div>
                                        <div className={`p-3 border rounded-lg ${range?.from && !range?.to ? 'border-kp-gold bg-kp-gold/10' : 'border-gray-200'}`}>
                                            <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Check-out</span>
                                            <span className={`block font-serif text-lg ${range?.to ? 'text-kp-dark' : 'text-gray-400'}`}>
                                                {range?.to ? format(range.to, 'dd MMM') : 'Select Date'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Date Picker */}
                                    <div className="mb-8">
                                        <div className="flex justify-center border rounded-lg p-4 bg-kp-gray/30 overflow-hidden relative">
                                            {/* Helper Text */}
                                            {!range?.from && (
                                                <div className="absolute top-2 left-0 right-0 text-center text-xs text-kp-green animate-pulse pointer-events-none z-10 font-bold">
                                                    Start by picking a Check-in Date
                                                </div>
                                            )}
                                            {range?.from && !range?.to && (
                                                <div className="absolute top-2 left-0 right-0 text-center text-xs text-kp-gold animate-pulse pointer-events-none z-10 font-bold">
                                                    Now pick a Check-out Date
                                                </div>
                                            )}

                                            <DayPicker
                                                mode="range"
                                                selected={range}
                                                onSelect={setRange}
                                                numberOfMonths={1}
                                                className="m-0"
                                                modifiersClassNames={{
                                                    selected: 'bg-kp-green text-white',
                                                    today: 'font-bold text-kp-gold',
                                                    range_start: 'bg-kp-gold text-white rounded-l-md',
                                                    range_end: 'bg-kp-gold text-white rounded-r-md',
                                                    range_middle: 'bg-kp-green/20 text-kp-dark'
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Guests */}
                                    <div className="mb-8">
                                        <label className="block text-xs font-bold uppercase tracking-widest text-kp-gold mb-4 flex items-center gap-2">
                                            <User size={16} /> Guests
                                        </label>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="border p-4 rounded-lg flex flex-col items-center">
                                                <span className="text-sm text-gray-800 font-bold mb-2">Adults</span>
                                                <div className="flex items-center gap-4">
                                                    <button onClick={() => setAdults(Math.max(1, adults - 1))} className="p-2 bg-gray-200 rounded hover:bg-gray-300 text-black"><Minus size={16} /></button>
                                                    <span className="font-bold text-xl w-6 text-center text-black">{adults}</span>
                                                    <button onClick={() => setAdults(adults + 1)} className="p-2 bg-gray-200 rounded hover:bg-gray-300 text-black"><Plus size={16} /></button>
                                                </div>
                                            </div>

                                            <div className="border p-4 rounded-lg flex flex-col items-center">
                                                <span className="text-sm text-gray-800 font-bold mb-2">Children</span>
                                                <div className="flex items-center gap-4">
                                                    <button onClick={() => setChildren(Math.max(0, children - 1))} className="p-2 bg-gray-200 rounded hover:bg-gray-300 text-black"><Minus size={16} /></button>
                                                    <span className="font-bold text-xl w-6 text-center text-black">{children}</span>
                                                    <button onClick={() => setChildren(children + 1)} className="p-2 bg-gray-200 rounded hover:bg-gray-300 text-black"><Plus size={16} /></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setStep(2)}
                                        disabled={!range?.from || !range?.to}
                                        className="w-full bg-kp-green text-white py-4 font-bold uppercase tracking-widest hover:bg-kp-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
                                    >
                                        {range?.from && range?.to ? "Next: Guest Details" : "Select Check-in & Check-out"}
                                    </button>

                                    {/* Policy Hint */}
                                    <div className="text-center text-xs text-gray-400 mt-4 flex justify-center gap-4">
                                        <span>Check-in: 1:00 PM</span>
                                        <span>•</span>
                                        <span>Check-out: 11:00 AM</span>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-kp-gold mb-2 flex items-center gap-2">
                                            <UserIcon size={16} /> Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={guestDetails.name}
                                            onChange={(e) => setGuestDetails({ ...guestDetails, name: e.target.value })}
                                            placeholder="John Doe"
                                            className="w-full p-4 border rounded-lg focus:outline-none focus:border-kp-gold bg-kp-gray/20"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-kp-gold mb-2 flex items-center gap-2">
                                            <Phone size={16} /> Mobile Number *
                                        </label>
                                        <input
                                            type="tel"
                                            value={guestDetails.mobile}
                                            onChange={(e) => setGuestDetails({ ...guestDetails, mobile: e.target.value })}
                                            placeholder="+91 98765 43210"
                                            className="w-full p-4 border rounded-lg focus:outline-none focus:border-kp-gold bg-kp-gray/20"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-kp-gold mb-2 flex items-center gap-2">
                                            <Mail size={16} /> Email Address (Optional)
                                        </label>
                                        <input
                                            type="email"
                                            value={guestDetails.email}
                                            onChange={(e) => setGuestDetails({ ...guestDetails, email: e.target.value })}
                                            placeholder="john@example.com"
                                            className="w-full p-4 border rounded-lg focus:outline-none focus:border-kp-gold bg-kp-gray/20"
                                        />
                                    </div>

                                    <div className="pt-4">
                                        <button
                                            onClick={handleWhatsappRedirect}
                                            disabled={!guestDetails.name || !guestDetails.mobile}
                                            className="w-full bg-kp-gold text-kp-dark py-4 font-bold uppercase tracking-widest hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-lg"
                                        >
                                            Book on WhatsApp
                                        </button>
                                        <p className="text-center text-xs text-gray-500 mt-4">
                                            You will be redirected to WhatsApp to confirm your inquiry with our concierge.
                                        </p>
                                    </div>
                                </motion.div>
                            )}

                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}
