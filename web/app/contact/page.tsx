import { client } from '@/lib/sanity';
import { MapPin, Phone, MessageCircle } from 'lucide-react';

export const revalidate = 60;

async function getSettings() {
    return await client.fetch(`*[_type == "siteSettings"][0]`);
}

export default async function ContactPage() {
    const settings = await getSettings();

    return (
        <main className="min-h-screen pt-32 pb-20 px-4 bg-kp-cream">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="font-serif text-4xl md:text-5xl text-kp-green mb-4">Contact Us</h1>
                    <p className="text-kp-gold uppercase tracking-widest text-sm font-bold">We'd love to hear from you</p>
                    <div className="h-1 w-24 bg-kp-gold mx-auto mt-6" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 md:p-12 rounded-xl shadow-lg">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <h2 className="font-serif text-2xl text-kp-green">Get in Touch</h2>

                        {settings?.address && (
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

                        {settings?.phoneNumber && (
                            <div className="flex items-start gap-4">
                                <div className="bg-kp-green/10 p-3 rounded-full text-kp-green shrink-0">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">Phone</h3>
                                    <a href={`tel:${settings.phoneNumber}`} className="text-gray-600 hover:text-kp-gold transition-colors">
                                        {settings.phoneNumber}
                                    </a>
                                </div>
                            </div>
                        )}

                        {settings?.whatsappNumber && (
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
                                        className="text-gray-600 hover:text-kp-gold transition-colors"
                                    >
                                        Chat with Concierge
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Simple Form (Visual Only for now, or WhatsApp Redirect) */}
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                        <h3 className="font-serif text-xl text-kp-dark mb-4">Direct Inquiry</h3>
                        <p className="text-gray-500 mb-6 text-sm">
                            For the fastest response, we recommend contacting us via WhatsApp.
                        </p>
                        {settings?.whatsappNumber && (
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
        </main>
    );
}
