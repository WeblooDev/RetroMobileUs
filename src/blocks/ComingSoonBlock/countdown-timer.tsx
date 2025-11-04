// countdown-timer.tsx
'use client'

import { useState, useEffect } from 'react'

interface CountdownTimerProps {
  targetDate: Date
  displayDayOverride?: string
  displayMonthYearOverride?: string
  topText?: string // <-- NEW
}

export function CountdownTimer({
  targetDate,
  displayDayOverride,
  displayMonthYearOverride,
  topText, // <-- NEW
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

  const day = targetDate.getDate()
  const month = targetDate.toLocaleDateString('en-US', { month: 'long' })
  const year = targetDate.getFullYear()
  const pad = (n: number) => n.toString().padStart(2, '0')

  return (
    <div className="flex p-4 gap-4 ">
      <div className="flex flex-col gap-2 items-center justify-center min-w-[60px] text-white">
        {topText?.trim() && (
          <h2 className="text-5xl md:text-7xl lg:text-[88px] leading-[60px] lg:leading-[90px]">
            {topText}
          </h2>
        )}

     

        <div className="flex items-end gap-2">
          {displayMonthYearOverride ? (
            <h4 className="text-lg font-light ">{displayMonthYearOverride}</h4>
          ) : (
            <>
              <h4 className="text-2xl font-light ">{month.toUpperCase()}</h4>
              <h4 className="text-2xl font-light ">{year}</h4>
            </>
          )}
        </div>
      </div>

      <div className="w-px bg-white/50" />

      <div className="flex flex-col justify-between text-white gap-2">
        <div className="flex items-center justify-start gap-4">
          <h3 className="text-2xl md:text-4xl">{pad(timeLeft.days)}</h3>
          <h3 className="text-2xl md:text-3xl font-light uppercase ">Days</h3>
        </div>
        <div className="flex items-center justify-start gap-4">
          <h3 className="text-2xl md:text-4xl">{pad(timeLeft.hours)}</h3>
          <h3 className="text-2xl md:text-3xl font-light uppercase ">Hrs</h3>
        </div>
        <div className="flex items-center justify-start gap-4">
          <h3 className="text-2xl md:text-4xl">{pad(timeLeft.minutes)}</h3>
          <h3 className="text-2xl md:text-3xl font-light uppercase ">Min</h3>
        </div>
      </div>
    </div>
  )
}
