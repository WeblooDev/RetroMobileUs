import type { CollectionConfig } from 'payload'

export const FaqCategories: CollectionConfig = {
  slug: 'faqCategories',
  labels: { singular: 'FAQ Category', plural: 'FAQ Categories' },
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'slug', 'order'] },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
  timestamps: true,
}
export default FaqCategories
