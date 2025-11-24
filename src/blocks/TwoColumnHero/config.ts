// src/blocks/TwoColumnHero/config.ts
import type { Block } from 'payload'
import { link } from '@/fields/link'

export const TwoColumnHero: Block = {
  slug: 'twoColumnHero',
  interfaceName: 'TwoColumnHero', // generate TS type for the component
  labels: {
    singular: 'Two-Column Hero',
    plural: 'Two-Column Heroes',
  },
  fields: [
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
      required: true,
    },
    {
      name: 'leftTitle',
      type: 'text',
      label: 'Left Title',
      required: true,
    },

    // Primary button (using shared link field)
    link({
      overrides: {
        name: 'primaryButton',
        label: 'Primary Button',
        required: true,
        defaultValue: {
          type: 'custom',
          url: '#',
          label: 'Get Started',
        },
      },
    }),

    link({
      overrides: {
        name: 'secondaryButton',
        label: 'Secondary Button',
        required: true,
        defaultValue: {
          type: 'custom',
          url: '#',
          label: 'Learn More',
        },
      },
    }),

    {
      name: 'rightHeading',
      type: 'text',
      label: 'Right Heading (big number/word)',
      required: true,
    },
    {
      name: 'rightParagraph',
      type: 'text',
      label: 'Right Paragraph (uppercase line)',
      required: true,
    },
  ],
}

export default TwoColumnHero
