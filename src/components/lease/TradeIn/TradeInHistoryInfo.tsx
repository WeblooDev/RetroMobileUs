import { UseFormReturn } from 'react-hook-form'
import { ToggleField } from '../Fields/ToggleField'

export const TradeInHistoryInfo = ({ form }: { form: UseFormReturn<any> }) => {
  return (
    <>
      <ToggleField form={form} name="hasAccidents" label="Any accident history?" />
      <ToggleField form={form} name="hasLien" label="Is there a lien?" />
    </>
  )
}
