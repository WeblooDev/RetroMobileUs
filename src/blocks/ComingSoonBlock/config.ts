// src/blocks/ComingSoonBlock/config.ts
import type { Block } from 'payload'
import { link } from '@/fields/link'

export const ComingSoonBlock: Block = {
  slug: 'comingSoonBlock',
  interfaceName: 'ComingSoonBlock',
  labels: { singular: 'Coming Soon Block', plural: 'Coming Soon Blocks' },
  fields: [
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Background Image',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'The Future is Coming Soon',
      label: 'Title',
    },

    // Countdown date
    {
      type: 'row',
      fields: [
        {
          name: 'countdownMonth',
          type: 'select',
          required: true,
          label: 'Countdown Month',
          defaultValue: '12',
          options: [
            { label: 'January', value: '1' },
            { label: 'February', value: '2' },
            { label: 'March', value: '3' },
            { label: 'April', value: '4' },
            { label: 'May', value: '5' },
            { label: 'June', value: '6' },
            { label: 'July', value: '7' },
            { label: 'August', value: '8' },
            { label: 'September', value: '9' },
            { label: 'October', value: '10' },
            { label: 'November', value: '11' },
            { label: 'December', value: '12' },
          ],
          admin: { width: '50%' },
        },
        {
          name: 'countdownDay',
          type: 'number',
          required: true,
          label: 'Countdown Day',
          min: 1,
          max: 31,
          defaultValue: 31,
          admin: {
            width: '50%',
            description:
              'Day of month (1–31). The component will clamp to valid days for the chosen month.',
          },
        },
      ],
    },

    {
      name: 'countdownTopText',
      type: 'text',
      label: 'Text Above Day (optional)',
    },
    {
      name: 'displayDayOverride',
      type: 'text',
      label: 'Override Day (optional, e.g., "19–22")',
      admin: { description: 'If set, replaces the numeric day.' },
    },
    {
      name: 'displayMonthYearOverride',
      type: 'text',
      label: 'Override Month & Year (optional, e.g., "NOVEMBER 2026")',
      admin: { description: 'If set, replaces the automatic MONTH + YEAR.' },
    },

    // Buttons using shared link field
    link({
      overrides: {
        name: 'primaryButton',
        label: 'Primary Button',
        required: false,
        admin: {
          description: 'Main CTA (used for the BUY TICKET / early access button).',
        },
      },
    }),

    link({
      overrides: {
        name: 'secondaryButton',
        label: 'Secondary Button',
        required: false,
        admin: {
          description: 'Secondary CTA button.',
        },
      },
    }),
  ],
}

export default ComingSoonBlock
