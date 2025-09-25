'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

type CTAButtonProps = {
  href: string
  text: string
  arrow?: boolean
  variant?: 'transparent' | 'light' | 'dark' | 'transparent-light'
  className?: string
  textClassName?: string
  iconClassName?: string
  onclick?: () => void
}

export const CTAButton: React.FC<CTAButtonProps> = ({
  href,
  text,
  arrow = true,
  variant = 'transparent',
  className = '',
  textClassName = '',
  iconClassName = '',
  onclick,
}) => {
  const baseClasses =
    'relative inline-flex items-center gap-2 px-6 py-2 font-inter transition-all duration-300 overflow-hidden group border'

  const textBase = 'relative z-10 transition-colors duration-300'
  const iconBase = 'h-4 w-4 relative z-10 transition-colors duration-300'

  const variantStyles = {
    transparent: {
      wrapper: 'border-black bg-transparent text-black',
      text: 'group-hover:text-white',
      icon: 'text-black group-hover:text-white',
      overlay: 'bg-black',
    },
    light: {
      wrapper: 'border border-white bg-white text-black',
      text: 'group-hover:text-white',
      icon: 'text-black group-hover:text-white',
      overlay: 'bg-black',
    },
    dark: {
      wrapper: 'border border-black bg-black text-white',
      text: 'group-hover:text-black',
      icon: 'text-white group-hover:text-black',
      overlay: 'bg-white',
    },
    'transparent-light': {
      wrapper: 'border-white bg-transparent text-white',
      text: 'group-hover:text-black',
      icon: 'text-white group-hover:text-black',
      overlay: 'bg-white',
    },
  }

  const style = variantStyles[variant]

  if (!href) {
    return (
      <button
        type="button"
        onClick={onclick}
        className={`${baseClasses} ${style.wrapper} ${className}`}
      >
        <span className={`${textBase} ${style.text} ${textClassName}`}>{text}</span>
        {arrow && (
          <ArrowRight
            className={`${iconBase} ${style.icon} ${iconClassName}`}
            stroke="currentColor"
          />
        )}
        <span
          className={`absolute left-0 top-0 h-full w-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 z-0 ${style.overlay}`}
        />
      </button>
    )
  }

  return (
    <Link href={href} className={`${baseClasses} ${style.wrapper} ${className}`} onClick={onclick}>
      <span className={`${textBase} ${style.text} ${textClassName}`}>{text}</span>
      {arrow && (
        <ArrowRight
          className={`${iconBase} ${style.icon} ${iconClassName}`}
          stroke="currentColor"
        />
      )}
      <span
        className={`absolute left-0 top-0 h-full w-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 z-0 ${style.overlay}`}
      />
    </Link>
  )
}
