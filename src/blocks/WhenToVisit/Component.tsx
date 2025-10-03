"use client"

type WhenToVisitProps = {
  backgroundImage?: { url?: string }
  title: string

  month: string
  dateRange: string
  year: number

  openHour: string // e.g. "09"
  closeHour: string // e.g. "06"
  bandColor?: string
}

export default function WhenToVisit({
  backgroundImage,
  title,
  month,
  dateRange,
  year,
  openHour,
  closeHour,
  bandColor = "#8B9B5C",
}: WhenToVisitProps) {
  return (
    <section className="container relative w-full">
      {/* Background */}
      {backgroundImage?.url && (
        <div
          className="relative w-full h-[360px] md:h-[440px] lg:h-[600px] bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage.url})` }}
        >
          <div className="absolute inset-0 bg-black/45" />
          {/* Title */}
          <div className="absolute inset-x-0 top-10 md:top-10 flex justify-center px-6">
            <h2 className=" text-3xl md:text-5xl lg:text-[84px] text-white text-center">
              {title}
            </h2>
          </div>

          <div
            className="absolute left-0 right-0 "
            style={{ top: "50%", transform: "translateY(-50%)", backgroundColor: bandColor }}
          >
            <div className="flex items-center text-white justify-center">
              {/* Left column */}
              <div className="flex-1 px-6 md:px-10 py-6 md:py-8 flex items-start gap-6 justify-end">
                <h4 className=" uppercase  text-lg">
                  {month}
                </h4>
                <h3 className=" text-8xl ">
                  {dateRange}
                </h3>
                <h4 className="uppercase  text-lg">
                  {year}
                </h4>
              </div>

              {/* Divider */}
              <div className="w-px h-[60px] bg-white/40 flex justify-center self-center " />

              {/* Right column */}
              <div className="flex-1 px-6 md:px-10 py-6 md:py-8 flex items-start gap-6 md:justify-start">
                <h4 className="uppercase  text-lg">
                  From
                </h4>


                <div className="flex flex-col gap-2">
                <div className="flex items-baseline gap-2">
                  <span className="font-ivar text-3xl md:text-5xl leading-none">{openHour}</span>
                  <span className="uppercase text-sm md:text-base">AM</span>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="font-ivar text-3xl md:text-5xl leading-none">{closeHour}</span>
                  <span className="uppercase text-sm md:text-base">PM</span>
                </div>
              </div>

              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  )
}
