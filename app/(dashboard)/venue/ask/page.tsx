"use client"

import { useState, useEffect } from "react"
import { Send, Loader2, Calendar, TrendingUp, Music } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AIBadge } from "@/components/ui/ai-badge"
import { ToolCallPanel } from "@/components/ui/tool-call-panel"
import { ArtistCard, PredictionCard, BookingSuggestionCard, InsightCard } from "@/components/ask-giggin/cards"
import {
  processQuery,
  type IntentType,
  type Tool,
  detectPageContext,
  getContextAwareSuggestions,
} from "@/lib/ask-giggin-engine"
import { executeTool, generateInsights, type ToolExecutionResult } from "@/lib/ask-giggin-tools"
import { usePathname } from "next/navigation"

export default function VenueAskGigginPage() {
  const [query, setQuery] = useState("")
  const [hasSearched, setHasSearched] = useState(false)
  const [isThinking, setIsThinking] = useState(false)
  const [currentReasoningIndex, setCurrentReasoningIndex] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [currentIntent, setCurrentIntent] = useState<IntentType | null>(null)
  const [activeTools, setActiveTools] = useState<Tool[]>([])
  const [reasoningSteps, setReasoningSteps] = useState<string[]>([])
  const [toolResults, setToolResults] = useState<Record<string, ToolExecutionResult>>({})
  const [insights, setInsights] = useState<any[]>([])
  const [artists, setArtists] = useState<any[]>([])
  const [predictions, setPredictions] = useState<any[]>([])
  const [bookingSuggestions, setBookingSuggestions] = useState<any[]>([])

  const pathname = usePathname()
  const pageContext = detectPageContext(pathname)
  const venueSuggestions = getContextAwareSuggestions("venue", pageContext)

  useEffect(() => {
    if (isThinking) {
      const interval = setInterval(() => {
        setCurrentReasoningIndex((prev) => {
          if (prev < reasoningSteps.length - 1) {
            return prev + 1
          }
          clearInterval(interval)
          setTimeout(async () => {
            await executeToolOrchestration()
            setIsThinking(false)
            setShowResults(true)
          }, 800)
          return prev
        })
      }, 1200)
      return () => clearInterval(interval)
    }
  }, [isThinking, reasoningSteps.length])

  const executeToolOrchestration = async () => {
    const results: Record<string, ToolExecutionResult> = {}

    for (const tool of activeTools) {
      const result = await executeTool(tool, { query })
      results[tool] = result
    }

    setToolResults(results)

    const generatedInsights = generateInsights(results)
    setInsights(generatedInsights)

    if (results.artist_db?.success) {
      setArtists(results.artist_db.data.artists || [])
    }

    if (results.demand_engine?.success) {
      setPredictions(results.demand_engine.data.predictions || [])
    }

    if (results.booking_matcher?.success) {
      setBookingSuggestions(results.booking_matcher.data.suggestions || [])
    }
  }

  const handleSearch = async () => {
    if (query.trim()) {
      setHasSearched(true)
      setIsThinking(true)
      setShowResults(false)
      setCurrentReasoningIndex(0)

      const result = await processQuery(query, "venue", pageContext)
      setCurrentIntent(result.intent)
      setActiveTools(result.tools)
      setReasoningSteps(result.reasoning)
    }
  }

  const handleSuggestionClick = async (card: { title: string; subtitle: string }) => {
    const fullQuery = `${card.title} ${card.subtitle}`
    setQuery(fullQuery)
    setHasSearched(true)
    setIsThinking(true)
    setShowResults(false)
    setCurrentReasoningIndex(0)

    const result = await processQuery(fullQuery, "venue", pageContext)
    setCurrentIntent(result.intent)
    setActiveTools(result.tools)
    setReasoningSteps(result.reasoning)
  }

  const handleBack = () => {
    setHasSearched(false)
    setIsThinking(false)
    setShowResults(false)
    setCurrentReasoningIndex(0)
    setQuery("")
    setArtists([])
    setPredictions([])
    setBookingSuggestions([])
    setInsights([])
  }

  const toolCallsForPanel = activeTools.map((tool, idx) => ({
    id: `tool-${idx}`,
    tool: tool.replace("_", " ").toUpperCase(),
    description: `Querying ${tool.replace("_", " ")} data...`,
    status: (showResults ? "completed" : isThinking ? "running" : "pending") as "completed" | "running" | "pending",
  }))

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {!hasSearched && (
        <div className="text-center pt-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Ask Giggin&apos;</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {pageContext === "analytics" && "Understand your venue analytics and get AI-powered booking insights."}
            {pageContext === "events" && "Optimize bookings and predict demand for your scheduled events."}
            {pageContext === "event_detail" && "Get attendance predictions and optimization tips for this event."}
            {pageContext === "dashboard" &&
              "Find artists to book, predict attendance, and optimize your venue calendar with AI insights."}
            {pageContext !== "analytics" &&
              pageContext !== "events" &&
              pageContext !== "event_detail" &&
              pageContext !== "dashboard" &&
              "Find artists to book, predict attendance, and optimize your venue calendar with AI insights."}
          </p>
        </div>
      )}

      {!hasSearched && (
        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
          {venueSuggestions.map((card, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(card)}
              className="rounded-2xl border border-border bg-card/50 p-5 text-left transition-all hover:border-primary/50 hover:bg-card"
            >
              <p className="font-semibold text-primary">{card.title}</p>
              <p className="text-sm text-muted-foreground">{card.subtitle}</p>
            </button>
          ))}
        </div>
      )}

      {!hasSearched && (
        <div className="relative max-w-2xl mx-auto">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Ask about bookings, artists, demand..."
                className="h-14 bg-card pr-12 text-lg rounded-xl"
              />
            </div>
            <Button
              onClick={handleSearch}
              className="h-14 bg-primary px-6 text-primary-foreground hover:bg-primary/90 rounded-xl"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}

      {hasSearched && (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={handleBack} className="text-muted-foreground">
              ← Back
            </Button>
            <span className="text-foreground font-medium">{query}</span>
          </div>

          {isThinking && (
            <div className="space-y-3">
              {reasoningSteps.slice(0, currentReasoningIndex + 1).map((message, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card/50 p-4 animate-in fade-in slide-in-from-bottom-2 duration-300"
                >
                  {idx === currentReasoningIndex ? (
                    <Loader2 className="h-4 w-4 text-primary animate-spin" />
                  ) : (
                    <div className="h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                  )}
                  <p className="text-sm text-muted-foreground">{message}</p>
                </div>
              ))}
            </div>
          )}

          {showResults && (
            <>
              <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
                <div className="mb-3 flex items-center gap-2">
                  <AIBadge text="Venue Intelligence" />
                  {currentIntent && (
                    <span className="text-xs text-muted-foreground">
                      Intent: {currentIntent.replace("_", " ").toUpperCase()}
                    </span>
                  )}
                </div>
                <p className="text-foreground leading-relaxed">
                  Based on your venue capacity and local market trends, I&apos;ve identified optimal booking
                  opportunities and demand forecasts to help you maximize attendance and revenue.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  {activeTools.includes("demand_engine") && (
                    <span className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      Demand Engine
                    </span>
                  )}
                  {activeTools.includes("booking_matcher") && (
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Booking Matcher
                    </span>
                  )}
                  {activeTools.includes("artist_db") && (
                    <span className="flex items-center gap-1">
                      <Music className="h-4 w-4" />
                      Artist Database
                    </span>
                  )}
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                  {/* Booking Suggestions */}
                  {bookingSuggestions.length > 0 && (
                    <div className="space-y-4">
                      <h2 className="text-lg font-semibold text-foreground">Recommended Bookings</h2>
                      <div className="grid gap-4 md:grid-cols-2">
                        {bookingSuggestions.map((suggestion) => (
                          <BookingSuggestionCard key={suggestion.id} suggestion={suggestion} userRole="venue" />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Predictions */}
                  {predictions.length > 0 && (
                    <div className="space-y-4">
                      <h2 className="text-lg font-semibold text-foreground">Demand Forecasts</h2>
                      <div className="grid gap-4 md:grid-cols-2">
                        {predictions.map((prediction, idx) => (
                          <PredictionCard key={idx} prediction={prediction} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Insights */}
                  {insights.length > 0 && (
                    <div className="space-y-4">
                      <h2 className="text-lg font-semibold text-foreground">AI Insights</h2>
                      <div className="grid gap-4 md:grid-cols-2">
                        {insights.map((insight, idx) => (
                          <InsightCard key={idx} insight={insight} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Artists */}
                  {artists.length > 0 && (
                    <div className="space-y-4">
                      <h2 className="text-lg font-semibold text-foreground">Available Artists</h2>
                      <div className="grid gap-4 md:grid-cols-2">
                        {artists.map((artist) => (
                          <ArtistCard key={artist.id} artist={artist} confidenceLabel="Venue Match" userRole="venue" />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <ToolCallPanel calls={toolCallsForPanel} />
                  <div className="rounded-xl border border-border bg-card p-4">
                    <p className="text-xs text-muted-foreground">
                      Powered by Giggin&apos;s Venue Optimization + Booking Intelligence AI
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
