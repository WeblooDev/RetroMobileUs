"use client"

import { useState, useEffect } from "react"

interface CountdownTimerProps {
  targetDate: Date
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

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
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  // ✅ use targetDate instead of new Date()
  const day = targetDate.getDate()
  const month = targetDate.toLocaleDateString("en-US", { month: "long" }).toUpperCase()

  return (
    <div className="flex p-4 gap-4 ">
      {/* Left side - Target date */}
      <div className="flex flex-col items-center justify-center min-w-[60px] text-white">
        <h1 className="text-8xl ">{day}</h1>
        <h4 className="text-lg font-light ">{month}</h4>
      </div>

      {/* Divider */}
      <div className="w-px bg-white/50"></div>

      {/* Right side - Countdown */}
      <div className="flex flex-col justify-between text-white gap-4">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-5xl">{timeLeft.days}</h3>
          <h3 className="text-4xl font-light ">Days </h3>


        </div>
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-5xl">{timeLeft.minutes}</h3>
          <h3 className="text-4xl font-light ">Mins</h3>

        </div>
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-5xl">{timeLeft.seconds}</h3>
          <h3 className="text-4xl font-light ">Secs</h3>
        </div>
      </div>
    </div>
  )
}
