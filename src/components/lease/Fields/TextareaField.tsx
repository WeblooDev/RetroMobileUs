// TextareaField.tsx

import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { UseFormReturn } from 'react-hook-form'
import { useState } from 'react'

interface TextareaFieldProps {
  form: UseFormReturn<any>
  name: string
  placeholder: string
  className?: string
  colSpan?: boolean
  rows?: number
  required?: boolean
}

export function TextareaField({
  form,
  name,
  placeholder,
  className = '',
  colSpan = false,
  rows = 5,
  required = false,
}: TextareaFieldProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => {
        const hasValue = field.value && field.value.length > 0
        const hasError = fieldState.error
        const isActive = isFocused || hasValue

        return (
          <FormItem className={colSpan ? 'sm:col-span-2' : ''}>
            <FormControl>
              <div className="relative">
                <Textarea
                  {...field}
                  rows={rows}
                  onFocus={(e) => {
                    setIsFocused(true)
                    field.onBlur?.()
                  }}
                  onBlur={(e) => {
                    setIsFocused(false)
                    field.onBlur?.()
                  }}
                  className={`
                    px-4  border bg-transparent font-inter text-black transition-all duration-200 outline-none resize-none text-sm lg:text-base
                    ${
                      isFocused
                        ? 'border-black focus:border-black'
                        : 'border-[#B8B8BC] hover:border-black'
                    }
                    ${className}
                  `}
                />
                <label
                  className={`
                    absolute left-3 pointer-events-none transition-all duration-200 font-inter
                    ${
                      isActive
                        ? hasError
                          ? '-top-2 text-xs bg-white px-1 text-red-500'
                          : '-top-2 text-xs bg-white px-1 text-[#1a1ae5]'
                        : hasError
                          ? 'top-4 text-sm lg:text-base text-red-500'
                          : 'top-4 text-sm lg:text-base text-[#2C2C2C]'
                    }
                  `}
                >
                  {required ? `${placeholder}*` : placeholder}
                </label>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
