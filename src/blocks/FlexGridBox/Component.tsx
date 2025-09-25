import Image from 'next/image'
import Link from 'next/link'

// Define the type for each item in the grid
interface GridItem {
  img?: { url: string; alt: string }
  title: string
  subtitle: string
  flex: number
  link?: string
  textAlign?: 'start' | 'end'
  bgColor?: string
}

// Define the props for the component
interface FlexGridBoxProps {
  matrix: { items: GridItem[] }[]
  className?: string
  gap?: number
}

export default function FlexGridBox({ matrix, className = '', gap = 4 }: FlexGridBoxProps) {
  // Helper function to get the order class based on global item index
  const getOrderClass = (rowIndex: number, colIndex: number) => {
    const globalIndex = rowIndex * 2 + colIndex // Assuming 2 items per row

    // Map: 0(1st)->0, 1(2nd)->1, 2(3rd)->3, 3(4th)->2
    // This gives us order: 1, 2, 4, 3
    switch (globalIndex) {
      case 0:
        return 'order-0' // 1st item
      case 1:
        return 'order-1' // 2nd item
      case 2:
        return 'order-3' // 3rd item (show 4th)
      case 3:
        return 'order-2' // 4th item (show 3rd)
      default:
        return `order-${globalIndex}`
    }
  }

  return (
    <section className="container mb-8 md:mb-10 lg:mb-12 xl:mb-14 2xl:mb-16 w-full h-full min-h-screen">
      <div
        className={`flex flex-col w-full h-screen ${className}`}
        style={{ gap: `${gap * 0.25}rem` }}
      >
        {matrix.slice(0, 2).map((row, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            className="flex-col flex md:flex-row w-full h-1/2"
            style={{ gap: `${gap * 0.25}rem` }}
          >
            {row?.items?.map((item, colIndex) => (
              <div
                key={`item-${rowIndex}-${colIndex}`}
                className={`flex justify-start relative overflow-hidden h-full bg-[${item?.bgColor}] ${getOrderClass(rowIndex, colIndex)} md:order-none`}
                style={{ flex: item.flex }}
              >
                {item?.img && (
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={item.img?.url || '/placeholder.svg'}
                      alt={item.img.alt || 'placeholder image'}
                      fill
                      quality={100}
                      className="object-cover"
                    />
                    {/* Dark overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/20"></div>
                  </div>
                )}

                <div
                  className={`relative z-10 p-4 md:p-8 lg:p-12 xl:p-16 2xl:p-20 h-full flex flex-col justify-end text-black  ${item.flex === 1 ? 'w-full bg-white' : 'w-[auto] md:w-[60%] text-white'}`}
                >
                  <h3 className=" text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-light mb-4 md:mb-6 lg:mb-8">
                    {item.title}
                  </h3>
                  <p className="font-inter text-sm md:text-base lg:text-lg  opacity-90">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
