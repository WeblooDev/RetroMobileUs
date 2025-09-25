import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { CollectionConfig } from 'payload'
import slugify from 'slugify'

export const Cars: CollectionConfig = {
  slug: 'cars',
  labels: {
    singular: 'Car',
    plural: 'Cars',
  },
  admin: {
    useAsTitle: 'model',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'model',
      type: 'text',
      required: true,
    },
    {
      name: 'trim',
      type: 'text',
      label: 'Trim',
      required: false,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        hidden: true,
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      required: false,
    },
    {
      name: 'year',
      type: 'number',
      defaultValue: new Date().getFullYear(),
      required: true,
    },
    {
      name: 'price',
      type: 'number',
      label: 'Price',
      defaultValue: 0,
      required: true,
    },
    {
      name: 'msrp',
      type: 'number',
      label: 'MSRP',
      defaultValue: 0,
      required: false,
    },
    {
      name: 'annualMileage',
      type: 'number',
      label: 'Annual Mileage',
      defaultValue: 0,
      required: false,
    },
    {
      name: 'term',
      type: 'number',
      label: 'Term (in months)',
      defaultValue: 0,
      required: false,
    },
    {
      name: 'downPayment',
      type: 'number',
      label: 'Down Payment',
      defaultValue: 0,
      required: true,
    },
    {
      name: 'leaseType',
      type: 'select',
      label: 'Lease Type',
      options: [
        { label: 'Monthly Lease', value: 'monthly' },
        { label: 'Single-Pay Lease', value: 'single-pay' },
      ],
      defaultValue: 'monthly',
      required: true,
      admin: {
        description: 'Choose how this vehicle will be leased',
      },
    },
    {
      name: 'onePayAmount',
      type: 'number',
      label: 'One-Pay Lease Amount',
      admin: {
        condition: (data) => data.leaseType === 'single-pay',
        description: 'Enter the total one-pay lease amount (upfront)',
        placeholder: 'e.g., 49900',
      },
    },
    {
      name: 'ttlAmount',
      type: 'number',
      label: 'TTL (Tax, Title, License) Amount',
      admin: {
        condition: (data) => data.leaseType === 'single-pay',
        description: 'Optional: Enter specific TTL amount, or leave blank to show "+TTL"',
        placeholder: 'e.g., 4500',
      },
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Primary Image',
      // required: true,
      relationTo: 'media',
      admin: {
        description:
          'Main image for the vehicle (legacy field - consider using Images Gallery below for multiple photos)',
      },
    },
    {
      name: 'images',
      type: 'array',
      label: 'Images Gallery',
      admin: {
        description:
          'Upload multiple images for this vehicle. You can select and upload multiple files at once.',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Select multiple files to upload them all at once',
          },
        },
        {
          name: 'alt',
          type: 'text',
          label: 'Alt Text',
          admin: {
            description: 'Alternative text for accessibility (optional)',
          },
        },
      ],
    },
    {
      name: 'availability',
      type: 'select',
      options: [
        { label: 'Available', value: 'available' },
        { label: 'Sold', value: 'sold' },
        { label: 'New Arrival', value: 'new_arrival' },
        { label: 'Best Deal', value: 'best_deal' },
      ],
      defaultValue: 'available',
      required: true,
    },
    {
      name: 'condition',
      type: 'select',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Preowned/CPO lease', value: 'preowned' },
        { label: 'Demo/Loaner', value: 'demo' },
      ],
      defaultValue: 'new',
      required: true,
    },
    {
      name: 'brand',
      type: 'relationship',
      relationTo: 'brands',
      // required: true,
    },
    {
      name: 'lease_term',
      type: 'number',
      label: 'Enter the lease term in months',
      defaultValue: 0,
    },
    {
      name: 'hidePrice',
      type: 'checkbox',
      label: 'Hide Price (Show "Contact for Price" instead)',
      defaultValue: false,
      required: true,
      admin: {
        description:
          'When enabled, the price will be hidden and "Contact for Price" will be displayed instead.',
      },
    },
    {
      name: 'hidden',
      type: 'checkbox',
      label: 'Hide this car from the listings',
      defaultValue: false,
      required: true,
    },
    {
      name: 'notes',
      type: 'array',
      label: 'Lease Notes',
      admin: {
        description: 'Add custom notes that will appear in the Details section',
      },
      fields: [
        {
          name: 'note',
          type: 'text',
          label: 'Note Text',
          required: true,
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data.model) {
          data.slug = slugify(data.model, { lower: true, strict: true })
        }
        return data
      },
    ],
  },
}
