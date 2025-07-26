import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  HeartIcon,
  ShoppingBagIcon,
  LightBulbIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import { getCurrentEmotion, getEmotionalInsights } from '../../services/emotionalRecognition'

const ConciergeChat = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [conciergePersonality, setConciergePersonality] = useState('empathetic')
  const [userEmotionalState, setUserEmotionalState] = useState(null)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Initialize concierge with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setTimeout(() => {
        const welcomeMessage = generateWelcomeMessage()
        setMessages([{
          id: Date.now(),
          type: 'concierge',
          content: welcomeMessage,
          timestamp: Date.now(),
          emotionalContext: getCurrentEmotion()
        }])
      }, 1000)
    }
  }, [])

  // Listen for emotional state changes
  useEffect(() => {
    const handleEmotionalUpdate = (e) => {
      setUserEmotionalState(e.detail)
      adaptConciergePersonality(e.detail.state)
    }

    window.addEventListener('canvasthink:emotional-state', handleEmotionalUpdate)
    return () => window.removeEventListener('canvasthink:emotional-state', handleEmotionalUpdate)
  }, [])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const generateWelcomeMessage = () => {
    const currentEmotion = getCurrentEmotion()
    const emotionalInsights = getEmotionalInsights()
    
    const welcomeMessages = {
      curious: "Hello! I can sense you're exploring something wonderful. I'm here to help you discover products that will truly delight you. What kind of experience are you looking for today?",
      contemplative: "Hi there! I notice you're taking your time to consider your options - I love that thoughtful approach. Let's find something that perfectly matches what you have in mind.",
      frustrated: "Hello! I'm here to make your experience smoother and more enjoyable. Let me help you find exactly what you're looking for without any hassle.",
      engaged: "Welcome! Your enthusiasm is wonderful to see. I'm excited to help you discover some truly special products that align with your interests.",
      deciding: "Hi! I can see you're weighing your options carefully. I'm here to provide any insights or information that might help you make the perfect choice.",
      default: "Welcome to CanvasThink! I'm your personal concierge, here to help you discover products that will bring joy to your life. How can I assist you today?"
    }

    const emotionKey = currentEmotion?.state || 'default'
    return welcomeMessages[emotionKey] || welcomeMessages.default
  }

  const adaptConciergePersonality = (emotionalState) => {
    const personalityMap = {
      frustrated: 'supportive',
      contemplative: 'thoughtful', 
      curious: 'enthusiastic',
      rushed: 'efficient',
      hesitant: 'reassuring',
      confident: 'collaborative'
    }
    
    const newPersonality = personalityMap[emotionalState] || 'empathetic'
    setConciergePersonality(newPersonality)
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: Date.now(),
      emotionalContext: getCurrentEmotion()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Generate concierge response
    setTimeout(async () => {
      const response = await generateConciergeResponse(inputValue, userMessage.emotionalContext)
      const conciergeMessage = {
        id: Date.now() + 1,
        type: 'concierge',
        content: response.content,
        timestamp: Date.now(),
        suggestions: response.suggestions,
        productRecommendations: response.productRecommendations,
        emotionalContext: getCurrentEmotion()
      }

      setMessages(prev => [...prev, conciergeMessage])
      setIsTyping(false)
    }, 1500 + Math.random() * 1000) // Simulate natural response time
  }

  const generateConciergeResponse = async (userInput, emotionalContext) => {
    // Advanced NLP and personalization logic
    const inputLower = userInput.toLowerCase()
    const currentEmotion = emotionalContext?.state || 'neutral'
    
    // Intent detection
    const intents = detectUserIntent(inputLower)
    
    // Generate contextual response based on intent and emotional state
    const response = {
      content: '',
      suggestions: [],
      productRecommendations: []
    }

    if (intents.includes('greeting')) {
      response.content = generateGreetingResponse(currentEmotion)
    } else if (intents.includes('product_search')) {
      response.content = generateProductSearchResponse(inputLower, currentEmotion)
      response.productRecommendations = await generateProductRecommendations(inputLower, currentEmotion)
    } else if (intents.includes('gift_help')) {
      response.content = generateGiftHelpResponse(inputLower, currentEmotion)
      response.suggestions = generateGiftSuggestions(inputLower)
    } else if (intents.includes('category_inquiry')) {
      response.content = generateCategoryResponse(inputLower, currentEmotion)
      response.suggestions = generateCategorySuggestions()
    } else if (intents.includes('help_request')) {
      response.content = generateHelpResponse(currentEmotion)
      response.suggestions = generateHelpSuggestions()
    } else {
      response.content = generateContextualResponse(inputLower, currentEmotion)
      response.suggestions = generateSmartSuggestions(inputLower, currentEmotion)
    }

    return response
  }

  const detectUserIntent = (input) => {
    const intents = []
    
    // Greeting patterns
    if (/^(hi|hello|hey|good morning|good afternoon)/i.test(input)) {
      intents.push('greeting')
    }
    
    // Product search patterns
    if (/(looking for|need|want|find|search|show me)/i.test(input)) {
      intents.push('product_search')
    }
    
    // Gift-related patterns
    if (/(gift|present|birthday|anniversary|valentine|christmas|holiday)/i.test(input)) {
      intents.push('gift_help')
    }
    
    // Category inquiries
    if (/(category|section|type|kind of products)/i.test(input)) {
      intents.push('category_inquiry')
    }
    
    // Help requests
    if (/(help|assist|support|confused|don't know)/i.test(input)) {
      intents.push('help_request')
    }

    return intents
  }

  const generateGreetingResponse = (emotion) => {
    const responses = {
      curious: "Hello! Your curiosity is wonderful - it means you're open to discovering something truly special. What's caught your interest today?",
      frustrated: "Hi there! I'm here to make things easier for you. Let's find what you need without any stress.",
      contemplative: "Hello! I appreciate that you're taking a thoughtful approach. What would you like to explore together?",
      default: "Hello! I'm delighted to help you discover something wonderful today. What can I help you with?"
    }
    
    return responses[emotion] || responses.default
  }

  const generateProductSearchResponse = (input, emotion) => {
    const personalityResponses = {
      supportive: "I'd love to help you find that! Let me understand exactly what you're looking for so I can show you our most perfect matches.",
      thoughtful: "Great question! Let's think through this together. I want to make sure I understand your needs completely before making recommendations.",
      enthusiastic: "How exciting! I have some amazing ideas for you. Let me share some curated options that I think you'll absolutely love.",
      efficient: "Perfect! I can help you find that quickly. Here are the key options that match what you're describing.",
      default: "I'd be happy to help you find that! Let me show you some carefully curated options that match what you're looking for."
    }
    
    return personalityResponses[conciergePersonality] || personalityResponses.default
  }

  const generateProductRecommendations = async (input, emotion) => {
    // In a real implementation, this would call the curation API
    // For now, return mock recommendations based on input
    const keywords = extractKeywords(input)
    
    return [
      {
        id: 1,
        name: "Mindful Morning Coffee Set",
        category: "mindful-living",
        whyItMatters: "Transform your morning routine into a moment of pure mindfulness",
        price: 89,
        image: "/api/placeholder/200/200",
        emotionalResonance: emotion
      },
      {
        id: 2,
        name: "Artisan Ceramic Collection",
        category: "creative-pursuits", 
        whyItMatters: "Each piece tells a story of craftsmanship and creative passion",
        price: 156,
        image: "/api/placeholder/200/200",
        emotionalResonance: emotion
      }
    ]
  }

  const extractKeywords = (input) => {
    // Simple keyword extraction - in production would use more sophisticated NLP
    const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'i', 'you', 'me', 'my', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should']
    return input.split(' ').filter(word => !commonWords.includes(word.toLowerCase()) && word.length > 2)
  }

  const generateGiftHelpResponse = (input, emotion) => {
    return "Gift-giving is such a beautiful way to show you care! I'd love to help you find something truly special. Tell me a bit about the person you're shopping for - what brings them joy?"
  }

  const generateSmartSuggestions = (input, emotion) => {
    const suggestions = [
      "Show me trending products",
      "Help me find a gift",
      "What's new in Mindful Living?",
      "Browse Creative Pursuits"
    ]
    
    // Personalize based on emotional state
    if (emotion === 'curious') {
      suggestions.unshift("Surprise me with something unique")
    } else if (emotion === 'frustrated') {
      suggestions.unshift("Show me your most popular items")
    } else if (emotion === 'contemplative') {
      suggestions.unshift("Help me compare options")
    }
    
    return suggestions.slice(0, 3)
  }

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion)
    setTimeout(() => handleSendMessage(), 100)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-enhanced transition-all duration-normal ${
          isOpen ? 'bg-gray-600' : 'bg-accent hover:bg-blue-600'
        }`}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open CanvasThink Concierge"
      >
        {isOpen ? (
          <XMarkIcon className="w-6 h-6 text-white mx-auto" />
        ) : (
          <ChatBubbleLeftRightIcon className="w-6 h-6 text-white mx-auto" />
        )}
      </motion.button>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-40 w-96 h-[500px] bg-white rounded-xl shadow-enhanced border border-gray-200 flex flex-col overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {/* Header */}
            <div className="bg-gradient-accent text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <SparklesIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">CanvasThink Concierge</h3>
                  <p className="text-xs opacity-90">
                    {conciergePersonality.charAt(0).toUpperCase() + conciergePersonality.slice(1)} Assistant
                  </p>
                </div>
              </div>
              {userEmotionalState && (
                <div className="text-xs opacity-75">
                  {userEmotionalState.state}
                </div>
              )}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} onSuggestionClick={handleSuggestionClick} />
              ))}
              
              {isTyping && (
                <motion.div
                  className="flex space-x-2 items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="bg-gray-100 rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about our products..."
                  className="flex-1 input-field py-2 px-3 text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="btn-accent px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <PaperAirplaneIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

const MessageBubble = ({ message, onSuggestionClick }) => {
  const isUser = message.type === 'user'
  
  return (
    <motion.div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`max-w-xs px-4 py-2 rounded-lg ${
        isUser 
          ? 'bg-accent text-white' 
          : 'bg-gray-100 text-gray-900'
      }`}>
        <p className="text-sm leading-relaxed">{message.content}</p>
        
        {/* Product recommendations */}
        {message.productRecommendations && message.productRecommendations.length > 0 && (
          <div className="mt-3 space-y-2">
            {message.productRecommendations.map((product) => (
              <div key={product.id} className="bg-white rounded-md p-2 border border-gray-200">
                <h4 className="text-xs font-medium text-gray-900">{product.name}</h4>
                <p className="text-xs text-gray-600 mt-1">{product.whyItMatters}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs font-medium text-accent">${product.price}</span>
                  <button className="text-xs text-accent hover:text-blue-600 font-medium">
                    View →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Suggestions */}
        {message.suggestions && message.suggestions.length > 0 && (
          <div className="mt-3 space-y-1">
            {message.suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => onSuggestionClick(suggestion)}
                className="block w-full text-left text-xs bg-white/20 hover:bg-white/30 rounded px-2 py-1 transition-colors duration-fast"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
        
        <div className={`text-xs mt-2 opacity-75 ${
          isUser ? 'text-white/70' : 'text-gray-500'
        }`}>
          {new Date(message.timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
    </motion.div>
  )
}

export default ConciergeChat
