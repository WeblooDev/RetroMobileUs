import React from 'react'
import Link from 'next/link'
import { Media } from '@/components/Media'
import type { ContactCards as ContactCardsBlock } from '@/payload-types'
import { CMSLink } from '@/components/Link'

const ContactCards: React.FC<ContactCardsBlock> = ({ title, cards = [] }) => {
  return (
    <section className="container mx-auto px-4 py-10">
      <h2 className="mb-12 text-2xl md:text-3xl lg:text-4xl">{title}</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {cards.map((c, i) => (
          <article key={i} className="flex flex-col gap-2">
            <div className="relative aspect-[388/330] w-full overflow-hidden rounded">
              <Media resource={c.image} fill className="object-cover" />
            </div>

            <div className="flex flex-col items-start text-start">
              <h3 className="mb-2 text-xl lg:text-2xl">{c.cardTitle}</h3>

              {/* email is optional now */}
              {c.email && (
                <Link href={`mailto:${c.email}`} className="font-semibold">
                  {c.email}
                </Link>
              )}

              {/* optional link button rendered as link variant */}
              {c.link && c.link.type && (
                <CMSLink {...c.link} type="custom" appearance="black" size="ctaBig" />
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ContactCards
