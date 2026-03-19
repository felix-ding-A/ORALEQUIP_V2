import { defineField, defineType } from 'sanity'

export const product = defineType({
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Instruments', value: 'Instruments' },
                    { title: 'Equipment', value: 'Equipment' },
                    { title: 'Consumables', value: 'Consumables' },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'material',
            title: 'Material',
            type: 'string',
        }),
        defineField({
            name: 'image',
            title: 'Main Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative text',
                }
            ]
        }),
        defineField({
            name: 'gallery',
            title: 'Image Gallery',
            type: 'array',
            of: [{
                type: 'image',
                options: { hotspot: true },
                fields: [{ name: 'alt', type: 'string', title: 'Alternative text' }]
            }]
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'array',
            of: [
                { type: 'block' },
                {
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        { name: 'alt', type: 'string', title: 'Alternative text' }
                    ]
                },
                { type: 'table' }
            ],
        }),
        defineField({
            name: 'specs',
            title: 'Specifications',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'specField',
                    fields: [
                        { name: 'label', type: 'string', title: 'Label' },
                        { name: 'value', type: 'string', title: 'Value' }
                    ],
                    preview: {
                        select: { title: 'label', subtitle: 'value' }
                    }
                }
            ]
        }),
        defineField({
            name: 'clinicalApplications',
            title: 'Clinical Applications',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'features',
            title: 'Features',
            type: 'array',
            of: [{ type: 'string' }],
        }),
    ],
})
