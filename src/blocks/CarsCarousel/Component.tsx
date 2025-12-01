'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import type { Car, CarsCarousel as CarsCarouselTypes } from '@/payload-types'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import InventoryCarCard from '@/components/Inventory/InventoryCarCard'
import InventoryHeader from '@/components/Inventory/InventoryHeader'
import CarCardSkeleton from '@/components/Inventory/CarCardSkeleton'
import { ArrowRight } from 'lucide-react'
import { CMSLink } from '@/components/Link'
import { fadeInUp, staggerContainer, staggerItem } from '@/utilities/animations'

export const CarsCarousel: React.FC<CarsCarouselTypes> = ({ title, subTitle }) => {
  const [cars, setCars] = useState<Car[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }))

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setIsLoading(true)

        const params = new URLSearchParams({
          limit: '6',
          availability: 'not-sold',
        })
        params.append('hidden', 'false')

        const res = await fetch(`/api/custom_cars?${params.toString()}`)
        const data = await res.json()

        setCars(data.docs || [])
      } catch (error) {
        console.error('Error fetching hero cars:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCars()
  }, [])

  return (
    <motion.section
      className="container"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      <div className="w-full flex flex-col gap-2 lg:gap-4 pt-4 lg:pt-8">
        <InventoryHeader title={title} description={subTitle} icons />
        {!isLoading && (
          <motion.div
            className="flex justify-end w-full items-center text-xl font-inter lg:text-2xl"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CMSLink
              type="custom"
              url="/inventory"
              appearance="inline"
              className="flex gap-2 items-center group"
            >
              <p className="text-base transition-all duration-300 group-hover:underline">
                VIEW ALL
              </p>
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </CMSLink>
          </motion.div>
        )}
        {/* Car collection */}
        <motion.div
          className="relative p-0 m-0 flex flex-col w-full overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Carousel
            plugins={[plugin.current]}
            opts={{
              align: 'start',
              loop: true,
              skipSnaps: false,
              dragFree: true,
              containScroll: 'keepSnaps',
            }}
            className="w-full gap-4 lg:gap-6 xl:gap-8 2xl:gap-10 ultrawide:gap-16"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {isLoading
                ? [...Array(3)].map((_, i) => (
                    <CarouselItem
                      key={i}
                      className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 min-w-0"
                    >
                      <CarCardSkeleton />
                    </CarouselItem>
                  ))
                : cars.map((car) => (
                    <CarouselItem
                      key={car.id}
                      className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 min-w-0"
                    >
                      <InventoryCarCard car={car} />
                    </CarouselItem>
                  ))}
            </CarouselContent>
            {/* Navigation Controls */}
            <div className="flex justify-center gap-4 xl:gap-8 mt-4 lg:mt-6 xl:mt-8 2xl:mt-10 ultrawide:mt-16 text-sm md:text-base xl:text-lg font-semibold text-black">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default CarsCarousel
