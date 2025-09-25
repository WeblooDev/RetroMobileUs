import type { CollectionConfig } from 'payload'

export const PageSettings: CollectionConfig = {
  slug: 'page-settings',
  admin: {
    useAsTitle: 'page',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'page',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'background',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
  ],
}
