'use client'

import { useState } from 'react'
import { useKlaviyoSubscription } from '@/hooks/useKlaviyoSubscription'

interface NewsletterSubscriptionProps {
  variant?: 'mobile' | 'desktop'
  className?: string
}

export function NewsletterSubscription({
  variant = 'desktop',
  className = '',
}: NewsletterSubscriptionProps) {
  const [email, setEmail] = useState('')
  const { subscribe, isLoading, error, success } = useKlaviyoSubscription({
    endpoint: '/api/klaviyo-subscribe',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim()) {
      return
    }

    const result = await subscribe(email.trim())
    if (result) {
      setEmail('') // Clear the form on success
    }
  }

  const isMobile = variant === 'mobile'

  if (success) {
    return (
      <div className={`flex flex-col ${className}`}>
        <div className="bg-gradient-to-r bg-gray-500/10 border border-white/10 rounded-xl p-6 text-center backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <h4 className="text-white font-inter font-semibold text-base mb-1">
                Welcome to our newsletter!
              </h4>
              <p className="text-gray-300 font-inter text-sm">
                You&apos;ll be the first to know about exclusive listings and deals.
              </p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 text-white hover:text-gray-300 font-inter text-xs underline transition-colors"
            >
              Subscribe another email
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col ${className}`}>
      <h3 className="font-inter w-full text-lg md:text-xl lg:text-2xl 2xl:text-3xl font-medium mb-4 text-foreground">
        Subscribe
      </h3>

      {!isMobile && (
        <div className="w-full h-fit flex justify-center items-center pb-4">
          <div className="w-full sm:w-[80%] max-w-[380px] lg:max-w-full md:w-full border-b border-border"></div>
        </div>
      )}

      <p className="font-inter text-sm md:text-[15px] mb-4 text-muted-foreground">
        Be the first to know about new listings!
      </p>

      {error && (
        <div className="bg-red-500/10 dark:bg-red-500/20 border border-red-500/30 dark:border-red-500/40 rounded-lg p-3 mb-4">
          <p className="text-red-600 dark:text-red-400 font-inter text-sm">{error}</p>
        </div>
      )}

      <div className={`flex ${isMobile ? 'flex-row gap-2' : 'flex-col gap-4'} !mt-4 w-full`}>
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          required
          className={`
            font-inter px-4 py-2 w-full rounded-${isMobile ? '[8px]' : 'xl'} 
            border border-input focus:outline-none focus:ring-2 focus:ring-ring 
            bg-background text-foreground placeholder:text-muted-foreground
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        />
        <button
          type="submit"
          disabled={isLoading || !email.trim()}
          className={`
            font-inter px-6 py-${isMobile ? '4' : '2'} bg-primary hover:bg-primary/90 rounded-${isMobile ? '[8px]' : 'xl'} 
            text-primary-foreground transition-colors ${isMobile ? 'text-nowrap' : ''}
            disabled:opacity-50 disabled:cursor-not-allowed
            focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background
          `}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Loading...
            </span>
          ) : isMobile ? (
            'Sign Up'
          ) : (
            'Submit'
          )}
        </button>
      </div>
    </form>
  )
}
