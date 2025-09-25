'use client'

import { Select, SelectTrigger, SelectValue, SelectContent } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'

interface PriceRangeDropdownProps {
  value: [number, number]
  onChange: (value: [number, number]) => void
  open: boolean
  setOpen: (open: boolean) => void
  format: (price: number) => string
  parse: (value: string) => number
  onApply?: () => void
  disabled?: boolean
}

export function PriceRangeDropdown({
  value,
  onChange,
  open,
  setOpen,
  format,
  parse,
  onApply,
  disabled,
}: PriceRangeDropdownProps) {
  const [min, max] = value

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange([parse(e.target.value), max])
  }

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange([min, parse(e.target.value)])
  }

  return (
    <Select open={open} onOpenChange={setOpen} disabled={disabled}>
      <SelectTrigger className="w-full sm:w-[220px] shadow-lg border-white  bg-transparent text-sm">
        <SelectValue className="text-sm" placeholder={`Shop by price`} />
      </SelectTrigger>
      <SelectContent className="w-full lg:w-80 shadow-lg bg-white text-black font-inter">
        <div className="flex flex-col p-2 lg:p-4 gap-4">
          <div className="flex flex-col lg:flex-row gap-1 lg:gap-2 justify-center items-center text-sm">
            <div className="flex flex-col w-full">
              <span>Min</span>
              <Input
                type="text"
                value={format(min)}
                onChange={handleMinChange}
                className="w-full bg-transparent border border-black text-sm"
              />
            </div>
            <div className="flex flex-col w-full">
              <span>Max</span>
              <Input
                type="text"
                value={format(max)}
                onChange={handleMaxChange}
                className="w-full bg-transparent border border-black text-sm"
              />
            </div>
          </div>
          <div className="flex justify-end w-full">
            <button
              className="px-4 py-2 bg-[#1A1AE5] text-white rounded text-sm"
              onClick={() => {
                onApply?.()
                setOpen(false)
              }}
            >
              Apply
            </button>
          </div>
        </div>
      </SelectContent>
    </Select>
  )
}
