import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { 
  MagnifyingGlassIcon, 
  HeartIcon, 
  ShoppingBagIcon, 
  UserIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [cartCount, setCartCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(0)
  
  const location = useLocation()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsSearchExpanded(false)
  }, [location])

  const navigation = [
    { name: 'Discover', href: '/discover' },
    { name: 'Stories', href: '/stories' },
    { name: 'Community', href: '/community' },
  ]

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Navigate to search results
      // This will be implemented with routing
      console.log('Search:', searchQuery)
    }
  }

  return (
    <motion.header
      className={`sticky top-0 z-50 transition-all duration-normal ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-subtle border-b border-gray-100' 
          : 'bg-white'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="container-responsive">
        <div className="flex items-center justify-between h-16 tablet:h-20">
          
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <motion.div
              className="text-2xl font-bold text-primary hover-gold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              CanvasThink
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden tablet:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative text-body font-medium transition-colors duration-normal hover:text-accent ${
                  location.pathname === item.href ? 'text-accent' : 'text-primary'
                }`}
              >
                {item.name}
                {location.pathname === item.href && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent"
                    layoutId="activeNav"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden tablet:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder="Discover something wonderful..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10 pr-4"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary" />
            </form>
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-4">
            
            {/* Search Icon - Mobile */}
            <button
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              className="tablet:hidden p-2 text-primary hover:text-accent transition-colors duration-fast"
              aria-label="Search"
            >
              <MagnifyingGlassIcon className="w-6 h-6" />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-2 text-primary hover:text-accent transition-colors duration-fast"
              aria-label={`Wishlist (${wishlistCount} items)`}
            >
              <HeartIcon className="w-6 h-6" />
              {wishlistCount > 0 && (
                <motion.span
                  className="absolute -top-1 -right-1 bg-gold text-primary text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                  {wishlistCount}
                </motion.span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-primary hover:text-accent transition-colors duration-fast"
              aria-label={`Shopping cart (${cartCount} items)`}
            >
              <ShoppingBagIcon className="w-6 h-6" />
              {cartCount > 0 && (
                <motion.span
                  className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>

            {/* Account */}
            <Link
              to="/account"
              className="p-2 text-primary hover:text-accent transition-colors duration-fast"
              aria-label="Account"
            >
              <UserIcon className="w-6 h-6" />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="tablet:hidden p-2 text-primary hover:text-accent transition-colors duration-fast"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Overlay */}
        <motion.div
          className={`tablet:hidden overflow-hidden ${isSearchExpanded ? 'pb-4' : ''}`}
          initial={false}
          animate={{ height: isSearchExpanded ? 'auto' : 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Discover something wonderful..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10 pr-4"
              autoFocus={isSearchExpanded}
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary" />
          </form>
        </motion.div>

        {/* Mobile Menu */}
        <motion.div
          className={`tablet:hidden overflow-hidden border-t border-gray-100 ${isMobileMenuOpen ? 'pb-4' : ''}`}
          initial={false}
          animate={{ height: isMobileMenuOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <nav className="pt-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-2 text-body font-medium rounded-md transition-colors duration-fast ${
                  location.pathname === item.href
                    ? 'bg-accent/10 text-accent'
                    : 'text-primary hover:bg-gray-50 hover:text-accent'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </motion.div>
      </div>
    </motion.header>
  )
}

export default Header
