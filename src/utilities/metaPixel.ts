export enum MetaPixelEvents {
  DRLeaseLead = 'DRLeaseLead',
  DRLeasewhatsApp = 'DRLeasewhatsApp',
}

type FbqPurchaseData = {
  value: number
  currency: string
}

export const fbqTrack = (event: string, data?: FbqPurchaseData) => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', event, data || {})
  } else {
    console.warn('fbq not found')
  }
}
