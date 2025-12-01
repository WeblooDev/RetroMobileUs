'use client'

import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities/ui'
import React from 'react'
import { motion } from 'framer-motion'
import RichText from '@/components/RichText'

import type { MediaBlock as MediaBlockProps } from '@/payload-types'

import { Media } from '../../components/Media'
import { imageReveal, fadeInUp } from '@/utilities/animations'

type Props = MediaBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
}

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    staticImage,
    disableInnerContainer,
  } = props

  let caption
  if (media && typeof media === 'object') caption = media.caption

  return (
    <motion.div
      className={cn(
        '',
        {
          container: enableGutter,
        },
        className,
      )}
      variants={imageReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {(media || staticImage) && (
        <Media
          imgClassName={cn('border border-border rounded-[0.8rem]', imgClassName)}
          resource={media}
          src={staticImage}
        />
      )}
      {caption && (
        <motion.div
          className={cn(
            'mt-6',
            {
              container: !disableInnerContainer,
            },
            captionClassName,
          )}
          variants={fadeInUp}
        >
          <RichText data={caption} enableGutter={false} />
        </motion.div>
      )}
    </motion.div>
  )
}
