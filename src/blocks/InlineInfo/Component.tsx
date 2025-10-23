"use client"

import type { InlineInfo as InlineInfoBlock } from "@/payload-types"

const InlineInfo: React.FC<InlineInfoBlock> = ({ items }) => {
  const rows = items ?? []

  return (
    <section className="container py-6 md:py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        {rows.map((it, i) => (
          <div
            key={it?.id ?? i}
            className="bg-[#7A8E57] text-white rounded-sm px-6 py-4 md:px-8 md:py-6"
          >
            <h3 className="text-lg md:text-xl font-medium leading-tight text-center">
              {it.title}
            </h3>

            {it.description && (
              <p className="mt-1 text-[11px] md:text-sm opacity-90 text-center">
                {it.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default InlineInfo
