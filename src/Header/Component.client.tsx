'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Menu, X } from 'lucide-react'
import type { Header as HeaderDoc } from '@/payload-types'
import { Media } from '@/components/Media'
import { CTAButton } from '@/components/CTAButton'
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

  // Close mobile submenu when whole menu closes
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
            <Link href="/" aria-label="Home">
              <Media resource={logo} alt="Logo" priority imgClassName="h-auto w-auto" />
            </Link> 

            <nav className="hidden md:flex items-center gap-1">
              {(navItems ?? []).map((item) => {
                const hasDropdown = (item.dropdownLinks?.length ?? 0) > 0
                const itemHref = item.url?.trim() || '#'

                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => {
                      cancelClose()
                      open(item.label)
                    }}
                    onMouseLeave={scheduleClose}
                  >
                    <Link
                      href={itemHref}
                      className="!font-ivar flex items-center gap-1 text-sm uppercase py-2 px-4 hover:bg-[#8B9B5C]"
                      onFocus={() => open(item.label)}
                      onBlur={scheduleClose}
                    >
                      <span>{item.label}</span>
                      {hasDropdown && <ChevronDown className="h-4 w-4" aria-hidden />}
                    </Link>

                    {hasDropdown && openDropdown === item.label && (
                      <div
                        className="absolute left-0"
                        style={{ top: `calc(100% + ${GAP_PX}px)` }}
                        onMouseEnter={cancelClose}
                        onMouseLeave={scheduleClose}
                        onFocusCapture={() => cancelClose()}
                        onBlurCapture={scheduleClose}
                      >
                        <div
                          className="absolute left-0 right-0 bg-transparent"
                          style={{ height: GAP_PX, top: `-${GAP_PX}px` }}
                          aria-hidden
                        />
                        <div className="bg-[#8B9B5C]/80 backdrop-blur-sm border border-[#8B9B5C] min-w-[220px]">
                          {(item.dropdownLinks ?? []).map((dd) => (
                            <Link
                              key={dd.label}
                              href={dd.url}
                              className="!font-ivar block text-[14px] hover:bg-[white] hover:text-black px-6 py-2 uppercase"
                            >
                              {dd.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              {ctaLink?.link?.label && ctaLink.link.url && (
                <CTAButton href={ctaLink.link.url} variant="olive">
                  {ctaLink.link.label}
                </CTAButton>
              )}
              {secondaryCTA?.link?.label && secondaryCTA.link.url && (
                <CTAButton href={secondaryCTA.link.url} variant="outlineWhite">
                  {secondaryCTA.link.label}
                </CTAButton>
              )}
            </div>

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

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/15">
            <div className="px-4 py-6 space-y-4">
              {(navItems ?? []).map((item) => {
                const hasDropdown = (item.dropdownLinks?.length ?? 0) > 0
                const itemHref = item.url?.trim() || '#'
                const isOpen = mobileOpenDropdown === item.label

                return (
                  <div key={item.label}>
                    {hasDropdown ? (
                      <div>
                        <div className="flex items-center justify-between">
                          <Link
                            href={itemHref}
                            className="block text-sm py-1 px-2 !font-ivar uppercase hover:underline hover:bg-[#8B9B5C] w-fit"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.label}
                          </Link>
                          <button
                            type="button"
                            aria-expanded={isOpen}
                            aria-label={`Toggle ${item.label} submenu`}
                            className="p-2"
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              setMobileOpenDropdown((v) => (v === item.label ? null : item.label))
                            }}
                          >
                            <ChevronDown
                              className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')}
                            />
                          </button>
                        </div>
                        {isOpen && (
                          <div className="ml-4 mt-2 space-y-2">
                            {(item.dropdownLinks ?? []).map((dd) => (
                              <Link
                                key={dd.label}
                                href={dd.url}
                                className="block text-sm py-1 px-2 !font-ivar uppercase hover:underline hover:bg-[#8B9B5C] w-fit"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {dd.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={itemHref}
                        className="block text-sm py-1 px-2 !font-ivar uppercase hover:underline hover:bg-[#8B9B5C] w-fit"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                )
              })}

              {/* Mobile CTAs */}
              <div className="pt-4 space-y-3">
                {ctaLink?.link?.label && ctaLink.link.url && (
                  <CTAButton
                    href={ctaLink.link.url}
                    className="w-full"
                    variant="olive"
                    size="normal"
                  >
                    {ctaLink.link.label}
                  </CTAButton>
                )}
                {secondaryCTA?.link?.label && secondaryCTA.link.url && (
                  <CTAButton
                    href={secondaryCTA.link.url}
                    className="w-full"
                    variant="outlineWhite"
                    size="normal"
                  >
                    {secondaryCTA.link.label}
                  </CTAButton>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
