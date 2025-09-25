'use client'
import { useEffect, useState } from 'react'

export function useScrollHeader() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY
      if (current < 10) setIsVisible(true)
      else if (current > lastScrollY && current > 100) setIsVisible(false)
      else if (current < lastScrollY) setIsVisible(true)
      setLastScrollY(current)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return isVisible
}
