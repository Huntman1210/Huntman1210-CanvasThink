import { Routes, Route } from 'react-router-dom'
import Layout from './components/common/Layout'

// Page imports (will be created progressively)
import HomePage from './pages/HomePage'
import DiscoverPage from './pages/DiscoverPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CategoryPage from './pages/CategoryPage'
import StoriesPage from './pages/StoriesPage'
import CommunityPage from './pages/CommunityPage'
import CartPage from './pages/CartPage'
import WishlistPage from './pages/WishlistPage'
import AccountPage from './pages/AccountPage'
import CheckoutPage from './pages/CheckoutPage'
import SearchResultsPage from './pages/SearchResultsPage'

// AI Concierge Components
import ConciergeChat from './components/ai/ConciergeChat'

// Behavioral tracking and ER-AI integration
import { useEffect } from 'react'
import { initializeBehavioralTracking } from './services/behavioralTracking'
import { initializeEmotionalRecognition } from './services/emotionalRecognition'

function App() {
  // Initialize advanced tracking and AI systems
  useEffect(() => {
    // Initialize behavioral pattern recognition
    initializeBehavioralTracking()
    
    // Initialize emotional recognition AI
    initializeEmotionalRecognition()
    
    // Initialize performance monitoring
    if ('performance' in window) {
      // Track Core Web Vitals and user experience metrics
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          // Send to analytics service
          console.log('Performance metric:', entry)
        })
      })
      observer.observe({ entryTypes: ['navigation', 'measure', 'paint'] })
    }
  }, [])

  return (
    <Layout>
      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/discover/featured" element={<DiscoverPage featured={true} />} />
        
        {/* Product Routes */}
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        
        {/* Category Routes - Advanced Product Categories */}
        <Route path="/categories/mindful-living" element={<CategoryPage category="mindful-living" />} />
        <Route path="/categories/creative-pursuits" element={<CategoryPage category="creative-pursuits" />} />
        <Route path="/categories/sustainable-innovation" element={<CategoryPage category="sustainable-innovation" />} />
        <Route path="/categories/micro-luxury" element={<CategoryPage category="micro-luxury" />} />
        
        {/* Community & Social Commerce */}
        <Route path="/stories" element={<StoriesPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/community/curators" element={<CommunityPage section="curators" />} />
        <Route path="/community/reviews" element={<CommunityPage section="reviews" />} />
        <Route path="/community/discussions" element={<CommunityPage section="discussions" />} />
        <Route path="/community/events" element={<CommunityPage section="events" />} />
        
        {/* Transparency System Routes */}
        <Route path="/transparency/provenance" element={<div>Provenance System</div>} />
        <Route path="/transparency/curation" element={<div>Curation Process</div>} />
        <Route path="/transparency/sustainability" element={<div>Sustainability Impact</div>} />
        <Route path="/transparency/artisans" element={<div>Artisan Partners</div>} />
        <Route path="/transparency/quality" element={<div>Quality Standards</div>} />
        
        {/* User Experience Routes */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/account/*" element={<AccountPage />} />
        
        {/* Support Routes */}
        <Route path="/support" element={<div>Help Center</div>} />
        <Route path="/support/guarantee" element={<div>Experience Guarantee</div>} />
        <Route path="/support/shipping" element={<div>Shipping & Returns</div>} />
        <Route path="/support/contact" element={<div>Contact Us</div>} />
        
        {/* Legal Routes */}
        <Route path="/legal/privacy" element={<div>Privacy Policy</div>} />
        <Route path="/legal/terms" element={<div>Terms of Service</div>} />
        <Route path="/legal/cookies" element={<div>Cookie Policy</div>} />
        
        {/* 404 Route */}
        <Route path="*" element={<div className="container-responsive py-16 text-center">
          <h1 className="text-section mb-4">Page Not Found</h1>
          <p className="text-body text-secondary">The page you're looking for doesn't exist.</p>
        </div>} />
      </Routes>
      
      {/* AI Concierge - Always Available */}
      <ConciergeChat />
    </Layout>
  )
}

export default App
