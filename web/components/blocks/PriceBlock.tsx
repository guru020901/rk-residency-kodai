import { client } from '@/lib/sanity';
import RoomCard from '../RoomCard';

// This component fetches its own data (Server Component)
async function getRooms() {
    return await client.fetch(`*[_type == "room" && isAvailable == true]{
    _id, title, price, originalPrice, description, images, amenities
  }`);
}

export default async function PriceBlock({ title, globalSettings }: { title?: string, globalSettings?: any }) {
    const rooms = await getRooms();

    if (!rooms || rooms.length === 0) {
        return (
            <section className="py-20 px-4 bg-kp-cream text-center">
                <p className="text-gray-500">No rooms available at the moment. Please check back later.</p>
            </section>
        );
    }

    return (
        <section className="py-20 px-4 bg-kp-cream">
            <div className="max-w-6xl mx-auto">
                {title && <h2 className="text-4xl font-serif text-center mb-12 text-kp-green">{title}</h2>}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {rooms.map((room: any) => (
                        <RoomCard key={room._id} room={room} globalSettings={globalSettings} />
                    ))}
                </div>
            </div>
        </section>
    );
}
