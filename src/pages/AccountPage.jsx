import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  UserIcon, 
  ShoppingBagIcon, 
  HeartIcon, 
  CogIcon,
  TruckIcon,
  StarIcon
} from '@heroicons/react/24/outline'

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState('profile')
  
  const user = {
    name: "Sarah Chen",
    email: "sarah@example.com",
    joinDate: "January 2024",
    avatar: "/api/placeholder/100/100",
    preferences: {
      notifications: true,
      marketing: false,
      newsletter: true
    }
  }

  const recentOrders = [
    {
      id: "CT-2025-001",
      date: "2025-01-20",
      total: 127,
      status: "delivered",
      items: 1
    },
    {
      id: "CT-2025-002", 
      date: "2025-01-15",
      total: 289,
      status: "shipped",
      items: 2
    }
  ]

  const tabs = [
    { id: 'profile', name: 'Profile', icon: UserIcon },
    { id: 'orders', name: 'Orders', icon: ShoppingBagIcon },
    { id: 'wishlist', name: 'Wishlist', icon: HeartIcon },
    { id: 'settings', name: 'Settings', icon: CogIcon }
  ]

  return (
    <div className="min-h-screen py-8" data-track-section="account">
      <div className="container-responsive">
        
        {/* Account Header */}
        <motion.div
          className="bg-white rounded-xl p-8 shadow-subtle mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center space-x-6">
            <img 
              src={user.avatar} 
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold text-primary mb-2">{user.name}</h1>
              <p className="text-secondary mb-1">{user.email}</p>
              <p className="text-sm text-secondary">Member since {user.joinDate}</p>
            </div>
          </div>
        </motion.div>

        <div className="grid desktop:grid-cols-4 gap-8">
          
          {/* Navigation Tabs */}
          <motion.div
            className="desktop:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="bg-white rounded-xl p-4 shadow-subtle">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-normal ${
                      activeTab === tab.id
                        ? 'bg-accent text-white'
                        : 'text-secondary hover:bg-gray-50 hover:text-primary'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span>{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Tab Content */}
          <motion.div
            className="desktop:col-span-3"
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-xl p-8 shadow-subtle">
              
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-xl font-semibold text-primary mb-6">Profile Information</h2>
                  
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-primary mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          defaultValue="Sarah"
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-primary mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          defaultValue="Chen"
                          className="input-field"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        defaultValue={user.email}
                        className="input-field"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="(555) 123-4567"
                        className="input-field"
                      />
                    </div>
                    
                    <button className="btn-primary px-6 py-3 rounded-full">
                      Save Changes
                    </button>
                  </form>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-xl font-semibold text-primary mb-6">Order History</h2>
                  
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-primary">Order {order.id}</h3>
                            <p className="text-sm text-secondary">
                              Placed on {new Date(order.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-primary">${order.total}</p>
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                              order.status === 'delivered' 
                                ? 'bg-success/10 text-success'
                                : 'bg-accent/10 text-accent'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-secondary">
                            {order.items} item{order.items !== 1 ? 's' : ''}
                          </p>
                          <div className="flex space-x-3">
                            <button className="text-accent hover:text-blue-600 text-sm font-medium">
                              View Details
                            </button>
                            {order.status === 'delivered' && (
                              <button className="text-accent hover:text-blue-600 text-sm font-medium">
                                Reorder
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {recentOrders.length === 0 && (
                    <div className="text-center py-12">
                      <ShoppingBagIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-secondary">No orders yet</p>
                    </div>
                  )}
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <div>
                  <h2 className="text-xl font-semibold text-primary mb-6">My Wishlist</h2>
                  <div className="text-center py-12">
                    <HeartIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-secondary mb-4">Your wishlist is empty</p>
                    <button className="btn-accent px-6 py-3 rounded-full">
                      Discover Products
                    </button>
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-xl font-semibold text-primary mb-6">Account Settings</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium text-primary mb-4">Notifications</h3>
                      <div className="space-y-3">
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            defaultChecked={user.preferences.notifications}
                            className="w-4 h-4 text-accent"
                          />
                          <span className="text-secondary">Order updates and shipping notifications</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            defaultChecked={user.preferences.newsletter}
                            className="w-4 h-4 text-accent"
                          />
                          <span className="text-secondary">Newsletter and new product announcements</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            defaultChecked={user.preferences.marketing}
                            className="w-4 h-4 text-accent"
                          />
                          <span className="text-secondary">Marketing and promotional emails</span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="border-t pt-6">
                      <h3 className="font-medium text-primary mb-4">Privacy & Security</h3>
                      <div className="space-y-3">
                        <button className="text-accent hover:text-blue-600 text-sm font-medium block">
                          Change Password
                        </button>
                        <button className="text-accent hover:text-blue-600 text-sm font-medium block">
                          Download My Data
                        </button>
                        <button className="text-red-600 hover:text-red-700 text-sm font-medium block">
                          Delete Account
                        </button>
                      </div>
                    </div>
                    
                    <button className="btn-primary px-6 py-3 rounded-full">
                      Save Settings
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default AccountPage
