"use client"

type ContactBannerProps = {
  title: string
  subtitle?: string
  backgroundColor?: string
}

export default function ContactBanner({
  title,
  subtitle,
  backgroundColor = "#8B9B5C",
}: ContactBannerProps) {
  return (
    <section className="w-full">
      {/* Top Banner */}
      <div
        className="w-full py-10 flex justify-center items-center"
        style={{ backgroundColor }}
      >
        <h3 className="text-white text-2xl md:text-6xl  text-center">
          {title}
        </h3>
      </div>

      {/* Subtitle */}
      {subtitle && (
        <div className="py-10 text-center text-sm ">
          {subtitle}
        </div>
      )}
    </section>
  )
}
