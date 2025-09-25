'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { Breadcrumb } from '@/components/Breadcrumb'
import { cn } from '@/utilities/ui'

interface BreadcrumbLayoutProps {
  children?: React.ReactNode
  className?: string
}

// Pages where breadcrumbs should be hidden
const EXCLUDED_PATHS = ['/admin', '/api', '/', '/home']

// Custom route labels for better readability
const ROUTE_LABELS: Record<string, string> = {
  lease: 'Start Your Lease',
  'current-specials': 'Current Specials',
  about: 'About Us',
  contact: 'Contact Us',
  faq: 'FAQ',
  success: 'Success',
  'thank-you': 'Thank You',
  inventory: 'Inventory',
  car: 'Car',
}

/**
 * Layout wrapper component that conditionally renders breadcrumbs
 * This integrates seamlessly with your existing layout structure
 */
export const BreadcrumbLayout: React.FC<BreadcrumbLayoutProps> = ({ children, className }) => {
  const pathname = usePathname()

  // Don't render breadcrumbs on excluded paths
  const shouldShowBreadcrumbs =
    pathname &&
    !EXCLUDED_PATHS.some((path) => {
      if (path === '/' || path === '/home') {
        return pathname === path
      }
      return pathname === path || pathname.startsWith(path + '/')
    })

  if (!shouldShowBreadcrumbs) {
    return <>{children}</>
  }

  return (
    <>
      {/* Breadcrumb Section */}
      <section className={cn('relative z-20 bg-white dark:bg-gray-900', className)}>
        <div className="container mx-auto py-3">
          {/* Desktop breadcrumb */}
          <Breadcrumb
            routeLabels={ROUTE_LABELS}
            maxItems={6}
            className="text-sm lg:text-base xl:text-lg hidden sm:block"
          />

          {/* Mobile breadcrumb - more compact */}
          <Breadcrumb
            routeLabels={ROUTE_LABELS}
            maxItems={3}
            showHomeIcon={true}
            className="text-xs sm:hidden"
          />
        </div>
      </section>

      {children}
    </>
  )
}
