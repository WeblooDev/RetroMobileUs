import type { Header as HeaderType } from '@/payload-types'
import type { HeaderV0Props, V0NavItem } from './Component.client'

export function mapPayloadToV0(data: HeaderType): HeaderV0Props {
  const nav: V0NavItem[] = (data.navItems ?? []).map((item: any) => {
    const dd = (item?.dropdownLinks ?? []).map((d: any) => ({
      name: d?.label ?? '',
      href: d?.url ?? '#',
    }))
    return dd.length > 0
      ? { name: item?.label ?? '', hasDropdown: true, dropdownItems: dd }
      : { name: item?.label ?? '', href: item?.url ?? '#' }
  })

  return {
    logoResource: data.logo as any,
    nav,
    ctas: {
      primary:
        data?.ctaLink?.link?.url && data?.ctaLink?.link?.label
          ? { href: data.ctaLink.link.url, label: data.ctaLink.link.label }
          : undefined,
      secondary:
        data?.secondaryCTA?.link?.url && data?.secondaryCTA?.link?.label
          ? { href: data.secondaryCTA.link.url, label: data.secondaryCTA.link.label }
          : undefined,
    },
    // ✅ NEW: pass banner through
    banner: {
      enabled: !!data?.banner?.enabled,
      p1: (data?.banner?.p1 ?? '').trim(),
      p2: (data?.banner?.p2 ?? '').trim(),
    },
  }
}
