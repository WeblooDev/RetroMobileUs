'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useScrollHeader } from './useScrollHeader'
import { Media } from '@/components/Media'
import { useRef } from 'react'

import { CTAButton } from '@/components/CTAButton'
import Link from 'next/link'


export type V0DropdownItem = { name: string; href: string }
export type V0NavItem = {
  name: string
  href?: string
  hasDropdown?: boolean
  dropdownItems?: V0DropdownItem[]
}

// Component.client.tsx (or shared types)
// HeaderClientV0.tsx
export type HeaderV0Props = {
  logoResource: any;            // Payload media relation (populated doc or ID)
  nav: V0NavItem[];
  ctas?: {
    primary?: { label: string; href: string };
    secondary?: { label: string; href: string };
  };
}



export default function HeaderClientV0({ logoResource, nav, ctas }: HeaderV0Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null)
  const isVisible = useScrollHeader()


    // inside component
    const closeTimerRef = useRef<number | null>(null)
    const GAP_PX = 30 // <-- control the gap here (px)

    const open = (name: string) => {
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current)
      setOpenDropdown(name)
    }
    const scheduleClose = () => {
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current)
      closeTimerRef.current = window.setTimeout(() => setOpenDropdown(null), 120)
    }
    const cancelClose = () => {
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current)
    }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out',
        isVisible ? 'translate-y-0' : '-translate-y-full',
      )}
    >
    <div className="bg-black/60 backdrop-blur-[20px] text-white">
     <div className="px-8 py-2">
          <div className="flex h-16 items-center justify-between">

            <div>            
              <Link href="/" >
                <Media
                  resource={logoResource}
                  alt="Logo"
                  priority
                  imgClassName="h-auto w-auto "
                />
              </Link>
            </div>


            <nav className=" hidden md:flex justify-center items-center ">
              {nav.map((item) => (
             <div key={item.name} className="relative flex items-center justify-center">
             {item.hasDropdown && item.dropdownItems?.length ? (
               <div
                 className="relative"
                 onMouseEnter={() => { cancelClose(); open(item.name) }}
                 onMouseLeave={scheduleClose}
               >
                 <button className="!font-ivar flex items-center text-sm py-2 px-4 hover:bg-[#8B9B5C]">
                   {item.name}
                   <ChevronDown className="ml-1 h-4 w-4" />
                 </button>
           
                 {openDropdown === item.name && (
                   <div
                     // real gap using calc so we don't rely on margin
                     className="absolute left-0"
                     style={{ top: `calc(100% + ${GAP_PX}px)` }}
                     onMouseEnter={cancelClose}
                     onMouseLeave={scheduleClose}
                   >
                     {/* Invisible hover bridge that fills the gap exactly */}
                     <div
                       className="absolute left-0 right-0 bg-transparent"
                       style={{ height: GAP_PX, top: `-${GAP_PX}px` }}
                       aria-hidden
                     />
           
                     <div className="bg-[#8B9B5C6B] backdrop-blur-sm border border-[#8B9B5C] ">
                       <div className="">
                         {item.dropdownItems.map((dd) => (
                           <a
                             key={dd.name}
                             href={dd.href}
                             className="!font-ivar block text-sm hover:bg-[#8B9B5C] px-6 py-2 uppercase"
                           >
                             {dd.name}
                           </a>
                         ))}
                       </div>
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
            <CTAButton href={ctas.primary.href} variant="olive">
              {ctas.primary.label}
            </CTAButton>
          )}
          {ctas?.secondary && (
            <CTAButton href={ctas.secondary.href} variant="outlineWhite">
              {ctas.secondary.label}
            </CTAButton>
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
