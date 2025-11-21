// src/blocks/ImageHero/config.ts
import type { Block } from 'payload'

export const ImageHero: Block = {
  slug: 'imageHero',
  interfaceName: 'ImageHero',
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
    // No button field anymore – HubSpot form is hard-coded in the component
  ],
}

export default ImageHero
