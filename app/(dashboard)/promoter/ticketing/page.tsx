"use client"

import { Ticket, TrendingUp, DollarSign, BarChart3 } from "lucide-react"
import { StatCard } from "@/components/ui/stat-card"
import { AIBadge } from "@/components/ui/ai-badge"

export default function TicketingInsightsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Ticketing Insights</h1>
        <p className="mt-2 text-muted-foreground">Performance metrics across your events</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Tickets Sold" value="24,847" change="+15%" changeType="positive" icon={Ticket} />
        <StatCard title="Revenue" value="$1.2M" change="+22%" changeType="positive" icon={DollarSign} />
        <StatCard title="Avg. Price" value="$67" icon={BarChart3} />
        <StatCard title="Conversion Rate" value="4.2%" change="+0.8%" changeType="positive" icon={TrendingUp} />
      </div>

      {/* Sales by Tier */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Sales by Tier</h2>
          <AIBadge text="Optimization Available" />
        </div>
        <div className="space-y-4">
          {[
            { tier: "Early Bird", sold: 8500, total: 10000, revenue: "$382,500" },
            { tier: "General Admission", sold: 12400, total: 20000, revenue: "$930,000" },
            { tier: "VIP", sold: 1947, total: 3000, revenue: "$292,050" },
          ].map((item) => (
            <div key={item.tier} className="flex items-center gap-4">
              <span className="w-32 font-medium text-foreground">{item.tier}</span>
              <div className="flex-1">
                <div className="h-6 rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${(item.sold / item.total) * 100}%` }}
                  />
                </div>
              </div>
              <span className="w-24 text-right text-sm text-muted-foreground">
                {item.sold.toLocaleString()}/{item.total.toLocaleString()}
              </span>
              <span className="w-24 text-right font-medium text-foreground">{item.revenue}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
