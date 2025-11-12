import { Media } from '@/components/Media'
import type { ProgramHighlight as ProgramHighlightBlock } from '@/payload-types'

const ProgramHighlight: React.FC<ProgramHighlightBlock> = ({
  title,
  intro,
  bullets,
  image,
}) => {
  return (
    <section className="container py-16 md:py-24">
      <div className="flex flex-col lg:flex-row gap-10 items-stretch h-full">
        <div className="w-full lg:w-1/2 flex flex-col justify-center gap-6 h-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl leading-tight mb-6">
            {title}
          </h2>

          <p className="text-sm md:text-base">
            {intro}
          </p>

          <ul className="list-disc pl-6 space-y-4 text-sm md:text-base">
            {bullets.map((b, i) => (
              <li key={b.id ?? i} className="leading-relaxed">
                {b.text}
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full lg:w-1/2">
          <div className="relative w-full aspect-[608/524]  overflow-hidden">
            <Media resource={image as any} fill imgClassName="object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProgramHighlight
