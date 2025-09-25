'use client'
import { CTAButton } from '@/components/Button/CTAButton'
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Phone } from 'lucide-react'

interface JourneyCTAPropsType {
  title: string
  description: string
  buttons: {
    label: string
    href: string
  }[]
  businessPhone?: string // Optional phone number for calling
  businessWhatsApp?: string // Optional WhatsApp number
}

export default function JourneyCTA({
  title,
  description,
  buttons,
  businessPhone = '+17169309710', // Default phone number
  businessWhatsApp = '+14155182273', // Default WhatsApp number (updated)
}: JourneyCTAPropsType) {
  const [showContactModal, setShowContactModal] = useState(false)

  const handleButtonClick = (index: number, href: string) => {
    if (index === 2) setShowContactModal(true)
    else window.location.href = href
  }

  const handleWhatsAppClick = () => {
    const whatsappUrl = `https://wa.me/${businessWhatsApp.replace(/[^\d]/g, '')}`
    window.open(whatsappUrl, '_blank')
    setShowContactModal(false)
  }

  const handleCallClick = () => {
    window.location.href = `tel:${businessPhone}`
    setShowContactModal(false)
  }

  return (
    <>
      <section className="container">
        <div className="flex flex-col gap-6 max-w-4xl px-4 py-10 md:py-16">
          <div className="flex flex-col gap-6">
            <h2 className="text-4xl md:text-6xl font-ivar font-medium">{title}</h2>
            <p className="max-w-md text-sm md:text-base font-inter">{description}</p>
          </div>

          <div className="flex flex-col items-start justify-start sm:flex-row gap-4">
            {buttons.map((button, i) => {
              return (
                <CTAButton
                  href={i === 2 ? '' : button.href}
                  key={i}
                  text={button.label}
                  variant="transparent-light"
                  arrow={i === 0}
                  onclick={i === 2 ? () => handleButtonClick(i, button.href) : undefined}
                />
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Modal using shadcn Dialog */}
      <Dialog open={showContactModal} onOpenChange={setShowContactModal}>
        <DialogContent className=" border border-white text-black p-4 md:p-6 lg:p-8 xl:p-10 2xl:p-12 2xl:px-14 shadow-lg max-w-[90%] md:max-w-lg lg:max-w-3xl bg-[#1b1a33] font-ivar">
          <DialogHeader className=" mb-4 lg:mb-6 2xl:mb-8 flex items-start justify-start font-ivar">
            <DialogTitle className=" text-white text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl max-w-[90%] lg:max-w-full text-start tracking-wide">
              Choose your preferred contact method
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* WhatsApp Option */}
            <Card className="bg-white cursor-pointer">
              <CardContent className="p-0">
                <Button
                  onClick={handleWhatsAppClick}
                  variant="ghost"
                  className="w-full h-auto p-4 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <img
                        src="/WhatsApp.svg"
                        alt="WhatsApp"
                        width={20}
                        height={20}
                        className="flex-shrink-0"
                      />
                    </div>
                    <div className="text-left">
                      <p className=" text-black text-lg xl:text-xl 2xl:text-2xl">
                        Connect via WhatsApp
                      </p>
                    </div>
                  </div>
                  <svg
                    className="w-5 h-5 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Button>
              </CardContent>
            </Card>

            {/* Call Option */}
            <Card className="bg-white cursor-pointer">
              <CardContent className="p-0">
                <Button
                  onClick={handleCallClick}
                  variant="ghost"
                  className="w-full h-auto p-4 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <p className=" text-black text-lg xl:text-xl 2xl:text-2xl">Call Us</p>
                    </div>
                  </div>
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Button>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
