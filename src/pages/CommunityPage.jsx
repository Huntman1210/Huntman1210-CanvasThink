import { motion } from 'framer-motion'
import { UsersIcon, ChatBubbleLeftRightIcon, HeartIcon, StarIcon } from '@heroicons/react/24/outline'

const CommunityPage = ({ section = 'overview' }) => {
  const communityStats = {
    members: "10,247",
    reviews: "2,845",
    curators: "127",
    discussions: "1,389"
  }

  const topCurators = [
    {
      id: 1,
      name: "Sarah Chen",
      avatar: "/api/placeholder/100/100",
      specialty: "Mindful Living",
      followers: 1247,
      collections: 23,
      rating: 4.9
    },
    {
      id: 2,
      name: "Marcus Rivera",
      avatar: "/api/placeholder/100/100", 
      specialty: "Sustainable Innovation",
      followers: 987,
      collections: 18,
      rating: 4.8
    }
  ]

  const recentDiscussions = [
    {
      id: 1,
      title: "Best meditation cushions for beginners?",
      author: "Alex Thompson",
      replies: 12,
      lastActivity: "2 hours ago",
      category: "mindful-living"
    },
    {
      id: 2,
      title: "Sustainable packaging - what do you look for?",
      author: "Emma Wilson",
      replies: 8,
      lastActivity: "4 hours ago", 
      category: "sustainable-innovation"
    }
  ]

  return (
    <div className="min-h-screen py-8" data-track-section="community">
      <div className="container-responsive">
        
        {/* Community Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-hero mb-6">
            Community of Connoisseurs
            <UsersIcon className="inline-block w-10 h-10 ml-3 text-accent" />
          </h1>
          <p className="text-xl text-secondary max-w-4xl mx-auto">
            Connect with fellow enthusiasts, discover new products through trusted recommendations, 
            and share your own experiences with our curated collection.
          </p>
        </motion.div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {Object.entries(communityStats).map(([key, value], index) => (
            <motion.div
              key={key}
              className="bg-white rounded-xl p-6 shadow-subtle text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="text-3xl font-bold text-primary mb-2">{value}</div>
              <div className="text-sm text-secondary capitalize">{key}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid desktop:grid-cols-2 gap-12">
          
          {/* Top Curators */}
          <motion.section
            className="bg-white rounded-xl p-8 shadow-subtle"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold text-primary mb-6 flex items-center">
              <StarIcon className="w-6 h-6 mr-2 text-gold" />
              Top Curators
            </h2>
            
            <div className="space-y-6">
              {topCurators.map((curator) => (
                <div key={curator.id} className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-normal cursor-pointer">
                  <img 
                    src={curator.avatar} 
                    alt={curator.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-primary">{curator.name}</h3>
                    <p className="text-sm text-secondary">{curator.specialty}</p>
                    <div className="flex items-center space-x-4 mt-1 text-xs text-secondary">
                      <span>{curator.followers} followers</span>
                      <span>{curator.collections} collections</span>
                      <div className="flex items-center">
                        <StarIcon className="w-3 h-3 text-gold fill-current mr-1" />
                        <span>{curator.rating}</span>
                      </div>
                    </div>
                  </div>
                  <button className="btn-secondary px-4 py-2 text-sm rounded-full">
                    Follow
                  </button>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <button className="text-accent font-medium hover:text-blue-600 transition-colors duration-normal">
                View All Curators →
              </button>
            </div>
          </motion.section>

          {/* Recent Discussions */}
          <motion.section
            className="bg-white rounded-xl p-8 shadow-subtle"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-xl font-semibold text-primary mb-6 flex items-center">
              <ChatBubbleLeftRightIcon className="w-6 h-6 mr-2 text-accent" />
              Recent Discussions
            </h2>
            
            <div className="space-y-6">
              {recentDiscussions.map((discussion) => (
                <div key={discussion.id} className="p-4 rounded-lg hover:bg-gray-50 transition-colors duration-normal cursor-pointer">
                  <h3 className="font-semibold text-primary mb-2 hover:text-accent transition-colors duration-normal">
                    {discussion.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-secondary">
                    <div className="flex items-center space-x-4">
                      <span>by {discussion.author}</span>
                      <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                        {discussion.category.replace('-', ' ')}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>{discussion.replies} replies</span>
                      <span>•</span>
                      <span>{discussion.lastActivity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <button className="text-accent font-medium hover:text-blue-600 transition-colors duration-normal">
                View All Discussions →
              </button>
            </div>
          </motion.section>
        </div>

        {/* Community Actions */}
        <motion.div
          className="mt-16 text-center bg-gradient-accent text-white rounded-2xl p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-section text-white mb-6">
            Ready to Join Our Community?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
            Share your discoveries, get personalized recommendations, and connect with 
            fellow connoisseurs who share your passion for quality and craftsmanship.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.button 
              className="bg-white text-accent px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-normal hover-lift"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Create Account
            </motion.button>
            
            <motion.button 
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-accent transition-all duration-normal hover-lift"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <HeartIcon className="w-5 h-5 mr-2 inline" />
              Start Curating
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default CommunityPage
