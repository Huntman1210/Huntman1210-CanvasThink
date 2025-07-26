import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children, className = '' }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className={`min-h-screen bg-white flex flex-col ${className}`}>
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <motion.main
        className="flex-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {children}
      </motion.main>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Layout
