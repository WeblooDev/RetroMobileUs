// blocks/DarkRichText/config.ts
import type { Block } from 'payload'

export const DarkRichText: Block = {
  slug: 'darkRichText',
  interfaceName: 'DarkRichText',
  labels: { singular: 'Dark Rich Text', plural: 'Dark Rich Text' },
  fields: [
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Content',
    },
  ],
}

export default DarkRichText
