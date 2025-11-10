// src/payload/blocks/ContactBanner.ts
import type { Block } from 'payload'
import { link } from '@/fields/link'

export const ContactBanner: Block = {
  slug: 'contactBanner',
  interfaceName: 'ContactBanner',
  labels: { singular: 'Contact Banner', plural: 'Contact Banners' },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Questions? We’re Here.',
      label: 'Banner Title',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle (optional)',
    },
  
    {
      name: 'phone',
      type: 'text',
      label: 'Contact Phone (optional)',
      defaultValue: '(888) 123-4567',
      admin: { description: 'Shown as text; auto-formatted for tel: link.' },
    },
    {
      name: 'backgroundColor',
      type: 'text',
      label: 'Background Color',
      defaultValue: '#8B9B5C',
    },
    link({
      overrides: {
        name: 'button',
        label: 'Button',
      },
    }),
  ],
}
