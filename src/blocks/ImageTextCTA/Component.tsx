"use client"

import { CTAButton } from "@/components/CTAButton"

type ImageTextCTAProps = {
  image?: { url?: string }
  title: string
  description?: string
  button?: { label: string; url: string }
  reverse?: boolean
}

export default function ImageTextCTA({
  image,
  title,
  description,
  button,
}: ImageTextCTAProps) {
  return (
    <section className="w-full my-12">
      <div
        className="flex gap-8 items-center"
         
      >
   
        {image?.url && (
          <div className="w-[45%]">
            <img
              src={image.url}
              alt={title}
              className="w-full h-auto object-cover rounded-lg shadow"
            />
          </div>
        )}

        {/* Text content */}
        <div className="flex flex-col gap-4 w-[60%] justify-center items-center ">
          <div className="flex flex-col gap-6 items-start">
          <h2 className="text-2xl md:text-6xl ">{title}</h2>
          {description && (
            <p className="text-base md:text-base w-1/2">{description}</p>
          )}
          {button && (
            <CTAButton href={button.url} variant="olive" size="big">
              {button.label}
            </CTAButton>
          )}
          </div>
        </div>
      </div>
    </section>
  )
}
