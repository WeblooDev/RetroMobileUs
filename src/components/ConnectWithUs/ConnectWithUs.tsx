'use client'

import Image from 'next/image'
import { Mail, MapPin } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface ConnectWithUsProps {
  title?: string
  titleClassName?: string
  className?: string
  cardClassName?: string
  variant?: 'card' | 'plain' | 'dark'
}

export default function ConnectWithUs({
  title = 'Connect with us',
  titleClassName = 'text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-light mb-8',
  className = '',
  cardClassName = '',
  variant = 'card',
}: ConnectWithUsProps) {
  const handleEmail = () => {
    window.open('mailto:drleasing@dupontregistry.com', '_self')
  }

  const handleLocation = () => {
    const address = '5972 NE 4th Ave, Miami, FL 33137'
    const encodedAddress = encodeURIComponent(address)
    window.open(`https://maps.google.com?q=${encodedAddress}`, '_blank')
  }

  const message =
    "Hi! I'm interested in learning more about your car leasing options. Could you please provide me with more details?"

  const phoneNumberLink = '4155182273'

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumberLink}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  const content = (
    <div className={`space-y-4 ${className}`}>
      <h2 className={titleClassName}>{title}</h2>

      <div className="space-y-4">
        {/* WhatsApp Button */}
        <button
          className="flex items-center gap-4 w-full p-4 md:p-5 bg-[#25D366] text-white rounded-lg transition-all duration-200 hover:bg-[#22C55E] hover:shadow-lg"
          onClick={handleWhatsAppClick}
        >
          <Image
            src="/WhatsApp.svg"
            alt="WhatsApp"
            width={24}
            height={24}
            className="w-6 h-6 object-contain"
          />
          <span className="text-base md:text-lg font-medium">Call/Text Us</span>
        </button>

        {/* Email Button */}
        <button
          className="flex items-center gap-4 w-full p-4 md:p-5 bg-[#1A1A33] text-white rounded-lg transition-all duration-200 hover:bg-[#2A2A44] hover:shadow-lg"
          onClick={handleEmail}
        >
          <Mail className="w-6 h-6" />
          <span className="text-base md:text-lg font-medium">Email Us</span>
        </button>

        {/* Location Button */}
        <button
          className="flex items-center gap-4 w-full p-4 md:p-5 bg-[#4A5568] text-white rounded-lg transition-all duration-200 hover:bg-[#2D3748] hover:shadow-lg"
          onClick={handleLocation}
        >
          <MapPin className="w-6 h-6" />
          <span className="text-base md:text-lg font-medium">View Location</span>
        </button>

        {/* Address Display */}
        <div className="pt-4 border-t border-white/10 text-center">
          <div className="text-sm md:text-base text-white/90 space-y-1">
            <div>5972 NE 4th Ave</div>
            <div>Miami, FL 33137</div>
          </div>
        </div>
      </div>
    </div>
  )

  if (variant === 'card' || variant === 'dark') {
    return (
      <Card
        className={`${variant === 'card' ? 'bg-transparent border-[#9494C6]' : 'bg-[#121221]'} ${cardClassName}`}
      >
        <CardContent className="p-4 lg:p-6 xl:p-8 2xl:p-10">{content}</CardContent>
      </Card>
    )
  }

  return <div className={className}>{content}</div>
}
