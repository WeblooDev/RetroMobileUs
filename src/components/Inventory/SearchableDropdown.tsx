'use client'

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'

interface Option {
  label: string
  value: string
}

interface SearchableDropdownProps {
  placeholder: string
  value: string | null
  onChange: (value: string) => void
  search: string
  setSearch: (val: string) => void
  options: Option[]
  showAllOption?: boolean
  disabled?: boolean
}

export function SearchableDropdown({
  placeholder,
  value,
  onChange,
  search,
  setSearch,
  options,
  showAllOption = false,
  disabled = false,
}: SearchableDropdownProps) {
  return (
    <Select value={value || ''} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className="w-full sm:w-[220px] shadow-lg border-white text-white text-sm bg-transparent">
        <SelectValue placeholder={placeholder} className="text-sm" />
      </SelectTrigger>
      <SelectContent className="bg-white text-black shadow-lg w-full lg:w-80">
        <div className="p-2">
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-2 bg-transparent border py-3 font-inter text-sm"
          />
          {showAllOption && (
            <SelectItem className="font-inter p-3 bg-transparent text-sm" value="all">
              All {placeholder}
            </SelectItem>
          )}
          {options.map((opt) => (
            <SelectItem
              key={opt.value}
              value={opt.value}
              className="font-inter bg-transparent text-sm p-3"
            >
              {opt.label}
            </SelectItem>
          ))}
        </div>
      </SelectContent>
    </Select>
  )
}
