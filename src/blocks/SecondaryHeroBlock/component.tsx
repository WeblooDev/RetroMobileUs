'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { fadeIn, heroTitle } from '@/utilities/animations'

export type SecondaryHeroProps = {
  backgroundImage: { url: string }
  title: string
}

const SecondaryHero: React.FC<SecondaryHeroProps> = ({ backgroundImage, title }) => {
  return (
    <section className="relative w-full h-[40vh] lg:h-screen -mt-16">
      <motion.div
        className="absolute inset-0 top-16"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <Image
          src={backgroundImage.url}
          alt={title}
          fill
          priority
          quality={100}
          loading="eager"
          style={{ objectFit: 'cover' }}
        />
        <div className="absolute inset-0 bg-black opacity-50" />
      </motion.div>
      <div className="relative z-10 p-4 md:p-6 lg:p-8 xl:p-10 2xl:p-12 flex items-end justify-start h-full w-full lg:w-[60%]">
        <motion.h1
          className=" font-normal text-2xl md:text-3xl lg:text-4xl xl:text-7xl 2xl:text-8xl tracking-widest lg:tracking-[10px]"
          variants={heroTitle}
          initial="hidden"
          animate="visible"
        >
          {title}
        </motion.h1>
      </div>
    </section>
  )
}

export default SecondaryHero
