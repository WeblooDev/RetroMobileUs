import type { Block } from 'payload'

export const TwoImageColumn: Block = {
  slug: 'twoImageColumn',
  interfaceName: 'TwoImageColumn',
  labels: {
    singular: 'Two Image Column',
    plural: 'Two Image Columns',
  },
  fields: [
    {
      name: 'topTitle',
      label: 'Top Section Title',
      type: 'text',
      required: true,
    },
    {
      name: 'topText',
      label: 'Top Section Text',
      type: 'textarea',
      required: true,
    },
    {
      name: 'image1',
      label: 'Left Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'image2',
      label: 'Right Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'approachTitle',
      label: 'Approach Title',
      type: 'text',
      required: true,
    },
    {
      name: 'approachText',
      label: 'Approach Description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'quote',
      label: 'Quote Text',
      type: 'textarea',
      required: true,
    },
    {
      name: 'quoteAttribution',
      label: 'Quote Attribution',
      type: 'text',
    },
  ],
}
