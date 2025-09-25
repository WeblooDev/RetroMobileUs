import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { CollectionConfig } from 'payload'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'date', 'rating'],
  },
  labels: {
    singular: 'Review',
    plural: 'Reviews',
  },
  fields: [
    {
      name: 'profilePic',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Profile Picture',
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
      label: 'Reviewer Name',
    },
    {
      name: 'address',
      type: 'text',
      required: true,
      unique: true,
      label: 'Reviewer address',
    },
    {
      name: 'date',
      type: 'text',
      required: true,
      label: 'Review Date',
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
      label: 'Star Rating',
      admin: {
        description: 'Rating from 1 to 5 stars',
      },
    },
    {
      name: 'text',
      type: 'textarea',
      required: true,
      label: 'Review Text',
    },
  ],
}
