import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBagIcon, TrashIcon, HeartIcon } from '@heroicons/react/24/outline'

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Handcrafted Mindfulness Set",
      price: 127,
      quantity: 1,
      image: "/api/placeholder/200/200",
      category: "mindful-living"
    }
  ])

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = 0 // Free shipping
  const total = subtotal + shipping

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      setCartItems(items => items.filter(item => item.id !== id))
    } else {
      setCartItems(items => 
        items.map(item => 
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      )
    }
  }

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen py-8">
        <div className="container-responsive text-center py-16">
          <ShoppingBagIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-section mb-4">Your Cart is Empty</h1>
          <p className="text-secondary mb-8">Discover our curated collection of exceptional products.</p>
          <button className="btn-accent px-8 py-3 rounded-full">
            Start Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8" data-track-section="cart">
      <div className="container-responsive">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-section mb-2">Shopping Cart</h1>
          <p className="text-secondary">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
        </motion.div>

        <div className="grid desktop:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="desktop:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="bg-white rounded-xl p-6 shadow-subtle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex items-center space-x-4">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-primary mb-1">{item.name}</h3>
                    <p className="text-sm text-secondary mb-2">{item.category.replace('-', ' ')}</p>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        >
                          +
                        </button>
                      </div>
                      
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors duration-normal"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                      
                      <button className="text-gray-400 hover:text-red-500 transition-colors duration-normal">
                        <HeartIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-xl font-bold text-primary">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-sm text-secondary">
                      ${item.price} each
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <motion.div
            className="bg-white rounded-xl p-6 shadow-subtle h-fit"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold text-primary mb-6">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-secondary">Subtotal</span>
                <span className="text-primary">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Shipping</span>
                <span className="text-success">Free</span>
              </div>
              <div className="border-t pt-3 flex justify-between">
                <span className="font-semibold text-primary">Total</span>
                <span className="text-xl font-bold text-primary">${total.toFixed(2)}</span>
              </div>
            </div>

            <button className="btn-primary w-full py-3 rounded-full text-lg font-semibold mb-4">
              Proceed to Checkout
            </button>
            
            <button className="btn-secondary w-full py-3 rounded-full">
              Continue Shopping
            </button>

            <div className="mt-6 text-center text-sm text-secondary">
              <p>Free carbon-neutral shipping • 30-day returns</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
