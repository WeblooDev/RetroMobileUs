'use client'

import type React from 'react'
import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import type { Brand, Car } from '@/payload-types'
import CarCardSkeleton from '@/components/Inventory/CarCardSkeleton'
import InventoryHeader from '@/components/Inventory/InventoryHeader'
import InventoryCarsDisplay from '@/components/Inventory/InventoryCarsDisplay'
import { SearchableDropdown } from '@/components/Inventory/SearchableDropdown'
import { PriceRangeDropdown } from '@/components/Inventory/PriceRangeDropdown'
import { X } from 'lucide-react'
import FeatureHighlight from '@/blocks/FeatureHighlight/component'
import { FeatureSectionBlockComponent } from '@/blocks/FeatureSection/Component'
import type { Media } from '@/payload-types'
import { generateInventorySEOContent } from '@/utilities/generateInventorySEO'

// Types for inventory counts
export interface BrandCount {
  id: string
  name: string
  count: number
}

export interface ModelCount {
  id: string
  name: string
  slug: string
  count: number
}

export interface InventoryCounts {
  brands: BrandCount[]
  models: ModelCount[]
}

interface FilteredInventoryBlockProps {
  initialFilters: {
    brand?: string
    model?: string
    price?: string
  }
  title?: string
  description?: string
  featureHighlight?: {
    heading: string
    image: {
      url: string
      alt: string
      width: number
      height: number
    }
    features: Array<{
      title: string
      description: string
    }>
    button?: {
      label: string
      href: string
    }
    imagePosition?: 'left' | 'right'
  }
  featureSection?: {
    backgroundImage: Media
    heading: string
    description: string
    features: Array<{
      icon: Media
      title: string
    }>
    buttonText?: string
    link?: string
  }
}

export const FilteredInventoryBlock: React.FC<FilteredInventoryBlockProps> = ({
  initialFilters,
  title: _title = 'Exclusive NEW CAR Inventory, curated for you',
  description:
    _description = 'Discover a fleet of world-class new vehicles designed for those who demand the best. From premium sedans to high-performance supercars, each ride delivers an exhilarating experience.',
  featureHighlight,
  featureSection,
}) => {
  const seoContent = generateInventorySEOContent(initialFilters)
  const dynamicContent = {
    h1Title: seoContent.h1Title,
    description: seoContent.h1Description,
  }
  const router = useRouter()
  const pathname = usePathname()
  const [brands, setBrands] = useState<Brand[]>([])
  const [cars, setCars] = useState<Car[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [isFilterLoading, setIsFilterLoading] = useState(false)
  const [isInitialBrandsLoaded, setIsInitialBrandsLoaded] = useState(false)
  const [inventoryCounts, setInventoryCounts] = useState<InventoryCounts>({
    brands: [],
    models: [],
  })

  // Parse initial filters into internal format with price parsing
  const [filters, setFilters] = useState(() => {
    let priceMin = 0
    let priceMax = 100000

    // Parse price filter from URL format immediately
    if (initialFilters.price) {
      const priceFilter = initialFilters.price
      if (priceFilter.includes('-')) {
        const [min, max] = priceFilter.split('-').map((p) => p.trim())
        priceMin = min && !isNaN(Number(min)) ? Number(min) : 0
        priceMax = max && !isNaN(Number(max)) ? Number(max) : 100000
      } else if (priceFilter.endsWith('+')) {
        const min = priceFilter.replace('+', '').trim()
        if (!isNaN(Number(min))) {
          priceMin = Number(min)
          priceMax = 100000
        }
      } else if (!isNaN(Number(priceFilter))) {
        priceMin = Number(priceFilter)
        priceMax = Number(priceFilter)
      }
    }

    return {
      brand: initialFilters.brand || null,
      model: initialFilters.model || null,
      priceMin,
      priceMax,
      isOpenToDemo: false,
      isOpenToPreowned: false,
    }
  })

  const [pendingPriceRange, setPendingPriceRange] = useState<[number, number]>(() => [
    filters.priceMin,
    filters.priceMax,
  ])
  const [priceMenuOpen, setPriceMenuOpen] = useState(false)
  const [brandSearch, setBrandSearch] = useState('')
  const [modelSearch, setModelSearch] = useState('')

  const carsPerPage = 12
  const topRef = useRef<HTMLDivElement | null>(null)
  const isInitialLoad = useRef(true)
  const fetchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Add formatting functions to match InventoryFilters
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const parseCurrencyValue = (value: string): number => {
    return Number(value.replace(/[^0-9.-]+/g, '')) || 0
  }

  useEffect(() => {
    if (!isLoading && topRef.current) topRef.current.scrollIntoView()
  }, [currentPage, isLoading])

  // Update URL based on current filters
  const updateURL = useCallback(
    (newFilters: typeof filters) => {
      const urlSegments: string[] = []

      if (newFilters.brand) {
        const selectedBrand = brands.find(
          (brand) => brand.name.toLowerCase() === newFilters.brand?.toLowerCase(),
        )
        if (selectedBrand?.slug) {
          urlSegments.push(selectedBrand.slug)
        } else {
          urlSegments.push(encodeURIComponent(newFilters.brand.toLowerCase()))
        }
      }

      // Add model slug as second segment (without prefix) - much cleaner URLs
      if (newFilters.model) {
        // Find the model to get its slug
        const selectedModel = inventoryCounts.models.find(
          (m) => m.name.toLowerCase() === newFilters.model?.toLowerCase(),
        )
        if (selectedModel?.slug) {
          urlSegments.push(selectedModel.slug) // Use slug instead of encoded name
        } else {
          // Fallback to encoded name if no slug available
          urlSegments.push(encodeURIComponent(newFilters.model))
        }
      }

      // Add price filter in new format: filter:minPrice='value'&maxPrice='value'
      if (newFilters.priceMin > 0 || newFilters.priceMax < 100000) {
        const filterParts: string[] = []

        if (newFilters.priceMin > 0) {
          filterParts.push(`minPrice='${newFilters.priceMin}'`)
        }
        if (newFilters.priceMax < 100000) {
          filterParts.push(`maxPrice='${newFilters.priceMax}'`)
        }

        if (filterParts.length > 0) {
          urlSegments.push(`filter:${filterParts.join('&')}`)
        }
      }

      const newPath = urlSegments.length > 0 ? `/inventory/${urlSegments.join('/')}` : '/inventory'

      if (newPath !== pathname) {
        router.push(newPath)
      }
    },
    [router, pathname, brands, inventoryCounts.models],
  )

  // Fetch brands and brand counts on component mount
  useEffect(() => {
    const fetchBrandsAndCounts = async () => {
      try {
        // Fetch both brands and counts in parallel
        const [brandsRes, countsRes] = await Promise.all([
          fetch('/api/custom_brands'),
          fetch('/api/inventory_counts'),
        ])

        const [brandsData, countsData] = await Promise.all([brandsRes.json(), countsRes.json()])

        // Update both states together to minimize re-renders
        setBrands(brandsData.docs || [])
        setInventoryCounts((prev) => ({
          ...prev,
          brands: countsData.brands || [],
        }))
        setIsInitialBrandsLoaded(true)
      } catch (err) {
        console.error('Failed to fetch brands and counts:', err)
        setIsInitialBrandsLoaded(true) // Set to true even on error to prevent infinite loading
      }
    }

    fetchBrandsAndCounts()
  }, [])

  // Set initial load to false after first render
  useEffect(() => {
    const timer = setTimeout(() => {
      isInitialLoad.current = false
    }, 1000) // Give enough time for initial data loading and filter application

    return () => clearTimeout(timer)
  }, [])

  // Fetch model counts when brand changes
  useEffect(() => {
    const fetchModelCounts = async () => {
      if (!filters.brand) {
        setInventoryCounts((prev) => ({
          ...prev,
          models: [],
        }))
        return
      }

      // Find brand ID from brand name
      const selectedBrand = brands.find((brand) => brand.name === filters.brand)
      if (!selectedBrand) return

      try {
        const countsRes = await fetch(`/api/inventory_counts?brandId=${selectedBrand.id}`)
        const countsData = await countsRes.json()
        setInventoryCounts((prev) => ({
          ...prev,
          models: countsData.models || [],
        }))
      } catch (err) {
        console.error('Failed to fetch model counts:', err)
      }
    }

    // Only fetch if brands are loaded and brand has changed
    if (isInitialBrandsLoaded && brands.length > 0) {
      fetchModelCounts()
    }
  }, [filters.brand, brands, isInitialBrandsLoaded])

  // Single useEffect to handle all car fetching logic
  useEffect(() => {
    // Clear any existing timeout
    if (fetchTimeoutRef.current) {
      clearTimeout(fetchTimeoutRef.current)
    }

    // Only fetch if initial brands are loaded
    if (!isInitialBrandsLoaded || brands.length === 0) return

    if (filters.brand && brands.length > 0) {
      const selectedBrand = brands.find(
        (brand) => brand.name.toLowerCase() === filters.brand?.toLowerCase(),
      )
      if (!selectedBrand) {
        return
      }
    }

    if (filters.brand && filters.model && inventoryCounts.models.length === 0) {
      return
    }

    const fetchCarsWithDebounce = async () => {
      try {
        // Only show loading on first load or filter changes
        if (isInitialLoad.current || !isInitialBrandsLoaded) {
          setIsLoading(true)
        }
        setIsFilterLoading(true)

        const params = new URLSearchParams({
          page: String(currentPage),
          limit: String(carsPerPage),
        })

        if (filters.brand && brands.length > 0) {
          const selectedBrand = brands.find(
            (brand) => brand.name.toLowerCase() === filters.brand?.toLowerCase(),
          )
          if (selectedBrand) {
            params.append('brandId', selectedBrand.id)
          }
        }

        // Find model ID from model name if model filter is set
        if (filters.model && inventoryCounts.models.length > 0) {
          const selectedModel = inventoryCounts.models.find(
            (model) => model.name.toLowerCase() === filters.model?.toLowerCase(),
          )
          if (selectedModel) {
            params.append('modelId', selectedModel.id)
          }
        }

        params.append('priceMin', filters.priceMin.toString())
        params.append('priceMax', filters.priceMax.toString())
        if (filters.isOpenToDemo) params.append('isOpenToDemo', 'true')
        if (filters.isOpenToPreowned) params.append('isOpenToPreowned', 'true')

        // Add filter to exclude hidden cars
        params.append('hidden', 'false')

        const res = await fetch(`/api/custom_cars?${params.toString()}`)
        const data = await res.json()

        setCars(data.docs || [])
        setTotalPages(data.totalPages || 1)
        isInitialLoad.current = false
      } catch (err) {
        console.error('Failed to fetch cars:', err)
      } finally {
        setIsLoading(false)
        setIsFilterLoading(false)
      }
    }

    fetchTimeoutRef.current = setTimeout(() => {
      fetchCarsWithDebounce()
    }, 200) // Increased debounce to ensure all state updates are complete

    return () => {
      if (fetchTimeoutRef.current) {
        clearTimeout(fetchTimeoutRef.current)
      }
    }
  }, [filters, currentPage, brands, inventoryCounts.models, isInitialBrandsLoaded])

  const handlePrevPage = useCallback(() => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }, [currentPage])

  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }, [currentPage, totalPages])

  const handleFilterChange = useCallback(
    (newFilters: typeof filters) => {
      setFilters(newFilters)
      setCurrentPage(1)
      // Only update URL if not initial load
      if (!isInitialLoad.current) {
        updateURL(newFilters)
      }
    },
    [updateURL],
  )

  // Filter options
  const filteredBrands = useMemo(() => {
    return inventoryCounts.brands
      .filter((brandCount) => brandCount.name.toLowerCase().includes(brandSearch.toLowerCase()))
      .map((brandCount) => ({
        value: brandCount.id,
        label: `${brandCount.name} (${brandCount.count})`,
      }))
  }, [inventoryCounts.brands, brandSearch])

  const filteredModelOptions = useMemo(() => {
    return inventoryCounts.models
      .filter((modelCount) => modelCount.name.toLowerCase().includes(modelSearch.toLowerCase()))
      .map((modelCount) => ({
        value: modelCount.id,
        label: `${modelCount.name} (${modelCount.count})`,
      }))
  }, [inventoryCounts.models, modelSearch])

  // Get selected brand name for display
  const selectedBrandName = useMemo(() => {
    if (!filters.brand) return null
    const brandCount = inventoryCounts.brands.find((b) => b.name === filters.brand)
    return brandCount?.id || null
  }, [filters.brand, inventoryCounts.brands])

  // Get selected model name for display
  const selectedModelName = useMemo(() => {
    if (!filters.model) return null
    const modelCount = inventoryCounts.models.find(
      (m) => m.name.toLowerCase() === filters.model?.toLowerCase(),
    )
    return modelCount?.id || null
  }, [filters.model, inventoryCounts.models])

  // Get display names for active filters
  const selectedBrandDisplayName = useMemo(() => {
    if (!filters.brand) return null
    const brandCount = inventoryCounts.brands.find((b) => b.name === filters.brand)
    return brandCount?.name || filters.brand
  }, [filters.brand, inventoryCounts.brands])

  const selectedModelDisplayName = useMemo(() => {
    if (!filters.model) return null
    const modelCount = inventoryCounts.models.find(
      (m) => m.name.toLowerCase() === filters.model?.toLowerCase(),
    )
    return modelCount?.name || filters.model
  }, [filters.model, inventoryCounts.models])

  // Check if price range is not default
  const hasPriceFilter = filters.priceMin !== 0 || filters.priceMax !== 100000

  // Check if any filters are active
  const hasActiveFilters = filters.brand || filters.model || hasPriceFilter

  const resetAllFilters = () => {
    const newFilters = {
      brand: null,
      model: null,
      priceMin: 0,
      priceMax: 100000,
      isOpenToDemo: false,
      isOpenToPreowned: false,
    }
    handleFilterChange(newFilters)
    setPendingPriceRange([0, 100000])
  }

  return (
    <>
      <section
        className="w-full flex flex-col h-full container gap-4 lg:gap-6 xl:gap-8 2xl:gap-10  mb-8"
        ref={topRef}
      >
        <InventoryHeader title={dynamicContent.h1Title} description={dynamicContent.description} />

        {/* Filters - Updated to match InventoryFilters design */}
        <div className="w-full font-inter font-light">
          <div className="flex flex-wrap gap-4 lg:gap-6 items-center">
            <div className="w-full sm:w-auto">
              <SearchableDropdown
                placeholder="Make"
                value={selectedBrandName}
                onChange={(value: string) => {
                  // Find brand by ID and convert to name for internal state
                  const selectedBrand = inventoryCounts.brands.find((b) => b.id === value)
                  const newFilters = {
                    ...filters,
                    brand: selectedBrand?.name || null,
                    model: null, // Reset model when brand changes
                  }
                  handleFilterChange(newFilters)
                }}
                search={brandSearch}
                setSearch={setBrandSearch}
                options={filteredBrands}
                disabled={isLoading || isFilterLoading}
              />
            </div>

            <div className="w-full sm:w-auto">
              <SearchableDropdown
                placeholder="Model"
                value={selectedModelName}
                onChange={(value: string) => {
                  // Find model by ID and convert to name for internal state
                  const selectedModel = inventoryCounts.models.find((m) => m.id === value)
                  const newFilters = {
                    ...filters,
                    model: selectedModel?.name || null,
                  }
                  handleFilterChange(newFilters)
                }}
                search={modelSearch}
                setSearch={setModelSearch}
                options={filteredModelOptions}
                disabled={!filters.brand || isLoading || isFilterLoading}
              />
            </div>

            <div className="w-full sm:w-auto">
              <PriceRangeDropdown
                value={pendingPriceRange}
                onChange={setPendingPriceRange}
                open={priceMenuOpen}
                setOpen={setPriceMenuOpen}
                format={formatPrice}
                parse={parseCurrencyValue}
                onApply={() => {
                  const newFilters = {
                    ...filters,
                    priceMin: pendingPriceRange[0],
                    priceMax: pendingPriceRange[1],
                  }
                  handleFilterChange(newFilters)
                  setPriceMenuOpen(false)
                }}
                disabled={isLoading || isFilterLoading}
              />
            </div>
          </div>

          {/* Active Filters Display - Updated to match InventoryFilters design */}
          {hasActiveFilters && (
            <div className="mt-4 p-3 rounded-lg border border-white text-sm xl:text-base 2xl:text-lg">
              <div className="flex justify-between items-center gap-2 mb-2">
                <span className="font-medium text-white">Active Filters:</span>
                <button
                  onClick={resetAllFilters}
                  className="font-inter bg-[#1a1ae5] text-white px-4 py-2 rounded text-lg"
                  disabled={isLoading || isFilterLoading}
                >
                  Clear All
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {selectedBrandDisplayName && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 border border-white rounded-full">
                    <span>Make: {selectedBrandDisplayName}</span>
                    <button
                      onClick={() => {
                        const newFilters = { ...filters, brand: null, model: null }
                        handleFilterChange(newFilters)
                      }}
                      className="bg-[#1a1ae5] rounded-full p-1"
                      disabled={isLoading || isFilterLoading}
                    >
                      <X size={12} />
                    </button>
                  </div>
                )}

                {selectedModelDisplayName && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 border border-white rounded-full text-sm">
                    <span>Model: {selectedModelDisplayName}</span>
                    <button
                      onClick={() => {
                        const newFilters = { ...filters, model: null }
                        handleFilterChange(newFilters)
                      }}
                      className="bg-[#1a1ae5] rounded-full p-1"
                      disabled={isLoading || isFilterLoading}
                    >
                      <X size={12} />
                    </button>
                  </div>
                )}

                {hasPriceFilter && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 border border-white rounded-full text-sm">
                    <span>
                      Price: {formatPrice(filters.priceMin)} - {formatPrice(filters.priceMax)}
                    </span>
                    <button
                      onClick={() => {
                        const newFilters = { ...filters, priceMin: 0, priceMax: 100000 }
                        handleFilterChange(newFilters)
                        setPendingPriceRange([0, 100000])
                      }}
                      className="bg-[#1a1ae5] rounded-full p-1"
                      disabled={isLoading || isFilterLoading}
                    >
                      <X size={12} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Filter Loading Indicator */}
        {isFilterLoading && (
          <div className="flex items-center justify-center py-4">
            <div className="flex items-center gap-3 text-white">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              <span className="font-inter text-lg">Applying filters...</span>
            </div>
          </div>
        )}

        <p
          className="flex flex-col sm:flex-row items-start sm:items-center text-white font-inter text-lg lg:text-xl xl:text-2xl 2xl:text-3xl"
          role="heading"
          aria-level={3}
        >
          Not finding the car you are looking for? Just{' '}
          <span
            onClick={() => router.push('/contact')}
            className="cursor-pointer text-[#2928e8] ml-1"
          >
            Contact us.
          </span>
        </p>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-2 lg:grid-cols-3 gap-2 md:gap-4 2xl:gap-6 ultrawide:gap-8 py-4">
            {[...Array(carsPerPage)].map((_, i) => (
              <CarCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <InventoryCarsDisplay
            cars={cars}
            currentPage={currentPage}
            totalPages={totalPages}
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
          />
        )}

        {/* Feature Highlight Section */}
        {featureHighlight && (
          <FeatureHighlight
            heading={featureHighlight.heading}
            image={featureHighlight.image}
            features={featureHighlight.features}
            button={featureHighlight.button}
            imagePosition={featureHighlight.imagePosition}
          />
        )}
      </section>
      {/* Feature Section */}
      {featureSection && (
        <FeatureSectionBlockComponent
          blockType="featureSection"
          backgroundImage={featureSection.backgroundImage}
          heading={featureSection.heading}
          description={featureSection.description}
          features={featureSection.features}
          buttonText={featureSection.buttonText}
          link={featureSection.link || '#'}
        />
      )}
    </>
  )
}

export default FilteredInventoryBlock
