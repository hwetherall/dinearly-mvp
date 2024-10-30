// types/booking.ts
export interface BookingFormData {
    date: string;
    time: string;
    partySize: string;
    specialRequests: string;
  }
  
  export interface BookingSubmission extends Omit<BookingFormData, 'partySize'> {
    restaurantId: string;
    userId: string;
    partySize: number;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  }
  
  export interface TimeSlot {
    value: string;
    label: string;
    available: boolean;
  }
  
  export interface ValidationError {
    message: string;
    field?: keyof BookingFormData;
  }