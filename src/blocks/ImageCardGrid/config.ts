// src/blocks/ImageCardGrid/config.ts
import type { Block } from 'payload'

export const ImageCardGrid: Block = {
  slug: 'imageCardGrid',
  interfaceName: 'ImageCardGrid',
  labels: { singular: 'Image Card Grid', plural: 'Image Card Grids' },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Title' },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      labels: { singular: 'Card', plural: 'Cards' },
      fields: [
        { name: 'text', type: 'text', required: true, label: 'Text' },
        { name: 'url', type: 'text', required: true, label: 'Link URL' },
        {
          name: 'newTab',
          type: 'checkbox',
          required: true,
          defaultValue: false,
          label: 'Open in new tab',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Image',
        },
      ],
    },
  ],
}
export default ImageCardGrid
