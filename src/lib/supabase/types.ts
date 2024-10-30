export interface Restaurant {
    id: string;
    name: string;
    description: string | null;
    cuisine: string[];
    location: string;
    address: string;
    rating: number | null;
    price_level: number;
    opening_time: string;
    closing_time: string;
    first_table_time: string;
    images: string[];
    active: boolean;
    featured: boolean;
  }
  

  export interface Profile {
    id: string;
    email: string;
    full_name: string | null;
    phone: string | null;
    bookings_count: number;
  }
  
  export interface Booking {
    id: string;
    restaurant_id: string;
    user_id: string;
    booking_date: string;
    booking_time: string;
    party_size: number;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    special_requests: string | null;
  }

  export type Database = {
    public: {
      Tables: {
        bookings: {
          Row: {
            id: string
            restaurantId: string
            userId: string
            date: string
            time: string
            partySize: number
            specialRequests: string | null
            status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
            created_at: string
          }
          Insert: Omit<Database['public']['Tables']['bookings']['Row'], 'id' | 'created_at'>
          Update: Partial<Database['public']['Tables']['bookings']['Insert']>
        }
      }
    }
  }
  