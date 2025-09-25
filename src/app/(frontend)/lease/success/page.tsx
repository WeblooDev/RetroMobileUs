import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Media } from '@/components/Media'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Tracking } from './Tracking'
import { generateCanonical } from '@/utilities/generateCanonical'

export const metadata: Metadata = {
  title: 'Lease Success | duPont REGISTRY Luxury Car Leasing',
  description:
    'Thank you for your interest in leasing a vehicle from duPont REGISTRY. Our team will be in touch with you shortly to discuss your lease options.',
  alternates: {
    canonical: generateCanonical('/lease/success'),
  },
  openGraph: {
    title: 'Lease Success | duPont REGISTRY Luxury Car Leasing',
    description:
      'Thank you for your interest in leasing a vehicle from duPont REGISTRY. Our team will be in touch with you shortly to discuss your lease options.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lease Success | duPont REGISTRY Luxury Car Leasing',
    description:
      'Thank you for your interest in leasing a vehicle from duPont REGISTRY. Our team will be in touch with you shortly to discuss your lease options.',
  },
}

export default async function SuccessPage() {
  const payload = await getPayload({ config: configPromise })
  const pageSettings = await payload.find({
    collection: 'page-settings',
    where: {
      page: {
        equals: 'lease-success',
      },
    },
  })

  const settings = pageSettings.docs[0]

  return (
    <div className="relative min-h-[70vh] flex items-center justify-center p-4 md:p-6 lg:p-8 xl:p-10 2xl:p-12">
      <Tracking />
      <div className="absolute inset-0 -z-10">
        <Media
          resource={settings?.background}
          alt="Background"
          fill
          imgClassName="object-cover w-full h-full"
          className="object-cover w-full h-full"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="flex flex-col items-center justify-center text-center gap-6 bg-white w-fit max-w-4xl p-6 md:p-8 lg:p-10 xl:p-12 2xl:p-16 rounded-lg shadow-2xl">
        <h1 className="text-2xl lg:text-3xl  2xl:text-4xl font-ivar text-[#121212]">
          {`Thank You for Your Inquiry!`}
          <br />
          {`We'll get in touch with you as soon as possible.`}
        </h1>
        <Link href={'/'}>
          <button
            type="submit"
            className="relative inline-flex items-center gap-8 px-8 py-3 font-inter transition-all duration-300 overflow-hidden group  bg-[#1A1AE5] text-white rounded"
          >
            {`Back to Home page`}
          </button>
        </Link>
      </div>
    </div>
  )
}
