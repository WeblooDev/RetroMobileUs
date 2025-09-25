// services/leaseApiService.ts

import { LeaseFormData } from './leaseFormSchema'

export interface ApiResponse {
  success: boolean
  error?: string
}

export async function submitLeaseForm(data: LeaseFormData): Promise<ApiResponse> {
  try {
    // console.log('🚀 Submitting lease form to API...')

    const response = await fetch('/api/submit-lease', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const result: ApiResponse = await response.json()

    if (response.ok && result.success) {
      // console.log('✅ Lease form submitted successfully!')
      return { success: true }
    } else {
      console.error('❌ Failed to submit lease form:', result.error)
      return { success: false, error: result.error || 'Submission failed' }
    }
  } catch (error) {
    console.error('💥 Error submitting lease form:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    }
  }
}

// Alternative function for raw data (if you prefer this approach)
export async function submitRawLeaseData(data: Record<string, any>): Promise<ApiResponse> {
  try {
    // console.log('🚀 Submitting raw lease data to API...')

    const response = await fetch('/api/submit-lease', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const result: ApiResponse = await response.json()

    if (response.ok && result.success) {
      // console.log('✅ Raw lease data submitted successfully!')
      return { success: true }
    } else {
      console.error('❌ Failed to submit raw lease data:', result.error)
      return { success: false, error: result.error || 'Submission failed' }
    }
  } catch (error) {
    console.error('💥 Error submitting raw lease data:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    }
  }
}
