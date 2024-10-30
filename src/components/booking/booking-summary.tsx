// components/booking/booking-summary.tsx
'use client'

import { format } from 'date-fns'
import { Restaurant } from '@/types'
import { formatTimeSlot } from '@/lib/utils/date-utils'

interface BookingSummaryProps {
  restaurant: Restaurant
  date: string
  time: string
  partySize: string
  specialRequests?: string
}

export function BookingSummary({ 
  restaurant,
  date,
  time,
  partySize,
  specialRequests 
}: BookingSummaryProps) {
  const isFirstTable = time === restaurant.first_table_time
  const formattedDate = format(new Date(date), 'EEEE, MMMM d, yyyy')
  const formattedTime = formatTimeSlot(time)

  return (
    <div className="bg-gray-50 rounded-lg p-4 space-y-4">
      <h3 className="font-semibold text-lg">Booking Summary</h3>
      
      <div className="space-y-2">
        <p className="text-sm">
          <span className="font-medium">Restaurant:</span> {restaurant.name}
        </p>
        <p className="text-sm">
          <span className="font-medium">Date:</span> {formattedDate}
        </p>
        <p className="text-sm">
          <span className="font-medium">Time:</span> {formattedTime}
          {isFirstTable && (
            <span className="ml-2 text-green-600 font-medium">
              (First Table - 50% off food)
            </span>
          )}
        </p>
        <p className="text-sm">
          <span className="font-medium">Party Size:</span> {partySize} {parseInt(partySize) === 1 ? 'person' : 'people'}
        </p>
        {specialRequests && (
          <div className="text-sm">
            <span className="font-medium">Special Requests:</span>
            <p className="mt-1 text-gray-600">{specialRequests}</p>
          </div>
        )}
      </div>

      {isFirstTable && (
        <div className="bg-green-50 text-green-700 p-3 rounded-md text-sm mt-4">
          First Table booking includes 50% off food for your entire party.
          Regular-priced drinks and exceptional service included!
        </div>
      )}
    </div>
  )
}