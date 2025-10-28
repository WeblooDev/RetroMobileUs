import type { Block } from 'payload'
import { linkGroup } from '@/fields/linkGroup'

export const StayClose: Block = {
  slug: 'stayClose',
  interfaceName: 'StayClose',
  labels: { singular: 'Stay Close', plural: 'Stay Close' },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
      defaultValue: 'Stay Close to the Action',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
       required: true, 
      admin: { rows: 3 },
      defaultValue:
        'We’ve partnered with nearby hotels offering exclusive rates. All are within walking distance of the venue.',
    },
    {
      name: 'slides',
      type: 'array',
      label: 'Carousel Slides',
      required: true, 
      minRows: 1,
      maxRows: 12,
      fields: [
        { name: 'title', type: 'text', label: 'Small Title' },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Image',
        },
      ],
      defaultValue: [
        { title: 'JW Marriott LA Live' },
        { title: 'Downtown Classic Interior' },
        { title: 'Rally Ready' },
      ],
    },
  
  ],
}

export default StayClose
