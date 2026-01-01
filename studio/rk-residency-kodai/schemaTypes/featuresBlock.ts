import { defineField, defineType } from 'sanity'
import { Sparkles, Star, Heart } from 'lucide-react'

export default defineType({
    name: 'featuresBlock',
    title: 'Features & Amenities',
    type: 'object',
    fields: [
        defineField({
            name: 'title',
            title: 'Section Title',
            type: 'string',
            initialValue: 'Our Experiences'
        }),
        defineField({
            name: 'subtitle',
            title: 'Subtitle',
            type: 'string',
        }),
        defineField({
            name: 'features',
            title: 'Features List',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'icon',
                            title: 'Icon Name',
                            type: 'string',
                            description: 'e.g., "coffee", "wifi", "mountain", "fire" (uses Lucide icons)',
                            initialValue: 'star'
                        }),
                        defineField({
                            name: 'title',
                            title: 'Feature Title',
                            type: 'string',
                        }),
                        defineField({
                            name: 'description',
                            title: 'Description',
                            type: 'text',
                            rows: 2
                        })
                    ],
                    preview: {
                        select: {
                            title: 'title',
                            subtitle: 'description'
                        }
                    }
                }
            ]
        })
    ]
})
