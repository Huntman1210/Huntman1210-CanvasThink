import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MagnifyingGlassIcon, FunnelIcon, SparklesIcon } from '@heroicons/react/24/outline'

const DiscoverPage = ({ featured = false }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: [0, 1000],
    sortBy: 'curated'
  })

  useEffect(() => {
    loadProducts()
  }, [featured, filters])

  const loadProducts = async () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      const mockProducts = [
        {
          id: 1,
          name: "Artisan Coffee Ritual Set",
          category: "mindful-living",
          price: 127,
          image: "/api/placeholder/300/300",
          rating: 4.9,
          reviewCount: 89
        },
        {
          id: 2,
          name: "Creative Writing Collection",
          category: "creative-pursuits", 
          price: 89,
          image: "/api/placeholder/300/300",
          rating: 4.8,
          reviewCount: 67
        }
      ]
      setProducts(mockProducts)
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen py-8" data-track-section="discover">
      <div className="container-responsive">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-section mb-4">
            {featured ? 'Featured' : 'Discover'} Products
            <SparklesIcon className="inline-block w-8 h-8 ml-2 text-gold" />
          </h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            Every product has been carefully curated to meet our highest standards for quality, 
            craftsmanship, and user delight.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="mb-8 p-6 bg-gray-50 rounded-xl">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <FunnelIcon className="w-5 h-5 text-secondary" />
              <span className="text-sm font-medium text-primary">Filters:</span>
            </div>
            
            <select 
              className="input-field py-2 px-3 text-sm"
              value={filters.category}
              onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
            >
              <option value="all">All Categories</option>
              <option value="mindful-living">Mindful Living</option>
              <option value="creative-pursuits">Creative Pursuits</option>
              <option value="sustainable-innovation">Sustainable Innovation</option>
              <option value="micro-luxury">Micro-Luxury</option>
            </select>

            <select 
              className="input-field py-2 px-3 text-sm"
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
            >
              <option value="curated">Curated Selection</option>
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="loading-shimmer w-16 h-16 rounded-full mx-auto mb-4"></div>
            <p className="text-secondary">Curating the perfect selection for you...</p>
          </div>
        ) : (
          <div className="grid-responsive gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                className="card-interactive"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                data-product-id={product.id}
              >
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-primary mb-2">{product.name}</h3>
                  <p className="text-secondary text-sm mb-4">{product.category.replace('-', ' ')}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">${product.price}</span>
                    <button className="btn-accent px-4 py-2 text-sm rounded-full">
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DiscoverPage
