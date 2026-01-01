import { defineField, defineType } from 'sanity'
import { BedDouble } from 'lucide-react'

export default defineType({
    name: 'roomListBlock',
    title: 'Room List (Inventory)',
    type: 'object',
    icon: BedDouble,
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            title: 'Title',
            initialValue: 'Our Accommodations'
        }),
        defineField({
            name: 'subtitle',
            type: 'string',
            title: 'Subtitle',
            initialValue: 'Luxury Living'
        }),
    ],
})
