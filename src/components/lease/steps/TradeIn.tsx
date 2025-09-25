import { UseFormReturn } from 'react-hook-form'
import { StepHeader } from '../StepHeader'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { TradeInVehicleInfo } from '../TradeIn/TradeInVehicleInfo'

export function TradeIn({ form }: { form: UseFormReturn<any> }) {
  const hasTrade = form.watch('hasTrade')

  return (
    <div className="flex flex-col gap-4 text-black">
      <StepHeader title="Do you have a vehicle to trade in?" currentStep={3} totalSteps={3} />

      <FormField
        control={form.control}
        name="hasTrade"
        render={({ field }) => (
          <FormItem>
            <FormLabel className=" text-lg text-[#121212]">
              Do you have a vehicle to trade in?
            </FormLabel>
            <FormControl>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => field.onChange(true)}
                  className={`font-inter flex-1 py-3 px-4 text-center border rounded-[0px] transition-colors ${
                    field.value === true
                      ? 'bg-[#1A1AE5] text-white border-[#1A1AE5]'
                      : 'bg-white text-[#121212] border-[#B8B8BC]'
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => field.onChange(false)}
                  className={`font-inter flex-1 py-3 px-4 text-center border rounded-[0px] transition-colors ${
                    field.value === false
                      ? 'bg-[#1A1AE5] text-white border-[#1A1AE5]'
                      : 'bg-white text-[#121212] border-[#B8B8BC]'
                  }`}
                >
                  No
                </button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {hasTrade && (
        <>
          <TradeInVehicleInfo form={form} />
        </>
      )}
    </div>
  )
}
