import { CTAButton } from '../Button/CTAButton'

export function InventoryEmptyResult() {
  const title: string = "Can't Find Your Car?"
  const description: string =
    "Our exclusive concierge service is ready to assist you. Contact us to request any luxury vehicle, even if it's not in our current inventory."
  const button1Text: string = 'CONTACT US'

  return (
    <div className="h-full min-h-[40vh] w-full flex items-center justify-center p-4 font-ivar">
      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl gap-8 sm:gap-6 text-center text-white py-12">
        {/* Title */}
        <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-white uppercase">
          {title}
        </h1>

        <div className="flex flex-col items-center justify-center w-full gap-8 sm:gap-6">
          {/* Divider Line */}
          <div className="h-[2px] w-full max-w-md bg-white/40 my-0 lg:my-4"></div>

          {/* Description */}
          <p className="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-white/90  leading-relaxed max-w-2xl">
            {description}
          </p>
          <CTAButton href="/contact" text={button1Text} variant="light" />
        </div>
      </div>
    </div>
  )
}
