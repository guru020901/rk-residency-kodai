'use client';

import { MapPin, Phone, MessageCircle } from 'lucide-react';

interface ContactBlockProps {
    showMap?: boolean;
    globalSettings?: any;
}

export default function ContactBlock({ showMap, globalSettings }: ContactBlockProps) {
    const settings = globalSettings || {};

    return (
        <section className="py-20 px-4 bg-white">
            <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-gray-50 p-8 md:p-12 rounded-xl shadow-lg border border-gray-100">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <h2 className="font-serif text-3xl text-kp-green mb-6">Get in Touch</h2>

                        {settings.address && (
                            <div className="flex items-start gap-4">
                                <div className="bg-kp-green/10 p-3 rounded-full text-kp-green shrink-0">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">Address</h3>
                                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">{settings.address}</p>
                                </div>
                            </div>
                        )}

                        {settings.phoneNumber && (
                            <div className="flex items-start gap-4">
                                <div className="bg-kp-green/10 p-3 rounded-full text-kp-green shrink-0">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">Phone</h3>
                                    <a href={`tel:${settings.phoneNumber}`} className="text-gray-600 hover:text-kp-gold transition-colors block">
                                        {settings.phoneNumber}
                                    </a>
                                </div>
                            </div>
                        )}

                        {settings.whatsappNumber && (
                            <div className="flex items-start gap-4">
                                <div className="bg-kp-green/10 p-3 rounded-full text-kp-green shrink-0">
                                    <MessageCircle size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">WhatsApp</h3>
                                    <a
                                        href={`https://wa.me/${settings.whatsappNumber}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-600 hover:text-kp-gold transition-colors block"
                                    >
                                        Chat with Concierge
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Simple Form / Call to Action */}
                    <div className="flex flex-col justify-center">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
                            <h3 className="font-serif text-xl text-kp-dark mb-4">Direct Inquiry</h3>
                            <p className="text-gray-500 mb-6 text-sm">
                                Use WhatsApp for instant availability checks and booking confirmations.
                            </p>
                            {settings.whatsappNumber && (
                                <a
                                    href={`https://wa.me/${settings.whatsappNumber}?text=Hi, I would like to make an inquiry.`}
                                    className="block w-full bg-kp-green text-white text-center py-3 rounded uppercase tracking-widest text-sm font-bold hover:bg-kp-dark transition-colors"
                                >
                                    Open WhatsApp
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Optional: Add Map Embed logic here if showMap is true */}
            </div>
        </section>
    );
}
