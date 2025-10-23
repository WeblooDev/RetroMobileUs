"use client"

import type { InlineInfo as InlineInfoBlock } from "@/payload-types"

const InlineInfo: React.FC<InlineInfoBlock> = ({ items }) => {
  const rows = items ?? []

  return (
    <section className="py-6 md:py-20 flex flex-col  gap-20">


            <div className="w-[50%] mr-auto h-[0.5px] bg-black"></div>

      <div className="container">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-12">
        {rows.map((it, i) => (
          <div
            key={it?.id ?? i}
            className="bg-[#8B9B5C] text-white  px-6 py-4 md:px-8 md:py-6 flex flex-col items-center justify-center gap-4 "
          >
            <h3 className="text-xl md:text-3xl leading-tight text-center">
              {it.title}
            </h3>

            {it.description && (
              <p className="mt-1 text-xl md:text-2xl font-light  text-center">
                {it.description}
              </p>
            )}
          </div>
        ))}
      </div>

      </div>

            <div className="w-[50%] ml-auto h-[0.5px] bg-black"></div>

    </section>
  )
}

export default InlineInfo
