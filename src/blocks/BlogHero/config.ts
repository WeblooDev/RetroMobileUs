import type { Block } from 'payload'

export const BlogHero: Block = {
  slug: 'blogHero',
  interfaceName: 'BlogHero',
  labels: { singular: 'Blog Hero', plural: 'Blog Hero' },
  fields: [
    {
      name: 'background',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Background Image',
    },
    { name: 'title', type: 'text', required: true, label: 'Title' },
    { name: 'description', type: 'textarea', label: 'Description' },
    { name: 'darken', type: 'checkbox', defaultValue: true, label: 'Darken Overlay' },
  ],
}

export default BlogHero
