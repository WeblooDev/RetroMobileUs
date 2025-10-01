'use client'

import React from 'react'
import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems ?? []

  return (
    <nav className="flex items-center gap-3">
      {navItems.map((item, i) => {
        const label = item?.label ?? 'Link'
        const url = item?.url ?? '#'
        const key = (item as any)?.id ?? `${url}-${i}`

        return (
          <CMSLink key={key} appearance="link" url={url}>
            {label}
          </CMSLink>
        )
      })}

      <Link href="/search" className="inline-flex items-center">
        <span className="sr-only">Search</span>
        <SearchIcon className="h-5 w-5 text-primary" />
      </Link>
    </nav>
  )
}
