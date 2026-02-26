"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatCard } from "@/components/ui/stat-card"
import { AIBadge } from "@/components/ui/ai-badge"
import {
  TrendingUp,
  Users,
  DollarSign,
  Target,
  Lightbulb,
  AlertTriangle,
  Activity,
  BarChart3,
  Calendar,
  Zap,
} from "lucide-react"
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
  { date: "Jan 15", event: "Local Opener Night", expectedFill: "45%", fix: "book local opener" },
  { date: "Jan 18", event: "Mid-week Jazz", expectedFill: "52%", fix: "bundle promo" },
  { date: "Jan 22", event: "Open slot", expectedFill: "—", fix: "genre swap" },
  { date: "Jan 29", event: "Acoustic Night", expectedFill: "48%", fix: "lower price" },
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
    image: "/placeholder.svg?height=80&width=80&text=LE",
  },
  {
    name: "The Velvet Underground Revival",
    genre: "Indie Rock",
    expectedFill: "82%",
    revenue: "$45K - $58K",
    image: "/placeholder.svg?height=80&width=80&text=VU",
  },
  {
    name: "Neon Futures",
    genre: "Electronic",
    expectedFill: "85%",
    revenue: "$48K - $62K",
    image: "/placeholder.svg?height=80&width=80&text=NF",
  },
]

export default function VenueDemandPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "forecast" | "capacity" | "revenue" | "scenario">("overview")
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d" | "upcoming">("30d")
  const [ticketPrice, setTicketPrice] = useState(65)
  const [marketingBoost, setMarketingBoost] = useState<"low" | "med" | "high">("med")

  // Mock scenario calculations
  const expectedFill = Math.min(
    95,
    65 + (ticketPrice < 65 ? 10 : -5) + (marketingBoost === "high" ? 8 : marketingBoost === "med" ? 4 : 0),
  )
  const expectedRevenue = Math.round((ticketPrice * 3500 * (expectedFill / 100)) / 1000)
  const risk = expectedFill < 60 ? "High" : expectedFill < 75 ? "Medium" : "Low"

  const tabs = [
    { id: "overview" as const, label: "Overview", icon: Activity },
    { id: "forecast" as const, label: "Demand Forecast", icon: Calendar },
    { id: "capacity" as const, label: "Capacity & Risk", icon: AlertTriangle },
    { id: "revenue" as const, label: "Revenue Analysis", icon: BarChart3 },
    { id: "scenario" as const, label: "Scenario Planning", icon: Zap },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Demand Intelligence</h1>
        <p className="text-muted-foreground">AI-powered booking recommendations and capacity optimization</p>
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
          {/* Section A: AI Booking Summary */}
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
                <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span>
                      Fri–Sat 9–11pm shows generate the highest revenue per seat for electronic and indie acts.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span>Wednesdays show consistent underutilization across the last 90 days.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span>Mid-cap electronic acts outperform larger indie bookings on repeat attendance.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span>Raising ticket prices by 5–8% on peak nights maintains fill rate above target.</span>
                  </li>
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="text-xs bg-transparent">
                    Suggest lineup
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs bg-transparent">
                    Predict sellout risk
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs bg-transparent">
                    Compare artist fit
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Section B: KPI Row */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Peak Demand Window"
              value="Fri-Sat, 9pm"
              icon={TrendingUp}
              description="Best nights and time slots to book high-demand shows"
            />
            <StatCard
              title="Projected Fill Rate"
              value="78%"
              change="+5%"
              changeType="positive"
              icon={Users}
              description="Expected capacity utilization across upcoming bookings"
            />
            <StatCard
              title="Price Strength"
              value="$67"
              icon={DollarSign}
              description="Average willingness-to-pay at current demand levels"
            />
            <StatCard
              title="Revenue Potential"
              value="$245K"
              change="+12%"
              changeType="positive"
              icon={Target}
              description="Estimated monthly upside given current booking mix"
            />
          </div>

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Button
                variant="outline"
                className="justify-start bg-transparent"
                onClick={() => setActiveTab("forecast")}
              >
                <Calendar className="mr-2 h-4 w-4" />
                View Demand Forecast
              </Button>
              <Button
                variant="outline"
                className="justify-start bg-transparent"
                onClick={() => setActiveTab("capacity")}
              >
                <AlertTriangle className="mr-2 h-4 w-4" />
                Check Capacity Risk
              </Button>
              <Button
                variant="outline"
                className="justify-start bg-transparent"
                onClick={() => setActiveTab("revenue")}
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Analyze Revenue
              </Button>
              <Button
                variant="outline"
                className="justify-start bg-transparent"
                onClick={() => setActiveTab("scenario")}
              >
                <Zap className="mr-2 h-4 w-4" />
                Run Scenario
              </Button>
            </div>
          </Card>
        </div>
      )}

      {activeTab === "forecast" && (
        <div className="space-y-6">
          {/* Section C: Time Range Controls */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Time Range:</span>
            <div className="inline-flex rounded-lg border border-border bg-card p-1">
              {(["7d", "30d", "90d", "upcoming"] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={cn(
                    "px-4 py-1.5 text-sm font-medium rounded-md transition-colors",
                    timeRange === range
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {range === "7d"
                    ? "Last 7d"
                    : range === "30d"
                      ? "Last 30d"
                      : range === "90d"
                        ? "Last 90d"
                        : "Upcoming 30d"}
                </button>
              ))}
            </div>
          </div>

          {/* Section D: When to Book */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-1">When to Book</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Time-based demand signals to identify optimal booking windows and avoid oversaturation
            </p>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Left: Demand by Day of Week */}
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
                  Use this to identify underutilized nights and avoid oversaturating peak days.
                </p>
              </Card>

              {/* Right: Demand Heatmap */}
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
                  Highlights optimal show start times by day to maximize attendance and spend.
                </p>
              </Card>
            </div>
          </div>
        </div>
      )}

      {activeTab === "capacity" && (
        <div className="space-y-6">
          {/* Section E: Capacity Health & Risk */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-1">Capacity Health & Risk</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Track booking momentum, identify revenue leakage, and fix underfilled nights
            </p>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Seat Fill Trend */}
              <Card className="p-6">
                <h3 className="mb-4 text-lg font-semibold text-foreground">Seat Fill Trend</h3>
                <div className="flex items-end justify-around h-48 gap-2">
                  {seatFillTrend.map((item, i) => (
                    <div key={item.week} className="flex flex-col items-center gap-2 flex-1">
                      <div
                        className={cn(
                          "w-full rounded-t transition-all",
                          item.fill < 70 ? "bg-destructive/50" : "bg-chart-3",
                        )}
                        style={{ height: `${item.fill * 1.8}px` }}
                      />
                      <span className="text-xs font-medium text-foreground">{item.week}</span>
                      <span className="text-xs text-muted-foreground">{item.fill}%</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                  <span className="text-muted-foreground">W4 shows capacity drop — review lineup</span>
                </div>
                <p className="mt-4 text-xs text-muted-foreground italic">
                  Tracks booking momentum and identifies early warning signs of demand drop-off.
                </p>
              </Card>

              {/* Underfilled Nights */}
              <Card className="p-6">
                <h3 className="mb-4 text-lg font-semibold text-foreground">Underfilled Nights</h3>
                <div className="space-y-3">
                  {underfilledNights.map((night) => (
                    <div
                      key={night.date}
                      className="flex items-center justify-between gap-4 rounded-lg border border-border p-3"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground">{night.date}</div>
                        <div className="text-xs text-muted-foreground truncate">{night.event}</div>
                        <div className="mt-1 text-xs text-muted-foreground/80">
                          {night.expectedFill === "—" ? "Open slot" : `${night.expectedFill} expected fill`}
                        </div>
                      </div>
                      <div className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-foreground whitespace-nowrap">
                        {night.fix}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-muted-foreground italic">
                  Nights below 60% fill rate with suggested fixes based on genre fit and pricing signals.
                </p>
              </Card>
            </div>
          </div>
        </div>
      )}

      {activeTab === "revenue" && (
        <div className="space-y-6">
          {/* Section F: What Actually Makes Money */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-1">What Actually Makes Money</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Revenue drivers and booking recommendations based on your audience
            </p>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Top Revenue Drivers */}
              <Card className="p-6">
                <h3 className="mb-2 text-lg font-semibold text-foreground">Top Revenue Drivers</h3>
                <p className="mb-4 text-xs text-muted-foreground">
                  Genres and formats ranked by attendance, spend, and repeat visits.
                </p>
                <div className="space-y-3">
                  {topRevenueDrivers.map((driver, i) => (
                    <div key={driver.name} className="flex items-center gap-4 rounded-lg border border-border p-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-sm font-bold text-primary">
                        {i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground">{driver.name}</div>
                        <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{driver.attendance}</span>
                          <span>•</span>
                          <span>{driver.spend} avg</span>
                          <span>•</span>
                          <span>{driver.repeat} repeat</span>
                        </div>
                      </div>
                      <div className="text-sm font-semibold text-chart-3">{driver.revenue}</div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Best-Fit Booking Suggestions */}
              <Card className="p-6">
                <h3 className="mb-2 text-lg font-semibold text-foreground">Best-Fit Booking Suggestions</h3>
                <p className="mb-4 text-xs text-muted-foreground">
                  Artists predicted to perform well based on your crowd, calendar gaps, and past results.
                </p>
                <div className="space-y-3">
                  {bookingSuggestions.map((artist) => (
                    <div key={artist.name} className="flex items-center gap-4 rounded-lg border border-border p-4">
                      <img
                        src={artist.image || "/placeholder.svg"}
                        alt={artist.name}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground">{artist.name}</div>
                        <div className="mt-0.5 text-xs text-muted-foreground">{artist.genre}</div>
                        <div className="mt-1 flex items-center gap-3 text-xs">
                          <span className="text-chart-3">{artist.expectedFill} fill</span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-muted-foreground">{artist.revenue}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <Button size="sm" variant="outline" className="text-xs bg-transparent">
                          Invite to book
                        </Button>
                        <Button size="sm" variant="ghost" className="text-xs">
                          View demand
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}

      {activeTab === "scenario" && (
        <div className="space-y-6">
          {/* Section G: Scenario Simulator */}
          <Card className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <h2 className="text-lg font-semibold text-foreground">Scenario Simulator</h2>
              <AIBadge text="Predictive Modeling" />
            </div>
            <p className="mb-6 text-xs text-muted-foreground">
              Test pricing, marketing spend, and capacity changes before committing resources
            </p>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Inputs */}
              <div className="space-y-6">
                <div>
                  <label className="mb-2 flex items-center justify-between text-sm font-medium text-foreground">
                    <span>Ticket Price</span>
                    <span className="text-primary">${ticketPrice}</span>
                  </label>
                  <input
                    type="range"
                    min="35"
                    max="95"
                    value={ticketPrice}
                    onChange={(e) => setTicketPrice(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                    <span>$35</span>
                    <span>$95</span>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">Capacity Setting</label>
                  <div className="rounded-lg border border-border bg-secondary/50 px-4 py-2 text-sm text-muted-foreground">
                    3,500 seats (fixed)
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">Marketing Boost</label>
                  <div className="flex gap-2">
                    {(["low", "med", "high"] as const).map((level) => (
                      <button
                        key={level}
                        onClick={() => setMarketingBoost(level)}
                        className={cn(
                          "flex-1 rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
                          marketingBoost === level
                            ? "border-primary bg-primary/20 text-primary"
                            : "border-border text-muted-foreground hover:border-primary/50",
                        )}
                      >
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Outputs */}
              <div className="space-y-4">
                <div className="rounded-lg border border-border bg-card p-4">
                  <div className="text-sm text-muted-foreground">Expected Fill Rate</div>
                  <div className="mt-1 text-3xl font-bold text-foreground">{expectedFill}%</div>
                  <div className="mt-2 h-2 rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${expectedFill}%` }}
                    />
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-card p-4">
                  <div className="text-sm text-muted-foreground">Expected Revenue</div>
                  <div className="mt-1 text-3xl font-bold text-foreground">${expectedRevenue}K</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    Based on {Math.round(3500 * (expectedFill / 100))} projected tickets
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-card p-4">
                  <div className="text-sm text-muted-foreground">Risk Assessment</div>
                  <div
                    className={cn(
                      "mt-1 text-lg font-semibold",
                      risk === "Low" ? "text-chart-3" : risk === "Medium" ? "text-chart-2" : "text-destructive",
                    )}
                  >
                    {risk} Risk
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {risk === "Low" && "Strong demand signals, safe to proceed"}
                    {risk === "Medium" && "Moderate demand, monitor closely"}
                    {risk === "High" && "Weak demand, consider adjustments"}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
