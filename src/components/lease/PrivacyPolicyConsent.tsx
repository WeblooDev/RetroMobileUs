import Link from 'next/link'
import { FormDescription } from '@/components/ui/form'
import { UseFormReturn } from 'react-hook-form'
import { CheckboxField } from './Fields/CheckboxField'

export function PrivacyPolicyConsent({ form }: { form: UseFormReturn<any> }) {
  return (
    <div className="flex flex-col gap-4 mt-2">
      <FormDescription className="flex items-center justify-start gap-3 text-sm text-black font-inter">
        <CheckboxField
          form={form}
          name="agreeToMarketing"
          text="I agree to receive text messages related to my lease inquiry. "
        />
      </FormDescription>

      <FormDescription className="flex items-center justify-start gap-3 text-sm text-black font-inter">
        <CheckboxField
          form={form}
          name="agreeToTermsAndPrivacy"
          text={
            <span className="">
              By submitting this form, I accept the duPont Registry{' '}
              <Link
                href={'https://www.dupontregistry.com/participation'}
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms and Conditions
              </Link>{' '}
              and{' '}
              <Link
                href={'https://www.dupontregistry.com/privacy'}
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </Link>
              *
            </span>
          }
          required
        />
      </FormDescription>
    </div>
  )
}
