"use client"

import { BarChart3, TrendingUp, Users, DollarSign, Sparkles, Target } from "lucide-react"
import { StatCard } from "@/components/ui/stat-card"
import { AIBadge } from "@/components/ui/ai-badge"
import { ToolCallPanel } from "@/components/ui/tool-call-panel"
import { mockToolCalls } from "@/lib/mock-data"

const genreData = [
  { genre: "Electronic", demand: 87, events: 24 },
  { genre: "Hip Hop", demand: 82, events: 31 },
  { genre: "Rock", demand: 75, events: 18 },
  { genre: "Jazz", demand: 68, events: 12 },
  { genre: "Pop", demand: 91, events: 45 },
]

export default function PromoterAnalyticsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Promoter Dashboard</h1>
        <p className="mt-2 text-muted-foreground">Event performance predictions and market insights</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Active Events" value="12" icon={BarChart3} description="Across 8 venues" />
        <StatCard title="Total Revenue" value="$847K" change="+18%" changeType="positive" icon={DollarSign} />
        <StatCard title="Avg. Attendance" value="78%" change="+5%" changeType="positive" icon={Users} />
        <StatCard title="ROI" value="3.2x" icon={TrendingUp} description="Average across events" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Genre Demand */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Genre Demand in Your Region</h2>
            <AIBadge text="Market Analysis" />
          </div>
          <div className="space-y-4">
            {genreData.map((item) => (
              <div key={item.genre} className="flex items-center gap-4">
                <span className="w-24 font-medium text-foreground">{item.genre}</span>
                <div className="flex-1">
                  <div className="h-8 rounded-full bg-secondary">
                    <div
                      className="flex h-full items-center justify-end rounded-full bg-gradient-to-r from-primary/50 to-primary px-3"
                      style={{ width: `${item.demand}%` }}
                    >
                      <span className="text-xs font-medium text-primary-foreground">{item.demand}%</span>
                    </div>
                  </div>
                </div>
                <span className="w-20 text-right text-sm text-muted-foreground">{item.events} events</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Tools */}
        <ToolCallPanel calls={mockToolCalls.map((t) => ({ ...t, status: "completed" as const }))} />
      </div>

      {/* Marketing Recommendations */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">AI Marketing Recommendations</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-chart-3/30 bg-chart-3/10 p-4">
            <h3 className="font-medium text-chart-3">High Priority</h3>
            <p className="mt-2 text-sm text-foreground">
              Target electronic music fans in DC metro area - 23% higher engagement predicted
            </p>
          </div>
          <div className="rounded-lg border border-chart-4/30 bg-chart-4/10 p-4">
            <h3 className="font-medium text-chart-4">Medium Priority</h3>
            <p className="mt-2 text-sm text-foreground">
              Cross-promote jazz events with coffee shop partnerships - 15% conversion lift
            </p>
          </div>
          <div className="rounded-lg border border-border bg-secondary/50 p-4">
            <h3 className="font-medium text-muted-foreground">Consider</h3>
            <p className="mt-2 text-sm text-foreground">
              Bundle tickets with streaming service discount for Gen Z targeting
            </p>
          </div>
        </div>
      </div>

      {/* Fan Cluster Analysis */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Fan Cluster Analysis</h2>
          <AIBadge text="Segmentation" />
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { name: "Early Adopters", size: "12.4K", trait: "First to buy, high social sharing" },
            { name: "Deal Seekers", size: "8.7K", trait: "Price sensitive, bulk purchases" },
            { name: "VIP Enthusiasts", size: "3.2K", trait: "Premium tier, high LTV" },
            { name: "Local Regulars", size: "15.1K", trait: "Attend monthly, genre loyal" },
          ].map((cluster) => (
            <div key={cluster.name} className="rounded-lg border border-border bg-secondary/50 p-4">
              <h3 className="font-medium text-foreground">{cluster.name}</h3>
              <p className="text-2xl font-bold text-primary">{cluster.size}</p>
              <p className="mt-2 text-xs text-muted-foreground">{cluster.trait}</p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Summary */}
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
        <div className="flex items-center gap-3 mb-3">
          <Sparkles className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">AI Insights Summary</h3>
        </div>
        <p className="text-muted-foreground">
          Pop and Electronic genres are showing the strongest demand growth in your region. Consider increasing your
          portfolio in these areas. The "VIP Enthusiasts" cluster has 40% higher lifetime value—prioritize premium
          experiences for maximum ROI.
        </p>
        <p className="mt-3 text-xs text-muted-foreground">Powered by Giggin&apos;s Reasoning Engine + Taste Graph AI</p>
      </div>
    </div>
  )
}
