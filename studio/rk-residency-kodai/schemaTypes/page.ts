import { defineField, defineType } from 'sanity'
import { FileText, Globe } from 'lucide-react'

export default defineType({
    name: 'page',
    title: 'Page',
    type: 'document',
    icon: FileText,
    groups: [
        { name: 'content', title: 'Content' },
        { name: 'seo', title: 'SEO & Metadata', icon: Globe },
    ],
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            group: 'content',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            group: 'content',
            options: {
                source: 'title',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'pageBuilder',
            title: 'Page Builder',
            type: 'array',
            group: 'content',
            of: [
                { type: 'heroBlock' },
                { type: 'featuresBlock' },
                { type: 'contentBlock' },
                { type: 'priceBlock' },
                { type: 'testimonialBlock' },
                { type: 'galleryBlock' },
                { type: 'mediaBlock' },
                { type: 'villaBlock' },
                { type: 'roomListBlock' },
                { type: 'contactBlock' },
                { type: 'aboutBlock' },
            ],
        }),
        defineField({
            name: 'seoDescription',
            title: 'Meta Description',
            type: 'text',
            rows: 3,
            group: 'seo',
            description: 'Important for Google. Keep it under 160 characters.'
        }),
        defineField({
            name: 'seoKeywords',
            title: 'Keywords',
            type: 'array',
            group: 'seo',
            of: [{ type: 'string' }],
            options: { layout: 'tags' }
        }),
    ],
})
