// src/blocks/BlogTwoColumn/slices/ImageSlice.ts
import type { Block } from 'payload'

export const ImageSlice: Block = {
  slug: 'imageSlice',
  interfaceName: 'ImageSlice',
  fields: [
    {
      name: 'image',
      label: 'Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'caption',
      label: 'Caption',
      type: 'text',
      required: true,
      admin: { placeholder: 'Short caption shown near the image' },
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
      admin: { placeholder: '1–3 sentences of context' },
    },
  ],
}
