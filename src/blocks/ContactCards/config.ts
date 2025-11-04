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
          required: true,
        },
      ],
    },
  ],
}

export default ContactCards
