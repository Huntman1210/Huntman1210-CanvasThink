import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowRightIcon,
  HeartIcon,
  UsersIcon,
  LightBulbIcon,
  SparklesIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  StarIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [userEmotionalState, setUserEmotionalState] = useState(null)

  useEffect(() => {
    setIsVisible(true)
    loadFeaturedProducts()
    
    // Listen for emotional state changes to personalize content
    const handleEmotionalUpdate = (e) => {
      setUserEmotionalState(e.detail)
      personalizeContent(e.detail.state)
    }

    window.addEventListener('canvasthink:emotional-state', handleEmotionalUpdate)
    return () => window.removeEventListener('canvasthink:emotional-state', handleEmotionalUpdate)
  }, [])

  const loadFeaturedProducts = () => {
    // In production, this would be API call with AI-powered curation
    const mockFeaturedProducts = [
      {
        id: 1,
        name: "Handcrafted Mindfulness Set",
        category: "mindful-living",
        whyItMatters: "Transform daily rituals into moments of pure presence and joy",
        price: 127,
        originalPrice: 159,
        image: "/api/placeholder/400/400",
        rating: 4.9,
        reviewCount: 147,
        isNew: true,
        artisan: "Maya Chen Studio",
        sustainability: "Carbon Neutral",
        emotional_resonance: ["contemplative", "curious"]
      },
      {
        id: 2,
        name: "Artist's Inspiration Collection", 
        category: "creative-pursuits",
        whyItMatters: "Unlock your creative potential with tools that feel like extensions of your imagination",
        price: 289,
        image: "/api/placeholder/400/400",
        rating: 4.8,
        reviewCount: 89,
        artisan: "Renaissance Craft Co.",
        sustainability: "Ethically Sourced",
        emotional_resonance: ["curious", "engaged"]
      },
      {
        id: 3,
        name: "Ocean-Safe Innovation Kit",
        category: "sustainable-innovation", 
        whyItMatters: "Make a positive impact without compromising on quality or design",
        price: 156,
        image: "/api/placeholder/400/400",
        rating: 4.9,
        reviewCount: 203,
        isFeatured: true,
        artisan: "Blue Planet Collective",
        sustainability: "Ocean Positive",
        emotional_resonance: ["engaged", "confident"]
      },
      {
        id: 4,
        name: "Luxury Moment Curated Box",
        category: "micro-luxury",
        whyItMatters: "Elevate everyday experiences with thoughtfully curated indulgences",
        price: 97,
        image: "/api/placeholder/400/400", 
        rating: 4.7,
        reviewCount: 67,
        artisan: "Atelier Moments",
        sustainability: "Locally Crafted",
        emotional_resonance: ["delighted", "contemplative"]
      }
    ]
    
    setFeaturedProducts(mockFeaturedProducts)
  }

  const personalizeContent = (emotionalState) => {
    // Dynamically adjust content based on user's emotional state
    console.log(`🎯 Personalizing homepage for emotional state: ${emotionalState}`)
    
    // This would trigger more sophisticated personalization in production
    document.body.setAttribute('data-emotional-state', emotionalState)
  }

  const pillars = [
    {
      icon: ShieldCheckIcon,
      title: "Ruthless Curation",
      description: "Every product undergoes our rigorous 5-dimensional evaluation. Only the exceptional makes it to you.",
      color: "text-gold"
    },
    {
      icon: GlobeAltIcon,
      title: "Radical Transparency", 
      description: "Complete visibility into origins, craftsmanship, and impact. No hidden fees, no deceptive marketing.",
      color: "text-accent"
    },
    {
      icon: SparklesIcon,
      title: "Effortless Experience",
      description: "Technology that disappears, leaving only joy. Every interaction designed to delight, not frustrate.", 
      color: "text-success"
    },
    {
      icon: UsersIcon,
      title: "Community Excellence",
      description: "Our community of connoisseurs shapes everything we do. Your voice drives our evolution.",
      color: "text-blue-600"
    },
    {
      icon: HeartIcon,
      title: "Sustainable Value",
      description: "Profit through purpose, not exploitation. Creating value for users, creators, and our planet.",
      color: "text-pink-600"
    }
  ]

  const categories = [
    {
      name: "Mindful Living",
      slug: "mindful-living", 
      description: "Products that promote mental well-being and intentional living",
      image: "/api/placeholder/300/200",
      productCount: 127,
      featured: true
    },
    {
      name: "Creative Pursuits",
      slug: "creative-pursuits",
      description: "High-quality tools for artistic and creative endeavors", 
      image: "/api/placeholder/300/200",
      productCount: 89,
      featured: true
    },
    {
      name: "Sustainable Innovation", 
      slug: "sustainable-innovation",
      description: "Eco-friendly products that don't compromise on quality",
      image: "/api/placeholder/300/200", 
      productCount: 156,
      featured: true
    },
    {
      name: "Micro-Luxury",
      slug: "micro-luxury",
      description: "Small indulgences that elevate everyday moments",
      image: "/api/placeholder/300/200",
      productCount: 67,
      featured: true
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section - Emotionally Intelligent */}
      <section 
        className="relative min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-white to-gray-50"
        data-track-section="hero"
      >
        <div className={`max-w-6xl mx-auto text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="text-5xl md:text-7xl font-light text-primary mb-8 leading-tight">
              Where Quality Meets
              <br />
              <span className="font-medium text-gradient-accent">Joyful Discovery</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-secondary mb-12 max-w-4xl mx-auto leading-relaxed">
              Experience commerce as it should be: curated with obsessive care, 
              transparent in every detail, and designed to bring genuine delight to your life.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              <Link to="/discover" className="group">
                <motion.button 
                  className="btn-primary text-lg px-8 py-4 rounded-full hover-lift"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-track-hover="cta-discover"
                >
                  Discover Curated Excellence
                  <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-normal" />
                </motion.button>
              </Link>
              
              <Link to="/community" className="group">
                <motion.button 
                  className="btn-secondary text-lg px-8 py-4 rounded-full hover-lift"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Join Our Community
                  <UsersIcon className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform duration-normal" />
                </motion.button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-80">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm text-secondary">95%+ Satisfaction Rate</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gold rounded-full"></div>
                <span className="text-sm text-secondary">Ethically Curated</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-sm text-secondary">Carbon Neutral Shipping</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating AI Indicator */}
        {userEmotionalState && (
          <motion.div
            className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-subtle"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span className="text-xs text-secondary">AI Personalizing</span>
            </div>
          </motion.div>
        )}
      </section>

      {/* Featured Products - AI Curated */}
      <section className="py-24 px-6" data-track-section="featured-products">
        <div className="container-responsive">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-section mb-6">
              Curated Just For You
              <SparklesIcon className="inline-block w-8 h-8 ml-2 text-gold" />
            </h2>
            <p className="text-xl text-secondary max-w-3xl mx-auto">
              Our AI Concierge has selected these exceptional products based on community preferences 
              and our rigorous curation standards.
            </p>
          </motion.div>

          <div className="grid-responsive gap-8">
            {featuredProducts.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                index={index}
                emotionalState={userEmotionalState?.state}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/discover">
              <motion.button 
                className="btn-accent px-8 py-3 rounded-full hover-lift"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore All Products
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* Five Pillars */}
      <section className="py-24 px-6 bg-gray-50" data-track-section="pillars">
        <div className="container-responsive">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-section mb-6">The Five Pillars of Excellence</h2>
            <p className="text-xl text-secondary max-w-4xl mx-auto">
              These principles guide every decision we make, ensuring that your experience 
              with CanvasThink is nothing short of extraordinary.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 desktop:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                className="bg-white rounded-xl p-8 shadow-subtle hover:shadow-enhanced transition-all duration-normal group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                data-track-hover={`pillar-${pillar.title.toLowerCase().replace(' ', '-')}`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-normal ${pillar.color.replace('text-', 'bg-').replace('text-', 'bg-')} bg-opacity-10`}>
                  <pillar.icon className={`w-6 h-6 ${pillar.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-4">{pillar.title}</h3>
                <p className="text-secondary leading-relaxed">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 px-6" data-track-section="categories">
        <div className="container-responsive">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-section mb-6">Explore Our Curated Categories</h2>
            <p className="text-xl text-secondary max-w-4xl mx-auto">
              Each category represents a different aspect of the good life, 
              carefully curated to enhance your daily experiences.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {categories.map((category, index) => (
              <CategoryCard key={category.slug} category={category} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Community Highlight */}
      <section className="py-24 px-6 bg-primary text-white" data-track-section="community">
        <div className="container-responsive">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-section text-white mb-6">
              Join a Community of Connoisseurs
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Connect with fellow enthusiasts, share your discoveries, and help shape 
              the future of thoughtful commerce.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-gold mb-2">10,000+</div>
              <div className="text-gray-300">Active Community Members</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gold mb-2">500+</div>
              <div className="text-gray-300">Curated Products</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gold mb-2">50+</div>
              <div className="text-gray-300">Artisan Partners</div>
            </div>
          </div>

          <div className="text-center">
            <Link to="/community">
              <motion.button 
                className="bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-normal hover-lift"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Community
                <ArrowRightIcon className="ml-2 h-5 w-5 inline" />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6" data-track-section="final-cta">
        <div className="container-responsive text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-section mb-8">
              Ready to Experience Joyful Commerce?
            </h2>
            <p className="text-xl text-secondary mb-12 max-w-3xl mx-auto">
              Join thousands who have discovered that shopping can be a source of delight, 
              not frustration. Every purchase supports artisans and sustainable practices.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/discover">
                <motion.button 
                  className="btn-primary text-lg px-8 py-4 rounded-full hover-lift"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Discovering
                  <SparklesIcon className="ml-2 h-5 w-5" />
                </motion.button>
              </Link>
              
              <Link to="/stories">
                <motion.button 
                  className="btn-secondary text-lg px-8 py-4 rounded-full hover-lift"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Read Our Stories
                  <HeartIcon className="ml-2 h-5 w-5" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

const ProductCard = ({ product, index, emotionalState }) => {
  const [isWishlisted, setIsWishlisted] = useState(false)
  
  const handleWishlistToggle = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
    
    // Track wishlist interaction
    window.dispatchEvent(new CustomEvent('canvasthink:behavioral-interaction', {
      detail: {
        type: 'wishlist_toggle',
        productId: product.id,
        action: isWishlisted ? 'remove' : 'add',
        emotionalContext: emotionalState
      }
    }))
  }

  return (
    <motion.div
      className="card-interactive group overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      data-product-id={product.id}
      data-track-hover={`product-${product.id}`}
    >
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-slow"
        />
        
        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-subtle hover:bg-white transition-all duration-fast hover:scale-110"
        >
          {isWishlisted ? (
            <HeartSolidIcon className="w-5 h-5 text-red-500" />
          ) : (
            <HeartIcon className="w-5 h-5 text-gray-600" />
          )}
        </button>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-accent text-white text-xs px-2 py-1 rounded-full font-medium">
              New
            </span>
          )}
          {product.isFeatured && (
            <span className="bg-gold text-primary text-xs px-2 py-1 rounded-full font-medium">
              Featured
            </span>
          )}
        </div>

        {/* Sustainability Badge */}
        <div className="absolute bottom-4 left-4">
          <span className="bg-success/90 text-white text-xs px-2 py-1 rounded-full font-medium backdrop-blur-sm">
            {product.sustainability}
          </span>
        </div>
      </div>

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
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          
          <Link to={`/product/${product.id}`}>
            <motion.button 
              className="btn-accent px-4 py-2 text-sm rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Details
            </motion.button>
          </Link>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <span className="text-xs text-secondary">
            By {product.artisan}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

const CategoryCard = ({ category, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Link to={`/categories/${category.slug}`} className="group block">
        <div className="card-interactive overflow-hidden">
          <div className="relative">
            <img 
              src={category.image} 
              alt={category.name}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-slow"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl font-semibold mb-1">{category.name}</h3>
              <p className="text-sm opacity-90">{category.productCount} products</p>
            </div>
          </div>
          
          <div className="p-6">
            <p className="text-secondary leading-relaxed mb-4">
              {category.description}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-accent font-medium group-hover:text-blue-600 transition-colors duration-normal">
                Explore Category
              </span>
              <ArrowRightIcon className="w-5 h-5 text-accent group-hover:translate-x-1 transition-transform duration-normal" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default HomePage
