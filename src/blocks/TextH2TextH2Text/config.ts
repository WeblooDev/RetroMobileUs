
import type { Block } from 'payload'

export const TextH2TextH2Text: Block = {
  slug: 'textH2TextH2Text',
  interfaceName: 'TextH2TextH2Text',
  labels: { singular: 'Text • H2 • Text • H2 • Text', plural: 'Text • H2 • Text • H2 • Text' },
  fields: [
    {
      name: 'intro',
      type: 'textarea',
      required: true,
      label: 'Intro Text (top paragraph)',
    },
    {
      name: 'intro2',
      type: 'textarea',
      required: true,
      label: 'Intro Text (top paragraph)',
    },
    {
      name: 'heading1',
      type: 'text',
      required: true,
      label: 'Heading 1 (H2)',
    },
    {
      name: 'body1',
      type: 'textarea',
      required: true,
      label: 'Body 1 (paragraph under Heading 1)',
    },
    {
      name: 'heading2',
      type: 'text',
      required: true,
      label: 'Heading 2 (H2)',
    },
    {
      name: 'body2',
      type: 'textarea',
      required: true,
      label: 'Body 2 (paragraph under Heading 2)',
    },
  ],
}

export default TextH2TextH2Text
