"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Star,
  Users,
  DollarSign,
  Target,
  Lightbulb,
  AlertTriangle,
  Activity,
  BarChart3,
  Calendar,
  Zap,
  ArrowRight,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AIBadge } from "@/components/ui/ai-badge"
import { cn } from "@/lib/utils"

const demandByDay = [
  { day: "Mon", demand: 45, label: "Low" },
  { day: "Tue", demand: 52, label: "Low" },
  { day: "Wed", demand: 61, label: "Medium" },
  { day: "Thu", demand: 78, label: "Medium" },
  { day: "Fri", demand: 94, label: "High" },
  { day: "Sat", demand: 98, label: "High" },
  { day: "Sun", demand: 72, label: "Medium" },
]

const demandHeatmap = [
  { day: "Mon", slots: [35, 42, 55, 48, 40] },
  { day: "Tue", slots: [40, 48, 58, 52, 45] },
  { day: "Wed", slots: [45, 52, 68, 62, 55] },
  { day: "Thu", slots: [58, 65, 82, 75, 68] },
  { day: "Fri", slots: [75, 85, 95, 92, 88] },
  { day: "Sat", slots: [80, 90, 98, 95, 90] },
  { day: "Sun", slots: [52, 60, 75, 70, 65] },
]

const timeSlots = ["6pm", "8pm", "10pm", "12am", "2am"]

const seatFillTrend = [
  { week: "W1", fill: 72 },
  { week: "W2", fill: 78 },
  { week: "W3", fill: 75 },
  { week: "W4", fill: 68 },
  { week: "W5", fill: 82 },
  { week: "W6", fill: 85 },
  { week: "W7", fill: 79 },
  { week: "W8", fill: 81 },
]

const underfilledNights = [
  { date: "Jan 15", event: "Local Opener Night", expectedFill: "45%", tag: "Local opener" },
  { date: "Jan 18", event: "Mid-week Jazz", expectedFill: "52%", tag: "Bundle promo" },
  { date: "Jan 22", event: "Open slot", expectedFill: "—", tag: "Lower price" },
  { date: "Jan 29", event: "Acoustic Night", expectedFill: "48%", tag: "Genre swap" },
]

const topRevenueDrivers = [
  { name: "Electronic / House", attendance: "850 avg", spend: "$72", repeat: "68%", revenue: "$61.2K" },
  { name: "Indie Rock", attendance: "720 avg", spend: "$65", repeat: "55%", revenue: "$46.8K" },
  { name: "Hip-Hop", attendance: "680 avg", spend: "$58", repeat: "42%", revenue: "$39.4K" },
  { name: "Jazz / Blues", attendance: "420 avg", spend: "$52", repeat: "72%", revenue: "$21.8K" },
]

const bookingSuggestions = [
  {
    name: "Luna Eclipse",
    genre: "Electronic / Indie",
    expectedFill: "88%",
    revenue: "$52K - $68K",
    confidence: 94,
    risk: "Low",
    image: "/female-electronic-music-dj-artist-with-neon-lights.jpg",
  },
  {
    name: "The Velvet Underground Revival",
    genre: "Indie Rock",
    expectedFill: "82%",
    revenue: "$45K - $58K",
    confidence: 87,
    risk: "Low",
    image: "/rock-band-group-photo-vintage-aesthetic-four-membe.jpg",
  },
  {
    name: "Neon Futures",
    genre: "Electronic",
    expectedFill: "85%",
    revenue: "$48K - $62K",
    confidence: 91,
    risk: "Low",
    image: "/alternative-synth-rock-band-neon-purple-lighting.jpg",
  },
]

export default function VenueInsightsPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "demand" | "capacity" | "revenue" | "scenario">("overview")
  const [ticketPrice, setTicketPrice] = useState(65)
  const [capacity, setCapacity] = useState(500)
  const [marketingBoost, setMarketingBoost] = useState<"low" | "med" | "high">("med")

  const expectedFill = Math.min(
    95,
    65 +
      (ticketPrice < 65 ? 10 : ticketPrice > 75 ? -8 : -5) +
      (marketingBoost === "high" ? 8 : marketingBoost === "med" ? 4 : 0),
  )
  const expectedRevenue = Math.round((ticketPrice * capacity * (expectedFill / 100)) / 1000)
  const risk = expectedFill < 60 ? "High" : expectedFill < 75 ? "Medium" : "Low"

  const tabs = [
    { id: "overview" as const, label: "Overview", icon: Activity },
    { id: "demand" as const, label: "Demand Forecast", icon: Calendar },
    { id: "capacity" as const, label: "Capacity & Risk", icon: AlertTriangle },
    { id: "revenue" as const, label: "Revenue Analysis", icon: BarChart3 },
    { id: "scenario" as const, label: "Scenario Planning", icon: Zap },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Venue Insights</h1>
        <p className="text-muted-foreground">
          Your venue operating console for booking optimization and risk management
        </p>
      </div>

      <div className="border-b border-border">
        <div className="flex space-x-1 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border",
                )}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* AI Summary with actionable insights */}
          <Card className="border-primary/20 bg-primary/5 p-6">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Lightbulb className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="mb-3 flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-foreground">AI Booking Summary</h2>
                  <AIBadge text="Live Analysis" />
                </div>
                <ul className="space-y-2 text-sm text-foreground leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span>
                      <strong>Peak Demand Window:</strong> Fri–Sat, 9pm shows deliver strongest revenue per seat for
                      electronic and indie acts.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span>
                      <strong>Underutilized Opportunity:</strong> Wednesdays show consistent low bookings—consider
                      targeted promotions or genre experiments.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span>
                      <strong>Repeat Performance:</strong> Mid-cap electronic acts outperform larger indie bookings on
                      repeat attendance by 15%.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          {/* KPI Row */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-medium text-muted-foreground text-sm">Peak Demand Window</h3>
              </div>
              <p className="text-2xl font-bold text-foreground">Fri–Sat, 9pm</p>
              <p className="text-sm text-muted-foreground mt-1">Best nights for high-demand shows</p>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="rounded-lg bg-chart-3/10 p-2">
                  <DollarSign className="h-5 w-5 text-chart-3" />
                </div>
                <h3 className="font-medium text-muted-foreground text-sm">Revenue Potential</h3>
              </div>
              <p className="text-2xl font-bold text-foreground">$245K</p>
              <p className="text-sm text-chart-3 mt-1">+12% estimated monthly upside</p>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="rounded-lg bg-accent/10 p-2">
                  <Target className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-medium text-muted-foreground text-sm">Avg Willingness-to-Pay</h3>
              </div>
              <p className="text-2xl font-bold text-foreground">$67</p>
              <p className="text-sm text-muted-foreground mt-1">Based on demand patterns</p>
            </Card>
          </div>

          {/* Recommended Actions */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Recommended Actions</h2>
            <div className="grid gap-3 md:grid-cols-3">
              <button className="flex items-center gap-3 rounded-lg border border-border bg-secondary/50 p-4 text-left hover:border-primary hover:bg-secondary transition-colors">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground text-sm">Fill underutilized nights</p>
                  <p className="text-xs text-muted-foreground">Focus on Wed bookings</p>
                </div>
              </button>
              <button className="flex items-center gap-3 rounded-lg border border-border bg-secondary/50 p-4 text-left hover:border-primary hover:bg-secondary transition-colors">
                <div className="rounded-lg bg-chart-3/10 p-2">
                  <DollarSign className="h-4 w-4 text-chart-3" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground text-sm">Adjust pricing on peaks</p>
                  <p className="text-xs text-muted-foreground">Optimize Fri-Sat revenue</p>
                </div>
              </button>
              <button className="flex items-center gap-3 rounded-lg border border-border bg-secondary/50 p-4 text-left hover:border-primary hover:bg-secondary transition-colors">
                <div className="rounded-lg bg-accent/10 p-2">
                  <Star className="h-4 w-4 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground text-sm">Invite high-fit artists</p>
                  <p className="text-xs text-muted-foreground">See recommendations below</p>
                </div>
              </button>
            </div>
          </Card>

          <Card className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Top Artist Matches</h2>
                <p className="text-sm text-muted-foreground">
                  High-confidence booking opportunities based on demand analysis
                </p>
              </div>
              <AIBadge text="Taste Graph Match" />
            </div>
            <div className="space-y-4">
              {bookingSuggestions.map((artist) => (
                <div
                  key={artist.name}
                  className="flex items-center gap-4 rounded-lg border border-border bg-secondary/50 p-4"
                >
                  <Image
                    src={artist.image || "/placeholder.svg"}
                    alt={artist.name}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{artist.name}</h3>
                    <p className="text-sm text-muted-foreground">{artist.genre}</p>
                    <div className="mt-2 flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3 text-primary" />
                        <span className="text-muted-foreground">
                          Expected Fill: <strong className="text-foreground">{artist.expectedFill}</strong>
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3 text-chart-3" />
                        <span className="text-muted-foreground">
                          Revenue: <strong className="text-foreground">{artist.revenue}</strong>
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Shield className={cn("h-3 w-3", artist.risk === "Low" ? "text-chart-3" : "text-chart-1")} />
                        <span className="text-muted-foreground">
                          Risk: <strong className="text-foreground">{artist.risk}</strong>
                        </span>
                      </div>
                    </div>
                  </div>
                  <Link href="/venue/events/create">
                    <Button size="sm" className="bg-primary text-primary-foreground">
                      Invite to Book
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {activeTab === "demand" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-1">Demand Forecast</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Understand when and what to book based on live fan demand signals
            </p>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Demand by Day of Week */}
              <Card className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">Demand by Day of Week</h3>
                  <AIBadge text="Live Analysis" />
                </div>
                <div className="flex items-end justify-around h-64 gap-3">
                  {demandByDay.map((item) => (
                    <div key={item.day} className="flex flex-col items-center gap-2 flex-1 group">
                      <div className="relative w-full">
                        <div
                          className="w-full rounded-t bg-gradient-to-t from-primary/50 to-primary transition-all group-hover:from-primary/70 group-hover:to-primary"
                          style={{ height: `${item.demand * 2}px` }}
                        />
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-popover border border-border rounded px-2 py-1 text-xs whitespace-nowrap">
                          {item.label} demand
                        </div>
                      </div>
                      <span className="text-sm font-medium text-foreground">{item.day}</span>
                      <span className="text-xs text-muted-foreground">{item.demand}%</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-muted-foreground italic">
                  Shows how fan demand varies by day to identify underutilized booking opportunities.
                </p>
              </Card>

              {/* Demand Heatmap */}
              <Card className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Demand Heatmap by Time Slot</h3>
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-6 gap-2 text-xs text-muted-foreground mb-2">
                    <div></div>
                    {timeSlots.map((slot) => (
                      <div key={slot} className="text-center">
                        {slot}
                      </div>
                    ))}
                  </div>
                  {demandHeatmap.map((row) => (
                    <div key={row.day} className="grid grid-cols-6 gap-2">
                      <div className="text-xs font-medium text-foreground flex items-center">{row.day}</div>
                      {row.slots.map((value, i) => (
                        <div
                          key={i}
                          className={cn(
                            "aspect-square rounded flex items-center justify-center text-xs font-medium",
                            value < 50
                              ? "bg-secondary text-muted-foreground"
                              : value < 75
                                ? "bg-primary/30 text-foreground"
                                : "bg-primary text-primary-foreground",
                          )}
                        >
                          {value}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="h-3 w-3 rounded bg-secondary" />
                    <span className="text-muted-foreground">Low</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-3 w-3 rounded bg-primary/30" />
                    <span className="text-muted-foreground">Medium</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-3 w-3 rounded bg-primary" />
                    <span className="text-muted-foreground">High</span>
                  </div>
                </div>
                <p className="mt-4 text-xs text-muted-foreground italic">
                  Highlights optimal show times by day based on live fan demand.
                </p>
              </Card>
            </div>
          </div>
        </div>
      )}

      {activeTab === "capacity" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-1">Capacity & Risk</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Prevent operational losses and optimize capacity utilization
            </p>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Seat Fill Trend */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Seat Fill Trend</h3>
                <div className="flex items-end justify-around h-48 gap-2">
                  {seatFillTrend.map((item, idx) => (
                    <div key={item.week} className="flex flex-col items-center gap-2 flex-1 group">
                      <div className="relative w-full">
                        <div
                          className={cn(
                            "w-full rounded-t transition-all",
                            item.fill >= 75
                              ? "bg-gradient-to-t from-chart-3/50 to-chart-3"
                              : item.fill >= 60
                                ? "bg-gradient-to-t from-primary/50 to-primary"
                                : "bg-gradient-to-t from-chart-1/50 to-chart-1",
                          )}
                          style={{ height: `${item.fill * 2}px` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-muted-foreground">{item.week}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className="h-3 w-3 rounded bg-chart-1" />
                    <span className="text-muted-foreground">{"<60%"}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-3 w-3 rounded bg-primary" />
                    <span className="text-muted-foreground">60-75%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-3 w-3 rounded bg-chart-3" />
                    <span className="text-muted-foreground">{">75%"}</span>
                  </div>
                </div>
                <p className="mt-4 text-xs text-muted-foreground italic">
                  Weekly capacity utilization trend helps identify booking momentum or decline.
                </p>
              </Card>

              {/* Underfilled Nights */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Underfilled Nights</h3>
                <div className="space-y-3">
                  {underfilledNights.map((night) => (
                    <div
                      key={night.date}
                      className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-3"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-foreground">{night.date}</span>
                          <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs text-primary">
                            {night.tag}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{night.event}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-chart-1">{night.expectedFill}</p>
                        <p className="text-xs text-muted-foreground">Expected fill</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-muted-foreground italic">
                  Identify revenue leakage and fix underfilled nights with targeted strategies.
                </p>
              </Card>
            </div>

            {/* Risk Indicators */}
            <Card className="p-6 border-chart-1/30 bg-chart-1/5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-chart-1 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2">Risk Indicators</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-chart-1 flex-shrink-0" />
                      <span>
                        <strong className="text-foreground">Oversaturation Risk:</strong> Three indie rock shows within
                        10 days may split audience
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-chart-1 flex-shrink-0" />
                      <span>
                        <strong className="text-foreground">Low-Demand Warning:</strong> Monday jazz bookings show 35%
                        lower fill rates
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "revenue" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-1">Revenue Analysis</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Understand what drives revenue based on historical performance
            </p>

            <Card className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-foreground">Top Revenue Drivers</h3>
                <p className="text-sm text-muted-foreground">
                  Based on historical attendance, spend, and repeat behavior
                </p>
              </div>
              <div className="space-y-3">
                {topRevenueDrivers.map((driver, idx) => (
                  <div
                    key={driver.name}
                    className="flex items-center gap-4 rounded-lg border border-border bg-secondary/30 p-4"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 font-bold text-primary">
                      #{idx + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{driver.name}</h4>
                      <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                        <span>
                          <strong className="text-foreground">{driver.attendance}</strong> attendance
                        </span>
                        <span>
                          <strong className="text-foreground">{driver.spend}</strong> avg spend
                        </span>
                        <span>
                          <strong className="text-foreground">{driver.repeat}</strong> repeat rate
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-chart-3">{driver.revenue}</p>
                      <p className="text-xs text-muted-foreground">Total revenue</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Price vs Willingness */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Avg Ticket Price</h3>
                <p className="text-4xl font-bold text-foreground">$62</p>
                <p className="text-sm text-muted-foreground mt-2">Current average across all events</p>
              </Card>
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Willingness to Pay</h3>
                <p className="text-4xl font-bold text-chart-3">$67</p>
                <p className="text-sm text-chart-3 mt-2">+$5 pricing opportunity</p>
              </Card>
            </div>
          </div>
        </div>
      )}

      {activeTab === "scenario" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-1">Scenario Planning</h2>
            <p className="text-sm text-muted-foreground mb-6">Simulate booking outcomes before committing to events</p>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Controls */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Adjust Variables</h3>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium text-foreground">Ticket Price</Label>
                      <span className="text-sm font-bold text-primary">${ticketPrice}</span>
                    </div>
                    <input
                      type="range"
                      min="45"
                      max="95"
                      step="5"
                      value={ticketPrice}
                      onChange={(e) => setTicketPrice(Number(e.target.value))}
                      className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>$45</span>
                      <span>$95</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium text-foreground">Capacity</Label>
                      <span className="text-sm font-bold text-primary">{capacity}</span>
                    </div>
                    <input
                      type="range"
                      min="300"
                      max="1000"
                      step="50"
                      value={capacity}
                      onChange={(e) => setCapacity(Number(e.target.value))}
                      className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>300</span>
                      <span>1,000</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-foreground">Marketing Boost</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["low", "med", "high"] as const).map((level) => (
                        <button
                          key={level}
                          onClick={() => setMarketingBoost(level)}
                          className={cn(
                            "rounded-lg px-3 py-2 text-sm font-medium transition-colors capitalize",
                            marketingBoost === level
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-muted-foreground hover:bg-secondary/80",
                          )}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Results */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Forecast Results</h3>
                <div className="space-y-6">
                  <div className="rounded-lg bg-primary/10 p-4">
                    <p className="text-sm text-muted-foreground mb-1">Expected Fill Rate</p>
                    <p className="text-4xl font-bold text-foreground">{expectedFill}%</p>
                    <div className="mt-3 h-2 rounded-full bg-secondary overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all",
                          expectedFill >= 75 ? "bg-chart-3" : expectedFill >= 60 ? "bg-primary" : "bg-chart-1",
                        )}
                        style={{ width: `${expectedFill}%` }}
                      />
                    </div>
                  </div>

                  <div className="rounded-lg bg-chart-3/10 p-4">
                    <p className="text-sm text-muted-foreground mb-1">Expected Revenue</p>
                    <p className="text-4xl font-bold text-chart-3">${expectedRevenue}K</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {Math.round(capacity * (expectedFill / 100))} tickets sold
                    </p>
                  </div>

                  <div
                    className={cn(
                      "rounded-lg p-4",
                      risk === "Low" ? "bg-chart-3/10" : risk === "Medium" ? "bg-primary/10" : "bg-chart-1/10",
                    )}
                  >
                    <p className="text-sm text-muted-foreground mb-1">Risk Level</p>
                    <p
                      className={cn(
                        "text-2xl font-bold",
                        risk === "Low" ? "text-chart-3" : risk === "Medium" ? "text-primary" : "text-chart-1",
                      )}
                    >
                      {risk}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {risk === "Low" && "High confidence booking with strong demand signals"}
                      {risk === "Medium" && "Moderate risk—consider demand boosting strategies"}
                      {risk === "High" && "High risk—pricing or capacity adjustments recommended"}
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-4 border-primary/30 bg-primary/5">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                <p className="text-sm text-foreground">
                  These projections are based on historical demand patterns, genre performance, and competitive market
                  analysis.
                </p>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>
}
