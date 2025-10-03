"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

type LineBlockProps = {
  color?: string
  duration?: number
}

export default function LineBlock({ color = "#8B9B5C", duration = 1 }: LineBlockProps) {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!barRef.current) return

    gsap.fromTo(
      barRef.current,
      { width: "0%" },
      {
        width: "100%",
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: barRef.current,
          start: "top 80%",
        },
      }
    )
  }, [duration])

  return (
    <section className="container w-full  py-8">
      <div className="w-full h-[1px] bg-muted overflow-hidden">
        <div
          ref={barRef}
          className="h-[3px]"
          style={{ backgroundColor: color, width: "0%" }}
        />
      </div>
    </section>
  )
}
