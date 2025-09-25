'use client'

import React from 'react'
import Link from 'next/link'
import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import type { Page, Post } from '@/payload-types'
import { useRouter } from 'next/navigation'

type CMSLinkWithCloseProps = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
  onClick?: () => void // for closing menu
}

export const CMSLinkWithClose: React.FC<CMSLinkWithCloseProps> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
    onClick,
  } = props

  // Move useRouter to the top level - always call it regardless of conditions
  const router = useRouter()

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${reference.value.slug}`
      : url

  if (!href) return null

  const size = sizeFromProps
  const variant = appearance === 'inline' ? 'link' : appearance
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault()
      onClick()

      // Delay navigation to allow menu closing animations
      router.push(href)
    }
  }

  const linkElement = (
    <Link href={href} className={cn(className)} {...newTabProps} onClick={handleClick}>
      {children ?? label}
    </Link>
  )

  if (appearance === 'inline') return linkElement

  return (
    <Button asChild className={className} size={size} variant={variant}>
      {linkElement}
    </Button>
  )
}
