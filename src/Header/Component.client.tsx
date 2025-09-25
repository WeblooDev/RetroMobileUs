'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useScrollHeader } from './useScrollHeader'

export type V0DropdownItem = { name: string; href: string }
export type V0NavItem = {
  name: string
  href?: string
  hasDropdown?: boolean
  dropdownItems?: V0DropdownItem[]
}

export type HeaderV0Props = {
  logo?: { title: string; subtitle?: string } | null
  nav: V0NavItem[]
  ctas?: {
    primary?: { label: string; href: string }
    secondary?: { label: string; href: string }
  }
}

export default function HeaderClientV0({ logo, nav, ctas }: HeaderV0Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null)
  const isVisible = useScrollHeader()

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out',
        isVisible ? 'translate-y-0' : '-translate-y-full',
      )}
    >
      <div className="bg-black text-white backdrop-blur-sm border-b border-header-muted/20 font-ivar">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0 text-header-foreground">
              <div className="text-xl font-bold tracking-tight">{logo?.title ?? 'SITE NAME'}</div>
              {logo?.subtitle ? (
                <div className="text-xs text-header-muted tracking-wider">{logo.subtitle}</div>
              ) : null}
            </div>

            {/* Desktop Navigation */}
            <nav className=" hidden md:flex justify-center items-center ">
              {nav.map((item) => (
                <div key={item.name} className="relative flex items-center justify-center">
                  {item.hasDropdown && item.dropdownItems?.length ? (
                    <div
                      className="relative flex"
                      onMouseEnter={() => setOpenDropdown(item.name)}
                      onMouseLeave={() => setOpenDropdown((v) => (v === item.name ? null : v))}
                    >
                      <button className="!font-ivar flex items-center text-sm py-2 px-4 hover:bg-[#8B9B5C]">
                        {item.name}
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </button>
                      {openDropdown === item.name && (
                        <div className="absolute mt-[4rem] left-0 bg-[#8B9B5C6B] backdrop-blur-sm border border-[#8B9B5C] rounded-md shadow-lg p-4">
                          <div className="absolute -top-6 left-0 right-0 h-4 bg-transparent" />
                          <div className="py-2">
                            {item.dropdownItems.map((dd) => (
                              <a
                                key={dd.name}
                                href={dd.href}
                                className="!font-ivar block text-sm hover:bg-[#8B9B5C] px-4 py-2   uppercase "
                              >
                                {dd.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <a
                      href={item.href ?? '#'}
                      className="!font-ivar text-sm uppercase hover:bg-[#8B9B5C] px-4 py-2"
                    >
                      {item.name}
                    </a>
                  )}
                </div>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden md:flex md:items-center md:space-x-4">
              {ctas?.primary && (
                <Button
                  asChild
                  className="bg-header-accent hover:bg-header-accent/90 text-header-background font-medium px-6"
                  size="sm"
                >
                  <a href={ctas.primary.href}>{ctas.primary.label}</a>
                </Button>
              )}
              {ctas?.secondary && (
                <Button
                  asChild
                  variant="outline"
                  className="border-header-muted text-header-foreground hover:bg-header-muted/10 font-medium px-6 bg-transparent"
                  size="sm"
                >
                  <a href={ctas.secondary.href}>{ctas.secondary.label}</a>
                </Button>
              )}
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-header-foreground hover:bg-header-muted/10"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-header-muted/20">
            <div className="px-4 py-6 space-y-4">
              {nav.map((item) => (
                <div key={item.name}>
                  {item.hasDropdown && item.dropdownItems?.length ? (
                    <div>
                      <button
                        onClick={() =>
                          setMobileOpenDropdown((v) => (v === item.name ? null : item.name))
                        }
                        className="flex items-center justify-between w-full text-header-foreground hover:text-header-accent transition-colors duration-200 text-base font-medium tracking-wide py-2"
                      >
                        {item.name}
                        <ChevronDown
                          className={cn(
                            'h-4 w-4 transition-transform duration-200',
                            mobileOpenDropdown === item.name && 'rotate-180',
                          )}
                        />
                      </button>
                      {mobileOpenDropdown === item.name && (
                        <div className="ml-4 mt-2 space-y-2">
                          {item.dropdownItems.map((dd) => (
                            <a
                              key={dd.name}
                              href={dd.href}
                              className="block text-header-muted hover:text-header-accent transition-colors duration-200 text-sm py-1"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {dd.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <a
                      href={item.href ?? '#'}
                      className="block text-header-foreground hover:text-header-accent transition-colors duration-200 text-base font-medium tracking-wide py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  )}
                </div>
              ))}

              {/* Mobile CTAs */}
              <div className="pt-4 space-y-3">
                {ctas?.primary && (
                  <Button
                    asChild
                    className="w-full bg-header-accent hover:bg-header-accent/90 text-header-background font-medium"
                    size="sm"
                  >
                    <a href={ctas.primary.href}>{ctas.primary.label}</a>
                  </Button>
                )}
                {ctas?.secondary && (
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-header-muted text-header-foreground hover:bg-header-muted/10 font-medium bg-transparent"
                    size="sm"
                  >
                    <a href={ctas.secondary.href}>{ctas.secondary.label}</a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
