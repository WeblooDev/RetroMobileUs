import type { CollectionConfig } from 'payload'

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Banner } from '../../blocks/Banner/config'
import { Code } from '../../blocks/Code/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { populateAuthors } from './hooks/populateAuthors'
import { revalidateDelete, revalidatePost } from './hooks/revalidatePost'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from '@/fields/slug'

export const Posts: CollectionConfig<'posts'> = {
  slug: 'posts',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    categories: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'posts',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'posts',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    { name: 'title', type: 'text', required: true },

    {
      type: 'tabs',
      tabs: [
        // --- Card shown on the archive / listing ---
        {
          label: 'Listing Card',
          fields: [
            {
              name: 'cardThumbnail',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Card Thumbnail',
            },
            {
              name: 'cardExcerpt',
              type: 'textarea',
              label: 'Card Excerpt',
              admin: { rows: 3 },
            },
          ],
        },

        // --- Post Template blocks (page layout) ---
        {
          label: 'Template',
          fields: [
            // Block #1: image background + title + description
            {
              name: 'hero',
              type: 'group',
              label: 'Hero Overlay',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                  label: 'Background Image',
                },
                { name: 'heroTitle', type: 'text', required: true, label: 'Title' },
                { name: 'heroDescription', type: 'textarea', label: 'Description', admin: { rows: 3 } },
              ],
            },

            // Block #2: split body — left column is a sequence; right is related posts (max 3)
            {
              name: 'bodyLeft',
              type: 'array',
              label: 'Left Column Sections',
              labels: { singular: 'Section', plural: 'Sections' },
              admin: { initCollapsed: false },
              fields: [
                {
                  name: 'kind',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'Text', value: 'text' },
                    { label: 'Image with Caption', value: 'image' },
                  ],
                  defaultValue: 'text',
                },
                {
                  name: 'text',
                  type: 'textarea',
                  label: 'Text',
                  admin: { rows: 6, condition: (_data, siblingData) => siblingData?.kind === 'text' },
                },
                {
                  name: 'img',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Image',
                  admin: { condition: (_data, siblingData) => siblingData?.kind === 'image' },
                },
                {
                  name: 'caption',
                  type: 'text',
                  label: 'Image Caption',
                  admin: { condition: (_data, siblingData) => siblingData?.kind === 'image' },
                },
              ],
            },

            // Keep a rich text field optional if you still want it (not used by the new template)
            {
              name: 'content',
              type: 'richText',
              required: false,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => [
                  ...rootFeatures,
                  HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  BlocksFeature({ blocks: [Banner, Code, MediaBlock] }),
                  FixedToolbarFeature(),
                  InlineToolbarFeature(),
                  HorizontalRuleFeature(),
                ],
              }),
              label: 'Optional Rich Text (legacy)',
            },
          ],
        },

        {
          label: 'Meta',
          fields: [
            {
              name: 'relatedPosts',
              type: 'relationship',
              relationTo: 'posts',
              hasMany: true,
              admin: {
                position: 'sidebar',
                description: 'Select up to 3 related posts (shown on the post page right column).',
              },
              filterOptions: ({ id }) => ({ id: { not_in: [id] } }),
              validate: (val) =>
                (Array.isArray(val) ? val.length <= 3 : true) || 'Select up to 3 related posts.',
            },
            {
              name: 'categories',
              type: 'relationship',
              hasMany: true,
              relationTo: 'categories',
              admin: { position: 'sidebar' },
            },
          ],
        },

        // --- SEO tab (unchanged) ---
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({ hasGenerateFn: true }),
            MetaImageField({ relationTo: 'media' }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },

    // --- Boilerplate fields you already had ---
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) return new Date()
            return value
          },
        ],
      },
    },
    {
      name: 'authors',
      type: 'relationship',
      hasMany: true,
      relationTo: 'users',
      admin: { position: 'sidebar' },
    },
    {
      name: 'populatedAuthors',
      type: 'array',
      access: { update: () => false },
      admin: { disabled: true, readOnly: true },
      fields: [
        { name: 'id', type: 'text' },
        { name: 'name', type: 'text' },
      ],
    },

    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePost],
    afterRead: [populateAuthors],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: { interval: 100 },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
