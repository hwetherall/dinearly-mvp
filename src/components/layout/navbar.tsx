'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Navbar() {
  const pathname = usePathname()
  
  return (
    <nav className="bg-base-100 border-b">
      <div className="container mx-auto px-4">
        <div className="navbar min-h-16">
          <div className="navbar-start">
            <Link href="/" className="text-xl font-bold">
              Dinearly
            </Link>
          </div>
          
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link 
                  href="/restaurants"
                  className={pathname === '/restaurants' ? 'active' : ''}
                >
                  Restaurants
                </Link>
              </li>
              <li>
                <Link 
                  href="/how-it-works"
                  className={pathname === '/how-it-works' ? 'active' : ''}
                >
                  How It Works
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="navbar-end">
            <Link href="/auth" className="btn btn-primary">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
