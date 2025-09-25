'use client'

import { Car } from '@/payload-types'
import { Media } from '../Media'
import { X } from 'lucide-react'
import AvailabilityButton from './AvailabilityButton'
import { CTAButton } from '../Button/CTAButton'
import { useState } from 'react'
import CarRequestForm from './CarRequestForm'

interface SoldCarDetailModalProps {
  car: Car
  onClose: () => void
}

export default function SoldCarDetailModal({ car, onClose }: SoldCarDetailModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)
  const { model, image, availability } = car

  const handleOpenContactForm = () => {
    setShowContactForm(true)
  }

  const handleCloseContactForm = () => {
    setShowContactForm(false)
  }

  const handleSubmitForm = async (formData: any) => {
    setIsSubmitting(true)
    try {
      setShowContactForm(false)
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm font-ivar text-black">
      <div className="flex h-screen w-screen items-center justify-center p-4 sm:p-6 md:p-10 lg:p-12">
        <div className="relative bg-white w-full rounded-lg shadow-2xl overflow-hidden flex flex-col lg:flex-row justify-center items-center">
          {/* Close Button */}
          <button className="absolute top-4 right-4 z-10" onClick={onClose}>
            <X className="w-6 h-6 text-black hover:text-gray-700 transition-colors" />
          </button>

          {/* Image Section */}
          <div className="relative w-full h-full">
            <Media
              resource={image}
              alt={model}
              loading="eager"
              imgClassName="object-cover w-full h-full bg-white"
              className="w-full h-full bg-white"
            />
            <AvailabilityButton availability={availability} />
          </div>

          {/* Content Section */}
          <div className="p-3 sm:p-4 lg:p-6 2xl:p-8 w-full lg:w-2/3 h-full flex flex-col gap-4 justify-between overflow-y-auto">
            <h1 className="text-xl md:text-2xl lg:text-3xl xl:md:text-4xl 2xl:text-5xl">{model}</h1>

            {showContactForm ? (
              <CarRequestForm
                carModel={model || ''}
                onClose={handleCloseContactForm}
                onSubmit={handleSubmitForm}
              />
            ) : (
              <div className="flex flex-col gap-4 lg:gap-6 xl:gap-8 text-base md:text-lg lg:text-xl 2xl:text-2xl">
                <div className="flex flex-col gap-2">
                  <h2>5000 Miles/Yr</h2>
                  <h2>24 Months</h2>
                  <h2>0$ Down</h2>
                  <h2>
                    1st Lease Payment, Transport <br />+ Fee Due @ Signing
                  </h2>
                </div>

                <div className="flex flex-col w-fit gap-2 lg:gap-4 xl:gap-6">
                  <p className="text-sm lg:text-base xl:text-lg 2xl:text-xl text-[#121221]">
                    Like What You See? <br />
                    We May Be Able To Find A Similar Deal!
                  </p>

                  <CTAButton
                    href={''}
                    text={'Submit Request'}
                    variant="dark"
                    arrow={false}
                    className="w-fit"
                    textClassName="text-base lg:text-lg 2xl:text-xl font-inter font-light"
                    onclick={handleOpenContactForm}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
