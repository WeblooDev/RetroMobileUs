// payload/blocks/VideoCta.ts
import type { Block } from 'payload'

export const VideoCta: Block = {
  slug: 'videoCta',
  interfaceName: 'VideoCta', // <- generates the TS interface in payload-types
  labels: {
    singular: 'Video + CTA',
    plural: 'Video + CTAs',
  },
  fields: [
    {
      name: 'video',
      type: 'upload',
      relationTo: 'media',
      label: 'Video (upload)',
      required: true,
    },
    {
      name: 'poster',
      type: 'upload',
      relationTo: 'media',
      label: 'Poster Image (optional)',
      required: false,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'paragraph',
      type: 'textarea',
      label: 'Paragraph',
      required: true,
      admin: { description: 'Plain text only.' },
    },
    {
      name: 'button',
      type: 'group',
      label: 'Button',
      admin: { description: 'Optional CTA.' },
      fields: [
        { name: 'label', type: 'text', required: true, defaultValue: 'Learn More' },
        { name: 'url', type: 'text', required: true, defaultValue: '#' },
      ],
    },
  ],
}
