'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

type CTAButtonProps = {
  children: React.ReactNode
  variant?: 'olive' | 'black' | 'outlineWhite'
  size?: 'normal' | 'big'
  className?: string
  onClick?: React.MouseEventHandler<HTMLElement>
  type?: 'button' | 'submit' | 'reset'
  ariaLabel?: string
  disabled?: boolean
  /** when true, render styles onto the child element (e.g. CMSLink) */
  asChild?: boolean
}

const base =
  'font-ivar uppercase rounded-[30px] inline-flex items-center justify-center whitespace-nowrap transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/70'

const sizes = {
  normal: 'text-[17px] px-3 py-1',
  big: 'text-[27px] px-4 py-1',
} as const

const variants = {
  olive: `
    bg-[#8B9B5C] text-white
    hover:bg-white hover:text-black
    active:bg-white active:text-[#8B9B5C]
    disabled:opacity-60 disabled:pointer-events-none
  `,
  black: `
    bg-black text-white
    hover:bg-[#8B9B5C] hover:text-white
    active:bg-white active:text-black
    disabled:opacity-60 disabled:pointer-events-none
  `,
  outlineWhite: `
    bg-transparent text-white border border-white
    hover:bg-white hover:text-black
    active:bg-white active:text-black
    disabled:opacity-60 disabled:pointer-events-none
  `,
} as const

export function CTAButton({
  children,
  variant = 'olive',
  size = 'normal',
  className,
  onClick,
  type = 'button',
  ariaLabel,
  disabled,
  asChild = false,
}: CTAButtonProps) {
  const Comp = asChild ? Slot : 'button'
  const cls = cn(base, sizes[size], variants[variant], className)

  return (
    <Comp
      className={cls}
      onClick={onClick}
      aria-label={ariaLabel}
      {...(!asChild ? { type, disabled } : {})}
    >
      {children}
    </Comp>
  )
}
