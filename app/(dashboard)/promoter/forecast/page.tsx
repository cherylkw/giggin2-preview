"use client"

import { useState } from "react"
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
} from "lucide-react"
import { AIBadge } from "@/components/ui/ai-badge"

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

export default function DemandForecastPage() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)
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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Demand Forecast</h1>
        <p className="mt-2 text-muted-foreground">AI-powered predictions for upcoming events</p>
      </div>

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
  )
}
