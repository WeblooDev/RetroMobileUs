'use client'
import { Button } from '@/components/ui/button'
import { Car, Brand, Media as MediaType } from '@/payload-types'
import { Media } from './Media'
import WhatsAppButton from './Button/WhatsAppButton'
import ConnectWithUs from './ConnectWithUs/ConnectWithUs'
import { useRouter } from 'next/navigation'
import { formatCarPrice } from '@/utilities/priceDisplay'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { useState } from 'react'

interface CarDetailPageProps {
  car: Car
}

export default function CarDetailPage({ car }: CarDetailPageProps) {
  const router = useRouter()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null)

  const handleLeaseNow = () => {
    router.push(`/lease?car=${car?.slug}`)
  }

  const getBrandName = () => {
    if (car?.brand && typeof car.brand === 'object' && car.brand !== null) {
      return (car.brand as Brand).name
    }
    return ''
  }

  const getAllImages = () => {
    const images: { image: MediaType | string; alt?: string }[] = []

    if (car?.image) {
      images.push({
        image: car.image,
        alt: car?.model,
      })
    }

    if (car?.images && car.images.length > 0) {
      car.images.forEach((imgItem) => {
        if (imgItem?.image) {
          images.push({
            image: imgItem.image,
            alt: imgItem.alt || car?.model,
          })
        }
      })
    }

    return images
  }

  const allImages = getAllImages()

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index)
    carouselApi?.scrollTo(index)
  }

  const DetailRow = ({ label, value }: { label: string; value: string | number }) => (
    <div className="flex justify-between items-center py-3 px-4 bg-gray-900/50 rounded-lg border border-gray-700/50">
      <span className="text-gray-300 font-medium">{label}:</span>
      <span className="font-semibold">{value}</span>
    </div>
  )

  const NoteItem = ({ text }: { text: string }) => (
    <div className="flex items-center space-x-2">
      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
      <span className="text-sm text-gray-400">{text}</span>
    </div>
  )

  return (
    <div className="flex flex-col gap-4 md:gap-6 lg:gap-8 xl:gap-10 2xl:gap-12 container py-4 md:py-6 lg:py-8 xl:py-10 2xl:py-16 text-white font-ivar">
      <div className="grid lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 xl:gap-10 2xl:gap-12 items-start">
        <div className="relative lg:col-span-2">
          {allImages.length > 0 ? (
            <div className="space-y-4">
              <Carousel
                className="w-full"
                setApi={(api) => {
                  setCarouselApi(api)
                  api?.on('select', () => {
                    setCurrentImageIndex(api.selectedScrollSnap())
                  })
                }}
                opts={{
                  loop: true,
                  align: 'center',
                }}
              >
                <CarouselContent>
                  {allImages.map((imageItem, index) => (
                    <CarouselItem key={index}>
                      <div className="relative aspect-video">
                        <Media
                          resource={imageItem.image}
                          alt={imageItem.alt || car?.model}
                          className="w-full h-full object-cover rounded-lg shadow-2xl"
                        />
                        {/* Image counter */}
                        {allImages.length > 1 && (
                          <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                            {currentImageIndex + 1} / {allImages.length}
                          </div>
                        )}
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {allImages.length > 1 && (
                  <>
                    <CarouselPrevious className="left-4 bg-black/50 border-gray-600 text-white hover:bg-black/70 hover:text-white" />
                    <CarouselNext className="right-4 bg-black/50 border-gray-600 text-white hover:bg-black/70 hover:text-white" />
                  </>
                )}
              </Carousel>

              {allImages.length > 1 && (
                <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                  {allImages.map((imageItem, index) => (
                    <button
                      key={index}
                      onClick={() => handleThumbnailClick(index)}
                      className={`relative aspect-video rounded-md overflow-hidden border-2 transition-colors ${
                        index === currentImageIndex
                          ? 'border-blue-500'
                          : 'border-gray-600 hover:border-gray-400'
                      }`}
                    >
                      <Media
                        resource={imageItem.image}
                        alt={imageItem.alt || car?.model}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              <p className="mt-3 px-2 text-xs md:text-sm text-gray-400 font-inter leading-relaxed text-center">
                Images for illustration purposes only. Actual vehicle may differ. Inquire for real
                photos.
              </p>
            </div>
          ) : (
            <div className="relative aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
              <p className="text-gray-400">No images available</p>
            </div>
          )}
        </div>

        <div className="flex flex-col items-start gap-4 md:gap-6 lg:gap-8 xl:gap-10 2xl:gap-12 w-full h-full lg:col-span-1">
          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-light tracking-wide">
            Lease the {[car?.year, getBrandName(), car?.model].filter(Boolean).join(' ')}
          </h1>
          <div className="space-y-2 text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">
            <h2>{formatCarPrice(car)}</h2>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              onClick={handleLeaseNow}
              className="font-inter bg-[#1a1ae5] text-white p-4 rounded hover:bg-[#1515c7] h-10 text-lg"
            >
              Lease Now
            </Button>
            <WhatsAppButton />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 lg:gap-6 xl:gap-8 2xl:gap-12 ">
        <div className="lg:col-span-2 space-y-6">
          <div className="mt-0 lg:mt-4 xl:mt-6 2xl:mt-8">
            <h2 className="text-2xl font-light mb-6">Details</h2>
            <div className="space-y-3 text-base lg:text-lg xl:text-xl 2xl:text-2xl">
              <DetailRow
                label="Make"
                value={
                  car?.brand && typeof car.brand === 'object' && car.brand !== null
                    ? (car.brand as Brand).name
                    : 'N/A'
                }
              />

              <DetailRow label="Model" value={car?.model || 'N/A'} />

              <DetailRow label="Trim" value={car?.trim || 'N/A'} />

              <DetailRow label="MSRP" value={car?.msrp ? `$${car.msrp.toLocaleString()}` : 'N/A'} />

              {/* Conditional rendering based on lease type */}
              {car.leaseType === 'single-pay' ? (
                <>
                  <DetailRow label="Lease Type" value="Single-Pay Lease" />
                  <DetailRow
                    label="Total Payment"
                    value={
                      car.hidePrice
                        ? 'Contact for Price'
                        : car.onePayAmount && car.onePayAmount > 0
                          ? `$${car.onePayAmount.toLocaleString()}`
                          : '$0'
                    }
                  />
                </>
              ) : (
                <>
                  <DetailRow
                    label="Annual Mileage"
                    value={
                      car?.annualMileage ? `${car.annualMileage.toLocaleString()} miles` : 'N/A'
                    }
                  />
                  <DetailRow label="Term" value={car?.term ? `${car.term} months` : 'N/A'} />
                  <DetailRow
                    label="Down Payment"
                    value={
                      car.hidePrice
                        ? 'Contact for Price'
                        : car.downPayment && car.downPayment > 0
                          ? `$${car.downPayment.toLocaleString()}`
                          : '$0'
                    }
                  />
                </>
              )}

              <div className="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-700/30">
                <h3 className="text-gray-300 font-medium mb-3">Notes:</h3>
                <div className="space-y-2">
                  {car?.notes && car.notes.length > 0 ? (
                    car.notes.map((noteItem, index) => (
                      <NoteItem key={index} text={noteItem.note} />
                    ))
                  ) : (
                    <>
                      {car.leaseType === 'single-pay' ? (
                        <>
                          <NoteItem text="Single payment due at lease signing" />
                          <NoteItem text="No additional monthly payments required" />
                          <NoteItem text="Tax, tag, license and all other applicable fees not included unless specified" />
                          <NoteItem text="Subject to credit approval through designated leasing institution" />
                          <NoteItem text="Limited Availability" />
                          <NoteItem text="Please inquire for full lease details" />
                        </>
                      ) : (
                        <>
                          <NoteItem text="Payments subject to tier 1 approval through designated leasing institution" />
                          <NoteItem text="More/Less lease mileage available (will affect payment)" />
                          <NoteItem text="Lower/higher lease terms available (will affect payment)" />
                          <NoteItem text="Tax, tag, license and all other applicable titling and registration fees not included" />
                          <NoteItem text="Limited Availability" />
                          <NoteItem text="Please inquire for full lease details" />
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 xl:col-span-1 w-full">
          <ConnectWithUs />
        </div>
      </div>
    </div>
  )
}
