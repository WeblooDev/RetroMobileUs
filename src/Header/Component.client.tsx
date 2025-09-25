'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronDown, ChevronRight, Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { CMSLinkWithClose } from '@/components/Link/CMSLinkWithClose'
import WhatsAppButton from '@/components/Button/WhatsAppButton'

type Props = {
  data: HeaderType
}

export const HeaderClient: React.FC<Props> = ({ data }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [expandedMobileMenus, setExpandedMobileMenus] = useState<number[]>([])
  const [email, setEmail] = useState('')
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isScrollingUp, setIsScrollingUp] = useState(true)
  const [isAtTop, setIsAtTop] = useState(true)
  const [isInputFocused, setIsInputFocused] = useState(false)

  const logo = data.logo
  const navItems = data.navItems || []
  const ctaLink = data.ctaLink?.link

  const toggleMobileMenu = (index: number) => {
    setExpandedMobileMenus((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    )
  }

  // Handle input focus for mobile keyboard display
  const handleInputFocus = () => {
    setIsInputFocused(true)
    // Scroll to the input to ensure it's visible when keyboard appears
    setTimeout(() => {
      const activeElement = document.activeElement as HTMLElement
      activeElement?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEmail('')
    setIsInputFocused(false)
  }

  // Close mobile menu when a link is clicked
  const handleLinkClick = () => {
    setIsSheetOpen(false)
  }

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY

          // Check if we're at the top of the page
          setIsAtTop(currentScrollY <= 0)

          if (currentScrollY < lastScrollY) {
            setIsScrollingUp(true)
          } else if (currentScrollY > lastScrollY) {
            setIsScrollingUp(false)
            setHoveredIdx(null)
            setExpandedMobileMenus([])
          }

          setLastScrollY(currentScrollY)
          ticking = false
        })

        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Handle viewport adjustments for keyboard on mobile
  useEffect(() => {
    // iOS Safari specific fix for visual viewport changes when keyboard appears
    const handleResize = () => {
      if (isInputFocused) {
        document.documentElement.style.setProperty(
          '--vh',
          `${window.visualViewport?.height || window.innerHeight}px`,
        )
      } else {
        document.documentElement.style.removeProperty('--vh')
      }
    }

    window.visualViewport?.addEventListener('resize', handleResize)

    return () => {
      window.visualViewport?.removeEventListener('resize', handleResize)
      document.documentElement.style.removeProperty('--vh')
    }
  }, [isInputFocused])

  const renderLogo = () => {
    if (
      typeof logo === 'object' &&
      logo !== null &&
      'url' in logo &&
      typeof logo.url === 'string'
    ) {
      return (
        <Image
          src={logo.url}
          alt={logo?.alt || 'Logo'}
          width={150}
          height={80}
          className="h-11 w-auto"
          quality={100}
          loading="eager"
          priority
        />
      )
    }
    return <span className="text-white text-xl font-bold">LOGO</span>
  }

  const MobileLink = ({ onClick, ...props }: any) => {
    return (
      <CMSLinkWithClose
        {...props}
        className="text-white"
        onClick={() => {
          setIsSheetOpen(false)
        }}
      />
    )
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full bg-[#121221] text-white transition-all duration-300',
        hoveredIdx !== null ? 'after-expanded' : '',
        isAtTop || isScrollingUp ? 'translate-y-0' : '-translate-y-full',
      )}
      onMouseLeave={() => setHoveredIdx(null)}
    >
      <style jsx>{`
        header.after-expanded::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          height: 415px;
          background: rgba(18, 18, 33, 0.8);
          border-bottom: 1px solid #336;
          z-index: 40;
          backdrop-filter: blur(8px); /* Adds the blur effect */
          -webkit-backdrop-filter: blur(8px); /* For Safari support */
        }

        /* Custom height variable for mobile keyboard handling */
        :root {
          --vh: 100vh;
        }

        /* Apply to sheet content when keyboard is open */
        .sheet-content-keyboard-open {
          height: var(--vh);
          min-height: var(--vh);
        }
      `}</style>

      {/* Desktop Header */}
      <div className="p-6 mx-auto hidden items-center justify-between py-[18px] lg:flex">
        <Link href="/" className="mr-8 flex items-center">
          {renderLogo()}
        </Link>

        <nav className="relative flex flex-1 justify-center">
          <ul className="flex space-x-1">
            {navItems.map(({ link, children }, idx) => (
              <li
                key={idx}
                className="font-inter font-normal relative"
                onMouseEnter={() =>
                  Array.isArray(children) && children.length > 0
                    ? setHoveredIdx(idx)
                    : setHoveredIdx(null)
                }
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <CMSLink
                  {...link}
                  appearance="link"
                  className="group flex h-10 items-center rounded-lg text-[13px] px-2 xl:px-4 xl:text-[16px] font-inter !font-normal text-white !no-underline transition-colors duration-300 hover:bg-[#1a1ae5] hover:text-white"
                >
                  <span className="flex items-center gap-1">
                    {Array.isArray(children) && children.length > 0 ? (
                      <>
                        {link.label}
                        <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                      </>
                    ) : (
                      link.label
                    )}
                  </span>
                </CMSLink>

                {Array.isArray(children) && children.length > 0 && hoveredIdx === idx && (
                  <div className="absolute -left-20 xl:left-0 top-full z-50 flex min-h-[160px] w-auto gap-8 rounded-md bg-transparent pt-8 px-0 mr-8">
                    {children.map((child, cIdx) => (
                      <div key={cIdx} className="font-inter">
                        {child.title && child.link?.link ? (
                          <CMSLink
                            {...child.link.link}
                            appearance="link"
                            className="pb-[18px] px-0 text-sm text-white "
                          >
                            {child.title}
                          </CMSLink>
                        ) : (
                          <div className="pb-[18px] text-sm text-white">{child.title}</div>
                        )}

                        {Array.isArray(child.links) && child.links.length > 0 && (
                          <ul className="space-y-1">
                            {child.links.map((link, lIdx) =>
                              link?.link ? (
                                <li key={lIdx}>
                                  <CMSLink
                                    {...link.link}
                                    appearance="link"
                                    className="p-0 pb-[14px] font-light !h-auto text-sm !no-underline text-[#9494c7] hover:text-white "
                                  />
                                </li>
                              ) : null,
                            )}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <WhatsAppButton />
          {ctaLink && (
            <CMSLink
              {...ctaLink}
              className="font-inter bg-[#1a1ae5] text-white px-4 py-2 rounded text-lg"
            />
          )}
        </div>
      </div>

      {/* Mobile Header */}
      <div className=" mx-auto flex items-center justify-between p-4 lg:hidden">
        <Link href="/" className="flex items-center">
          {renderLogo()}
        </Link>
        <WhatsAppButton size="small" />

        <div className="flex items-center gap-4">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className={cn(
                'w-full flex flex-col overflow-hidden p-0 text-white lg:w-[350px] radix-dialog-close:hidden',
                isInputFocused ? 'sheet-content-keyboard-open' : '',
              )}
              style={{ backgroundColor: '#121221' }}
            >
              <SheetHeader className="p-4 border-b border-gray-800 shrink-0">
                <SheetTitle className="text-white flex items-center justify-between">
                  <Link href="/" onClick={handleLinkClick} className="flex items-center">
                    {renderLogo()}
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto">
                {navItems.map(({ link, children }, idx) => (
                  <div key={idx} className="border-b border-gray-800">
                    <div className="flex items-center justify-between px-4 py-4 font-inter">
                      <MobileLink {...link} className="text-white" />
                      {Array.isArray(children) && children.length > 0 && (
                        <button onClick={() => toggleMobileMenu(idx)}>
                          <ChevronRight
                            className={cn(
                              'h-5 w-5 transition-transform',
                              expandedMobileMenus.includes(idx) ? 'rotate-90' : '',
                            )}
                          />
                        </button>
                      )}
                    </div>
                    {Array.isArray(children) &&
                      children.length > 0 &&
                      expandedMobileMenus.includes(idx) && (
                        <div className="font-inter px-4 pb-4 space-y-1">
                          {children.map((child, cIdx) => (
                            <div key={cIdx}>
                              {/* Show sub-parent as a regular link first */}
                              {child.title && child.link?.link && (
                                <MobileLink
                                  {...child.link.link}
                                  appearance="link"
                                  className="block !px-0 py-2 text-sm text-[#9494c7] !no-underline hover:text-white"
                                >
                                  {child.title}
                                </MobileLink>
                              )}

                              {/* Show all child links after the sub-parent */}
                              {Array.isArray(child.links) && child.links.length > 0 && (
                                <>
                                  {child.links.map((item, lIdx) =>
                                    item?.link ? (
                                      <MobileLink
                                        key={lIdx}
                                        {...item.link}
                                        appearance="link"
                                        className="block !px-0 py-2 text-sm text-[#9494c7] !no-underline hover:text-white"
                                      />
                                    ) : null,
                                  )}
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                ))}

                {/* Newsletter Section */}
                <div
                  className={cn(
                    'border-t border-gray-800 p-4 bg-[#121221]',
                    isInputFocused ? 'pb-32' : '',
                  )}
                >
                  <h3 className="mb-2 text-xl font-bold">Newsletter</h3>
                  <p className="mb-4 text-sm text-gray-300">
                    Be the first to know about new listings!
                  </p>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <Input
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={handleInputFocus}
                      onBlur={() => setIsInputFocused(false)}
                      className="rounded-lg border-gray-700 bg-[#1e293b] text-white placeholder:text-gray-400"
                      required
                    />
                    <Button
                      type="submit"
                      className="w-full rounded-lg bg-[#1a1ae5] text-white hover:bg-[#4338ca]"
                    >
                      Submit
                    </Button>
                  </form>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
