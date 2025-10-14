import type { Block } from 'payload'

export const ImageOverlayText: Block = {
  slug: 'imageOverlayText',
  interfaceName: 'ImageOverlayText',
  labels: { singular: 'Image Overlay Text', plural: 'Image Overlay Text' },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Heading',
      defaultValue: 'Available at the Show or Online',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Body',
      admin: { rows: 2 },
      defaultValue:
        'You can shop in person at the Rétromobile Boutique or order online and have your collectibles shipped to your door.',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Background Image',
    },
  ],
}

export default ImageOverlayText
