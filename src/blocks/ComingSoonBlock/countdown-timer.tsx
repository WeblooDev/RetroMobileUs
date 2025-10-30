'use client'

import { useState, useEffect } from 'react'

interface CountdownTimerProps {
  targetDate: Date
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
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
  const month = targetDate.toLocaleDateString('en-US', { month: 'long' }).toUpperCase()
  const pad = (n: number) => n.toString().padStart(2, '0')

  return (
    <div className="flex p-4 gap-4 ">
      <div className="flex flex-col gap-2 items-center justify-center min-w-[60px] text-white">
        <h1 className="text-7xl md:text-[104px] leading-[60px] md:leading-[90px]">{day}</h1>
        <h4 className="text-lg font-light ">{month}</h4>
        <h4 className="text-3xl md:text-5xl font-light ">2026</h4>
      </div>

      <div className="w-px bg-white/50"></div>

      <div className="flex flex-col justify-between text-white gap-4">
        <div className="flex items-center justify-start gap-4">
          <h3 className="text-3xl md:text-5xl">{pad(timeLeft.days)}</h3>
          <h3 className="text-3xl md:text-4xl font-light uppercase ">Days</h3>
        </div>
        <div className="flex items-center justify-start gap-4">
          <h3 className="text-3xl md:text-5xl">{pad(timeLeft.hours)}</h3>
          <h3 className="text-3xl md:text-4xl font-light uppercase ">Hrs</h3>
        </div>
        <div className="flex items-center justify-start gap-4">
          <h3 className="text-3xl md:text-5xl">{pad(timeLeft.minutes)}</h3>
          <h3 className="text-3xl md:text-4xl font-light uppercase ">Min</h3>
        </div>
      </div>
    </div>
  )
}
