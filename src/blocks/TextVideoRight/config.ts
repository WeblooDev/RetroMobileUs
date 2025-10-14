import type { Block } from 'payload'

export const TextVideoRight: Block = {
  slug: 'textVideoRight',
  interfaceName: 'TextVideoRight',
  labels: { singular: 'Text + Video (Right)', plural: 'Text + Video (Right)' },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Heading',
      defaultValue: 'Preview',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Main Paragraph',
      admin: { rows: 4 },
    },
    {
      name: 'smallText1',
      type: 'textarea',
      label: 'Small Text #1',
      admin: { rows: 2 },
    },
    {
      name: 'smallText2',
      type: 'textarea',
      label: 'Small Text #2',
      admin: { rows: 2 },
    },
    {
      name: 'video',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Right Video',
      admin: { description: 'Upload a video file in the Media collection.' },
    },
  ],
}

export default TextVideoRight
