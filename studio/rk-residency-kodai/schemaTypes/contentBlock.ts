import { defineField, defineType } from 'sanity'
import { BookOpen } from 'lucide-react'

export default defineType({
    name: 'contentBlock',
    title: 'About / Story (Content Section)',
    type: 'object',
    fields: [
        defineField({
            name: 'layout',
            title: 'Layout',
            type: 'string',
            options: {
                list: [
                    { title: 'Image Left, Text Right', value: 'image-left' },
                    { title: 'Image Right, Text Left', value: 'image-right' },
                    { title: 'Centered Text (No Image)', value: 'centered' }
                ]
            },
            initialValue: 'image-left'
        }),
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string'
        }),
        defineField({
            name: 'content',
            title: 'Body Content',
            type: 'array',
            of: [{ type: 'block' }]
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: { hotspot: true },
            hidden: ({ parent }) => parent?.layout === 'centered'
        }),
        defineField({
            name: 'ctaLabel',
            title: 'Button Label (Optional)',
            type: 'string'
        }),
        defineField({
            name: 'ctaUrl',
            title: 'Button Link (Optional)',
            type: 'url'
        })
    ]
})
