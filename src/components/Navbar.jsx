import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({ setSearchTerm, cartCount }) {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="px-4 py-3 mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-3 md:flex-row">

          {/* Logo */}
          <Link to="/" className="text-2xl font-extrabold tracking-tight text-blue-600">
            🎮 GameStore
          </Link>

          {/* Links */}
          <div className="flex gap-6 text-sm font-semibold text-gray-600">
            <Link to="/" className="transition hover:text-blue-600">Home</Link>
            <a href="#" className="transition hover:text-blue-600">Products</a>
            <a href="#" className="transition hover:text-blue-600">Deals</a>
            <a href="#" className="transition hover:text-blue-600">Contact</a>
          </div>

          {/* Search + Cart */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="absolute text-sm text-gray-400 -translate-y-1/2 left-3 top-1/2">🔍</span>
              <input
                type="text"
                placeholder="Search products..."
                onChange={e => setSearchTerm(e.target.value)}
                className="py-2 pr-4 text-sm border border-gray-300 rounded-full pl-9 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent w-52"
              />
            </div>

            <button className="relative p-2">
              <span className="text-2xl">🛒</span>
              {cartCount > 0 && (
                <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full -top-1 -right-1">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>
    </nav>
  )
}
