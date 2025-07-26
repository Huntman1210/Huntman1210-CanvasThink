import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MagnifyingGlassIcon, FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline'

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: [0, 500],
    inStock: false
  })
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    searchProducts(query)
  }, [query, filters])

  const searchProducts = async (searchQuery) => {
    if (!searchQuery) return
    
    setLoading(true)
    // Simulate API search
    setTimeout(() => {
      const mockResults = [
        {
          id: 1,
          name: "Mindful Morning Coffee Set",
          category: "mindful-living",
          price: 127,
          image: "/api/placeholder/300/300",
          rating: 4.9,
          reviewCount: 89,
          whyItMatters: "Transform your morning routine into a moment of mindfulness"
        },
        {
          id: 2,
          name: "Artisan Meditation Cushion",
          category: "mindful-living",
          price: 67,
          image: "/api/placeholder/300/300",
          rating: 4.8,
          reviewCount: 156,
          whyItMatters: "Create a dedicated space for inner peace and reflection"
        }
      ]
      
      // Filter results based on search query
      const filteredResults = mockResults.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.includes(searchQuery.toLowerCase()) ||
        product.whyItMatters.toLowerCase().includes(searchQuery.toLowerCase())
      )
      
      setResults(filteredResults)
      setLoading(false)
    }, 800)
  }

  const clearFilters = () => {
    setFilters({
      category: 'all',
      priceRange: [0, 500],
      inStock: false
    })
  }

  if (!query) {
    return (
      <div className="min-h-screen py-8">
        <div className="container-responsive text-center py-16">
          <MagnifyingGlassIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-section mb-4">Search Our Collection</h1>
          <p className="text-secondary">Enter a search term to discover curated products.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8" data-track-section="search-results">
      <div className="container-responsive">
        
        {/* Search Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-section mb-2">
            Search Results for "{query}"
          </h1>
          <p className="text-secondary">
            {loading ? 'Searching...' : `${results.length} result${results.length !== 1 ? 's' : ''} found`}
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="relative max-w-2xl">
            <input
              type="text"
              defaultValue={query}
              placeholder="Search for products, categories, or experiences..."
              className="input-field pl-12 pr-4 text-lg py-4"
              data-search-input
            />
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-secondary" />
          </div>
        </motion.div>

        <div className="flex flex-col desktop:flex-row gap-8">
          
          {/* Filters Sidebar */}
          <motion.div
            className={`desktop:w-64 ${showFilters ? 'block' : 'hidden desktop:block'}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-xl p-6 shadow-subtle sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-primary flex items-center">
                  <FunnelIcon className="w-5 h-5 mr-2" />
                  Filters
                </h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="desktop:hidden text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-primary mb-3">
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                    className="input-field text-sm"
                  >
                    <option value="all">All Categories</option>
                    <option value="mindful-living">Mindful Living</option>
                    <option value="creative-pursuits">Creative Pursuits</option>
                    <option value="sustainable-innovation">Sustainable Innovation</option>
                    <option value="micro-luxury">Micro-Luxury</option>
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-primary mb-3">
                    Price Range
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="number"
                      value={filters.priceRange[0]}
                      onChange={(e) => setFilters(prev => ({ 
                        ...prev, 
                        priceRange: [parseInt(e.target.value), prev.priceRange[1]] 
                      }))}
                      className="input-field text-sm w-20"
                      placeholder="Min"
                    />
                    <span className="text-secondary">to</span>
                    <input
                      type="number"
                      value={filters.priceRange[1]}
                      onChange={(e) => setFilters(prev => ({ 
                        ...prev, 
                        priceRange: [prev.priceRange[0], parseInt(e.target.value)] 
                      }))}
                      className="input-field text-sm w-20"
                      placeholder="Max"
                    />
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={filters.inStock}
                      onChange={(e) => setFilters(prev => ({ ...prev, inStock: e.target.checked }))}
                      className="w-4 h-4 text-accent"
                    />
                    <span className="text-sm text-primary">In stock only</span>
                  </label>
                </div>

                {/* Clear Filters */}
                <button
                  onClick={clearFilters}
                  className="text-accent hover:text-blue-600 text-sm font-medium"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          </motion.div>

          {/* Results */}
          <div className="flex-1">
            
            {/* Mobile Filter Toggle */}
            <div className="desktop:hidden mb-6">
              <button
                onClick={() => setShowFilters(true)}
                className="btn-secondary px-4 py-2 text-sm rounded-full"
              >
                <FunnelIcon className="w-4 h-4 mr-2 inline" />
                Filters
              </button>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="loading-shimmer w-16 h-16 rounded-full mx-auto mb-4"></div>
                <p className="text-secondary">Searching our curated collection...</p>
              </div>
            ) : results.length === 0 ? (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <MagnifyingGlassIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-primary mb-4">
                  No results found for "{query}"
                </h2>
                <p className="text-secondary mb-8 max-w-md mx-auto">
                  We couldn't find any products matching your search. 
                  Try adjusting your search terms or browse our curated categories.
                </p>
                <div className="space-y-4">
                  <div className="text-sm text-secondary mb-2">Popular searches:</div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {['meditation', 'sustainable', 'artisan', 'mindful', 'creative'].map((term) => (
                      <button
                        key={term}
                        className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm text-secondary transition-colors duration-normal"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="grid-responsive gap-8">
                {results.map((product, index) => (
                  <motion.div
                    key={product.id}
                    className="card-interactive group overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    data-product-id={product.id}
                    data-track-hover={`search-result-${product.id}`}
                  >
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-slow"
                    />
                    
                    <div className="p-6">
                      <div className="mb-2">
                        <span className="text-xs text-accent font-medium uppercase tracking-wide">
                          {product.category.replace('-', ' ')}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-primary mb-3 group-hover:text-accent transition-colors duration-normal">
                        {product.name}
                      </h3>
                      
                      <p className="text-secondary text-sm leading-relaxed mb-4">
                        {product.whyItMatters}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary">
                          ${product.price}
                        </span>
                        
                        <motion.button 
                          className="btn-accent px-4 py-2 text-sm rounded-full"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          View Details
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Search Suggestions */}
        {!loading && results.length > 0 && (
          <motion.div
            className="mt-16 bg-gray-50 rounded-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold text-primary mb-4 text-center">
              Didn't find what you were looking for?
            </h3>
            <p className="text-secondary text-center mb-6 max-w-2xl mx-auto">
              Our AI Concierge can help you discover the perfect product based on your specific needs and preferences.
            </p>
            <div className="text-center">
              <button className="btn-accent px-8 py-3 rounded-full">
                Ask Our Concierge
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default SearchResultsPage
