"use client"

import { useState } from "react"
import Link from "next/link"
import { FileText, TrendingUp, Check, Clock, DollarSign, Sparkles, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { StatCard } from "@/components/ui/stat-card"
import { AIBadge } from "@/components/ui/ai-badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

const mockEventRevenue = [
  {
    event: "Luna Eclipse @ The Anthem",
    date: "2025-01-15",
    ticketRevenue: 45200,
    barRevenue: 12400,
    total: 57600,
    status: "completed" as const,
  },
  {
    event: "Midnight Sessions",
    date: "2025-01-22",
    ticketRevenue: 32100,
    barRevenue: 8900,
    total: 41000,
    status: "completed" as const,
  },
  {
    event: "Summer Festival Set",
    date: "2025-02-05",
    ticketRevenue: 58900,
    barRevenue: 15200,
    total: 74100,
    status: "upcoming" as const,
  },
]

const mockArtistPayouts = [
  {
    artist: "Luna Eclipse",
    event: "Neon Dreams @ The Anthem",
    amount: 8450,
    dueDate: "2025-01-20",
    status: "pending" as const,
  },
  {
    artist: "The Velvet Underground Revival",
    event: "Midnight Sessions",
    amount: 6200,
    dueDate: "2025-01-27",
    status: "completed" as const,
  },
  {
    artist: "Neon Futures",
    event: "Summer Festival Set",
    amount: 9800,
    dueDate: "2025-02-10",
    status: "scheduled" as const,
  },
]

const mockRevenueSplits = [
  {
    event: "Neon Dreams @ The Anthem",
    total: 57600,
    artistShare: 8450,
    venueShare: 49150,
    percentage: 85,
    status: "settled" as const,
  },
  {
    event: "Midnight Sessions",
    total: 41000,
    artistShare: 6200,
    venueShare: 34800,
    percentage: 85,
    status: "settled" as const,
  },
  {
    event: "Summer Festival Set",
    total: 74100,
    artistShare: 9800,
    venueShare: 64300,
    percentage: 87,
    status: "pending" as const,
  },
]

const mockVenueContracts = [
  {
    id: "1",
    eventName: "Luna Eclipse @ The Anthem",
    artist: "Luna Eclipse",
    date: "2025-01-15",
    guarantee: 5000,
    split: "85/15",
    status: "active" as const,
  },
  {
    id: "2",
    eventName: "Midnight Sessions",
    artist: "The Velvet Underground Revival",
    date: "2025-01-22",
    guarantee: 4200,
    split: "85/15",
    status: "active" as const,
  },
  {
    id: "3",
    eventName: "Summer Festival Set",
    artist: "Neon Futures",
    date: "2025-02-05",
    guarantee: 6800,
    split: "87/13",
    status: "pending" as const,
  },
  {
    id: "4",
    eventName: "Jazz Night Series",
    artist: "The Blue Note Trio",
    date: "2025-02-12",
    guarantee: 3500,
    split: "80/20",
    status: "active" as const,
  },
]

export default function VenueFinancePage() {
  const [activeTab, setActiveTab] = useState<"revenue" | "payouts" | "splits" | "contracts">("revenue")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Finance</h1>
        <p className="mt-2 text-muted-foreground">Manage event revenue, artist payouts, and smart contracts</p>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="revenue">Event Revenue</TabsTrigger>
          <TabsTrigger value="payouts">Artist Payouts</TabsTrigger>
          <TabsTrigger value="splits">Revenue Splits</TabsTrigger>
          <TabsTrigger value="contracts">Contracts</TabsTrigger>
        </TabsList>

        {/* Event Revenue Tab */}
        <TabsContent value="revenue" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard
              title="Total Revenue (MTD)"
              value="$172,700"
              change="+22%"
              changeType="positive"
              icon={DollarSign}
            />
            <StatCard title="Avg per Event" value="$57,600" change="+18%" changeType="positive" icon={TrendingUp} />
            <StatCard title="Bar Revenue" value="$36,500" icon={BarChart3} description="21% of total revenue" />
          </div>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Revenue by Event</h3>
            <div className="space-y-4">
              {mockEventRevenue.map((event) => (
                <div key={event.event} className="rounded-lg border border-border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-foreground">{event.event}</h4>
                      <p className="text-sm text-muted-foreground">{event.date}</p>
                    </div>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium",
                        event.status === "completed"
                          ? "bg-chart-3/20 text-chart-3"
                          : "bg-blue-500/20 text-blue-600 dark:text-blue-400",
                      )}
                    >
                      {event.status === "completed" ? <Check className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                      {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Ticket Revenue</p>
                      <p className="text-lg font-semibold text-foreground">${event.ticketRevenue.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Bar Revenue</p>
                      <p className="text-lg font-semibold text-foreground">${event.barRevenue.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Total Revenue</p>
                      <p className="text-lg font-semibold text-primary">${event.total.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center justify-end">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="border-primary/30 bg-primary/5 p-6">
            <div className="flex items-center gap-3 mb-3">
              <AIBadge text="AI Insights" />
            </div>
            <p className="text-foreground">
              Bar revenue accounts for 21% of total income. Electronic shows generate 35% more bar revenue than other
              genres on average.
            </p>
          </Card>
        </TabsContent>

        {/* Artist Payouts Tab */}
        <TabsContent value="payouts" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard title="Pending Payouts" value="$8,450" icon={Clock} description="1 payment due" />
            <StatCard title="Completed (MTD)" value="$6,200" icon={Check} />
            <StatCard title="Scheduled" value="$9,800" icon={TrendingUp} description="Upcoming payouts" />
          </div>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Artist Payout Schedule</h3>
            <div className="space-y-3">
              {mockArtistPayouts.map((payout) => (
                <div
                  key={payout.artist + payout.event}
                  className="flex items-center justify-between rounded-lg border border-border p-4"
                >
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{payout.artist}</p>
                    <p className="text-sm text-muted-foreground">{payout.event}</p>
                    <p className="text-xs text-muted-foreground mt-1">Due: {payout.dueDate}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-semibold text-foreground">${payout.amount.toLocaleString()}</span>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium min-w-[100px] justify-center",
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
                    {payout.status === "pending" && <Button size="sm">Process Payment</Button>}
                  </div>
                </div>
              ))}
            </div>
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
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium",
                        split.status === "settled"
                          ? "bg-chart-3/20 text-chart-3"
                          : "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400",
                      )}
                    >
                      {split.status === "settled" ? <Check className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                      {split.status.charAt(0).toUpperCase() + split.status.slice(1)}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Total Revenue</p>
                      <p className="text-lg font-semibold text-foreground">${split.total.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Venue Share ({split.percentage}%)</p>
                      <p className="text-lg font-semibold text-primary">${split.venueShare.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Artist Share</p>
                      <p className="text-lg font-semibold text-foreground">${split.artistShare.toLocaleString()}</p>
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

        {/* Contracts Tab */}
        <TabsContent value="contracts" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard
              title="Active Contracts"
              value={mockVenueContracts.filter((c) => c.status === "active").length.toString()}
              icon={FileText}
            />
            <StatCard
              title="Pending Signatures"
              value={mockVenueContracts.filter((c) => c.status === "pending").length.toString()}
              icon={Clock}
            />
            <StatCard
              title="Automated Splits"
              value="100%"
              icon={Sparkles}
              description="All contracts use smart splits"
            />
          </div>

          <Card className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Your Smart Contracts</h2>
              <Button size="sm">View All</Button>
            </div>
            <div className="space-y-3">
              {mockVenueContracts.map((contract) => (
                <Link
                  key={contract.id}
                  href={`/venue/finance/${contract.id}`}
                  className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-4 transition-colors hover:border-primary"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{contract.eventName}</h3>
                      <p className="text-sm text-muted-foreground">
                        {contract.artist} • {contract.date}
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
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
