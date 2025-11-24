# Unity Tickets Integration

## Overview

This project has been integrated with Unity Tickets to provide two ticketing options:

1. **Full Ticket Site**: Direct links to https://unitytickets.com/se/RETROMOBILE2026/Ticket
2. **Popup Widget**: An embedded popup for quick ticket purchases without leaving the page

Both options are available and can be used depending on the campaign/location.

## Implementation Details

### 1. Scripts Added (src/app/(frontend)/layout.tsx)

#### TixPub Bootstrap Script

The popup widget script that enables the ticket purchasing overlay:

```javascript
<Script
  id="tixpub-embed"
  src="https://admin.unityeventsolutions.com/scripts/tixpub/tpbootstrap.js"
  strategy="afterInteractive"
  data-baseurl="admin.unityeventsolutions.com/tix-pub"
  data-css="https://admin.unityeventsolutions.com/content/tixpub/tpbootstrap.css"
  data-eid="RETROMOBILE2026"
  data-cid="5b71ef71-1c1b-428a-bca1-d10c868c56c6"
/>
```

#### Unity UTM Capture Script

Automatically appends UTM parameters to all links pointing to Unity domains:

- Captures UTM parameters from the URL
- Appends them to links pointing to Unity domains (unitytickets.com, myshowlead.com, etc.)
- Includes a MutationObserver to handle dynamically added content
- Supports campaign tracking across the site

**Tracked Domains:**

- unitytickets.com
- myshowlead.com
- myshowapp.com
- unityeventsolutions.com
- retromobile.us
- retro-mobile-us.vercel.app

### 2. Popup Widget Usage

To trigger the ticket popup, add the `` CSS class to any button, link, or image:

#### Button Example

```jsx
<button className="">Buy Tickets</button>
```

#### Image Example

```jsx
<img src="/ticket_button.jpg" className="" alt="Buy Tickets" />
```

#### Link Example

```jsx
<a className="">Buy Tickets</a>
```

### 3. Components

#### TixpubButton Component (src/components/TixpubButton.tsx)

A reusable button component that automatically includes the `` class:

```jsx
import TixpubButton from '@/components/TixpubButton'
;<TixpubButton
  label="Buy Tickets"
  variant="olive" // or "black" | "outlineWhite"
  size="ctaBig" // or "md" | "sm"
/>
```

**Variants:**

- `olive` - Green background (default)
- `black` - Black background
- `outlineWhite` - Transparent with white outline

**Sizes:**

- `ctaBig` - Large CTA size (default)
- `md` - Medium size
- `sm` - Small size

#### FloatingTicketCTA (src/components/FloatingTicketCTA.tsx)

A floating ticket button that:

- Appears on the right side of the screen
- Auto-expands when user scrolls down
- Always triggers the popup widget
- Provides quick access to ticket purchasing from any page

Used in layout:

```jsx
<FloatingTicketCTA title="TICKETS" />
```

### 4. Usage in Content Blocks

#### TextCTAImageRight Block

Uses the TixpubButton component for ticket CTAs. The button automatically triggers the popup.

#### Other Blocks

For other blocks using `CTAButton` component, you have two options:

**Option 1: Direct Link to Full Ticket Site**

```jsx
<CTAButton href="https://unitytickets.com/se/RETROMOBILE2026/Ticket">Buy Tickets</CTAButton>
```

**Option 2: Trigger Popup**
Add the `` class:

```jsx
<CTAButton className="">Buy Tickets</CTAButton>
```

## UTM Tracking

The site automatically maintains UTM parameters across navigation. You can use these parameters in your ticket links:

### Example URLs with UTM Parameters

**Basic discount code:**

```
https://unitytickets.com/se/RETROMOBILE2026/Ticket?utm_discount=UNITYTEST
```

**Full campaign tracking:**

```
https://unitytickets.com/se/RETROMOBILE2026/Ticket?utm_campaign=demo1&utm_medium=website&utm_source=acme&utm_discount=UNITYTEST
```

**How it works:**

1. User visits your site with UTM parameters
2. The script captures these parameters
3. All links to Unity domains automatically include these parameters
4. The popup widget also inherits these parameters
5. Campaign tracking is maintained throughout the user journey

## Testing

The ticket system is currently in **TEST MODE** and should not be published until approved by Marion (expected live: December 1).

### Built-in Test Page

Visit `/ticket-test` on your site to access the comprehensive test page with:

- Multiple test buttons with different styles
- Real-time debug information panel
- Script loading verification
- Console debugging tools

### Test Links

- Full ticket site: https://unitytickets.com/se/RETROMOBILE2026/Ticket
- Popup test page: https://event-preview.com/retro-ticket-testing/
- Your test page: http://localhost:3000/ticket-test (or your domain)

### Sample Test URLs

```
# With discount code
https://yoursite.com/?utm_discount=UNITYTEST

# With full tracking
https://yoursite.com/?utm_campaign=demo1&utm_medium=website&utm_source=acme&utm_discount=UNITYTEST
```

### Debug Component

For development, you can add the debug component to any page:

```jsx
import { UnityTicketsDebug } from '@/components/UnityTicketsDebug'

// Add to your component
;<UnityTicketsDebug />
```

This will show a debug panel with:

- Script loading status
- Data attributes verification
- Number of buttons found on page
- Console logging capability

## Best Practices

1. **Choose the Right Option:**
   - Use popup () for quick access, especially on landing pages
   - Use full ticket site links for detailed information pages

2. **UTM Parameters:**
   - Always include utm_campaign, utm_medium, and utm_source for tracking
   - Use utm_discount to automatically apply discount codes

3. **Testing:**
   - Test both popup and direct link options
   - Verify UTM parameters are being passed correctly
   - Check on both desktop and mobile devices

## Troubleshooting

### Popup not appearing?

**Quick Steps:**

1. Visit `/ticket-test` on your site to use the built-in test page
2. Check the debug panel (bottom-left) for real-time status
3. Click "Log to Console" button for detailed information
4. Look for errors in browser console (F12)

**Common Issues:**

1. **Script not loaded**
   - Check Network tab for `tpbootstrap.js`
   - Look for 404 or CORS errors
   - Try hard refresh (Cmd+Shift+R / Ctrl+Shift+R)

2. **Data attributes missing**
   - Check the debug panel shows all attributes as ✓
   - Verify in Elements tab: `<script id="tixpub-embed">`
   - Should have data-eid, data-cid, data-baseurl, data-css

3. **window.tixpub not defined**
   - Script loaded but not initialized
   - Check for JavaScript errors preventing initialization
   - May need to wait a moment for script to execute

4. **Button clicks do nothing**
   - Verify element has class ``
   - Check if other JavaScript is preventing click events
   - Try the test buttons on `/ticket-test` page

### Script Loading Issues?

If the Unity Tickets script fails to load:

```javascript
// In browser console, run this to manually check:
const script = document.getElementById('tixpub-embed')
console.log('Script exists:', !!script)
console.log('Script src:', script?.src)
console.log('Data attributes:', {
  eid: script?.getAttribute('data-eid'),
  cid: script?.getAttribute('data-cid'),
  baseurl: script?.getAttribute('data-baseurl'),
})
```

### UTM parameters not being appended?

1. Check that the URL contains UTM parameters
2. Verify the link points to one of the tracked domains
3. Check browser console for any JavaScript errors
4. Try adding `?utm_test=123` to your URL and see if it persists

### Dynamic content not getting UTM parameters?

The MutationObserver should handle this automatically, but if issues persist:

1. Check if the content is added after the page loads
2. Verify the links are using `<a>` tags with `href` attributes
3. Look for JavaScript errors in the console

### Still Not Working?

1. **Clear everything and start fresh:**

   ```bash
   # Clear browser cache and hard reload
   # Or test in incognito/private mode
   ```

2. **Check the client's test page:**
   Visit https://event-preview.com/retro-ticket-testing/ to see if the popup works there

3. **Compare with working example:**
   - If client's test page works but yours doesn't, compare Network tabs
   - Check if there are differences in how the script loads
   - Look for conflicting scripts or CSS

4. **Contact Unity Support:**
   If the integration appears correct but still doesn't work, there may be an issue with:
   - The event ID (RETROMOBILE2026)
   - The client ID (5b71ef71-1c1b-428a-bca1-d10c868c56c6)
   - Unity's server configuration

## Support

For Unity Tickets support or questions about the integration:

- Check the Unity Event Solutions documentation
- Contact Unity support for API or widget issues
- Review the test page examples: https://event-preview.com/retro-ticket-testing/
