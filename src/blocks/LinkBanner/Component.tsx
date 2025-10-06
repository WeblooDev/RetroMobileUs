"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Media } from "@/components/Media"
import type { LinkBanner as LinkBannerBlock } from "@/payload-types"

const LinkBanner: React.FC<LinkBannerBlock> = ({
  title,
  ctas,
  linkBgColor,
  rightImage,
}) => {
  // linkGroup rows look like: [{ link, id? }]
  const link = ctas?.[0]?.link
  const bg = (linkBgColor && linkBgColor.trim()) || "#8B9B5C"

  const hasWebUrl = typeof link?.url === "string" && link.url.trim().length > 0

  return (
    <section className="w-full px-6 md:px-12 lg:px-24 py-10">
      <div className="flex justify-between items-center gap-6 md:gap-10">
        {/* Left */}
        <div>
          <h3 className="text-3xl md:text-6xl">{title}</h3>
        </div>

        {/* Right: link + optional image */}
        <div className="flex items-center justify-start md:justify-end gap-6">
          {/* Optional image/logo */}
          {rightImage && (
            <div className="h-12 w-auto relative">
              <Media resource={rightImage} imgClassName="h-12 w-auto object-contain" />
            </div>
          )}

          {/* Link pill */}
          {link?.label && hasWebUrl && (
            <Link
              href={link.url!}
              // if your link() supports newTab, you can do:
              target={link.newTab ? "_blank" : undefined}
              rel={link.newTab ? "noopener noreferrer" : undefined}
              aria-label={link.label}
              className="flex gap-4 items-center px-6 py-3 text-white"
              style={{ backgroundColor: bg }}
            >
              <h3 className="text-5xl">{link.label}</h3>
              <ArrowUpRight className="h-[29px] w-[35px]" />
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

export default LinkBanner
