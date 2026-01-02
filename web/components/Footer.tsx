import { client, urlFor } from '@/lib/sanity';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, MessageCircle, Instagram, Facebook, MapPin } from 'lucide-react';
import BookingButton from './BookingButton';

// Fetch settings
async function getSettings() {
    return await client.fetch(`*[_type == "siteSettings"][0]`);
}

export default async function Footer() {
    const settings = await getSettings();

    return (
        <footer className="bg-kp-dark text-white pt-12 md:pt-20 pb-24 md:pb-10 px-4 mt-auto">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12 md:mb-16">

                {/* Brand Column */}
                <div className="flex flex-col items-start">
                    <Link href="/" className="relative block w-32 h-16 mb-6">
                        {settings?.logo ? (
                            <Image
                                src={urlFor(settings.logo).url()}
                                alt={settings.title || 'Resort Logo'}
                                fill
                                className="object-contain object-left"
                            />
                        ) : (
                            <span className="font-serif text-2xl font-bold">{settings?.title || "RK Residency"}</span>
                        )}
                    </Link>
                    <p className="text-white/70 leading-relaxed max-w-sm">
                        {settings?.shortDescription || "Experience the serenity of Kodaikanal. Where mist meets luxury, and silence speaks volumes."}
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="font-serif text-xl mb-6 text-kp-gold">Explore</h3>
                    <ul className="space-y-4 text-white/80">
                        {settings?.mainNavigation?.map((navItem: any, idx: number) => (
                            <li key={idx}>
                                <Link href={navItem.url || '#'} className="hover:text-kp-gold transition-colors">
                                    {navItem.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact & Social */}
                <div>
                    <h3 className="font-serif text-xl mb-6 text-kp-gold">Contact & Social</h3>
                    <div className="space-y-4 mb-8">
                        {settings?.phoneNumber && (
                            <a href={`tel:${settings.phoneNumber}`} className="flex items-center gap-3 hover:text-kp-gold transition-colors">
                                <Phone size={18} />
                                <span>{settings.phoneNumber}</span>
                            </a>
                        )}
                        {settings?.whatsappNumber && (
                            <BookingButton
                                whatsappNumber={settings.whatsappNumber}
                                className="flex items-center gap-3 hover:text-kp-gold transition-colors"
                            >
                                <MessageCircle size={18} />
                                <span>WhatsApp Us</span>
                            </BookingButton>
                        )}
                        {/* Dynamic Address */}
                        {settings?.address && (
                            <div className="flex items-start gap-3 opacity-80">
                                <MapPin size={18} className="mt-1 shrink-0" />
                                <span className="whitespace-pre-line">{settings.address}</span>
                            </div>
                        )}

                        {/* Check-in/out Times */}
                        {(settings?.checkInTime || settings?.checkOutTime) && (
                            <div className="mt-4 pt-4 border-t border-white/10 text-sm text-white/60">
                                <p>Check-in: <span className="text-kp-gold">{settings.checkInTime || '1:00 PM'}</span></p>
                                <p>Check-out: <span className="text-kp-gold">{settings.checkOutTime || '11:00 AM'}</span></p>
                            </div>
                        )}
                    </div>

                    {/* Dynamic Social Links */}
                    {settings?.socialLinks && settings.socialLinks.length > 0 && (
                        <div className="flex gap-4">
                            {settings.socialLinks.map((link: any, idx: number) => {
                                // Simple logic to pick icon based on URL or Platform name
                                // Simplification: Default to generic link if unknown, but matching basics
                                const platform = link.platform?.toLowerCase() || '';
                                let Icon = Facebook; // Default
                                if (platform.includes('insta')) Icon = Instagram;

                                return (
                                    <a
                                        key={idx}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 bg-white/10 rounded-full hover:bg-kp-gold hover:text-kp-dark transition-all"
                                    >
                                        <Icon size={20} />
                                    </a>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-white/10 pt-8 text-center text-white/40 text-sm">
                <p>&copy; {new Date().getFullYear()} {settings?.title || 'RK Residency'}. All rights reserved.</p>
            </div>
        </footer>
    );
}
