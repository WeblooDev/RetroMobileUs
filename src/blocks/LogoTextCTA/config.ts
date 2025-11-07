import type { Block } from 'payload'
import { link } from '@/fields/link'

export const LogoTextCTA: Block = {
  slug: 'logoTextCTA',
  interfaceName: 'LogoTextCTA',
  labels: { singular: 'Logo + Text CTA', plural: 'Logo + Text CTAs' },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Left Image / Logo',
    },
    { name: 'imageAlt', type: 'text', label: 'Image Alt' },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
      defaultValue: "About Gooding Christie's",
    },
    { name: 'description', type: 'textarea', label: 'Description', required: true },

    link({
      appearances: ['default'],
      disableLabel: false,
      overrides: {
        name: 'cta',
        label: 'CTA Link',
        admin: { description: 'Optional call-to-action link.' },
      },
    }),

    {
      name: 'reverse',
      type: 'checkbox',
      label: 'Reverse layout (image right, text left)',
      defaultValue: false,
    },
  ],
}

export default LogoTextCTA
