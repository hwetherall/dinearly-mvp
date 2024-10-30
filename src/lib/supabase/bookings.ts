// lib/supabase/bookings.ts
import { supabase } from './client'
import type { Booking, BookingFormData } from '@/types'
import { PostgrestSingleResponse } from '@supabase/supabase-js'

export async function createBooking(
  formData: BookingFormData,
  restaurantId: string,
  userId: string
): Promise<{ success: boolean; error?: string; bookingId?: string }> {
  try {
    const bookingData: Omit<Booking, 'id'> = {
      restaurant_id: restaurantId,
      user_id: userId,
      booking_date: formData.date,
      booking_time: formData.time,
      party_size: parseInt(formData.partySize),
      special_requests: formData.specialRequests,
      status: 'pending'
    }

    const { data, error } = await supabase
      .from('bookings')
      .insert([bookingData])
      .select('id')
      .single() as PostgrestSingleResponse<{ id: string }>

    if (error) {
      throw new Error(error.message)
    }

    if (!data) {
      throw new Error('Failed to create booking')
    }

    return {
      success: true,
      bookingId: data.id
    }
  } catch (error) {
    console.error('Error creating booking:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create booking. Please try again.'
    }
  }
}

// Rest of the file remains the same...
// Rest of the file remains the same...


export async function getBooking(bookingId: string) {
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      restaurant:restaurants(*),
      user:profiles(*)
    `)
    .eq('id', bookingId)
    .single()

  if (error) {
    console.error('Error fetching booking:', error)
    return null
  }

  return data
}

export async function updateBookingStatus(
  bookingId: string,
  status: Booking['status']
) {
  const { error } = await supabase
    .from('bookings')
    .update({ status })
    .eq('id', bookingId)

  return { success: !error, error: error?.message }
}

// Helper function to check availability
export async function checkTimeSlotAvailability(
  restaurantId: string,
  date: string,
  time: string
): Promise<boolean> {
  const { data, error } = await supabase
    .from('bookings')
    .select('id')
    .eq('restaurant_id', restaurantId)
    .eq('booking_date', date)
    .eq('booking_time', time)
    .not('status', 'eq', 'cancelled')

  if (error) {
    console.error('Error checking availability:', error)
    return false
  }

  // Assuming each restaurant can only have one booking per time slot
  return !data || data.length === 0
}