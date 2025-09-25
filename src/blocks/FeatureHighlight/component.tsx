import { CTAButton } from '@/components/Button/CTAButton'
import Image from 'next/image'

type Feature = {
  title: string
  description: string
}

interface FeatureHighlightProps {
  heading: string
  image: {
    url: string
    alt: string
    width: number
    height: number
  }
  features: Feature[]
  button?: {
    label: string
    href: string
  }
  imagePosition?: 'left' | 'right'
}

export default function FeatureHighlight({
  heading,
  image,
  features,
  button,
  imagePosition = 'left',
}: FeatureHighlightProps) {
  // Calculate aspect ratio from image dimensions
  const aspectRatio = image.width / image.height

  return (
    <section className="container py-14 md:py-20">
      <div
        className={`grid gap-6 lg:gap-12 items-center ${
          imagePosition === 'right' ? 'lg:grid-cols-2' : 'lg:grid-cols-2 lg:grid-flow-dense'
        }`}
      >
        <div className={`space-y-2 ${imagePosition === 'right' ? 'lg:order-1' : 'lg:order-2'}`}>
          <div
            className="relative w-full rounded-lg overflow-hidden"
            style={{ aspectRatio: aspectRatio }}
          >
            <Image
              src={image.url}
              alt={image.alt || 'Feature image'}
              fill
              className="object-cover object-center"
              priority
              quality={100}
            />
          </div>
        </div>
        <div
          className={`space-y-4 flex flex-col gap-6 justify-between h-full ${imagePosition === 'right' ? 'lg:order-2' : 'lg:order-1'}`}
        >
          <h2 className="text-4xl font-ivar leading-tight sm:text-5xl md:text-6xl ">{heading}</h2>
          <div className="space-y-6 divide-y divide-white ">
            {features.map((feature, index) => (
              <div key={index} className={index === 0 ? 'pt-0' : 'pt-6'}>
                <h3 className="text-3xl font-ivar leading-tight">{feature.title}</h3>
                <p className="font-inter color-black text-sm md:text-base mt-2">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
          {button?.label && button?.href && (
            <div className="flex justify-start">
              <CTAButton href={button.href} text={button.label} variant="transparent-light" />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
