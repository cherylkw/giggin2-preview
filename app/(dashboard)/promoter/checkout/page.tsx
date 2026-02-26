"use client"

import { useState } from "react"
import { Plus, LinkIcon, Copy, Check, ExternalLink, TrendingUp, DollarSign, Ticket, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "@/components/ui/stat-card"

const promoterEvents = [
  {
    id: "1",
    name: "Neon Dreams Live",
    artist: "Neon Dreams",
    date: "2024-02-15",
    status: "active",
    promoLink: "giggin.co/promo/nd-live-2024",
    ticketsSold: 156,
    commission: 1248,
  },
  {
    id: "2",
    name: "Jazz Under Stars",
    artist: "The Velvet Keys",
    date: "2024-02-22",
    status: "pending",
    promoLink: null,
    ticketsSold: 0,
    commission: 0,
  },
  {
    id: "3",
    name: "Electronic Fusion Festival",
    artist: "Various Artists",
    date: "2024-03-01",
    status: "active",
    promoLink: "giggin.co/promo/eff-2024",
    ticketsSold: 423,
    commission: 3384,
  },
]

const ticketTiers = [
  { id: "ga", name: "General Admission", price: 65, available: true },
  { id: "premium", name: "Premium", price: 95, available: true },
  { id: "vip", name: "VIP", price: 150, available: true },
]

export default function PromoterCheckoutPage() {
  const [showSetupModal, setShowSetupModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)
  const [selectedTiers, setSelectedTiers] = useState<string[]>(["ga", "premium"])
  const [commissionRate, setCommissionRate] = useState(10)
  const [promoCode, setPromoCode] = useState("PROMO2024")
  const [copiedLink, setCopiedLink] = useState(false)

  const totalTicketsSold = promoterEvents.reduce((sum, e) => sum + e.ticketsSold, 0)
  const totalCommission = promoterEvents.reduce((sum, e) => sum + e.commission, 0)
  const totalRevenue = totalCommission * 10 // Approximate based on 10% commission

  const copyLink = (link: string) => {
    navigator.clipboard.writeText(`https://${link}`)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Promoter Checkout</h1>
          <p className="mt-2 text-muted-foreground">Create promo links and track your ticket sales performance</p>
        </div>
        <Button
          onClick={() => setShowSetupModal(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Promo Link
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Tickets Sold via Promos"
          value={totalTicketsSold.toString()}
          icon={Ticket}
          description="All-time promo sales"
        />
        <StatCard
          title="Revenue Influenced"
          value={`$${totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          change="+23% this month"
          changeType="positive"
        />
        <StatCard
          title="Commission Earned"
          value={`$${totalCommission.toLocaleString()}`}
          icon={TrendingUp}
          description="Based on agreed rates"
        />
        <StatCard
          title="Active Campaigns"
          value={promoterEvents.filter((e) => e.status === "active").length.toString()}
          icon={Users}
          description="Promo links generating sales"
        />
      </div>

      {/* Promo Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Promo Performance Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-border bg-secondary/50 p-4">
              <p className="text-sm text-muted-foreground">Conversion Rate</p>
              <p className="text-2xl font-bold text-foreground">12.4%</p>
              <p className="text-xs text-chart-3">+2.1% vs average</p>
            </div>
            <div className="rounded-lg border border-border bg-secondary/50 p-4">
              <p className="text-sm text-muted-foreground">Avg. Order Value</p>
              <p className="text-2xl font-bold text-foreground">$87.50</p>
              <p className="text-xs text-muted-foreground">Across all promos</p>
            </div>
            <div className="rounded-lg border border-border bg-secondary/50 p-4">
              <p className="text-sm text-muted-foreground">Top Performing Event</p>
              <p className="text-2xl font-bold text-foreground">EFF 2024</p>
              <p className="text-xs text-primary">423 tickets sold</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Events List */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-foreground">Your Promoted Events</h2>
        <div className="space-y-4">
          {promoterEvents.map((event) => (
            <Card key={event.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-foreground">{event.name}</h3>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          event.status === "active" ? "bg-chart-3/20 text-chart-3" : "bg-amber-500/20 text-amber-500"
                        }`}
                      >
                        {event.status === "active" ? "Active" : "Pending Setup"}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {event.artist} - {new Date(event.date).toLocaleDateString()}
                    </p>

                    {event.promoLink ? (
                      <div className="mt-3 flex items-center gap-2">
                        <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-1.5">
                          <LinkIcon className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm text-foreground">{event.promoLink}</span>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => copyLink(event.promoLink!)}>
                          {copiedLink ? <Check className="h-4 w-4 text-chart-3" /> : <Copy className="h-4 w-4" />}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-3 bg-transparent"
                        onClick={() => {
                          setSelectedEvent(event.id)
                          setShowSetupModal(true)
                        }}
                      >
                        <Plus className="mr-2 h-3 w-3" />
                        Create Promo Checkout Link
                      </Button>
                    )}
                  </div>

                  <div className="text-right">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-xs text-muted-foreground">Tickets Sold</p>
                        <p className="text-xl font-bold text-foreground">{event.ticketsSold}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Commission</p>
                        <p className="text-xl font-bold text-primary">${event.commission}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Setup Modal */}
      {showSetupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-xl border border-border bg-card p-6">
            <h2 className="mb-2 text-xl font-bold text-foreground">Promoter Checkout Setup</h2>
            <p className="mb-6 text-sm text-muted-foreground">Configure your promo link for this event</p>

            {/* Tier Selection */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-foreground">Select Ticket Tiers to Include</label>
              <div className="space-y-2">
                {ticketTiers.map((tier) => (
                  <label
                    key={tier.id}
                    className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors ${
                      selectedTiers.includes(tier.id)
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedTiers.includes(tier.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedTiers([...selectedTiers, tier.id])
                          } else {
                            setSelectedTiers(selectedTiers.filter((t) => t !== tier.id))
                          }
                        }}
                        className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                      />
                      <span className="font-medium text-foreground">{tier.name}</span>
                    </div>
                    <span className="text-muted-foreground">${tier.price}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Commission Rate */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-foreground">Promoter Commission Rate</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="5"
                  max="20"
                  value={commissionRate}
                  onChange={(e) => setCommissionRate(Number(e.target.value))}
                  className="flex-1"
                />
                <span className="w-16 rounded-lg bg-secondary px-3 py-2 text-center font-bold text-foreground">
                  {commissionRate}%
                </span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                You earn ${((65 * commissionRate) / 100).toFixed(2)} per GA ticket sold
              </p>
            </div>

            {/* Promo Code */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-foreground">Promo Code (Auto-Applied)</label>
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                className="w-full rounded-lg border border-border bg-secondary px-4 py-2 text-foreground focus:border-primary focus:outline-none"
                placeholder="YOURCODE"
              />
            </div>

            {/* Link Preview */}
            <div className="mb-6 rounded-lg border border-primary/30 bg-primary/5 p-4">
              <p className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Generated Link Preview
              </p>
              <div className="flex items-center gap-2 rounded bg-secondary px-3 py-2">
                <LinkIcon className="h-4 w-4 text-primary" />
                <code className="text-sm text-foreground">giggin.co/checkout/{promoCode.toLowerCase()}</code>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setShowSetupModal(false)}>
                Cancel
              </Button>
              <Button
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => setShowSetupModal(false)}
              >
                Generate Promo Link
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
