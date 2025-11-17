import type { Block } from 'payload'

export const FaqTabs: Block = {
  slug: 'faqTabs',
  interfaceName: 'FaqTabs',
  labels: { singular: 'FAQ Tabs', plural: 'FAQ Tabs' },
  fields: [
    {
      name: 'categories',
      label: 'Categories to show (optional, drag to order)',
      type: 'relationship',
      required: true,
      hasMany: true,
      relationTo: 'faqCategories',
      admin: { description: 'Leave empty to include all categories (by order asc).' },
    },
    {
      name: 'accentColor',
      type: 'text',
      label: 'Accent Color',
      defaultValue: '#7A8E57',
      required: true,
    },
  ],
}
export default FaqTabs
