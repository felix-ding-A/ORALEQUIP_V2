import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { table } from '@sanity/table'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
    name: 'default',
    title: 'OralEquip Studio',

    // Using Vite environment variables in Sanity Studio v3
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || '6ehbsvke',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',

    plugins: [structureTool(), table()],

    schema: {
        types: schemaTypes,
    },
})
