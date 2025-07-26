"use client"

import { useState } from "react"
import { Search, Heart, ShoppingCart, User, Sparkles, Star, ArrowRight, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import ConciergeChat from "@/components/ai/ConciergeChat"

export default function HomePage() {
  const [showChat, setShowChat] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const featuredProducts = [
    {
      id: 1,
      name: "Artisan Coffee Blend",
      price: "$24.99",
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.8,
      reviews: 124,
      story: "Hand-picked by Maria from Colombian highlands",
    },
    {
      id: 2,
      name: "Handwoven Scarf",
      price: "$89.99",
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.9,
      reviews: 89,
      story: "Crafted by artisans in Peru using traditional techniques",
    },
    {
      id: 3,
      name: "Organic Honey",
      price: "$18.99",
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.7,
      reviews: 156,
      story: "From sustainable beekeepers in New Zealand",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-orange-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold gradient-text">CanvasThink</span>
              </div>
            </div>

            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="What brings you joy today?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white/90 backdrop-blur-sm"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-orange-600">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-orange-600">
                <ShoppingCart className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-orange-600">
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">The Joyful</span>
              <br />
              <span className="text-gray-800">Commerce Platform</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Where Help Pays Off, and Humanity Thrives. Discover products with stories, connect with creators, and
              experience commerce that brings joy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-primary text-lg px-8 py-4">
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                className="text-lg px-8 py-4 border-2 border-blue-500 text-blue-600 hover:bg-blue-50 bg-transparent"
                onClick={() => setShowChat(true)}
              >
                <MessageCircle className="mr-2 w-5 h-5" />
                Chat with AI Concierge
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-orange-200 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-200 rounded-full opacity-40 animate-pulse delay-1000"></div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Featured Stories</h2>
            <p className="text-xl text-gray-600">Every product has a story. Every purchase makes a difference.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg card-hover overflow-hidden">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-3 text-sm">{product.story}</p>
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-orange-600">{product.price}</span>
                    <Button className="btn-primary">Add to Cart</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why CanvasThink?</h2>
            <p className="text-xl text-gray-600">Experience commerce that understands you</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white/70 rounded-2xl card-hover">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Emotional Intelligence</h3>
              <p className="text-gray-600">
                Our AI understands your emotions and preferences to curate the perfect experience
              </p>
            </div>

            <div className="text-center p-8 bg-white/70 rounded-2xl card-hover">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Joyful Discovery</h3>
              <p className="text-gray-600">Discover products that align with your values and bring genuine happiness</p>
            </div>

            <div className="text-center p-8 bg-white/70 rounded-2xl card-hover">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Human Connection</h3>
              <p className="text-gray-600">Connect with creators and fellow customers in meaningful ways</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold">CanvasThink</span>
            </div>
            <p className="text-gray-400 mb-6">Where Help Pays Off, and Humanity Thrives</p>
            <p className="text-sm text-gray-500">© 2024 CanvasThink. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* AI Concierge Chat */}
      {showChat && <ConciergeChat onClose={() => setShowChat(false)} />}
    </div>
  )
}
