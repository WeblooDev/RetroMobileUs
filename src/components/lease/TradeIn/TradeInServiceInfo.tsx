import { UseFormReturn } from 'react-hook-form'
import { OptionGroup } from '../Fields/OptionGroup'
import { LEASE_TIMELINE_OPTIONS } from '../constants'

export const TradeInServiceInfo = ({ form }: { form: UseFormReturn<any> }) => {
  return (
    <>
      <OptionGroup
        form={form}
        name="lastService"
        label="Last service done?"
        options={LEASE_TIMELINE_OPTIONS}
        columns={2}
      />

      <OptionGroup
        form={form}
        name="lastTiresBrakes"
        label="Last tires/brakes changed?"
        options={LEASE_TIMELINE_OPTIONS}
        columns={2}
      />
    </>
  )
}
