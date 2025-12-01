'use client'

import type React from 'react'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import type { Car } from '@/payload-types'
import { CarCarouselItem } from '@/components/CarCarouselItem/CarCarouselItem'
import { fadeIn } from '@/utilities/animations'

interface HeroCarsCarouselProps {
  inventoryStyle?: boolean
}

export const HeroCarsCarousel: React.FC<HeroCarsCarouselProps> = ({ inventoryStyle = false }) => {
  const [cars, setCars] = useState<Car[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setIsLoading(true)
        const params = new URLSearchParams({
          limit: '6',
          // availability: 'best_deal',
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

  if (isLoading) {
    return (
      <div className="flex min-h-screen justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
      </div>
    )
  }

  return (
    <motion.div variants={fadeIn} initial="hidden" animate="visible">
      <Carousel className="w-full h-full  relative">
        <CarouselContent>
          {cars.map((car, index) => (
            <CarouselItem key={car.id || index}>
              <CarCarouselItem car={car} index={index + 1} inventoryStyle={inventoryStyle} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious
          className={`absolute ${
            inventoryStyle ? 'left-4 md:left-[11%]' : 'left-4'
          } top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white border-none z-20`}
        />

        <CarouselNext
          className={`absolute ${
            inventoryStyle ? 'right-4 md:right-[11%]' : 'right-4'
          } top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white border-none z-20`}
        />
      </Carousel>
    </motion.div>
  )
}
