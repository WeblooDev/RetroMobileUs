import type { Block } from 'payload'

export const ExhibitorActivities: Block = {
  slug: 'exhibitorActivities',
  interfaceName: 'ExhibitorActivities',
  labels: { singular: 'Exhibitor Activity', plural: 'Exhibitor Activities' },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Heading',
      defaultValue: 'Exhibitor Activities',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Activities',
      required: true,
      minRows: 1,
      maxRows: 12,
      fields: [
        { name: 'title', type: 'text', required: true, label: 'Activity Title' },
        { name: 'date', type: 'text', label: 'Date (e.g. Tuesday, Feb 4, 2025)' },
        { name: 'time', type: 'text', label: 'Time (e.g. 17:45 - 18:00)' },
        { name: 'event', type: 'text', label: 'Event (e.g. Rétromobile)' },
        { name: 'location', type: 'text', label: 'Location (e.g. Pavilion 1)' },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Activity Image',
        },
      ],
    },
  ],
}

export default ExhibitorActivities
