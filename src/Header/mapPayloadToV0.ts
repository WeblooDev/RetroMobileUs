// src/components/Nav/mapPayloadToV0.ts (clean version for the simplified schema)
import type { Header as HeaderType } from '@/payload-types'
import type { HeaderV0Props, V0NavItem } from './Component.client'

export function mapPayloadToV0(data: HeaderType): HeaderV0Props {
  const nav: V0NavItem[] = (data.navItems ?? []).map((item: any) => {
    const label = item?.label ?? ''
    const href = item?.url ?? '#'
    const dd = (item?.dropdownLinks ?? []).map((d: any) => ({
      name: d?.label ?? '',
      href: d?.url ?? '#',
    }))

    return dd.length > 0
      ? { name: label, hasDropdown: true, dropdownItems: dd }
      : { name: label, href }
  })

  const logo =
    typeof data.logo === 'object' && data.logo && 'alt' in data.logo
      ? { title: data.logo.alt ?? 'LOGO', subtitle: 'SINCE 1963' }
      : { title: 'LOGO', subtitle: 'SINCE 1963' }

  const primaryCTA = data?.ctaLink?.link?.url
    ? { label: data.ctaLink.link.label ?? 'Buy Ticket', href: data.ctaLink.link.url }
    : undefined


  const secondaryRaw = data?.secondaryCTA?.link
  const secondaryCTA = secondaryRaw?.url
    ? { label: secondaryRaw.label ?? 'Apply to Exhibit', href: secondaryRaw.url }
    : undefined

  return { logo, nav, ctas: { primary: primaryCTA, secondary: secondaryCTA } }
}
