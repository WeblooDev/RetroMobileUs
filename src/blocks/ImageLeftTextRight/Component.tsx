import { Media } from "@/components/Media"
import type { ImageLeftTextRight as ImageLeftTextRightBlock } from "@/payload-types"

const ImageLeftTextRight: React.FC<ImageLeftTextRightBlock> = ({ title, description, image }) => {
  return (
    <section className="container py-10 md:py-16">
      <div className="flex flex-col-reverse lg:flex-row items-center gap-8 md:gap-12">
        <div className="relative w-full lg:w-[50%] aspect-[692/446] overflow-hidden ">
          {image && <Media resource={image} fill imgClassName="object-cover" />}
        </div>

        <div className="flex flex-col text-center  items-center gap-6 w-[full] lg:w-[50%]">
          <h2 className="text-3xl md:text-6xl leading-tight">{title}</h2>
          {description && (
            <p className="mt-4 text-sm md:text-base max-w-prose">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export default ImageLeftTextRight
