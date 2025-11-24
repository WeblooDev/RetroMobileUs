"use client"
import React from "react"
type Props = {
  label?: string
  className?: string
  variant?: "olive" | "black" | "outlineWhite"
  size?: "ctaBig" | "md" | "sm"
}
const base =
  " inline-flex items-center justify-center rounded-full transition focus:outline-none focus:ring-2 focus:ring-offset-2"
const sizeMap = {
  ctaBig: "px-7 py-3 text-base md:text-lg",
  md: "px-5 py-2.5 text-sm md:text-base",
  sm: "px-4 py-2 text-sm",
}
const variantMap = {
  olive: "bg-[#7A8E57] text-white hover:opacity-90 focus:ring-[#7A8E57]",
  black: "bg-black text-white hover:opacity-90 focus:ring-black",
  outlineWhite:
    "bg-transparent text-white border border-white/80 hover:bg-white hover:text-black focus:ring-white",
}
export const TixpubButton: React.FC<Props> = ({
  label = "Buy Tickets",
  className,
  variant = "olive",
  size = "ctaBig",
}) => {
  return (
    <button
      type="button"
      className={`${base} ${sizeMap[size]} ${variantMap[variant]} ${className ?? ""}`}
    >
      {label}
    </button>
  )
}
export default TixpubButton





