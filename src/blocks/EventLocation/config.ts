// src/payload/blocks/EventLocation.ts
import type { Block } from 'payload'
import { linkGroup } from '@/fields/linkGroup'

export const EventLocation: Block = {
  slug: 'eventLocation',
  interfaceName: 'EventLocation', // <-- generates a named TS interface
  labels: { singular: 'Event Location', plural: 'Event Locations' },
  fields: [
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Background Image',
    },
    {
      name: 'ribbonText',
      type: 'text',
      required: true,
      defaultValue: 'Where it’s happening',
      label: 'Ribbon Text (top left)',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Javits Convention Center, New York City',
      label: 'Center Title',
    },

    linkGroup({
      appearances: false,
      overrides: {
        name: 'ctas',
        label: 'CTA(s)',
        minRows: 0,
        admin: { initCollapsed: false },
      },
    }),
  ],
}
export default EventLocation
