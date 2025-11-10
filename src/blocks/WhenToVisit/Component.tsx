'use client'

import type { WhenToVisit as WhenToVisitBlock, Media } from '@/payload-types'

const WhenToVisit: React.FC<WhenToVisitBlock> = ({
  backgroundImage,
  title,
  month,
  dateRange,
  year,
  openHour,
  closeHour,
  bandColor,
  subtitle
}) => {
  const bgUrl =
    backgroundImage && typeof backgroundImage === 'object'
      ? (backgroundImage as Media)?.url
      : undefined

  const band = bandColor?.trim() ? bandColor : '#8B9B5C'

  return (
    <section className="container relative w-full">
      {bgUrl && (
        <div
          className="relative w-full h-[550px] lg:h-[600px] bg-cover bg-center"
          style={{ backgroundImage: `url(${bgUrl})` }}
        >
          <div className="absolute inset-0 bg-black/45" />

          <div className="absolute inset-x-0 top-10 md:top-10 flex justify-center px-6">
            <h2 className="text-3xl md:text-5xl lg:text-[84px] text-white text-center">{title}</h2>
          </div>
          <div
            className="absolute  left-0 right-0"
            style={{ top: '50%', transform: 'translateY(-50%)', backgroundColor: band }}
          >
            <div className="flex flex-col lg:flex-row items-center text-white justify-center">
              <div className="flex-1 px-6 md:px-10 py-6 md:py-8 flex items-start gap-6 justify-end">
                <h4 className="uppercase text-lg">{month}</h4>
                <h3 className="text-3xl md:text-4xl lg:text-6xl">{dateRange}</h3>
                <h4 className="uppercase text-base lg:text-lg">{year}</h4>
              </div>

              <div className="w-px h-5 lg:h-[60px] bg-white/40 self-center" />

              <div className="flex-1 px-6 md:px-10 py-6 md:py-8 flex items-start gap-6 md:justify-start">
                <h4 className="uppercase text-lg">From</h4>

                <div className="flex flex-col gap-2">
                  <div className="flex items-baseline gap-2">
                    <span className="font-ivar text-2xl md:text-3xl lg:text-4xl leading-none">{openHour}</span>
                    <span className="uppercase text-sm md:text-base">AM</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-ivar text-2xl md:text-3xl lg:text-4xl leading-none">{closeHour}</span>
                    <span className="uppercase text-sm md:text-base">PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="absolute inset-x-0 bottom-10 md:bottom-10 flex justify-center px-6">
            <h2 className="text-base md:text-lg lg:text-2xl text-white text-center w-[90%] md:w-[80%] lg:w-[60%]">{subtitle}</h2>
          </div>
        </div>
      )}
    </section>
  )
}

export default WhenToVisit
