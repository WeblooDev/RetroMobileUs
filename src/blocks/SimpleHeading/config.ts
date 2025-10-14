// src/payload/blocks/SimpleHeading.ts
import type { Block } from 'payload'

export const SimpleHeading: Block = {
  slug: 'simpleHeading',
  interfaceName: 'SimpleHeading', // <- generates a named TS interface
  labels: { singular: 'Simple Heading', plural: 'Simple Headings' },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'History of Retromobile',
      label: 'Heading Title',
    },
    {
      name: 'backgroundColor',
      type: 'text',
      label: 'Background Color',
      defaultValue: '#8B9B5C',
    },
  ],
}
export default SimpleHeading
