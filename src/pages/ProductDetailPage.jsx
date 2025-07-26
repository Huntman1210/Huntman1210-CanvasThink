import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  HeartIcon, 
  ShoppingBagIcon, 
  StarIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  TruckIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'

const ProductDetailPage = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('story')

  useEffect(() => {
    loadProduct(id)
  }, [id])

  const loadProduct = async (productId) => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      const mockProduct = {
        id: productId,
        name: "Handcrafted Mindfulness Set",
        category: "mindful-living",
        price: 127,
        originalPrice: 159,
        images: [
          "/api/placeholder/600/600",
          "/api/placeholder/600/600",
          "/api/placeholder/600/600"
        ],
        rating: 4.9,
        reviewCount: 147,
        description: "Transform your daily rituals into moments of pure presence and joy with this carefully curated mindfulness collection.",
        whyItMatters: "In our fast-paced world, finding moments of peace and mindfulness has become essential for mental well-being. This set provides everything you need to create your own sanctuary of calm.",
        story: "Crafted in partnership with Maya Chen Studio, each piece in this collection represents decades of expertise in creating objects that facilitate mindfulness and presence. Maya's journey began in a small pottery studio in Kyoto, where she learned the ancient art of creating vessels that hold not just tea, but intention.",
        specifications: {
          materials: "Organic bamboo, hand-thrown ceramic, natural cotton",
          dimensions: "Various sizes optimized for different rituals",
          weight: "2.3 lbs total",
          care: "Hand wash ceramic pieces, spot clean textile items"
        },
        sustainability: {
          carbonNeutral: true,
          ethicallySourced: true,
          sustainableMaterials: true,
          localArtisan: true
        },
        artisan: {
          name: "Maya Chen Studio",
          location: "Portland, Oregon",
          story: "Founded in 2018, Maya Chen Studio specializes in mindful living products that bridge Eastern philosophy with Western design sensibilities.",
          photo: "/api/placeholder/200/200"
        },
        provenance: {
          materials: "Bamboo sourced from certified sustainable farms in Oregon",
          production: "Hand-crafted in Maya's Portland studio using traditional techniques",
          shipping: "Carbon-neutral shipping via certified green logistics partner"
        }
      }
      setProduct(mockProduct)
      setLoading(false)
    }, 1000)
  }

  const handleAddToCart = () => {
    // Track purchase intent
    window.dispatchEvent(new CustomEvent('canvasthink:behavioral-interaction', {
      detail: {
        type: 'purchase_intent',
        productId: product.id,
        action: 'add_to_cart',
        quantity: selectedQuantity
      }
    }))
    
    // Add to cart logic here
    console.log('Added to cart:', { product: product.id, quantity: selectedQuantity })
  }

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted)
    
    // Track wishlist interaction
    window.dispatchEvent(new CustomEvent('canvasthink:behavioral-interaction', {
      detail: {
        type: 'wishlist_toggle',
        productId: product.id,
        action: isWishlisted ? 'remove' : 'add'
      }
    }))
  }

  if (loading) {
    return (
      <div className="min-h-screen py-8">
        <div className="container-responsive">
          <div className="text-center py-16">
            <div className="loading-shimmer w-16 h-16 rounded-full mx-auto mb-4"></div>
            <p className="text-secondary">Loading product details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen py-8">
        <div className="container-responsive text-center py-16">
          <h1 className="text-section mb-4">Product Not Found</h1>
          <p className="text-secondary">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'story', name: 'The Story Behind', icon: HeartIcon },
    { id: 'specs', name: 'Specifications', icon: ShieldCheckIcon },
    { id: 'sustainability', name: 'Sustainability', icon: GlobeAltIcon },
    { id: 'shipping', name: 'Shipping', icon: TruckIcon }
  ]

  return (
    <div className="min-h-screen py-8" data-track-section="product-detail">
      <div className="container-responsive">
        
        {/* Product Header */}
        <div className="grid desktop:grid-cols-2 gap-12 mb-16">
          
          {/* Product Images */}
          <div className="space-y-4">
            <motion.div
              className="aspect-square rounded-xl overflow-hidden shadow-subtle"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src={product.images[0]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            <div className="grid grid-cols-3 gap-4">
              {product.images.slice(1).map((image, index) => (
                <div key={index} className="aspect-square rounded-lg overflow-hidden shadow-subtle cursor-pointer hover:shadow-enhanced transition-shadow duration-normal">
                  <img 
                    src={image} 
                    alt={`${product.name} ${index + 2}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm text-accent font-medium uppercase tracking-wide">
                  {product.category.replace('-', ' ')}
                </span>
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm text-secondary">Ethically Curated</span>
              </div>
              
              <h1 className="text-hero mb-4">{product.name}</h1>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) 
                          ? 'text-gold fill-current' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-secondary">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              <p className="text-xl text-secondary leading-relaxed mb-6">
                {product.whyItMatters}
              </p>
            </div>

            {/* Pricing */}
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-4xl font-bold text-primary">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through">
                  ${product.originalPrice}
                </span>
              )}
              {product.originalPrice && (
                <span className="bg-success text-white text-sm px-2 py-1 rounded-full font-medium">
                  Save ${product.originalPrice - product.price}
                </span>
              )}
            </div>

            {/* Purchase Controls */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-primary">Quantity:</label>
                <select 
                  value={selectedQuantity}
                  onChange={(e) => setSelectedQuantity(parseInt(e.target.value))}
                  className="input-field py-2 px-3 w-20"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="btn-primary flex-1 py-3 rounded-full text-lg font-semibold hover-lift"
                  data-track-hover="add-to-cart"
                >
                  <ShoppingBagIcon className="w-5 h-5 mr-2 inline" />
                  Add to Cart
                </button>
                
                <button
                  onClick={handleWishlistToggle}
                  className="btn-secondary px-6 py-3 rounded-full hover-lift"
                  data-track-hover="wishlist-toggle"
                >
                  {isWishlisted ? (
                    <HeartSolidIcon className="w-6 h-6 text-red-500" />
                  ) : (
                    <HeartIcon className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <ShieldCheckIcon className="w-5 h-5 text-success" />
                <span className="text-sm text-secondary">Experience Guarantee</span>
              </div>
              <div className="flex items-center space-x-2">
                <TruckIcon className="w-5 h-5 text-accent" />
                <span className="text-sm text-secondary">Free Carbon-Neutral Shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <GlobeAltIcon className="w-5 h-5 text-gold" />
                <span className="text-sm text-secondary">Ethically Sourced</span>
              </div>
              <div className="flex items-center space-x-2">
                <HeartIcon className="w-5 h-5 text-pink-500" />
                <span className="text-sm text-secondary">Artisan Made</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-16">
          <div className="border-b border-gray-200 mb-8">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium transition-colors duration-normal ${
                    activeTab === tab.id
                      ? 'border-accent text-accent'
                      : 'border-transparent text-secondary hover:text-primary'
                  }`}
                >
                  <tab.icon className="w-5 h-5 mr-2 inline" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="prose prose-lg max-w-none"
          >
            {activeTab === 'story' && (
              <div className="space-y-6">
                <p className="text-lg leading-relaxed text-secondary">
                  {product.story}
                </p>
                
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-primary mb-4">Meet the Artisan</h3>
                  <div className="flex items-start space-x-4">
                    <img 
                      src={product.artisan.photo} 
                      alt={product.artisan.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-primary">{product.artisan.name}</h4>
                      <p className="text-sm text-secondary mb-2">{product.artisan.location}</p>
                      <p className="text-secondary">{product.artisan.story}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div>
                <h3 className="text-xl font-semibold text-primary mb-4">Product Specifications</h3>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="border-b border-gray-200 pb-2">
                      <dt className="font-medium text-primary capitalize">{key.replace(/([A-Z])/g, ' $1')}:</dt>
                      <dd className="text-secondary">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {activeTab === 'sustainability' && (
              <div>
                <h3 className="text-xl font-semibold text-primary mb-6">Our Commitment to Sustainability</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {Object.entries(product.sustainability).map(([key, value]) => (
                    <div key={key} className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        value ? 'bg-success text-white' : 'bg-gray-300'
                      }`}>
                        {value && '✓'}
                      </div>
                      <span className="text-secondary capitalize">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 space-y-3">
                  <h4 className="font-semibold text-primary">Product Journey:</h4>
                  {Object.entries(product.provenance).map(([key, value]) => (
                    <div key={key} className="bg-gray-50 rounded-lg p-4">
                      <dt className="font-medium text-primary capitalize mb-1">{key}:</dt>
                      <dd className="text-secondary text-sm">{value}</dd>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div>
                <h3 className="text-xl font-semibold text-primary mb-4">Shipping & Returns</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-primary mb-2">Free Carbon-Neutral Shipping</h4>
                    <p className="text-secondary text-sm">All orders ship free with our certified carbon-neutral logistics partner. Estimated delivery: 3-5 business days.</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-primary mb-2">Experience Guarantee</h4>
                    <p className="text-secondary text-sm">Not completely delighted? Return within 30 days for a full refund. We'll even cover return shipping.</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-primary mb-2">Packaging</h4>
                    <p className="text-secondary text-sm">Your order arrives in beautiful, sustainable packaging that can be repurposed or recycled.</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
