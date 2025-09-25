import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { CustomHeroBlock } from '@/blocks/HeroSection/Component'
import FlexGridBox from './FlexGridBox/Component'
import { ImageSectionBlockComponent } from '@/blocks/ImageSection/Component'
import { FeatureSectionBlockComponent } from './FeatureSection/Component'
import CarsCarousel from './CarsCarousel/Component'
import AboutUsBlock from './AboutUsBlock/component'
import JourneyCTA from './JourneyCTA/component'
import { TwoImageColumn } from './TwoImageColumn/Component'
import TestimonialCarouselBlock from './TestimonialsCarousel/component'
import FeatureHighlight from './FeatureHighlight/component'
import { VideoBlockComponent } from './VideoBlock/Component'
import SecondaryHero from './SecondaryHeroBlock/component'
import ContactFormSection from './ContactForm/component'
import { InventoryBlock } from './InventoryBlock/Component'
import { HeroCarsCarousel } from './HeroCarsCarousel/component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  customhero: CustomHeroBlock,
  flexGridBox: FlexGridBox,
  'image-section': ImageSectionBlockComponent,
  featureSection: FeatureSectionBlockComponent,
  carsCarousel: CarsCarousel,
  aboutUsBlock: AboutUsBlock,
  journeyCTA: JourneyCTA,
  twoImageColumn: TwoImageColumn,
  testimonialCarousel: TestimonialCarouselBlock,
  featureHighlight: FeatureHighlight,
  videoblock: VideoBlockComponent,
  secondaryHero: SecondaryHero,
  contactForm: ContactFormSection,
  inventoryBlock: InventoryBlock,
  heroCarsCarousel: HeroCarsCarousel,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
