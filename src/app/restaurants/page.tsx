import { Suspense } from "react"
import { supabase } from "@/lib/supabase/client"
import { RestaurantGrid } from '@/components/restaurants/restaurant-grid'
import type { Restaurant } from '@/types'

async function getRestaurants() {
  const { data, error } = await supabase
    .from("restaurants")
    .select("*")
    .eq("active", true)
  
  if (error) {
    console.error("Error fetching restaurants:", error)
    return []
  }

  return data as Restaurant[]
}

export default async function RestaurantsPage() {
  const restaurants = await getRestaurants()

  return (
    <main className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Available Restaurants</h1>
        
        <Suspense fallback={<div>Loading restaurants...</div>}>
          <RestaurantGrid restaurants={restaurants} />
        </Suspense>
      </div>
    </main>
  )
}