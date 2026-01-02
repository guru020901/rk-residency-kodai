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
            name: 'shortDescription',
            title: 'Footer Description',
            type: 'text',
            rows: 3,
            description: 'Short "About Us" blurb for the footer.',
        }),
        defineField({
            name: 'address',
            title: 'Physical Address',
            type: 'text',
            rows: 2,
        }),
        defineField({
            name: 'mainNavigation',
            title: 'Main Navigation Menu',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'label', type: 'string', title: 'Label' },
                        { name: 'url', type: 'string', title: 'URL (e.g. /rooms)' },
                    ],
                },
            ],
        }),
        defineField({
            name: 'favicon',
            title: 'Browser Icon (Favicon)',
            type: 'image',
            description: 'Upload a square image (e.g. 512x512 png) to be shown in browser tabs.',
            options: { hotspot: true },
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
            name: 'checkInTime',
            title: 'Check-in Time',
            type: 'string',
            initialValue: '1:00 PM',
            description: 'Example: 01:00 PM',
        }),
        defineField({
            name: 'checkOutTime',
            title: 'Check-out Time',
            type: 'string',
            initialValue: '11:00 AM',
            description: 'Example: 11:00 AM',
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
