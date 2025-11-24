import Script from 'next/script'

/**
 * Simple HTML-based test page - exactly as Unity specifies
 * This uses standard HTML approach without React component complexity
 */
export default function SimpleTicketTest() {
  return (
    <>
      <Script
        id="tixpub-simple"
        src="https://admin.unityeventsolutions.com/scripts/tixpub/tpbootstrap.js"
        data-baseurl="admin.unityeventsolutions.com/tix-pub"
        data-css="https://admin.unityeventsolutions.com/content/tixpub/tpbootstrap.css"
        data-eid="RETROMOBILE2026"
        data-cid="5b71ef71-1c1b-428a-bca1-d10c868c56c6"
        strategy="afterInteractive"
      />

      <div className="container mx-auto py-20 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Simple Unity Tickets Test</h1>

        <div className="space-y-6">
          <section className="border p-6 rounded">
            <h2 className="text-2xl font-semibold mb-4">Button Test (as per Unity docs)</h2>
            <input
              type="button"
              value="Buy Tickets"
              className=" px-6 py-3 bg-green-600 text-white rounded cursor-pointer"
            />
          </section>

          <section className="border p-6 rounded">
            <h2 className="text-2xl font-semibold mb-4">Link Test (as per Unity docs)</h2>
            <a className=" px-6 py-3 bg-blue-600 text-white rounded inline-block cursor-pointer">
              Buy Tickets Link
            </a>
          </section>

          <section className="border p-6 rounded">
            <h2 className="text-2xl font-semibold mb-4">Standard Button</h2>
            <button className=" px-6 py-3 bg-purple-600 text-white rounded">
              Standard Button
            </button>
          </section>

          <section className="border p-6 rounded bg-yellow-50">
            <h3 className="font-semibold mb-2">Instructions:</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>Open browser DevTools (F12)</li>
              <li>Go to Console tab</li>
              <li>Click any button above</li>
              <li>Check if popup appears</li>
              <li>Look for any errors in console</li>
            </ol>
          </section>

          <section className="border p-6 rounded bg-blue-50">
            <h3 className="font-semibold mb-2">Debug in Console:</h3>
            <pre className="text-xs bg-gray-800 text-white p-3 rounded overflow-x-auto">
              {`// Run these in console:
window.unity_tixpub
document.getElementById('tixpub-simple')
document.querySelectorAll('.')`}
            </pre>
          </section>
        </div>
      </div>
    </>
  )
}
