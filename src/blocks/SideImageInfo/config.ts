import type { Block } from 'payload'

export const SideImageInfo: Block = {
  slug: 'sideImageInfo',
  interfaceName: 'SideImageInfo',
  labels: { singular: 'Side Image + Info', plural: 'Side Image + Info' },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      defaultValue: 'Where to Park',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Text',
      admin: { rows: 4 },
      required: true,
      defaultValue:
        'Parking is available at the Convention Center and surrounding garages. Rates typically range from $10–25 per day.\n\nClassic car exhibitors may receive priority parking (details provided via exhibitor package).',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Left Image',
      required: true,
    },
  ],
}
