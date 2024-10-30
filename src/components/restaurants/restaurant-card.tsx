'use client'

import Link from 'next/link'
import { Star, MapPin } from 'lucide-react'
import type { Restaurant } from '@/types'

interface RestaurantCardProps {
  restaurant: Restaurant
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const {
    id,
    name,
    description,
    cuisine,
    location,
    rating,
    price_level,
    first_table_time,
    images,
    address
  } = restaurant

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl">
      <figure className="lg:w-48 h-48">
        <img 
          src={images[0] || "/api/placeholder/400/320"}
          alt={name}
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="card-title">
              {name}
            </h2>
            <div className="flex items-center gap-2 text-sm text-base-content/70">
              <MapPin className="w-4 h-4" />
              {location}
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              {cuisine.map((type) => (
                <span key={type} className="badge badge-outline">{type}</span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-warning" />
            <span className="font-semibold">{rating?.toFixed(1) || 'New'}</span>
          </div>
        </div>

        <p className="text-sm text-base-content/70">{description}</p>

        <div className="divider my-2"></div>

        <div className="flex justify-between items-center">
          <div className="text-sm">
            {'$'.repeat(price_level)}
          </div>
          <Link 
            href={`/restaurants/${id}/booking`}
            className="btn btn-primary btn-sm"
          >
            Available at {new Date(`2024-01-01T${first_table_time}`).toLocaleTimeString([], {
              hour: 'numeric',
              minute: '2-digit'
            })}
          </Link>
        </div>
      </div>
    </div>
  )
}