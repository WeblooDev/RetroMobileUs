import type { Block } from 'payload'
import { linkGroup } from '@/fields/linkGroup'

export const TextCTAImageRight: Block = {
  slug: 'textCtaImageRight',
  interfaceName: 'TextCTAImageRight',
  labels: { singular: 'Text + CTA / Image Right', plural: 'Text + CTA / Image Right' },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Heading',
      defaultValue: 'Ready to make you dream again?',
    },
    { name: 'description', type: 'textarea', label: 'Body', admin: { rows: 3 } },
    { name: 'boldLine', type: 'text', label: 'Bold Line (emphasis)' },

    linkGroup({
      appearances: false,
      overrides: {
        name: 'links',
        label: 'CTA (first link is used)',
        minRows: 0,
        maxRows: 1,
        admin: { initCollapsed: true },
      },
    }),

    { name: 'image', type: 'upload', relationTo: 'media', required: true, label: 'Right Image' },
  ],
}

export default TextCTAImageRight
