"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, X, Minus, Sparkles, Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AIBadge } from "@/components/ui/ai-badge"
import { usePathname } from "next/navigation"
import { detectPageContext, getContextAwareSuggestions } from "@/lib/ask-giggin-engine"

interface Message {
  id: string
  type: "user" | "assistant" | "card-collection"
  content: string
  timestamp: string
  cards?: React.ReactNode[]
}

interface PersistentAskGigginProps {
  isOpen: boolean
  onClose: () => void
}

export function PersistentAskGiggin({ isOpen, onClose }: PersistentAskGigginProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [query, setQuery] = useState("")
  const [isThinking, setIsThinking] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const pathname = usePathname()
  const pageContext = detectPageContext(pathname)

  const getUserRole = (): "fan" | "artist" | "venue" | "promoter" | "admin" => {
    if (pathname.startsWith("/artist")) return "artist"
    if (pathname.startsWith("/venue")) return "venue"
    if (pathname.startsWith("/promoter")) return "promoter"
    if (pathname.startsWith("/admin")) return "admin"
    return "fan"
  }

  const userRole = getUserRole()
  const contextSuggestions = getContextAwareSuggestions(userRole, pageContext)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = () => {
    if (query.trim()) {
      const userMessage: Message = {
        id: `msg-${Date.now()}`,
        type: "user",
        content: query.trim(),
        timestamp: new Date().toISOString(),
      }
      setMessages([...messages, userMessage])
      setQuery("")
      setIsThinking(true)

      // Simulate AI response with card-based output
      setTimeout(() => {
        const assistantMessage: Message = {
          id: `msg-${Date.now() + 1}`,
          type: "card-collection",
          content: `Found relevant results for "${userMessage.content}"`,
          timestamp: new Date().toISOString(),
          cards: [
            <div key="card-1" className="rounded-lg border border-border bg-card p-4">
              <div className="mb-2 flex items-center gap-2">
                <AIBadge text="AI Result" />
              </div>
              <p className="text-sm font-medium text-foreground mb-1">
                {userRole === "fan" && "Event matches your taste profile"}
                {userRole === "artist" && "Venue recommendation for your tour"}
                {userRole === "venue" && "Artist booking suggestion"}
                {userRole === "promoter" && "Demand forecast ready"}
              </p>
              <p className="text-xs text-muted-foreground">
                This is a structured card response based on your {userRole} view and {pageContext} page context.
              </p>
            </div>,
          ],
        }
        setMessages((prev) => [...prev, assistantMessage])
        setIsThinking(false)
      }, 1500)
    }
  }

  const getPlaceholder = () => {
    if (userRole === "fan") {
      if (pageContext === "event_detail") return "Ask about this event..."
      if (pageContext === "pulse") return "Ask about artists in your feed..."
      return "Ask about shows, artists, tickets..."
    }
    if (userRole === "artist") {
      if (pageContext === "analytics") return "Explain this trend..."
      if (pageContext === "events") return "Predict attendance..."
      return "Ask about venues, bookings..."
    }
    if (userRole === "venue" || userRole === "promoter") {
      if (pageContext === "analytics") return "Explain this pattern..."
      return "Ask about artists, demand..."
    }
    return "Ask anything..."
  }

  if (!isOpen) return null

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-5 py-3 shadow-2xl hover:bg-primary/90 transition-all hover:scale-105"
      >
        <Sparkles className="h-5 w-5" />
        <span className="font-medium">Ask Giggin&apos;</span>
      </button>
    )
  }

  if (isMaximized) {
    return (
      <div className="fixed inset-4 z-50 bg-card border border-border rounded-2xl shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-card/50 backdrop-blur-sm rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/20">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Ask Giggin&apos;</h3>
              <p className="text-xs text-muted-foreground">
                {userRole === "fan" && "Music Discovery Assistant"}
                {userRole === "artist" && "Artist Intelligence"}
                {userRole === "venue" && "Venue Optimization"}
                {userRole === "promoter" && "Booking Intelligence"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setIsMaximized(false)}>
              <Minimize2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setIsMinimized(true)}>
              <Minus className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <div className="text-center max-w-md">
                <h4 className="text-lg font-semibold text-foreground mb-2">Ask me anything</h4>
                <p className="text-sm text-muted-foreground">
                  {userRole === "fan" &&
                    pageContext === "event_detail" &&
                    "Ask about this event, tickets, or who's attending."}
                  {userRole === "fan" &&
                    pageContext !== "event_detail" &&
                    "I can help you discover events, buy tickets, and coordinate with friends."}
                  {userRole === "artist" && "Get venue recommendations, attendance predictions, and booking insights."}
                  {(userRole === "venue" || userRole === "promoter") &&
                    "Find artists, predict demand, and optimize your bookings."}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 w-full max-w-2xl mt-4">
                {contextSuggestions.slice(0, 2).map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => setQuery(`${suggestion.title} ${suggestion.subtitle}`)}
                    className="rounded-xl border border-border bg-card/50 p-4 text-left hover:border-primary/50 hover:bg-card transition-all"
                  >
                    <p className="font-medium text-foreground text-sm">{suggestion.title}</p>
                    <p className="text-xs text-muted-foreground">{suggestion.subtitle}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <div key={msg.id} className="space-y-3">
              {msg.type === "user" && (
                <div className="flex justify-end">
                  <div className="rounded-2xl bg-primary text-primary-foreground px-4 py-3 max-w-[80%]">
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>
              )}
              {msg.type === "card-collection" && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <AIBadge text="AI Response" />
                    <p className="text-sm text-muted-foreground">{msg.content}</p>
                  </div>
                  <div className="grid gap-3 md:grid-cols-2">
                    {msg.cards?.map((card, idx) => (
                      <div key={idx}>{card}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {isThinking && (
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="flex h-8 w-8 items-center justify-center">
                <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              </div>
              <p className="text-sm">Thinking...</p>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border bg-card/50 backdrop-blur-sm rounded-b-2xl">
          <div className="flex gap-3">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={getPlaceholder()}
              className="h-12 bg-background text-base"
            />
            <Button onClick={handleSend} disabled={!query.trim() || isThinking} className="h-12 px-6">
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[400px] max-h-[600px] bg-card border border-border rounded-2xl shadow-2xl flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-card/50 backdrop-blur-sm rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="font-medium text-foreground text-sm">Ask Giggin&apos;</h3>
            <p className="text-xs text-muted-foreground">
              {userRole === "fan" && "Discovery"}
              {userRole === "artist" && "Intelligence"}
              {userRole === "venue" && "Optimization"}
              {userRole === "promoter" && "Booking"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsMaximized(true)}>
            <Maximize2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsMinimized(true)}>
            <Minus className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px]">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-3 py-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground mb-1">Ask me anything</p>
              <p className="text-xs text-muted-foreground">
                {userRole === "fan" && "Find events, tickets, friends"}
                {userRole === "artist" && "Venues, predictions, bookings"}
                {(userRole === "venue" || userRole === "promoter") && "Artists, demand, optimization"}
              </p>
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className="space-y-2">
            {msg.type === "user" && (
              <div className="flex justify-end">
                <div className="rounded-xl bg-primary text-primary-foreground px-3 py-2 max-w-[85%]">
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            )}
            {msg.type === "card-collection" && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <AIBadge text="AI" />
                  <p className="text-xs text-muted-foreground">{msg.content}</p>
                </div>
                <div className="space-y-2">
                  {msg.cards?.map((card, idx) => (
                    <div key={idx}>{card}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {isThinking && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            <p className="text-xs">Thinking...</p>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border bg-card/50 backdrop-blur-sm rounded-b-2xl">
        <div className="flex gap-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder={getPlaceholder()}
            className="h-10 bg-background text-sm"
          />
          <Button onClick={handleSend} disabled={!query.trim() || isThinking} size="sm" className="h-10 px-4">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
