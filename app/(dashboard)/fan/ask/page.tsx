"use client"

import { useState, useEffect, useCallback } from "react"
import { Sparkles, ArrowLeft, TrendingUp, Users, Clock, Heart, Zap, MapPin, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AIBadge } from "@/components/ui/ai-badge"
import { EventCard } from "@/components/events/event-card"

interface DemoQuestion {
  id: string
  text: string
  icon: React.ReactNode
  reasoningSteps: string[]
  aiSummary: string
  signalTitle: string
  signalBody: string
  signalIcon: React.ReactNode
  events: {
    id: string
    name: string
    artist: string
    venue: string
    city: string
    date: string
    time: string
    genre: string
    image: string
    price: { min: number; max: number }
    attendance: { projected: number; capacity: number }
    demand: number
  }[]
}

const demoQuestions: DemoQuestion[] = [
  {
    id: "q1",
    text: "Who\u2019s playing near me tonight that I\u2019d actually enjoy?",
    icon: <MapPin className="h-5 w-5" />,
    reasoningSteps: [
      "Analyzing your taste graph profile\u2026",
      "Scanning nearby events within 30 minutes\u2026",
      "Calculating compatibility and energy alignment\u2026",
      "Ranking by demand momentum and fit\u2026",
    ],
    aiSummary:
      "Based on your Taste Graph and location, Neon Dreams at The Atlas Room is your top match tonight -- 87% compatibility. You\u2019ve saved similar electronic/indie acts 4 times this month, and 3 friends are going.",
    signalTitle: "Taste Match Signal",
    signalBody:
      "Your listening history shows a strong preference for electronic-indie crossover. Neon Dreams\u2019 sound profile overlaps 87% with artists you\u2019ve saved this quarter.",
    signalIcon: <Heart className="h-4 w-4" />,
    events: [
      {
        id: "neon-dreams-demo",
        name: "Neon Dreams",
        artist: "Neon Dreams",
        venue: "The Atlas Room",
        city: "Brooklyn, NY",
        date: "2026-02-25",
        time: "8:30 PM",
        genre: "Electronic",
        image: "/electronic-concert-neon-lights.jpg",
        price: { min: 32, max: 38 },
        attendance: { projected: 210, capacity: 250 },
        demand: 87,
      },
      {
        id: "acoustic-sessions-demo",
        name: "Acoustic Sessions",
        artist: "Willow & The Waves",
        venue: "Harmony Hall",
        city: "Manhattan, NY",
        date: "2026-02-25",
        time: "9:00 PM",
        genre: "Folk",
        image: "/acoustic-folk-performance-intimate-venue.jpg",
        price: { min: 22, max: 28 },
        attendance: { projected: 195, capacity: 240 },
        demand: 82,
      },
    ],
  },
  {
    id: "q2",
    text: "What shows are people like me going to this week?",
    icon: <Users className="h-5 w-5" />,
    reasoningSteps: [
      "Identifying similar taste clusters\u2026",
      "Aggregating peer save patterns\u2026",
      "Evaluating week-level attendance momentum\u2026",
      "Scoring cohort-based compatibility\u2026",
    ],
    aiSummary:
      "Fans with similar taste profiles are trending toward intimate electronic sets and jazz fusion this week. Lunar Bloom at Warehouse 9 is the breakout pick -- 74% of attendees share your top 3 genres.",
    signalTitle: "Social Demand Signal",
    signalBody:
      "Among fans with 70%+ taste overlap, Lunar Bloom ticket purchases surged 40% in the last 48 hours. This is the fastest-moving show in your cohort.",
    signalIcon: <TrendingUp className="h-4 w-4" />,
    events: [
      {
        id: "lunar-bloom-demo",
        name: "Lunar Bloom",
        artist: "Lunar Bloom",
        venue: "Warehouse 9",
        city: "Brooklyn, NY",
        date: "2026-02-27",
        time: "10:00 PM",
        genre: "Electronic",
        image: "/neon-club-electronic-music-night.jpg",
        price: { min: 28, max: 35 },
        attendance: { projected: 320, capacity: 450 },
        demand: 74,
      },
      {
        id: "neon-dreams-demo",
        name: "Neon Dreams",
        artist: "Neon Dreams",
        venue: "The Atlas Room",
        city: "Brooklyn, NY",
        date: "2026-02-25",
        time: "8:30 PM",
        genre: "Electronic",
        image: "/electronic-concert-neon-lights.jpg",
        price: { min: 32, max: 38 },
        attendance: { projected: 210, capacity: 250 },
        demand: 87,
      },
    ],
  },
  {
    id: "q3",
    text: "What similar shows should I consider before I decide?",
    icon: <BarChart3 className="h-5 w-5" />,
    reasoningSteps: [
      "Detecting decision comparison signals\u2026",
      "Matching events within your preferred price band\u2026",
      "Evaluating energy format alignment\u2026",
      "Balancing discovery vs familiarity weighting\u2026",
    ],
    aiSummary:
      "If you\u2019re weighing options, here are 3 shows this week with overlapping vibes but different price points and crowd sizes. Static Youth is the budget-friendly pick; Neon Dreams is the premium experience.",
    signalTitle: "Comparison Signal",
    signalBody:
      "Static Youth offers a similar genre profile at 40% lower cost, but Neon Dreams has 18% higher taste compatibility and a more intimate venue.",
    signalIcon: <BarChart3 className="h-4 w-4" />,
    events: [
      {
        id: "neon-dreams-demo",
        name: "Neon Dreams",
        artist: "Neon Dreams",
        venue: "The Atlas Room",
        city: "Brooklyn, NY",
        date: "2026-02-25",
        time: "8:30 PM",
        genre: "Electronic",
        image: "/electronic-concert-neon-lights.jpg",
        price: { min: 32, max: 38 },
        attendance: { projected: 210, capacity: 250 },
        demand: 87,
      },
      {
        id: "static-youth-demo",
        name: "Static Youth",
        artist: "Static Youth",
        venue: "The Lot Radio",
        city: "Brooklyn, NY",
        date: "2026-02-26",
        time: "7:30 PM",
        genre: "Indie",
        image: "/indie-rock-showcase-small-venue.jpg",
        price: { min: 18, max: 22 },
        attendance: { projected: 85, capacity: 120 },
        demand: 69,
      },
      {
        id: "lunar-bloom-demo",
        name: "Lunar Bloom",
        artist: "Lunar Bloom",
        venue: "Warehouse 9",
        city: "Brooklyn, NY",
        date: "2026-02-27",
        time: "10:00 PM",
        genre: "Electronic",
        image: "/neon-club-electronic-music-night.jpg",
        price: { min: 28, max: 35 },
        attendance: { projected: 320, capacity: 450 },
        demand: 74,
      },
    ],
  },
  {
    id: "q4",
    text: "What are people saving but not buying tickets for yet?",
    icon: <Clock className="h-5 w-5" />,
    reasoningSteps: [
      "Aggregating live save-to-purchase ratios\u2026",
      "Detecting intent hesitation clusters\u2026",
      "Modeling late-stage conversion probability\u2026",
      "Scoring potential demand surge\u2026",
    ],
    aiSummary:
      "Summer Vibes Festival has the highest save-to-purchase gap in your area -- 61% save rate but only 23% conversion. Early bird pricing ends Friday, so this is a window to lock in a lower price before demand spikes.",
    signalTitle: "Conversion Gap Signal",
    signalBody:
      "Summer Vibes has 2,400 saves vs 550 purchases. Historical data shows festivals with this ratio typically see a 3x purchase surge in the final 72 hours before early bird expires.",
    signalIcon: <Clock className="h-4 w-4" />,
    events: [
      {
        id: "summer-vibes-demo",
        name: "Summer Vibes Festival",
        artist: "Various Artists",
        venue: "Prospect Park Bandshell",
        city: "Brooklyn, NY",
        date: "2026-06-14",
        time: "2:00 PM",
        genre: "Multi-Genre",
        image: "/outdoor-festival-sunset-crowd.jpg",
        price: { min: 55, max: 120 },
        attendance: { projected: 2400, capacity: 5000 },
        demand: 79,
      },
      {
        id: "velvet-echo-demo",
        name: "Velvet Echo",
        artist: "Velvet Echo",
        venue: "Le Poisson Rouge",
        city: "Manhattan, NY",
        date: "2026-03-07",
        time: "9:30 PM",
        genre: "Synth-Pop",
        image: "/concert-poster-artwork-neon.jpg",
        price: { min: 25, max: 30 },
        attendance: { projected: 150, capacity: 250 },
        demand: 68,
      },
    ],
  },
  {
    id: "q5",
    text: "Which shows feel like a safe bet tonight?",
    icon: <Zap className="h-5 w-5" />,
    reasoningSteps: [
      "Analyzing compatibility stability\u2026",
      "Evaluating demand saturation levels\u2026",
      "Modeling cancellation and no-show risk\u2026",
      "Ranking by attendance confidence score\u2026",
    ],
    aiSummary:
      "If you want a guaranteed good time, Neon Dreams is the highest-confidence pick: 87% taste match, 84% venue fill, and your friend group is already going. Low risk, high reward.",
    signalTitle: "Confidence Signal",
    signalBody:
      "Neon Dreams scores in the top 5% of recommendations for your profile. The combination of taste match, social validation, and venue quality makes this a low-regret choice.",
    signalIcon: <Zap className="h-4 w-4" />,
    events: [
      {
        id: "neon-dreams-demo",
        name: "Neon Dreams",
        artist: "Neon Dreams",
        venue: "The Atlas Room",
        city: "Brooklyn, NY",
        date: "2026-02-25",
        time: "8:30 PM",
        genre: "Electronic",
        image: "/electronic-concert-neon-lights.jpg",
        price: { min: 32, max: 38 },
        attendance: { projected: 210, capacity: 250 },
        demand: 87,
      },
      {
        id: "acoustic-sessions-demo",
        name: "Acoustic Sessions",
        artist: "Willow & The Waves",
        venue: "Harmony Hall",
        city: "Manhattan, NY",
        date: "2026-02-25",
        time: "9:00 PM",
        genre: "Folk",
        image: "/acoustic-folk-performance-intimate-venue.jpg",
        price: { min: 22, max: 28 },
        attendance: { projected: 195, capacity: 240 },
        demand: 82,
      },
    ],
  },
  {
    id: "q6",
    text: "What show fits my mood right now?",
    icon: <Heart className="h-5 w-5" />,
    reasoningSteps: [
      "Detecting mood-based intent shift\u2026",
      "Matching venue scale and energy profile\u2026",
      "Filtering by timing and travel constraints\u2026",
      "Optimizing for emotional alignment score\u2026",
    ],
    aiSummary:
      "You\u2019ve been listening to downtempo electronic and ambient lately. Velvet Echo at Le Poisson Rouge matches that energy perfectly -- think warm synths in a candlelit room. 75% taste match.",
    signalTitle: "Mood Signal",
    signalBody:
      "Your last 48 hours of listening data skews 70% downtempo/ambient. Velvet Echo\u2019s setlist analysis shows 75% overlap with your recent mood profile.",
    signalIcon: <Heart className="h-4 w-4" />,
    events: [
      {
        id: "velvet-echo-demo",
        name: "Velvet Echo",
        artist: "Velvet Echo",
        venue: "Le Poisson Rouge",
        city: "Manhattan, NY",
        date: "2026-03-07",
        time: "9:30 PM",
        genre: "Synth-Pop",
        image: "/concert-poster-artwork-neon.jpg",
        price: { min: 25, max: 30 },
        attendance: { projected: 150, capacity: 250 },
        demand: 68,
      },
      {
        id: "acoustic-sessions-demo",
        name: "Acoustic Sessions",
        artist: "Willow & The Waves",
        venue: "Harmony Hall",
        city: "Manhattan, NY",
        date: "2026-02-25",
        time: "9:00 PM",
        genre: "Folk",
        image: "/acoustic-folk-performance-intimate-venue.jpg",
        price: { min: 22, max: 28 },
        attendance: { projected: 195, capacity: 240 },
        demand: 82,
      },
    ],
  },
  {
    id: "q7",
    text: "What\u2019s happening around me that I\u2019d regret missing?",
    icon: <TrendingUp className="h-5 w-5" />,
    reasoningSteps: [
      "Detecting rising demand acceleration\u2026",
      "Evaluating remaining ticket inventory\u2026",
      "Modeling sellout probability curve\u2026",
      "Ranking by regret-risk index\u2026",
    ],
    aiSummary:
      "Neon Dreams is selling faster than any Brooklyn show this month -- 84% filled with 3 days to go. Combined with your 87% taste match, this is the one you\u2019d kick yourself for skipping. Lunar Bloom is the rising sleeper pick.",
    signalTitle: "Urgency Signal",
    signalBody:
      "Neon Dreams has a sell-out probability of 92% based on current trajectory. Ticket velocity increased 3x in the last 24 hours. Lunar Bloom is at 71% fill and accelerating.",
    signalIcon: <TrendingUp className="h-4 w-4" />,
    events: [
      {
        id: "neon-dreams-demo",
        name: "Neon Dreams",
        artist: "Neon Dreams",
        venue: "The Atlas Room",
        city: "Brooklyn, NY",
        date: "2026-02-25",
        time: "8:30 PM",
        genre: "Electronic",
        image: "/electronic-concert-neon-lights.jpg",
        price: { min: 32, max: 38 },
        attendance: { projected: 210, capacity: 250 },
        demand: 87,
      },
      {
        id: "lunar-bloom-demo",
        name: "Lunar Bloom",
        artist: "Lunar Bloom",
        venue: "Warehouse 9",
        city: "Brooklyn, NY",
        date: "2026-02-27",
        time: "10:00 PM",
        genre: "Electronic",
        image: "/neon-club-electronic-music-night.jpg",
        price: { min: 28, max: 35 },
        attendance: { projected: 320, capacity: 450 },
        demand: 74,
      },
      {
        id: "static-youth-demo",
        name: "Static Youth",
        artist: "Static Youth",
        venue: "The Lot Radio",
        city: "Brooklyn, NY",
        date: "2026-02-26",
        time: "7:30 PM",
        genre: "Indie",
        image: "/indie-rock-showcase-small-venue.jpg",
        price: { min: 18, max: 22 },
        attendance: { projected: 85, capacity: 120 },
        demand: 69,
      },
    ],
  },
]

type Phase = "idle" | "reasoning" | "results"

export default function AskGigginPage() {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null)
  const [phase, setPhase] = useState<Phase>("idle")
  const [visibleSteps, setVisibleSteps] = useState(0)

  const activeQuestion = demoQuestions.find((q) => q.id === selectedQuestion)

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
              Tap a question to see how Giggin&apos; AI curates the perfect night out for you.
            </p>
          </div>

          <div className="flex flex-col gap-3 max-w-2xl mx-auto">
            {demoQuestions.map((q) => (
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
            <p className="text-sm text-muted-foreground font-medium">{activeQuestion.text}</p>
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

      {/* Result state: AI summary + events + signal */}
      {phase === "results" && activeQuestion && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Back + question header */}
          <div className="flex items-start gap-3 sm:items-center sm:gap-4">
            <Button variant="ghost" onClick={handleBack} className="text-muted-foreground gap-2 shrink-0">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back</span>
            </Button>
            <span className="text-foreground font-medium text-sm sm:text-base leading-snug">{activeQuestion.text}</span>
          </div>

          {/* AI Summary */}
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-5">
            <div className="flex items-start gap-3">
              <AIBadge text="AI" className="mt-0.5 shrink-0" />
              <p className="text-sm text-foreground leading-relaxed">{activeQuestion.aiSummary}</p>
            </div>
          </div>

          {/* Event Cards */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Recommended Events</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {activeQuestion.events.map((event) => (
                <EventCard key={event.id} event={event} userRole="fan" />
              ))}
            </div>
          </div>

          {/* Signal Insight */}
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {activeQuestion.signalIcon}
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
