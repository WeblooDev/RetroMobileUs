"use client"

import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

type LinkBannerProps = {
  title: string
  link?: { label: string; url: string; bgColor?: string }
  rightImage?: { url?: string }
  rightImageAlt?: string
}

export default function LinkBanner({ title, link, rightImage, rightImageAlt }: LinkBannerProps) {
  const bg = link?.bgColor ?? "#8B9B5C"

  return (
    <section className="w-full px-6 md:px-12 lg:px-24 py-10">
      <div className="flex justify-between items-center gap-6 md:gap-10">
        {/* Left: H3 */}
        <div>
          <h3 className=" text-3xl md:text-6xl ">{title}</h3>
        </div>

        {/* Right: link + optional image */}
        <div className="flex items-center justify-start md:justify-end gap-6">
          {/* Optional image/logo */}
          {rightImage?.url && (
            <img
              src={rightImage.url}
              alt={rightImageAlt || title}
              className="h-12 w-auto object-contain"
              loading="lazy"
            />
          )}

          {/* Link pill */}
          {link?.url && (
            <Link   
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-4 items-center px-6 py-3 text-white  bg-[#8B9B5C]"
              aria-label={link.label}
            >
              <h3 className="text-5xl ">{link.label}</h3>
              <ArrowUpRight className="h-[29px] w-[35px]" />
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
