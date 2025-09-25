import type { Block } from 'payload'

const JourneyCTA: Block = {
  slug: 'journeyCTA',
  labels: {
    singular: 'Journey CTA',
    plural: 'Journey CTAs',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
    },
    {
      name: 'buttons',
      label: 'CTA Buttons',
      type: 'array',
      minRows: 1,
      maxRows: 3,
      fields: [
        {
          name: 'label',
          label: 'Button Label',
          type: 'text',
          required: true,
        },
        {
          name: 'href',
          label: 'Button Link',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}

export default JourneyCTA
