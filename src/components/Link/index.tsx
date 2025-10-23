'use client'

import React from 'react'
import Link from 'next/link'
import { cn } from '@/utilities/ui'
import { Button, type ButtonProps } from '@/components/ui/button'
import { CTAButton } from '@/components/CTAButton'
import type { Page, Post } from '@/payload-types'

type CTAVariant = 'olive' | 'black' | 'outlineWhite'
type CTASize = 'normal' | 'big'

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant'] | CTAVariant
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  size?: ButtonProps['size'] | CTASize | null
  type?: 'custom' | 'reference' | null
  url?: string | null
  ariaLabel?: string
  disabled?: boolean
}

function isCTAVariant(v: any): v is CTAVariant {
  return v === 'olive' || v === 'black' || v === 'outlineWhite'
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
    ariaLabel,
    disabled,
  } = props

  const href =
    type === 'reference' && typeof reference?.value === 'object' && (reference.value as any)?.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${(reference.value as any).slug}`
      : url

  if (!href) return null

  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} href={href} aria-label={ariaLabel} {...newTabProps}>
        {children ?? label}
      </Link>
    )
  }

  if (isCTAVariant(appearance)) {
    const ctaSize = (sizeFromProps as CTASize) || 'normal'
    return (
      <CTAButton
        asChild
        variant={appearance}
        size={ctaSize}
        className={className}
        ariaLabel={ariaLabel}
        disabled={disabled}
      >
        <Link href={href} {...newTabProps}>
          {children ?? label}
        </Link>
      </CTAButton>
    )
  }

  const buttonVariant = appearance as ButtonProps['variant']
  const buttonSize = sizeFromProps as ButtonProps['size'] | undefined

  return (
    <Button asChild className={className} size={buttonSize} variant={buttonVariant} disabled={disabled}>
      <Link href={href} aria-label={ariaLabel} {...newTabProps}>
        {children ?? label}
      </Link>
    </Button>
  )
}
