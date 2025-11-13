'use client'

import { useEffect } from 'react'

/**
 * Alternative approach: Load Unity script AFTER buttons are rendered
 * This ensures buttons exist before Unity tries to bind to them
 */
export function UnityTicketsScriptDelayed() {
  useEffect(() => {
    // Wait longer to ensure all React components are mounted
    const timer = setTimeout(() => {
      const existingScript = document.getElementById('tixpub-embed-delayed')
      if (existingScript) {
        console.log('Delayed Unity script already loaded')
        return
      }

      console.log('Loading Unity script AFTER buttons are rendered...')

      const script = document.createElement('script')
      script.id = 'tixpub-embed-delayed'
      script.src = 'https://admin.unityeventsolutions.com/scripts/tixpub/tpbootstrap.js'
      script.setAttribute('data-baseurl', 'admin.unityeventsolutions.com/tix-pub')
      script.setAttribute(
        'data-css',
        'https://admin.unityeventsolutions.com/content/tixpub/tpbootstrap.css',
      )
      script.setAttribute('data-eid', 'RETROMOBILE2026')
      script.setAttribute('data-cid', '5b71ef71-1c1b-428a-bca1-d10c868c56c6')

      script.onload = () => {
        console.log('✅ Unity script loaded AFTER buttons rendered')

        setTimeout(() => {
          const buttons = document.querySelectorAll('.tixpub-buytix')
          const firstBtn = buttons[0]
          console.log(`Found ${buttons.length} buttons`)
          console.log('First button onclick:', firstBtn ? (firstBtn as any).onclick : 'none')

          const unityTixpub = (window as any).unity_tixpub
          if (unityTixpub) {
            console.log('unity_tixpub available:', Object.keys(unityTixpub))
          }
        }, 1000)
      }

      document.body.appendChild(script)
    }, 2000) // Wait 2 seconds for React to fully render

    return () => clearTimeout(timer)
  }, [])

  return null
}
