// src/blocks/KnowBeforeYouGo/config.ts
import type { Block } from 'payload'
import { linkGroup } from '@/fields/linkGroup'

export const KnowBeforeYouGo: Block = {
  slug: 'knowBeforeYouGo',
  interfaceName: 'KnowBeforeYouGo',
  labels: { singular: 'Know Before You Go', plural: 'Know Before You Go' },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Heading',
      defaultValue: 'Everything You Need to Know',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Right-side Text',
      admin: { rows: 3 },
      defaultValue:
        'Venue details, hotel recommendations, transportation tips, and show hours—all in one place to make your visit smooth and exciting.',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Cards',
      required: true,
      minRows: 4,
      maxRows: 4,
      labels: { singular: 'Card', plural: 'Cards' },
      fields: [
        { name: 'title', type: 'text', required: true, label: 'Card Title' },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Card Image',
        },
      ],
 
    },

    linkGroup({
      appearances: false,
      overrides: {
        name: 'cta',
        label: 'Bottom CTA',
        required: true,
        minRows: 1,
        maxRows: 1,
        admin: { initCollapsed: false },
      },
    }),
  ],
}

export default KnowBeforeYouGo
