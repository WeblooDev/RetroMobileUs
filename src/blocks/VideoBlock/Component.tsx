'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Media } from '@/components/Media'
import { CTAButton } from '@/components/Button/CTAButton'
import type { Media as MediaType } from '@/payload-types'
import { fadeInLeft, fadeInRight, fadeIn } from '@/utilities/animations'

type VideoBlockProps = {
  title: string
  text: string
  buttonText: string
  buttonLink: string
  video: MediaType | null
  poster?: MediaType | null
}

export const VideoBlockComponent: React.FC<VideoBlockProps> = ({
  title,
  text,
  buttonText,
  buttonLink,
  video,
  poster,
}) => {
  const [isPlaying, setIsPlaying] = useState(true)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const buttonRef = useRef<HTMLDivElement | null>(null)
  const [videoEl, setVideoEl] = useState<HTMLVideoElement | null>(null)
  const [magnetOffset, setMagnetOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (containerRef.current) {
      const videoTag = containerRef.current.querySelector('video')
      if (videoTag) {
        setVideoEl(videoTag)
      }
    }
  }, [video])

  const togglePlayPause = () => {
    if (!videoEl) return
    if (videoEl.paused) {
      videoEl.play()
      setIsPlaying(true)
    } else {
      videoEl.pause()
      setIsPlaying(false)
    }
  }

  const handleMagnet = (e: React.MouseEvent) => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setMagnetOffset({ x: 0, y: 0 }) // Reset if on mobile
      return
    }

    if (!buttonRef.current || !containerRef.current) return

    const btnRect = buttonRef.current.getBoundingClientRect()
    const containerRect = containerRef.current.getBoundingClientRect()

    const mouseX = e.clientX - containerRect.left
    const mouseY = e.clientY - containerRect.top

    const btnCenterX = btnRect.left + btnRect.width / 2 - containerRect.left
    const btnCenterY = btnRect.top + btnRect.height / 2 - containerRect.top

    const distX = mouseX - btnCenterX
    const distY = mouseY - btnCenterY
    const distance = Math.sqrt(distX ** 2 + distY ** 2)

    if (distance <= 150) {
      setMagnetOffset({
        x: distX * 0.3,
        y: distY * 0.3,
      })
    } else {
      setMagnetOffset({ x: 0, y: 0 })
    }
  }

  return (
    <section className="p-4 md:p-8 ">
      <div className="flex flex-col items-center my-8 md:flex-row md:justify-between gap-8 md:my-16">
        <motion.div
          className="md:w-2/5"
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <h2 className=" text-4xl md:text-6xl xl:text-7xl">{title}</h2>
        </motion.div>
        <motion.div
          className="md:w-2/5 flex flex-col items-start"
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <p className="font-inter text-sm md:text-base mb-4">{text}</p>
          <CTAButton
            href={buttonLink || '#'}
            text={buttonText || ''}
            variant="transparent-light"
            arrow
          />
        </motion.div>
      </div>

      <motion.div
        ref={containerRef}
        className="w-full h-[40vh] lg:h-screen relative overflow-hidden"
        onMouseMove={handleMagnet}
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {video ? (
          <Media
            resource={video}
            className="w-full h-full object-cover aspect-video"
            videoClassName="w-full h-full object-cover aspect-video"
            videoProps={{
              controls: false,
              autoPlay: true,
              muted: true,
              loop: true,
            }}
          />
        ) : (
          poster && (
            <Media
              resource={poster}
              className="w-full h-full object-cover"
              imgClassName="w-full h-full object-cover"
            />
          )
        )}

        {/* Magnetic Play/Pause Button */}
        <div
          ref={buttonRef}
          onClick={togglePlayPause}
          className="absolute top-8 right-2 md:top-1/4 md:right-8 z-20 cursor-pointer text-white px-6 py-3  font-inter uppercase text-[20px] flex items-center gap-4 transition-transform duration-200 ease-out"
          style={{
            transform: `translate(${magnetOffset.x}px, ${magnetOffset.y}px) translateY(-50%)`,
          }}
        >
          {isPlaying ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="4" y="3" width="4" height="14" />
              <rect x="12" y="3" width="4" height="14" />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 49 56"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M46.3193 24.1747C49.6518 26.2076 49.6518 30.9626 46.3193 32.9955L6.70083 56.0993C3.36833 58.1323 -0.71875 55.7198 -0.71875 51.5976V5.57263C-0.71875 1.45043 3.36834 -0.962094 6.70084 1.07091L46.3193 24.1747Z"
                fill="white"
              />
            </svg>
          )}
          {isPlaying ? 'PAUSE' : 'PLAY NOW'}
        </div>
      </motion.div>
    </section>
  )
}
