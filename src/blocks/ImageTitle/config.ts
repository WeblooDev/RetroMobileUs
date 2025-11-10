import type { Block } from 'payload'
import { link } from '@/fields/link'

export const ImageTitle: Block = {
  slug: 'imageTitle',
  interfaceName: 'ImageTitle',
  labels: { singular: 'Image Title', plural: 'Image Titles' },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      required: false,
      label: 'Top Text (Eyebrow)',
      admin: { placeholder: 'e.g., Accessibility & Services' },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Heading',
      defaultValue: 'We’re Accessible to All',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Body',
      required: true,
      admin: { rows: 3 },
      defaultValue:
        'The venue is fully ADA-compliant. Wheelchair rental, accessible restrooms, and assisted entry lanes are available. For specific assistance, contact our team in advance.',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Right Image',
    },

    link({
      overrides: {
        name: 'button',
        label: 'Button',
      },
    }),
  ],
}

export default ImageTitle
