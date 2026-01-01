import { defineField, defineType } from 'sanity'

const heroBlock = defineType({
    name: 'heroBlock',
    title: 'Hero Section',
    type: 'object',
    fields: [
        defineField({ name: 'title', type: 'string', title: 'Main Title' }),
        defineField({ name: 'subtitle', type: 'string', title: 'Subtitle' }),
        defineField({
            name: 'backgroundImage',
            title: 'Background Image',
            type: 'image',
            options: { hotspot: true },
            description: 'Primary background visual.',
        }),
        defineField({
            name: 'backgroundVideo',
            title: 'Background Video URL',
            type: 'url',
            description: 'Optional. If provided, overrides the image with a silent video loop.',
        }),
    ],
})

const galleryBlock = defineType({
    name: 'galleryBlock',
    title: 'Photo Gallery',
    type: 'object',
    fields: [
        defineField({ name: 'title', type: 'string', title: 'Section Title' }),
        defineField({
            name: 'images',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
        }),
    ],
})

const mediaBlock = defineType({
    name: 'mediaBlock',
    title: 'Media / Video',
    type: 'object',
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
        }),
    ],
})

export default [heroBlock, galleryBlock, mediaBlock]
