// collections/Tags.ts
import type { CollectionConfig } from 'payload'

const Tags: CollectionConfig = {
  slug: 'tags',
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'slug'] },
  access: { read: () => true },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'color', type: 'text' },
  ],
}

export default Tags
