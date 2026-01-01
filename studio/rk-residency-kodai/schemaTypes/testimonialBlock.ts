import { defineField, defineType } from 'sanity'
import { MessageSquareQuote } from 'lucide-react'

export default defineType({
    name: 'testimonialBlock',
    title: 'Guest Reviews',
    type: 'object',
    fields: [
        defineField({
            name: 'title',
            title: 'Section Title',
            type: 'string',
            initialValue: 'What our guests say'
        }),
        defineField({
            name: 'reviews',
            title: 'Reviews',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'guestName', type: 'string', title: 'Guest Name' }),
                        defineField({ name: 'rating', type: 'number', title: 'Rating (1-5)', initialValue: 5 }),
                        defineField({ name: 'comment', type: 'text', title: 'Review Comment' }),
                        defineField({ name: 'location', type: 'string', title: 'Location (Optional)', description: 'e.g. "from Chennai"' })
                    ],
                    preview: {
                        select: {
                            title: 'guestName',
                            subtitle: 'comment'
                        }
                    }
                }
            ]
        })
    ]
})
