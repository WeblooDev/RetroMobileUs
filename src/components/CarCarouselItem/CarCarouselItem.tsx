// CarCarouselItem
import type { FC } from 'react'
import { ArrowRight } from 'lucide-react'
import type { Car } from '@/payload-types'
import { Media } from '../Media'
import Link from 'next/link'

interface CarCarouselItemProps {
  car: Car
  index: number
  inventoryStyle?: boolean
}

export const CarCarouselItem: FC<CarCarouselItemProps> = ({
  car,
  index,
  inventoryStyle = false,
}) => {
  return (
    <section className={`${inventoryStyle ? 'container' : ''}`}>
      <Link href={`/lease?car=${car.slug}`}>
        <div
          className={`relative flex flex-col w-full h-[40vh] xl:h-screen overflow-hidden  xl:-mt-20 ${inventoryStyle ? 'max-h-[1000px]' : ''}`}
        >
          {/* Media component for the car image */}
          <Media
            resource={car.image}
            imgClassName="z-0 object-cover object-center w-full h-full aspect-video"
            priority
            alt={`${car.brand} ${car.model}`}
            loading="eager"
            fill
          />

          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-25 z-10" />

          {/* Content container */}
          <div className="relative z-20 flex h-full flex-col justify-between text-white p-4 md:p-6 lg:p-8 xl:p-12 2xl:p-16">
            {/* Top section */}
            <div className="tracking-normal lg:tracking-widest xl:mt-20 font-bold">
              <div className="flex flex-col">
                <div className="flex flex-col items-start justify-center gap-1 md:gap-2 lg:gap-3 xl:gap-4">
                  <h1 className="uppercase font-ivar text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl tracking-widest lg:tracking-[15px]">
                    {car.model}
                  </h1>
                  <h1 className="font-ivar text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl tracking-widest">
                    ${car.price?.toLocaleString()}/month +TTL
                  </h1>
                </div>
                <p className="font-ivar text-base md:text-lg lg:text-xl xl:text-2xl mt-2 tracking-wider">
                  ${car.downPayment?.toLocaleString()} Down Payment / Subject to approval
                </p>
              </div>
            </div>

            {/* Bottom section */}
            <div className="flex flex-col lg:flex-row items-center gap-4 justify-between">
              {/* Left side - Description */}
              {/* <div className="w-full max-w-full lg:max-w-[60%] h-full">
              <p className="text-base font-medium md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-inter">
                {car.model}
              </p>
            </div> */}

              {/* CTA Link */}
              <div className="flex items-center justify-end w-full h-full">
                <Link
                  href={`/lease?car=${car.slug}`}
                  className="inline-flex items-center font-inter font-medium text-base lg:text-lg 2xl:text-xl uppercase hover:underline"
                >
                  GET PRE-QUALIFIED <ArrowRight className="ml-2 h-4 w-4 lg:h-5 lg:w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </section>
  )
}
