import type { Block } from 'payload'

export const ImageLeftCenteredList: Block = {
  slug: 'imageLeftCenteredList',
  interfaceName: 'ImageLeftCenteredList',
  labels: { singular: 'Image Left / Centered List', plural: 'Image Left / Centered Lists' },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Heading',
      defaultValue: 'Make the Most of Your Day',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Bullets',
      minRows: 1,
      maxRows: 12,
      labels: { singular: 'Bullet', plural: 'Bullets' },
      fields: [{ name: 'text', type: 'text', required: true, label: 'Text' }],
      defaultValue: [
        { text: 'Arrive early for best access to limited displays' },
        { text: 'Seating for talks is first come, first served' },
        { text: 'VIP pass holders have reserved access to certain sessions' },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Left Image',
    },
  ],
}

export default ImageLeftCenteredList
