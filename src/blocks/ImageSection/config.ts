import type { Block } from 'payload'

export const ImageSectionBlock: Block = {
  slug: 'image-section',
  interfaceName: 'ImageSectionBlock',
  labels: {
    singular: 'Image Section',
    plural: 'Image Sections',
  },
  fields: [
    {
      name: 'backgroundImage',
      label: 'Background Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'heading',
      label: 'Heading',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'link',
      label: 'Link URL',
      type: 'text',
      required: true,
    },
    {
      name: 'linkText',
      label: 'Link Text',
      type: 'text',
      defaultValue: 'Learn More',
    },
  ],
}
