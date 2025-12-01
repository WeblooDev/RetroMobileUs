import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'

export const Galleries: CollectionConfig = {
  slug: 'galleries',
  labels: { singular: 'Gallery', plural: 'Galleries' },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'slug', 'updatedAt'] },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'intro',
      label: 'Short description',
      type: 'textarea',
      required: true,
      admin: { rows: 3 },
    },
    { name: 'thumbnail', type: 'upload', relationTo: 'media', required: true },

    {
      name: 'images',
      type: 'array',
      required: true,
      labels: { singular: 'Image', plural: 'Images' },
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text' },
      ],
    },

    {
      name: 'readMore',

      type: 'group',
      fields: [
        { name: 'url', type: 'text' },
        { name: 'newTab', type: 'checkbox', defaultValue: false },
      ],
      admin: { description: 'Leave empty to use internal /galleries/[slug]' },
    },

    ...slugField(),
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
      admin: { position: 'sidebar' },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) =>
            siblingData._status === 'published' && !value ? new Date() : value,
        ],
      },
    },
  ],
  versions: {
    drafts: { autosave: { interval: 100 }, schedulePublish: true },
    maxPerDoc: 50,
  },
}

export default Galleries
