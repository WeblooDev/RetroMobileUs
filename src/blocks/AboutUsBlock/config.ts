import type { Block } from 'payload'

const AboutUsBlock: Block = {
  slug: 'aboutUsBlock',
  labels: {
    singular: 'About Us Block',
    plural: 'About Us Blocks',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
    },
    {
      name: 'button',
      type: 'group',
      label: 'Button',
      fields: [
        {
          name: 'label',
          label: 'Button Label',
          type: 'text',
        },
        {
          name: 'href',
          label: 'Button Link (URL)',
          type: 'text',
        },
      ],
    },
    {
      name: 'image',
      label: 'Car Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}

export default AboutUsBlock
