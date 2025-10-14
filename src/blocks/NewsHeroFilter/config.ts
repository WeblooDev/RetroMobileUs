import type { Block } from 'payload'

export const NewsHeroFilter: Block = {
  slug: 'newsHeroFilter',
  interfaceName: 'NewsHeroFilter',
  labels: { singular: 'News Hero + Filter', plural: 'News Hero + Filter' },
  fields: [
    {
      name: 'background',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Background Image',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
    },
    {
      name: 'showExcerpt',
      type: 'checkbox',
      label: 'Show post excerpts',
      defaultValue: true,
    },
    {
      name: 'limit',
      type: 'number',
      label: 'Max posts',
      defaultValue: 24,
      min: 1,
      max: 60,
    },
  ],
}

export default NewsHeroFilter
