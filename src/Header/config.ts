// globals/Header.ts
import type { GlobalConfig } from 'payload'
import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: { read: () => true },
  fields: [
    {
      name: 'banner',
      label: 'Top Banner',
      type: 'group',
      admin: { description: 'Optional announcement banner above the header.' },
      fields: [
        {
          name: 'enabled',
          label: 'Show Banner',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'p1',
          label: 'Banner Line 1',
          type: 'text',
          admin: { placeholder: 'e.g., Early-bird tickets end Friday' },
        },
        {
          name: 'p2',
          label: 'Banner Line 2',
          type: 'text',
          admin: { placeholder: 'e.g., Use code WELCOME10 at checkout' },
        },
      ],
    },

    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: { position: 'sidebar' },
    },

    {
      name: 'navItems',
      label: 'Navigation Items',
      type: 'array',
      minRows: 1,
      maxRows: 12,
      fields: [
         link({
      overrides: {
        name: 'link',
        label: 'Top-level link',
        required: false, // allow "pure dropdown" items
      },
    }),
        {
          name: 'dropdownLinks',
          label: 'Dropdown Links',
          type: 'array',
          minRows: 0,
          maxRows: 50,
          fields: [
            link({
          overrides: {
            name: 'link',
            label: 'Dropdown link',
            required: true,
          },
        }),
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
