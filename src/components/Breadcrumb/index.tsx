'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { CMSLink } from '@/components/Link'

export interface BreadcrumbItem {
  label: string
  href: string
  isCurrentPage?: boolean
}

interface BreadcrumbProps {
  /** Override the auto-generated breadcrumb items */
  customItems?: BreadcrumbItem[]
  /** Custom class name for the breadcrumb container */
  className?: string
  /** Show home icon instead of "Home" text */
  showHomeIcon?: boolean
  /** Custom separator between breadcrumb items */
  separator?: React.ReactNode
  /** Maximum number of visible breadcrumb items before truncation */
  maxItems?: number
  /** Custom route mappings for better readable labels */
  routeLabels?: Record<string, string>
}

/**
 * Formats a URL segment into a readable label
 */
const formatSegmentLabel = (segment: string, routeLabels: Record<string, string>): string => {
  // Check for custom route mapping first
  const customLabel = routeLabels[segment]
  if (customLabel) {
    return customLabel
  }

  // Decode URL-encoded segment
  const decodedSegment = decodeURIComponent(segment)

  // Handle filter segments (e.g., "filter:minPrice='1000'&maxPrice='5000'")
  if (decodedSegment.startsWith('filter:')) {
    const filterString = decodedSegment.replace('filter:', '')
    const parts = filterString.split('&')
    let minPrice = ''
    let maxPrice = ''

    for (const part of parts) {
      if (part.startsWith('minPrice=')) {
        minPrice = part.replace('minPrice=', '').replace(/'/g, '')
      } else if (part.startsWith('maxPrice=')) {
        maxPrice = part.replace('maxPrice=', '').replace(/'/g, '')
      }
    }

    // Format price display
    const formatPrice = (price: string) => {
      const num = Number(price)
      if (isNaN(num)) return price
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(num)
    }

    if (minPrice && maxPrice) {
      return `Price: ${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`
    } else if (minPrice) {
      return `Price: ${formatPrice(minPrice)}+`
    } else if (maxPrice) {
      return `Price: Up to ${formatPrice(maxPrice)}`
    }
    return 'Price Filter'
  }

  // Handle dynamic route parameters (remove brackets)
  if (decodedSegment.startsWith('[') && decodedSegment.endsWith(']')) {
    return decodedSegment.slice(1, -1)
  }

  // Convert kebab-case and underscores to Title Case
  return decodedSegment
    .replace(/-/g, ' ') // replace dashes with spaces
    .replace(/_/g, ' ') // replace underscores with spaces
    .replace(/\b\w/g, (c) => c.toUpperCase()) // capitalize first letter of each word
}

const fetchCarBySlug = async (slug: string): Promise<{ model: string } | null> => {
  try {
    const params = new URLSearchParams({
      'where[slug][equals]': slug,
      limit: '1',
      depth: '0',
    })

    const response = await fetch(`/api/cars?${params.toString()}`)
    if (!response.ok) return null

    const data = await response.json()
    return data.docs?.[0] || null
  } catch (error) {
    console.error('Error fetching car data for breadcrumb:', error)
    return null
  }
}

/**
 * Generates breadcrumb items from the current pathname
 */
const generateBreadcrumbItems = async (
  pathname: string,
  routeLabels: Record<string, string>,
): Promise<BreadcrumbItem[]> => {
  // Remove query parameters and normalize path
  const pathWithoutQuery = pathname.split('?')[0] || '/'

  // Handle home page variants
  if (pathWithoutQuery === '/' || pathWithoutQuery === '/home') {
    return [{ label: 'Home', href: '/', isCurrentPage: true }]
  }

  // Split path and filter out empty segments
  const segments = pathWithoutQuery.split('/').filter(Boolean)

  // Remove 'home' segment if it exists (treat /home same as /)
  const filteredSegments = segments.filter((segment) => segment !== 'home')

  // Start with home
  const items: BreadcrumbItem[] = [{ label: 'Home', href: '/', isCurrentPage: false }]

  let currentPath = ''

  for (let index = 0; index < filteredSegments.length; index++) {
    const segment = filteredSegments[index]
    if (!segment) continue

    currentPath += `/${segment}`
    const isLast = index === filteredSegments.length - 1

    let label = formatSegmentLabel(segment, routeLabels)

    if (segments[0] === 'inventory' && segments[1] === 'car' && index === 2) {
      const carData = await fetchCarBySlug(segment)
      if (carData) {
        label = carData.model
      }
    }

    items.push({
      label,
      href: currentPath,
      isCurrentPage: isLast,
    })
  }

  return items
}

/**
 * Truncates breadcrumb items when they exceed maxItems
 */
const truncateBreadcrumbs = (items: BreadcrumbItem[], maxItems: number): BreadcrumbItem[] => {
  if (items.length <= maxItems) return items

  const firstItem = items[0] // Always keep "Home"
  const lastItems = items.slice(-(maxItems - 2)) // Keep last items
  const ellipsisItem: BreadcrumbItem = { label: '...', href: '#', isCurrentPage: false }

  // Ensure we have valid items
  if (!firstItem) return items

  return [firstItem, ellipsisItem, ...lastItems]
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  customItems,
  className,
  showHomeIcon = false,
  separator = <ChevronRight className="h-4 w-4 text-gray-400" />,
  maxItems = 5,
  routeLabels = {},
}) => {
  const pathname = usePathname()
  const [items, setItems] = useState<BreadcrumbItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Use only custom route labels (no defaults)
  const mergedRouteLabels = routeLabels

  useEffect(() => {
    const generateItems = async () => {
      setIsLoading(true)
      try {
        if (customItems) {
          setItems(customItems)
        } else if (pathname) {
          const allItems = await generateBreadcrumbItems(pathname, mergedRouteLabels)
          const finalItems = maxItems ? truncateBreadcrumbs(allItems, maxItems) : allItems
          setItems(finalItems)
        }
      } catch (error) {
        console.error('Error generating breadcrumb items:', error)
        if (pathname && pathname !== '/') {
          setItems([
            { label: 'Home', href: '/', isCurrentPage: false },
            { label: 'Page', href: pathname, isCurrentPage: true },
          ])
        }
      } finally {
        setIsLoading(false)
      }
    }

    generateItems()
  }, [pathname, customItems, maxItems, mergedRouteLabels])

  if (isLoading) {
    return (
      <nav
        aria-label="Breadcrumb navigation"
        className={cn(
          'flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-300',
          className,
        )}
      >
        <div className="animate-pulse flex space-x-2">
          <div className="h-4 w-12 bg-gray-300 rounded"></div>
          <div className="h-4 w-4 bg-gray-300 rounded"></div>
          <div className="h-4 w-16 bg-gray-300 rounded"></div>
        </div>
      </nav>
    )
  }

  return (
    <nav
      aria-label="Breadcrumb navigation"
      className={cn(
        'flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-300',
        className,
      )}
    >
      <ol className="flex items-center space-x-1">
        {items.map((item, index) => (
          <li key={`${item.href}-${index}`} className="flex items-center">
            {index > 0 && (
              <span className="mx-2 flex-shrink-0" aria-hidden="true">
                {separator}
              </span>
            )}

            {item.label === '...' ? (
              <span className="text-gray-400" aria-hidden="true">
                ...
              </span>
            ) : item.isCurrentPage ? (
              <span className="font-medium text-gray-900 dark:text-white" aria-current="page">
                {index === 0 && showHomeIcon ? (
                  <Home className="h-4 w-4" aria-label="Home" />
                ) : (
                  item.label
                )}
              </span>
            ) : (
              <CMSLink
                type="custom"
                url={item.href}
                appearance="inline"
                className={cn(
                  'hover:text-blue-500 transition-colors duration-200',
                  'focus:outline-none outline-none',
                  index === 0 && showHomeIcon ? '' : '',
                )}
                aria-label={index === 0 ? 'Go to homepage' : `Go to ${item.label}`}
              >
                {index === 0 && showHomeIcon ? (
                  <Home className="h-4 w-4" aria-label="Home" />
                ) : (
                  item.label
                )}
              </CMSLink>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

// Export types for external usage
export type { BreadcrumbProps }
