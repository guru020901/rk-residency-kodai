'use client';

import { useEffect, useState } from 'react';
import { client } from '@/lib/sanity';
import RoomCard from '../RoomCard';

interface RoomListBlockProps {
    title?: string;
    subtitle?: string;
    globalSettings?: any;
}

export default function RoomListBlock({ title, subtitle, globalSettings }: RoomListBlockProps) {
    const [rooms, setRooms] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRooms = async () => {
            const data = await client.fetch(`*[_type == "room" && isAvailable == true]{
                _id, title, price, originalPrice, description, images, amenities
            }`);
            setRooms(data);
            setLoading(false);
        };
        fetchRooms();
    }, []);

    if (loading) {
        return <div className="py-20 text-center text-gray-400">Loading rooms...</div>;
    }

    return (
        <section className="py-20 px-4 bg-kp-cream">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="font-serif text-4xl md:text-5xl text-kp-green mb-4">{title || "Our Accommodations"}</h2>
                    {subtitle && (
                        <p className="text-kp-gold uppercase tracking-widest text-sm font-bold block mb-4">
                            {subtitle}
                        </p>
                    )}
                    <div className="h-1 w-24 bg-kp-gold mx-auto mt-6" />
                </div>

                {/* Grid */}
                {rooms.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {rooms.map((room) => (
                            <RoomCard
                                key={room._id}
                                room={room}
                                globalSettings={globalSettings}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 py-10">
                        No rooms available at the moment.
                    </div>
                )}
            </div>
        </section>
    );
}
