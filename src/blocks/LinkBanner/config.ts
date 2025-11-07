// src/payload/blocks/LinkBanner.ts
import type { Block } from 'payload'
import { linkGroup } from '@/fields/linkGroup'

export const LinkBanner: Block = {
  slug: 'linkBanner',
  interfaceName: 'LinkBanner', // generates a named TS interface you can import
  labels: { singular: 'Link Banner', plural: 'Link Banners' },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Left Heading (H3)',
      defaultValue: 'Retromobile Paris',
    },

    {
      name: 'paragraph',
      type: 'text',
      label: 'Paragraph',
      
    },
    linkGroup({
      appearances: false,
      overrides: {
        name: 'ctas',
        label: 'Right Link',
        minRows: 0,
        maxRows: 1,
        admin: { initCollapsed: false },
      },
    }),

    // Style for the link pill
    {
      name: 'linkBgColor',
      type: 'text',
      label: 'Link Background Color',
      defaultValue: '#8B9B5C',
    },

    // Optional right image/logo
    {
      name: 'rightImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Optional Right Image / Logo',
    },
  ],
}
export default LinkBanner
