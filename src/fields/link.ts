import type { Field, GroupField } from 'payload'

import deepMerge from '@/utilities/deepMerge'

export type LinkAppearances = 'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'link'

export const appearanceOptions: Record<LinkAppearances, { label: string; value: string }> = {
  default: { label: 'Default', value: 'default' },
  primary: { label: 'Primary', value: 'primary' },
  secondary: { label: 'Secondary', value: 'secondary' },
  outline: { label: 'Outline', value: 'outline' },
  ghost: { label: 'Ghost', value: 'ghost' },
  link: { label: 'Link', value: 'link' },
}

type LinkType = (options?: {
  appearances?: LinkAppearances[] | false
  disableLabel?: boolean
  overrides?: Partial<GroupField>
}) => Field

export const link: LinkType = ({ appearances, disableLabel = false, overrides = {} } = {}) => {
  const linkResult: GroupField = {
    name: 'link',
    type: 'group',
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            type: 'select',
            admin: {
              width: '50%',
            },
            defaultValue: 'reference',
            options: [
              {
                label: 'Internal link',
                value: 'reference',
              },
              {
                label: 'Custom URL',
                value: 'custom',
              },
              {
                label: 'Email',
                value: 'email',
              },
              {
                label: 'Phone',
                value: 'phone',
              },
              {
                label: 'Button Trigger',
                value: 'trigger',
              },
            ],
          },
          {
            name: 'newTab',
            type: 'checkbox',
            admin: {
              style: {
                alignSelf: 'flex-end',
              },
              width: '50%',
            },
            label: 'Open in new tab',
          },
        ],
      },
    ],
  }

  const linkTypes: Field[] = [
    {
      name: 'reference',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'reference',
      },
      label: 'Document to link to',
      relationTo: ['pages', 'posts'] as const,
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom',
      },
      label: 'Custom URL',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'email',
      },
      label: 'Email Address',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'phone',
        description: 'Enter phone number (e.g., +1-555-123-4567)',
      },
      label: 'Phone Number',
      required: true,
    },
    {
      name: 'trigger',
      type: 'select',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'trigger',
        description: 'Select the action to trigger when clicked',
      },
      label: 'Trigger Action',
      required: true,
      options: [
        {
          label: 'Trigger Button',
          value: 'trigger',
        },
        {
          label: 'Scroll to Section',
          value: 'scroll',
        },
      ],
    },
    {
      name: 'triggerData',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'trigger',
        description: 'Additional data for the trigger (e.g., modal ID, section ID)',
      },
      label: 'Trigger Data',
    },
  ]

  if (!disableLabel) {
    linkTypes.map((linkType) => ({
      ...linkType,
      admin: {
        ...linkType.admin,
        width: '50%',
      },
    }))

    linkResult.fields.push({
      type: 'row',
      fields: [
        ...linkTypes,
        {
          name: 'label',
          type: 'text',
          admin: {
            width: '50%',
          },
          label: 'Label',
          required: true,
        },
      ],
    })
  } else {
    linkResult.fields = [...linkResult.fields, ...linkTypes]
  }

  if (appearances !== false) {
    let appearanceOptionsToUse = [
      appearanceOptions.default,
      appearanceOptions.primary,
      appearanceOptions.secondary,
      appearanceOptions.outline,
      appearanceOptions.ghost,
      appearanceOptions.link,
    ]

    if (appearances) {
      appearanceOptionsToUse = appearances.map((appearance) => appearanceOptions[appearance])
    }

    linkResult.fields.push({
      name: 'appearance',
      type: 'select',
      admin: {
        description: 'Choose how the link should be rendered.',
      },
      defaultValue: 'default',
      options: appearanceOptionsToUse,
    })
  }

  // Add showArrow field
  linkResult.fields.push({
    name: 'showArrow',
    type: 'checkbox',
    admin: {
      description: 'Display an arrow icon next to the link text.',
    },
    label: 'Show arrow icon',
    defaultValue: false,
  })

  return deepMerge(linkResult, overrides)
}