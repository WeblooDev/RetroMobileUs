"use client"

import { useRef, useState } from "react"
import type { TextVideoRight as TextVideoRightBlock } from "@/payload-types"
import playSrc from "../../../public/playy.svg"
import pauseSrc from "../../../public/pause.svg"

const TextVideoRight: React.FC<TextVideoRightBlock> = ({
  title,
  description,
  smallText1,
  smallText2,
  video,
}) => {
  const vidRef = useRef<HTMLVideoElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isHover, setIsHover] = useState(false)

  const videoURL =
    (video && typeof video === "object" && "url" in video ? (video as any).url : undefined) ??
    (video as any)?.src ??
    ""

  const togglePlay = () => {
    const v = vidRef.current
    if (!v) return
    if (v.paused) {
      v.play().then(() => setIsPlaying(true)).catch(() => {})
    } else {
      v.pause()
      setIsPlaying(false)
    }
  }

  const showLabel = !isPlaying || (isPlaying && isHover)
  const labelText = !isPlaying ? "PLAY THE VIDEO" : "PAUSE THE VIDEO"
  const showButton = !isPlaying || (isPlaying && isHover)
  const iconSrc = !isPlaying ? (playSrc as any).src ?? (playSrc as any) : (pauseSrc as any).src ?? (pauseSrc as any)
  const aria = !isPlaying ? "Play the video" : "Pause the video"

  return (
    <section className="w-[90%] ml-auto py-12 md:py-20">
      <div className="flex justify-center items-center gap-8 md:gap-12">
        <div className="w-[50%]">
          <h2 className="text-3xl md:text-6xl leading-tight">{title}</h2>

          {description && (
            <p className="mt-6 text-sm md:text-base text-black/80 max-w-prose">{description}</p>
          )}

          {smallText1 && (
            <p className="mt-6 text-sm md:text-base text-black/90 max-w-prose">{smallText1}</p>
          )}

          {smallText2 && (
            <p className="mt-4 text-sm md:text-base text-black/90 max-w-prose">{smallText2}</p>
          )}
        </div>

        <div
          className="relative w-[50%] overflow-hidden "
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <div className="relative w-full aspect-[674/414]">
            {videoURL && (
              <video
                ref={vidRef}
                className="absolute inset-0 h-full w-full object-cover"
                src={videoURL}
                playsInline
                muted
                preload="metadata"
                poster={(video as any)?.thumbnailURL || (video as any)?.sizes?.card?.url}
              />
            )}
          </div>

          {(showLabel || showButton) && (
            <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-3 select-none">
              {showLabel && (
                <p className="tracking-[0.25em] text-xs md:text-sm text-white">
                  {labelText}
                </p>
              )}

              {showButton && (
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={aria}
                  className="pointer-events-auto grid place-items-center "
                >
                  <img src={iconSrc} alt="" className="" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default TextVideoRight
