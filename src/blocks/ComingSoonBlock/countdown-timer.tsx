'use client'

import { useState, useEffect } from 'react'

interface CountdownTimerProps {
  targetDate: Date
  displayDayOverride?: string
  displayMonthYearOverride?: string
  topText?: string
}

export function CountdownTimer({
  targetDate,
  displayDayOverride,
  displayMonthYearOverride,
  topText,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date()
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }
    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  const day = targetDate.getDate().toString()
  const month = targetDate.toLocaleDateString('en-US', { month: 'long' })
  const year = targetDate.getFullYear()
  const pad = (n: number) => n.toString().padStart(2, '0')

  return (
    <div className="flex p-4 gap-4">
      <div className="flex flex-col gap-0 md:gap-2 items-center justify-center min-w-[60px] text-white">
        {topText?.trim() && (
          <h2 className="text-4xl md:text-7xl lg:text-[88px] leading-[60px] lg:leading-[90px]">
            {topText}
          </h2>
        )}


        {/* Month + Year */}
        <div className="flex items-end gap-0 md:gap-2">
          {displayMonthYearOverride ? (
            <h4 className="text-base md:text-lg font-light">{displayMonthYearOverride}</h4>
          ) : (
            <>
              <h4 className="text-base md:text-2xl font-light">{month.toUpperCase()}</h4>
              <h4 className="text-base md:text-2xl font-light">{year}</h4>
            </>
          )}
        </div>
      </div>

      <div className="w-px bg-white/50" />

      <div className="flex flex-col justify-center text-white gap-2">
        <div className="flex items-center justify-start gap-2 flex-col ">
          <h3 className="text-3xl md:text-5xl lg:text-7xl py-2 px-4 bg-[#8B9B5C] rounded-xl">{pad(timeLeft.days)}</h3>
          <h3 className="text-base md:text-xl font-light uppercase">Days</h3>
        </div>
      </div>
    </div>
  )
}
