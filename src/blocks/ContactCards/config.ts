// src/blocks/ContactCards/config.ts
import type { Block } from 'payload'
import { linkGroup } from '@/fields/linkGroup'

export const ContactCards: Block = {
  slug: 'contactCards',
  interfaceName: 'ContactCards',
  labels: { singular: 'Contact Cards', plural: 'Contact Cards' },
  fields: [
    {
      name: 'cards',
      required: true,
      type: 'array',
      labels: { singular: 'Card', plural: 'Cards' },
      minRows: 1,
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
        linkGroup({
          overrides: {
            name: 'link',
            label: 'Optional Link',
            required: false,
          },
        }),
      ],
    },
  ],
}

export default ContactCards
