'use client'

import { useState } from 'react'
import type { UseKlaviyoSubscriptionReturn, UseKlaviyoSubscriptionOptions } from '@/types/klaviyo'

export function useKlaviyoSubscription(
  options: UseKlaviyoSubscriptionOptions = {},
): UseKlaviyoSubscriptionReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const { endpoint = '/api/klaviyo-subscribe', onSuccess, onError } = options

  const subscribe = async (
    email: string,
    metadata?: Record<string, string | number | boolean>,
  ): Promise<boolean> => {
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, metadata }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe')
      }

      setSuccess(true)
      onSuccess?.()
      return true
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred'
      setError(errorMessage)
      onError?.(errorMessage)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const reset = () => {
    setError(null)
    setSuccess(false)
    setIsLoading(false)
  }

  return {
    subscribe,
    isLoading,
    error,
    success,
    reset,
  }
}
