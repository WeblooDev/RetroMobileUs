import type { Block } from 'payload'

const ProgramHighlight: Block = {
  slug: 'programHighlight',
  interfaceName: 'ProgramHighlight',
  labels: { singular: 'Program Highlight', plural: 'Program Highlights' },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Title' },
    { name: 'intro', type: 'textarea', required: true, label: 'Intro' },
    {
      name: 'bullets',
      type: 'array',
      required: true,
      minRows: 1,
      label: 'Bullets',
      fields: [{ name: 'text', type: 'text', required: true, label: 'Text' }],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Image',
      admin: { description: 'Displayed at 351/195 aspect.' },
    },
  ],
}

export default ProgramHighlight
