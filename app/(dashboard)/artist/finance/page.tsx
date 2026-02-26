"use client"

import { useState } from "react"
import Link from "next/link"
import { FileText, TrendingUp, Check, Clock, DollarSign, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { StatCard } from "@/components/ui/stat-card"
import { AIBadge } from "@/components/ui/ai-badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

const mockEarnings = [
  { month: "Jan", amount: 24850 },
  { month: "Feb", amount: 28200 },
  { month: "Mar", amount: 32100 },
  { month: "Apr", amount: 29800 },
  { month: "May", amount: 35400 },
  { month: "Jun", amount: 38700 },
]

const mockPayouts = [
  { id: "1", date: "2025-01-15", amount: 8450, status: "completed" as const, event: "Neon Dreams @ The Anthem" },
  { id: "2", date: "2025-01-22", amount: 6200, status: "completed" as const, event: "Midnight Sessions" },
  { id: "3", date: "2025-02-05", amount: 9800, status: "pending" as const, event: "Summer Festival Set" },
  { id: "4", date: "2025-02-12", amount: 5400, status: "processing" as const, event: "After Dark @ The Warehouse" },
]

const mockRevenueSplits = [
  { event: "Neon Dreams @ The Anthem", total: 45200, yourShare: 8450, percentage: 70, partners: 2 },
  { event: "Midnight Sessions", total: 32100, yourShare: 6200, percentage: 65, partners: 3 },
  { event: "Summer Festival Set", total: 58900, yourShare: 9800, percentage: 80, partners: 1 },
]

const mockFinanceContracts = [
  {
    id: "SC-001",
    eventName: "Neon Dreams @ The Anthem",
    venue: "The Anthem",
    date: "2025-01-15",
    guarantee: 5000,
    split: "70/30",
    status: "active" as const,
  },
  {
    id: "SC-002",
    eventName: "Midnight Sessions",
    venue: "Blue Note Jazz Club",
    date: "2025-01-18",
    guarantee: 3500,
    split: "65/35",
    status: "active" as const,
  },
  {
    id: "SC-003",
    eventName: "Summer Festival Set",
    venue: "Pier 17",
    date: "2025-01-22",
    guarantee: 8000,
    split: "80/20",
    status: "pending" as const,
  },
  {
    id: "SC-004",
    eventName: "After Dark @ The Warehouse",
    venue: "The Warehouse",
    date: "2025-01-25",
    guarantee: 4200,
    split: "60/40",
    status: "active" as const,
  },
]

export default function ArtistFinancePage() {
  const [activeTab, setActiveTab] = useState<"earnings" | "splits" | "history" | "contracts">("earnings")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Finance</h1>
        <p className="mt-2 text-muted-foreground">Manage your earnings, revenue splits, and smart contracts</p>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
          <TabsTrigger value="splits">Revenue Splits</TabsTrigger>
          <TabsTrigger value="history">Payout History</TabsTrigger>
          <TabsTrigger value="contracts">Contracts</TabsTrigger>
        </TabsList>

        {/* Earnings Tab */}
        <TabsContent value="earnings" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard
              title="Total Earnings (YTD)"
              value="$189,050"
              change="+28%"
              changeType="positive"
              icon={DollarSign}
            />
            <StatCard title="Pending Payouts" value="$15,200" icon={Clock} description="2 events awaiting settlement" />
            <StatCard title="Avg per Show" value="$8,450" change="+15%" changeType="positive" icon={TrendingUp} />
          </div>

          {/* Earnings Chart */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Monthly Earnings</h3>
            <div className="flex items-end justify-around h-64 gap-2">
              {mockEarnings.map((item) => (
                <div key={item.month} className="flex flex-col items-center gap-2 flex-1">
                  <div
                    className="w-full rounded-t bg-gradient-to-t from-primary/50 to-primary"
                    style={{ height: `${item.amount / 400}px` }}
                  />
                  <span className="text-sm font-medium text-foreground">{item.month}</span>
                  <span className="text-xs text-muted-foreground">${(item.amount / 1000).toFixed(1)}K</span>
                </div>
              ))}
            </div>
          </Card>

          {/* AI Insights */}
          <Card className="border-primary/30 bg-primary/5 p-6">
            <div className="flex items-center gap-3 mb-3">
              <AIBadge text="AI Insights" />
            </div>
            <p className="text-foreground">
              Your average per-show earnings increased 15% over the last quarter. Weekend shows in major cities generate
              32% more revenue than weekday performances.
            </p>
          </Card>
        </TabsContent>

        {/* Revenue Splits Tab */}
        <TabsContent value="splits" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Revenue Splits by Event</h3>
            <div className="space-y-4">
              {mockRevenueSplits.map((split) => (
                <div key={split.event} className="rounded-lg border border-border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-foreground">{split.event}</h4>
                    <span className="text-sm text-muted-foreground">{split.partners} partners</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Total Revenue</p>
                      <p className="text-lg font-semibold text-foreground">${split.total.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Your Share ({split.percentage}%)</p>
                      <p className="text-lg font-semibold text-primary">${split.yourShare.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Status</p>
                      <span className="inline-flex items-center gap-1 rounded-full bg-chart-3/20 px-2 py-1 text-xs font-medium text-chart-3">
                        <Check className="h-3 w-3" />
                        Settled
                      </span>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${split.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Payout History Tab */}
        <TabsContent value="history" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Payout History</h3>
            <div className="space-y-3">
              {mockPayouts.map((payout) => (
                <div key={payout.id} className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{payout.event}</p>
                    <p className="text-sm text-muted-foreground">{payout.date}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-semibold text-foreground">${payout.amount.toLocaleString()}</span>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium",
                        payout.status === "completed"
                          ? "bg-chart-3/20 text-chart-3"
                          : payout.status === "pending"
                            ? "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400"
                            : "bg-blue-500/20 text-blue-600 dark:text-blue-400",
                      )}
                    >
                      {payout.status === "completed" ? (
                        <Check className="h-3 w-3" />
                      ) : payout.status === "pending" ? (
                        <Clock className="h-3 w-3" />
                      ) : (
                        <TrendingUp className="h-3 w-3" />
                      )}
                      {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Contracts Tab */}
        <TabsContent value="contracts" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard
              title="Active Contracts"
              value={mockFinanceContracts.filter((c) => c.status === "active").length.toString()}
              icon={FileText}
            />
            <StatCard
              title="Pending Signatures"
              value={mockFinanceContracts.filter((c) => c.status === "pending").length.toString()}
              icon={Clock}
            />
            <StatCard
              title="Automated Splits"
              value="100%"
              icon={Sparkles}
              description="All contracts use smart splits"
            />
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Your Smart Contracts</h2>
              <Button size="sm">View All</Button>
            </div>
            <div className="space-y-3">
              {mockFinanceContracts.slice(0, 4).map((contract) => (
                <Link
                  key={contract.id}
                  href={`/artist/finance/${contract.id}`}
                  className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-4 transition-colors hover:border-primary"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{contract.eventName}</h3>
                      <p className="text-sm text-muted-foreground">
                        {contract.venue} • {contract.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-semibold text-foreground">${contract.guarantee.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">{contract.split} revenue split</p>
                    </div>
                    <span
                      className={cn(
                        "rounded-full px-3 py-1 text-xs font-medium",
                        contract.status === "active"
                          ? "bg-chart-3/20 text-chart-3"
                          : contract.status === "pending"
                            ? "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400"
                            : "bg-red-500/20 text-red-600 dark:text-red-400",
                      )}
                    >
                      {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
