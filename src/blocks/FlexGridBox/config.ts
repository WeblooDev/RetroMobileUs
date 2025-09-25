import type { Block, Field } from 'payload'
import { link } from '@/fields/link'

const gridItemFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    required: true,
  },
  {
    name: 'subtitle',
    type: 'text',
    required: true,
  },
  {
    name: 'flex',
    type: 'number',
    required: true,
    defaultValue: 1,
  },
  {
    name: 'bgColor',
    label: 'Background Color (Tailwind class)',
    type: 'text',
    required: false,
  },
  {
    name: 'textAlign',
    label: 'text alignment',
    type: 'select',
    required: false,
    defaultValue: 'start',
    options: [
      {
        label: 'Start',
        value: 'start',
      },
      {
        label: 'End',
        value: 'end',
      },
    ],
  },
  {
    name: 'img',
    type: 'upload',
    relationTo: 'media',
    required: false,
  },
  {
    name: 'enableLink',
    type: 'checkbox',
    label: 'Enable Link',
  },
  link({
    overrides: {
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.enableLink),
      },
    },
  }),
]

export const FlexGridBox: Block = {
  slug: 'flexGridBox',
  interfaceName: 'FlexGridBoxBlock',
  labels: {
    singular: 'Flex Grid Box',
    plural: 'Flex Grid Boxes',
  },
  fields: [
    {
      name: 'gap',
      type: 'number',
      label: 'Gap (Tailwind units)',
      defaultValue: 4,
      required: false,
    },
    {
      name: 'matrix',
      type: 'array',
      label: 'Rows',
      minRows: 1,
      labels: {
        singular: 'Row',
        plural: 'Rows',
      },
      fields: [
        {
          name: 'items',
          type: 'array',
          label: 'Columns (Grid Items)',
          minRows: 1,
          labels: {
            singular: 'Item',
            plural: 'Items',
          },
          fields: gridItemFields,
        },
      ],
    },
  ],
}
