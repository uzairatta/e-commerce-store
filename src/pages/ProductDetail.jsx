import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const API_URL = "https://ecommerce-backend-production-eebf.up.railway.app"

const fallbackProducts = [
  {
    id: 1,
    name: 'RTX 5070 Ti',
    desc: 'Next-gen graphics card with 16GB VRAM & DLSS 4.0. Experience 4K gaming at ultra settings with ray tracing enabled.',
    price: 150000,
    originalPrice: 200000,
    category: 'Graphics Card',
    badge: 'Hot',
    imageUrl: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500&q=80',
    specs: ['16GB GDDR7 VRAM', 'DLSS 4.0 Support', 'Ray Tracing Cores', '4K @ 144fps Gaming'],
  },
  {
    id: 2,
    name: 'Samsung S25 Ultra',
    desc: 'Flagship phone with 200MP camera and titanium frame. The most powerful Galaxy ever made.',
    price: 280000,
    originalPrice: 320000,
    category: 'Phone',
    badge: 'New',
    imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&q=80',
    specs: ['200MP Main Camera', '12GB RAM', 'Snapdragon 8 Elite', '5000mAh Battery'],
  },
  {
    id: 3,
    name: 'ROG Gaming Laptop',
    desc: 'Intel i9, 32GB RAM, RTX 4080 — built for hardcore gamers who demand the best.',
    price: 450000,
    originalPrice: 500000,
    category: 'Laptop',
    badge: 'Sale',
    imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&q=80',
    specs: ['Intel i9-13900H', '32GB DDR5 RAM', 'RTX 4080 16GB', '1TB NVMe SSD'],
  },
  {
    id: 4,
    name: 'Mechanical Keyboard',
    desc: 'Cherry MX Red switches, per-key RGB backlit, full aluminum body with wrist rest.',
    price: 12000,
    originalPrice: 15000,
    category: 'Accessory',
    badge: '',
    imageUrl: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500&q=80',
    specs: ['Cherry MX Red Switches', 'Per-Key RGB', 'Aluminum Body', 'Anti-Ghosting'],
  },
  {
    id: 5,
    name: 'Custom Gaming PC',
    desc: 'Full RGB build with i9-13900K and RTX 4090. The ultimate gaming machine.',
    price: 900000,
    originalPrice: 1000000,
    category: 'PC',
    badge: 'Hot',
    imageUrl: 'https://images.unsplash.com/photo-1593640408182-31c228816256?w=500&q=80',
    specs: ['Intel i9-13900K', 'RTX 4090 24GB', '64GB DDR5 RAM', '4TB NVMe SSD'],
  },
  {
    id: 6,
    name: 'Gaming Headset',
    desc: '7.1 Surround Sound with noise-cancelling mic — hear every footstep.',
    price: 18000,
    originalPrice: 22000,
    category: 'Accessory',
    badge: '',
    imageUrl: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&q=80',
    specs: ['7.1 Surround Sound', 'Noise-Cancelling Mic', '40hr Battery', 'Bluetooth 5.3'],
  },
]

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [added, setAdded] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Try fetching from backend first
    fetch(`${API_URL}/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data && data._id) {
          setProduct(data)
        } else {
          // fallback to hardcoded
          const found = fallbackProducts.find(
            p => p.id === parseInt(id) || p._id === id
          )
          setProduct(found || null)
        }
        setLoading(false)
      })
      .catch(() => {
        const found = fallbackProducts.find(
          p => p.id === parseInt(id) || p._id === id
        )
        setProduct(found || null)
        setLoading(false)
      })
  }, [id])

  const discount = product?.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar setSearchTerm={() => {}} cartCount={0} />
        <div className="flex items-center justify-center py-32">
          <p className="text-xl text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar setSearchTerm={() => {}} cartCount={0} />
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <p className="mb-4 text-6xl">😕</p>
          <h1 className="mb-4 text-2xl font-bold text-gray-700">Product Not Found</h1>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            ← Back to Store
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar setSearchTerm={() => {}} cartCount={cartCount} />
      <div className="max-w-5xl px-4 py-10 mx-auto">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 mb-8 font-semibold text-blue-600 transition hover:text-blue-800"
        >
          ← Back to Store
        </button>

        <div className="overflow-hidden bg-white shadow-lg rounded-2xl md:flex">
          {/* Image */}
          <div className="relative overflow-hidden bg-gray-100 md:w-1/2 h-72 md:h-auto">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="object-cover w-full h-full"
            />
            {product.badge && (
              <span className="absolute px-3 py-1 text-xs font-bold text-white bg-red-500 rounded-full top-4 left-4">
                {product.badge}
              </span>
            )}
            {discount > 0 && (
              <span className="absolute px-3 py-1 text-xs font-bold text-white bg-green-500 rounded-full top-4 right-4">
                -{discount}%
              </span>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-between p-8 md:w-1/2">
            <div>
              <p className="mb-2 text-xs font-semibold tracking-widest text-blue-600 uppercase">{product.category}</p>
              <h1 className="mb-3 text-3xl font-extrabold text-gray-800">{product.name}</h1>
              <p className="mb-6 text-base leading-relaxed text-gray-500">{product.desc}</p>

              {product.specs && (
                <div className="mb-6">
                  <h3 className="mb-2 font-bold text-gray-700">Specifications</h3>
                  <ul className="space-y-1">
                    {product.specs.map((spec, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="font-bold text-green-500">✓</span> {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Price + Buttons */}
            <div className="pt-6 border-t">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl font-extrabold text-blue-600">
                  {product.price.toLocaleString()} PKR
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-400 line-through">
                    {product.originalPrice.toLocaleString()} PKR
                  </span>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setCartCount(c => c + 1)
                    setAdded(true)
                    setTimeout(() => setAdded(false), 1500)
                  }}
                  className={`flex-1 py-3 rounded-xl font-bold text-sm transition ${
                    added
                      ? 'bg-green-100 text-green-700 border border-green-400'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {added ? '✓ Added to Cart!' : '🛒 Add to Cart'}
                </button>
                <button className="flex-1 py-3 text-sm font-bold text-white transition bg-gray-800 rounded-xl hover:bg-gray-900">
                  ⚡ Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
