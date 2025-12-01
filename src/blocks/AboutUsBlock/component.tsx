'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeInLeft, fadeInRight, buttonAnimation, imageReveal } from '@/utilities/animations'

interface AboutUsBlockPropsType {
  title: string
  description: string
  button: {
    label: string
    href: string
  }
  image: { url: string; alt: string }
}

export default function AboutUsBlock({ title, description, button, image }: AboutUsBlockPropsType) {
  return (
    <section className="relative w-full bg-white overflow-hidden">
      <div className="flex flex-col px-4 py-4 relative w-full min-h-[500px]">
        <motion.div
          className="flex-1 relative z-10 max-w-xl flex flex-col justify-between"
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <div className="flex flex-1 flex-col">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-gray-900 leading-tight mb-6">
              {title}
            </h1>
            <p className="text-gray-700 text-base md:text-lg mb-8 max-w-md">{description}</p>
          </div>
          {button?.href && (
            <motion.div variants={buttonAnimation}>
              <Link
                href={button.href}
                className="inline-flex items-center border border-gray-900 text-gray-900 px-6 py-3 hover:bg-gray-100 transition-colors w-fit"
              >
                {button.label}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </motion.div>
          )}
        </motion.div>

        {image?.url && (
          <motion.div
            className="absolute top-0 right-0 left-0 bottom-0 w-full h-full"
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            <div className="relative w-full h-full">
              <Image
                src={image.url}
                alt={image.alt || 'About Us Image'}
                fill
                objectFit="cover"
                objectPosition="left"
                className="object-contain object-right-bottom"
                priority
              />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
