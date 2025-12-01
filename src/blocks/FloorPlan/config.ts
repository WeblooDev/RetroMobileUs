import type { Block } from 'payload'
import { linkGroup } from '@/fields/linkGroup'

export const FloorPlan: Block = {
  slug: 'floorPlan',
  interfaceName: 'FloorPlan',
  labels: { singular: 'Floor Plan', plural: 'Floor Plans' },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Heading',
      defaultValue: 'Floor Plan',
    },
    {
      name: 'description',
      type: 'text',
      label: 'Small description (optional)',
      defaultValue: 'View the full layout of the Los Angeles Convention Center, including:',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Highlights',
      minRows: 1,
      maxRows: 12,
      labels: { singular: 'Item', plural: 'Items' },
      admin: { initCollapsed: false },
      fields: [{ name: 'subtitle', type: 'text', required: true, label: 'Text' }],
      defaultValue: [
        { subtitle: 'Entrance & Check-in' },
        { subtitle: 'Exhibition Halls (Classic Cars, Art Gallery, Restoration Zone)' },
        { subtitle: 'Live Auction Stage' },
        { subtitle: 'VIP Lounge' },
        { subtitle: 'Rétromobile Boutique' },
        { subtitle: 'Food & Beverage Areas' },
        { subtitle: 'Restrooms and Accessibility Points' },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Side Image',
    },
    // Up to two CTAs; the first renders olive, the second black
    linkGroup({
      appearances: false,
      overrides: {
        name: 'links',
        label: 'CTAs',
        minRows: 0,
        maxRows: 2,
        admin: { initCollapsed: true },
      },
    }),
    {
      name: 'reverseLayout',
      type: 'checkbox',
      label: 'Image on right (default on)',
      defaultValue: true,
    },
  ],
}

export default FloorPlan
