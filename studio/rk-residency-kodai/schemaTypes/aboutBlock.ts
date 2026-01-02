import { defineField, defineType } from 'sanity'
import { User } from 'lucide-react'

export default defineType({
    name: 'aboutBlock',
    title: 'About Us (Premium)',
    type: 'object',
    icon: User,
    fields: [
        defineField({
            name: 'title',
            title: 'Section Title',
            type: 'string',
            initialValue: 'Our Story'
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtitle / Tagline',
            type: 'string',
            initialValue: 'Hospitality with a Heart'
        }),
        defineField({
            name: 'description',
            title: 'Main Story',
            type: 'array',
            of: [{ type: 'block' }]
        }),
        defineField({
            name: 'stats',
            title: 'Key Statistics',
            description: 'Show off your achievements (e.g. 5000+ Guests, 10 Years)',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'value', type: 'string', title: 'Value (e.g. 10+)' },
                        { name: 'label', type: 'string', title: 'Label (e.g. Years)' }
                    ]
                }
            ]
        }),
        defineField({
            name: 'founderQuote',
            title: 'Founder Quote / Vision',
            type: 'text',
            rows: 3
        }),
        defineField({
            name: 'founderName',
            title: 'Founder Name',
            type: 'string'
        }),
        defineField({
            name: 'mainImage',
            title: 'Main Feature Image',
            type: 'image',
            options: { hotspot: true }
        }),
        defineField({
            name: 'secondaryImages',
            title: 'Collage Images (Optional)',
            type: 'array',
            of: [{ type: 'image' }],
            validation: Rule => Rule.max(2)
        })
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'subtitle',
            media: 'mainImage'
        }
    }
})
