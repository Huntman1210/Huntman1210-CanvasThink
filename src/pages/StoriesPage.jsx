import { motion } from 'framer-motion'
import { HeartIcon, UserIcon, CalendarIcon } from '@heroicons/react/24/outline'

const StoriesPage = () => {
  const stories = [
    {
      id: 1,
      title: "The Art of Mindful Morning Rituals",
      excerpt: "How Maya Chen's meditation cushions are transforming how we start our days...",
      author: "Sarah Chen",
      date: "2025-01-20",
      image: "/api/placeholder/600/400",
      category: "mindful-living",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Sustainable Innovation That Doesn't Compromise",
      excerpt: "Meet the artisans creating beautiful products while protecting our planet...",
      author: "David Park",
      date: "2025-01-18",
      image: "/api/placeholder/600/400",
      category: "sustainable-innovation",
      readTime: "8 min read"
    }
  ]

  return (
    <div className="min-h-screen py-8" data-track-section="stories">
      <div className="container-responsive">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-hero mb-6">
            Stories Behind the Craft
            <HeartIcon className="inline-block w-10 h-10 ml-3 text-gold" />
          </h1>
          <p className="text-xl text-secondary max-w-4xl mx-auto">
            Every product has a story. Meet the artisans, discover the processes, 
            and understand the passion that goes into creating exceptional experiences.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {stories.map((story, index) => (
            <motion.article
              key={story.id}
              className="card-interactive group overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <img 
                src={story.image} 
                alt={story.title}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-slow"
              />
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-3 text-sm text-secondary">
                  <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                    {story.category.replace('-', ' ')}
                  </span>
                  <div className="flex items-center space-x-1">
                    <CalendarIcon className="w-4 h-4" />
                    <span>{new Date(story.date).toLocaleDateString()}</span>
                  </div>
                  <span>{story.readTime}</span>
                </div>
                
                <h2 className="text-xl font-semibold text-primary mb-3 group-hover:text-accent transition-colors duration-normal">
                  {story.title}
                </h2>
                
                <p className="text-secondary mb-4">{story.excerpt}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <UserIcon className="w-4 h-4 text-secondary" />
                    <span className="text-sm text-secondary">{story.author}</span>
                  </div>
                  <button className="text-accent font-medium hover:text-blue-600 transition-colors duration-normal">
                    Read More →
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StoriesPage
