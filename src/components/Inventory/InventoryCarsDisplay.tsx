import { Car } from '@/payload-types'
import React from 'react'
import InventoryCarCard from './InventoryCarCard'
import InventoryPagination from './InventoryPagination'
import { InventoryEmptyResult } from './InventoryEmptyResult'

interface InventoryCarsDisplayProps {
  cars: Car[]
  currentPage: number
  totalPages: number
  handlePrevPage: () => void
  handleNextPage: () => void
}

const InventoryCarsDisplay: React.FC<InventoryCarsDisplayProps> = ({
  cars,
  currentPage,
  totalPages,
  handlePrevPage,
  handleNextPage,
}) => {
  const noCarsAvailable = cars.length === 0

  return (
    <div className="flex flex-col justify-center w-full mb-8 gap-2 lg:gap-4">
      {noCarsAvailable ? (
        <InventoryEmptyResult />
      ) : (
        <div className="h-full w-full flex flex-col gap-2 lg:gap-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 2xl:gap-6 ultrawide:gap-8">
            {cars.map((car) => (
              <InventoryCarCard key={car.id} car={car} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <InventoryPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => {
                if (page !== currentPage) {
                  if (page > currentPage) handleNextPage()
                  else handlePrevPage()
                }
              }}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default InventoryCarsDisplay
