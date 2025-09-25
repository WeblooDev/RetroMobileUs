'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

interface LabeledCheckboxProps {
  id: string
  label: string
  checked: boolean
  onChange: (val: boolean) => void
  disabled?: boolean
}

export function LabeledCheckbox({ id, label, checked, onChange, disabled }: LabeledCheckboxProps) {
  return (
    <div className="flex items-center gap-1 lg:gap-2">
      <Checkbox
        disabled={disabled}
        id={id}
        checked={checked}
        onCheckedChange={(val) => onChange(val === true)}
        className="text-sm font-inter"
      />
      <Label htmlFor={id} className="text-white text-sm font-inter">
        {label}
      </Label>
    </div>
  )
}
