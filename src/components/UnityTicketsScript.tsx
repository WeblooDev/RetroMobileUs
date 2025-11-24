'use client'

import { useEffect } from 'react'

export function UnityTicketsScript() {
  useEffect(() => {
    // Check if Unity Tickets is already loaded (by any page/component)
    // This prevents conflicts with test pages that load their own script
    if ((window as any).unity_tixpub || document.getElementById('tixpub-embed') || document.getElementById('tixpub-simple')) {
      console.log('Unity Tickets already loaded, skipping duplicate load')
      return
    }

    // Create and configure the script
    const script = document.createElement('script')
    script.id = 'tixpub-embed'
    script.src = 'https://admin.unityeventsolutions.com/scripts/tixpub/tpbootstrap.js'
    script.setAttribute('data-baseurl', 'admin.unityeventsolutions.com/tix-pub')
    script.setAttribute(
      'data-css',
      'https://admin.unityeventsolutions.com/content/tixpub/tpbootstrap.css',
    )
    script.setAttribute('data-eid', 'RETROMOBILE2026')
    script.setAttribute('data-cid', '5b71ef71-1c1b-428a-bca1-d10c868c56c6')
    // Note: Not setting async - let it load synchronously like the original implementation

    // Add load event listener
    script.onload = () => {
      console.log('Unity Tickets script loaded successfully')

      // Check multiple possible global objects
      console.log('Window tixpub:', (window as any).tixpub)
      console.log('Window TixPub:', (window as any).TixPub)
      console.log(
        'Window tixpub keys:',
        Object.keys(window).filter((k) => k.toLowerCase().includes('tix')),
      )

      // Check if buttons are interactive and try to initialize
      setTimeout(() => {
        const buttons = document.querySelectorAll('.')
        console.log(`Found ${buttons.length} tixpub buttons`)
        console.log('First button:', buttons[0])
        console.log('Button click handler:', buttons[0] ? (buttons[0] as any).onclick : 'none')

        // Check the unity_tixpub object
        const unityTixpub = (window as any).unity_tixpub
        console.log('unity_tixpub object:', unityTixpub)

        if (unityTixpub) {
          console.log('unity_tixpub methods:', Object.keys(unityTixpub))
          console.log('unity_tixpub type:', typeof unityTixpub)

          // Try to call init if it exists
          if (typeof unityTixpub.init === 'function') {
            console.log('Calling unity_tixpub.init()')
            unityTixpub.init()
          }

          // Try to call bootstrap if it exists
          if (typeof unityTixpub.bootstrap === 'function') {
            console.log('Calling unity_tixpub.bootstrap()')
            unityTixpub.bootstrap()
          }

          // Try to manually bind buttons if there's a bind method
          if (typeof unityTixpub.bind === 'function') {
            console.log('Calling unity_tixpub.bind()')
            unityTixpub.bind()
          }

          // Try to trigger a custom event that Unity might listen for
          console.log('Dispatching DOMContentLoaded event...')
          window.dispatchEvent(new Event('DOMContentLoaded'))

          // Also try triggering on document
          document.dispatchEvent(new Event('DOMContentLoaded'))

          // Check if buttons now have click handlers after init
          setTimeout(() => {
            const btn = document.querySelector('.')
            console.log('After init - Button click handler:', btn ? (btn as any).onclick : 'none')
          }, 500)
        }
      }, 1000)
    }

    script.onerror = (error) => {
      console.error('Failed to load Unity Tickets script:', error)
    }

    // Append to head
    document.head.appendChild(script)
    console.log('Unity Tickets script injected')

    // Cleanup function
    return () => {
      const scriptToRemove = document.getElementById('tixpub-embed')
      if (scriptToRemove) {
        scriptToRemove.remove()
      }
    }
  }, [])

  return null
}
