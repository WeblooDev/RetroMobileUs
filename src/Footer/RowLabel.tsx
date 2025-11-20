'use client'

import { Header } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'
import React from 'react'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<Header['navItems']>[number]>()

  const navLink = data?.data?.link

  const base = data.rowNumber !== undefined ? `Nav item ${data.rowNumber + 1}` : 'Nav item'

  const label = navLink?.label ? `${base}: ${navLink.label}` : base

  return <div>{label}</div>
}
