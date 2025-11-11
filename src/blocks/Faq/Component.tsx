"use client"

import { useState, useId } from "react"
import type { Faq as FaqBlock } from "@/payload-types"
import arrowRight from "../../../public/arowright.svg" // ensure filename matches your public asset

function clsx(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ")
}

const Faq: React.FC<FaqBlock> = ({
  items,
  accentColor = "#7A8E57",
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const baseId = useId()

  // Coerce possible null -> string
  const accent = (accentColor ?? "#7A8E57") as string

  const toggle = (i: number) => setOpenIndex((curr) => (curr === i ? null : i))

  return (
    <section className="container py-10 md:py-14">
   

      <div className="flex flex-col gap-12">
        {(items ?? []).map((row, i) => {
          const isOpen = openIndex === i
          const qId = `${baseId}-q-${i}`
          const aId = `${baseId}-a-${i}`

          return (
            <div
              key={row?.id ?? i}
              className={clsx(
                "rounded-md shadow-lg transition-colors",
                "bg-white",
                isOpen ? "border-[2px]" : "border border-transparent",
              )}
              style={isOpen ? { borderColor: accent } : undefined}
            >
              {/* Question row */}
              <button
                id={qId}
                aria-expanded={isOpen}
                aria-controls={aId}
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between gap-6 px-5 md:px-7 py-5 md:py-8 text-left"
              >
                <span className="text-base md:text-lg lg:text-2xl">
                  {row?.question}
                </span>

                {/* Arrow circle with color swap and rotation */}
                <div
                  className={clsx(
                    "h-7 w-7 md:first-letter:h-8 md:w-8 lg:h-10 lg:w-10 rounded-full p-2 shadow-lg transition-colors duration-300",
                    "flex items-center justify-center"
                  )}
                  style={{ backgroundColor: isOpen ? accent : "#FFFFFF" }}
                >
                  <span
                    aria-hidden
                    className={clsx(
                      "block h-4 w-4 transition-transform duration-300 ",
                      isOpen ? "rotate-90" : "rotate-0"
                    )}
                    style={{
                      WebkitMaskImage: `url(${arrowRight.src})`,
                      maskImage: `url(${arrowRight.src})`,
                      WebkitMaskRepeat: "no-repeat",
                      maskRepeat: "no-repeat",
                      WebkitMaskPosition: "center",
                      maskPosition: "center",
                      WebkitMaskSize: "contain",
                      maskSize: "contain",
                      backgroundColor: isOpen ? "#FFFFFF" : accent,
                      display: "block",
                    }}
                  />
                </div>
              </button>

              {/* Answer */}
              <div
                id={aId}
                role="region"
                aria-labelledby={qId}
                className={clsx(
                  "overflow-hidden transition-[max-height,opacity] duration-300",
                  isOpen ? "opacity-100" : "opacity-0",
                )}
                style={{
                  maxHeight: isOpen ? 500 : 0,
                }}
              >
                <div className="px-5 md:px-7 pb-5 md:pb-6 mt-2 text-sm md:text-base lg:text-lg text-black w-[90%]">
                  {row?.answer}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Faq
