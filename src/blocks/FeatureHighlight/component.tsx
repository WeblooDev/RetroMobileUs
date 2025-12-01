'use client'

import { CTAButton } from '@/components/Button/CTAButton'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  staggerItem,
  imageReveal,
} from '@/utilities/animations'

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
        <motion.div
          className={`space-y-2 ${imagePosition === 'right' ? 'lg:order-1' : 'lg:order-2'}`}
          variants={imagePosition === 'right' ? fadeInRight : fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <motion.div
            className="relative w-full rounded-lg overflow-hidden"
            style={{ aspectRatio: aspectRatio }}
            variants={imageReveal}
          >
            <Image
              src={image.url}
              alt={image.alt || 'Feature image'}
              fill
              className="object-cover object-center"
              priority
              quality={100}
            />
          </motion.div>
        </motion.div>
        <motion.div
          className={`space-y-4 flex flex-col gap-6 justify-between h-full ${imagePosition === 'right' ? 'lg:order-2' : 'lg:order-1'}`}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <motion.h2
            className="text-4xl  leading-tight sm:text-5xl md:text-6xl "
            variants={staggerItem}
          >
            {heading}
          </motion.h2>
          <motion.div className="space-y-6 divide-y divide-white " variants={staggerItem}>
            {features.map((feature, index) => (
              <div key={index} className={index === 0 ? 'pt-0' : 'pt-6'}>
                <h3 className="text-3xl  leading-tight">{feature.title}</h3>
                <p className="font-inter color-black text-sm md:text-base mt-2">
                  {feature.description}
                </p>
              </div>
            ))}
          </motion.div>
          {button?.label && button?.href && (
            <motion.div className="flex justify-start" variants={staggerItem}>
              <CTAButton href={button.href} text={button.label} variant="transparent-light" />
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
