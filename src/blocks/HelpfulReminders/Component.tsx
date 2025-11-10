"use client"

import { Media } from "@/components/Media"
import { CTAButton } from "@/components/CTAButton"
import type { HelpfulReminders as HelpfulRemindersBlock } from "@/payload-types"

const HelpfulReminders: React.FC<HelpfulRemindersBlock> = ({
  title,
  intro,             
  items,
  image,
  links,
}) => {
  const [primary] =
    (links ?? [])
      .map((row: any) => row?.link)
      .filter((l: any) => l && l.label && l.url && l.url.trim())

  return (
    <section className="w-full bg-[#8B9B5C]">
      <div
        className=" container mx-auto py-10"
      >
        <div className=" py-8 md:py-12 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
          <div className="w-full lg:w-[50%] ">
            <h2 className="text-2xl md:text-4xl lg:text-4xl leading-tight text-white">{title}</h2>

            {intro && (
              <p className="mt-2 text-sm md:text-base text-white">
                {intro}
              </p>
            )}

            <div className="mt-5 md:mt-12 flex flex-col gap-4 items-start">
              {(items ?? []).map((it, i) => (
                <div key={it?.id ?? i} className="flex flex-col items-start gap-4">
                  <p className="text-lg md:text-[24px] font-light text-white">{it?.subtitle}</p>
                   <div className="h-px w-24 md:w-28 bg-white" />

                </div>
              ))}
            </div>

            {primary && (
              <div className="mt-6">
                <CTAButton
                  href={primary.url!}
                  aria-label={primary.label}
                  size="big"
                  variant="black"
                >
                  {primary.label}
                </CTAButton>
              </div>
            )}
          </div>

          <div className=" w-full lg:w-[50%]">
            <div className="relative w-full aspect-[691/382] overflow-hidden rounded-md">
              {image && <Media resource={image} fill imgClassName="object-cover" />}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HelpfulReminders
