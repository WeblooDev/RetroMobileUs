# Quick Start - Testing Unity Tickets Integration

## 🚀 What's Been Fixed

The Unity Tickets integration has been **completely rewritten** with a more reliable approach:

1. **Changed script loading method** - Now using a client-side React component instead of Next.js Script tag to ensure proper data attribute handling
2. **Added comprehensive debugging tools** - Real-time status panel and test page
3. **Enhanced UTM tracking** - Better handling of dynamic content with MutationObserver
4. **Created test infrastructure** - Dedicated test page with multiple test scenarios

## 🧪 How to Test

### Step 1: Start Your Development Server

```bash
npm run dev
# or
pnpm dev
```

### Step 2: Visit the Test Page

Navigate to: **http://localhost:3000/ticket-test**

### Step 3: Check the Debug Panel

You should see a **black debug panel in the bottom-left corner** showing:

- ✓ Script Element: Should be green checkmark
- ✓ Script Loaded: Should be green checkmark
- ✓ Window.tixpub: Should be green (may take a moment)
- Buttons Found: Should show number of buttons on page
- Data Attributes: All should show green checkmarks

### Step 4: Click Any Button

Try clicking any of the test buttons:

- "Olive Button"
- "Black Button"
- "White Outline"
- Or any of the colored test buttons

**Expected Result:** A popup overlay should appear with the Unity Tickets interface.

## ❌ If It's Still Not Working

### Check #1: Browser Console

1. Press `F12` or `Cmd+Option+I` (Mac) / `Ctrl+Shift+I` (Windows)
2. Go to **Console** tab
3. Look for any red errors
4. You should see: `"Unity Tickets script loaded successfully"`

### Check #2: Network Tab

1. In DevTools, go to **Network** tab
2. Refresh the page
3. Search for `tpbootstrap.js`
4. Should show status `200` (success)
5. If you see `404` or `CORS error`, the Unity server may be down or blocking

### Check #3: Script Element

In the Console tab, run:

```javascript
document.getElementById('tixpub-embed')
```

Should return the script element with all data attributes.

### Check #4: Compare with Unity's Test Page

Visit: https://event-preview.com/retro-ticket-testing/

- Does the popup work there?
- If YES: Compare network requests to find differences
- If NO: Unity's test system might be down

## 🔧 What Changed Technically

### Before (Didn't Work):

```jsx
<Script src="..." data-eid="..." data-cid="..." />
```

**Problem:** Next.js Script component doesn't properly pass custom data attributes

### After (Should Work):

```jsx
// Client component that programmatically creates script
<UnityTicketsScript />
```

**Solution:** Uses `useEffect` to create and configure the script element with proper attributes

## 📂 New Files Created

1. **`src/components/UnityTicketsScript.tsx`** - Main script loader
2. **`src/components/UnityTicketsDebug.tsx`** - Debug panel component
3. **`src/app/(frontend)/ticket-test/page.tsx`** - Test page
4. **`UNITY_TICKETS_INTEGRATION.md`** - Full documentation
5. **`QUICK_START_TESTING.md`** - This file

## 🐛 Common Issues & Solutions

### Issue: Debug panel shows "Script Element: ✗"

**Solution:** The UnityTicketsScript component isn't rendering. Check browser console for React errors.

### Issue: Debug panel shows "Script Loaded: ✗"

**Solution:** Script element exists but src is wrong. Check network errors.

### Issue: Debug panel shows "Window.tixpub: ✗"

**Solution:** Script loaded but didn't initialize. Could be:

- Script is still loading (wait a moment)
- JavaScript error prevented initialization
- Wrong data attributes (check they all show ✓)

### Issue: Buttons found shows 0

**Solution:** No elements with `tixpub-buytix` class on page. The test page should show many buttons.

### Issue: Clicking does nothing

**Solution:**

- Check if `window.tixpub` exists (debug panel)
- Look for JavaScript errors in console
- Verify element actually has the `tixpub-buytix` class (inspect element)
- Try on the `/ticket-test` page first

## 📞 Next Steps

### If Test Page Works ✅

Great! The integration is working. Now:

1. Remove the debug panel from production (it's only on test page)
2. Test on actual pages with ticket CTAs
3. Test UTM parameter tracking
4. Test on mobile devices

### If Test Page Doesn't Work ❌

Please check:

1. **Browser Console Errors** - Screenshot and share any errors
2. **Network Tab** - Screenshot the `tpbootstrap.js` request
3. **Debug Panel** - Screenshot what shows as ✓ or ✗
4. **Unity's Test Page** - Does https://event-preview.com/retro-ticket-testing/ work for you?

With this information, we can diagnose the specific issue.

## 💡 Pro Tips

1. **Use the debug panel** - It updates in real-time, no need to refresh
2. **Check Unity's test page first** - If that doesn't work, it's likely a Unity server issue
3. **Try incognito mode** - Rules out browser extension conflicts
4. **Check on multiple browsers** - Chrome, Firefox, Safari
5. **Look at the console immediately** - Errors appear right when script loads

## 📊 Success Criteria

✅ Debug panel shows all green checkmarks  
✅ Clicking button opens popup overlay  
✅ Popup shows Unity Tickets booking interface  
✅ Can navigate through ticket selection  
✅ Works on mobile and desktop  
✅ UTM parameters are preserved

Good luck! 🎉
