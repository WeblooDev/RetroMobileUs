import type { Block } from 'payload'
import { linkGroup } from '@/fields/linkGroup'

export const PostsCarousel: Block = {
  slug: 'postsCarousel',
  interfaceName: 'PostsCarousel',
  labels: { singular: 'Posts Carousel', plural: 'Posts Carousels' },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Latest News',
    },

    linkGroup({
      overrides: {
        name: 'viewAll',
        label: 'View All Button',
        required: true,
        minRows: 1,
        maxRows: 1,
        defaultValue: [
          {
            label: 'View All',
            type: 'internal',
            link: '/news',
            appearance: 'default',
            newTab: false,
          },
        ],
      },
    }),
  ],
}
