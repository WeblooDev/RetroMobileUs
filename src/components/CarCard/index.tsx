'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CTAButton } from '../Button/CTAButton'

interface CarCardProps {
  slug?: string
  imageUrl: string
  model: string
  imageAlt?: string
  year?: number
  brand?: { id: string; name: string; slug: string }
  price: number
  downPayment: number
  hidePrice?: boolean
  bestDeal?: string
}

export default function CarCard({
  slug,
  imageUrl,
  imageAlt,
  model,
  year,
  brand,
  price,
  downPayment,
  hidePrice = false,
  bestDeal,
}: CarCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const fullModel = year || brand ? `${year || ''} ${brand?.name || ''} ${model}`.trim() : model

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }

    handleResize() // Run once on mount
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Link
      href={slug || '#'}
      className="relative w-[320px] bg-white rounded-md overflow-hidden shadow-md transition-all duration-500 ease-in"
      onMouseEnter={() => window.innerWidth >= 768 && setIsHovered(true)}
      onMouseLeave={() => window.innerWidth >= 768 && setIsHovered(false)}
    >
      {bestDeal && (
        <div className="absolute top-3 left-3 z-20 bg-blue-600 text-white text-xs font-bold py-1 px-2 uppercase">
          {bestDeal}
        </div>
      )}

      <div className="relative h-[250px] lg:h-[300px] w-full">
        <Image
          src={imageUrl || '/placeholder.svg'}
          alt={imageAlt || fullModel}
          fill
          className="object-cover"
        />
      </div>

      <div className="relative overflow-hidden p-4 text-white">
        <div
          className={`absolute inset-0 bg-white z-0 transform origin-top transition-transform duration-300 ease-in-out ${
            isHovered ? 'scale-y-100' : 'scale-y-0'
          }`}
        />

        <div
          className={`relative z-10 transition-colors duration-500 ${
            isHovered ? 'text-[#121221]' : 'text-white'
          }`}
        >
          <h3 className=" text-[24px] lg:text-[32px]">{fullModel}</h3>

          <div className="mt-2">
            <p className=" text-[20px] lg:text-[28px]">
              {hidePrice ? 'Contact for Price' : `$${price.toLocaleString()}/month +TTL`}
            </p>
            <p className=" text-[14px] lg:text-[20px]">
              {hidePrice
                ? ''
                : `$${downPayment.toLocaleString()} Down Payment / Subject to approval`}
            </p>
          </div>

          <div
            className={`flex gap-2 mt-4 transition-all duration-300 ease-in-out ${
              isHovered
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 -translate-y-3 pointer-events-none'
            }`}
          >
            <CTAButton href="/lease" text="Lease Now" variant="dark" arrow={false} />
          </div>
        </div>
      </div>
    </Link>
  )
}
