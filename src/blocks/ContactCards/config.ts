import { link } from '@/fields/link'
import type { Block } from 'payload'

export const ContactCards: Block = {
  slug: 'contactCards',
  interfaceName: 'ContactCards',
  labels: { singular: 'Contact Cards', plural: 'Contact Cards' },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Contact Our:',
      label: 'Section Title',
    },
    {
      name: 'cards',
      type: 'array',
      required: true,
      minRows: 1,
      labels: { singular: 'Card', plural: 'Cards' },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Image',
          required: true,
        },
        {
          name: 'cardTitle',
          type: 'text',
          label: 'Card Title',
          required: true,
        },
        {
          name: 'email',
          type: 'email',
          label: 'Email',
          required: false,
        },
        link({
          overrides: {
            name: 'link',
            label: 'Link (optional)',
            required: false,
            
          },
        }),
      ],
    },
  ],
}

export default ContactCards
