//InputField
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { UseFormReturn } from 'react-hook-form'
import { useState } from 'react'

interface InputFieldProps {
  form: UseFormReturn<any>
  name: string
  placeholder: string
  className?: string
  colSpan?: boolean
  required?: boolean
}

export function InputField({
  form,
  name,
  placeholder,
  className = '',
  colSpan = false,
  required = false,
}: InputFieldProps) {
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
                <Input
                  {...field}
                  onFocus={(e) => {
                    setIsFocused(true)
                    field.onBlur?.()
                  }}
                  onBlur={(e) => {
                    setIsFocused(false)
                    field.onBlur?.()
                  }}
                  className={`
                    px-4 py-6 border border-transparent bg-transparent font-inter text-black transition-all duration-200 outline-none text-sm lg:text-base
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
                          : 'top-3 text-sm lg:text-base text-[#2C2C2C]'
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
