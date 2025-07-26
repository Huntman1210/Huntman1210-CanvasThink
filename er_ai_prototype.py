#!/usr/bin/env python3
"""
Emotional Resonance AI (ER-AI) Prototype for CanvasThink
A revolutionary AI system that interprets subtle behavioral cues and emotional states 
to deliver truly personalized and delightful interactions.
"""

import json
import numpy as np
import random
from datetime import datetime, timedelta
from typing import Dict, List, Tuple, Any
from dataclasses import dataclass, asdict
from enum import Enum
import math

class EmotionalState(Enum):
    """Emotional states that can be inferred from user behavior"""
    EXCITED = "excited"
    CURIOUS = "curious"
    CONTEMPLATIVE = "contemplative"
    FRUSTRATED = "frustrated"
    DELIGHTED = "delighted"
    OVERWHELMED = "overwhelmed"
    FOCUSED = "focused"
    RELAXED = "relaxed"
    INSPIRED = "inspired"
    UNCERTAIN = "uncertain"

class UserIntent(Enum):
    """User intents that can be inferred from behavioral patterns"""
    BROWSING = "browsing"
    RESEARCHING = "researching"
    COMPARING = "comparing"
    READY_TO_PURCHASE = "ready_to_purchase"
    SEEKING_INSPIRATION = "seeking_inspiration"
    PROBLEM_SOLVING = "problem_solving"
    GIFT_HUNTING = "gift_hunting"
    EXPLORING_VALUES = "exploring_values"

@dataclass
class UserInteraction:
    """Represents a single user interaction with the platform"""
    timestamp: datetime
    action: str  # click, hover, scroll, search, view, etc.
    target: str  # product_id, category, page, etc.
    duration: float  # seconds
    context: Dict[str, Any]  # additional context like device, time_of_day, etc.

@dataclass
class EmotionalProfile:
    """User's emotional profile based on behavioral analysis"""
    primary_state: EmotionalState
    secondary_state: EmotionalState
    confidence: float  # 0-1 confidence in the assessment
    triggers: List[str]  # what triggered this emotional state
    stability: float  # how stable this emotional state is (0-1)

@dataclass
class PersonalizationInsight:
    """Insights for personalizing the user experience"""
    recommended_products: List[str]
    ui_adaptations: Dict[str, Any]
    content_tone: str
    interaction_style: str
    priority_information: List[str]

class EmotionalResonanceAI:
    """
    The core ER-AI system that processes user interactions and infers emotional states
    to deliver prescient personalization.
    """
    
    def __init__(self):
        self.interaction_history: List[UserInteraction] = []
        self.emotional_patterns = self._initialize_emotional_patterns()
        self.product_emotional_mapping = self._initialize_product_mapping()
        self.learning_rate = 0.1
        
    def _initialize_emotional_patterns(self) -> Dict[str, Dict]:
        """Initialize behavioral patterns that indicate different emotional states"""
        return {
            EmotionalState.EXCITED.value: {
                "quick_clicks": 0.8,
                "short_hover_times": 0.7,
                "rapid_scrolling": 0.9,
                "multiple_product_views": 0.8,
                "cart_additions": 0.9
            },
            EmotionalState.CURIOUS.value: {
                "long_hover_times": 0.8,
                "detailed_product_views": 0.9,
                "story_reading": 0.9,
                "category_exploration": 0.7,
                "search_variations": 0.6
            },
            EmotionalState.CONTEMPLATIVE.value: {
                "long_page_durations": 0.9,
                "repeated_visits": 0.8,
                "comparison_behavior": 0.8,
                "wishlist_additions": 0.7,
                "slow_scrolling": 0.6
            },
            EmotionalState.FRUSTRATED.value: {
                "rapid_back_navigation": 0.9,
                "search_refinements": 0.8,
                "cart_abandonments": 0.7,
                "short_session_duration": 0.6,
                "erratic_clicking": 0.8
            },
            EmotionalState.DELIGHTED.value: {
                "extended_engagement": 0.9,
                "social_sharing": 0.8,
                "review_reading": 0.7,
                "immediate_purchases": 0.8,
                "return_visits": 0.9
            }
        }
    
    def _initialize_product_mapping(self) -> Dict[str, Dict]:
        """Initialize mapping between products and their emotional resonance"""
        return {
            "artisan_ceramic_mug": {
                "primary_emotions": [EmotionalState.CONTEMPLATIVE, EmotionalState.RELAXED],
                "aspirational_themes": ["mindfulness", "craftsmanship", "slow_living"],
                "personality_fit": ["introspective", "quality_focused", "mindful"]
            },
            "minimalist_leather_wallet": {
                "primary_emotions": [EmotionalState.FOCUSED, EmotionalState.INSPIRED],
                "aspirational_themes": ["minimalism", "functionality", "sophistication"],
                "personality_fit": ["organized", "design_conscious", "practical"]
            },
            "sustainable_bamboo_toothbrush": {
                "primary_emotions": [EmotionalState.INSPIRED, EmotionalState.FOCUSED],
                "aspirational_themes": ["sustainability", "health", "environmental_consciousness"],
                "personality_fit": ["eco_conscious", "health_focused", "values_driven"]
            }
        }
    
    def process_interaction(self, interaction: UserInteraction) -> None:
        """Process a new user interaction and update the emotional understanding"""
        self.interaction_history.append(interaction)
        
        # Keep only recent interactions for analysis (last 50 interactions)
        if len(self.interaction_history) > 50:
            self.interaction_history = self.interaction_history[-50:]
    
    def infer_emotional_state(self, recent_window_minutes: int = 10) -> EmotionalProfile:
        """
        Infer the user's current emotional state based on recent interactions
        """
        if not self.interaction_history:
            return EmotionalProfile(
                primary_state=EmotionalState.CURIOUS,
                secondary_state=EmotionalState.RELAXED,
                confidence=0.3,
                triggers=["no_interaction_data"],
                stability=0.5
            )
        
        # Get recent interactions within the specified window
        cutoff_time = datetime.now() - timedelta(minutes=recent_window_minutes)
        recent_interactions = [
            i for i in self.interaction_history 
            if i.timestamp >= cutoff_time
        ]
        
        if not recent_interactions:
            recent_interactions = self.interaction_history[-5:]  # Use last 5 if no recent ones
        
        # Calculate behavioral indicators
        behavioral_scores = self._calculate_behavioral_scores(recent_interactions)
        
        # Map behavioral scores to emotional states
        emotional_scores = {}
        for emotion, patterns in self.emotional_patterns.items():
            score = 0
            for pattern, weight in patterns.items():
                if pattern in behavioral_scores:
                    score += behavioral_scores[pattern] * weight
            emotional_scores[emotion] = score / len(patterns)  # Normalize
        
        # Find primary and secondary emotional states
        sorted_emotions = sorted(emotional_scores.items(), key=lambda x: x[1], reverse=True)
        primary_emotion = EmotionalState(sorted_emotions[0][0])
        secondary_emotion = EmotionalState(sorted_emotions[1][0]) if len(sorted_emotions) > 1 else primary_emotion
        
        # Calculate confidence based on the difference between top emotions
        confidence = min(1.0, (sorted_emotions[0][1] - sorted_emotions[1][1]) + 0.5) if len(sorted_emotions) > 1 else 0.7
        
        # Identify triggers
        triggers = self._identify_emotional_triggers(recent_interactions, primary_emotion)
        
        # Calculate stability based on consistency of recent emotional states
        stability = self._calculate_emotional_stability()
        
        return EmotionalProfile(
            primary_state=primary_emotion,
            secondary_state=secondary_emotion,
            confidence=confidence,
            triggers=triggers,
            stability=stability
        )
    
    def _calculate_behavioral_scores(self, interactions: List[UserInteraction]) -> Dict[str, float]:
        """Calculate behavioral indicator scores from interactions"""
        if not interactions:
            return {}
        
        scores = {}
        
        # Analyze click patterns
        click_interactions = [i for i in interactions if i.action == "click"]
        if click_interactions:
            avg_click_interval = np.mean([
                (click_interactions[i+1].timestamp - click_interactions[i].timestamp).total_seconds()
                for i in range(len(click_interactions)-1)
            ]) if len(click_interactions) > 1 else 5.0
            
            scores["quick_clicks"] = max(0, 1 - (avg_click_interval / 10))  # Normalize to 0-1
            scores["erratic_clicking"] = 1 if avg_click_interval < 1 else 0
        
        # Analyze hover patterns
        hover_interactions = [i for i in interactions if i.action == "hover"]
        if hover_interactions:
            avg_hover_duration = np.mean([i.duration for i in hover_interactions])
            scores["long_hover_times"] = min(1, avg_hover_duration / 5)  # Normalize
            scores["short_hover_times"] = max(0, 1 - (avg_hover_duration / 2))
        
        # Analyze scrolling behavior
        scroll_interactions = [i for i in interactions if i.action == "scroll"]
        if scroll_interactions:
            avg_scroll_speed = np.mean([
                i.context.get("scroll_speed", 1) for i in scroll_interactions
            ])
            scores["rapid_scrolling"] = min(1, avg_scroll_speed / 3)
            scores["slow_scrolling"] = max(0, 1 - (avg_scroll_speed / 1.5))
        
        # Analyze page duration
        page_views = [i for i in interactions if i.action == "view"]
        if page_views:
            avg_page_duration = np.mean([i.duration for i in page_views])
            scores["long_page_durations"] = min(1, avg_page_duration / 60)  # Normalize to minutes
            scores["short_session_duration"] = max(0, 1 - (avg_page_duration / 30))
        
        # Analyze product engagement
        product_views = [i for i in interactions if "product" in i.target]
        scores["multiple_product_views"] = min(1, len(set(i.target for i in product_views)) / 5)
        scores["detailed_product_views"] = len([i for i in product_views if i.duration > 30]) / max(1, len(product_views))
        
        # Analyze specific actions
        scores["cart_additions"] = len([i for i in interactions if i.action == "add_to_cart"]) / max(1, len(interactions))
        scores["cart_abandonments"] = len([i for i in interactions if i.action == "remove_from_cart"]) / max(1, len(interactions))
        scores["wishlist_additions"] = len([i for i in interactions if i.action == "add_to_wishlist"]) / max(1, len(interactions))
        scores["search_refinements"] = len([i for i in interactions if i.action == "search"]) / max(1, len(interactions))
        
        return scores
    
    def _identify_emotional_triggers(self, interactions: List[UserInteraction], emotion: EmotionalState) -> List[str]:
        """Identify what triggered the current emotional state"""
        triggers = []
        
        # Look for patterns that might have triggered the emotion
        recent_actions = [i.action for i in interactions[-5:]]
        recent_targets = [i.target for i in interactions[-5:]]
        
        if emotion == EmotionalState.FRUSTRATED:
            if "search" in recent_actions and recent_actions.count("search") > 2:
                triggers.append("multiple_searches")
            if "remove_from_cart" in recent_actions:
                triggers.append("cart_abandonment")
        
        elif emotion == EmotionalState.EXCITED:
            if "add_to_cart" in recent_actions:
                triggers.append("found_desired_product")
            if len(set(recent_targets)) > 3:
                triggers.append("product_discovery")
        
        elif emotion == EmotionalState.CONTEMPLATIVE:
            if any("product" in target for target in recent_targets):
                triggers.append("product_consideration")
            if "add_to_wishlist" in recent_actions:
                triggers.append("future_planning")
        
        return triggers if triggers else ["general_interaction"]
    
    def _calculate_emotional_stability(self) -> float:
        """Calculate how stable the user's emotional state has been"""
        if len(self.interaction_history) < 10:
            return 0.5  # Default stability for insufficient data
        
        # Use a simpler approach to avoid infinite recursion
        # Analyze the consistency of behavioral patterns over time
        recent_interactions = self.interaction_history[-20:]  # Use last 20 interactions
        
        # Group interactions by time windows
        time_windows = []
        window_size = len(recent_interactions) // 3  # Divide into 3 windows
        
        for i in range(0, len(recent_interactions), window_size):
            window = recent_interactions[i:i+window_size]
            if window:
                time_windows.append(window)
        
        if len(time_windows) < 2:
            return 0.5
        
        # Calculate behavioral consistency across windows
        window_scores = []
        for window in time_windows:
            scores = self._calculate_behavioral_scores(window)
            # Create a simple signature of the behavioral pattern
            signature = sum(scores.values()) if scores else 0
            window_scores.append(signature)
        
        # Calculate variance in behavioral patterns
        if len(window_scores) > 1:
            variance = np.var(window_scores)
            # Convert variance to stability (lower variance = higher stability)
            stability = max(0.1, 1.0 - min(1.0, variance))
        else:
            stability = 0.5
        
        return stability
    
    def generate_personalization_insights(self, emotional_profile: EmotionalProfile) -> PersonalizationInsight:
        """
        Generate personalization insights based on the user's emotional profile
        """
        primary_emotion = emotional_profile.primary_state
        confidence = emotional_profile.confidence
        
        # Recommend products based on emotional state
        recommended_products = self._recommend_products_for_emotion(primary_emotion)
        
        # Adapt UI based on emotional state
        ui_adaptations = self._generate_ui_adaptations(primary_emotion, confidence)
        
        # Determine content tone
        content_tone = self._determine_content_tone(primary_emotion)
        
        # Determine interaction style
        interaction_style = self._determine_interaction_style(primary_emotion)
        
        # Prioritize information based on emotional needs
        priority_information = self._prioritize_information(primary_emotion)
        
        return PersonalizationInsight(
            recommended_products=recommended_products,
            ui_adaptations=ui_adaptations,
            content_tone=content_tone,
            interaction_style=interaction_style,
            priority_information=priority_information
        )
    
    def _recommend_products_for_emotion(self, emotion: EmotionalState) -> List[str]:
        """Recommend products that resonate with the user's current emotional state"""
        recommendations = []
        
        for product_id, product_data in self.product_emotional_mapping.items():
            if emotion in product_data["primary_emotions"]:
                recommendations.append(product_id)
        
        # If no direct matches, recommend based on emotional compatibility
        if not recommendations:
            compatible_emotions = {
                EmotionalState.EXCITED: [EmotionalState.INSPIRED, EmotionalState.DELIGHTED],
                EmotionalState.CONTEMPLATIVE: [EmotionalState.RELAXED, EmotionalState.FOCUSED],
                EmotionalState.FRUSTRATED: [EmotionalState.RELAXED, EmotionalState.FOCUSED],
                EmotionalState.CURIOUS: [EmotionalState.INSPIRED, EmotionalState.EXCITED]
            }
            
            for compatible_emotion in compatible_emotions.get(emotion, []):
                for product_id, product_data in self.product_emotional_mapping.items():
                    if compatible_emotion in product_data["primary_emotions"]:
                        recommendations.append(product_id)
        
        return recommendations[:3]  # Return top 3 recommendations
    
    def _generate_ui_adaptations(self, emotion: EmotionalState, confidence: float) -> Dict[str, Any]:
        """Generate UI adaptations based on emotional state"""
        adaptations = {}
        
        if emotion == EmotionalState.FRUSTRATED:
            adaptations.update({
                "simplify_navigation": True,
                "highlight_search": True,
                "show_help_prominently": True,
                "reduce_choices": True
            })
        
        elif emotion == EmotionalState.EXCITED:
            adaptations.update({
                "emphasize_cta_buttons": True,
                "show_related_products": True,
                "enable_quick_actions": True,
                "highlight_popular_items": True
            })
        
        elif emotion == EmotionalState.CONTEMPLATIVE:
            adaptations.update({
                "show_detailed_information": True,
                "enable_comparison_tools": True,
                "highlight_reviews": True,
                "show_wishlist_option": True
            })
        
        elif emotion == EmotionalState.CURIOUS:
            adaptations.update({
                "show_product_stories": True,
                "highlight_categories": True,
                "enable_exploration_mode": True,
                "show_discovery_suggestions": True
            })
        
        # Adjust adaptation intensity based on confidence
        adaptation_keys = list(adaptations.keys())  # Create a copy of keys
        for key in adaptation_keys:
            if isinstance(adaptations[key], bool):
                adaptations[f"{key}_intensity"] = confidence
        
        return adaptations
    
    def _determine_content_tone(self, emotion: EmotionalState) -> str:
        """Determine the appropriate content tone for the user's emotional state"""
        tone_mapping = {
            EmotionalState.EXCITED: "enthusiastic",
            EmotionalState.CURIOUS: "informative",
            EmotionalState.CONTEMPLATIVE: "thoughtful",
            EmotionalState.FRUSTRATED: "supportive",
            EmotionalState.DELIGHTED: "celebratory",
            EmotionalState.OVERWHELMED: "calming",
            EmotionalState.FOCUSED: "direct",
            EmotionalState.RELAXED: "gentle",
            EmotionalState.INSPIRED: "motivational",
            EmotionalState.UNCERTAIN: "reassuring"
        }
        
        return tone_mapping.get(emotion, "friendly")
    
    def _determine_interaction_style(self, emotion: EmotionalState) -> str:
        """Determine the appropriate interaction style"""
        style_mapping = {
            EmotionalState.EXCITED: "responsive",
            EmotionalState.CURIOUS: "exploratory",
            EmotionalState.CONTEMPLATIVE: "patient",
            EmotionalState.FRUSTRATED: "helpful",
            EmotionalState.DELIGHTED: "celebratory",
            EmotionalState.OVERWHELMED: "simplified",
            EmotionalState.FOCUSED: "efficient",
            EmotionalState.RELAXED: "leisurely",
            EmotionalState.INSPIRED: "encouraging",
            EmotionalState.UNCERTAIN: "guiding"
        }
        
        return style_mapping.get(emotion, "balanced")
    
    def _prioritize_information(self, emotion: EmotionalState) -> List[str]:
        """Prioritize what information to show based on emotional state"""
        priority_mapping = {
            EmotionalState.EXCITED: ["price", "availability", "quick_purchase_options"],
            EmotionalState.CURIOUS: ["product_story", "craftsmanship_details", "related_products"],
            EmotionalState.CONTEMPLATIVE: ["detailed_specs", "reviews", "comparison_options"],
            EmotionalState.FRUSTRATED: ["search_help", "customer_support", "simplified_navigation"],
            EmotionalState.DELIGHTED: ["sharing_options", "similar_recommendations", "community_features"],
            EmotionalState.OVERWHELMED: ["key_benefits", "simple_choices", "guided_selection"],
            EmotionalState.FOCUSED: ["essential_details", "purchase_options", "specifications"],
            EmotionalState.RELAXED: ["inspiration", "stories", "leisurely_browsing"],
            EmotionalState.INSPIRED: ["aspirational_content", "transformation_stories", "community_impact"],
            EmotionalState.UNCERTAIN: ["guidance", "recommendations", "educational_content"]
        }
        
        return priority_mapping.get(emotion, ["product_highlights", "key_features", "customer_reviews"])

def simulate_user_interactions() -> List[UserInteraction]:
    """Simulate realistic user interactions for testing the ER-AI"""
    interactions = []
    base_time = datetime.now() - timedelta(minutes=30)
    
    # Simulate a user journey: curious browsing -> contemplative consideration -> excited purchase
    
    # Phase 1: Curious browsing (10 minutes)
    for i in range(8):
        interactions.append(UserInteraction(
            timestamp=base_time + timedelta(minutes=i*1.2),
            action=random.choice(["view", "hover", "scroll"]),
            target=random.choice(["homepage", "category_mindful_living", "product_artisan_mug"]),
            duration=random.uniform(15, 45),
            context={"device": "desktop", "time_of_day": "evening"}
        ))
    
    # Phase 2: Contemplative consideration (15 minutes)
    consideration_start = base_time + timedelta(minutes=12)
    for i in range(6):
        interactions.append(UserInteraction(
            timestamp=consideration_start + timedelta(minutes=i*2.5),
            action=random.choice(["view", "hover", "click"]),
            target="product_artisan_mug",
            duration=random.uniform(45, 120),
            context={"device": "desktop", "time_of_day": "evening", "scroll_speed": 0.5}
        ))
    
    # Add wishlist action
    interactions.append(UserInteraction(
        timestamp=consideration_start + timedelta(minutes=18),
        action="add_to_wishlist",
        target="product_artisan_mug",
        duration=2,
        context={"device": "desktop", "time_of_day": "evening"}
    ))
    
    # Phase 3: Excited purchase decision (5 minutes)
    purchase_start = base_time + timedelta(minutes=25)
    interactions.extend([
        UserInteraction(
            timestamp=purchase_start,
            action="click",
            target="product_artisan_mug",
            duration=1,
            context={"device": "desktop", "time_of_day": "evening"}
        ),
        UserInteraction(
            timestamp=purchase_start + timedelta(seconds=30),
            action="add_to_cart",
            target="product_artisan_mug",
            duration=2,
            context={"device": "desktop", "time_of_day": "evening"}
        ),
        UserInteraction(
            timestamp=purchase_start + timedelta(minutes=2),
            action="view",
            target="checkout",
            duration=180,
            context={"device": "desktop", "time_of_day": "evening"}
        )
    ])
    
    return interactions

def demonstrate_er_ai():
    """Demonstrate the ER-AI capabilities with simulated data"""
    print("🧠 CanvasThink Emotional Resonance AI (ER-AI) Prototype")
    print("=" * 60)
    
    # Initialize the ER-AI
    er_ai = EmotionalResonanceAI()
    
    # Simulate user interactions
    print("\n📊 Simulating User Interactions...")
    interactions = simulate_user_interactions()
    
    # Process interactions
    for interaction in interactions:
        er_ai.process_interaction(interaction)
    
    print(f"✅ Processed {len(interactions)} user interactions")
    
    # Analyze emotional state at different time windows
    print("\n🎭 Emotional State Analysis:")
    print("-" * 40)
    
    for window in [5, 15, 30]:
        emotional_profile = er_ai.infer_emotional_state(window)
        print(f"\n⏱️  Last {window} minutes:")
        print(f"   Primary Emotion: {emotional_profile.primary_state.value.title()}")
        print(f"   Secondary Emotion: {emotional_profile.secondary_state.value.title()}")
        print(f"   Confidence: {emotional_profile.confidence:.2f}")
        print(f"   Stability: {emotional_profile.stability:.2f}")
        print(f"   Triggers: {', '.join(emotional_profile.triggers)}")
    
    # Generate personalization insights
    print("\n🎯 Personalization Insights:")
    print("-" * 40)
    
    current_profile = er_ai.infer_emotional_state(10)
    insights = er_ai.generate_personalization_insights(current_profile)
    
    print(f"\n🛍️  Recommended Products:")
    for product in insights.recommended_products:
        print(f"   • {product.replace('_', ' ').title()}")
    
    print(f"\n🎨 UI Adaptations:")
    for adaptation, value in insights.ui_adaptations.items():
        if isinstance(value, bool) and value:
            print(f"   • {adaptation.replace('_', ' ').title()}")
        elif isinstance(value, (int, float)):
            print(f"   • {adaptation.replace('_', ' ').title()}: {value:.2f}")
    
    print(f"\n💬 Content Tone: {insights.content_tone.title()}")
    print(f"🤝 Interaction Style: {insights.interaction_style.title()}")
    
    print(f"\n📋 Priority Information:")
    for info in insights.priority_information:
        print(f"   • {info.replace('_', ' ').title()}")
    
    print("\n" + "=" * 60)
    print("🚀 ER-AI Prototype Demonstration Complete!")
    print("This is the foundation of CanvasThink's Empathic Commerce Ecosystem.")
    print("**Make something wonderful.**")

if __name__ == "__main__":
    demonstrate_er_ai()
