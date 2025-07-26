import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  CreditCardIcon, 
  ShieldCheckIcon, 
  TruckIcon,
  LockClosedIcon 
} from '@heroicons/react/24/outline'

const CheckoutPage = () => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    email: '',
    shipping: {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'US'
    },
    payment: {
      method: 'card',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      nameOnCard: ''
    }
  })

  const cartItems = [
    {
      id: 1,
      name: "Handcrafted Mindfulness Set",
      price: 127,
      quantity: 1,
      image: "/api/placeholder/100/100"
    }
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = 0 // Free shipping
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + shipping + tax

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handlePlaceOrder = () => {
    console.log('Placing order:', formData)
    // Order placement logic here
  }

  const steps = [
    { number: 1, name: 'Contact', completed: step > 1 },
    { number: 2, name: 'Shipping', completed: step > 2 },
    { number: 3, name: 'Payment', completed: false }
  ]

  return (
    <div className="min-h-screen py-8" data-track-section="checkout">
      <div className="container-responsive">
        
        {/* Progress Steps */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center space-x-8">
            {steps.map((stepItem, index) => (
              <div key={stepItem.number} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step === stepItem.number 
                    ? 'bg-accent text-white' 
                    : stepItem.completed
                    ? 'bg-success text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepItem.completed ? '✓' : stepItem.number}
                </div>
                <span className={`ml-2 font-medium ${
                  step === stepItem.number ? 'text-accent' : 'text-secondary'
                }`}>
                  {stepItem.name}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 ml-4 ${
                    stepItem.completed ? 'bg-success' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid desktop:grid-cols-3 gap-12">
          
          {/* Checkout Form */}
          <div className="desktop:col-span-2">
            <motion.div
              className="bg-white rounded-xl p-8 shadow-subtle"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              
              {/* Step 1: Contact Information */}
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-semibold text-primary mb-6">Contact Information</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="input-field"
                        placeholder="sarah@example.com"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="newsletter" className="w-4 h-4 text-accent" />
                      <label htmlFor="newsletter" className="text-sm text-secondary">
                        Keep me updated on new products and exclusive offers
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Shipping Information */}
              {step === 2 && (
                <div>
                  <h2 className="text-xl font-semibold text-primary mb-6">Shipping Address</h2>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={formData.shipping.firstName}
                        onChange={(e) => handleInputChange('shipping', 'firstName', e.target.value)}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={formData.shipping.lastName}
                        onChange={(e) => handleInputChange('shipping', 'lastName', e.target.value)}
                        className="input-field"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        value={formData.shipping.address}
                        onChange={(e) => handleInputChange('shipping', 'address', e.target.value)}
                        className="input-field"
                        placeholder="123 Main Street"
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-primary mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          value={formData.shipping.city}
                          onChange={(e) => handleInputChange('shipping', 'city', e.target.value)}
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-primary mb-2">
                          State
                        </label>
                        <select
                          value={formData.shipping.state}
                          onChange={(e) => handleInputChange('shipping', 'state', e.target.value)}
                          className="input-field"
                        >
                          <option value="">Select State</option>
                          <option value="CA">California</option>
                          <option value="NY">New York</option>
                          <option value="TX">Texas</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-primary mb-2">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          value={formData.shipping.zipCode}
                          onChange={(e) => handleInputChange('shipping', 'zipCode', e.target.value)}
                          className="input-field"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Payment Information */}
              {step === 3 && (
                <div>
                  <h2 className="text-xl font-semibold text-primary mb-6">Payment Information</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        Card Number
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.payment.cardNumber}
                          onChange={(e) => handleInputChange('payment', 'cardNumber', e.target.value)}
                          className="input-field pl-12"
                          placeholder="1234 5678 9012 3456"
                        />
                        <CreditCardIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-primary mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          value={formData.payment.expiryDate}
                          onChange={(e) => handleInputChange('payment', 'expiryDate', e.target.value)}
                          className="input-field"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-primary mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          value={formData.payment.cvv}
                          onChange={(e) => handleInputChange('payment', 'cvv', e.target.value)}
                          className="input-field"
                          placeholder="123"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        value={formData.payment.nameOnCard}
                        onChange={(e) => handleInputChange('payment', 'nameOnCard', e.target.value)}
                        className="input-field"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={handleBack}
                  disabled={step === 1}
                  className={`px-6 py-3 rounded-full font-medium transition-colors duration-normal ${
                    step === 1 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-accent hover:text-blue-600'
                  }`}
                >
                  ← Back
                </button>
                
                {step < 3 ? (
                  <button
                    onClick={handleNext}
                    className="btn-primary px-8 py-3 rounded-full"
                  >
                    Continue →
                  </button>
                ) : (
                  <button
                    onClick={handlePlaceOrder}
                    className="btn-primary px-8 py-3 rounded-full"
                  >
                    <LockClosedIcon className="w-5 h-5 mr-2 inline" />
                    Place Order
                  </button>
                )}
              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <motion.div
            className="bg-white rounded-xl p-8 shadow-subtle h-fit"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold text-primary mb-6">Order Summary</h2>
            
            {/* Cart Items */}
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-primary text-sm">{item.name}</h3>
                    <p className="text-xs text-secondary">Qty: {item.quantity}</p>
                  </div>
                  <span className="font-medium text-primary">${item.price}</span>
                </div>
              ))}
            </div>
            
            {/* Pricing */}
            <div className="space-y-3 mb-6 border-t pt-4">
              <div className="flex justify-between">
                <span className="text-secondary">Subtotal</span>
                <span className="text-primary">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Shipping</span>
                <span className="text-success">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Tax</span>
                <span className="text-primary">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between">
                <span className="font-semibold text-primary">Total</span>
                <span className="text-xl font-bold text-primary">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2 text-secondary">
                <ShieldCheckIcon className="w-4 h-4 text-success" />
                <span>Secure 256-bit SSL encryption</span>
              </div>
              <div className="flex items-center space-x-2 text-secondary">
                <TruckIcon className="w-4 h-4 text-accent" />
                <span>Free carbon-neutral shipping</span>
              </div>
              <div className="flex items-center space-x-2 text-secondary">
                <LockClosedIcon className="w-4 h-4 text-gold" />
                <span>30-day experience guarantee</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
