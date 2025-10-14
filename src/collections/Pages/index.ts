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
import { BlogTwoColumn } from '@/blocks/BlogTwoColumn/config'

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
import { ImageHero } from '@/blocks/ImageHero/config'
import { TwoColumnHero } from '@/blocks/TwoColumnHero/config'
import { CenteredHero } from '@/blocks/CenteredHero/config'
import { CardGrid } from '@/blocks/CardGrid/config'
import { ImageText } from '@/blocks/ImageText/config'
import { MissionGallery } from '@/blocks/MissionGallery/config'
import { Split4060 } from '@/blocks/Split4060/config'
import { LinkBanner } from '@/blocks/LinkBanner/config'
import { WhenToVisit } from '@/blocks/WhenToVisit/config'
import { EventLocation } from '@/blocks/EventLocation/config'
import { ImageTextCTA } from '@/blocks/ImageTextCTA/config'
import { ContactBanner } from '@/blocks/ContactBanner/config'
import { SimpleHeading } from '@/blocks/SimpleHeading/config'
import { CharityCards } from '@/blocks/CharityCards/config'
import { TextImageBlock } from '@/blocks/TextImageBlock/config'
import ExpectCards from '@/blocks/ExpectCards/config'
import LogoTextCTA from '@/blocks/LogoTextCTA/config'
import TextWithCTAs from '@/blocks/TextWithCTAs/config'
import ReachTextCards from '@/blocks/ReachTextCards/config'
import PartnerBenefits from '@/blocks/PartnerBenefits/config'
import RightImageCTA from '@/blocks/RightImageCTA/config'
import TextImageRight from '@/blocks/TextImageRight/config'
import PackagesGrid from '@/blocks/PackagesGrid/config'
import AudienceGrid from '@/blocks/AudienceGrid/confg'
import MerchShowcase from '@/blocks/MerchShowcase/config'
import ImageOverlayText from '@/blocks/ImageOverlayText/config'
import TextImageRightLite from '@/blocks/TextImageRightLite/config'
import TextCTAImageRight from '@/blocks/TextCTAImageRight/config'
import ImageStepsRight from '@/blocks/ImageStepsRight/config'
import { TextVideoRight } from '@/blocks/TextVideoRight/config'
import CenteredBannerCTA from '@/blocks/CenteredBannerCTA/confif'
import ScheduleSplit from '@/blocks/ScheduleSplit/config'
import ImageLeftCenteredList from '@/blocks/ImageLeftCenteredList/config'
import NewsHeroFilter from '@/blocks/NewsHeroFilter/config'
import { Banner } from '@/blocks/Banner/config'
import InlineTeaser from '@/blocks/InlineTeaser/config'

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
                VideoCta,
                ImageHero,
                TwoColumnHero,
                CenteredHero,
                CardGrid,
                ImageText,
                MissionGallery,
                Split4060,
                LinkBanner,
                WhenToVisit,
                EventLocation,
                ImageTextCTA,
                ContactBanner,
                SimpleHeading,
                CharityCards,
                TextImageBlock,
                ExpectCards,
                LogoTextCTA,
                TextWithCTAs,
                ReachTextCards,
                PartnerBenefits,
                RightImageCTA,
                TextImageRight,
                PackagesGrid,
                AudienceGrid,
                ScheduleSplit,
                ImageLeftCenteredList,
                MerchShowcase,
                ImageOverlayText,
                TextImageRightLite,
                TextCTAImageRight,
                ImageStepsRight,
                TextVideoRight,
                CenteredBannerCTA,
                NewsHeroFilter,
                BlogTwoColumn,
                Banner,
                InlineTeaser,
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
