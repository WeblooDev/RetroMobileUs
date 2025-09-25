import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { UseFormReturn } from 'react-hook-form'

interface OptionGroupProps {
  form: UseFormReturn<any>
  name: string
  label: string
  options: { value: string; label: string }[]
  columns?: number
  multiSelect?: boolean
}

export function OptionGroup({
  form,
  name,
  label,
  options,
  columns = 2,
  multiSelect = false,
}: OptionGroupProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="font-ivar text-lg text-[#121212]">{label}</FormLabel>
          <div
            className={`grid gap-4 ${
              columns === 1
                ? 'grid-cols-1 sm:grid-cols-1'
                : columns === 2
                  ? 'grid-cols-1 sm:grid-cols-2'
                  : columns === 3
                    ? 'grid-cols-2 sm:grid-cols-3'
                    : columns === 4
                      ? 'grid-cols-2 sm:grid-cols-4'
                      : 'grid-cols-2 sm:grid-cols-4'
            }`}
          >
            {options.map((option) => {
              const isSelected = multiSelect
                ? Array.isArray(field.value) && field.value.includes(option.value)
                : field.value === option.value

              const handleClick = () => {
                if (multiSelect) {
                  const currentValues = Array.isArray(field.value) ? field.value : []
                  if (currentValues.includes(option.value)) {
                    // Remove the value
                    field.onChange(currentValues.filter((val) => val !== option.value))
                  } else {
                    // Add the value
                    field.onChange([...currentValues, option.value])
                  }
                } else {
                  field.onChange(option.value)
                }
              }

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={handleClick}
                  className={`font-inter py-3 px-4 text-center border rounded-[0px] transition-colors ${
                    isSelected
                      ? 'bg-[#1A1AE5] text-white border-[#1A1AE5]'
                      : 'bg-white text-[#121212] border-[#B8B8BC]'
                  }`}
                >
                  {option.label}
                </button>
              )
            })}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
