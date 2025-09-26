"use client"

import { useEffect, useRef, useState } from "react"
import { CTAButton } from "@/components/CTAButton"
import { Pause } from "lucide-react"
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
    <section className="w-full py-12 px-6 md:px-12 lg:px-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left: Video */}
        <div
          className="relative group overflow-hidden bg-black/5"
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
              {isPlaying ? <Pause className="h-4 w-4" /> : <Image src={playSrc} alt="Play" width={16} height={16} className="h-auto w-auto" />}
              <p className="text-base  tracking-widest">
                {isPlaying ? "PAUSE VIDEO" : "PLAY THE VIDEO"}
              </p>
            </span>
          </button> 
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="text-3xl md:text-5xl ">{title}</h2>
          <p className="text-base md:text-base ">{paragraph}</p>

          {button && (
            <div>
              <CTAButton href={button.url} variant="olive" aria-label={button.label}>
                {button.label}
              </CTAButton>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
