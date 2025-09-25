'use client'
import { useEffect } from 'react'
import { fbqTrack, MetaPixelEvents } from '@/utilities/metaPixel'

export function Tracking() {
  useEffect(() => {
    fbqTrack(MetaPixelEvents.DRLeaseLead)
  }, [])

  return null
}
