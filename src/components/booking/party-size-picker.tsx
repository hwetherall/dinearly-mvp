// components/booking/party-size-picker.tsx
'use client'

import { Users } from 'lucide-react'

interface PartySizePickerProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

export function PartySizePicker({ value, onChange, className = '' }: PartySizePickerProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="flex items-center gap-2 text-sm font-medium">
        <Users className="w-4 h-4" />
        Party Size
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        required
      >
        {[1, 2, 3, 4].map((size) => (
          <option key={size} value={size}>
            {size} {size === 1 ? 'person' : 'people'}
          </option>
        ))}
      </select>
    </div>
  )
}