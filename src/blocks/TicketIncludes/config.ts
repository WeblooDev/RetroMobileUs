import type { Block } from 'payload'
import { linkGroup } from '@/fields/linkGroup'

export const TicketIncludes: Block = {
  slug: 'ticketIncludes',
  interfaceName: 'TicketIncludes',
  labels: { singular: 'Ticket Includes', plural: 'Ticket Includes' },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Heading',
      defaultValue: 'What Your Ticket Includes',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Inclusions',
      minRows: 1,
      maxRows: 10,
      labels: { singular: 'Item', plural: 'Items' },
      admin: { initCollapsed: false },
      fields: [
        { name: 'subtitle', type: 'text', required: true, label: 'Subtitle' },
        { name: 'text', type: 'text', label: 'Text (optional)' },
      ],
      defaultValue: [
        { subtitle: 'General Admission:', text: 'Access to all exhibitions and live showcases' },
        { subtitle: 'Early Entry Pass:', text: 'Enter 1 hour before the general public' },
        {
          subtitle: 'VIP & Club Access:',
          text: 'Includes VIP lounge, private restrooms, and fast-track entry',
        },
        { subtitle: 'Kids under 12:', text: 'Free with a paying adult' },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Right Image',
    },
    // CTA (first link used)
    linkGroup({
      appearances: false,
      overrides: {
        name: 'links',
        label: 'CTA',
        minRows: 0,
        maxRows: 1,
        admin: { initCollapsed: true },
      },
    }),
  ],
}

export default TicketIncludes
