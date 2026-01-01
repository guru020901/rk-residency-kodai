import { defineField, defineType } from 'sanity'
import { Banknote } from 'lucide-react'

export default defineType({
    name: 'priceBlock',
    title: 'Room Price List',
    type: 'object',
    icon: Banknote,
    fields: [
        defineField({ name: 'title', type: 'string', title: 'Section Title' }),
        defineField({
            name: 'note',
            type: 'string',
            title: 'Note',
            initialValue: 'Automatically displays all available rooms.'
        }),
    ],
})
