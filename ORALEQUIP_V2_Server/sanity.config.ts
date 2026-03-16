import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
    name: 'default',
    title: 'OralEquip Studio',

    // !! REPLACE WITH YOUR ACTUAL PROJECT ID !!
    projectId: 'YOUR_PROJECT_ID',
    dataset: 'production',

    plugins: [structureTool()],

    schema: {
        types: schemaTypes,
    },
})
