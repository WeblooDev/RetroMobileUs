import type { Block } from 'payload'
import { link } from '@/fields/link'

export const VideoCta: Block = {
  slug: 'videoCta',
  interfaceName: 'VideoCta',
  labels: {
    singular: 'Media + CTA',
    plural: 'Media + CTAs',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image (upload)',
      required: true,
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
    link({
      overrides: {
        label: 'Button',
      },
    }),
  ],
}
