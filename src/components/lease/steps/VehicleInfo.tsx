import { UseFormReturn } from 'react-hook-form'
import { useEffect, useState, useRef, useCallback } from 'react'
import { FormLabel, FormField, FormItem, FormControl } from '@/components/ui/form'
import { YEAR_OPTIONS } from '../constants'
import { useBrandsCars } from '../useBrandsCars'
import { SelectField } from '../Fields/SelectField'
import { CircleCheck } from 'lucide-react'

export function VehicleInfo({
  form,
  initialCarData,
}: {
  form: UseFormReturn<any>
  initialCarData?: Record<string, any>
}) {
  const { brands, cars, loading, fetchBrands, fetchCars } = useBrandsCars()
  const initialLoadRef = useRef(false)
  const [isInitializing, setIsInitializing] = useState(true)

  // First fetch all brands
  useEffect(() => {
    if (!initialLoadRef.current) {
      fetchBrands()
      initialLoadRef.current = true
    }
  }, [fetchBrands])

  // When brands are loaded and we have initial car data, set up the brand and fetch cars
  useEffect(() => {
    if (brands.length > 0 && initialCarData && isInitializing) {
      if (initialCarData.brand && initialCarData.brand.id) {
        const brandId = initialCarData.brand.id

        // Find brand in the list to confirm it exists
        const brandExists = brands.some((brand) => brand.id === brandId)

        if (brandExists) {
          form.setValue('make', brandId, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
          })

          // Fetch cars for this brand
          fetchCars(brandId)
        }
      }
    }
  }, [brands, initialCarData, form, fetchCars, isInitializing])

  // When cars are loaded and we have initial car data, set up the model
  useEffect(() => {
    if (cars.length > 0 && initialCarData && isInitializing) {
      if (initialCarData.slug) {
        const modelSlug = initialCarData.slug

        // Check if the model exists in the loaded cars
        const modelExists = cars.some((car) => car.slug === modelSlug)

        if (modelExists) {
          form.setValue('model', modelSlug, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
          })

          // Done with initialization
          setIsInitializing(false)
        }
      }
    }
  }, [cars, initialCarData, form, isInitializing])

  // Watch for brand changes to load related cars
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'make' && value.make) {
        fetchCars(value.make)

        // Only reset model if we're not in initialization phase
        if (!isInitializing) {
          form.setValue('model', '')
        }
      }
    })

    return () => subscription.unsubscribe()
  }, [form, fetchCars, isInitializing])

  const handleBrandChange = (value: string) => {
    // Only reset model if not during initialization
    if (!isInitializing) {
      form.setValue('model', '')
    }
  }

  const handleModelChange = (value: string) => {
    // No need to reset anything when model changes
  }

  // Format the vehicle display string
  const formatVehicleDisplay = useCallback(() => {
    if (!initialCarData) return ''

    const year = initialCarData.year || ''
    const brand = initialCarData.brand?.name || ''
    const model = initialCarData.model || ''

    // Respect the hidePrice setting
    const priceDisplay = initialCarData.hidePrice
      ? 'Contact for Price'
      : initialCarData.price
        ? `$${initialCarData.price}/month`
        : ''

    return `${year} | ${brand} ${model} | ${priceDisplay}`.trim()
  }, [initialCarData])

  // Set the vehicle display value in the form when initialCarData is available
  useEffect(() => {
    if (initialCarData) {
      form.setValue('vehicleDisplay', formatVehicleDisplay())
    }
  }, [initialCarData, form, formatVehicleDisplay])

  // Sort brands alphabetically by name
  const sortedBrands = [...brands].sort((a, b) => a.name.localeCompare(b.name))

  // Sort cars alphabetically by model
  const sortedCars = [...cars].sort((a, b) => a.model.localeCompare(b.model))

  if (initialCarData) {
    return (
      <div className="flex flex-col gap-4">
        <FormLabel className=" text-base lg:text-lg 2xl:text-xl text-black">Vehicle</FormLabel>

        <FormField
          control={form.control}
          name="vehicleDisplay"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative flex items-center justify-between border border-gray-300 px-4 py-4 bg-white">
                  <span className="text-black font-inter font-light text-sm lg:text-base 2xl:text-lg">
                    {field.value}
                  </span>
                  <CircleCheck className=" hidden lg:block text-black" />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    )
  } else {
    return (
      <div className="flex flex-col gap-4">
        <FormLabel className=" text-lg lg:text-xl 2xl:text-2xl text-black font-thin">
          Vehicle Information
        </FormLabel>

        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField
            form={form}
            name="make"
            placeholder="Make*"
            options={sortedBrands.map((brand) => ({ value: brand.id, label: brand.name }))}
            loading={loading.brands}
            loadingText="Loading brands..."
            onValueChange={handleBrandChange}
          />

          <SelectField
            form={form}
            name="model"
            placeholder="Model*"
            options={sortedCars.map((car) => ({ value: car.slug, label: car.model }))}
            loading={loading.cars}
            loadingText="Loading models..."
            onValueChange={handleModelChange}
          />
        </div>
      </div>
    )
  }
}
