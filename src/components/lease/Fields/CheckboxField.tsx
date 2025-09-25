//CheckboxField
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'
import { UseFormReturn } from 'react-hook-form'
import { useId } from 'react'

interface CheckboxFieldProps {
  form: UseFormReturn<any>
  name: string
  required?: boolean
  text?: string | React.ReactNode
}

export function CheckboxField({ form, name, text, required }: CheckboxFieldProps) {
  const tooltipId = useId()

  return (
    <FormField
      control={form.control}
      name={name}
      rules={
        required
          ? {
              required: 'This field is required',
            }
          : {}
      }
      render={({ field, fieldState }) => (
        <FormItem className="flex flex-col">
          <div className="relative flex flex-row items-center gap-4 group">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                className="w-4 h-4 rounded-none border border-black"
              />
            </FormControl>
            <span>{text}</span>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
