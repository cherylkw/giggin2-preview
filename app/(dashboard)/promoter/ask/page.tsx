"use client"

import { useState, useEffect } from "react"
import { Send, Loader2, Calendar, TrendingUp, Building, Users, AlertTriangle, CheckCircle2, Shield } from "lucide-react"
import NextImage from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AIBadge } from "@/components/ui/ai-badge"
import { ToolCallPanel } from "@/components/ui/tool-call-panel"
import {
  VenueCard,
  ArtistCard,
  PredictionCard,
  BookingSuggestionCard,
  InsightCard,
  CityDemandCard,
} from "@/components/ask-giggin/cards"
import {
  processQuery,
  type IntentType,
  type Tool,
  detectPageContext,
  getContextAwareSuggestions,
} from "@/lib/ask-giggin-engine"
import { executeTool, generateInsights, type ToolExecutionResult } from "@/lib/ask-giggin-tools"
import { usePathname } from "next/navigation"

export default function PromoterAskGigginPage() {
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
  const [venues, setVenues] = useState<any[]>([])
  const [artists, setArtists] = useState<any[]>([])
  const [predictions, setPredictions] = useState<any[]>([])
  const [bookingSuggestions, setBookingSuggestions] = useState<any[]>([])
  const [financeRoute, setFinanceRoute] = useState<{ tab: string; highlight?: string } | null>(null)
  const [cityDemandData, setCityDemandData] = useState<any[]>([])
  const [cityInsights, setCityInsights] = useState<any[]>([])
  const [isCityView, setIsCityView] = useState(false)
  const [artistMatchData, setArtistMatchData] = useState<any>(null)
  const [isArtistMatchView, setIsArtistMatchView] = useState(false)

  const pathname = usePathname()
  const pageContext = detectPageContext(pathname)
  const promoterSuggestions = getContextAwareSuggestions("promoter", pageContext)

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

    const lowerQuery = query.toLowerCase()
    if (lowerQuery.includes("paid") || lowerQuery.includes("payout")) {
      setFinanceRoute({ tab: "payouts", highlight: "payment status" })
    } else if (lowerQuery.includes("split") || lowerQuery.includes("revenue") || lowerQuery.includes("guarantee")) {
      setFinanceRoute({ tab: "splits", highlight: "revenue structure" })
    } else if (lowerQuery.includes("contract") || lowerQuery.includes("automated") || lowerQuery.includes("on-chain")) {
      setFinanceRoute({ tab: "contracts", highlight: "contract status" })
    } else if (lowerQuery.includes("settled") || lowerQuery.includes("net revenue") || lowerQuery.includes("closed")) {
      setFinanceRoute({ tab: "settlements", highlight: "settlement status" })
    }

    const generatedInsights = generateInsights(results)
    setInsights(generatedInsights)

    if (results.venue_db?.success) {
      setVenues(results.venue_db.data.venues || [])
    }

    if (results.artist_db?.success) {
      if (results.artist_db.data.type === "promoter_artist_match") {
        setArtistMatchData(results.artist_db.data)
        setIsArtistMatchView(true)
      } else {
        setArtists(results.artist_db.data.artists || [])
        setIsArtistMatchView(false)
      }
    }

    if (results.demand_engine?.success) {
      if (results.demand_engine.data.type === "city_demand") {
        setCityDemandData(results.demand_engine.data.cities || [])
        setCityInsights(results.demand_engine.data.insights || [])
        setIsCityView(true)
      } else {
        setPredictions(results.demand_engine.data.predictions || [])
        setIsCityView(false)
      }
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

      const result = await processQuery(query, "promoter", pageContext)
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

    const result = await processQuery(fullQuery, "promoter", pageContext)
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
    setVenues([])
    setArtists([])
    setPredictions([])
    setBookingSuggestions([])
    setInsights([])
    setFinanceRoute(null)
    setCityDemandData([])
    setCityInsights([])
    setIsCityView(false)
    setArtistMatchData(null)
    setIsArtistMatchView(false)
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
            {pageContext === "analytics" && "Get AI-powered insights and explanations for your analytics data."}
            {pageContext === "events" && "Plan bookings, analyze demand, and optimize your event calendar."}
            {pageContext === "event_detail" && "Get predictions and booking insights for this specific event."}
            {pageContext === "dashboard" &&
              "Get booking recommendations, demand forecasts, and artist matches. Visit Insights for detailed analysis."}
            {pageContext !== "analytics" &&
              pageContext !== "events" &&
              pageContext !== "event_detail" &&
              pageContext !== "dashboard" &&
              "Get booking recommendations, demand forecasts, and artist matches for your events."}
          </p>
        </div>
      )}

      {!hasSearched && (
        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
          {promoterSuggestions.map((card, index) => (
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
                placeholder="Ask about demand insights, talent matches, or marketing performance..."
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
                {isArtistMatchView && artistMatchData ? (
                  <>
                    <div className="mb-3 flex items-center gap-3">
                      <AIBadge text="Promoter Ask Giggin'" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground mb-2 text-balance">Artists suited for an electronic live event</h2>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <Badge variant="secondary" className="text-xs">{artistMatchData.genre}</Badge>
                      <span className="text-xs text-muted-foreground">Ticketed live event</span>
                      <span className="text-xs text-muted-foreground">Pre-booking stage</span>
                      <span className="text-xs text-muted-foreground">Promoter view</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      These artists were selected based on genre alignment, mid-size venue suitability (1,500-3,000 capacity), historical draw at comparable electronic events, and audience overlap in active electronic markets.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="mb-3 flex items-center gap-2">
                      <AIBadge text="Promoter Intelligence" />
                      {currentIntent && (
                        <span className="text-xs text-muted-foreground">
                          Intent: {currentIntent.replace("_", " ").toUpperCase()}
                        </span>
                      )}
                    </div>
                    <p className="text-foreground leading-relaxed">
                      {isCityView
                        ? "I\u2019ve analyzed genre-level demand signals, fan intent data, and historical event performance across major markets to rank cities by booking potential."
                        : "Based on your query and market analysis, I\u2019ve compiled booking opportunities, demand forecasts, and artist recommendations. For detailed analytics, visit the Insights tab."}
                    </p>
                  </>
                )}
                {financeRoute && (
                  <div className="mt-4 rounded-lg border border-primary/50 bg-primary/10 p-4">
                    <p className="text-sm text-foreground">
                      💡 For detailed {financeRoute.highlight}, visit{" "}
                      <a
                        href={`/promoter/contracts?tab=${financeRoute.tab}`}
                        className="font-semibold text-primary underline"
                      >
                        Finance → {financeRoute.tab.charAt(0).toUpperCase() + financeRoute.tab.slice(1)}
                      </a>
                    </p>
                  </div>
                )}
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  {activeTools.includes("venue_db") && (
                    <span className="flex items-center gap-1">
                      <Building className="h-4 w-4" />
                      Venue Database
                    </span>
                  )}
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
                      <Users className="h-4 w-4" />
                      Artist Database
                    </span>
                  )}
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                  {/* Artist Match View */}
                  {isArtistMatchView && artistMatchData?.artists?.length > 0 && (
                    <>
                      <div className="space-y-4">
                        {artistMatchData.artists.map((artist: any) => (
                          <div
                            key={artist.id}
                            className="rounded-xl border border-border bg-card overflow-hidden"
                          >
                            <div className="flex flex-col sm:flex-row">
                              <div className="relative w-full sm:w-48 h-48 sm:h-auto shrink-0">
                                <NextImage
                                  src={artist.image || "/placeholder.svg"}
                                  alt={artist.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1 p-5 space-y-3">
                                <div className="flex items-start justify-between gap-3">
                                  <div>
                                    <h3 className="text-lg font-semibold text-foreground">{artist.name}</h3>
                                    <p className="text-sm text-muted-foreground">{artist.genreFit}</p>
                                  </div>
                                  <Badge
                                    className={`shrink-0 ${
                                      artist.fitConfidence === "Strong"
                                        ? "bg-green-500/10 text-green-400 border-green-500/30"
                                        : "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
                                    }`}
                                    variant="outline"
                                  >
                                    <CheckCircle2 className="mr-1 h-3 w-3" />
                                    {artist.fitConfidence} Fit
                                  </Badge>
                                </div>

                                <div className="space-y-1.5">
                                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Why this artist</p>
                                  {artist.whyThisArtist.map((reason: string, idx: number) => (
                                    <div key={idx} className="flex items-start gap-2">
                                      <Shield className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                                      <p className="text-sm text-foreground leading-relaxed">{reason}</p>
                                    </div>
                                  ))}
                                </div>

                                <div className="flex items-start gap-2 rounded-lg bg-yellow-500/5 border border-yellow-500/20 p-3">
                                  <AlertTriangle className="h-3.5 w-3.5 text-yellow-400 mt-0.5 shrink-0" />
                                  <p className="text-xs text-muted-foreground leading-relaxed">{artist.riskNote}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* AI Insight for promoter planning */}
                      <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 space-y-3">
                        <div className="flex items-center gap-2">
                          <AIBadge text="Planning Insight" />
                        </div>
                        <p className="text-sm text-foreground leading-relaxed">
                          These options represent a range of booking risk profiles for an electronic live event. Luna Eclipse offers the highest confidence based on proven draw, while Neon Futures provides strong mid-card value with room to grow. DJ Phantom is an emerging bet with upside if early demand signals convert.
                        </p>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          Pairing a proven headliner with an emerging act can reduce overall booking risk while keeping ticket pricing competitive.
                        </p>
                      </div>

                      <div className="rounded-lg border border-border/50 bg-card/30 px-4 py-3">
                        <p className="text-xs text-muted-foreground text-center leading-relaxed">
                          This view surfaces artist suitability signals to inform booking decisions before capital is deployed. No event has been created.
                        </p>
                      </div>
                    </>
                  )}

                  {/* City Demand View */}
                  {isCityView && cityDemandData.length > 0 && (
                    <>
                      <div className="space-y-4">
                        <div>
                          <h2 className="text-lg font-semibold text-foreground">City Demand Rankings</h2>
                          <p className="text-sm text-muted-foreground mt-1">
                            Ranked by genre-level demand signals, fan intent, and market momentum
                          </p>
                        </div>
                        <div className="space-y-4">
                          {cityDemandData.map((city) => (
                            <CityDemandCard key={city.rank} city={city} />
                          ))}
                        </div>
                      </div>

                      {/* Comparative AI Insights */}
                      {cityInsights.length > 0 && (
                        <div className="space-y-4">
                          <h2 className="text-lg font-semibold text-foreground">Comparative Insights</h2>
                          <div className="space-y-3">
                            {cityInsights.map((insight, idx) => (
                              <div
                                key={idx}
                                className={`rounded-xl border p-4 ${
                                  insight.type === "opportunity"
                                    ? "border-green-500/30 bg-green-500/5"
                                    : "border-border bg-card/50"
                                }`}
                              >
                                <div className="flex items-start gap-3">
                                  <div className={`mt-0.5 rounded-full p-1.5 ${
                                    insight.type === "opportunity"
                                      ? "bg-green-500/10 text-green-400"
                                      : "bg-primary/10 text-primary"
                                  }`}>
                                    <TrendingUp className="h-3.5 w-3.5" />
                                  </div>
                                  <p className="text-sm text-foreground leading-relaxed">{insight.text}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Decision framing footer */}
                      <div className="rounded-lg border border-border/50 bg-card/30 px-4 py-3">
                        <p className="text-xs text-muted-foreground text-center leading-relaxed">
                          This view surfaces early demand signals to inform routing, pricing, and booking decisions before capital is deployed.
                        </p>
                      </div>
                    </>
                  )}

                  {/* Regular (non-city, non-artist-match) results */}
                  {!isCityView && !isArtistMatchView && (
                    <>
                      {/* Booking Suggestions */}
                      {bookingSuggestions.length > 0 && (
                        <div className="space-y-4">
                          <h2 className="text-lg font-semibold text-foreground">Booking Opportunities</h2>
                          <div className="grid gap-4 md:grid-cols-2">
                            {bookingSuggestions.map((suggestion) => (
                              <BookingSuggestionCard key={suggestion.id} suggestion={suggestion} userRole="promoter" />
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
                          <h2 className="text-lg font-semibold text-foreground">Recommended Artists</h2>
                          <div className="grid gap-4 md:grid-cols-2">
                            {artists.map((artist) => (
                              <ArtistCard
                                key={artist.id}
                                artist={artist}
                                confidenceLabel="Likely Match"
                                userRole="promoter"
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Venues */}
                      {venues.length > 0 && (
                        <div className="space-y-4">
                          <h2 className="text-lg font-semibold text-foreground">Suggested Venues</h2>
                          <div className="grid gap-4 md:grid-cols-2">
                            {venues.map((venue) => (
                              <VenueCard key={venue.id} venue={venue} confidenceLabel="Estimated" userRole="promoter" />
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>

                <div className="space-y-4">
                  <ToolCallPanel calls={toolCallsForPanel} />
                  <div className="rounded-xl border border-border bg-card p-4">
                    <p className="text-xs text-muted-foreground">
                      Powered by Giggin&apos;s Booking Intelligence + Demand Forecasting AI
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
