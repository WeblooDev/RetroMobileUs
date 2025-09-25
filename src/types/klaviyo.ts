// Klaviyo API Types
export interface KlaviyoSubscriptionRequest {
  email: string
  source?: string
  metadata?: Record<string, string | number | boolean>
}

export interface KlaviyoSubscriptionResponse {
  success: boolean
  message: string
  jobId?: string
  profileId?: string
}

export interface KlaviyoError {
  error: string
}

export interface KlaviyoProfile {
  data: {
    type: 'profile'
    attributes: {
      email: string
      properties?: Record<string, string | number | boolean>
    }
  }
}

export interface KlaviyoEvent {
  data: {
    type: 'event'
    attributes: {
      profile: {
        email: string
      }
      metric: {
        name: string
      }
      properties?: Record<string, string | number | boolean>
      time: string
    }
  }
}

export interface KlaviyoSubscriptionJob {
  data: {
    type: 'profile-subscription-bulk-create-job'
    attributes: {
      list_id: string
      subscriptions: Array<{
        email: string
        subscriptions: Array<{
          list_id: string
        }>
      }>
    }
  }
}

// Hook return types
export interface UseKlaviyoSubscriptionOptions {
  endpoint?: string
  onSuccess?: () => void
  onError?: (error: string) => void
}

export interface UseKlaviyoSubscriptionReturn {
  subscribe: (
    email: string,
    metadata?: Record<string, string | number | boolean>,
  ) => Promise<boolean>
  isLoading: boolean
  error: string | null
  success: boolean
  reset: () => void
}
