import React from 'react'
import type { TeamGrid as TeamGridBlock } from '@/payload-types'
import { Media } from '@/components/Media'

const TeamGridComponent: React.FC<TeamGridBlock> = ({ title, description, items }) => {
  const members = Array.isArray(items) ? items : []

  return (
    <section className="py-12 md:py-20">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
          {title && <h2 className="text-3xl md:text-5xl lg:text-6xl mb-4">{title}</h2>}
          {description && (
            <p className="text-sm md:text-base text-muted-foreground">{description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {members.map((m, i) => {
            const isHero = i === 0
            return (
              <article
                key={m?.id ?? i}
                className={`
                  flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 
                  border-t pt-8
                  ${isHero ? 'md:col-span-2' : ''}
                `}
              >
                <div className="relative w-28 h-28 shrink-0 rounded-full overflow-hidden">
                  {m?.photo && (
                    <Media
                      resource={m.photo}
                      fill
                      imgClassName="object-cover"
                      priority={i === 0}
                    />
                  )}
                </div>

                <div className="w-full">
                  <h3 className="font-semibold text-xl md:text-2xl">{m?.name}</h3>

                  {m?.role && (
                    <p className="mt-1 text-sm md:text-base text-muted-foreground">{m.role}</p>
                  )}

                  {m?.bio && (
                    <p className="mt-3 text-sm md:text-base leading-relaxed">{m.bio}</p>
                  )}

                  {m?.hobDescription && (
                    <div className="mt-3 text-sm md:text-base italic text-muted-foreground">
                      {m.hobDescription}
                    </div>
                  )}

                  {m?.email && (
                    <p className="mt-3 text-sm md:text-base font-medium text-blue-600">
                      {m.email}
                    </p>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default TeamGridComponent
