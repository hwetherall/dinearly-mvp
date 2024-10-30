// src/components/booking/time-slot-picker.tsx
'use client'

import { format } from 'date-fns'

interface TimeSlotPickerProps {
  value: string
  onChange: (time: string) => void
  defaultValue?: string
  className?: string
}

const TIME_SLOTS = Array.from({ length: 9 }, (_, i) => {
  const hour = Math.floor(i / 2) + 17
  const minutes = i % 2 === 0 ? '00' : '30'
  return `${hour}:${minutes}`
})

export function TimeSlotPicker({ 
  value, 
  onChange, 
  defaultValue,
  className = '' 
}: TimeSlotPickerProps) {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">Select Time</span>
      </label>
      <select 
        className={`select select-bordered w-full ${className}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
      >
        <option value="">{defaultValue || 'Choose a time'}</option>
        {TIME_SLOTS.map((time) => (
          <option key={time} value={time}>
            {format(new Date(`2024-01-01T${time}`), 'h:mm aa')}
          </option>
        ))}
      </select>
    </div>
  )
}