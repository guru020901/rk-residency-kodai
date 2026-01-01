import { defineField, defineType } from 'sanity'
import { Layout } from 'lucide-react'

export default defineType({
    name: 'heroBlock',
    title: 'Hero Section',
    type: 'object',
    icon: Layout,
    fields: [
        defineField({ name: 'title', type: 'string', title: 'Main Title' }),
        defineField({ name: 'subtitle', type: 'string', title: 'Subtitle' }),
        defineField({
            name: 'backgroundImages',
            title: 'Background Images (Slideshow)',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
            description: 'Add multiple images for a slideshow effect. Overrides single "Background Image".',
        }),
        defineField({
            name: 'backgroundImage',
            title: 'Background Image (Fallback)',
            type: 'image',
            options: { hotspot: true },
            description: 'Single image if no slideshow is provided.',
        }),
        defineField({
            name: 'backgroundVideo',
            title: 'Background Video URL',
            type: 'url',
            description: 'Optional. If provided, overrides images with a silent video loop.',
        }),
    ],
})
