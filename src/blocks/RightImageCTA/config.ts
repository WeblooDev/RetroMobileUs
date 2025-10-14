import type { Block } from 'payload'
import { linkGroup } from '@/fields/linkGroup'

export const RightImageCTA: Block = {
  slug: 'rightImageCTA',
  interfaceName: 'RightImageCTA',
  labels: { singular: 'Right Image CTA', plural: 'Right Image CTAs' },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
      defaultValue: 'Shared Values',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      defaultValue:
        'We work with partners who care about legacy, innovation, and giving back. Whether it’s supporting youth training or celebrating automotive history, we build partnerships with purpose.',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Right Image',
    },

    linkGroup({
      appearances: false,
      overrides: {
        name: 'cta',
        label: 'CTA',
        minRows: 0,
        maxRows: 1,
        admin: { initCollapsed: false },
      },
    }),
  ],
}

export default RightImageCTA
