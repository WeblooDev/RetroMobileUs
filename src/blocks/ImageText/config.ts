import type { Block } from 'payload'

export const ImageText: Block = {
  slug: 'imageText',
  labels: {
    singular: 'Image + Text',
    plural: 'Image + Text Blocks',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image',
      required: true,
    },
    {
      name: 'imageAlt',
      type: 'text',
      label: 'Image Alt (accessibility)',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'text',
      type: 'textarea',
      label: 'Text',
      required: true,
    },
    {
      name: 'reverse',
      type: 'checkbox',
      label: 'Reverse layout on desktop (image on the left)',
      defaultValue: false,
    },
    {
      name: 'textAlign',
      type: 'select',
      label: 'Text alignment',
      required: true,
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
      ],
    },
  ],
}
