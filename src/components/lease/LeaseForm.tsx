'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'lucide-react'
import { Form, FormLabel } from '@/components/ui/form'
import { VehicleInfo } from './steps/VehicleInfo'
import { PersonalInfo } from './steps/PersonalInfo'
import { useRouter } from 'next/navigation'
import { createLeaseFormSchema, LeaseFormData } from './leaseFormSchema'
import { submitLeaseForm } from './leaseApiService'
import { PrivacyPolicyConsent } from './PrivacyPolicyConsent'
// import { fbqTrack, MetaPixelEvents } from '@/utilities/metaPixel'

export function LeaseForm({ initialData }: { initialData?: Record<string, any> }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  // Determine if we have initial data
  const hasInitialData = Boolean(initialData)

  // Create appropriate schema based on whether we have initial data
  const formSchema = createLeaseFormSchema(hasInitialData)

  // Create form with dynamic schema validation
  const form = useForm<LeaseFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // VehicleInfo defaults
      make: '',
      model: '',
      vehicleDisplay: '',
      firstName: '',
      phone: '',
      email: '',
      titlingZip: '',
      message: '',

      // Privacy defaults
      agreeToMarketing: true,
      agreeToTermsAndPrivacy: true,
    },
  })

  const onSubmit = async (data: LeaseFormData) => {
    const isValid = await form.trigger()

    if (!isValid) return

    setIsSubmitting(true)

    try {
      const result = await submitLeaseForm(data)

      if (result.success) {
        // fbqTrack(MetaPixelEvents.DRLeaseLead)
        router.push('/lease/success')
      } else {
        console.error('❌ Lease form submission failed:', result.error)
        router.push('/lease/success')
      }
    } catch (error) {
      console.error('💥 Unexpected error during submission:', error)

      // Handle unexpected errors
      alert('An unexpected error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 bg-white p-4 md:p-6 lg:p-8 gap-4 flex flex-col h-full justify-between"
      >
        <FormLabel className="font-ivar text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl 2xl:mb-6 text-black">
          Complete And Submit This Form To Begin
        </FormLabel>

        <VehicleInfo form={form} initialCarData={initialData} />
        <PersonalInfo form={form} />
        <PrivacyPolicyConsent form={form} />

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || form.formState.isSubmitting}
            className="relative inline-flex items-center gap-8 px-8 py-3 font-inter transition-all duration-300 overflow-hidden group  bg-[#1A1AE5] text-white rounded"
          >
            <span className="relative z-10 transition-colors duration-300 tracking-wide">
              Submit
            </span>
          </button>
        </div>
      </form>
    </Form>
  )
}
