import { useState } from 'react'
import { motion } from 'framer-motion'
import { HeartIcon, ShoppingBagIcon, TrashIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Artisan Tea Ceremony Kit",
      price: 156,
      image: "/api/placeholder/300/300",
      category: "mindful-living",
      inStock: true,
      priceChanged: false
    },
    {
      id: 2,
      name: "Sustainable Notebook Collection",
      price: 67,
      originalPrice: 78,
      image: "/api/placeholder/300/300", 
      category: "sustainable-innovation",
      inStock: true,
      priceChanged: true
    }
  ])

  const removeFromWishlist = (id) => {
    setWishlistItems(items => items.filter(item => item.id !== id))
  }

  const addToCart = (item) => {
    console.log('Adding to cart:', item)
    // Add to cart logic here
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen py-8">
        <div className="container-responsive text-center py-16">
          <HeartIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-section mb-4">Your Wishlist is Empty</h1>
          <p className="text-secondary mb-8">Save products you love for later consideration.</p>
          <button className="btn-accent px-8 py-3 rounded-full">
            Discover Products
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8" data-track-section="wishlist">
      <div className="container-responsive">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-section mb-2 flex items-center">
            <HeartSolidIcon className="w-8 h-8 mr-3 text-red-500" />
            My Wishlist
          </h1>
          <p className="text-secondary">{wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} saved for later</p>
        </motion.div>

        <div className="grid-responsive gap-8">
          {wishlistItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="card-interactive group overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              data-product-id={item.id}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-slow"
                />
                
                {/* Remove from wishlist button */}
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-subtle hover:bg-white transition-all duration-fast hover:scale-110"
                >
                  <TrashIcon className="w-5 h-5 text-gray-600" />
                </button>

                {/* Price change notification */}
                {item.priceChanged && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-success text-white text-xs px-2 py-1 rounded-full font-medium">
                      Price Drop!
                    </span>
                  </div>
                )}

                {/* Stock status */}
                <div className="absolute bottom-4 left-4">
                  <span className={`text-white text-xs px-2 py-1 rounded-full font-medium backdrop-blur-sm ${
                    item.inStock ? 'bg-success/90' : 'bg-error/90'
                  }`}>
                    {item.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-2">
                  <span className="text-xs text-accent font-medium uppercase tracking-wide">
                    {item.category.replace('-', ' ')}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-primary mb-4 group-hover:text-accent transition-colors duration-normal">
                  {item.name}
                </h3>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-primary">
                      ${item.price}
                    </span>
                    {item.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        ${item.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => addToCart(item)}
                    disabled={!item.inStock}
                    className={`flex-1 py-3 rounded-full font-semibold transition-all duration-normal ${
                      item.inStock 
                        ? 'btn-primary hover-lift' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingBagIcon className="w-5 h-5 mr-2 inline" />
                    {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>

                {item.priceChanged && (
                  <div className="mt-4 p-3 bg-success/10 rounded-lg">
                    <p className="text-success text-sm font-medium">
                      Great news! The price dropped by ${item.originalPrice - item.price}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Wishlist Actions */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-gray-50 rounded-2xl p-8">
            <h2 className="text-xl font-semibold text-primary mb-4">
              Share Your Wishlist
            </h2>
            <p className="text-secondary mb-6 max-w-2xl mx-auto">
              Let friends and family know what you're hoping to add to your collection. 
              Perfect for gifts and special occasions.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="btn-secondary px-6 py-3 rounded-full">
                Generate Share Link
              </button>
              <button className="btn-accent px-6 py-3 rounded-full">
                Add All to Cart
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default WishlistPage
