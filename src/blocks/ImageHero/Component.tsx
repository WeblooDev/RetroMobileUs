"use client"

import { CTAButton } from "@/components/CTAButton"

type ImageHeroProps = {
  backgroundImage?: { url?: string }
  title: string
  description: string
  button?: { label: string; url: string }
}

export default function ImageHero({ backgroundImage, title, description, button }: ImageHeroProps) {
  return (
    <section className="container relative min-h-[90vh] flex items-center">
      {/* Background image */}
      {backgroundImage?.url && (
        <div
          className="absolute inset-0  bg-center"
          style={{ backgroundImage: `url(${backgroundImage.url})` }}
        >
          <div className="absolute inset-0 bg-black/20" />
        </div>
      )}

      {/* Content box on the left */}
      <div className="relative z-10 w-[60%] px-6 ">
        <h1 className="text-4xl md:text-6xl text-white mb-6">{title}</h1>
        <p className="text-lg  text-white mb-8 w-[70%]">{description}</p>
        {button && (
          <CTAButton href={button.url} variant="olive" aria-label={button.label} size="big">
            {button.label}
          </CTAButton>
        )}
      </div>
    </section>
  )
}
