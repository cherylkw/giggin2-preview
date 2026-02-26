"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Calendar,
  MapPin,
  Users,
  TrendingUp,
  AlertTriangle,
  Megaphone,
  DollarSign,
  Music,
  UserPlus,
  Ticket,
  Instagram,
  Mail,
  Share2,
} from "lucide-react"
import { AIBadge } from "@/components/ui/ai-badge"
import { StatCard } from "@/components/ui/stat-card"
import { Button } from "@/components/ui/button"
import { mockArtists } from "@/lib/mock-data"

const forecastData = [
  { month: "Jan", predicted: 12500, actual: 11800 },
  { month: "Feb", predicted: 14200, actual: null },
  { month: "Mar", predicted: 18500, actual: null },
  { month: "Apr", predicted: 22000, actual: null },
]

const eventForecasts = [
  {
    event: "Electronic Festival",
    date: "Feb 15",
    venue: "Pier 17",
    predicted: 4200,
    confidence: 87,
    sellThrough: 62,
    riskFactor: "Late sales start",
    actions: [
      { id: "boost-ig", label: "Boost IG Ads", icon: Megaphone },
      { id: "adjust-price", label: "Adjust Ticket Tier", icon: DollarSign },
      { id: "group-buy", label: "Launch Group Buy", icon: Users },
      { id: "support-act", label: "Add Support Act", icon: Music },
    ],
  },
  {
    event: "Jazz Night Series",
    date: "Feb 22",
    venue: "Blue Note",
    predicted: 180,
    confidence: 94,
    sellThrough: 78,
    riskFactor: "High price resistance",
    actions: [
      { id: "release-ga", label: "Release More GA", icon: Ticket },
      { id: "local-promo", label: "Schedule Local Co-Promo", icon: UserPlus },
      { id: "adjust-price", label: "Adjust Ticket Tier", icon: DollarSign },
      { id: "boost-email", label: "Boost Email Campaign", icon: Megaphone },
    ],
  },
]

export default function PromoterInsightsPage() {
  const [activeTab, setActiveTab] = useState<"demand" | "talent" | "marketing">("demand")
  const [actionResults, setActionResults] = useState<{ eventId: string; action: string; result: string }[]>([])
  const [scenarioAdSpend, setScenarioAdSpend] = useState(50)
  const [scenarioPriceTier, setScenarioPriceTier] = useState("standard")

  const handleActionClick = (eventName: string, actionId: string, actionLabel: string) => {
    const results: Record<string, string> = {
      "boost-ig": "Projected sell-through +6% (Estimated)",
      "adjust-price": "Recommended: Lower GA tier by $10, add VIP tier at +$25",
      "group-buy": "Group offer: 4+ tickets = 15% off. Projected +120 sales",
      "support-act": "Suggested: Local DJ Set (7-8pm). Projected +8% attendance",
      "release-ga": "Release 50 GA tickets. Projected sell-through +4%",
      "local-promo": "Partner with 3 local venues. Projected reach +2,500",
      "boost-email": "Increase send frequency to 2x/week. Projected +5% conversions",
    }

    setActionResults([
      ...actionResults,
      {
        eventId: eventName,
        action: actionLabel,
        result: results[actionId] || "Action processed successfully",
      },
    ])
  }

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-border">
        <button
          onClick={() => setActiveTab("demand")}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "demand"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Demand
        </button>
        <button
          onClick={() => setActiveTab("talent")}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "talent"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Talent
        </button>
        <button
          onClick={() => setActiveTab("marketing")}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "marketing"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Marketing
        </button>
      </div>

      {/* Demand Tab */}
      {activeTab === "demand" && (
        <div className="space-y-8">
          {/* Forecast Chart */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Attendance Forecast</h2>
              <AIBadge text="ML Prediction" />
            </div>
            <div className="h-64 flex items-end justify-around gap-4">
              {forecastData.map((item) => (
                <div key={item.month} className="flex flex-col items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-8 rounded-t bg-primary" style={{ height: `${item.predicted / 250}px` }} />
                    {item.actual && (
                      <div className="w-8 rounded-t bg-chart-3" style={{ height: `${item.actual / 250}px` }} />
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">{item.month}</span>
                  <span className="text-xs text-foreground">{item.predicted.toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-4 justify-center text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded bg-primary" />
                <span className="text-muted-foreground">Predicted</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded bg-chart-3" />
                <span className="text-muted-foreground">Actual</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {eventForecasts.map((item) => (
              <div key={item.event} className="space-y-4">
                {/* Event Forecast Card */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{item.event}</h3>
                      <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {item.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {item.venue}
                        </span>
                      </div>
                    </div>
                    <AIBadge text={`${item.confidence}% confidence`} />
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-3">
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-primary" />
                      <div>
                        <div className="text-sm text-muted-foreground">Predicted Attendance</div>
                        <div className="text-lg font-bold text-foreground">{item.predicted.toLocaleString()}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <TrendingUp className="h-5 w-5 text-green-500" />
                      <div>
                        <div className="text-sm text-muted-foreground">Projected Sell-Through</div>
                        <div className="text-lg font-bold text-foreground">{item.sellThrough}%</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                      <div>
                        <div className="text-sm text-muted-foreground">Primary Risk</div>
                        <div className="text-sm font-medium text-foreground">{item.riskFactor}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 rounded-lg border border-border bg-secondary/30 p-4">
                    <h4 className="mb-3 text-sm font-semibold text-foreground">Scenario Modeling</h4>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-xs text-muted-foreground">Ad Spend Level</label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={scenarioAdSpend}
                          onChange={(e) => setScenarioAdSpend(Number(e.target.value))}
                          className="w-full"
                        />
                        <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                          <span>Low</span>
                          <span className="font-medium text-foreground">{scenarioAdSpend}%</span>
                          <span>High</span>
                        </div>
                      </div>
                      <div>
                        <label className="mb-2 block text-xs text-muted-foreground">Price Tier</label>
                        <select
                          value={scenarioPriceTier}
                          onChange={(e) => setScenarioPriceTier(e.target.value)}
                          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                        >
                          <option value="budget">Budget (-20%)</option>
                          <option value="standard">Standard (Current)</option>
                          <option value="premium">Premium (+15%)</option>
                        </select>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-sm">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-muted-foreground">Adjusted Sell-Through:</span>
                      <span className="font-semibold text-foreground">
                        {item.sellThrough + Math.round((scenarioAdSpend - 50) * 0.2)}%
                      </span>
                      <span className="text-xs text-muted-foreground">(Estimated)</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-primary/30 bg-card p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h4 className="font-semibold text-foreground">Recommended AI Actions</h4>
                    <AIBadge text="Giggin' AI" />
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                    {item.actions.slice(0, 4).map((action) => (
                      <button
                        key={action.id}
                        onClick={() => handleActionClick(item.event, action.id, action.label)}
                        className="flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-3 text-left text-sm font-medium transition-colors hover:border-primary hover:bg-primary/5"
                      >
                        <action.icon className="h-4 w-4 text-primary" />
                        {action.label}
                      </button>
                    ))}
                  </div>
                </div>

                {actionResults.filter((r) => r.eventId === item.event).length > 0 && (
                  <div className="space-y-2">
                    {actionResults
                      .filter((r) => r.eventId === item.event)
                      .map((result, idx) => (
                        <div key={idx} className="rounded-lg border border-green-500/30 bg-green-500/10 p-4">
                          <div className="flex items-start gap-3">
                            <TrendingUp className="h-5 w-5 text-green-500" />
                            <div>
                              <div className="font-medium text-foreground">{result.action}</div>
                              <div className="mt-1 text-sm text-muted-foreground">{result.result}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Talent Tab */}
      {activeTab === "talent" && (
        <div className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockArtists.map((artist) => (
              <div
                key={artist.id}
                className="rounded-xl border border-border bg-card overflow-hidden transition-colors hover:border-primary/50"
              >
                <div className="relative aspect-square">
                  <Image src={artist.image || "/placeholder.svg"} alt={artist.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  <AIBadge text={`${artist.popularity}% match`} className="absolute top-3 right-3" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-foreground">{artist.name}</h3>
                  <p className="text-sm text-muted-foreground">{artist.genre}</p>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      {(artist.followers / 1000).toFixed(0)}K followers
                    </span>
                    <span className="flex items-center gap-1 text-chart-3">
                      <TrendingUp className="h-4 w-4" />
                      High demand
                    </span>
                  </div>
                  <Button className="mt-4 w-full bg-transparent" variant="outline">
                    View Profile
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Marketing Tab */}
      {activeTab === "marketing" && (
        <div className="space-y-8">
          {/* Marketing Stats */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Total Reach" value="124K" icon={Users} change="+18% this week" />
            <StatCard title="Campaign ROI" value="3.2x" icon={TrendingUp} change="+0.4x vs last month" />
            <StatCard title="Cost Per Acquisition" value="$12.50" icon={DollarSign} change="-$2.20 improvement" />
            <StatCard title="Active Campaigns" value="8" icon={Megaphone} change="3 launching soon" />
          </div>

          {/* Channel Performance */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Channel Performance</h2>
              <AIBadge text="Real-time" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-500/20">
                    <Instagram className="h-5 w-5 text-pink-500" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Instagram Ads</div>
                    <div className="text-sm text-muted-foreground">Spend: $1,240</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-foreground">342 conversions</div>
                  <div className="text-sm text-green-500">ROI: 3.8x</div>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20">
                    <Mail className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Email Marketing</div>
                    <div className="text-sm text-muted-foreground">Spend: $180</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-foreground">198 conversions</div>
                  <div className="text-sm text-green-500">ROI: 4.2x</div>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/20">
                    <Share2 className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Partner Network</div>
                    <div className="text-sm text-muted-foreground">Spend: $520</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-foreground">156 conversions</div>
                  <div className="text-sm text-green-500">ROI: 2.6x</div>
                </div>
              </div>
            </div>
          </div>

          {/* Conversion Funnel Details */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold text-foreground">Conversion Funnel</h2>
              <div className="space-y-4">
                {[
                  { stage: "View", count: "45,200", percent: "100%", color: "primary" },
                  { stage: "Click", count: "8,136", percent: "18%", color: "chart-1" },
                  { stage: "Add to Cart", count: "3,616", percent: "8%", color: "chart-2" },
                  { stage: "Purchase", count: "2,350", percent: "5.2%", color: "chart-3" },
                ].map((stage) => (
                  <div key={stage.stage}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{stage.stage}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">{stage.count}</span>
                        <span className="text-xs text-muted-foreground">({stage.percent})</span>
                      </div>
                    </div>
                    <div className="h-2 rounded-full bg-secondary">
                      <div className={`h-2 rounded-full bg-${stage.color}`} style={{ width: stage.percent }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">Top Performing Events</h2>
                <AIBadge text="This week" />
              </div>
              <div className="space-y-3">
                {[
                  { name: "Electronic Festival", conversions: 892, cpa: "$11.20" },
                  { name: "Jazz Night Series", conversions: 456, cpa: "$9.80" },
                  { name: "Rock Revival Tour", conversions: 324, cpa: "$14.50" },
                ].map((event) => (
                  <div
                    key={event.name}
                    className="flex items-center justify-between rounded-lg border border-border p-3"
                  >
                    <div>
                      <div className="font-medium text-foreground">{event.name}</div>
                      <div className="text-xs text-muted-foreground">{event.conversions} conversions</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-foreground">{event.cpa}</div>
                      <div className="text-xs text-muted-foreground">CPA</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
