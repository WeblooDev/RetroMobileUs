'use client'
import { useRef, useState, useEffect } from 'react'
import Script from 'next/script'

export interface HubSpotNewFormProps {
  region?: string
  targetId?: string
}

const HubSpotNewForm: React.FC<HubSpotNewFormProps> = ({
  region = 'na1',
  targetId = 'hubspot-new-form-container',
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const observerRef = useRef<MutationObserver | null>(null)
  const checkIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Function to check if the form is visible
  const checkFormLoaded = () => {
    if (containerRef.current) {
      // Look for form elements or HubSpot-specific elements in the container
      const formElements =
        containerRef.current.querySelector('form') ||
        containerRef.current.querySelector('.hs-form') ||
        containerRef.current.querySelector('.hs-submit') ||
        containerRef.current.querySelector('.hsfc-Heading') ||
        containerRef.current.querySelector('.hs-form-frame')

      if (formElements) {
        setIsLoading(false)

        // Clean up all observers and intervals
        if (observerRef.current) {
          observerRef.current.disconnect()
        }

        if (checkIntervalRef.current) {
          clearInterval(checkIntervalRef.current)
        }
      }
    }
  }

  // Create the form
  const createForm = () => {
    if (window.hbspt && containerRef.current) {
      // Create mutation observer to detect when form is added to the DOM
      if (!observerRef.current) {
        observerRef.current = new MutationObserver((mutations) => {
          checkFormLoaded()
        })

        observerRef.current.observe(containerRef.current, {
          childList: true,
          subtree: true,
        })
      }

      // Set a backup interval to check for the form
      if (!checkIntervalRef.current) {
        checkIntervalRef.current = setInterval(checkFormLoaded, 500)
      }

      // Set a timeout to eventually hide the loader after a maximum time
      setTimeout(() => {
        setIsLoading(false)
      }, 7000) // 7 seconds max loading time

      window.hbspt.forms.create({
        portalId: '43898601',
        formId: '9e21cda3-9c9f-41d7-a05a-b5e94b34cd94',
        region,
        target: `#${targetId}`,
        // onFormSubmit: () => {
        //   if (typeof window !== 'undefined' && window.fbq) {
        //     window.fbq('track', 'Lead', { content_name: 'New HubSpot Form' })
        //   }
        // },
      })
    }
  }

  useEffect(() => {
    // Clean up function for the effect
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }

      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current)
      }
    }
  }, [])

  return (
    <div className="w-full h-full">
      <Script
        src="https://js.hsforms.net/forms/embed/v2.js"
        strategy="afterInteractive"
        onReady={createForm}
        onError={() => setIsLoading(false)}
      />
      <div id={targetId} ref={containerRef} className="w-full h-full ">
        {isLoading && (
          <div className="w-full h-full flex-1 flex items-center justify-center  text-xl">
            <div className="flex flex-col items-center justify-center px-4">
              <div className="relative w-24 h-24">
                {/* Outer circle */}
                <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
                {/* Animated spinning gradient border */}
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-indigo-500 animate-spin"></div>
                {/* Inner pulse */}
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 animate-pulse"></div>
              </div>
              <div className="mt-6 text-center">
                <h3 className=" font-semibold text-gray-800">Loading your form</h3>
                <p className=" text-base text-gray-500 mt-1">Please wait a moment...</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HubSpotNewForm
