import type { Block } from 'payload'

export const ScheduleSplit: Block = {
  slug: 'scheduleSplit',
  interfaceName: 'ScheduleSplit',
  labels: { singular: 'Schedule Split', plural: 'Schedule Splits' },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Heading',
      defaultValue: 'Friday, March 21',
    },

    {
      name: 'items',
      type: 'array',
      label: 'Schedule Items',
      minRows: 1,
      maxRows: 20,
      labels: { singular: 'Item', plural: 'Items' },
      admin: { initCollapsed: false },
      fields: [
        { name: 'bold', type: 'text', required: true, label: 'Bold Part (e.g., 9:00 AM)' },
        { name: 'text', type: 'text', required: true, label: 'Description' },
      ],
    },

    { name: 'image', type: 'upload', relationTo: 'media', required: true, label: 'Side Image' },

    {
      name: 'reverseLayout',
      type: 'checkbox',
      label: 'Image on right (reverse layout)',
      defaultValue: false,
    },

    {
      name: 'backgroundColor',
      type: 'text',
      label: 'Panel Background Color',
      defaultValue: '#7A8E57',
      admin: { description: 'Hex/rgb(a)/CSS color token.' },
    },

    {
      name: 'textColor',
      type: 'select',
      label: 'Panel Text Color',
      defaultValue: 'white',
      options: [
        { label: 'White', value: 'white' },
        { label: 'Black', value: 'black' },
      ],
    },
  ],
}

export default ScheduleSplit
