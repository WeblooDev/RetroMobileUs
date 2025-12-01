'use client'

import React from 'react'
import Link from 'next/link'
import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import type { Page, Post } from '@/payload-types'

export type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  size?: ButtonProps['size']
  type?: 'custom' | 'reference' | null
  url?: string | null
  children?: React.ReactNode
  ariaLabel?: string
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    className,
    label,
    newTab,
    reference,
    size,
    url,
    children,
  } = props

  const href =
    type === 'reference' &&
    reference &&
    typeof reference.value === 'object' &&
    (reference.value as any)?.slug
      ? `${reference.relationTo !== 'pages' ? `/${reference.relationTo}` : ''}/${(reference.value as any).slug}`
      : (url?.trim() ?? '')

  if (!href) return null

  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} href={href} {...newTabProps}>
        {children ?? label}
      </Link>
    )
  }

  return (
    <Button asChild variant={appearance} size={size} className={className}>
      <Link href={href} {...newTabProps}>
        {children ?? label}
      </Link>
    </Button>
  )
}
