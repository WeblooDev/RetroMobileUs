import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface FormFieldComponentProps {
  form: any
  name: string
  placeholder: string
  options?: Array<string | { value: string; label: string }>
  disabled?: boolean
}

export function FormFieldComponent({
  form,
  name,
  placeholder,
  options,
  disabled = false,
}: FormFieldComponentProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            {options ? (
              <Select onValueChange={field.onChange} defaultValue={field.value} disabled={disabled}>
                <SelectTrigger className="px-5 py-7 rounded-[0px] border-[#B8B8BC] outline-none">
                  <SelectValue placeholder={placeholder} className="text-[#121212] font-inter" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200 shadow-lg text-[#121212] font-inter">
                  {options.map((option) =>
                    typeof option === 'string' ? (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ) : (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            ) : (
              <Input
                placeholder={placeholder}
                className="px-5 py-7 rounded-[0px] border-[#B8B8BC] outline-none"
                {...field}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
