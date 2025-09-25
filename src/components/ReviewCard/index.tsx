import type { FC } from 'react'
import Image from 'next/image'

// Define the Review interface with all required properties
export interface Review {
  id: string
  text: string
  author: {
    name: string
    location: string
    avatar: string
  }
  date: string
  rating: number
}

interface ReviewCardProps {
  review: Review
}

export const ReviewCard: FC<ReviewCardProps> = ({ review }) => {
  const formattedRating = review.rating.toFixed(1)

  return (
    <div className="max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <p className="mb-6 text-gray-700">{review.text}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-full">
            <Image
              src={review.author.avatar || '/placeholder.svg'}
              alt={`${review.author.name}'s profile picture`}
              fill
              className="object-cover"
            />
          </div>

          <div>
            <h3 className="font-medium text-gray-900">{review.author.name}</h3>
            <div className="text-sm text-gray-500">
              <p>{review.author.location}</p>
              <p>{review.date}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <span className="font-semibold">Review</span>
          <span className="font-bold">{formattedRating}</span>
        </div>
      </div>
    </div>
  )
}
