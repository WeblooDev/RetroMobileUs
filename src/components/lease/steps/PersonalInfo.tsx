import { UseFormReturn } from 'react-hook-form'
import { InputField } from '../Fields/InputField'
import { TextareaField } from '../Fields/TextareaField'
import { FormLabel } from '@/components/ui/form'

export function PersonalInfo({ form }: { form: UseFormReturn<any> }) {
  return (
    <div className="flex flex-col gap-4">
      <FormLabel className=" text-lg lg:text-xl 2xl:text-2xl text-black font-thin">
        Personal Information
      </FormLabel>

      <div className="flex flex-col gap-4">
        <InputField form={form} name="firstName" placeholder="Name" required />
        <InputField
          form={form}
          name="titlingZip"
          placeholder="Zip Code (City, State, Zip, County)"
          required
        />
        <InputField form={form} name="phone" placeholder="Phone Number" required />
        <InputField form={form} name="email" placeholder="Email" />
        <TextareaField form={form} name="message" placeholder="Message" />
      </div>
    </div>
  )
}
