import { fbqTrack, MetaPixelEvents } from '@/utilities/metaPixel'
import React from 'react'

type ButtonSize = 'regular' | 'small'

const WhatsAppButton = ({
  phoneNumber = '4155182273',
  message = "Hi! I'm interested in learning more about your car leasing options. Could you please provide me with more details?",
  size = 'regular',
}: {
  phoneNumber?: string
  message?: string
  size?: ButtonSize
}) => {
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    fbqTrack(MetaPixelEvents.DRLeasewhatsApp)
    window.open(whatsappUrl, '_blank')
  }

  const sizeClasses = {
    regular: 'text-lg px-4 py-2 h-10',
    small: 'text-sm px-3 py-1 h-8',
  }

  return (
    <button
      onClick={handleClick}
      className={`
        inline-flex items-center justify-center gap-2
        bg-[#25D366] text-white rounded
        font-inter ${sizeClasses[size]}
        hover:bg-[#25D366]/80 transition-colors
      `}
    >
      {'WhatsApp'}
      <img
        src="/WhatsApp.svg"
        alt="WhatsApp"
        width={size === 'small' ? 16 : 20}
        height={size === 'small' ? 16 : 20}
        className="flex-shrink-0"
      />
    </button>
  )
}

export default WhatsAppButton
