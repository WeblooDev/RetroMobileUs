import type { Block } from 'payload'

export const InlineInfo: Block = {
  slug: 'inlineInfo',
  interfaceName: 'InlineInfo',
  labels: { singular: 'Inline Info', plural: 'Inline Info' },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Cards',
      minRows: 1,
      maxRows: 6,
      labels: { singular: 'Card', plural: 'Cards' },
      admin: { initCollapsed: false },
      fields: [
        { name: 'title', type: 'text', required: true, label: 'Heading' },
        { name: 'description', type: 'text', label: 'Optional Text' },
      ],
      defaultValue: [
        { title: 'Main Entrance', description: 'South Hall, Los Angeles Convention Center' },
        { title: 'Doors Open', description: '9:00 AM daily' },
        { title: 'Ticket Check & Security Screening', description: 'at Entrance' },
      ],
    },
  ],
}

export default InlineInfo
