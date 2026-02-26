"use client"

import { Ticket, DollarSign, TrendingUp, Settings } from "lucide-react"
import { StatCard } from "@/components/ui/stat-card"

export default function MarketplaceToolsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Marketplace Tools</h1>
        <p className="mt-2 text-muted-foreground">Platform-wide marketplace configuration</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Active Listings" value="12,450" icon={Ticket} />
        <StatCard title="GMV (MTD)" value="$2.4M" change="+18%" changeType="positive" icon={DollarSign} />
        <StatCard title="Avg. Transaction" value="$89" icon={TrendingUp} />
        <StatCard title="Platform Fee" value="5%" icon={Settings} />
      </div>

      {/* Fee Configuration */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Fee Configuration</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-border bg-secondary/50 p-4">
            <h3 className="font-medium text-foreground">Primary Sales</h3>
            <p className="text-2xl font-bold text-primary">5%</p>
            <p className="text-sm text-muted-foreground">Platform fee on initial ticket sales</p>
          </div>
          <div className="rounded-lg border border-border bg-secondary/50 p-4">
            <h3 className="font-medium text-foreground">Secondary Sales</h3>
            <p className="text-2xl font-bold text-primary">10%</p>
            <p className="text-sm text-muted-foreground">Fee on resale transactions</p>
          </div>
          <div className="rounded-lg border border-border bg-secondary/50 p-4">
            <h3 className="font-medium text-foreground">Smart Contract Fee</h3>
            <p className="text-2xl font-bold text-primary">1%</p>
            <p className="text-sm text-muted-foreground">Fee for auto-split processing</p>
          </div>
        </div>
      </div>
    </div>
  )
}
