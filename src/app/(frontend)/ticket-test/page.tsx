'use client'

import TixpubButton from '@/components/TixpubButton'
import { UnityTicketsDebug } from '@/components/UnityTicketsDebug'
import { UnityTicketsScriptDelayed } from '@/components/UnityTicketsScriptDelayed'

export default function TicketTestPage() {
  return (
    <div className="container py-20">
      <UnityTicketsDebug />
      <UnityTicketsScriptDelayed />
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold mb-8">Unity Tickets Integration Test</h1>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Test Buttons</h2>
          <p className="text-gray-600">Click any button below to test the popup widget:</p>

          <div className="flex flex-wrap gap-4">
            <TixpubButton label="Olive Button" variant="olive" size="ctaBig" />
            <TixpubButton label="Black Button" variant="black" size="md" />
            <TixpubButton label="White Outline" variant="outlineWhite" size="sm" />
          </div>
        </section>

        <section className="space-y-4 border-t pt-8">
          <h2 className="text-2xl font-semibold">Test with Class</h2>
          <p className="text-gray-600">Testing with direct class application:</p>

          <div className="flex flex-wrap gap-4">
            <button
              className="tixpub-buytix px-6 py-3 bg-blue-500 text-white rounded"
              onClick={() => console.log('Button clicked! Checking if Unity intercepts...')}
            >
              Blue Test Button
            </button>

            <a className="tixpub-buytix px-6 py-3 bg-green-500 text-white rounded inline-block cursor-pointer">
              Link Test
            </a>

            <button
              type="button"
              className="tixpub-buytix px-6 py-3 bg-purple-500 text-white rounded"
              onClick={() => console.log('Purple button clicked!')}
            >
              Purple Button
            </button>
          </div>

          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-sm font-semibold mb-2">👆 Click any button above</p>
            <p className="text-sm">
              If popup appears = ✅ Working!
              <br />
              If nothing happens = ❌ Script not initializing
            </p>
          </div>
        </section>

        <section className="space-y-4 border-t pt-8">
          <h2 className="text-2xl font-semibold">Script Check</h2>
          <p className="text-gray-600">Open browser console and check:</p>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
            {`// In browser console, run:
document.getElementById('tixpub-embed')
// Should show the script element

// Check if script loaded:
console.log('Script loaded:', !!document.getElementById('tixpub-embed'))

// Check data attributes:
const script = document.getElementById('tixpub-embed')
console.log('data-eid:', script?.getAttribute('data-eid'))
console.log('data-cid:', script?.getAttribute('data-cid'))
console.log('data-baseurl:', script?.getAttribute('data-baseurl'))

// Check for tixpub global
console.log('window.tixpub:', window.tixpub || 'Not loaded')
`}
          </pre>
        </section>

        <section className="space-y-4 border-t pt-8">
          <h2 className="text-2xl font-semibold">Debug Information</h2>
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded">
            <p className="font-semibold mb-2">Expected Behavior:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Clicking any button should open a popup overlay</li>
              <li>The popup should show the Unity Tickets interface</li>
              <li>No page navigation should occur</li>
              <li>Console should have no errors</li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-4 rounded">
            <p className="font-semibold mb-2">If popup doesn&apos;t appear:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Check browser console for errors</li>
              <li>Verify script is loaded (see Script Check above)</li>
              <li>Make sure you&apos;re not blocking popups</li>
              <li>Try hard refresh (Cmd+Shift+R / Ctrl+Shift+R)</li>
              <li>Check Network tab for failed script loads</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4 border-t pt-8">
          <h2 className="text-2xl font-semibold">Direct Link Test</h2>
          <p className="text-gray-600">As a fallback, test the direct ticket link:</p>
          <a
            href="https://unitytickets.com/se/RETROMOBILE2026/Ticket?utm_source=test&utm_medium=website&utm_campaign=debug"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Open Full Ticket Site
          </a>
        </section>
      </div>
    </div>
  )
}
