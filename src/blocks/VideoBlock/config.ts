import type { Block } from 'payload'

export const VideoBlock: Block = {
  slug: 'videoblock', // ✅ one word, no hyphen
  interfaceName: 'VideoBlock',
  labels: {
    singular: 'Video Block',
    plural: 'Video Blocks',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'text',
      label: 'Description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'buttonText',
      label: 'Button Text',
      type: 'text',
      required: true,
    },
    {
      name: 'buttonLink',
      label: 'Button Link',
      type: 'text',
      required: true,
    },
    {
      name: 'video',
      label: 'Video File',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'poster',
      label: 'Poster Image (optional)',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
  ],
}
