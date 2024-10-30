// src/components/booking/booking-form.tsx
'use client'

import { useState } from 'react'
import { format, addDays } from 'date-fns'
import { TimeSlotPicker } from './time-slot-picker'

interface BookingFormData {
  date: string
  time: string
  guests: string
  notes: string
}

export function BookingForm() {
  const [formData, setFormData] = useState<BookingFormData>({
    date: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
    time: '',
    guests: '2',
    notes: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Booking submitted:', formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Date</span>
        </label>
        <input
          type="date"
          className="input input-bordered w-full"
          min={format(addDays(new Date(), 1), 'yyyy-MM-dd')}
          max={format(addDays(new Date(), 30), 'yyyy-MM-dd')}
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />
      </div>

      <TimeSlotPicker
        value={formData.time}
        onChange={(time) => setFormData({ ...formData, time })}
        defaultValue="Select a time"
      />

      <div className="form-control">
        <label className="label">
          <span className="label-text">Number of Guests</span>
        </label>
        <select
          className="select select-bordered w-full"
          value={formData.guests}
          onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
          required
        >
          {[1, 2, 3, 4].map((num) => (
            <option key={num} value={num.toString()}>
              {num} {num === 1 ? 'person' : 'people'}
            </option>
          ))}
        </select>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Special Requests</span>
        </label>
        <textarea
          className="textarea textarea-bordered h-24"
          placeholder="Any dietary requirements or special requests?"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        />
      </div>

      <button type="submit" className="btn btn-primary w-full">
        Book Table
      </button>
    </form>
  )
}