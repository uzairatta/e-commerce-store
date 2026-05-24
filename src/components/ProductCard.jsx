import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard({ product, onAddToCart }) {
  const { _id, id, name, desc, price, originalPrice, badge, imageUrl, category } = product
  const productId = _id || id
  const [hovered, setHovered] = useState(false)
  const [added, setAdded] = useState(false)

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0

  const handleCart = () => {
    onAddToCart()
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div
      className="overflow-hidden transition-all duration-300 bg-white shadow-md rounded-2xl hover:shadow-xl group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-100 h-52">
        <img
          src={imageUrl}
          alt={name}
          className={`w-full h-full object-cover transition-transform duration-500 ${hovered ? 'scale-110' : 'scale-100'}`}
        />

        {/* Quick View overlay */}
        <div className={`absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
          <Link
            to={`/product/${productId}`}
            className="px-5 py-2 text-sm font-semibold text-gray-800 transition bg-white rounded-full hover:bg-blue-600 hover:text-white"
          >
            Quick View
          </Link>
        </div>

        {/* Badges */}
        {badge && (
          <span className="absolute px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full top-3 left-3">
            {badge}
          </span>
        )}
        {discount > 0 && (
          <span className="absolute px-2 py-1 text-xs font-bold text-white bg-green-500 rounded-full top-3 right-3">
            -{discount}%
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="mb-1 text-xs font-semibold tracking-wider text-blue-600 uppercase">{category}</p>
        <h3 className="mb-1 text-lg font-bold text-gray-800 truncate">{name}</h3>
        <p className="mb-3 text-sm text-gray-500 line-clamp-2">{desc}</p>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-bold text-blue-600">
            {price.toLocaleString()} PKR
          </span>
          {originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              {originalPrice.toLocaleString()} PKR
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Link
            to={`/product/${productId}`}
            className="flex-1 py-2 text-sm font-semibold text-center text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            View Details
          </Link>
          <button
            onClick={handleCart}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
              added
                ? 'bg-green-100 text-green-700 border border-green-300'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {added ? '✓' : '🛒'}
          </button>
        </div>
      </div>
    </div>
  )
}
