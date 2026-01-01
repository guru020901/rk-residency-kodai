'use client';
import React, { useState } from 'react';
import BookingModal from './BookingModal';

interface BookingButtonProps {
    roomTitle?: string;
    whatsappNumber: string;
    className?: string;
    children: React.ReactNode;
}

export default function BookingButton({ roomTitle, whatsappNumber, className, children }: BookingButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className={className}
            >
                {children}
            </button>
            <BookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                roomTitle={roomTitle}
                whatsappNumber={whatsappNumber}
            />
        </>
    );
}
