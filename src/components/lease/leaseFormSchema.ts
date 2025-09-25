import * as z from 'zod'

// Create a function that returns the schema based on whether initial data exists
export const createLeaseFormSchema = (hasInitialData: boolean = false) => {
  return z.object({
    // VehicleInfo fields - required only if no initial data
    make: hasInitialData ? z.string().optional() : z.string().min(1, 'Make is required'),
    model: hasInitialData ? z.string().optional() : z.string().min(1, 'Model is required'),
    // PersonalInfo fields (always required)
    firstName: z.string().min(1, 'Name is required'),
    titlingZip: z.string().min(5, 'Please enter a valid ZIP code').max(10),
    phone: z
      .string()
      .min(1, 'Phone number is required')
      .regex(/^[\+]?[(]?[\d\s\-\(\)]{10,}$/, 'Please enter a valid phone number'),
    email: z.string().email('Please enter a valid email address').optional(),
    message: z.string().optional(),

    // Vehicle display field (used when initial data exists)
    vehicleDisplay: z.string().optional(),

    // Privacy/Terms checkboxes
    agreeToMarketing: z.boolean().optional(),
    agreeToTermsAndPrivacy: z.literal(true, {
      errorMap: () => ({ message: 'You must agree to continue' }),
    }),
  })
}

// Default schema for when no initial data is provided
export const leaseFormSchema = createLeaseFormSchema(false)

// Type inference
export type LeaseFormData = z.infer<typeof leaseFormSchema>
