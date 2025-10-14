import type { Block } from 'payload'

export const VideoCta: Block = {
  slug: 'videoCta',
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
      type: 'textarea', // plain string
      label: 'Paragraph',
      required: true,
      admin: { description: 'Plain text only.' },
    },
    {
      name: 'button',
      type: 'group',
      label: 'Button',
      fields: [
        { name: 'label', type: 'text', required: true, defaultValue: 'Learn More' },
        { name: 'url', type: 'text', required: true, defaultValue: '#' },
      ],
    },
  ],
}
