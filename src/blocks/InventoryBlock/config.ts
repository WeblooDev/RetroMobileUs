import type { Block } from 'payload'

export const InventoryBlock: Block = {
  slug: 'inventoryBlock',
  interfaceName: 'InventoryBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Inventory Title (Title Line Top Left side)',
    },
    {
      name: 'description',
      type: 'text',
      required: true,
      label: 'Inventory Collection description (description text Top Right side)',
    },
  ],
  labels: {
    plural: 'Inventory Block',
    singular: 'Inventory Block',
  },
}
