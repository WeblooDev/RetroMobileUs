"use client"

import { CTAButton } from "@/components/CTAButton"

type EventLocationProps = {
  backgroundImage?: { url?: string }
  ribbonText: string
  title: string
  button?: { label: string; url: string }
}

export default function EventLocation({
  backgroundImage,
  ribbonText,
  title,
  button,
}: EventLocationProps) {
  return (
    <section className="relative w-full min-h-[400px] md:min-h-[500px] flex items-center justify-center text-center my-16">
      {backgroundImage?.url && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage.url})` }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>
      )}

      {/* ribbon */}
      <div className="absolute -top-10 left-0 px-10 py-8 bg-[#8B9B5C] text-white font-ivar text-xl md:text-6xl">
        {ribbonText}
      </div>

      {/* center */}
      <div className="relative z-10 text-white px-6 flex flex-col items-center gap-6">
        <h2 className="font-ivar text-3xl md:text-6xl leading-tight max-w-3xl">{title}</h2>
        {button && (
          <CTAButton href={button.url} variant="olive" size="big">
            {button.label}
          </CTAButton>
        )}
      </div>
    </section>
  )
}
