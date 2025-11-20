import React from 'react'
import type { TextH2TextH2Text as BlockType } from '@/payload-types'

export const TextH2TextH2Text: React.FC<BlockType> = ({
  intro,
  intro2,
  heading1,
  body1,
  heading2,
  body2,
}) => {
  return (
    <section className="container py-12 md:py-16">
      {/* Top paragraph */}
      <p className="max-w-4xl text-base md:text-lg leading-relaxed text-black">
        {intro}
      </p>

  <p className="max-w-4xl text-base md:text-lg leading-relaxed text-black">
        {intro2}
      </p>
      {/* Section 1 */}
      <div className="mt-10 md:mt-12">
        <h2 className="text-2xl md:text-3xl lg:text-4xl ">
          {heading1}
        </h2>
        <p className="mt-4 max-w-4xl text-base md:text-lg leading-relaxed text-black">
          {body1}
        </p>
      </div>

      {/* Section 2 */}
      <div className="mt-10 md:mt-12">
        <h2 className="text-2xl md:text-3xl lg:text-4xl ">
          {heading2}
        </h2>
        <p className="mt-4 max-w-4xl text-base md:text-lg leading-relaxed text-black">
          {body2}
        </p>
      </div>
    </section>
  )
}

export default TextH2TextH2Text
