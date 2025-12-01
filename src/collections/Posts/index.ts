import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
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

import { BlogHero } from '@/blocks/BlogHero/config'
import { BlogTwoColumn } from '@/blocks/BlogTwoColumn/config'

const Posts: CollectionConfig<'posts'> = {
  slug: 'posts',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    // referenced posts (e.g., relatedPosts) will include these:
    title: true,
    slug: true,

    // relationships / uploads: must be boolean
    thumbnail: true,
    tags: true,

    // plain fields
    excerpt: true,
    thumbnailBadge: true,

    // you can still pick subfields for object/group fields
    categories: true,
    meta: { image: true, description: true },
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

    // Card (listing) data
    { name: 'thumbnail', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      admin: { description: 'Overlay badges on the thumbnail (e.g., THE SHOW)' },
    },
    {
      name: 'thumbnailBadge',
      type: 'text',
      admin: { description: 'Optional override text if you don’t want to manage Tags' },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      admin: { description: 'Short description for the card' },
    },

    {
      name: 'readMore',
      label: 'Read more (override)',
      type: 'group',
      admin: { description: 'If set, clicking the card uses this link (external or internal).' },
      fields: [
        { name: 'url', label: 'URL', type: 'text' },
        { name: 'newTab', label: 'Open in new tab', type: 'checkbox', defaultValue: true },
      ],
    },
    // Page content (your two blocks)
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              required: true,
              minRows: 2,
              blocks: [BlogHero, BlogTwoColumn],
            },
          ],
        },
        {
          label: 'Meta',
          fields: [
            {
              name: 'relatedPosts',
              type: 'relationship',
              admin: { position: 'sidebar' },
              filterOptions: ({ id }) => ({ id: { not_in: [id] } }),
              hasMany: true,
              relationTo: 'posts',
            },
            {
              name: 'categories',
              type: 'relationship',
              admin: { position: 'sidebar' },
              hasMany: true,
              relationTo: 'categories',
            },
          ],
        },
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

    {
      name: 'publishedAt',
      type: 'date',
      admin: { date: { pickerAppearance: 'dayAndTime' }, position: 'sidebar' },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) =>
            siblingData._status === 'published' && !value ? new Date() : value,
        ],
      },
    },
    {
      name: 'authors',
      type: 'relationship',
      admin: { position: 'sidebar' },
      hasMany: true,
      relationTo: 'users',
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
    drafts: { autosave: { interval: 100 }, schedulePublish: true },
    maxPerDoc: 50,
  },
}

export default Posts
