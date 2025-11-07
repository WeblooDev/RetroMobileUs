'use client'

import { Media } from '@/components/Media'
import type { MissionGallery as MissionGalleryBlock } from '@/payload-types'

const MissionGallery: React.FC<MissionGalleryBlock> = ({
  title,
  description,
  image1,
  image2,
  image3,
}) => {
  const items = [{ resource: image1 }, { resource: image2 }, { resource: image3 }]

  return (
    <section className="w-full px-6 md:px-12 lg:px-24 py-16">
      <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
        <h2 className="text-4xl md:text-6xl">{title}</h2>
        {description && (
          <p className="mt-4 text-sm md:text-base w-full md:w-[85%] mx-auto">{description}</p>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        {items.map((it, idx) => (
          <div key={idx} className={idx === 1 ? 'w-full md:basis-[22%]' : 'w-full md:basis-[39%]'}>
            <div className="relative w-full h-[220px] md:h-[250px] rounded-lg overflow-hidden bg-muted">
              <Media resource={it.resource} fill imgClassName="object-cover" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default MissionGallery
