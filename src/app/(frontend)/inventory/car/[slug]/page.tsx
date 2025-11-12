import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Metadata } from 'next'
import CarDetailPage from '@/components/CarDetailsPage'
import { generateCanonical } from '@/utilities/generateCanonical'

// Dynamic SEO metadata for the car detail page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string }>
}): Promise<Metadata> {
  const payload = await getPayload({ config })
  const { slug } = await params

  const { docs: cars } = await payload.find({
    collection: 'cars',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })

  const car = cars[0]
  if (!car || !car.slug) {
    return {
      title: 'Car Not Found | Retromobile',
      description: 'Explore top luxury car brands available for lease.',
    }
  }

  // Get brand name
  const brandName = typeof car.brand === 'object' && car.brand?.name ? car.brand.name : 'Luxury'

  const priceText = car.hidePrice ? 'Contact for Price' : `$${car.price.toLocaleString()}/mo`
  const metaTitle = `${car.year} ${brandName} ${car.model} - Lease from ${priceText} | Retromobile`
  const metaDescription = car.hidePrice
    ? `Lease the ${car.year} ${brandName} ${car.model} with exclusive specials at Retromobile. Contact for pricing. Apply now!`
    : `Lease the ${car.year} ${brandName} ${car.model} starting at ${priceText} with exclusive specials at Retromobile. Apply now!`

  const image =
    typeof car.image === 'string'
      ? car.image
      : typeof car.image?.url === 'string'
        ? car.image?.url
        : undefined

  // Generate canonical URL for this car page
  const canonicalUrl = generateCanonical(`/inventory/car/${slug}`)

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      images: [
        {
          url: image || '/car.png',
          alt: `${car.year} ${brandName} ${car.model} Hero Image`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
    },
  }
}

// Page component
export default async function Page({ params }: { params: Promise<{ slug?: string }> }) {
  const payload = await getPayload({ config })
  const { slug } = await params

  const { docs: cars } = await payload.find({
    collection: 'cars',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })

  const car = cars[0]

  if (!car || !car.slug) notFound()

  return (
    <div className="flex flex-col">
      <div className="container mx-auto">
        <CarDetailPage car={car} />
      </div>
    </div>
  )
}

// export const dynamic = 'force-static'

// // This function generates all possible slugs during build :)
// export async function generateStaticParams() {
//   const payload = await getPayload({ config })

//   const { docs: cars } = await payload.find({
//     collection: 'cars',
//     limit: 1000,
//   })

//   return cars.map((car) => ({
//     slug: car.slug,
//   }))
// }
