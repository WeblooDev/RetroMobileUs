// blocks/DarkRichText/Component.tsx
import React from 'react'
import RichText from '@/components/RichText'
import type { DarkRichText as DarkRichTextBlock } from '@/payload-types'

const DarkRichText: React.FC<DarkRichTextBlock> = ({ content }) => {
  return (
    <section className="bg-white !text-black py-16">
      <div className="container">
        <div className="prose prose-invert max-w-none
                        prose-headings:font-semibold
                        prose-a:underline prose-a:decoration-2 prose-a:underline-offset-4
                        !prose-a:text-black hover:prose-a:bg-[#8B9B5C]">
          <RichText data={content} className='!text-black'/>
        </div>
      </div>
    </section>
  )
}

export default DarkRichText
