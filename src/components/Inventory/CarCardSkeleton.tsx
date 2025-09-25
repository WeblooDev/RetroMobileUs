import React from 'react'

const CarCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col space-y-3 bg-white rounded-xl shadow-2xl animate-pulse p-4 h-[360px]">
      {/* Image Placeholder */}
      <div className="bg-gray-300  rounded-md h-44 w-full" />

      {/* Header Placeholder */}
      <div className="h-5 bg-gray-300  rounded w-2/3" />

      {/* Subheader/Description Placeholder */}
      <div className="h-4 bg-gray-200  rounded w-full" />
      <div className="h-4 bg-gray-200  rounded w-5/6" />
    </div>
  )
}

export default CarCardSkeleton
