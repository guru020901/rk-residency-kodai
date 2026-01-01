'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

interface MobileMenuProps {
    navItems: any[];
}

export default function MobileMenu({ navItems }: MobileMenuProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="md:hidden">
            {/* Hamburger Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 text-white hover:text-kp-gold transition-colors z-[60] relative"
                aria-label="Open Menu"
            >
                <Menu size={32} strokeWidth={1.5} />
            </button>

            {/* Overlay Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: "tween", duration: 0.4 }}
                        className="fixed inset-0 z-[100] bg-kp-green text-white flex flex-col items-center justify-center"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-8 right-8 p-2 text-white/70 hover:text-white transition-colors"
                        >
                            <X size={40} strokeWidth={1} />
                        </button>

                        {/* Nav Items */}
                        <nav className="flex flex-col gap-8 text-center font-serif text-3xl">
                            {navItems?.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + idx * 0.1 }}
                                >
                                    <Link
                                        href={item.url || '#'}
                                        onClick={() => setIsOpen(false)} // Close on click
                                        className="hover:text-kp-gold transition-colors block py-2"
                                    >
                                        {item.label}
                                    </Link>
                                </motion.div>
                            ))}
                            <div className='w-12 h-1 bg-kp-gold mx-auto mt-8 opacity-50' />
                        </nav>

                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
