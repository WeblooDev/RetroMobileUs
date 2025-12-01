import type { Block } from 'payload'

export const QuickDownloads: Block = {
  slug: 'quickDownloads',
  interfaceName: 'QuickDownloads',
  labels: { singular: 'Quick Downloads', plural: 'Quick Downloads' },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Heading',
      defaultValue: 'Quick Downloads',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Rows',
      minRows: 1,
      maxRows: 20,
      labels: { singular: 'Row', plural: 'Rows' },
      admin: { initCollapsed: false },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Left Image',
        },
        {
          name: 'subtitle',
          type: 'text',
          required: true,
          label: 'Subtitle (e.g., SHOW FLOOR MAP (PDF))',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          admin: { rows: 3 },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'file',
              type: 'upload',
              relationTo: 'media',
              label: 'File to Download (preferred)',
            },
            {
              name: 'externalUrl',
              type: 'text',
              label: 'External URL (fallback if no file)',
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'linkLabel',
              type: 'text',
              label: 'Link Label',
              defaultValue: 'DOWNLOAD',
            },
            {
              name: 'newTab',
              type: 'checkbox',
              label: 'Open in new tab',
              defaultValue: false,
            },
          ],
        },
      ],
      defaultValue: [
        {
          subtitle: 'SHOW FLOOR MAP (PDF)',
          description:
            'Download the full layout of the Rétromobile USA exhibition, including entrances, exhibitor zones, food areas, restrooms, and feature displays.',
          linkLabel: 'DOWNLOAD',
        },
        {
          subtitle: 'FULL DAILY AGENDA (PDF)',
          description:
            'Get a complete day-by-day schedule of events, showcases, panels, and special appearances to help plan your visit.',
          linkLabel: 'DOWNLOAD',
        },
      ],
    },
  ],
}

export default QuickDownloads
