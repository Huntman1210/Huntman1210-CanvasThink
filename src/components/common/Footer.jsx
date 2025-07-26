import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Discover',
      links: [
        { name: 'Featured Products', href: '/discover/featured' },
        { name: 'Mindful Living', href: '/categories/mindful-living' },
        { name: 'Creative Pursuits', href: '/categories/creative-pursuits' },
        { name: 'Sustainable Innovation', href: '/categories/sustainable-innovation' },
        { name: 'Micro-Luxury', href: '/categories/micro-luxury' },
      ]
    },
    {
      title: 'Community',
      links: [
        { name: 'Stories', href: '/stories' },
        { name: 'Curators', href: '/community/curators' },
        { name: 'Reviews', href: '/community/reviews' },
        { name: 'Discussions', href: '/community/discussions' },
        { name: 'Events', href: '/community/events' },
      ]
    },
    {
      title: 'Transparency',
      links: [
        { name: 'Product Provenance', href: '/transparency/provenance' },
        { name: 'Our Curation Process', href: '/transparency/curation' },
        { name: 'Sustainability Impact', href: '/transparency/sustainability' },
        { name: 'Artisan Partners', href: '/transparency/artisans' },
        { name: 'Quality Standards', href: '/transparency/quality' },
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '/support' },
        { name: 'Experience Guarantee', href: '/support/guarantee' },
        { name: 'Shipping & Returns', href: '/support/shipping' },
        { name: 'Contact Us', href: '/support/contact' },
        { name: 'Account', href: '/account' },
      ]
    }
  ]

  const socialLinks = [
    { name: 'Instagram', href: '#', icon: 'instagram' },
    { name: 'Twitter', href: '#', icon: 'twitter' },
    { name: 'Pinterest', href: '#', icon: 'pinterest' },
    { name: 'YouTube', href: '#', icon: 'youtube' },
  ]

  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="container-responsive">
        
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-5 gap-8">
            
            {/* Brand Section */}
            <div className="tablet:col-span-2 desktop:col-span-1">
              <Link to="/" className="inline-block mb-6">
                <motion.div
                  className="text-2xl font-bold text-primary hover-gold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  CanvasThink
                </motion.div>
              </Link>
              <p className="text-secondary text-body leading-relaxed mb-6">
                Curated excellence. Joyful commerce. 
                Making the impossible feel inevitable.
              </p>
              
              {/* Newsletter Signup */}
              <div className="mb-6">
                <h4 className="text-primary font-medium mb-2">Stay Inspired</h4>
                <form className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="input-field rounded-r-none flex-1"
                  />
                  <button
                    type="submit"
                    className="btn-accent rounded-l-none px-4 py-3"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-primary font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-secondary hover:text-accent transition-colors duration-fast text-body"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-8 border-t border-gray-200">
          <div className="flex flex-col tablet:flex-row justify-between items-center space-y-4 tablet:space-y-0">
            
            {/* Copyright */}
            <p className="text-secondary text-small">
              © {currentYear} CanvasThink. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex items-center space-x-6">
              <Link
                to="/legal/privacy"
                className="text-secondary hover:text-accent transition-colors duration-fast text-small"
              >
                Privacy Policy
              </Link>
              <Link
                to="/legal/terms"
                className="text-secondary hover:text-accent transition-colors duration-fast text-small"
              >
                Terms of Service
              </Link>
              <Link
                to="/legal/cookies"
                className="text-secondary hover:text-accent transition-colors duration-fast text-small"
              >
                Cookie Policy
              </Link>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-secondary hover:text-accent transition-colors duration-fast"
                  aria-label={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SocialIcon icon={social.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="py-6 border-t border-gray-200">
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-success rounded-full"></div>
              <span className="text-micro text-secondary">Carbon Neutral Shipping</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gold rounded-full"></div>
              <span className="text-micro text-secondary">Ethically Sourced</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-accent rounded-full"></div>
              <span className="text-micro text-secondary">Quality Guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Simple social media icons
const SocialIcon = ({ icon }) => {
  const iconClass = "w-5 h-5 fill-current"
  
  switch (icon) {
    case 'instagram':
      return (
        <svg className={iconClass} viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    case 'twitter':
      return (
        <svg className={iconClass} viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      )
    case 'pinterest':
      return (
        <svg className={iconClass} viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.222.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
        </svg>
      )
    case 'youtube':
      return (
        <svg className={iconClass} viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    default:
      return null
  }
}

export default Footer
