// src/app/restaurants/[id]/booking/page.tsx
'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { format, addDays } from 'date-fns'

// Generate time slots between 5 PM and 9 PM
const TIME_SLOTS = Array.from({ length: 9 }, (_, i) => {
  const hour = Math.floor(i / 2) + 17
  const minutes = i % 2 === 0 ? '00' : '30'
  return `${hour}:${minutes}`
})

interface BookingFormData {
  date: string
  time: string
  guests: string
  notes: string
}

export default function BookingPage() {
  const params = useParams()
  const restaurantId = params.id as string
  const [formData, setFormData] = useState<BookingFormData>({
    date: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
    time: '',
    guests: '2',
    notes: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Booking submitted:', { restaurantId, ...formData })
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="card bg-base-100 shadow-xl max-w-2xl mx-auto">
        <div className="card-body">
          <h2 className="card-title">Make a Reservation</h2>
          
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

            <div className="form-control">
              <label className="label">
                <span className="label-text">Time</span>
              </label>
              <select 
                className="select select-bordered w-full"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
              >
                <option value="">Select a time</option>
                {TIME_SLOTS.map((time) => (
                  <option key={time} value={time}>
                    {format(new Date(`2024-01-01T${time}`), 'h:mm aa')}
                  </option>
                ))}
              </select>
            </div>

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
        </div>
      </div>
    </div>
  )
}