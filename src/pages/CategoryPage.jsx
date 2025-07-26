import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SparklesIcon, HeartIcon, PaintBrushIcon, GlobeAltIcon, StarIcon } from '@heroicons/react/24/outline'

const CategoryPage = ({ category: propCategory }) => {
  const { category: paramCategory } = useParams()
  const category = propCategory || paramCategory
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [categoryInfo, setCategoryInfo] = useState(null)

  useEffect(() => {
    loadCategory(category)
  }, [category])

  const loadCategory = async (categorySlug) => {
    setLoading(true)
    
    // Category information
    const categoryData = {
      'mindful-living': {
        name: 'Mindful Living',
        description: 'Products that promote mental well-being, mindfulness, and intentional living',
        icon: HeartIcon,
        color: 'text-pink-600',
        bgColor: 'bg-pink-50',
        philosophy: 'In our fast-paced world, finding moments of peace and clarity has become essential. Our Mindful Living collection features products that help you create sacred spaces and rituals for inner calm.',
        productCount: 127
      },
      'creative-pursuits': {
        name: 'Creative Pursuits',
        description: 'High-quality tools and materials for artistic and creative endeavors',
        icon: PaintBrushIcon,
        color: 'text-purple-600',
        bgColor: 'bg-purple-50',
        philosophy: 'Creativity is the soul expressing itself. Our Creative Pursuits collection provides artists, makers, and dreamers with tools that inspire and enable authentic creative expression.',
        productCount: 89
      },
      'sustainable-innovation': {
        name: 'Sustainable Innovation',
        description: 'Eco-friendly products that don\'t compromise on quality or aesthetics',
        icon: GlobeAltIcon,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        philosophy: 'Innovation without conscience is meaningless. Our Sustainable Innovation collection proves that environmental responsibility and exceptional quality can coexist beautifully.',
        productCount: 156
      },
      'micro-luxury': {
        name: 'Micro-Luxury',
        description: 'Small indulgences that elevate everyday moments into special experiences',
        icon: SparklesIcon,
        color: 'text-amber-600',
        bgColor: 'bg-amber-50',
        philosophy: 'Luxury isn\'t about expense—it\'s about intention. Our Micro-Luxury collection transforms ordinary moments into extraordinary experiences through thoughtful design and exceptional craftsmanship.',
        productCount: 67
      }
    }

    setCategoryInfo(categoryData[categorySlug])
    
    // Mock products for this category
    setTimeout(() => {
      const mockProducts = [
        {
          id: 1,
          name: "Meditation Cushion Set",
          category: categorySlug,
          price: 89,
          image: "/api/placeholder/300/300",
          rating: 4.8,
          reviewCount: 67,
          whyItMatters: "Create a dedicated space for mindfulness practice"
        },
        {
          id: 2,
          name: "Artisan Tea Ceremony Kit",
          category: categorySlug,
          price: 156,
          image: "/api/placeholder/300/300",
          rating: 4.9,
          reviewCount: 89,
          whyItMatters: "Transform daily tea into a mindful ritual"
        },
        {
          id: 3,
          name: "Handcrafted Journal Collection",
          category: categorySlug,
          price: 67,
          image: "/api/placeholder/300/300",
          rating: 4.7,
          reviewCount: 45,
          whyItMatters: "Capture thoughts and intentions with beautiful tools"
        }
      ]
      setProducts(mockProducts)
      setLoading(false)
    }, 1000)
  }

  if (loading) {
    return (
      <div className="min-h-screen py-8">
        <div className="container-responsive">
          <div className="text-center py-16">
            <div className="loading-shimmer w-16 h-16 rounded-full mx-auto mb-4"></div>
            <p className="text-secondary">Loading curated collection...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!categoryInfo) {
    return (
      <div className="min-h-screen py-8">
        <div className="container-responsive text-center py-16">
          <h1 className="text-section mb-4">Category Not Found</h1>
          <p className="text-secondary">The category you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  const IconComponent = categoryInfo.icon

  return (
    <div className="min-h-screen" data-track-section={`category-${category}`}>
      
      {/* Category Hero */}
      <section className={`py-24 px-6 ${categoryInfo.bgColor}`}>
        <div className="container-responsive">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={`w-16 h-16 ${categoryInfo.color} mx-auto mb-6 p-3 bg-white rounded-2xl shadow-subtle`}>
              <IconComponent className="w-full h-full" />
            </div>
            
            <h1 className="text-hero mb-6">
              {categoryInfo.name}
            </h1>
            
            <p className="text-xl text-secondary mb-8 leading-relaxed">
              {categoryInfo.description}
            </p>

            <div className="bg-white rounded-2xl p-8 shadow-subtle text-left">
              <h2 className="text-xl font-semibold text-primary mb-4">Our Philosophy</h2>
              <p className="text-secondary leading-relaxed">
                {categoryInfo.philosophy}
              </p>
            </div>

            <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-secondary">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>{categoryInfo.productCount} Curated Products</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gold rounded-full"></div>
                <span>Artisan Crafted</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span>Quality Guaranteed</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24 px-6">
        <div className="container-responsive">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-section mb-6">
              Curated {categoryInfo.name} Collection
            </h2>
            <p className="text-xl text-secondary max-w-3xl mx-auto">
              Each product has been carefully selected for its exceptional quality, 
              meaningful impact, and ability to enhance your {categoryInfo.name.toLowerCase()} journey.
            </p>
          </motion.div>

          <div className="grid-responsive gap-8">
            {products.map((product, index) => (
              <CategoryProductCard 
                key={product.id} 
                product={product} 
                index={index}
                categoryColor={categoryInfo.color}
              />
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <motion.button 
              className="btn-accent px-8 py-3 rounded-full hover-lift"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Load More Products
            </motion.button>
          </div>
        </div>
      </section>

      {/* Category Features */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="container-responsive">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-section mb-6">
              Why Choose Our {categoryInfo.name} Collection?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="bg-white rounded-xl p-8 shadow-subtle text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <SparklesIcon className="w-6 h-6 text-gold" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">Expert Curation</h3>
              <p className="text-secondary">
                Every product is evaluated by our team of experts and community curators 
                to ensure it meets our highest standards.
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl p-8 shadow-subtle text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeartIcon className="w-6 h-6 text-success" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">Artisan Stories</h3>
              <p className="text-secondary">
                Learn about the passionate makers behind each product and the 
                craftsmanship that goes into every piece.
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl p-8 shadow-subtle text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <GlobeAltIcon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">Impact Transparency</h3>
              <p className="text-secondary">
                Full visibility into the environmental and social impact of every 
                purchase you make.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

const CategoryProductCard = ({ product, index, categoryColor }) => {
  return (
    <motion.div
      className="card-interactive group overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      data-product-id={product.id}
      data-track-hover={`category-product-${product.id}`}
    >
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-slow"
        />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className={`${categoryColor} bg-white/90 backdrop-blur-sm text-xs px-3 py-1 rounded-full font-medium`}>
            Featured
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-primary mb-3 group-hover:text-accent transition-colors duration-normal">
          {product.name}
        </h3>
        
        <p className="text-secondary text-sm leading-relaxed mb-4">
          {product.whyItMatters}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating) 
                      ? 'text-gold fill-current' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-secondary">
              {product.rating} ({product.reviewCount})
            </span>
          </div>
        </div>

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
  )
}

export default CategoryPage
