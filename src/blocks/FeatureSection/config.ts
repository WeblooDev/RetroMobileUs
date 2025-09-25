import type { Block } from 'payload'

export const FeatureSectionBlock: Block = {
  slug: 'featureSection',
  interfaceName: 'FeatureSectionBlock',
  labels: {
    singular: 'Feature Section',
    plural: 'Feature Sections',
  },
  fields: [
    {
      name: 'backgroundImage',
      label: 'Background Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'heading',
      label: 'Heading',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'link',
      label: 'Button Link',
      type: 'text',
      required: true,
    },
    {
      name: 'features',
      label: 'Features',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      required: true,
      fields: [
        {
          name: 'icon',
          label: 'Icon Image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'buttonText',
      label: 'Button Text',
      type: 'text',
      defaultValue: 'Get Started Today',
    },
  ],
}
