'use client'

import React, { useEffect, useRef, useState } from 'react'
import type { TextVideoRight as TextVideoRightBlock } from '@/payload-types'
import playSrc from '../../../public/playy.svg'
import pauseSrc from '../../../public/pause.svg'
import { Media } from '@/components/Media'

const TextMediaRight: React.FC<TextVideoRightBlock> = ({
  title,
  description,
  smallText1,
  smallText2,
  video,
}) => {
  const vidRef = useRef<HTMLVideoElement | null>(null)
  const mediaWrapRef = useRef<HTMLDivElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isHover, setIsHover] = useState(false)

  useEffect(() => {
    if (!mediaWrapRef.current) return
    const innerVideo = mediaWrapRef.current.querySelector<HTMLVideoElement>('video')
    if (!innerVideo) return

    vidRef.current = innerVideo
    innerVideo.muted = true
    innerVideo.playsInline = true
    innerVideo.preload = 'metadata'

    innerVideo.autoplay = false
    innerVideo.removeAttribute('autoplay')
    innerVideo.pause()
    innerVideo.currentTime = 0
    setIsPlaying(false)

    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    innerVideo.addEventListener('play', onPlay)
    innerVideo.addEventListener('pause', onPause)
    return () => {
      innerVideo.removeEventListener('play', onPlay)
      innerVideo.removeEventListener('pause', onPause)
    }
  }, [video])

  const togglePlay = () => {
    const v = vidRef.current
    if (!v) return
    if (v.paused) {
      v.play()
        .then(() => setIsPlaying(true))
        .catch(() => {})
    } else {
      v.pause()
      setIsPlaying(false)
    }
  }

  const showLabel = !isPlaying || (isPlaying && isHover)
  const labelText = !isPlaying ? 'PLAY THE VIDEO' : 'PAUSE THE VIDEO'
  const showButton = !isPlaying || (isPlaying && isHover)
  const iconSrc = !isPlaying
    ? ((playSrc as unknown as { src: string }).src ?? (playSrc as unknown as string))
    : ((pauseSrc as unknown as { src: string }).src ?? (pauseSrc as unknown as string))
  const aria = !isPlaying ? 'Play the video' : 'Pause the video'

  return (
    <section className="w-[90%] ml-auto py-12 md:py-20">
      <div className="flex flex-col lg:flex-row justify-center items-center gap-8 md:gap-12">
        <div className="w-full lg:w-[50%]">
          <h2 className="text-3xl md:text-6xl leading-tight">{title}</h2>

          <p className="mt-6 text-sm md:text-base text-black/80 max-w-prose">{description}</p>
          <p className="mt-6 text-sm md:text-base text-black/90 max-w-prose">{smallText1}</p>
          <p className="mt-4 text-sm md:text-base text-black/90 max-w-prose">{smallText2}</p>
        </div>

        <div
          className="relative w-full lg:w-[50%] overflow-hidden"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <div className="relative w-full aspect-[674/414]" ref={mediaWrapRef}>
            <Media resource={video} className="absolute inset-0 h-full w-full object-cover" />
          </div>

          {(showLabel || showButton) && (
            <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-3 select-none">
              {showLabel && (
                <p className="tracking-[0.25em] text-xs md:text-sm text-white">{labelText}</p>
              )}
              {showButton && (
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={aria}
                  className="pointer-events-auto grid place-items-center"
                >
                  <img src={iconSrc} alt="" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default TextMediaRight
