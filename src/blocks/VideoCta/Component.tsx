"use client"

import { useEffect, useRef, useState } from "react"
import { CTAButton } from "@/components/CTAButton"
import PauseSrc from "../../../public/pause.svg" 
import playSrc from "../../../public/play.svg" 
import Image from "next/image"

type VideoCtaProps = {
  video?: { url?: string }
  poster?: { url?: string }
  title: string
  paragraph: string
  button?: { label: string; url: string }
}

export default function VideoCta({ video, poster, title, paragraph, button }: VideoCtaProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const overlayRef = useRef<HTMLButtonElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showHoverPause, setShowHoverPause] = useState(false)

  const src = video?.url

  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    v.addEventListener("play", onPlay)
    v.addEventListener("pause", onPause)
    return () => {
      v.removeEventListener("play", onPlay)
      v.removeEventListener("pause", onPause)
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
      <div className="flex gap-10 items-center w-full">
        {/* Left: Video */}
        <div
          className="w-[50%] relative group overflow-hidden bg-black/5"
          onMouseEnter={() => isPlaying && setShowHoverPause(true)}
          onMouseLeave={() => setShowHoverPause(false)}
        >
          <video
            ref={videoRef}
            src={src}
            poster={poster?.url}
            className="w-full h-auto block max-h-[634px] object-cover"
            playsInline
            controls={false}
            preload="metadata"
          />


          <button
            ref={overlayRef}
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause video" : "Play video"}
            className={[
              "absolute inset-0 flex items-center justify-center transition-opacity duration-200 ",
              isPlaying ? (showHoverPause ? "opacity-100" : "opacity-0") : "opacity-100",
              "bg-black/0 hover:bg-black/10",
            ].join(" ")}
          >
            <span className="flex gap-4 items-center absolute top-[20%] -right-[5%] text-white rotate-90">
              {isPlaying ? <Image src={PauseSrc} alt="Play" width={16} height={16} className="h-auto w-auto"  /> : <Image src={playSrc} alt="Play" width={16} height={16} className="h-auto w-auto" />}
              <p className="text-base  tracking-widest">
                {isPlaying ? "PAUSE VIDEO" : "PLAY THE VIDEO"}
              </p>
            </span>
          </button> 
        </div>

        <div className="flex flex-col gap-6 w-[50%]">
          <h2 className="text-3xl md:text-5xl ">{title}</h2>
          <p className="text-base md:text-base ">{paragraph}</p>

          {button && (
            <div>
              <CTAButton href={button.url} variant="olive" aria-label={button.label} size="big">
                {button.label}
              </CTAButton>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
