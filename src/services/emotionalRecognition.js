// Enhanced ER-AI: Emotional Recognition AI System
// Revolutionary empathic commerce platform implementation

class EmotionalRecognitionAI {
  constructor() {
    this.emotionalStates = {
      CURIOUS: 'curious',
      ENGAGED: 'engaged', 
      DECIDING: 'deciding',
      FRUSTRATED: 'frustrated',
      CONTEMPLATIVE: 'contemplative',
      DELIGHTED: 'delighted',
      CONFIDENT: 'confident',
      HESITANT: 'hesitant',
      RUSHED: 'rushed',
      RELAXED: 'relaxed'
    }
    
    this.currentEmotionalState = null
    this.emotionalHistory = []
    this.personalizedSettings = {}
    this.adaptationRules = new Map()
    this.isInitialized = false
    
    // Real-time personalization cache
    this.personalizationCache = {
      uiAdaptations: {},
      contentPriorities: {},
      interactionStyles: {}
    }
  }

  initializeEmotionalRecognition() {
    if (this.isInitialized) return
    
    console.log('❤️ Initializing CanvasThink Enhanced ER-AI System...')
    
    // Set up micro-emotional detection
    this.setupMicroEmotionalDetection()
    
    // Initialize behavioral correlation analysis
    this.initializeBehavioralCorrelation()
    
    // Setup real-time UI adaptation system
    this.setupRealTimeUIAdaptation()
    
    // Initialize predictive emotional modeling
    this.initializePredictiveModeling()
    
    // Setup cross-session emotional continuity
    this.setupEmotionalContinuity()
    
    this.isInitialized = true
    console.log('✅ Enhanced ER-AI system initialized successfully')
  }

  setupMicroEmotionalDetection() {
    // Advanced micro-interaction analysis
    const microInteractionPatterns = {
      // Mouse behavior patterns
      mousePatterns: {
        hesitant: { velocity: 'slow', direction: 'erratic', pauses: 'frequent' },
        confident: { velocity: 'steady', direction: 'direct', pauses: 'minimal' },
        curious: { velocity: 'variable', direction: 'exploratory', pauses: 'strategic' }
      },
      
      // Scroll behavior patterns
      scrollPatterns: {
        engaged: { speed: 'moderate', depth: 'high', backtrack: 'minimal' },
        frustrated: { speed: 'rapid', depth: 'shallow', backtrack: 'frequent' },
        contemplative: { speed: 'slow', depth: 'deep', backtrack: 'purposeful' }
      },
      
      // Click patterns
      clickPatterns: {
        rushed: { frequency: 'high', precision: 'low', timing: 'rapid' },
        deliberate: { frequency: 'low', precision: 'high', timing: 'measured' },
        exploring: { frequency: 'moderate', precision: 'variable', timing: 'spaced' }
      }
    }

    // Listen for behavioral pattern events
    window.addEventListener('canvasthink:behavioral-pattern', (e) => {
      this.analyzeMicroEmotions(e.detail)
    })
    
    // Set up advanced gesture recognition
    this.setupGestureRecognition()
  }

  setupGestureRecognition() {
    let mouseTrail = []
    let gestureStartTime = null
    
    document.addEventListener('mousedown', (e) => {
      gestureStartTime = Date.now()
      mouseTrail = [{ x: e.clientX, y: e.clientY, timestamp: Date.now() }]
    })
    
    document.addEventListener('mousemove', (e) => {
      if (gestureStartTime) {
        mouseTrail.push({ x: e.clientX, y: e.clientY, timestamp: Date.now() })
        
        // Analyze gesture patterns in real-time
        if (mouseTrail.length > 5) {
          this.analyzeGesturePattern(mouseTrail.slice(-5))
        }
      }
    })
    
    document.addEventListener('mouseup', (e) => {
      if (gestureStartTime && mouseTrail.length > 3) {
        const gestureDuration = Date.now() - gestureStartTime
        this.analyzeCompleteGesture(mouseTrail, gestureDuration)
      }
      gestureStartTime = null
      mouseTrail = []
    })
  }

  analyzeGesturePattern(recentPoints) {
    // Calculate velocity and acceleration
    const velocities = this.calculateVelocities(recentPoints)
    const avgVelocity = velocities.reduce((a, b) => a + b, 0) / velocities.length
    
    // Detect emotional indicators from movement patterns
    if (avgVelocity > 500) {
      this.updateEmotionalState(this.emotionalStates.RUSHED, 0.7)
    } else if (avgVelocity < 100) {
      this.updateEmotionalState(this.emotionalStates.CONTEMPLATIVE, 0.6)
    }
    
    // Analyze movement smoothness (frustration indicator)
    const smoothness = this.calculateSmoothness(recentPoints)
    if (smoothness < 0.3) {
      this.updateEmotionalState(this.emotionalStates.FRUSTRATED, 0.8)
    }
  }

  calculateVelocities(points) {
    const velocities = []
    for (let i = 1; i < points.length; i++) {
      const dx = points[i].x - points[i-1].x
      const dy = points[i].y - points[i-1].y
      const dt = points[i].timestamp - points[i-1].timestamp
      const velocity = Math.sqrt(dx*dx + dy*dy) / (dt || 1)
      velocities.push(velocity)
    }
    return velocities
  }

  calculateSmoothness(points) {
    if (points.length < 3) return 1
    
    let totalDirectionChange = 0
    for (let i = 2; i < points.length; i++) {
      const angle1 = Math.atan2(points[i-1].y - points[i-2].y, points[i-1].x - points[i-2].x)
      const angle2 = Math.atan2(points[i].y - points[i-1].y, points[i].x - points[i-1].x)
      let angleDiff = Math.abs(angle2 - angle1)
      if (angleDiff > Math.PI) angleDiff = 2 * Math.PI - angleDiff
      totalDirectionChange += angleDiff
    }
    
    return 1 - (totalDirectionChange / (Math.PI * (points.length - 2)))
  }

  initializeBehavioralCorrelation() {
    // Correlate behavioral patterns with emotional states
    const correlationRules = {
      // High hover-to-click ratio suggests contemplation
      contemplativeIndicators: [
        { pattern: 'high_hover_low_click', threshold: 0.7, emotion: this.emotionalStates.CONTEMPLATIVE },
        { pattern: 'long_page_time', threshold: 30000, emotion: this.emotionalStates.ENGAGED },
        { pattern: 'deep_scroll', threshold: 0.8, emotion: this.emotionalStates.CURIOUS }
      ],
      
      // Rapid interactions suggest urgency or frustration
      urgencyIndicators: [
        { pattern: 'rapid_clicks', threshold: 5, emotion: this.emotionalStates.RUSHED },
        { pattern: 'quick_navigation', threshold: 2000, emotion: this.emotionalStates.FRUSTRATED },
        { pattern: 'repeated_actions', threshold: 3, emotion: this.emotionalStates.FRUSTRATED }
      ],
      
      // Exploration patterns suggest curiosity
      explorationIndicators: [
        { pattern: 'category_browsing', threshold: 3, emotion: this.emotionalStates.CURIOUS },
        { pattern: 'product_comparison', threshold: 2, emotion: this.emotionalStates.DECIDING },
        { pattern: 'wishlist_additions', threshold: 1, emotion: this.emotionalStates.ENGAGED }
      ]
    }
    
    // Listen for behavioral tracking events
    window.addEventListener('canvasthink:behavioral-interaction', (e) => {
      this.correlateBehaviorWithEmotion(e.detail, correlationRules)
    })
  }

  correlateBehaviorWithEmotion(behaviorData, rules) {
    // Analyze behavior patterns against emotional indicators
    Object.entries(rules).forEach(([category, indicators]) => {
      indicators.forEach(indicator => {
        if (this.matchesPattern(behaviorData, indicator.pattern, indicator.threshold)) {
          this.updateEmotionalState(indicator.emotion, 0.75)
        }
      })
    })
  }

  matchesPattern(data, pattern, threshold) {
    switch (pattern) {
      case 'high_hover_low_click':
        return (data.hoverCount || 0) / Math.max(data.clickCount || 1, 1) > threshold
      case 'long_page_time':
        return (data.timeOnPage || 0) > threshold
      case 'deep_scroll':
        return (data.scrollDepth || 0) > threshold
      case 'rapid_clicks':
        return (data.clicksPerMinute || 0) > threshold
      default:
        return false
    }
  }

  setupRealTimeUIAdaptation() {
    // Real-time UI adaptation based on emotional state
    this.adaptationRules.set(this.emotionalStates.FRUSTRATED, {
      ui: {
        simplifyNavigation: true,
        highlightHelp: true,
        reduceChoices: true,
        showProgress: true
      },
      content: {
        prioritizePopular: true,
        showReviews: true,
        emphasizeGuarantees: true
      },
      interactions: {
        largerClickTargets: true,
        clearer_ctas: true,
        reduceSteps: true
      }
    })
    
    this.adaptationRules.set(this.emotionalStates.CONTEMPLATIVE, {
      ui: {
        showMoreDetails: true,
        enableComparisons: true,
        highlightSpecs: true
      },
      content: {
        showDetailedInfo: true,
        prioritizeEducational: true,
        showRelatedProducts: true
      },
      interactions: {
        allowTakeTime: true,
        saveForLater: true,
        showProgressSave: true
      }
    })
    
    this.adaptationRules.set(this.emotionalStates.CURIOUS, {
      ui: {
        showDiscovery: true,
        highlightNew: true,
        enableExploration: true
      },
      content: {
        showCurated: true,
        prioritizeStories: true,
        showCategories: true
      },
      interactions: {
        encourageExploration: true,
        showSimilar: true,
        enableBrowsing: true
      }
    })
    
    this.adaptationRules.set(this.emotionalStates.DECIDING, {
      ui: {
        showComparison: true,
        highlightDifferences: true,
        showDecisionSupport: true
      },
      content: {
        prioritizeKeyBenefits: true,
        showSocialProof: true,
        highlightValue: true
      },
      interactions: {
        simplifyChoice: true,
        showRecommendations: true,
        enableQuickDecision: true
      }
    })
  }

  updateEmotionalState(newState, confidence = 0.8) {
    const previousState = this.currentEmotionalState
    
    // Update current state
    this.currentEmotionalState = {
      state: newState,
      confidence: confidence,
      timestamp: Date.now(),
      context: {
        path: window.location.pathname,
        previousState: previousState?.state,
        sessionTime: Date.now() - (window.canvasThinkSession?.startTime || Date.now())
      }
    }
    
    // Add to emotional history
    this.emotionalHistory.push(this.currentEmotionalState)
    
    // Keep history manageable
    if (this.emotionalHistory.length > 50) {
      this.emotionalHistory = this.emotionalHistory.slice(-25)
    }
    
    // Trigger real-time adaptations
    this.triggerRealTimeAdaptations(newState, confidence)
    
    // Log emotional state change
    console.log(`🧠 Emotional state updated: ${newState} (confidence: ${confidence})`)
  }

  triggerRealTimeAdaptations(emotionalState, confidence) {
    // Only adapt if confidence is high enough
    if (confidence < 0.6) return
    
    const adaptations = this.adaptationRules.get(emotionalState)
    if (!adaptations) return
    
    // Apply UI adaptations
    this.applyUIAdaptations(adaptations.ui)
    
    // Apply content adaptations  
    this.applyContentAdaptations(adaptations.content)
    
    // Apply interaction adaptations
    this.applyInteractionAdaptations(adaptations.interactions)
    
    // Emit adaptation event for components to respond
    window.dispatchEvent(new CustomEvent('canvasthink:emotional-adaptation', {
      detail: {
        emotionalState,
        adaptations,
        confidence,
        timestamp: Date.now()
      }
    }))
  }

  applyUIAdaptations(uiAdaptations) {
    Object.entries(uiAdaptations).forEach(([adaptation, enabled]) => {
      if (!enabled) return
      
      switch (adaptation) {
        case 'simplifyNavigation':
          document.body.classList.add('ct-simplified-nav')
          break
        case 'highlightHelp':
          document.body.classList.add('ct-highlight-help')
          break
        case 'showMoreDetails':
          document.body.classList.add('ct-detailed-view')
          break
        case 'largerClickTargets':
          document.body.classList.add('ct-large-targets')
          break
        case 'showDiscovery':
          document.body.classList.add('ct-discovery-mode')
          break
      }
    })
  }

  applyContentAdaptations(contentAdaptations) {
    // Content prioritization based on emotional state
    const contentEvent = new CustomEvent('canvasthink:content-adaptation', {
      detail: { adaptations: contentAdaptations, timestamp: Date.now() }
    })
    window.dispatchEvent(contentEvent)
  }

  applyInteractionAdaptations(interactionAdaptations) {
    // Interaction behavior modifications
    const interactionEvent = new CustomEvent('canvasthink:interaction-adaptation', {
      detail: { adaptations: interactionAdaptations, timestamp: Date.now() }
    })
    window.dispatchEvent(interactionEvent)
  }

  initializePredictiveModeling() {
    // Predictive emotional trajectory modeling
    setInterval(() => {
      this.analyzePredictiveTrajectory()
    }, 5000) // Analyze every 5 seconds
  }

  analyzePredictiveTrajectory() {
    if (this.emotionalHistory.length < 3) return
    
    const recentStates = this.emotionalHistory.slice(-5)
    const trajectory = this.calculateEmotionalTrajectory(recentStates)
    
    // Predict next likely emotional state
    const prediction = this.predictNextEmotionalState(trajectory)
    
    if (prediction.confidence > 0.7) {
      // Preemptively prepare adaptations
      this.preparePreemptiveAdaptations(prediction.predictedState)
    }
  }

  calculateEmotionalTrajectory(states) {
    const stateFrequency = {}
    const stateTransitions = []
    
    states.forEach((state, index) => {
      stateFrequency[state.state] = (stateFrequency[state.state] || 0) + 1
      
      if (index > 0) {
        const transition = `${states[index-1].state}->${state.state}`
        stateTransitions.push(transition)
      }
    })
    
    return {
      dominantState: Object.keys(stateFrequency).reduce((a, b) => 
        stateFrequency[a] > stateFrequency[b] ? a : b
      ),
      transitions: stateTransitions,
      trend: this.calculateTrend(states)
    }
  }

  calculateTrend(states) {
    // Analyze if emotional state is improving, declining, or stable
    const positiveStates = [this.emotionalStates.ENGAGED, this.emotionalStates.DELIGHTED, this.emotionalStates.CONFIDENT]
    const negativeStates = [this.emotionalStates.FRUSTRATED, this.emotionalStates.HESITANT]
    
    let trendScore = 0
    states.forEach((state, index) => {
      const weight = index + 1 // More recent states have higher weight
      
      if (positiveStates.includes(state.state)) {
        trendScore += weight
      } else if (negativeStates.includes(state.state)) {
        trendScore -= weight
      }
    })
    
    if (trendScore > 3) return 'improving'
    if (trendScore < -3) return 'declining'
    return 'stable'
  }

  predictNextEmotionalState(trajectory) {
    // Simple prediction based on patterns
    const transitionProbabilities = {
      [this.emotionalStates.CURIOUS]: {
        [this.emotionalStates.ENGAGED]: 0.7,
        [this.emotionalStates.CONTEMPLATIVE]: 0.2,
        [this.emotionalStates.FRUSTRATED]: 0.1
      },
      [this.emotionalStates.CONTEMPLATIVE]: {
        [this.emotionalStates.DECIDING]: 0.6,
        [this.emotionalStates.FRUSTRATED]: 0.2,
        [this.emotionalStates.CONFIDENT]: 0.2
      },
      [this.emotionalStates.DECIDING]: {
        [this.emotionalStates.CONFIDENT]: 0.5,
        [this.emotionalStates.HESITANT]: 0.3,
        [this.emotionalStates.FRUSTRATED]: 0.2
      }
    }
    
    const currentState = this.currentEmotionalState?.state
    const probabilities = transitionProbabilities[currentState] || {}
    
    // Find most likely next state
    const predictedState = Object.keys(probabilities).reduce((a, b) => 
      probabilities[a] > probabilities[b] ? a : b
    )
    
    return {
      predictedState,
      confidence: probabilities[predictedState] || 0.5,
      reasoning: `Based on transition patterns from ${currentState}`
    }
  }

  preparePreemptiveAdaptations(predictedState) {
    // Cache adaptations for predicted state
    const adaptations = this.adaptationRules.get(predictedState)
    if (adaptations) {
      this.personalizationCache.uiAdaptations[predictedState] = adaptations.ui
      this.personalizationCache.contentPriorities[predictedState] = adaptations.content
      this.personalizationCache.interactionStyles[predictedState] = adaptations.interactions
    }
  }

  setupEmotionalContinuity() {
    // Load previous session emotional context
    const storedContext = localStorage.getItem('canvasthink-emotional-context')
    if (storedContext) {
      try {
        const context = JSON.parse(storedContext)
        this.personalizedSettings = context.personalizedSettings || {}
        
        // Apply learned preferences
        this.applyLearnedPreferences(context)
      } catch (e) {
        console.warn('Could not restore emotional context:', e)
      }
    }
    
    // Save emotional context periodically
    setInterval(() => {
      this.saveEmotionalContext()
    }, 30000) // Save every 30 seconds
    
    // Save on page unload
    window.addEventListener('beforeunload', () => {
      this.saveEmotionalContext()
    })
  }

  applyLearnedPreferences(context) {
    // Apply preferences learned from previous sessions
    if (context.preferredInteractionStyle) {
      document.body.classList.add(`ct-interaction-${context.preferredInteractionStyle}`)
    }
    
    if (context.contentPreferences) {
      window.dispatchEvent(new CustomEvent('canvasthink:apply-preferences', {
        detail: { preferences: context.contentPreferences }
      }))
    }
  }

  saveEmotionalContext() {
    const context = {
      personalizedSettings: this.personalizedSettings,
      recentEmotionalStates: this.emotionalHistory.slice(-10),
      preferredInteractionStyle: this.determinePreferredInteractionStyle(),
      contentPreferences: this.determineContentPreferences(),
      lastSession: Date.now()
    }
    
    localStorage.setItem('canvasthink-emotional-context', JSON.stringify(context))
  }

  determinePreferredInteractionStyle() {
    // Analyze interaction patterns to determine preferred style
    const styleFrequency = {}
    this.emotionalHistory.forEach(state => {
      const style = this.mapEmotionalStateToInteractionStyle(state.state)
      styleFrequency[style] = (styleFrequency[style] || 0) + 1
    })
    
    return Object.keys(styleFrequency).reduce((a, b) => 
      styleFrequency[a] > styleFrequency[b] ? a : b
    ) || 'balanced'
  }

  mapEmotionalStateToInteractionStyle(state) {
    const styleMap = {
      [this.emotionalStates.RUSHED]: 'efficient',
      [this.emotionalStates.CONTEMPLATIVE]: 'detailed',
      [this.emotionalStates.CURIOUS]: 'exploratory',
      [this.emotionalStates.CONFIDENT]: 'direct',
      [this.emotionalStates.HESITANT]: 'supportive'
    }
    
    return styleMap[state] || 'balanced'
  }

  determineContentPreferences() {
    // Analyze content interaction patterns
    return {
      prefersDetailedInfo: this.emotionalHistory.filter(s => 
        s.state === this.emotionalStates.CONTEMPLATIVE
      ).length > 3,
      prefersSocialProof: this.emotionalHistory.filter(s => 
        s.state === this.emotionalStates.HESITANT
      ).length > 2,
      prefersExploration: this.emotionalHistory.filter(s => 
        s.state === this.emotionalStates.CURIOUS
      ).length > 4
    }
  }

  // Public API methods
  getCurrentEmotionalState() {
    return this.currentEmotionalState
  }

  getEmotionalHistory() {
    return this.emotionalHistory
  }

  getPersonalizationSuggestions() {
    if (!this.currentEmotionalState) return null
    
    const adaptations = this.adaptationRules.get(this.currentEmotionalState.state)
    return {
      emotionalState: this.currentEmotionalState,
      suggestedAdaptations: adaptations,
      confidence: this.currentEmotionalState.confidence
    }
  }

  // Manual emotional state override (for testing/debugging)
  setEmotionalState(state, confidence = 0.9) {
    this.updateEmotionalState(state, confidence)
  }
}

// Create global instance
const emotionalRecognitionAI = new EmotionalRecognitionAI()

// Export initialization function
export const initializeEmotionalRecognition = () => {
  emotionalRecognitionAI.initializeEmotionalRecognition()
}

// Export AI instance for advanced usage
export { emotionalRecognitionAI }

// Export utility functions
export const getCurrentEmotion = () => {
  return emotionalRecognitionAI.getCurrentEmotionalState()
}

export const getEmotionalInsights = () => {
  return {
    currentState: emotionalRecognitionAI.getCurrentEmotionalState(),
    history: emotionalRecognitionAI.getEmotionalHistory(),
    suggestions: emotionalRecognitionAI.getPersonalizationSuggestions()
  }
}

export const triggerEmotionalEvent = (eventType, data) => {
  // Allow manual triggering of emotional events for testing
  emotionalRecognitionAI.updateEmotionalState(eventType, data.confidence || 0.8)
}

// Export emotional states enum
export const EmotionalStates = emotionalRecognitionAI.emotionalStates
