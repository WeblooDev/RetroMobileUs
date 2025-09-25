import type { Block } from 'payload'

const SecondaryHeroBlock: Block = {
  slug: 'secondaryHero',
  labels: {
    singular: 'Secondary Hero',
    plural: 'Secondary Heroes',
  },
  fields: [
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Full-width background image',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Main heading text (e.g. “Everything you Need to Know”)',
      },
    },
  ],
}

export default SecondaryHeroBlock
