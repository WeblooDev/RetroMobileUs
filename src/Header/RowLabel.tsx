'use client'
import { Header } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

type NavItem = NonNullable<Header['navItems']>[number]

export const RowLabel: React.FC<RowLabelProps> = () => {
  const row = useRowLabel<NavItem>()

  // Works for both old (link.label) and new (label) schemas
  const label =
    (row?.data && 'link' in (row.data as any) && (row.data as any).link?.label) ||
    (row?.data as any)?.label ||
    'Row'

  const index = row?.rowNumber !== undefined ? row.rowNumber + 1 : ''

  return <div>{`Nav item ${index}: ${label}`}</div>
}
