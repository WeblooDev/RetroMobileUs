'use client'

import type { SimpleHeading as SimpleHeadingBlock } from '@/payload-types'

const SimpleHeading: React.FC<SimpleHeadingBlock> = ({ title, backgroundColor }) => {
  const bg = backgroundColor?.trim() ? backgroundColor : '#8B9B5C'

  return (
    <section className="flex justify-start items-start my-4">
      <h3 className="text-white text-2xl md:text-3xl lg:text-6xl py-8 px-12" style={{ backgroundColor: bg }}>
        {title}
      </h3>
    </section>
  )
}

export default SimpleHeading
