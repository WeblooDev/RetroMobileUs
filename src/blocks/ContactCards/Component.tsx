import React from 'react'
import { Media } from '@/components/Media'
import type { ContactCards as ContactCardsBlock } from '@/payload-types'
import Link from 'next/link'

const ContactCards: React.FC<ContactCardsBlock> = ({ title, cards = [] }) => {
  return (
    <section className="container mx-auto px-4 py-10">
      <h2 className="text-3xl md:text-4xl f mb-12">{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards?.map((c, i) => (
          <article key={i} className="space-y-3">
            {c?.image && (
              <div className="relative aspect-[388/330] w-full overflow-hidden rounded">
                <Media resource={c.image} fill className="object-cover" />
              </div>
            )}
            <div className="flex flex-col gap-2 items-start text-start">
              <h3 className="text-xl md:text-2xl ">{c?.cardTitle}</h3>
              {c?.email && (
                <Link href={`mailto:${c.email}`} className="font-semibold">
                  {c.email}
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ContactCards
