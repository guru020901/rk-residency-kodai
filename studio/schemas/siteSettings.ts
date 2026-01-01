import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'siteSettings',
    title: 'Global Settings',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Site Title',
            type: 'string',
        }),
        defineField({
            name: 'logo',
            title: 'Logo',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'phoneNumber',
            title: 'Reception Phone Number',
            type: 'string',
            description: 'Used for the "Call" button',
        }),
        defineField({
            name: 'whatsappNumber',
            title: 'WhatsApp Number',
            type: 'string',
            description: 'Format: 9199xxxxxxxx (No + or spaces). Used for booking chats.',
        }),
        defineField({
            name: 'whatsappMessage',
            title: 'Default WhatsApp Message',
            type: 'text',
            initialValue: 'Hi, I found your resort online and would like to know about availability.',
        }),
        defineField({
            name: 'socialLinks',
            title: 'Social Links',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'platform', type: 'string', title: 'Platform' },
                        { name: 'url', type: 'url', title: 'URL' },
                    ],
                },
            ],
        }),
    ],
})
