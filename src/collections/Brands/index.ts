import { CollectionConfig } from 'payload'
import slugify from 'slugify'

export const Brands: CollectionConfig = {
  slug: 'brands',
  labels: {
    singular: 'Brand',
    plural: 'Brands',
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        hidden: true,
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'cars',
      type: 'relationship',
      relationTo: 'cars',
      hasMany: true,
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data.name) {
          data.slug = slugify(data.name, { lower: true, strict: true })
        }
        return data
      },
    ],
  },
}
