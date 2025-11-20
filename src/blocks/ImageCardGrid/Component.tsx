"use client"

import React from "react"
import { Media } from "@/components/Media"
import { CMSLink } from "@/components/Link"
import type { ImageCardGrid as ImageCardGridBlock } from "@/payload-types"

const ImageCardGrid: React.FC<ImageCardGridBlock> = ({ title, items = [] }) => {
  return (
    <section className="container py-12 md:py-16">
      <h2 className="mb-6 text-center text-2xl leading-tight md:mb-8 md:text-4xl">
        {title}
      </h2>

      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        {items.map((card) => {
          const { id, image, text, link } = card

          return (
            <article
              key={(id as string) ?? text}
              className="flex w-full flex-col items-center border p-8"
            >
              <CMSLink {...link} className="group  w-full h-auto flex flex-col items-center">
                <Media
                  resource={image}
                  imgClassName="h-auto max-h-[150px] max-w-[500px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </CMSLink>

              <p className="mt-3 text-center text-sm text-black md:text-base">
                {text}
              </p>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default ImageCardGrid
