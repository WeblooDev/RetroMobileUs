import type { GlobalConfig } from 'payload'
import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader' // keep if you have it

export const Header: GlobalConfig = {
  slug: 'header', // or 'nav' — must match Component.tsx getCachedGlobal
  access: { read: () => true },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: { position: 'sidebar' },
    },
    {
      name: 'navItems',
      label: 'Navigation Items',
      type: 'array',
      minRows: 1,
      maxRows: 12,
        fields: [
          // Top-level item (can be a link OR a dropdown)
          {
            name: 'label',
            type: 'text',
            required: true,
          },
          {
            name: 'url',
            type: 'text',
            required: false,
            admin: {
              description: 'If you leave this empty and add dropdownLinks below, this becomes a dropdown.',
            },
          },
          {
            name: 'dropdownLinks',
            label: 'Dropdown Links',
            type: 'array',
            minRows: 0,
            maxRows: 50,
            fields: [
              {
                name: 'label',
                type: 'text',
                required: true,
              },
              {
                name: 'url',
                type: 'text',
                required: true,
              },
            ],
            admin: {
              initCollapsed: true,
              description: 'If any items exist here, this nav item will render as a dropdown.',
            },
          },
        ],
      },
    {
      name: 'ctaLink',
      label: 'Primary CTA',
      type: 'group',
      fields: [link({ appearances: false })],
      admin: { description: 'e.g., "Buy Ticket"' },
    },
    {
      name: 'secondaryCTA',
      label: 'Secondary CTA',
      type: 'group',
      fields: [link({ appearances: false })],
      admin: { description: 'e.g., "Apply to Exhibit"' },
    },
  ],
  hooks: { afterChange: [revalidateHeader] },
}
