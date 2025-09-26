import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { hero } from '@/heros/config'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'
import { CustomHeroBlock } from '@/blocks/HeroSection/config'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { FlexGridBox } from '@/blocks/FlexGridBox/config'
import { ImageSectionBlock } from '@/blocks/ImageSection/config'
import { FeatureSectionBlock } from '@/blocks/FeatureSection/config'
import { CarsCarousel } from '@/blocks/CarsCarousel/config'
import AboutUsBlock from '@/blocks/AboutUsBlock/config'
import JourneyCTA from '@/blocks/JourneyCTA/config'

import { TwoImageColumn } from '@/blocks/TwoImageColumn/config'

import TestimonialCarouselBlock from '@/blocks/TestimonialsCarousel/config'
import FeatureHighlight from '@/blocks/FeatureHighlight/config'
import { VideoBlock } from '@/blocks/VideoBlock/config'
import SecondaryHeroBlock from '@/blocks/SecondaryHeroBlock/config'
import ContactFormBlock from '@/blocks/ContactForm/config'
import { InventoryBlock } from '@/blocks/InventoryBlock/config'
import { HeroCarsCarousel } from '@/blocks/HeroCarsCarousel/config'
import { ComingSoonBlock } from '@/blocks/ComingSoonBlock/config'
import { TwoColumnCTA } from '@/blocks/TwoColumnCTA/config'
import { LineBlock } from '@/blocks/LineBlock/config'
import { VideoCta } from '@/blocks/VideoCta/config'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'pages',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                CallToAction,
                Content,
                MediaBlock,
                Archive,
                FormBlock,
                CustomHeroBlock,
                FlexGridBox,
                ImageSectionBlock,
                FeatureSectionBlock,
                CarsCarousel,
                AboutUsBlock,
                JourneyCTA,
                TwoImageColumn,
                TestimonialCarouselBlock,
                FeatureHighlight,
                VideoBlock,
                SecondaryHeroBlock,
                ContactFormBlock,
                InventoryBlock,
                HeroCarsCarousel,
                ComingSoonBlock,
                TwoColumnCTA,
                LineBlock,
                VideoCta
              ],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
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
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
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
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
