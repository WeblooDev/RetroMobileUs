import type { Block } from 'payload'
import { TextSlice } from './slices/TextSlice'
import { ImageSlice } from './slices/ImageSlice'

export const BlogTwoColumn: Block = {
  slug: 'blogTwoColumn',
  interfaceName: 'BlogTwoColumn',
  labels: { singular: 'Two Column Body', plural: 'Two Column Body' },
  fields: [
    {
      name: 'left',
      label: 'Left Slices',
      type: 'blocks',
      required: true,
      minRows: 1,
      blocks: [TextSlice, ImageSlice],
    },
    {
      name: 'right',
      label: 'Right Sidebar',
      type: 'group',
      fields: [
        {
          name: 'relatedPosts',
          type: 'relationship',
          relationTo: 'posts' as const,
          hasMany: true,
          maxRows: 3,
          minRows: 1,
          admin: { description: 'Pick up to 3 related posts' },
          filterOptions: ({ id }) => ({ id: { not_in: [id] } }),
        },
      ],
    },
  ],
}
