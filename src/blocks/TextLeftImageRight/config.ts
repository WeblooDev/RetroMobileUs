import type { Block } from 'payload'

export const TextLeftImageRight: Block = {
  slug: 'textLeftImageRight',
  interfaceName: 'TextLeftImageRight',
  labels: { singular: 'Text / Image Right', plural: 'Text / Image Right' },
  fields: [
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'paragraph2', label: 'Paragraph 2', type: 'textarea', required: false },
    {
      name: 'body',
      label: 'Body (plain text)',
      type: 'textarea',
      required: true,
      admin: { description: 'Plain text only. Line breaks are preserved.' },
    },
    {
      name: 'image',
      label: 'Image (Right)',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}

export default TextLeftImageRight
