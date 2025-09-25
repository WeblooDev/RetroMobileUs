import React from 'react'

interface Props {
  title: string
  description: string
  icons?: boolean
}

export const Icons: React.FC = () => {
  return (
    <>
      <div className="flex flex-col items-center">
        <img
          src="/Exclusive Deals.svg"
          alt="Exclusive Deals"
          className="w-8 h-8 xl:w-12 xl:h-12 2xl:w-16 2xl:h-16 mb-2 xl:mb-4 2xl:mb-4"
        />
        <p className="text-white text-xs md:text-sm lg:text-base font-inter uppercase tracking-wider text-center">
          EXCLUSIVE DEALS
        </p>
      </div>
      <div className="flex flex-col items-center">
        <img
          src="/Unlimited Inventory.svg"
          alt="Unlimited Inventory"
          className="w-8 h-8 xl:w-12 xl:h-12 2xl:w-16 2xl:h-16 mb-2 xl:mb-4 2xl:mb-4"
        />
        <p className="text-white text-xs md:text-sm lg:text-base font-inter uppercase tracking-wider text-center">
          UNLIMITED INVENTORY
        </p>
      </div>
      <div className="flex flex-col items-center">
        <img
          src="/Live Support.svg"
          alt="Live Support"
          className="w-8 h-8 xl:w-12 xl:h-12 2xl:w-16 2xl:h-16 mb-2 xl:mb-4 2xl:mb-4"
        />
        <p className="text-white text-xs md:text-sm lg:text-base font-inter uppercase tracking-wider text-center">
          LIVE SUPPORT
        </p>
      </div>
    </>
  )
}

const InventoryHeader: React.FC<Props> = ({ title, description, icons }) => {
  return (
    <div className="text-white flex flex-col justify-center items-center py-4 md:py-6 h-full">
      <div className="flex flex-col md:flex-row  justify-between items-center w-full">
        <div className="w-full md:w-1/2 lg:w-2/4">
          <h1 className=" tracking-wide text-white text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl lg:leading-[50px]">
            {title}
          </h1>
        </div>
        <div className="hidden lg:flex justify-start md:justify-end w-full md:w-1/2 mt-4 md:mt-0">
          {!icons ? (
            <p className="font-inter text-sm xl:text-base 2xl:text-lg text-opacity-90 text-white w-full md:w-[70%] text-left">
              {description}
            </p>
          ) : (
            <div className="flex flex-row space-x-8 lg:space-x-12">
              <Icons />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default InventoryHeader
