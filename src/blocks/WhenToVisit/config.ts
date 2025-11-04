import type { Block } from 'payload'

export const WhenToVisit: Block = {
  slug: 'whenToVisit',
  interfaceName: 'WhenToVisit',
  labels: { singular: 'When To Visit', plural: 'When To Visit' },
  fields: [
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
      required: true,
    },
    { name: 'title', type: 'text', required: true, defaultValue: 'When to visit' },
    { name: 'subtitle', type: 'text', required: true, defaultValue: 'This four day edition marks the conclusion of the international collector car season, hosted in the heart of Manhattan.' },
    { name: 'month', type: 'text', required: true, defaultValue: 'MARCH' },
    { name: 'dateRange', type: 'text', required: true, defaultValue: '21–23' },
    { name: 'year', type: 'number', required: true, defaultValue: 2025 },
    { name: 'openHour', type: 'text', required: true, defaultValue: '09' },
    { name: 'closeHour', type: 'text', required: true, defaultValue: '06' },
    { name: 'bandColor', type: 'text', required: false, defaultValue: '#8B9B5C' },
  ],
}
export default WhenToVisit
