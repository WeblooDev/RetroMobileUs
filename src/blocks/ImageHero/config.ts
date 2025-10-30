// src/blocks/ImageHero/config.ts
import type { Block } from 'payload'

export const ImageHero: Block = {
  slug: 'imageHero',
  interfaceName: 'ImageHero', // <- generate TS type for the component
  labels: {
    singular: 'Image Hero',
    plural: 'Image Heroes',
  },
  fields: [
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      required: true,
    },
    {
      name: 'button',
      type: 'group',
      label: 'CTA Button',
      fields: [
        { name: 'label', type: 'text', required: true, defaultValue: 'Learn More' },
        { name: 'url', type: 'text', required: true, defaultValue: '#' },
      ],
    },
  ],
}

export default ImageHero
