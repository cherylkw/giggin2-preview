"use client"

import { useState, useEffect, useCallback } from "react"
import {
  ArrowLeft,
  TrendingUp,
  MapPin,
  DollarSign,
  Flame,
  CalendarRange,
  BarChart3,
  Users,
  Building,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { AIBadge } from "@/components/ui/ai-badge"

interface MetricCard {
  label: string
  value: string
  subtext?: string
  trend?: "up" | "down" | "neutral"
}

interface ArtistDemoQuestion {
  id: string
  text: string
  icon: React.ReactNode
  reasoningSteps: string[]
  aiSummary: string
  recommendation: {
    type: "go" | "caution" | "wait"
    title: string
    body: string
  }
  metrics: MetricCard[]
  signalTitle: string
  signalBody: string
}

const artistDemoQuestions: ArtistDemoQuestion[] = [
  {
    id: "aq1",
    text: "Should I add a second show in DC?",
    icon: <MapPin className="h-5 w-5" />,
    reasoningSteps: [
      "Aggregating DC city-level intent density\u2026",
      "Comparing current capacity vs projected demand\u2026",
      "Modeling second-date fill probability\u2026",
      "Evaluating break-even risk exposure\u2026",
    ],
    aiSummary:
      "Yes DC demand supports a second show. Your first date is tracking at 94% projected fill with 3 weeks remaining, and DC save velocity is 2.1x your baseline. 38% of recent saves came from fans who missed Show 1. A second 500-cap date projects 78\u201385% fill, representing an estimated $12\u201316K in incremental gross revenue with low cannibalization risk. Announce within 48 hours to capture overflow momentum before it decays.",
    recommendation: {
      type: "go",
      title: "Add the second show",
      body: "Book a 400-600 cap venue for the week after your first date. Announce within 48 hours to capture waitlist momentum.",
    },
    metrics: [
      { label: "Show 1 Fill Rate", value: "94%", subtext: "3 weeks out", trend: "up" },
      { label: "DC Save Rate", value: "2.1x", subtext: "vs. your avg", trend: "up" },
      { label: "Waitlist Fans", value: "38%", subtext: "didn\u2019t get tix", trend: "up" },
      { label: "Projected Fill (Show 2)", value: "78-85%", subtext: "500-cap room", trend: "up" },
    ],
    signalTitle: "Demand Overflow Signal",
    signalBody:
      "38% of DC saves came after Show 1 sold past 80%. This pattern historically predicts 75%+ fill on a second date when announced within 2 weeks.",
  },
  {
    id: "aq2",
    text: "Is Brooklyn strong enough for a 1,000-cap room?",
    icon: <Building className="h-5 w-5" />,
    reasoningSteps: [
      "Aggregating Brooklyn intent clusters\u2026",
      "Comparing comparable artist fill rates\u2026",
      "Modeling capacity saturation thresholds\u2026",
      "Simulating optics and revenue impact scenarios\u2026",
    ],
    aiSummary:
      "Not yet. Your Brooklyn Demand Index is 6.8 (8.0+ required for 1,000-cap confidence). While your last 400-cap show filled to 96%, save-to-ticket conversion in the borough is 31%, limiting scaling efficiency. A 650\u2013800 cap room projects 82\u201388% fill and preserves sell-out optics. Upsizing prematurely risks dilution of perceived demand strength in future routing.",
    recommendation: {
      type: "caution",
      title: "Go with 600-700 cap",
      body: "Book a 650-cap venue for now. If it sells past 85% in the first week, you\u2019ll have the data to justify 1,000 next time.",
    },
    metrics: [
      { label: "Brooklyn Demand Index", value: "6.8", subtext: "needs 8.0+", trend: "neutral" },
      { label: "Last BK Fill", value: "96%", subtext: "400-cap room", trend: "up" },
      { label: "Save-to-Ticket", value: "31%", subtext: "conversion rate", trend: "down" },
      { label: "Safe Ceiling", value: "650 cap", subtext: "82-88% fill", trend: "up" },
    ],
    signalTitle: "Capacity Confidence Signal",
    signalBody:
      "Your Brooklyn audience is loyal but not yet deep enough. A 650-cap sellout builds the proof point needed to justify 1,000 in Q4.",
  },
  {
    id: "aq3",
    text: "Am I underpricing my April 12 Brooklyn show at The Atlas Room?",
    icon: <DollarSign className="h-5 w-5" />,
    reasoningSteps: [
      "Evaluating current ticket price vs demand elasticity\u2026",
      "Comparing genre-tier benchmarks in Brooklyn\u2026",
      "Simulating revenue across price bands\u2026",
      "Projecting attendance sensitivity curve\u2026",
    ],
    aiSummary:
      "Likely yes. Your current $28 ticket sits 22% below comparable artists in your tier and market. Fan willingness-to-pay clusters at $34\u2013$36 based on historical conversion behavior. Raising to $34 models a 19\u201323% gross revenue increase with less than 3% projected attendance elasticity. Consider a $28 early-bird tier capped at 100 tickets to protect loyalty perception while capturing pricing upside.",
    recommendation: {
      type: "go",
      title: "Raise to $34",
      body: "A $34 price point captures more revenue without meaningfully impacting fill rate. Consider a $28 early-bird tier for the first 100 tickets to reward loyal fans.",
    },
    metrics: [
      { label: "Current Price", value: "$28", subtext: "22% below comps", trend: "down" },
      { label: "Fan Willingness-to-Pay", value: "$36", subtext: "median for your genre", trend: "up" },
      { label: "Revenue Lift at $34", value: "+21%", subtext: "vs. current", trend: "up" },
      { label: "Attendance Impact", value: "-3%", subtext: "projected drop", trend: "neutral" },
    ],
    signalTitle: "Pricing Signal",
    signalBody:
      "Artists in your tier who raised prices 15-20% in the last quarter saw average revenue gains of 18% with less than 5% attendance decline. Your fan base skews toward value-conscious but loyal.",
  },
  {
    id: "aq4",
    text: "Which city is heating up fastest for me?",
    icon: <Flame className="h-5 w-5" />,
    reasoningSteps: [
      "Tracking 30-day intent velocity changes\u2026",
      "Comparing multi-city growth rates\u2026",
      "Evaluating save-to-purchase acceleration\u2026",
      "Scoring demand momentum stability\u2026",
    ],
    aiSummary:
      "Philadelphia. Your Philly Demand Velocity score increased 47% over the last 30 days. The strongest acceleration across all active markets. You now have 1,200 saves in Philly with no scheduled date, and engagement duration exceeds your LA baseline by 18%. Delaying a Philly show risks demand normalization within 45\u201360 days as playlist-driven spikes historically taper.",
    recommendation: {
      type: "go",
      title: "Book Philly within 6 weeks",
      body: "Lock in a 300-400 cap room in Philly while momentum is hot. Announce early to convert saves into tickets before the buzz cools.",
    },
    metrics: [
      { label: "Philly Demand Growth", value: "+47%", subtext: "last 30 days", trend: "up" },
      { label: "Philly Saves", value: "1,200", subtext: "no upcoming show", trend: "up" },
      { label: "Tastemaker Shares", value: "3", subtext: "Philly-based accounts", trend: "up" },
      { label: "Recommended Cap", value: "300-400", subtext: "projected 80%+ fill", trend: "up" },
    ],
    signalTitle: "Market Velocity Signal",
    signalBody:
      "Philly\u2019s 47% demand surge is your fastest-moving market. Historical data shows cities at this velocity peak within 8-10 weeks -- booking within 6 weeks captures the wave.",
  },
  {
    id: "aq5",
    text: "Should I tour in March or April?",
    icon: <CalendarRange className="h-5 w-5" />,
    reasoningSteps: [
      "Aggregating seasonal demand indices\u2026",
      "Comparing competitive routing density\u2026",
      "Modeling cross-city carryover probability\u2026",
      "Simulating margin differential impact\u2026",
    ],
    aiSummary:
      "April. Your top three markets (DC, Philly, Brooklyn) model 18% higher demand in April versus March, driven by reduced competitive tour density and improved venue conversion rates. March includes three genre-adjacent festival conflicts that increase attention fragmentation risk by ~11%. Routing late April statistically improves projected gross and reduces competitive pressure.",
    recommendation: {
      type: "go",
      title: "Lock in April dates",
      body: "April 10-24 has the fewest genre conflicts and the strongest projected demand window. Book 4-5 dates across DC, Philly, Brooklyn, and Boston.",
    },
    metrics: [
      { label: "April vs. March Demand", value: "+18%", subtext: "across target cities", trend: "up" },
      { label: "March Festival Conflicts", value: "3", subtext: "in your genre", trend: "down" },
      { label: "Best April Window", value: "Apr 10-24", subtext: "fewest conflicts", trend: "up" },
      { label: "Projected Revenue (April)", value: "+23%", subtext: "vs. March tour", trend: "up" },
    ],
    signalTitle: "Timing Signal",
    signalBody:
      "April 10-24 is the optimal window: low competition, high seasonal demand, and your top 4 markets all peak within this period. March dates would compete with SXSW spillover and two genre-adjacent festivals.",
  },
]

type Phase = "idle" | "reasoning" | "results"

export default function ArtistAskGigginPage() {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null)
  const [phase, setPhase] = useState<Phase>("idle")
  const [visibleSteps, setVisibleSteps] = useState(0)

  const activeQuestion = artistDemoQuestions.find((q) => q.id === selectedQuestion)

  const handleSelectQuestion = useCallback((id: string) => {
    setSelectedQuestion(id)
    setPhase("reasoning")
    setVisibleSteps(0)
  }, [])

  const handleBack = useCallback(() => {
    setSelectedQuestion(null)
    setPhase("idle")
    setVisibleSteps(0)
  }, [])

  // Animate reasoning steps sequentially
  useEffect(() => {
    if (phase !== "reasoning" || !activeQuestion) return

    const totalSteps = activeQuestion.reasoningSteps.length

    if (visibleSteps < totalSteps) {
      const timer = setTimeout(() => {
        setVisibleSteps((prev) => prev + 1)
      }, 1200)
      return () => clearTimeout(timer)
    }

    // All steps shown, transition to results after a brief pause
    const timer = setTimeout(() => {
      setPhase("results")
    }, 800)
    return () => clearTimeout(timer)
  }, [phase, visibleSteps, activeQuestion])

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Initial state: question list */}
      {phase === "idle" && (
        <>
          <div className="text-center pt-6 sm:pt-12">
            <h1 className="text-3xl font-bold text-foreground mb-3 text-balance sm:text-4xl sm:mb-4">Ask Giggin&apos;</h1>
            <p className="text-muted-foreground text-base max-w-xl mx-auto text-pretty sm:text-lg">
              Tap a question to see how Giggin&apos; AI powers strategic decisions for artists.
            </p>
          </div>

          <div className="flex flex-col gap-3 max-w-2xl mx-auto">
            {artistDemoQuestions.map((q) => (
              <button
                key={q.id}
                onClick={() => handleSelectQuestion(q.id)}
                className="flex items-center gap-3 rounded-2xl border border-border bg-card/50 p-4 text-left transition-all hover:border-primary/50 hover:bg-card group sm:gap-4 sm:p-5"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0 transition-colors group-hover:bg-primary/20 sm:h-10 sm:w-10">
                  {q.icon}
                </div>
                <p className="font-medium text-foreground text-sm leading-snug sm:text-[15px]">{q.text}</p>
              </button>
            ))}
          </div>
        </>
      )}

      {/* Reasoning animation */}
      {phase === "reasoning" && activeQuestion && (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
              <Sparkles className="h-6 w-6 text-primary animate-pulse" />
            </div>
            <p className="text-sm text-muted-foreground font-medium text-center max-w-sm">{activeQuestion.text}</p>
          </div>

          <div className="flex flex-col gap-3 w-full max-w-md">
            {activeQuestion.reasoningSteps.map((step, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 transition-all duration-500"
                style={{
                  opacity: idx < visibleSteps ? 1 : 0,
                  transform: idx < visibleSteps ? "translateY(0)" : "translateY(8px)",
                }}
              >
                <div className={`h-2 w-2 rounded-full shrink-0 ${
                  idx < visibleSteps - 1
                    ? "bg-primary"
                    : idx === visibleSteps - 1
                      ? "bg-primary animate-pulse"
                      : "bg-muted"
                }`} />
                <span className={`text-sm ${
                  idx < visibleSteps - 1
                    ? "text-muted-foreground"
                    : idx === visibleSteps - 1
                      ? "text-foreground font-medium"
                      : "text-muted"
                }`}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Result state */}
      {phase === "results" && activeQuestion && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Back + question header */}
          <div className="flex items-start gap-3 sm:items-center sm:gap-4">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="text-muted-foreground gap-2 shrink-0"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back</span>
            </Button>
            <span className="text-foreground font-medium text-sm sm:text-base leading-snug">{activeQuestion.text}</span>
          </div>

          {/* AI Summary */}
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-5">
            <div className="flex items-start gap-3">
              <AIBadge text="Artist Intelligence" className="mt-0.5 shrink-0" />
              <p className="text-sm text-foreground leading-relaxed">{activeQuestion.aiSummary}</p>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {activeQuestion.metrics.map((metric, idx) => (
              <div key={idx} className="rounded-xl border border-border bg-card p-3 sm:p-4">
                <p className="text-xs text-muted-foreground mb-1">{metric.label}</p>
                <p className="text-xl font-bold text-foreground sm:text-2xl">{metric.value}</p>
                {metric.subtext && (
                  <p className={`text-xs mt-1 ${
                    metric.trend === "up"
                      ? "text-emerald-500"
                      : metric.trend === "down"
                        ? "text-red-400"
                        : "text-muted-foreground"
                  }`}>
                    {metric.trend === "up" && <TrendingUp className="inline h-3 w-3 mr-1" />}
                    {metric.subtext}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Recommendation */}
          <div className={`rounded-xl border p-5 ${
            activeQuestion.recommendation.type === "go"
              ? "border-emerald-500/30 bg-emerald-500/5"
              : activeQuestion.recommendation.type === "caution"
                ? "border-amber-500/30 bg-amber-500/5"
                : "border-border bg-card"
          }`}>
            <div className="flex items-center gap-2 mb-3">
              {activeQuestion.recommendation.type === "go" ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              ) : activeQuestion.recommendation.type === "caution" ? (
                <AlertTriangle className="h-5 w-5 text-amber-500" />
              ) : null}
              <h3 className="font-semibold text-foreground">{activeQuestion.recommendation.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{activeQuestion.recommendation.body}</p>
          </div>

          {/* Signal Insight */}
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <BarChart3 className="h-4 w-4" />
              </div>
              <h3 className="font-semibold text-foreground text-sm">{activeQuestion.signalTitle}</h3>
              <AIBadge text="Signal" className="ml-auto" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{activeQuestion.signalBody}</p>
          </div>
        </div>
      )}
    </div>
  )
}
