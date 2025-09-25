import { useCallback, useEffect, useState } from 'react'

interface Brand {
  id: string
  name: string
}

interface Car {
  id: string
  model: string
  slug: string
  brand: string | Brand
}

interface LoadingState {
  brands: boolean
  cars: boolean
}

interface ErrorState {
  brands: string | null
  cars: string | null
}

export function useBrandsCars() {
  const [brands, setBrands] = useState<Brand[]>([])
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState<LoadingState>({ brands: false, cars: false })
  const [errors, setErrors] = useState<ErrorState>({ brands: null, cars: null })
  const [currentBrandId, setCurrentBrandId] = useState<string | null>(null)

  // Fetch brands from the custom_brands API
  const fetchBrands = useCallback(async () => {
    try {
      setLoading((prev) => ({ ...prev, brands: true }))
      setErrors((prev) => ({ ...prev, brands: null }))

      const response = await fetch('/api/custom_brands')
      if (!response.ok) throw new Error('Failed to fetch brands')

      const data = await response.json()
      setBrands(data.docs || [])
    } catch (error) {
      console.error('Error fetching brands:', error)
      setErrors((prev) => ({ ...prev, brands: 'Failed to load brands. Please try again.' }))
    } finally {
      setLoading((prev) => ({ ...prev, brands: false }))
    }
  }, [])

  // Fetch cars for the selected brand
  const fetchCars = useCallback(
    async (brandId: string) => {
      if (!brandId) {
        setCars([])
        return
      }

      // Don't refetch if we're already showing cars for this brand
      if (brandId === currentBrandId && cars.length > 0) {
        return
      }

      try {
        setLoading((prev) => ({ ...prev, cars: true }))
        setErrors((prev) => ({ ...prev, cars: null }))
        setCurrentBrandId(brandId)

        // Create URLSearchParams to properly handle query parameters
        const params = new URLSearchParams({
          brandId: brandId,
          // hidden: 'true',
        })

        const response = await fetch(`/api/custom_cars?${params.toString()}`)
        if (!response.ok) throw new Error('Failed to fetch cars')

        const data = await response.json()
        setCars(data.docs || [])
      } catch (error) {
        console.error('Error fetching cars:', error)
        setErrors((prev) => ({ ...prev, cars: 'Failed to load cars. Please try again.' }))
        setCars([])
      } finally {
        setLoading((prev) => ({ ...prev, cars: false }))
      }
    },
    [currentBrandId, cars.length],
  )

  return {
    brands,
    cars,
    loading,
    errors,
    fetchBrands,
    fetchCars,
    currentBrandId,
  }
}
