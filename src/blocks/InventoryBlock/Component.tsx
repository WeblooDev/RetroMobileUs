'use client'

import type React from 'react'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { Brand, Car, InventoryBlock as InventoryBlockProps } from '@/payload-types'
import CarCardSkeleton from '@/components/Inventory/CarCardSkeleton'
import InventoryHeader from '@/components/Inventory/InventoryHeader'
import InventoryFilters, { type CarFilters } from '@/components/Inventory/InventoryFilters'
import InventoryCarsDisplay from '@/components/Inventory/InventoryCarsDisplay'
import { FilteredInventoryBlock } from '@/components/CurrentSpecials/FilteredInventoryBlock'

// Types for inventory counts
export interface BrandCount {
  id: string
  name: string
  count: number
}

export interface ModelCount {
  id: string
  name: string
  count: number
}

export interface InventoryCounts {
  brands: BrandCount[]
  models: ModelCount[]
}

interface ExtendedInventoryBlockProps extends InventoryBlockProps {
  initialFilters?: {
    brand?: string
    price?: string
  }
  useUrlFiltering?: boolean
}

export const InventoryBlock: React.FC<ExtendedInventoryBlockProps> = ({
  title,
  description,
  initialFilters = {},
  useUrlFiltering = false,
}) => {
  const router = useRouter()
  const [brands, setBrands] = useState<Brand[]>([])
  const [cars, setCars] = useState<Car[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [inventoryCounts, setInventoryCounts] = useState<InventoryCounts>({
    brands: [],
    models: [],
  })

  const [filters, setFilters] = useState<CarFilters>({
    brand: null,
    model: null,
    priceMin: 0,
    priceMax: 100000,
    isOpenToDemo: false,
    isOpenToPreowned: false,
  })

  const carsPerPage = 12
  const topRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!isLoading && topRef.current) topRef.current.scrollIntoView()
  }, [currentPage, isLoading])

  // Fetch brands and brand counts on component mount
  useEffect(() => {
    // Skip this logic if using URL filtering (handled by FilteredInventoryBlock)
    if (useUrlFiltering) return

    const fetchBrandsAndCounts = async () => {
      try {
        // Fetch brands
        const brandsRes = await fetch('/api/custom_brands')
        const brandsData = await brandsRes.json()
        setBrands(brandsData.docs || [])

        // Fetch brand counts
        const countsRes = await fetch('/api/inventory_counts')
        const countsData = await countsRes.json()
        setInventoryCounts((prev) => ({
          ...prev,
          brands: countsData.brands || [],
        }))
      } catch (err) {
        console.error('Failed to fetch brands and counts:', err)
      }
    }

    fetchBrandsAndCounts()
  }, [useUrlFiltering])

  // Fetch model counts when brand changes
  useEffect(() => {
    // Skip this logic if using URL filtering (handled by FilteredInventoryBlock)
    if (useUrlFiltering) return

    const fetchModelCounts = async () => {
      if (!filters.brand) {
        setInventoryCounts((prev) => ({
          ...prev,
          models: [],
        }))
        return
      }

      try {
        const countsRes = await fetch(`/api/inventory_counts?brandId=${filters.brand}`)
        const countsData = await countsRes.json()
        setInventoryCounts((prev) => ({
          ...prev,
          models: countsData.models || [],
        }))
      } catch (err) {
        console.error('Failed to fetch model counts:', err)
      }
    }

    fetchModelCounts()
  }, [filters.brand, useUrlFiltering])

  useEffect(() => {
    // Skip this logic if using URL filtering (handled by FilteredInventoryBlock)
    if (useUrlFiltering) return

    const fetchCars = async () => {
      try {
        setIsLoading(true)

        const params = new URLSearchParams({
          page: String(currentPage),
          limit: String(carsPerPage),
        })

        if (filters.brand) params.append('brandId', filters.brand)
        if (filters.model) params.append('modelId', filters.model)

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
      } catch (err) {
        console.error('Failed to fetch cars:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCars()
  }, [filters, currentPage, useUrlFiltering])

  const handlePrevPage = useCallback(() => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }, [currentPage])

  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }, [currentPage, totalPages])

  const handleFilterChange = useCallback((newFilters: CarFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }, [])

  // If URL filtering is enabled, use the FilteredInventoryBlock component
  if (useUrlFiltering) {
    return (
      <FilteredInventoryBlock
        initialFilters={initialFilters}
        title={title}
        description={description}
      />
    )
  }

  // Standard InventoryBlock logic for non-URL filtering
  return (
    <section
      className="w-full flex flex-col h-full container gap-4 lg:gap-6 xl:gap-8 2xl:gap-10  mb-8"
      ref={topRef}
    >
      <InventoryHeader title={title} description={description} />

      <InventoryFilters
        brands={brands}
        cars={cars}
        inventoryCounts={inventoryCounts}
        onFilterChange={handleFilterChange}
        isLoading={isLoading}
      />

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
    </section>
  )
}

export default InventoryBlock
