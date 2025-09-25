//ToggleField
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { UseFormReturn } from 'react-hook-form'

interface ToggleFieldProps {
  form: UseFormReturn<any>
  name: string
  label: string
}

export function ToggleField({ form, name, label }: ToggleFieldProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className=" text-xl text-black">{label}</FormLabel>
          <FormControl>
            <div className="flex gap-4">
              {[true, false].map((val) => (
                <button
                  key={String(val)}
                  onClick={() => field.onChange(val)}
                  type="button"
                  className={`font-inter flex-1 py-3 px-4 text-center border rounded-[0px] transition-colors ${
                    field.value === val
                      ? 'bg-[#1A1AE5] text-white border-[#1A1AE5]'
                      : 'bg-white text-[#121212] border-[#B8B8BC]'
                  }`}
                >
                  {val ? 'Yes' : 'No'}
                </button>
              ))}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
