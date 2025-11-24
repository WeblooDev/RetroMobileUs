import type { GlobalConfig } from 'payload'
import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
      admin: {
        hidden: true,
      },
    },
    {
      name: 'secondaryDescription',
      type: 'textarea',
      required: false,
      admin: {
        hidden: true,
      },
    },

    // Social icons (already there)
    {
      name: 'icons',
      label: 'Social Icons',
      type: 'array',
      required: false,
      fields: [
        {
          name: 'label',
          label: 'Icon Label',
          type: 'text',
          required: false,
          admin: {
            placeholder: 'e.g., Instagram, LinkedIn, YouTube',
          },
        },
        {
          name: 'icon',
          label: 'Icon Image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'url',
          label: 'Icon URL',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'https://your-link.com',
          },
        },
      ],
    },

    // ✅ NEW – partner logos (Comexposium, duPont Registry, etc.)
    {
      name: 'partnerLogos',
      label: 'Partner Logos',
      type: 'array',
      required: false,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'label',
          label: 'Partner Name',
          type: 'text',
          required: false,
          admin: {
            placeholder: 'e.g., Comexposium',
          },
        },
        {
          name: 'logo',
          label: 'Partner Logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'url',
          label: 'Partner URL',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'https://www.partner-site.com',
          },
        },
      ],
    },

    {
      name: 'cta',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: false,
        },
        link({
          appearances: false,
        }),
      ],
    },
    {
      name: 'copyright',
      label: 'Copyright Text',
      type: 'text',
      required: false,
      admin: {
        description:
          'Enter full copyright line (e.g., © 2025 Your Brand. All rights reserved.)',
      },
    },
    {
      name: 'linkGroups',
      type: 'array',
      required: false,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'links',
          type: 'array',
          admin: {
            initCollapsed: true,
          },
          fields: [
            link({
              appearances: false,
            }),
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
