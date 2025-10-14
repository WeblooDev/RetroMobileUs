'use client'

import React from 'react'
import { Media as MediaCmp } from '@/components/Media'
import type { CharityCards as CharityCardsBlock, Media } from '@/payload-types'

const CharityCardsComponent: React.FC<CharityCardsBlock> = ({ title, backgroundImage, cards }) => {
  const bgUrl =
    backgroundImage && typeof backgroundImage === 'object'
      ? (backgroundImage as Media)?.url
      : undefined

  return (
    <section className="container relative w-full py-14">
      <h2 className="text-6xl font-ivar mb-10">{title}</h2>

      <div className="relative w-full h-[350px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <MediaCmp resource={backgroundImage} fill priority imgClassName="object-cover" />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 flex gap-6 px-6 max-w-6xl w-full justify-center">
          {cards?.map((card, i) => (
            <div
              key={i}
              className="flex-1 bg-white/10 border border-white text-center text-white p-8 backdrop-blur-sm"
            >
              <h3 className="font-ivar text-2xl mb-2">{card.title}</h3>
              <p className="text-xl">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CharityCardsComponent
