"use client"

import type { PackagesGrid as PackagesGridBlock } from "@/payload-types"

const PackagesGrid: React.FC<PackagesGridBlock> = ({
  title,
  topRow,
  bottomRow,
  showBottomDivider = true,
}) => {
  const renderRow = (items?: PackagesGridBlock["topRow"]) => {
    const list = items ?? []
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {list.map((item, i) => {
          const bg = item?.backgroundColor || "#E8F0E7" 
          const fg = item?.textColor || "#111111"
          return (
            <div
              key={i}
              className=" p-6 md:p-8 flex justify-center items-center"
              style={{ backgroundColor: bg, color: fg }}
            >
              <h3 className="text-2xl leading-relaxed text-center ">{item?.text}</h3>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <section className="container py-12 md:py-8">
      
      <h2 className="text-3xl md:text-5xl lg:text-6xl leading-tight border-b border-b-[#0000004D] w-fit pb-6">
        {title}
      </h2>

      <div className="mt-6 md:mt-8">
        {renderRow(topRow)}
      </div>

      <div className="my-8 md:my-10 h-px bg-black/30 w-[50%] ml-auto" />

      <div>
        {renderRow(bottomRow)}
      </div>

      {showBottomDivider && <div className="my-8 md:my-10 h-px bg-black/30 w-[50%] " />}
    </section>
  )
}

export default PackagesGrid
