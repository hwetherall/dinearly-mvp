// src/components/restaurants/restaurant-grid.tsx
import type { Restaurant } from '@/types'
import { RestaurantCard } from './restaurant-card'

interface RestaurantGridProps {
  restaurants: Restaurant[]
}

export function RestaurantGrid({ restaurants }: RestaurantGridProps) {
  if (!restaurants.length) {
    return (
      <div className="text-center py-12 text-gray-500">
        No restaurants found matching your criteria.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {restaurants.map((restaurant) => (
        <RestaurantCard 
          key={restaurant.id} 
          restaurant={restaurant}
        />
      ))}
    </div>
  )
}