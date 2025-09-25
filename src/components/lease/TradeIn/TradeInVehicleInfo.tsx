import { UseFormReturn } from 'react-hook-form'
import { FormLabel } from '@/components/ui/form'
import { InputField } from '../Fields/InputField'

export const TradeInVehicleInfo = ({ form }: { form: UseFormReturn<any> }) => {
  return (
    <div className="flex flex-col gap-2">
      <FormLabel className=" text-lg text-[#121212]">Vehicle</FormLabel>
      <div className="grid gap-4 sm:grid-cols-2">
        <InputField form={form} name="vin" placeholder="Vin Number" />
        <InputField form={form} name="odometer" placeholder="Mileage" />
      </div>
    </div>
  )
}
