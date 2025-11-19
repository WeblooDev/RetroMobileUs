"use client"
import Link from 'next/link'
import { Media } from '@/components/Media'
import type { ImageCardGrid as ImageCardGridBlock } from '@/payload-types'

const ImageCardGrid: React.FC<ImageCardGridBlock> = ({ title, items }) => {
  const cards = items!
  return (
    <section className="container py-12 md:py-16">
      <h2 className="text-2xl md:text-4xl leading-tight mb-6 md:mb-8 text-center">{title}</h2>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 w-full">
        {cards.map((card) => (
          <div key={card.id as string} className=" w-full border flex flex-col items-center p-8">
            <Link
              href={card.url as string}
              target={card.newTab ? '_blank' : undefined}
              rel={card.newTab ? 'noopener noreferrer' : undefined}
              aria-label={card.text as string}
              className="group block"
            >
              <div className="relative ">
                <Media
                  resource={card.image}
                  imgClassName="object-cover h-auto w-full max-h-[150px] transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>

            <p className="mt-3 text-sm md:text-base text-black text-center">{card.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ImageCardGrid
