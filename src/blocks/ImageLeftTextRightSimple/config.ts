import type { Block } from 'payload'

export const ImageLeftTextRightSimple: Block = {
  slug: 'imageLeftTextRightSimple',
  interfaceName: 'ImageLeftTextRightSimple',
  labels: { singular: 'Image Left / Text Right', plural: 'Image Left / Text Right' },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Image',
    },
    {
      name: 'paragraph1',
      type: 'textarea',
      required: true,
      label: 'Paragraph 1',
    },
    {
      name: 'paragraph2',
      type: 'textarea',
      required: false,  
      label: 'Paragraph 2',
    },
  ],
}

export default ImageLeftTextRightSimple
