// Behavioral Pattern Recognition Service
// Implementation of advanced user interaction tracking and analysis

class BehavioralTracker {
  constructor() {
    this.sessionData = {
      sessionId: this.generateSessionId(),
      startTime: Date.now(),
      interactions: [],
      emotionalStates: [],
      navigationPattern: [],
      engagementMetrics: {
        totalTimeOnSite: 0,
        pagesVisited: 0,
        productsViewed: [],
        scrollDepth: {},
        clickPatterns: [],
        hoverBehavior: [],
        searchQueries: []
      }
    }
    
    this.isInitialized = false
    this.observers = new Map()
  }

  generateSessionId() {
    return 'ct_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
  }

  initializeBehavioralTracking() {
    if (this.isInitialized) return
    
    console.log('🧠 Initializing CanvasThink Behavioral Pattern Recognition...')
    
    // Track page views and navigation patterns
    this.trackPageViews()
    
    // Track scroll behavior and engagement
    this.trackScrollBehavior()
    
    // Track mouse movements and hover patterns
    this.trackMouseBehavior()
    
    // Track click patterns and interaction timing
    this.trackClickBehavior()
    
    // Track time spent on different sections
    this.trackTimeOnSections()
    
    // Track form interactions and abandonment
    this.trackFormBehavior()
    
    // Track search behavior and intent
    this.trackSearchBehavior()
    
    this.isInitialized = true
    console.log('✅ Behavioral tracking initialized successfully')
  }

  trackPageViews() {
    // Track initial page load
    this.recordInteraction('page_view', {
      path: window.location.pathname,
      timestamp: Date.now(),
      referrer: document.referrer,
      userAgent: navigator.userAgent
    })

    // Track route changes in SPA
    const originalPushState = history.pushState
    const originalReplaceState = history.replaceState
    
    history.pushState = (...args) => {
      originalPushState.apply(history, args)
      this.recordPageView()
    }
    
    history.replaceState = (...args) => {
      originalReplaceState.apply(history, args)
      this.recordPageView()
    }
    
    window.addEventListener('popstate', () => {
      setTimeout(() => this.recordPageView(), 0)
    })
  }

  recordPageView() {
    this.sessionData.engagementMetrics.pagesVisited++
    this.sessionData.navigationPattern.push({
      path: window.location.pathname,
      timestamp: Date.now(),
      timeFromPrevious: this.getTimeSinceLastInteraction()
    })
    
    this.recordInteraction('navigation', {
      path: window.location.pathname,
      sequence: this.sessionData.engagementMetrics.pagesVisited
    })
  }

  trackScrollBehavior() {
    let maxScrollDepth = 0
    let scrollStartTime = Date.now()
    let isScrolling = false
    let scrollTimeout

    const trackScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      )
      
      maxScrollDepth = Math.max(maxScrollDepth, scrollPercent)
      
      if (!isScrolling) {
        isScrolling = true
        scrollStartTime = Date.now()
      }
      
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        isScrolling = false
        this.recordInteraction('scroll_session', {
          maxDepth: maxScrollDepth,
          duration: Date.now() - scrollStartTime,
          path: window.location.pathname
        })
      }, 150)
    }

    window.addEventListener('scroll', trackScroll, { passive: true })
    
    // Track scroll depth milestones
    const milestones = [25, 50, 75, 90, 100]
    milestones.forEach(milestone => {
      let reached = false
      window.addEventListener('scroll', () => {
        const scrollPercent = Math.round(
          (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        )
        if (scrollPercent >= milestone && !reached) {
          reached = true
          this.recordInteraction('scroll_milestone', {
            milestone: milestone,
            path: window.location.pathname,
            timeToReach: Date.now() - this.sessionData.startTime
          })
        }
      }, { passive: true })
    })
  }

  trackMouseBehavior() {
    let mouseTrail = []
    let hoverStartTime = null
    let lastHoveredElement = null

    // Track mouse movement patterns
    document.addEventListener('mousemove', (e) => {
      mouseTrail.push({
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now()
      })
      
      // Keep only last 100 points to manage memory
      if (mouseTrail.length > 100) {
        mouseTrail = mouseTrail.slice(-50)
      }
    }, { passive: true })

    // Track hover behavior on products and key elements
    document.addEventListener('mouseenter', (e) => {
      const element = e.target.closest('[data-track-hover]')
      if (element) {
        hoverStartTime = Date.now()
        lastHoveredElement = element
      }
    }, true)

    document.addEventListener('mouseleave', (e) => {
      const element = e.target.closest('[data-track-hover]')
      if (element && element === lastHoveredElement && hoverStartTime) {
        const hoverDuration = Date.now() - hoverStartTime
        this.recordInteraction('hover', {
          element: element.getAttribute('data-track-hover'),
          duration: hoverDuration,
          elementText: element.textContent?.slice(0, 50),
          path: window.location.pathname
        })
        hoverStartTime = null
        lastHoveredElement = null
      }
    }, true)
  }

  trackClickBehavior() {
    document.addEventListener('click', (e) => {
      const element = e.target
      const clickData = {
        tagName: element.tagName,
        className: element.className,
        id: element.id,
        textContent: element.textContent?.slice(0, 50),
        href: element.href,
        coordinates: { x: e.clientX, y: e.clientY },
        timestamp: Date.now(),
        path: window.location.pathname
      }

      // Special tracking for product interactions
      const productCard = element.closest('[data-product-id]')
      if (productCard) {
        clickData.productId = productCard.getAttribute('data-product-id')
        clickData.interactionType = 'product_interaction'
      }

      // Track CTA clicks
      if (element.matches('button, .btn-primary, .btn-secondary, .btn-accent')) {
        clickData.interactionType = 'cta_click'
      }

      this.recordInteraction('click', clickData)
    }, true)
  }

  trackTimeOnSections() {
    const sections = document.querySelectorAll('[data-track-section]')
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const sectionName = entry.target.getAttribute('data-track-section')
        
        if (entry.isIntersecting) {
          // Start timing this section
          entry.target._startTime = Date.now()
        } else if (entry.target._startTime) {
          // Stop timing and record
          const timeSpent = Date.now() - entry.target._startTime
          this.recordInteraction('section_time', {
            section: sectionName,
            timeSpent: timeSpent,
            path: window.location.pathname
          })
          delete entry.target._startTime
        }
      })
    }, { threshold: 0.5 })

    sections.forEach(section => sectionObserver.observe(section))
    this.observers.set('sections', sectionObserver)
  }

  trackFormBehavior() {
    // Track form field interactions
    document.addEventListener('focus', (e) => {
      if (e.target.matches('input, textarea, select')) {
        this.recordInteraction('form_focus', {
          fieldType: e.target.type,
          fieldName: e.target.name,
          formId: e.target.closest('form')?.id,
          timestamp: Date.now()
        })
      }
    }, true)

    // Track form submissions
    document.addEventListener('submit', (e) => {
      const form = e.target
      this.recordInteraction('form_submit', {
        formId: form.id,
        formAction: form.action,
        fieldCount: form.elements.length,
        timestamp: Date.now()
      })
    }, true)
  }

  trackSearchBehavior() {
    // Track search queries
    document.addEventListener('input', (e) => {
      if (e.target.matches('[data-search-input]')) {
        const query = e.target.value
        if (query.length > 2) {
          this.recordInteraction('search_input', {
            query: query,
            queryLength: query.length,
            timestamp: Date.now()
          })
        }
      }
    })
  }

  recordInteraction(type, data) {
    const interaction = {
      type,
      data,
      timestamp: Date.now(),
      sessionTime: Date.now() - this.sessionData.startTime
    }
    
    this.sessionData.interactions.push(interaction)
    
    // Analyze patterns in real-time
    this.analyzePatterns()
    
    // Send to analytics if needed
    this.sendToAnalytics(interaction)
  }

  analyzePatterns() {
    // Real-time pattern analysis
    const recentInteractions = this.sessionData.interactions.slice(-10)
    
    // Detect rapid clicking (potential frustration)
    const recentClicks = recentInteractions.filter(i => i.type === 'click')
    if (recentClicks.length >= 3) {
      const timeDiff = recentClicks[recentClicks.length - 1].timestamp - recentClicks[0].timestamp
      if (timeDiff < 2000) {
        this.detectEmotionalState('frustrated')
      }
    }
    
    // Detect long hover without click (potential hesitation)
    const longHovers = recentInteractions.filter(i => i.type === 'hover' && i.data.duration > 3000)
    if (longHovers.length > 0) {
      this.detectEmotionalState('contemplative')
    }
    
    // Detect high scroll activity (potential engagement)
    const scrollActivity = recentInteractions.filter(i => i.type === 'scroll_session')
    if (scrollActivity.length > 0 && scrollActivity[0].data.maxDepth > 75) {
      this.detectEmotionalState('engaged')
    }
  }

  detectEmotionalState(state) {
    this.sessionData.emotionalStates.push({
      state,
      timestamp: Date.now(),
      confidence: 0.8, // This would be calculated based on multiple factors
      context: window.location.pathname
    })
    
    // Trigger personalization adjustments
    this.triggerPersonalization(state)
  }

  triggerPersonalization(emotionalState) {
    // Emit custom event for real-time personalization
    window.dispatchEvent(new CustomEvent('canvasthink:emotional-state', {
      detail: { state: emotionalState, timestamp: Date.now() }
    }))
  }

  getTimeSinceLastInteraction() {
    const lastInteraction = this.sessionData.interactions[this.sessionData.interactions.length - 1]
    return lastInteraction ? Date.now() - lastInteraction.timestamp : 0
  }

  sendToAnalytics(interaction) {
    // In production, send to analytics service
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Behavioral interaction:', interaction)
    }
  }

  getSessionSummary() {
    return {
      sessionId: this.sessionData.sessionId,
      totalInteractions: this.sessionData.interactions.length,
      sessionDuration: Date.now() - this.sessionData.startTime,
      emotionalJourney: this.sessionData.emotionalStates,
      engagementScore: this.calculateEngagementScore(),
      behaviorProfile: this.generateBehaviorProfile()
    }
  }

  calculateEngagementScore() {
    const interactions = this.sessionData.interactions.length
    const timeSpent = Date.now() - this.sessionData.startTime
    const pagesVisited = this.sessionData.engagementMetrics.pagesVisited
    
    // Weighted engagement score (0-100)
    return Math.min(100, Math.round(
      (interactions * 2) + 
      (timeSpent / 1000 * 0.1) + 
      (pagesVisited * 5)
    ))
  }

  generateBehaviorProfile() {
    const interactions = this.sessionData.interactions
    
    return {
      explorationStyle: this.determineExplorationStyle(interactions),
      decisionSpeed: this.calculateDecisionSpeed(interactions),
      interactionPreference: this.determineInteractionPreference(interactions),
      contentPreference: this.analyzeContentPreference(interactions)
    }
  }

  determineExplorationStyle(interactions) {
    const navigationCount = interactions.filter(i => i.type === 'navigation').length
    const hoverCount = interactions.filter(i => i.type === 'hover').length
    
    if (navigationCount > 5) return 'browser'
    if (hoverCount > 10) return 'examiner'
    return 'focused'
  }

  calculateDecisionSpeed(interactions) {
    const clickInteractions = interactions.filter(i => i.type === 'click')
    if (clickInteractions.length < 2) return 'unknown'
    
    const avgTimeBetweenClicks = clickInteractions.reduce((acc, curr, index) => {
      if (index === 0) return acc
      return acc + (curr.timestamp - clickInteractions[index - 1].timestamp)
    }, 0) / (clickInteractions.length - 1)
    
    if (avgTimeBetweenClicks < 2000) return 'fast'
    if (avgTimeBetweenClicks > 10000) return 'deliberate'
    return 'moderate'
  }

  determineInteractionPreference(interactions) {
    const hoverCount = interactions.filter(i => i.type === 'hover').length
    const clickCount = interactions.filter(i => i.type === 'click').length
    
    if (hoverCount > clickCount * 2) return 'hover-heavy'
    if (clickCount > hoverCount * 2) return 'click-heavy'
    return 'balanced'
  }

  analyzeContentPreference(interactions) {
    const productViews = interactions.filter(i => 
      i.data.productId || i.data.interactionType === 'product_interaction'
    ).length
    
    const communityInteractions = interactions.filter(i => 
      i.data.path?.includes('/community') || 
      i.data.path?.includes('/stories')
    ).length
    
    if (productViews > communityInteractions * 2) return 'product-focused'
    if (communityInteractions > productViews) return 'community-focused'
    return 'balanced'
  }
}

// Create global instance
const behavioralTracker = new BehavioralTracker()

// Export initialization function
export const initializeBehavioralTracking = () => {
  behavioralTracker.initializeBehavioralTracking()
}

// Export tracker instance for advanced usage
export { behavioralTracker }

// Export utility functions
export const trackProductView = (productId, productData) => {
  behavioralTracker.recordInteraction('product_view', {
    productId,
    ...productData,
    path: window.location.pathname
  })
}

export const trackPurchaseIntent = (productId, action) => {
  behavioralTracker.recordInteraction('purchase_intent', {
    productId,
    action, // 'add_to_cart', 'add_to_wishlist', 'checkout_start'
    timestamp: Date.now()
  })
}

export const getSessionSummary = () => {
  return behavioralTracker.getSessionSummary()
}
