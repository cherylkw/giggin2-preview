"use client"

import { TrendingUp, Users, DollarSign, Instagram, Mail, Share2, Megaphone } from "lucide-react"
import { StatCard } from "@/components/ui/stat-card"
import { AIBadge } from "@/components/ui/ai-badge"

export default function MarketingPerformancePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Marketing Performance</h1>
        <p className="mt-2 text-muted-foreground">Campaign analytics and channel performance</p>
      </div>

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
          {[
            {
              channel: "Instagram Ads",
              icon: Instagram,
              spend: "$1,240",
              conversions: 342,
              roi: "3.8x",
              color: "pink",
            },
            { channel: "Email Marketing", icon: Mail, spend: "$180", conversions: 198, roi: "4.2x", color: "blue" },
            { channel: "Partner Network", icon: Share2, spend: "$520", conversions: 156, roi: "2.6x", color: "green" },
          ].map((channel) => (
            <div
              key={channel.channel}
              className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4"
            >
              <div className="flex items-center gap-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-${channel.color}-500/20`}>
                  <channel.icon className={`h-5 w-5 text-${channel.color}-500`} />
                </div>
                <div>
                  <div className="font-medium text-foreground">{channel.channel}</div>
                  <div className="text-sm text-muted-foreground">Spend: {channel.spend}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-foreground">{channel.conversions} conversions</div>
                <div className="text-sm text-green-500">ROI: {channel.roi}</div>
              </div>
            </div>
          ))}
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
            ].map((stage, idx) => (
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
              <div key={event.name} className="flex items-center justify-between rounded-lg border border-border p-3">
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
  )
}
