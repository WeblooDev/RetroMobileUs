'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import HubSpotContactForm from '@/components/forms/HubSpotContactForm'
import ConnectWithUs from '@/components/ConnectWithUs/ConnectWithUs'
import { fadeInLeft, fadeInRight, imageReveal } from '@/utilities/animations'

interface ContactFormSectionProps {
  heading?: string | null
  backgroundImage: string | { url: string }
  cardTitle?: string | null
  cardEmail?: string | null
  cardPhone?: string | null
  cardAddress1?: string | null
  cardAddress2?: string | null
  id?: string | null
  blockName?: string | null
  blockType: 'contactForm'
}

export default function ContactFormSection({ heading, backgroundImage }: ContactFormSectionProps) {
  const imageUrl = typeof backgroundImage === 'string' ? backgroundImage : backgroundImage.url
  return (
    <section className="container grid md:grid-cols-2 text-white gap-[2rem] py-8 md:py-12">
      <motion.div
        className="relative h-[50vh] md:h-[85vh]"
        variants={fadeInLeft}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <Image src={imageUrl} alt="Background" fill className="object-cover" />
        <div className="absolute inset-0 flex flex-col justify-end p-4 lg:p-6 xl:p-8 2xl:p-10">
          <ConnectWithUs
            variant="dark"
            titleClassName="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-light mb-8"
          />
        </div>
      </motion.div>

      <motion.div
        className="flex w-full h-full flex-col justify-center gap-4 min-h-[50vh]"
        variants={fadeInRight}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {heading && (
          <h1 className="text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl  ml-8">{heading}</h1>
        )}
        <HubSpotContactForm />
      </motion.div>
    </section>
  )
}
