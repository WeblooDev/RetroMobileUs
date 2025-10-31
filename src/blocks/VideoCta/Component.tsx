'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import PauseSrc from '../../../public/pause.svg'
import PlaySrc from '../../../public/play.svg'
import { CMSLink } from '@/components/Link'
import type { VideoCta as VideoCtaFields } from '@/payload-types' 

type MaybeMedia =
  | { url?: string; alt?: string }
  | string
  | null
  | undefined

const getMediaUrl = (m: MaybeMedia) =>
  m && typeof m !== 'string' ? m.url ?? '' : ''

export default function VideoCtaBlock({
  video,
  poster,
  title,
  paragraph,
  button,
}: VideoCtaFields) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const overlayRef = useRef<HTMLButtonElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showHoverPause, setShowHoverPause] = useState(false)

  const src = getMediaUrl(video as MaybeMedia)
  const posterUrl = getMediaUrl(poster as MaybeMedia)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    v.addEventListener('play', onPlay)
    v.addEventListener('pause', onPause)
    return () => {
      v.removeEventListener('play', onPlay)
      v.removeEventListener('pause', onPause)
    }
  }, [])

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) v.play()
    else v.pause()
  }

  return (
    <section className="container py-24">
      <div className="flex flex-col lg:flex-row gap-10 items-center w-full">
        <div
          className="w-full lg:w-[50%] relative group overflow-hidden bg-black/50"
          onMouseEnter={() => isPlaying && setShowHoverPause(true)}
          onMouseLeave={() => setShowHoverPause(false)}
        >
          <video
            ref={videoRef}
            src={src}
            poster={posterUrl || undefined}
            className="w-full h-auto block max-h-[634px] object-cover"
            playsInline
            controls={false}
            preload="metadata"
          />

          <button
            ref={overlayRef}
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
            className={[
              'absolute inset-0 flex items-center justify-center transition-opacity duration-200',
              isPlaying ? (showHoverPause ? 'opacity-100' : 'opacity-0') : 'opacity-100',
              'bg-black/0 hover:bg-black/10',
            ].join(' ')}
          >
            <span className="flex gap-4 items-center absolute top-[20%] -right-[5%] text-white rotate-90">
              {isPlaying ? (
                <Image src={PauseSrc} alt="Pause" width={16} height={16} className="h-auto w-auto" />
              ) : (
                <Image src={PlaySrc} alt="Play" width={16} height={16} className="h-auto w-auto" />
              )}
              <p className="text-base tracking-widest">
                {isPlaying ? 'PAUSE VIDEO' : 'PLAY THE VIDEO'}
              </p>
            </span>
          </button>
        </div>

        <div className="flex flex-col gap-6 w-full lg:w-[50%]">
          <h2 className="text-3xl md:text-4xl lg:text-4xl">{title}</h2>
          <p className="text-base md:text-sm w-[80%]">{paragraph}</p>

          {button?.url && button?.label && (
            <div>
              <CMSLink
                type="custom"
                url={button.url}
                label={button.label}
                appearance="black"
                size="ctaBig"
                ariaLabel={button.label}
                className="inline-flex"
              >
                {button.label}
              </CMSLink>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
