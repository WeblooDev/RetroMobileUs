import type { CollectionConfig } from 'payload'

export const Faqs: CollectionConfig = {
  slug: 'faqs',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  admin: { defaultColumns: ['question', 'category', 'order', '_status'] },
  versions: { drafts: true }, // enables _status published/draft
  fields: [
    { name: 'question', type: 'text', required: true },
    { name: 'answer', type: 'textarea', required: true },
    { name: 'answer2', type: 'richText', required: true },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'faqCategories',
      required: true,
      maxDepth: 0,
    },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
  timestamps: true,
}
export default Faqs
