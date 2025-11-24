// src/blocks/HubspotFormBlock/config.ts
import type { Block } from 'payload'

export const HubspotFormBlock: Block = {
  slug: 'hubspotFormBlock',
  interfaceName: 'HubspotFormBlock',
  labels: {
    singular: 'HubSpot Form Block',
    plural: 'HubSpot Form Blocks',
  },
  fields: [
    { name: 'title', type: 'text', label: 'Title', required: true },
    { name: 'text', type: 'textarea', label: 'Text' },
  ],
}

export default HubspotFormBlock 
