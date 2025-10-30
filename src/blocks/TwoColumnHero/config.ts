import type { Block } from 'payload'

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
    {
      name: 'primaryButton',
      type: 'group',
      label: 'Primary Button',
      fields: [
        { name: 'label', type: 'text', required: true, defaultValue: 'Get Started' },
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
