'use client'

import React from 'react'
import type { TeamGrid as TeamGridBlock } from '@/payload-types'
import { Media } from '@/components/Media'
import AnimatedDivider from './AnimatedDivider'

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
        <div className="grid grid-cols-1 min-[1200px]:grid-cols-2 gap-8">
          {members.map((m, i) => {
            const isHero = i === 0
            const hasHobby = Boolean(m?.hobDescription && String(m.hobDescription).trim().length)
            return (
              <article
                key={m?.id ?? i}
                className={[
                  'flex flex-col items-center justify-center gap-6 md:gap-8 w-full',
                  i === 0 ? 'pt-0' : 'pt-8',
                  isHero ? 'min-[1200px]:col-span-2 min-[1200px]:mx-auto' : '',
                ].join(' ')}
              >
                <div className="flex flex-col md:flex-row items-center justify-center gap-8">
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
                  <div className="w-full flex flex-col gap-3 items-center md:items-start">
                    <h3 className="text-xl md:text-2xl lg:text-3xl">{m?.name}</h3>
                    {m?.role && <p className="text-sm md:text-base">{m.role}</p>}
                    {m?.email && (
                      <p className="text-sm md:text-base font-bold">
                        {m.email}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full flex flex-col items-center justify-center">
                  {hasHobby && <AnimatedDivider />}
                  {hasHobby && (
                    <div className="text-sm md:text-base text-white p-20 py-2 bg-[#8B9B5C] items-center justify-center w-fit text-center">
                      {m.hobDescription}
                    </div>
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