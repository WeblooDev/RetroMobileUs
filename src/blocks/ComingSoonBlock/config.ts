import type { Block } from 'payload'

export const ComingSoonBlock: Block = {
  slug: 'comingSoonBlock',
  interfaceName: 'ComingSoonBlock', // <-- generate TS interface
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
    },
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
        description: 'Day of month (1–31). We will clamp to valid days for the chosen month.',
      },
    },
    {
      name: 'primaryButton',
      type: 'group',
      label: 'Primary Button',
      fields: [
        { name: 'label', type: 'text', required: true, defaultValue: 'Get Early Access' },
        { name: 'url', type: 'text', required: true, defaultValue: '#' },
      ],
    },
    {
      name: 'secondaryButton',
      type: 'group',
      label: 'Secondary Button',
      fields: [
        { name: 'label', type: 'text', required: true, defaultValue: 'Learn More' },
        { name: 'url', type: 'text', required: true, defaultValue: '#' },
      ],
    },
  ],
}

export default ComingSoonBlock
