"use client"

import { CTAButton } from "@/components/CTAButton"

type LogoTextCTAProps = {
  image?: { url?: string }
  imageAlt?: string
  title: string
  description?: string
  button?: { label: string; url: string }
  reverse?: boolean
}

export default function LogoTextCTA({
  image,
  imageAlt,
  title,
  description,
  button,
  reverse = false,
}: LogoTextCTAProps) {
  return (
    <section className="container py-12">
      <div className={`flex gap-10 items-center justify-between`}>
        {/* Image column */}
        <div className="w-[45%]">
          {image?.url ? (
            <img
              src={image.url}
              alt={imageAlt || title}
              className="w-full max-w-[420px] h-auto object-contain"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-[220px] bg-muted" />
          )}
        </div>

        {/* Text column */}
        <div className={`flex flex-col gap-4 w-[55%] ${reverse ? "md:order-1" : "md:order-2"}`}>
          <h2 className="font-ivar text-3xl md:text-5xl text-foreground">{title}</h2>
          {description && (
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-prose">
              {description}
            </p>
          )}
          {button && (
            <div className="pt-2">
              <CTAButton href={button.url} variant="black" size="big">
                {button.label}
              </CTAButton>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
