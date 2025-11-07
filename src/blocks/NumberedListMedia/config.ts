import type { Block } from 'payload'

const NumberedListMedia: Block = {
  slug: 'numberedListMedia',
  interfaceName: 'NumberedListMedia',
  labels: { singular: 'Numbered list + media', plural: 'Numbered list + media' },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Title' },
    { name: 'subtext', type: 'text', required: true, label: 'Subtext' },
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
    },
  ],
}

export default NumberedListMedia
