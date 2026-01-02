import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'room',
    title: 'Room Inventory',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Room Name',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'originalPrice',
            title: 'Original Price (₹)',
            type: 'number',
            description: 'Optional. Use this to show a discount (e.g. ₹5000 slashed to ₹3500).',
        }),
        defineField({
            name: 'price',
            title: 'Current Price per Night (₹)',
            type: 'number',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'isAvailable',
            title: 'Available?',
            type: 'boolean',
            initialValue: true,
            description: 'Turn off to hide from the website (marked as Sold Out).',
        }),
        defineField({
            name: 'images',
            title: 'Image Gallery',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
            description: 'First image will be the thumbnail.',
        }),
        defineField({
            name: 'videoUrl',
            title: 'Video Tour URL',
            type: 'url',
            description: 'Optional YouTube/Vimeo link for a room tour.',
        }),
        defineField({
            name: 'maxCapacity',
            title: 'Max Guests',
            type: 'number',
            initialValue: 2,
        }),
        defineField({
            name: 'dimensions',
            title: 'Room Dimensions',
            type: 'string',
            placeholder: 'e.g. 14x12 ft',
        }),
        defineField({
            name: 'floorLevel',
            title: 'Floor Level',
            type: 'string',
            placeholder: 'e.g. Ground Floor, First Floor',
        }),
        defineField({
            name: 'recommendedFor',
            title: 'Recommended For',
            type: 'string',
            placeholder: 'e.g. Couples, Elders, Families',
        }),
        defineField({
            name: 'amenities',
            title: 'Amenities',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                list: [
                    { title: 'Wi-Fi', value: 'wifi' },
                    { title: 'King Bed', value: 'king_bed' },
                    { title: 'Mountain View', value: 'mountain_view' },
                    { title: 'Private Pool', value: 'private_pool' },
                    { title: 'Intercom', value: 'intercom' },
                    { title: 'Heater', value: 'heater' },
                    { title: 'Kettle', value: 'kettle' },
                    { title: 'TV', value: 'tv' },
                ],
            },
        }),
    ],
})
