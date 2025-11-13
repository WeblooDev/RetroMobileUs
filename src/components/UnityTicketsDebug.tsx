'use client'

import { useEffect, useState } from 'react'

export function UnityTicketsDebug() {
  const [debugInfo, setDebugInfo] = useState<{
    scriptLoaded: boolean
    scriptElement: boolean
    dataAttributes: Record<string, string | null>
    windowTixpub: boolean
    buttonsFound: number
  } | null>(null)

  useEffect(() => {
    const checkInterval = setInterval(() => {
      const script = document.getElementById('tixpub-embed') as HTMLScriptElement
      const buttons = document.querySelectorAll('.tixpub-buytix')

      setDebugInfo({
        scriptLoaded: !!script && script.src.includes('tpbootstrap.js'),
        scriptElement: !!script,
        dataAttributes: {
          'data-eid': script?.getAttribute('data-eid'),
          'data-cid': script?.getAttribute('data-cid'),
          'data-baseurl': script?.getAttribute('data-baseurl'),
          'data-css': script?.getAttribute('data-css'),
        },
        windowTixpub: !!(window as any).tixpub,
        buttonsFound: buttons.length,
      })
    }, 1000)

    return () => clearInterval(checkInterval)
  }, [])

  if (!debugInfo) return null

  return (
    <div className="fixed bottom-4 left-4 z-[999] bg-black/90 text-white p-4 rounded-lg text-xs font-mono max-w-sm">
      <div className="font-bold mb-2">Unity Tickets Debug</div>
      <div className="space-y-1">
        <div className={debugInfo.scriptElement ? 'text-green-400' : 'text-red-400'}>
          Script Element: {debugInfo.scriptElement ? '✓' : '✗'}
        </div>
        <div className={debugInfo.scriptLoaded ? 'text-green-400' : 'text-red-400'}>
          Script Loaded: {debugInfo.scriptLoaded ? '✓' : '✗'}
        </div>
        <div className={debugInfo.windowTixpub ? 'text-green-400' : 'text-yellow-400'}>
          Window.tixpub: {debugInfo.windowTixpub ? '✓' : '✗'}
        </div>
        <div>Buttons Found: {debugInfo.buttonsFound}</div>
        <div className="mt-2 pt-2 border-t border-white/20">
          <div className="text-gray-400">Data Attributes:</div>
          {Object.entries(debugInfo.dataAttributes).map(([key, value]) => (
            <div key={key} className={value ? 'text-green-400' : 'text-red-400'}>
              {key}: {value ? '✓' : '✗'}
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={() => {
          console.log('=== Unity Tickets Debug Info ===')
          console.log('Script Element:', document.getElementById('tixpub-embed'))
          console.log('Window.tixpub:', (window as any).tixpub)
          console.log('Buttons:', document.querySelectorAll('.tixpub-buytix'))
          console.log('================================')
        }}
        className="mt-2 px-2 py-1 bg-white/20 hover:bg-white/30 rounded text-xs w-full"
      >
        Log to Console
      </button>
    </div>
  )
}
