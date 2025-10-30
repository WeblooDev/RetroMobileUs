import { CMSLink } from '@/components/Link'
import type { TextWithCTAs as TextWithCTAsBlock } from '@/payload-types'

const TextWithCTAs: React.FC<TextWithCTAsBlock> = ({ title, links }) => {
  const normalized = (links ?? [])
    .map((row: any) => row?.link)
    .filter((l: any) => l && l.label && l.url && l.url.trim())

  const [primary, secondary] = normalized

  return (
    <section className="container py-12">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
        <h2 className="text-4xl md:text-5xl lg:text-6xl w-full lg:w-[50%]">{title}</h2>

        <div className="flex items-start  flex-col md:flex-row justify-start lg:justify-end gap-2 lg:gap-6 w-full lg:w-[50%]">
          {primary && (
            <CMSLink url={primary.url!} label={primary.label} appearance="black" size="ctaBig" />
          )}

          {secondary && (
            <CMSLink
              url={secondary.url!}
              label={secondary.label}
              appearance="black"
              size="ctaBig"
            />
          )}
        </div>
      </div>
    </section>
  )
}

export default TextWithCTAs
