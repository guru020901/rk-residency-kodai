import { defineField, defineType } from 'sanity'
import { Home } from 'lucide-react'

export default defineType({
    name: 'villaBlock',
    title: 'Villa Pricing Block',
    type: 'object',
    icon: Home,
    fields: [
        defineField({
            name: 'title',
            title: 'Section Title',
            type: 'string',
            initialValue: 'Our Accommodation Packages',
        }),
        defineField({
            name: 'villaTitle',
            title: 'Whole Villa Title',
            type: 'string',
            initialValue: 'Whole Villa (3 BHK)',
        }),
        defineField({
            name: 'villaPrice',
            title: 'Whole Villa Price (₹)',
            type: 'number',
            initialValue: 10000,
        }),
        defineField({
            name: 'villaOriginalPrice',
            title: 'Whole Villa Original Price (₹)',
            type: 'number',
        }),
        defineField({
            name: 'villaCapacity',
            title: 'Whole Villa Capacity (Guests)',
            type: 'number',
            initialValue: 12,
        }),
        defineField({
            name: 'villaFeatures',
            title: 'Whole Villa Features',
            type: 'array',
            of: [{ type: 'string' }],
            initialValue: ['Living Hall', 'Campfire', 'Private Parking', 'Kitchen Access'],
        }),
        defineField({
            name: 'villaImage',
            title: 'Whole Villa Featured Image',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'rooms',
            title: 'Individual Rooms',
            description: 'Select the 3 rooms to display in the grid below the villa card.',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'room' } }],
        }),
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare({ title }) {
            return {
                title: title || 'Villa Pricing Block',
                subtitle: 'Displays Whole Villa + 3 Rooms',
            }
        },
    },
})
