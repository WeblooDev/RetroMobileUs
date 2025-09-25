import React from 'react'
import { cn } from '@/utilities/ui'

interface InventoryPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const InventoryPagination: React.FC<InventoryPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const generatePageNumbers = () => {
    const pages: (number | string)[] = []

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 4) pages.push(1, 2, 3, 4, 5, '...', totalPages)
      else if (currentPage >= totalPages - 3) {
        pages.push(
          1,
          '...',
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        )
      } else pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
    }

    return pages
  }

  return (
    <div className="flex items-center justify-center gap-2 lg:gap-4 py-10">
      <button
        className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border border-white text-white hover:bg-white hover:text-black transition"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ←
      </button>

      {generatePageNumbers().map((item, idx) => {
        if (typeof item === 'string') {
          return (
            <div
              key={idx}
              className="w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center text-white text-base"
            >
              ...
            </div>
          )
        }

        const isActive = item === currentPage

        return (
          <button
            key={idx}
            onClick={() => onPageChange(item)}
            className={cn(
              'w-8 h-8 lg:w-10 lg:h-10 rounded-full border text-base',
              isActive
                ? 'bg-white text-black border-white'
                : 'border-white text-white hover:bg-white hover:text-black transition',
            )}
          >
            {item}
          </button>
        )
      })}

      <button
        className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border border-white text-white hover:bg-white hover:text-black transition"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        →
      </button>
    </div>
  )
}

export default InventoryPagination
