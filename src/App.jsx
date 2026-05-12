import React, { useState } from 'react'
import Navbar from './components/Navbar'
import ProductCard from './components/ProductCard'
import DiscountBanner from './components/DiscountBanner'

const allProducts = [
  {
    id: 1,
    name: 'RTX 5070 Ti',
    desc: 'Next-gen graphics card with 16GB VRAM & DLSS 4.0',
    price: 150000,
    originalPrice: 200000,
    category: 'Graphics Card',
    badge: 'Hot',
    imageUrl: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500&q=80',
  },
  {
    id: 2,
    name: 'Samsung S25 Ultra',
    desc: 'Flagship phone with 200MP camera & titanium frame',
    price: 280000,
    originalPrice: 320000,
    category: 'Phone',
    badge: 'New',
    imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&q=80',
  },
  {
    id: 3,
    name: 'ROG Gaming Laptop',
    desc: 'Intel i9, 32GB RAM, RTX 4080, 1TB SSD',
    price: 450000,
    originalPrice: 500000,
    category: 'Laptop',
    badge: 'Sale',
    imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&q=80',
  },
  {
    id: 4,
    name: 'Mechanical Keyboard',
    desc: 'Cherry MX Red switches, RGB backlit, aluminum body',
    price: 12000,
    originalPrice: 15000,
    category: 'Accessory',
    badge: '',
    imageUrl: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500&q=80',
  },
  {
    id: 5,
    name: 'Custom Gaming PC',
    desc: 'Full RGB build, i9-13900K, RTX 4090, 64GB DDR5',
    price: 900000,
    originalPrice: 1000000,
    category: 'PC',
    badge: 'Hot',
    imageUrl: 'https://images.unsplash.com/photo-1593640408182-31c228816256?w=500&q=80',
  },
  {
    id: 6,
    name: 'Gaming Headset',
    desc: '7.1 Surround Sound, noise-cancelling mic, 40hr battery',
    price: 18000,
    originalPrice: 22000,
    category: 'Accessory',
    badge: '',
    imageUrl: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&q=80',
  },
]

const categories = ['All', 'Graphics Card', 'Phone', 'Laptop', 'PC', 'Accessory']

export default function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [cartCount, setCartCount] = useState(0)

  const filtered = allProducts.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchCat = activeCategory === 'All' || p.category === activeCategory
    return matchSearch && matchCat
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        setSearchTerm={setSearchTerm}
        cartCount={cartCount}
      />

      <main className="px-4 py-8 mx-auto max-w-7xl">
        <DiscountBanner />

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-400 hover:text-blue-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Heading */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            🔥 Featured Products
          </h2>
          <span className="text-sm text-gray-500">{filtered.length} products found</span>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center text-gray-400">
            <p className="mb-4 text-5xl">🔍</p>
            <p className="text-xl">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => setCartCount(c => c + 1)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
