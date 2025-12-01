'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

type CTAButtonProps = {
  children: React.ReactNode
  variant?: 'olive' | 'black' | 'outlineWhite'
  size?: 'normal' | 'big'
  className?: string
  href?: string
  onClick?: React.MouseEventHandler<HTMLElement>
  type?: 'button' | 'submit' | 'reset'
  ariaLabel?: string
  disabled?: boolean
}

const base =
  'font-ivar uppercase rounded-[30px] inline-flex items-center justify-center whitespace-nowrap transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/70'

const sizes: Record<NonNullable<CTAButtonProps['size']>, string> = {
  normal: 'text-[17px] px-5 py-1',
  big: 'text-[17px] px-5 py-1',
}

const variants: Record<NonNullable<CTAButtonProps['variant']>, string> = {
  olive: `
    bg-[#8B9B5C] text-white
    border border-[#8B9B5C] hover:border-[black]
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
}

export function CTAButton({
  children,
  variant = 'olive',
  size = 'normal',
  className,
  href,
  onClick,
  type = 'button',
  ariaLabel,
  disabled,
}: CTAButtonProps) {
  const cls = cn(base, sizes[size], variants[variant], className)

  if (href) {
    return (
      <a href={href} aria-label={ariaLabel} onClick={onClick as any} className={cls} role="button">
        {children}
      </a>
    )
  }

  return (
    <button
      type={type}
      aria-label={ariaLabel}
      className={cls}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
