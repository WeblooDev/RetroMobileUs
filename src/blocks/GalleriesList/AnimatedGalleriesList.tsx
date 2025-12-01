'use client'

import Link from 'next/link'
import { Media } from '@/components/Media'
import type { Gallery } from '@/payload-types'
import { motion } from 'framer-motion'

interface AnimatedGalleriesListProps {
  title?: string | null
  description?: string | null
  galleries: Gallery[]
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
}

const imageVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.4,
    },
  },
}

export function AnimatedGalleriesList({
  title,
  description,
  galleries,
}: AnimatedGalleriesListProps) {
  return (
    <motion.section
      className="container py-10 md:py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={containerVariants}
    >
      {title && (
        <motion.h2 className="text-2xl md:text-3xl lg:text-4xl mb-2" variants={headerVariants}>
          {title}
        </motion.h2>
      )}
      {description && (
        <motion.p className="text-black mb-6 md:mb-10" variants={headerVariants}>
          {description}
        </motion.p>
      )}

      <div className="space-y-4">
        {galleries.map((g) => {
          const href = g.readMore?.url?.trim() || `/galleries/${g.slug}`
          const external = /^https?:\/\//i.test(href)

          const CardContent = (
            <>
              <motion.div
                className="relative aspect-[429/237] w-full overflow-hidden"
                initial="rest"
                whileHover="hover"
                variants={imageVariants}
              >
                {g.thumbnail && <Media resource={g.thumbnail} fill imgClassName="object-cover" />}
              </motion.div>

              <div className="text-black transition-colors group-hover:text-white">
                <h3 className="text-xl md:text-2xl transition-colors group-hover:text-white">
                  {g.title}
                </h3>
                {g.intro && (
                  <p className="mt-2 text-sm md:text-base opacity-90 transition-colors group-hover:text-white">
                    {g.intro}
                  </p>
                )}
              </div>

              <div className="md:justify-self-end !font-inter">
                <p className="text-xl inline-flex items-center gap-2 hover:underline underline-offset-6 text-black transition-colors group-hover:text-white">
                  VIEW GALLERY
                </p>
              </div>
            </>
          )

          return external ? (
            <motion.a
              key={g.id}
              href={href}
              target={g.readMore?.newTab ? '_blank' : undefined}
              rel={g.readMore?.newTab ? 'noopener noreferrer' : undefined}
              aria-label={`View gallery: ${g.title}`}
              className="group grid grid-cols-1 md:grid-cols-[420px_1fr_auto] items-center gap-6 md:gap-10 p-8 bg-white hover:bg-[#8B9B5C] transition-colors"
              variants={cardVariants}
            >
              {CardContent}
            </motion.a>
          ) : (
            <Link key={g.id} href={href} aria-label={`View gallery: ${g.title}`} className="block">
              <motion.div
                className="group grid grid-cols-1 md:grid-cols-[420px_1fr_auto] items-center gap-6 md:gap-10 p-8 bg-white hover:bg-[#8B9B5C] transition-colors"
                variants={cardVariants}
              >
                {CardContent}
              </motion.div>
            </Link>
          )
        })}
      </div>
    </motion.section>
  )
}
