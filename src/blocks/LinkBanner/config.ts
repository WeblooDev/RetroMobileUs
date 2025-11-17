import type { Block } from 'payload'
import { linkGroup } from '@/fields/linkGroup'

export const LinkBanner: Block = {
  slug: 'linkBanner',
  interfaceName: 'LinkBanner',
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
      required: true,
      label: 'Paragraph',
    },
    linkGroup({
      appearances: false,
      overrides: {
        name: 'ctas',
        label: 'Right Link',
        minRows: 0,
        required: true,
        maxRows: 1,
        admin: { initCollapsed: false },
      },
    }),
    {
      name: 'image',
      type: 'upload',
      required: true,
      relationTo: 'media',
      label: 'Left Image / Logo',
    },
    {
      name: 'linkBgColor',
      type: 'text',
      required: true,
      label: 'Link Background Color',
      defaultValue: '#8B9B5C',
    },
  ],
}
export default LinkBanner
