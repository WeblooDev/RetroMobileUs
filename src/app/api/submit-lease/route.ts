// app/api/submit-lease/route.ts
import { NextRequest, NextResponse } from 'next/server'

import { getPayload } from 'payload'
import config from '@payload-config'

// HubSpot Form Config
const HUBSPOT_PORTAL_ID = '43898601'
const HUBSPOT_FORM_GUID = '9e21cda3-9c9f-41d7-a05a-b5e94b34cd94'
const FORM_ENDPOINT = `https://forms.hubspot.com/uploads/form/v2/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_GUID}`

// Updated type to match your current frontend form
interface LeaseFormData {
  // Vehicle Information
  make?: string
  model?: string
  year?: string

  // Personal Information
  firstName: string
  phone: string
  email?: string
  titlingZip: string
  message?: string

  // Privacy/Terms
  agreeToMarketing?: boolean
  agreeToTermsAndPrivacy: boolean
}

// Function to resolve brand ID to brand name using Payload CMS
async function resolveBrandName(brandId: string): Promise<string> {
  try {
    const payload = await getPayload({ config })

    const brand = await payload.findByID({
      collection: 'brands',
      id: brandId,
    })

    return brand ? brand.name : brandId
  } catch (error) {
    console.error('Error fetching brand from Payload:', error)
    return brandId
  }
}

// Function to transform lease form data to HubSpot format
async function transformLeaseDataToHubSpot(
  leaseData: LeaseFormData,
): Promise<Record<string, string>> {
  // Resolve brand ID to brand name if make is provided
  const brandName = leaseData.make ? await resolveBrandName(leaseData.make) : ''

  const hubspotData: Record<string, any> = {
    // Personal Information
    firstname: leaseData.firstName,
    // lastname: '', // Remove since we don't collect this anymore
    phone: leaseData.phone,
    email: leaseData.email || '',
    zip: leaseData.titlingZip,

    // Message field
    message: leaseData.message || '',

    // Vehicle Information (only if provided)
    ...(leaseData.make && { make: brandName }),
    ...(leaseData.model && { model_wits_test: leaseData.model }),
    ...(leaseData.year && { car_year: leaseData.year }),

    // Marketing consent
    marketing_consent: leaseData.agreeToMarketing || false,
    terms_consent: leaseData.agreeToTermsAndPrivacy,
  }

  return hubspotData
}

// Function to submit form to HubSpot
async function submitToHubSpot(
  hubspotData: Record<string, string>,
): Promise<{ success: boolean; error?: string }> {
  try {
    const params = new URLSearchParams(hubspotData)

    const response = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    })

    if (response.ok) {
      return { success: true }
    } else {
      const errorText = await response.text()
      console.error(`❌ Failed to submit form. Status: ${response.status}`)
      console.error('Error response:', errorText)
      return { success: false, error: `HTTP ${response.status}: ${errorText}` }
    }
  } catch (err) {
    console.error('💥 Error submitting form to HubSpot:', err)
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' }
  }
}

// POST handler for the API route
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const leaseData: LeaseFormData = await request.json()

    // Updated validation - only check for fields we actually collect
    if (!leaseData.firstName || !leaseData.phone || !leaseData.titlingZip) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: firstName, phone, or titlingZip' },
        { status: 400 },
      )
    }

    // Transform data for HubSpot
    const hubspotData = await transformLeaseDataToHubSpot(leaseData)

    // Submit to HubSpot
    const result = await submitToHubSpot(hubspotData)

    if (result.success) {
      return NextResponse.json({ success: true }, { status: 200 })
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 })
    }
  } catch (error) {
    console.error('💥 API Route Error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

// Optional: GET handler to test the endpoint
export async function GET() {
  return NextResponse.json({
    message: 'HubSpot lease form submission endpoint',
    endpoint: '/api/submit-lease',
    method: 'POST',
  })
}
