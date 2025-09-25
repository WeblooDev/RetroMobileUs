import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Media } from '@/components/Media'
import { Car } from '@/payload-types'
import type { Metadata } from 'next'
import { LeaseForm } from '@/components/lease/LeaseForm'
import { generateCanonical } from '@/utilities/generateCanonical'

export const metadata: Metadata = {
  title: 'Start Your Lease | duPont REGISTRY Luxury Car Leasing',
  description:
    'Start your luxury car lease with duPont REGISTRY. Submit your info and let our team match you with the perfect exotic or high-performance vehicle today.',
  alternates: {
    canonical: generateCanonical('/lease'),
  },
  openGraph: {
    title: 'Start Your Lease | duPont REGISTRY Luxury Car Leasing',
    description:
      'Start your luxury car lease with duPont REGISTRY. Submit your info and let our team match you with the perfect exotic or high-performance vehicle today.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Start Your Lease | duPont REGISTRY Luxury Car Leasing',
    description:
      'Start your luxury car lease with duPont REGISTRY. Submit your info and let our team match you with the perfect exotic or high-performance vehicle today.',
  },
}

export default async function LeasePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { car } = await searchParams

  const payload = await getPayload({ config: configPromise })
  const pageSettings = await payload.find({
    collection: 'page-settings',
    where: {
      page: {
        equals: 'lease',
      },
    },
  })

  let carData: Car | undefined = undefined

  if (car) {
    const carSlug = Array.isArray(car) ? car[0] : car

    const carDetails = await payload.find({
      collection: 'cars',
      where: {
        slug: {
          equals: carSlug,
        },
      },
    })

    if (carDetails.docs && carDetails.docs.length > 0) {
      carData = carDetails.docs[0]
    }
  }
  const settings = pageSettings.docs[0]

  return (
    <div className="relative min-h-screen flex items-center">
      {settings?.background && (
        <div className="absolute inset-0 -z-10">
          <Media
            resource={settings.background}
            alt="Background"
            fill
            imgClassName="object-cover w-full h-full"
            className="object-cover w-full h-full"
            priority
            loading="eager"
          />
          {/* <div className="absolute inset-0 bg-black/20" /> */}
        </div>
      )}
      <div className="container flex flex-1 p-4 lg:p-6 2xl:p-8 flex-col lg:flex-row py-4 lg:py-6 2xl:py-8">
        <div className="flex-1 py-4">
          <h1 className="text-4xl md:text-6xl font-ivar text-white w-full">
            Leasing Made Easy -
            <br />
            Begin Your Next Drive
          </h1>
        </div>
        <div className="w-full bg-white lg:w-[60%] 2xl:w-1/2 min-h-[300px]">
          {/* <HubSpotNewForm /> */}
          <LeaseForm initialData={carData} />
        </div>
      </div>
    </div>
  )
}
