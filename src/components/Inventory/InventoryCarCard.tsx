'use client'

import { Media } from '../Media'
import type { Car } from '@/payload-types'
import { useState, useEffect } from 'react'
import { CTAButton } from '../Button/CTAButton'
import AvailabilityButton from './AvailabilityButton'
import CarDetailModal from './SoldCarDetailModal'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { formatCarPrice } from '@/utilities/priceDisplay'

interface InventoryCarCardProps {
  car: Car
}

export default function InventoryCarCard({ car }: InventoryCarCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const { model, slug, image, availability, year, brand } = car
  const router = useRouter()

  const carSold = car.availability === 'sold'
  const redirect = `/lease?car=${slug}`
  const buttonText = carSold ? 'Expand Deal Details' : 'Lease Now'

  useEffect(() => {
    const checkMobile = () => {
      setIsHovered(window.innerWidth < 1024 ? true : false)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div
      className="relative flex flex-col rounded-lg overflow-hidden transition-all duration-500 ease-in min-h-[320px] md:h-full cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        cursor: 'pointer',
      }}
    >
      {/* Best Deal Badge */}
      <AvailabilityButton availability={availability} />

      {/* Car Image with Sold Overlay */}
      <div className="relative overflow-hidden shadow-lg">
        <Link href={`/inventory/car/${slug}`}>
          <Media
            resource={image}
            alt={model}
            loading="lazy"
            className="w-full h-full"
            imgClassName={`w-full aspect-video object-cover cursor-pointer transition-all duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}
            onClick={() => router.push(`/inventory/car/${slug}`)}
          />
          {/* White overlay if car is sold */}
          {availability === 'sold' && <div className="absolute inset-0 bg-white/40 z-10 " />}
        </Link>
      </div>

      {/* Card Content */}
      <div className="relative w-full p-4 flex flex-col flex-grow text-white">
        {/* White background sliding down */}
        <div
          className={`absolute inset-0 bg-white z-0 transform origin-top transition-transform duration-300 ease-in-out ${
            isHovered ? 'scale-y-100' : 'scale-y-0'
          }`}
        />

        {/* Foreground Content */}
        <div
          className={`relative z-10 transition-colors duration-500 flex flex-col flex-grow ${
            isHovered ? 'text-[#121221]' : 'text-white'
          }`}
        >
          <Link href={`/inventory/car/${slug}`}>
            <h3 className=" text-2xl lg:text-3xl 2xl:text-4xl cursor-pointer hover:underline">
              {year} {typeof brand === 'object' && brand ? brand.name : brand} {model}
            </h3>
          </Link>

          <div className="mt-2">
            <Link href={`/inventory/car/${slug}`}>
              <p className=" text-xl lg:text-2xl cursor-pointer hover:underline">
                {formatCarPrice(car)}
              </p>
            </Link>
          </div>

          {/* Button */}
          <div
            className={`flex gap-2 mt-auto pt-4 transition-all duration-300 ease-in-out ${
              isHovered
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 -translate-y-3 pointer-events-none'
            }`}
          >
            <CTAButton
              href={!carSold ? redirect : ''}
              text={buttonText}
              variant="dark"
              arrow={false}
              onclick={carSold ? () => setShowModal(true) : undefined}
            />
          </div>
        </div>
      </div>
      {showModal && carSold && <CarDetailModal car={car} onClose={() => setShowModal(false)} />}
    </div>
  )
}
