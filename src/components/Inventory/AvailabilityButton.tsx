interface AvailabilityButtonProps {
  availability: 'available' | 'sold' | 'new_arrival' | 'best_deal'
}

const AvailabilityButton: React.FC<AvailabilityButtonProps> = ({ availability }) => {
  if (availability === 'available') return null

  const bgColor =
    availability === 'best_deal'
      ? 'bg-[#1A1AE5]'
      : availability === 'sold'
        ? 'bg-red-600'
        : 'bg-black'

  return (
    <div
      className={`absolute top-4 left-4 z-20 ${bgColor} text-white text-xs shadow-lg tracking-widest font-light font-inter py-2 px-4 uppercase`}
    >
      {availability.replace('_', ' ')}
    </div>
  )
}

export default AvailabilityButton
