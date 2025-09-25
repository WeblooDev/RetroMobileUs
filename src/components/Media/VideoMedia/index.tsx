'use client'

import { cn } from '@/utilities/ui'
import React, { useEffect, useRef } from 'react'
import type { Props as MediaProps } from '../types'

export const VideoMedia: React.FC<MediaProps> = ({ onClick, resource, videoClassName }) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const { current: video } = videoRef
    if (video) {
      video.addEventListener('suspend', () => {})
    }
  }, [])

  if (resource && typeof resource === 'object') {
    const { url } = resource
    const cacheTag = resource.updatedAt

    return (
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          onClick={onClick}
          ref={videoRef}
          className={cn(
            'w-full h-full object-cover',
            'absolute top-0 left-0',
            'min-w-full min-h-full',
            videoClassName,
          )}
        >
          <source src={`${url}?${cacheTag}`} />
        </video>
      </div>
    )
  }

  return null
}
