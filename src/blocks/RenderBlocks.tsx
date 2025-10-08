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
import { ComingSoonBlock as ComingSoonBlockComponent } from '@/blocks/ComingSoonBlock/Component'
import TwoColumnCTA from './TwoColumnCTA/Component'
import LineBlock from './LineBlock/Component'
import VideoCta from './VideoCta/Component'
import ImageHero from './ImageHero/Component'
import TwoColumnHero from './TwoColumnHero/Component'
import CenteredHero from './CenteredHero/Component'
import CardGrid from './CardGrid/Component'
import ImageText from './ImageText/Component'
import MissionGallery from './MissionGallery/Component'
import Split4060 from './Split4060/Component'
import CharityPartners from './CharityPartners/Component'
import LinkBanner from './LinkBanner/Component'
import WhenToVisit from './WhenToVisit/Component'
import EventLocation from './EventLocation/Component'
import ImageTextCTA from './ImageTextCTA/Component'
import ContactBanner from './ContactBanner/Component'
import SimpleHeading from './SimpleHeading/Component'
import CharityCards from './CharityCards/Component'
import TextImageBlock from './TextImageBlock/Component'
import ExpectCards from './ExpectCards/Component'
import LogoTextCTA from './LogoTextCTA/Component'
import TextWithCTAs from './TextWithCTAs/Component'
import ReachTextCards from './ReachTextCards/Component'
import PartnerBenefits from './PartnerBenefits/Component'
import RightImageCTA from './RightImageCTA/Component'
import TextImageRight from './TextImageRight/component'
import PackagesGrid from './PackagesGrid/component'
import AudienceGrid from './AudienceGrid/Component'



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
  comingSoonBlock: ComingSoonBlockComponent,
  twoColumnCTA: TwoColumnCTA,
  lineBlock: LineBlock,
  videoCta: VideoCta,
  imageHero: ImageHero,
  twoColumnHero: TwoColumnHero,
  centeredHero: CenteredHero,
  cardGrid: CardGrid,
  imageText: ImageText,
  missionGallery: MissionGallery,
  split4060: Split4060,
  charityPartners: CharityPartners,
  linkBanner: LinkBanner,
  whenToVisit: WhenToVisit,
  eventLocation: EventLocation, 
  imageTextCTA: ImageTextCTA,
  contactBanner: ContactBanner,
  simpleHeading: SimpleHeading,
  charityCards: CharityCards,
  textImageBlock: TextImageBlock,
  expectCards: ExpectCards,
  logoTextCTA: LogoTextCTA,
  textWithCTAs: TextWithCTAs,
  reachTextCards: ReachTextCards,
  partnerBenefits: PartnerBenefits,
  rightImageCTA: RightImageCTA,
  textImageRight: TextImageRight,
  packagesGrid: PackagesGrid,
  audienceGrid: AudienceGrid,


  



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
