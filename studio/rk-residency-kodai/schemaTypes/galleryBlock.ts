import { defineField, defineType } from 'sanity'
import { Images } from 'lucide-react'

export default defineType({
    name: 'galleryBlock',
    title: 'Photo Gallery',
    type: 'object',
    icon: Images,
    fields: [
        defineField({ name: 'title', type: 'string', title: 'Section Title' }),
        defineField({
            name: 'images',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
        }),
    ],
})
