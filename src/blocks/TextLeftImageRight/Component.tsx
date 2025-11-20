import React from 'react'
import type { TextLeftImageRight as BlockType } from '@/payload-types'
import { Media } from '@/components/Media'

export const TextLeftImageRight: React.FC<BlockType> = ({ title, body, image, paragraph2 }) => {
  return (
    <section className="container  py-8 md:py-12 ">
      <div className="flex flex-col-reverse md:flex-row gap-10 items-center">
        <div className="flex flex-col gap-6 items-center text-center w-full md:w-[50%]">
          <h2 className=" text-2xl md:text-3xl lg:text-4xl">{title}</h2>
          <p className=" text-sm md:text-base text-black">
            {body}
          </p>
          <p className=" text-sm md:text-base text-black">
            {paragraph2}
          </p>
        </div>

        <div className="w-full md:w-[50%] flex justify-center items-center">
            <Media resource={image} imgClassName="object-contain max-w-[402px]" />
       
        </div>  
      </div>
    </section>
  )
}

export default TextLeftImageRight
