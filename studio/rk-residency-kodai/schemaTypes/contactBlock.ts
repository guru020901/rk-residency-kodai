import { defineField, defineType } from 'sanity'
import { Phone } from 'lucide-react'

export default defineType({
    name: 'contactBlock',
    title: 'Contact Details Section',
    type: 'object',
    icon: Phone,
    fields: [
        defineField({
            name: 'showMap',
            type: 'boolean',
            title: 'Show Google Map?',
            initialValue: false
        }),
    ],
})
