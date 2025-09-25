import { useEffect, useRef } from 'react'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Loader2 } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'

interface Option {
  value: string
  label: string
}

interface SelectFieldProps {
  form: UseFormReturn<any>
  name: string
  placeholder: string
  options: Option[]
  disabled?: boolean
  loading?: boolean
  loadingText?: string
  onValueChange?: (value: string) => void
}

export function SelectField({
  form,
  name,
  placeholder,
  options,
  disabled = false,
  loading = false,
  loadingText = 'Loading...',
  onValueChange,
}: SelectFieldProps) {
  // Using ref to track initialization to prevent infinite loops
  const initializedRef = useRef(false)

  // One-time initialization when options load
  useEffect(() => {
    // Skip if already initialized or no options
    if (initializedRef.current || options.length === 0) {
      return
    }

    const currentValue = form.getValues(name)

    if (currentValue) {
      const valueExists = options.some((option) => option.value === currentValue)

      if (valueExists) {
        // We've confirmed the value exists in options, mark as initialized
        initializedRef.current = true
      }
    }
  }, [options, form, name])

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="font-inter">
          <FormControl>
            <Select
              onValueChange={(value) => {
                field.onChange(value)
                if (onValueChange) onValueChange(value)
              }}
              value={field.value || ''}
              disabled={disabled || loading}
            >
              <SelectTrigger className="px-4 py-6 rounded-[0px] border-[#B8B8BC] outline-none text-[#2C2C2C] bg-white">
                {loading ? (
                  <div className="flex items-center gap-2 text-[#2C2C2C] font-inter">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>{loadingText}</span>
                  </div>
                ) : (
                  <SelectValue placeholder={placeholder} className="text-[#2C2C2C] font-inter" />
                )}
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200 shadow-lg text-black font-inter">
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
