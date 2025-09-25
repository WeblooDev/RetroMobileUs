'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LeaseNowButton() {
  const [visible, setVisible] = useState(false)
  const router = useRouter()

  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentY = window.scrollY
      if (currentY > 150 && currentY > lastScrollY) setVisible(true)
      else if (currentY < lastScrollY) setVisible(false)

      lastScrollY = currentY
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => {
    router.push('/lease')
  }

  return (
    <div
      className={`fixed bottom-16 right-4 sm:bottom-28 sm:right-6 z-50 transition-transform duration-500 ease-in-out
        ${visible ? 'scale-100 translate-y-0' : 'scale-0 translate-y-4'}`}
    >
      <div
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleClick()}
        className="group cursor-pointer relative overflow-hidden bg-[#1A1AE5] hover:bg-white text-white hover:text-[#1A1AE5] font-ivar text-xl md:text-2xl lg:text-3xl rounded-full flex flex-col items-center justify-center leading-none shadow-lg w-[80px] h-[80px] md:w-[100px] md:h-[100px] p-6 md:p-10 lg:p-16 transition-all duration-300 ease-in-out font-bold"
      >
        <span className="z-10">Lease</span>
        <span className="z-10">Now</span>
      </div>
    </div>
  )
}
