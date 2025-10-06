"use client"

import React from "react"
import type { ContactBanner as ContactBannerBlock } from "@/payload-types"

const ContactBanner: React.FC<ContactBannerBlock> = ({
  title,
  subtitle,
  backgroundColor,
}) => {
  const bg = backgroundColor && backgroundColor.trim()
    ? backgroundColor
    : "#8B9B5C"

  return (
    <section className="w-full">
      {/* Top Banner */}
      <div
        className="w-full py-10 flex justify-center items-center"
        style={{ backgroundColor: bg }}
      >
        <h3 className="text-white text-2xl md:text-6xl text-center">
          {title}
        </h3>
      </div>

      {/* Subtitle */}
      {subtitle?.trim() && (
        <div className="py-10 text-center text-sm">
          {subtitle}
        </div>
      )}
    </section>
  )
}

export default ContactBanner
