import type { GlobalConfig } from 'payload'
import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'navItems',
      label: 'Navigation Items',
      type: 'array',
      minRows: 1,
      maxRows: 10,
      fields: [
        link({ appearances: false }), // Main navigation link
        {
          name: 'children',
          label: 'Dropdown Sections',
          type: 'array',
          required: false,
          admin: {
            condition: (_, siblingData) => !!siblingData?.link?.label,
            initCollapsed: true,
            description:
              'Define dropdown sections that appear when hovering over the main navigation item.',
          },
          fields: [
            {
              name: 'title',
              label: 'Section Title',
              type: 'text',
              required: true,
            },
            {
              name: 'link',
              label: 'Section Title Link',
              type: 'group',
              fields: [link({ appearances: false })],

              admin: {
                description: 'Optional link for the section title.',
              },
            },
            {
              name: 'description',
              label: 'Section Description',
              type: 'text',
              required: false,
            },
            {
              name: 'links',
              label: 'Sub-links',
              type: 'array',
              required: false, // ✅ now optional
              minRows: 0,
              maxRows: 20,
              fields: [link({ appearances: false })],
            },
          ],
        },
      ],
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'ctaLink',
      label: 'Call-to-Action Link',
      type: 'group',
      fields: [link({ appearances: false })],
      admin: {
        description: 'e.g., "Sign Up", "Get Started", etc.',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
