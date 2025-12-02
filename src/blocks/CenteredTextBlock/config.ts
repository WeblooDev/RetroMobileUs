import type { Block } from 'payload'

export const CenteredText: Block = {
  slug: 'centeredText',
  interfaceName: 'CenteredText',
  labels: {
    singular: 'Centered Text',
    plural: 'Centered Text Blocks',
  },
  fields: [
    {
      name: 'text',
      type: 'text',
      required: true,
    },
  ],
}
