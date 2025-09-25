import type { Block } from 'payload'

export const CustomHeroBlock: Block = {
  slug: 'customhero',
  interfaceName: 'CustomHeroBlock',
  labels: {
    singular: 'Custom Hero',
    plural: 'Custom Heroes',
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
      name: 'leftText',
      type: 'text',
      required: true,
    },
    {
      name: 'rightSmallText',
      type: 'text',
    },
    {
      name: 'titleLine1',
      type: 'text',
      required: true,
    },
    {
      name: 'titleLine2',
      type: 'text',
      required: true,
    },
    {
      name: 'link',
      type: 'text',
    },
    {
      name: 'linkText',
      type: 'text',
      defaultValue: 'Discover More',
    },
  ],
}
