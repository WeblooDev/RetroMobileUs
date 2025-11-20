'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Menu, X } from 'lucide-react'
import type { Header as HeaderDoc } from '@/payload-types'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import { cn } from '@/lib/utils'
import { useScrollHeader } from './useScrollHeader'

type Props = HeaderDoc

export default function HeaderClient({ logo, navItems, ctaLink, secondaryCTA, banner }: Props) {
  const isVisible = useScrollHeader()
  const showBanner = Boolean(banner?.enabled && (banner?.p1 || banner?.p2))

  // Desktop dropdown state
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const closeTimer = useRef<number | null>(null)
  const GAP_PX = 30

  const open = (name: string) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    setOpenDropdown(name)
  }

  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setOpenDropdown(null), 120)
  }

  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
  }

  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null)

  useEffect(() => {
    if (!mobileMenuOpen) setMobileOpenDropdown(null)
  }, [mobileMenuOpen])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out',
        isVisible ? 'translate-y-0' : '-translate-y-full',
      )}
    >
      {showBanner && (
        <div className="w-full bg-[#8B9B5C] flex flex-col md:flex-row gap-0 md:gap-4 items-center justify-center text-white p-2">
          {banner?.p1 ? <p className="text-sm md:text-lg font-bold">{banner.p1}</p> : null}
          {banner?.p2 ? <p className="text-sm md:text-lg font-light">{banner.p2}</p> : null}
        </div>
      )}

      <div className="bg-black/70 backdrop-blur-[30px] text-white">
        <div className="px-6 md:px-8 py-2">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" aria-label="Home">
              <Media resource={logo} alt="Logo" priority imgClassName="h-auto w-auto" />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {(navItems ?? []).map((item, idx) => {
                const mainLink = (item as any).link
                const hasDropdown = (item.dropdownLinks?.length ?? 0) > 0
                const label = mainLink?.label || `Nav ${idx + 1}`

                return (
                  <div
                    key={label}
                    className="relative"
                    onMouseEnter={() => {
                      cancelClose()
                      if (label && hasDropdown) open(label)
                    }}
                    onMouseLeave={scheduleClose}
                  >
                    {/* Top-level nav item using CMSLink */}
                    <CMSLink
                      {...mainLink}
                      className="!font-ivar flex items-center gap-1 text-sm uppercase py-2 px-4 hover:bg-[#8B9B5C]"
                      onFocus={() => hasDropdown && open(label)}
                      onBlur={scheduleClose}
                    >
                      <span>{label}</span>
                      {hasDropdown && <ChevronDown className="h-4 w-4" aria-hidden />}
                    </CMSLink>

                    {hasDropdown && openDropdown === label && (
                      <div
                        className="absolute left-0"
                        style={{ top: `calc(100% + ${GAP_PX}px)` }}
                        onMouseEnter={cancelClose}
                        onMouseLeave={scheduleClose}
                        onFocusCapture={cancelClose}
                        onBlurCapture={scheduleClose}
                      >
                        {/* Hover gap to keep dropdown open */}
                        <div
                          className="absolute left-0 right-0 bg-transparent"
                          style={{ height: GAP_PX, top: `-${GAP_PX}px` }}
                          aria-hidden
                        />
                        <div className="bg-[#8B9B5C] backdrop-blur-sm border border-[#8B9B5C] min-w-[220px]">
                          {(item.dropdownLinks ?? []).map((dd, j) => {
                            const ddLink = (dd as any).link
                            if (!ddLink) return null

                            return (
                              <CMSLink
                                key={ddLink.label || j}
                                {...ddLink}
                                className="!font-ivar block text-[14px] hover:bg-[white] hover:text-black px-6 py-2 uppercase"
                              >
                                {ddLink.label}
                              </CMSLink>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-3">
              {ctaLink?.link && (
                <CMSLink
                  {...ctaLink.link}
                  appearance="olive"
                  size="ctaBig"
                  className="tixpub-buytix"
                />
              )}
              {secondaryCTA?.link && (
                <CMSLink
                  {...secondaryCTA.link}
                  appearance="outlineWhite"
                  size="ctaBig"
                  newTab
                />
              )}
            </div>

            {/* Mobile burger */}
            <div className="md:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen((v) => !v)}
                aria-label="Toggle menu"
                className="p-2"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/15">
            <div className="px-4 py-6 space-y-4">
              {(navItems ?? []).map((item, idx) => {
                const mainLink = (item as any).link
                const hasDropdown = (item.dropdownLinks?.length ?? 0) > 0
                const label = mainLink?.label || `Nav ${idx + 1}`
                const isOpen = mobileOpenDropdown === label

                return (
                  <div key={label}>
                    {hasDropdown ? (
                      <div>
                        <div className="flex items-center justify-between">
                          <CMSLink
                            {...mainLink}
                            className="block text-sm py-1 px-2 !font-ivar uppercase hover:underline hover:bg-[#8B9B5C] w-fit"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {label}
                          </CMSLink>
                          <button
                            type="button"
                            aria-expanded={isOpen}
                            aria-label={`Toggle ${label} submenu`}
                            className="p-2"
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              setMobileOpenDropdown((v) => (v === label ? null : label))
                            }}
                          >
                            <ChevronDown
                              className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')}
                            />
                          </button>
                        </div>
                        {isOpen && (
                          <div className="ml-4 mt-2 space-y-2">
                            {(item.dropdownLinks ?? []).map((dd, j) => {
                              const ddLink = (dd as any).link
                              if (!ddLink) return null

                              return (
                                <CMSLink
                                  key={ddLink.label || j}
                                  {...ddLink}
                                  className="block text-sm py-1 px-2 !font-ivar uppercase hover:underline hover:bg-[#8B9B5C] w-fit"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {ddLink.label}
                                </CMSLink>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    ) : (
                      <CMSLink
                        {...mainLink}
                        className="block text-sm py-1 px-2 !font-ivar uppercase hover:underline hover:bg-[#8B9B5C] w-fit"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {label}
                      </CMSLink>
                    )}
                  </div>
                )
              })}

              {/* Mobile CTAs */}
              <div className="pt-4 space-y-3 flex flex-col items-start">
                {ctaLink?.link && (
                  <CMSLink
                    {...ctaLink.link}
                    appearance="olive"
                    size="ctaBig"
                    className="w-full"
                  />
                )}
                {secondaryCTA?.link && (
                  <CMSLink
                    {...secondaryCTA.link}
                    appearance="outlineWhite"
                    size="ctaBig"
                    newTab
                    className="w-full"
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
