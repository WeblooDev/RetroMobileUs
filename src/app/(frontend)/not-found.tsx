import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 | duPont REGISTRY Luxury Car Leasing',
  description: 'The page you are looking for does not exist.',
  openGraph: {
    title: '404 | duPont REGISTRY Luxury Car Leasing',
    description: 'The page you are looking for does not exist.',
  },
  twitter: {
    card: 'summary_large_image',
    title: '404 | duPont REGISTRY Luxury Car Leasing',
    description: 'The page you are looking for does not exist.',
  },
}

export default function NotFound() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center text-white overflow-hidden">
      <Image
        src="/bentley.webp"
        alt="404 Background"
        fill
        priority
        quality={100}
        className="object-cover z-0"
      />
      <div className="absolute inset-0 bg-black bg-opacity-60 z-10" />
      <div className="relative z-20 text-center p-10">
        <h1 className=" text-3xl md:text-5xl font-bold mb-4">{'Your Page Cannot Be Located'}</h1>
        <p className="font-inter text-base md:text-lg mb-8">
          {"Continue your search for the world's most exclusive cars."}
        </p>

        <Link
          href="/"
          className="font-inter relative inline-flex items-center gap-2 overflow-hidden group border border-white bg-[transparent] text-white  rounded-md px-4 py-2 transition-all duration-300"
        >
          <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-white">
            {'Go to Home'}
            <ArrowRight className="w-4 h-4" />
          </span>
          <span className="absolute inset-0 bg-black origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out z-0" />
        </Link>
      </div>
    </div>
  )
}
