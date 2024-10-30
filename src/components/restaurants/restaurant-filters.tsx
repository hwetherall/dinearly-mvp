// src/components/restaurants/restaurant-filters.tsx
'use client'

import { useState } from 'react'

interface RestaurantFiltersProps {
  locations: string[]
  cuisines: string[]
}

export function RestaurantFilters({ locations, cuisines }: RestaurantFiltersProps) {
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [selectedCuisine, setSelectedCuisine] = useState('all')

  return (
    <div className="flex flex-wrap gap-4 mb-8">
      <select 
        className="select select-bordered w-full max-w-xs"
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e.target.value)}
      >
        <option value="all">All Locations</option>
        {locations.map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>

      <select 
        className="select select-bordered w-full max-w-xs"
        value={selectedCuisine}
        onChange={(e) => setSelectedCuisine(e.target.value)}
      >
        <option value="all">All Cuisines</option>
        {cuisines.map((cuisine) => (
          <option key={cuisine} value={cuisine}>
            {cuisine}
          </option>
        ))}
      </select>
    </div>
  )
}