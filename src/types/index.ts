export interface Restaurant {
    id: string
    name: string
    description: string | null
    cuisine: string[]
    location: string
    address: string
    rating: number | null
    price_level: number
    opening_time: string
    closing_time: string
    first_table_time: string
    images: string[]
    active: boolean
    featured: boolean
  }
  
  export interface Database {
    public: {
      Tables: {
        restaurants: {
          Row: Restaurant
          Insert: Restaurant
          Update: Partial<Restaurant>
        }
      }
    }
  }