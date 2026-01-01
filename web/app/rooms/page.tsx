import { client } from '@/lib/sanity';
import RoomCard from '@/components/RoomCard';
import { notFound } from 'next/navigation';

export const revalidate = 60;

async function getRoomsData() {
    const query = `
    {
      "rooms": *[_type == "room" && isAvailable == true]{
        _id, title, price, originalPrice, description, images, amenities
      },
      "settings": *[_type == "siteSettings"][0]
    }
  `;
    return await client.fetch(query);
}

export default async function RoomsPage() {
    const data = await getRoomsData();
    const rooms = data?.rooms || [];
    const settings = data?.settings || {};

    return (
        <main className="min-h-screen pt-32 pb-20 px-4 bg-kp-cream">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="font-serif text-4xl md:text-5xl text-kp-green mb-4">Our Accommodations</h1>
                    <p className="text-kp-gold uppercase tracking-widest text-sm font-bold">Luxury Living in Kodaikanal</p>
                    <div className="h-1 w-24 bg-kp-gold mx-auto mt-6" />
                </div>

                {/* Room Grid */}
                {rooms.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {rooms.map((room: any) => (
                            <RoomCard
                                key={room._id}
                                room={room}
                                globalSettings={settings}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 py-20">
                        <p>No rooms currently available. Please check back later.</p>
                    </div>
                )}
            </div>
        </main>
    );
}
