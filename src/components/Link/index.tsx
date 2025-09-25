import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

import type { Page, Post } from '@/payload-types'

type CMSLinkType = {
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
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
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
  } = props
  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${reference.value.slug}`
      : url
  if (!href) return null
  const size = sizeFromProps
  const variant = appearance === 'inline' ? 'link' : appearance
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}
  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} href={href || ''} {...newTabProps}>
        {children ?? label}
      </Link>
    )
  }
  return (
    <Button asChild className={className} size={size} variant={variant}>
      <Link className={cn(className)} href={href || ''} {...newTabProps}>
        {children ?? label}
      </Link>
    </Button>
  )
}
