import type { Block } from 'payload'

export const PartnerBenefits: Block = {
  slug: 'partnerBenefits',
  interfaceName: 'PartnerBenefits',
  labels: { singular: 'Partner Benefits', plural: 'Partner Benefits' },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Section Title',
      defaultValue: 'Partner Benefits',
    },
    {
      name: 'description',
      type: 'text',
      label: 'Section Description',
      defaultValue: 'What You’ll Gain',
    },
    {
      name: 'cards',
      label: 'Benefit Cards',
      type: 'array',
      minRows: 1,
      maxRows: 10,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Background Image',
        },
        {
          name: 'heading',
          type: 'text',
          required: true,
          label: 'Heading (H3)',
          defaultValue: 'Premium brand visibility in a luxury setting',
        },
        {
          name: 'body',
          type: 'textarea',
          label: 'Supporting Text',
        },
      ],
    },
  ],
}

export default PartnerBenefits
