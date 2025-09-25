'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import type { Brand, Car } from '@/payload-types'
import { SearchableDropdown } from './SearchableDropdown'
import { PriceRangeDropdown } from './PriceRangeDropdown'
import { X } from 'lucide-react'

export type CarFilters = {
  brand: string | null
  model: string | null
  priceMin: number
  priceMax: number
  isOpenToDemo: boolean
  isOpenToPreowned: boolean
}

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

interface CarFiltersProps {
  brands: Brand[]
  cars: Car[]
  inventoryCounts: InventoryCounts
  onFilterChange: (filters: CarFilters) => void
  isLoading?: boolean
}

export default function InventoryFilters({
  brands,
  cars,
  inventoryCounts,
  onFilterChange,
  isLoading,
}: CarFiltersProps) {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
  const [selectedModel, setSelectedModel] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000])
  const [pendingPriceRange, setPendingPriceRange] = useState<[number, number]>([0, 100000])

  const [isOpenToDemo, setIsOpenToDemo] = useState(false)
  const [isOpenToPreowned, setIsOpenToPreowned] = useState(false)
  const [priceMenuOpen, setPriceMenuOpen] = useState(false)
  const [brandSearch, setBrandSearch] = useState('')
  const [modelSearch, setModelSearch] = useState('')

  // Filter available cars (not sold and not hidden) - now only used for internal component logic
  const availableCars = useMemo(() => {
    return cars.filter((car) => car.availability !== 'sold' && !car.hidden)
  }, [cars])

  useEffect(() => {
    setPendingPriceRange(priceRange)
  }, [priceRange])

  useEffect(() => {
    if (selectedBrand) {
      // Reset model when brand changes
      setSelectedModel(null)
    }
  }, [selectedBrand])

  // Memoize the filter object to prevent unnecessary re-renders
  const currentFilters = useMemo(
    () => ({
      brand: selectedBrand,
      model: selectedModel,
      priceMin: priceRange[0],
      priceMax: priceRange[1],
      isOpenToDemo,
      isOpenToPreowned,
    }),
    [selectedBrand, selectedModel, priceRange, isOpenToDemo, isOpenToPreowned],
  )

  // Use useCallback to memoize the filter change handler
  const handleFilterChangeCallback = useCallback(() => {
    onFilterChange(currentFilters)
  }, [onFilterChange, currentFilters])

  useEffect(() => {
    handleFilterChangeCallback()
  }, [handleFilterChangeCallback])

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

  const handleModelChange = (value: string) => {
    setSelectedModel(value === 'all' ? null : value)
  }

  const handleBrandChange = (value: string) => {
    setSelectedBrand(value === 'all' ? null : value)
  }

  const clearFilter = (filterType: 'brand' | 'model' | 'price' | 'demo' | 'preowned' | 'all') => {
    switch (filterType) {
      case 'brand':
        setSelectedBrand(null)
        setSelectedModel(null)
        break
      case 'model':
        setSelectedModel(null)
        break
      case 'price':
        setPriceRange([0, 100000])
        setPendingPriceRange([0, 100000])
        break
      case 'demo':
        setIsOpenToDemo(false)
        break
      case 'preowned':
        setIsOpenToPreowned(false)
        break
      case 'all':
        setSelectedBrand(null)
        setSelectedModel(null)
        setPriceRange([0, 100000])
        setPendingPriceRange([0, 100000])
        setIsOpenToDemo(false)
        setIsOpenToPreowned(false)
        break
    }
  }

  // Enhanced brand options with counts and sorting from cached data
  const filteredBrands = useMemo(() => {
    return inventoryCounts.brands
      .filter((brandCount) => brandCount.name.toLowerCase().includes(brandSearch.toLowerCase()))
      .map((brandCount) => ({
        value: brandCount.id,
        label: `${brandCount.name} (${brandCount.count})`,
      }))
  }, [inventoryCounts.brands, brandSearch])

  // Enhanced model options with counts and sorting from cached data
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
    if (!selectedBrand) return null
    const brandCount = inventoryCounts.brands.find((b) => b.id === selectedBrand)
    return brandCount?.name || null
  }, [selectedBrand, inventoryCounts.brands])

  // Get selected model name for display
  const selectedModelName = useMemo(() => {
    if (!selectedModel) return null
    const modelCount = inventoryCounts.models.find((m) => m.id === selectedModel)
    return modelCount?.name || null
  }, [selectedModel, inventoryCounts.models])

  // Check if price range is not default
  const hasPriceFilter = priceRange[0] !== 0 || priceRange[1] !== 100000

  // Check if any filters are active
  const hasActiveFilters =
    selectedBrand || selectedModel || hasPriceFilter || isOpenToDemo || isOpenToPreowned

  return (
    <div className="w-full font-inter font-light">
      <div className="flex flex-wrap gap-4 lg:gap-6 items-center">
        <div className="w-full sm:w-auto">
          <SearchableDropdown
            placeholder="Make"
            value={selectedBrand}
            onChange={handleBrandChange}
            search={brandSearch}
            setSearch={setBrandSearch}
            options={filteredBrands}
            disabled={isLoading}
          />
        </div>

        <div className="w-full sm:w-auto">
          <SearchableDropdown
            placeholder="Model"
            value={selectedModel}
            onChange={handleModelChange}
            search={modelSearch}
            setSearch={setModelSearch}
            options={filteredModelOptions}
            disabled={!selectedBrand || isLoading}
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
            onApply={() => setPriceRange(pendingPriceRange)}
            disabled={isLoading}
          />
        </div>

        {/* <div className="flex flex-wrap gap-2 lg:gap-4">
          <LabeledCheckbox
            id="demo"
            label="Open to demo/loaner vehicles?"
            checked={isOpenToDemo}
            onChange={setIsOpenToDemo}
            disabled={isLoading}
          />

          <LabeledCheckbox
            id="preowned"
            label="Open to preowned/CPO lease?"
            checked={isOpenToPreowned}
            onChange={setIsOpenToPreowned}
            disabled={isLoading}
          />
        </div> */}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 p-3 rounded-lg  border border-white text-sm xl:text-base 2xl:text-lg">
          <div className="flex justify-between items-center gap-2 mb-2">
            <span className=" font-medium text-white">Active Filters:</span>
            <button
              onClick={() => clearFilter('all')}
              className="font-inter bg-[#1a1ae5] text-white px-4 py-2 rounded text-lg"
              disabled={isLoading}
            >
              Clear All
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {selectedBrandName && (
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-white rounded-full">
                <span>Make: {selectedBrandName}</span>
                <button
                  onClick={() => clearFilter('brand')}
                  className="bg-[#1a1ae5] rounded-full p-1"
                  disabled={isLoading}
                >
                  <X size={12} />
                </button>
              </div>
            )}

            {selectedModelName && (
              <div className="inline-flex items-center  gap-2 px-4 py-2 border border-white  rounded-full text-sm">
                <span>Model: {selectedModelName}</span>
                <button
                  onClick={() => clearFilter('model')}
                  className="bg-[#1a1ae5] rounded-full p-1"
                  disabled={isLoading}
                >
                  <X size={12} />
                </button>
              </div>
            )}

            {hasPriceFilter && (
              <div className="inline-flex items-center  gap-2 px-4 py-2 border border-white  rounded-full text-sm">
                <span>
                  Price: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                </span>
                <button
                  onClick={() => clearFilter('price')}
                  className="bg-[#1a1ae5] rounded-full p-1"
                  disabled={isLoading}
                >
                  <X size={12} />
                </button>
              </div>
            )}

            {isOpenToDemo && (
              <div className="inline-flex items-center  gap-2 px-4 py-2 border border-white rounded-full text-sm">
                <span>Demo/Loaner</span>
                <button
                  onClick={() => clearFilter('demo')}
                  className="bg-[#1a1ae5] rounded-full p-1"
                  disabled={isLoading}
                >
                  <X size={12} />
                </button>
              </div>
            )}

            {isOpenToPreowned && (
              <div className="inline-flex items-center  gap-2 px-4 py-2 border border-white rounded-full text-sm">
                <span>Preowned/CPO</span>
                <button
                  onClick={() => clearFilter('preowned')}
                  className="bg-[#1a1ae5] rounded-full p-1"
                  disabled={isLoading}
                >
                  <X size={12} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
