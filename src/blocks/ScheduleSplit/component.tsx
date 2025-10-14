'use client'

import { Media } from '@/components/Media'
import type { ScheduleSplit as ScheduleSplitBlock } from '@/payload-types'
import { cn } from '@/utilities/ui'
import type { CSSProperties } from 'react'

const ScheduleSplit: React.FC<ScheduleSplitBlock> = ({
  title,
  items,
  image,
  reverseLayout = false,
  backgroundColor,
  textColor = 'white', // "white" | "black"
}) => {
  const list = items ?? []

  // normalize background color (avoid null to satisfy TS)
  const panelBg: CSSProperties['backgroundColor'] =
    (backgroundColor && backgroundColor.trim()) || '#7A8E57'

  const isWhite = textColor === 'white'
  const textClass = isWhite ? 'text-white' : 'text-black'
  const bulletClass = isWhite ? 'bg-white/85' : 'bg-black/70'
  const subtleClass = isWhite ? 'opacity-95' : 'opacity-80'

  return (
    <section className="w-full pt-16">
      <div className={cn('container grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-0 items-stretch')}>
        {/* Image */}
        <div
          className={cn(
            'relative w-full aspect-[16/9] md:aspect-auto md:min-h-[460px] overflow-hidden',
            reverseLayout ? 'md:order-2' : 'md:order-1',
          )}
        >
          {image && <Media resource={image} fill imgClassName="object-cover" />}
        </div>

        {/* Right panel */}
        <div
          className={cn(
            'flex flex-col justify-center px-6 md:px-10 lg:px-14 py-8 md:py-12',
            reverseLayout ? 'md:order-1' : 'md:order-2',
            textClass,
          )}
          style={{ backgroundColor: panelBg }}
        >
          <h2 className="text-3xl md:text-6xl leading-tight">{title}</h2>

          <ul className="mt-6 space-y-3 md:space-y-4">
            {list.map((it, i) => (
              <li key={it?.id ?? i} className="flex items-start gap-3">
                <span
                  className={cn('mt-2 inline-block h-1.5 w-1.5 rounded-full shrink-0', bulletClass)}
                />
                <p className="text-sm md:text-base">
                  {it?.bold && <strong className="font-semibold">{it.bold}</strong>}
                  {it?.text && (
                    <>
                      {' '}
                      <span className={subtleClass}>— {it.text}</span>
                    </>
                  )}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default ScheduleSplit
