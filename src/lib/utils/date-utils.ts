// lib/utils/date-utils.ts
// lib/utils/date-utils.ts
import { format, addDays, isBefore } from 'date-fns'
export const DEFAULT_TIME_SLOTS = [
  '17:00', '17:30', '18:00', '18:30', '19:00', 
  '19:30', '20:00', '20:30', '21:00'
] as const

export function formatTimeSlot(time: string): string {
  return format(new Date(`2024-01-01T${time}`), 'h:mm a')
}

export function getAvailableDates(): { value: string; label: string }[] {
  const dates = []
  const startDate = addDays(new Date(), 1) // Start from tomorrow
  
  for (let i = 0; i < 30; i++) {
    const date = addDays(startDate, i)
    dates.push({
      value: format(date, 'yyyy-MM-dd'),
      label: format(date, 'EEEE, MMMM d')
    })
  }
  
  return dates
}

export function validateBookingDateTime(date: string, time: string): boolean {
  const bookingDate = new Date(`${date}T${time}`)
  const now = new Date()
  
  // Check if booking is in the past
  if (isBefore(bookingDate, now)) {
    return false
  }
  
  // Add any additional validation rules here
  
  return true
}

export function generateTimeSlots(
  baseSlots = DEFAULT_TIME_SLOTS
): { value: string; label: string }[] {
  return baseSlots.map(time => ({
    value: time,
    label: formatTimeSlot(time)
  }))
}