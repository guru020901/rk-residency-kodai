import { client, urlFor } from '@/lib/sanity';
import Image from 'next/image';
import Link from 'next/link';
import MobileMenu from './MobileMenu';

// Fetch settings (Server Component)
async function getSettings() {
    return await client.fetch(`*[_type == "siteSettings"][0]`);
}

export default async function Header() {
    const settings = await getSettings();

    const DEFAULT_NAV_ITEMS = [
        { label: 'Home', url: '/' },
        { label: 'Rooms', url: '/rooms' },
        { label: 'Amenities', url: '/amenities' },
        { label: 'Gallery', url: '/gallery' },
        { label: 'Contact', url: '/contact' },
    ];

    const navItems = settings?.mainNavigation?.length > 0 ? settings.mainNavigation : DEFAULT_NAV_ITEMS;

    return (
        <header className="fixed top-0 left-0 w-full z-50 p-6 transition-all duration-300 bg-gradient-to-b from-black/50 to-transparent">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="relative block w-32 h-16 md:w-40 md:h-20">
                    {settings?.logo ? (
                        <Image
                            src={urlFor(settings.logo).url()}
                            alt={settings.title || 'Resort Logo'}
                            fill
                            className="object-contain"
                            priority
                        />
                    ) : (
                        <span className="text-white font-serif text-2xl font-bold">{settings?.title || "RK Residency"}</span>
                    )}
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex gap-8 text-white font-serif tracking-widest text-sm">
                    {navItems.map((navItem: any, idx: number) => (
                        <Link
                            key={idx}
                            href={navItem.url || '#'}
                            className="hover:text-kp-gold transition-colors uppercase"
                        >
                            {navItem.label}
                        </Link>
                    ))}
                </nav>

                {/* Mobile Nav */}
                <MobileMenu navItems={navItems} />
            </div>
        </header>
    );
}
