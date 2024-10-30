import { RestaurantGrid } from '@/components/restaurants/restaurant-grid'
import { RestaurantFilters } from '@/components/restaurants/restaurant-filters'

export default function RestaurantsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Available Restaurants</h1>
        
        <div className="mb-8">
          <RestaurantFilters locations={[]} cuisines={[]} />
        </div>

        <RestaurantGrid restaurants={[]} />
      </div>
    </main>
  )
}
