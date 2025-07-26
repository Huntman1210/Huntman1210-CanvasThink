"use client"

import type React from "react"

import { useState } from "react"
import { MessageCircle, X, Send, Sparkles, Heart, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Message {
  id: string
  text: string
  sender: "user" | "ai"
  timestamp: Date
}

export default function ConciergeChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi there! I'm your CanvasThink Concierge. I'm here to help you discover amazing products and connect with wonderful helpers. What brings you joy today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [inputText, setInputText] = useState("")

  const handleSendMessage = () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputText("")

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputText)
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: "ai",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
    }, 1000)
  }

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes("help") || input.includes("support")) {
      return "I'd love to help! Our community of helpers is here for you. Whether you need product recommendations, want to share your story, or need assistance with anything else, we're here to make your experience joyful. What specific help are you looking for?"
    }

    if (input.includes("product") || input.includes("buy") || input.includes("shop")) {
      return "Wonderful! Every product on CanvasThink comes with a beautiful story from the helper who made it possible. I can help you find products that align with your values and connect you with their stories. What kind of products interest you most?"
    }

    if (input.includes("story") || input.includes("helper")) {
      return "Stories are the heart of CanvasThink! Each helper has a unique journey and passion that they bring to their products. These aren't just transactions - they're connections between real people. Would you like to explore some featured helper stories?"
    }

    if (input.includes("community") || input.includes("join")) {
      return "Our community is built on the belief that helping others and finding great products can be the same beautiful experience! You can join as a customer to discover amazing products, or as a helper to share your own creations and stories. Both paths lead to meaningful connections and joy!"
    }

    if (input.includes("joy") || input.includes("happy") || input.includes("love")) {
      return "That's what we're all about! CanvasThink believes that commerce should bring joy, not stress. Every interaction is designed to celebrate human connection and create positive experiences. What would make your day more joyful?"
    }

    return "Thank you for sharing that with me! At CanvasThink, we believe every conversation matters. I'm here to help you discover products with stories, connect with amazing helpers, and experience the joy of meaningful commerce. How can I make your experience more delightful today?"
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all duration-300 z-50 ${isOpen ? "hidden" : "flex"}`}
        size="lg"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl z-50 flex flex-col bg-white/95 backdrop-blur-md border-0">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-t-lg flex-shrink-0">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span>CanvasThink Concierge</span>
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-sm text-white/90">Here to help you find joy in every interaction</p>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`flex items-start space-x-2 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-blue-400 to-blue-500"
                          : "bg-gradient-to-r from-orange-400 to-pink-400"
                      }`}
                    >
                      {message.sender === "user" ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Heart className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div
                      className={`rounded-2xl px-4 py-2 ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 p-4 flex-shrink-0">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Share what brings you joy..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 rounded-full px-4"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
