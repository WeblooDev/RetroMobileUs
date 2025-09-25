import type { Block } from 'payload'

const FeatureHighlight: Block = {
  slug: 'featureHighlight',
  labels: {
    singular: 'Feature Hightlight Block',
    plural: 'Feature Highlight Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'button',
      type: 'group',
      label: 'Button',
      fields: [
        {
          name: 'label',
          label: 'Button Label',
          type: 'text',
        },
        {
          name: 'href',
          label: 'Button Link (URL)',
          type: 'text',
        },
      ],
    },
    {
      name: 'imagePosition',
      type: 'select',
      options: [
        {
          label: 'Left',
          value: 'left',
        },
        {
          label: 'Right',
          value: 'right',
        },
      ],
      defaultValue: 'left',
      required: true,
    },
  ],
}

export default FeatureHighlight
