import type { Block } from 'payload'

export const TeamGrid: Block = {
  slug: 'teamGrid',
  interfaceName: 'TeamGrid',
  labels: { singular: 'Team Grid', plural: 'Team Grids' },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      required: true,
      defaultValue: 'Our Team',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Section Description',
      admin: { rows: 3 },
      required: true,
      defaultValue:
        'Our mission is to honor that legacy by creating an unforgettable experience for exhibitors and guests—where stories are shared, history is preserved, and new chapters are written.',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Team Members',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Name',
          required: true,
        },
        {
          name: 'role',
          type: 'text',
          label: 'Role / Subtitle',
          required: true,
        },
        {
          name: 'bio',
          type: 'textarea',
          label: 'Short Description',
          admin: { rows: 3 },
          required: true,
        },
        {
          name: 'photo',
          type: 'upload',
          relationTo: 'media',
          label: 'Photo',
          required: true,
        },
        {
          name: 'hobDescription',
          type: 'text',
          label: 'Hob Description',
          required: false, // optional
        },
        {
          name: 'email',
          type: 'email',
          label: 'Gmail',
          required: true, // required for all members
        },
      ],
      defaultValue: [
        {
          name: 'Gerard Neveu',
          role: 'CEO Retromobile US',
          bio: 'Leading Retromobile US with a focus on memorable guest experiences.',
          email: 'gerard.neveu@example.com',
        },
        {
          name: 'Marion Pradier Sentucq',
          role: 'SVP of Sales & Marketing',
          bio: 'Building partnerships and shaping go-to-market.',
          email: 'marion.pradier@example.com',
        },
        {
          name: 'Christophe Mallette',
          role: 'Sales Specialist',
          bio: 'Helping exhibitors find the perfect fit.',
          email: 'christophe.mallette@example.com',
        },
        {
          name: 'Marie-Laure de Bailliencourt',
          role: 'Head of Communications',
          bio: 'Crafting narratives and media relations.',
          email: 'marie-laure.bailliencourt@example.com',
        },
        {
          name: 'Sale Stojanovic',
          role: 'Head of Operations',
          bio: 'Running the show behind the scenes.',
          email: 'sale.stojanovic@example.com',
        },
      ],
    },
  ],
}

export default TeamGrid
