import { defineField, defineType } from 'sanity'
import { PlaySquare } from 'lucide-react'

export default defineType({
    name: 'mediaBlock',
    title: 'Media / Video',
    type: 'object',
    icon: PlaySquare,
    fields: [
        defineField({ name: 'title', type: 'string', title: 'Title' }),
        defineField({
            name: 'url',
            title: 'YouTube URL',
            type: 'url',
        }),
        defineField({
            name: 'coverImage',
            title: 'Cover Image',
            type: 'image',
            options: { hotspot: true },
        }),
    ],
})
