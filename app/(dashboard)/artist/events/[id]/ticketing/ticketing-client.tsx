"use client"

import { useState } from "react"
import Link from "next/link"
import {
  TrendingUp,
  Users,
  DollarSign,
  BarChart3,
  ChevronRight,
  Check,
  Building,
  Music,
  Theater,
  ArrowLeft,
  FileText,
  Wallet,
  Zap,
  Calendar,
  Settings,
  Trash2,
  Plus,
  Briefcase,
  X,
  CheckCircle2,
  Percent,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { AIBadge } from "@/components/ui/ai-badge"
import { StatCard } from "@/components/ui/stat-card"
import { SeatMapModal } from "@/components/ticketing/seat-map-modal"
import { DynamicPricingPanel } from "@/components/ticketing/dynamic-pricing-panel"
import { AntiScalperSignals } from "@/components/fair-access/anti-scalper-signals"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface Event {
  id: string
  title: string
  artist: string
  date: string
  time: string
  venue: string
  city: string
  image: string
  genre: string
  price: { min: number; max: number }
  demand: number
  attendance: { projected: number; capacity: number }
}

interface EventTicketingClientProps {
  event: Event
}

const wizardSteps = [
  { id: 1, name: "Event Info", completed: false },
  { id: 2, name: "Choose Venue Layout", completed: false },
  { id: 3, name: "Pricing Strategy", completed: false },
  { id: 4, name: "Auto-Split", completed: false },
  { id: 5, name: "Settlement", completed: false },
  { id: 6, name: "Preview Contract", completed: false },
  { id: 7, name: "Activate", completed: false },
]

const venueLayouts = [
  {
    id: "stadium",
    name: "Stadium Layout",
    description: "Multi-ring sections: Floor, Lower Bowl, Upper Bowl. Numbered sections with color-coded zones.",
    capacity: "10,000+",
  },
  {
    id: "club",
    name: "Club Layout",
    description: "Small stage, standing area, VIP tables and booths around the floor.",
    capacity: "500-2,000",
  },
  {
    id: "theater",
    name: "Theater Layout",
    description: "Orchestra, Mezzanine, and Balcony seating with numbered rows.",
    capacity: "1,000-5,000",
  },
]

export function EventTicketingClient({ event }: EventTicketingClientProps) {
  const [activeTab, setActiveTab] = useState<"dashboard" | "wizard">("dashboard")
  const [selectedLayout, setSelectedLayout] = useState<"stadium" | "club" | "theater">("club")
  const [showSeatMap, setShowSeatMap] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [ticketingStatus, setTicketingStatus] = useState<"draft" | "active">("draft")

  // State for pricing strategy
  const [pricingStrategy, setPricingStrategy] = useState<string>("fixed")
  const [basePriceGA, setBasePriceGA] = useState<number>(50)
  const [basePriceVIP, setBasePriceVIP] = useState<number>(150)
  const [dynamicPricingEnabled, setDynamicPricingEnabled] = useState<boolean>(false)

  // State for settlement
  const [settlementMethod, setSettlementMethod] = useState<string>("usdc")
  const [payoutFrequency, setPayoutFrequency] = useState<string>("post-event")
  const [walletAddress, setWalletAddress] = useState<string>("")

  // State for Auto-Split
  const [artistSplit, setArtistSplit] = useState<number>(60)
  const [venueSplit, setVenueSplit] = useState<number>(25)

  // State for contract creation after Auto-Split step
  const [contractCreated, setContractCreated] = useState(false)

  const [showContractStudio, setShowContractStudio] = useState(false)
  const [contractData, setContractData] = useState<{
    splits: Array<{ role: string; name: string; percentage: number; wallet: string }>
    settlementMethod: string
    settlementFrequency: string
  } | null>(null)

  const projectedRevenue = event.attendance.projected * ((event.price.min + event.price.max) / 2)

  return (
    <div className="space-y-6">
      {/* Breadcrumb & Header */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/artist/events" className="hover:text-foreground">
          Events
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/artist/events/${event.id}/edit`} className="hover:text-foreground">
          {event.title}
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">Ticketing</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/artist/events/${event.id}/edit`}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-foreground">Event Ticketing</h1>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  ticketingStatus === "active" ? "bg-chart-3/20 text-chart-3" : "bg-chart-4/20 text-chart-4"
                }`}
              >
                {ticketingStatus === "active" ? "Active" : "Draft"}
              </span>
            </div>
            <p className="text-muted-foreground">
              {event.title} • {event.date}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            variant={activeTab === "dashboard" ? "default" : "outline"}
            onClick={() => setActiveTab("dashboard")}
            className={activeTab === "dashboard" ? "bg-primary text-primary-foreground" : ""}
          >
            Dashboard
          </Button>
          <Button
            variant={activeTab === "wizard" ? "default" : "outline"}
            onClick={() => setActiveTab("wizard")}
            className={activeTab === "wizard" ? "bg-primary text-primary-foreground" : ""}
          >
            Setup Wizard
          </Button>
        </div>
      </div>

      {/* Event Tabs Navigation */}
      <div className="flex gap-2 border-b border-border pb-2">
        <Link href={`/artist/events/${event.id}/edit`}>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <Settings className="mr-2 h-4 w-4" />
            Event Details
          </Button>
        </Link>
        <Link href={`/artist/events/${event.id}/edit`}>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <Calendar className="mr-2 h-4 w-4" />
            Venue & Schedule
          </Button>
        </Link>
        <Button variant="ghost" size="sm" className="bg-primary/10 text-primary">
          <DollarSign className="mr-2 h-4 w-4" />
          Ticketing
        </Button>
        <Link href={`/artist/events/${event.id}/edit`}>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            <FileText className="mr-2 h-4 w-4" />
            Review & Publish
          </Button>
        </Link>
      </div>

      {activeTab === "dashboard" ? (
        <>
          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Price Range"
              value={`$${event.price.min} - $${event.price.max}`}
              icon={DollarSign}
              description="AI optimized pricing"
            />
            <StatCard
              title="Projected Attendance"
              value={event.attendance.projected.toLocaleString()}
              change={`of ${event.attendance.capacity.toLocaleString()} capacity`}
              icon={Users}
            />
            <StatCard
              title="Demand Score"
              value={`${event.demand}%`}
              change={event.demand > 80 ? "High demand" : event.demand > 50 ? "Moderate demand" : "Building interest"}
              changeType={event.demand > 60 ? "positive" : "neutral"}
              icon={TrendingUp}
            />
            <StatCard
              title="Revenue Forecast"
              value={`$${projectedRevenue.toLocaleString()}`}
              icon={BarChart3}
              description="Based on projections"
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Pricing Overview */}
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-foreground">Pricing Overview</h2>
                  <AIBadge text="AI Optimized" />
                </div>
                <div className="space-y-4">
                  {[
                    { name: "Early Bird", price: event.price.min, allocation: 500, sold: 487 },
                    {
                      name: "General Admission",
                      price: Math.round((event.price.min + event.price.max) / 2),
                      allocation: 2000,
                      sold: 1200,
                    },
                    { name: "VIP", price: event.price.max, allocation: 300, sold: 85 },
                  ].map((tier) => (
                    <div key={tier.name} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                      <div>
                        <p className="font-medium text-foreground">{tier.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {tier.sold} / {tier.allocation} sold
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">${tier.price}</p>
                        <div className="w-24 h-2 bg-secondary rounded-full mt-1">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${(tier.sold / tier.allocation) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Demand Intelligence */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="mb-4 text-lg font-semibold text-foreground">Demand Intelligence</h2>
                <DynamicPricingPanel />
              </div>

              {/* Auto-Split Summary */}
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-foreground">Auto-Split Summary</h2>
                  <Link href={`/artist/events/${event.id}/ticketing?tab=wizard&step=4`}>
                    <Button variant="ghost" size="sm" className="text-primary">
                      Edit Split
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { role: "Artist", percentage: artistSplit, color: "bg-primary" },
                    { role: "Venue", percentage: venueSplit, color: "bg-chart-3" },
                    { role: "Promoter", percentage: 100 - artistSplit - venueSplit - 5, color: "bg-accent" },
                    { role: "Manager", percentage: 5, color: "bg-chart-4" },
                  ].map((item) => (
                    <div key={item.role} className="rounded-lg bg-secondary/50 p-3 text-center">
                      <p className="text-xs text-muted-foreground">{item.role}</p>
                      <p className="text-xl font-bold text-foreground">{item.percentage}%</p>
                      <div className="h-1.5 rounded-full bg-secondary mt-2">
                        <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Start Setup CTA */}
              {ticketingStatus === "draft" && (
                <div className="rounded-xl border-2 border-dashed border-primary/50 bg-primary/5 p-6 text-center">
                  <Zap className="mx-auto h-10 w-10 text-primary mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">Complete Ticketing Setup</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Finish configuring pricing, splits, and settlement to activate ticket sales.
                  </p>
                  <Button
                    onClick={() => setActiveTab("wizard")}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Start Smart Ticketing Setup
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}

              {/* Smart Contract Summary */}
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-foreground">Smart Contract</h2>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      ticketingStatus === "active" ? "bg-chart-3/20 text-chart-3" : "bg-chart-4/20 text-chart-4"
                    }`}
                  >
                    {ticketingStatus === "active" ? "Deployed" : "Pending"}
                  </span>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Contract Type</span>
                    <span className="text-foreground">Revenue Split</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Network</span>
                    <span className="text-foreground">Polygon</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Participants</span>
                    <span className="text-foreground">4</span>
                  </div>
                </div>
                <Link href="/artist/contracts">
                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    <FileText className="mr-2 h-4 w-4" />
                    View Contract
                  </Button>
                </Link>
              </div>

              {/* Settlement Overview */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="mb-4 text-lg font-semibold text-foreground">Settlement Overview</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Method</span>
                    <span className="text-foreground">USDC + Stripe</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Settlement</span>
                    <span className="text-foreground">T+1 (Next Day)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <span className="text-chart-4">Awaiting Activation</span>
                  </div>
                </div>
                <div className="mt-4 p-3 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-2">
                    <Wallet className="h-4 w-4 text-primary" />
                    <span className="text-xs text-muted-foreground">
                      Funds auto-distribute via smart contract after each sale
                    </span>
                  </div>
                </div>
              </div>

              {/* Anti-Scalper */}
              <AntiScalperSignals />

              <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
                <p className="text-xs text-muted-foreground">
                  Powered by Giggin&apos;s Reasoning Engine + Taste Graph AI
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Setup Wizard */
        <div className="grid gap-6 lg:grid-cols-4">
          {/* Steps Sidebar */}
          <div className="rounded-xl border border-border bg-card p-4">
            <h3 className="mb-4 font-semibold text-foreground">Setup Steps</h3>
            <div className="space-y-2">
              {wizardSteps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={`flex w-full items-center gap-3 rounded-lg p-3 transition-colors ${
                    currentStep === step.id
                      ? "bg-primary/20 border border-primary/30"
                      : step.id < currentStep
                        ? "bg-chart-3/10"
                        : "bg-secondary/50"
                  }`}
                >
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ${
                      step.id < currentStep
                        ? "bg-chart-3 text-background"
                        : currentStep === step.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step.id < currentStep ? <Check className="h-3 w-3" /> : step.id}
                  </div>
                  <span
                    className={`text-sm ${
                      currentStep === step.id || step.id < currentStep ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {step.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Current Step Content */}
          <div className="lg:col-span-3 rounded-xl border border-border bg-card p-6">
            {currentStep === 1 && (
              <>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Event Information</h2>
                  <p className="text-muted-foreground">Confirm your event details before setting up ticketing</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs text-muted-foreground uppercase tracking-wide">Event Name</label>
                      <p className="text-foreground font-medium">{event.title}</p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-muted-foreground uppercase tracking-wide">Artist</label>
                      <p className="text-foreground font-medium">{event.artist}</p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-muted-foreground uppercase tracking-wide">Genre</label>
                      <p className="text-foreground font-medium">{event.genre}</p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-muted-foreground uppercase tracking-wide">Date & Time</label>
                      <p className="text-foreground font-medium">
                        {event.date} at {event.time}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs text-muted-foreground uppercase tracking-wide">Venue</label>
                      <p className="text-foreground font-medium">{event.venue}</p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-muted-foreground uppercase tracking-wide">City</label>
                      <p className="text-foreground font-medium">{event.city}</p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-muted-foreground uppercase tracking-wide">Capacity</label>
                      <p className="text-foreground font-medium">
                        {event.attendance.capacity.toLocaleString()} attendees
                      </p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-muted-foreground uppercase tracking-wide">
                        Projected Attendance
                      </label>
                      <p className="text-foreground font-medium">
                        {event.attendance.projected.toLocaleString()} ({event.demand}% demand)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button
                    onClick={() => setCurrentStep(2)}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Continue to Venue Layout
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </>
            )}

            {currentStep === 2 && (
              <>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Choose Venue Layout</h2>
                  <p className="text-muted-foreground">Select the seating arrangement for {event.title}</p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {venueLayouts.map((layout) => (
                    <button
                      key={layout.id}
                      onClick={() => setSelectedLayout(layout.id as "stadium" | "club" | "theater")}
                      className={`rounded-xl border-2 p-6 text-left transition-all ${
                        selectedLayout === layout.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
                        {layout.id === "stadium" && <Building className="h-6 w-6 text-primary" />}
                        {layout.id === "club" && <Music className="h-6 w-6 text-primary" />}
                        {layout.id === "theater" && <Theater className="h-6 w-6 text-primary" />}
                      </div>
                      <h3 className="font-semibold text-foreground">{layout.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{layout.description}</p>
                      <p className="mt-2 text-xs text-primary">Capacity: {layout.capacity}</p>
                      {selectedLayout === layout.id && (
                        <div className="mt-3 flex items-center gap-1 text-primary">
                          <Check className="h-4 w-4" />
                          <span className="text-sm font-medium">Selected</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                <Button onClick={() => setShowSeatMap(true)} variant="outline" className="mt-6">
                  Preview Seat Map
                </Button>

                <div className="mt-6 flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    Back
                  </Button>
                  <Button
                    onClick={() => setCurrentStep(3)}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Continue to Pricing
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </>
            )}

            {currentStep === 3 && (
              <>
                <div className="mb-6">
                  <AIBadge text="AI Optimized" />
                  <h2 className="mt-2 text-xl font-semibold text-foreground">Pricing Strategy</h2>
                  <p className="text-muted-foreground">Configure your ticket pricing with AI-powered recommendations</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Pricing Strategy</label>
                    <select
                      value={pricingStrategy}
                      onChange={(e) => setPricingStrategy(e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground"
                    >
                      <option value="fixed">Fixed Pricing</option>
                      <option value="dynamic">Dynamic Pricing (AI-Powered)</option>
                      <option value="tiered">Early Bird / Tiered Pricing</option>
                    </select>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">GA Ticket Base Price</label>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">$</span>
                        <input
                          type="number"
                          value={basePriceGA}
                          onChange={(e) => setBasePriceGA(Number(e.target.value))}
                          className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-foreground"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">VIP Ticket Base Price</label>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">$</span>
                        <input
                          type="number"
                          value={basePriceVIP}
                          onChange={(e) => setBasePriceVIP(Number(e.target.value))}
                          className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-foreground"
                        />
                      </div>
                    </div>
                  </div>

                  {pricingStrategy === "dynamic" && (
                    <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4">
                      <div>
                        <p className="text-sm font-medium text-foreground">Enable Dynamic Pricing</p>
                        <p className="text-xs text-muted-foreground">AI adjusts prices based on demand</p>
                      </div>
                      <button
                        onClick={() => setDynamicPricingEnabled(!dynamicPricingEnabled)}
                        className={`relative h-6 w-11 rounded-full transition-colors ${dynamicPricingEnabled ? "bg-primary" : "bg-secondary"}`}
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${dynamicPricingEnabled ? "translate-x-5" : ""}`}
                        />
                      </button>
                    </div>
                  )}

                  <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      <span className="font-medium text-foreground">AI Recommended Pricing</span>
                    </div>
                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="rounded-lg bg-background/50 p-3">
                        <p className="text-xs text-muted-foreground">Recommended GA</p>
                        <p className="text-lg font-bold text-foreground">${Math.round(basePriceGA * 1.1)}</p>
                        <p className="text-xs text-chart-3">+10% based on demand</p>
                      </div>
                      <div className="rounded-lg bg-background/50 p-3">
                        <p className="text-xs text-muted-foreground">Recommended VIP</p>
                        <p className="text-lg font-bold text-foreground">${Math.round(basePriceVIP * 1.15)}</p>
                        <p className="text-xs text-chart-3">+15% based on demand</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-border bg-secondary/30 p-4">
                    <p className="text-sm font-medium text-foreground mb-3">Projected Demand Curve</p>
                    <div className="h-24 flex items-end justify-between gap-1">
                      {[40, 55, 70, 85, 95, 100, 90, 75].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-primary/60 rounded-t transition-all hover:bg-primary"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <span>8 weeks out</span>
                      <span>Event day</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(2)}>
                    Back
                  </Button>
                  <Button
                    onClick={() => setCurrentStep(4)}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Continue to Auto-Split
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </>
            )}

            {currentStep === 4 && (
              <>
                <div className="mb-6">
                  <AIBadge text="AI Suggests 3 Tiers" />
                  <h2 className="mt-2 text-xl font-semibold text-foreground">Auto-Split Configuration</h2>
                  <p className="text-muted-foreground">Configure revenue distribution for {event.title}</p>
                </div>

                <div className="space-y-6">
                  {[
                    { role: "Artist", percentage: artistSplit, color: "bg-primary" },
                    { role: "Venue", percentage: venueSplit, color: "bg-chart-3" },
                    { role: "Promoter", percentage: 100 - artistSplit - venueSplit - 5, color: "bg-accent" },
                    { role: "Manager", percentage: 5, color: "bg-chart-4" },
                  ].map((item) => (
                    <div key={item.role} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">{item.role}</span>
                        <span className="text-sm font-bold text-foreground">{item.percentage}%</span>
                      </div>
                      <div className="h-3 rounded-full bg-secondary">
                        <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setShowContractStudio(true)}
                    className="w-full gap-2 border-primary/30 bg-primary/5 text-primary hover:bg-primary/10"
                  >
                    <FileText className="h-4 w-4" />
                    Open Smart Contract Studio
                  </Button>
                  <p className="mt-2 text-xs text-center text-muted-foreground">
                    Configure advanced contract settings with stakeholder details and wallet addresses
                  </p>
                </div>

                {/* Contract draft creation notice */}
                {contractCreated && (
                  <div className="mt-6 rounded-lg border border-chart-3/30 bg-chart-3/10 p-4">
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-chart-3" />
                      <span className="font-medium text-chart-3">Contract Draft Created</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Contract SC-00{event.id} has been saved to your Smart Contracts Registry.
                    </p>
                  </div>
                )}

                {contractData && (
                  <div className="mt-6 rounded-lg border border-primary/30 bg-primary/10 p-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span className="font-medium text-primary">Contract Studio Settings Applied</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {contractData.splits.length} stakeholders configured • Settlement: {contractData.settlementMethod}
                    </p>
                  </div>
                )}

                <div className="mt-8 rounded-lg border border-border bg-secondary/50 p-4">
                  <h3 className="mb-3 font-medium text-foreground">
                    Preview: 100 Ticket Sales @ ${Math.round((event.price.min + event.price.max) / 2)}
                  </h3>
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                    {[
                      { role: "Artist", pct: artistSplit, color: "text-primary" },
                      { role: "Venue", pct: venueSplit, color: "text-chart-3" },
                      { role: "Promoter", pct: 100 - artistSplit - venueSplit - 5, color: "text-accent" },
                      { role: "Manager", pct: 5, color: "text-chart-4" },
                    ].map((item) => {
                      const basePrice = Math.round((event.price.min + event.price.max) / 2)
                      const amount = (100 * basePrice * item.pct) / 100
                      return (
                        <div key={item.role} className="rounded-lg bg-card p-3 text-center">
                          <p className="text-xs text-muted-foreground">{item.role}</p>
                          <p className={`text-lg font-bold ${item.color}`}>${amount.toLocaleString()}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="mt-6 flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(3)}>
                    Back
                  </Button>
                  <Button
                    onClick={() => {
                      setContractCreated(true)
                      setCurrentStep(5)
                    }}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Continue to Settlement
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </>
            )}

            {currentStep === 5 && (
              <>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Settlement Configuration</h2>
                  <p className="text-muted-foreground">Choose how you want to receive your earnings</p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Settlement Method</label>
                    <select
                      value={settlementMethod}
                      onChange={(e) => setSettlementMethod(e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground"
                    >
                      <option value="usdc">USDC (Stablecoin)</option>
                      <option value="usd">USD (Bank Transfer via Stripe)</option>
                      <option value="hybrid">Hybrid (USDC + USD)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Payout Frequency</label>
                    <select
                      value={payoutFrequency}
                      onChange={(e) => setPayoutFrequency(e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground"
                    >
                      <option value="post-event">Post-Event (Within 48 hours)</option>
                      <option value="weekly">Weekly Settlements</option>
                      <option value="instant">Instant (Per Transaction)</option>
                    </select>
                  </div>

                  {settlementMethod !== "usd" && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Wallet Address (USDC)</label>
                      <input
                        type="text"
                        value={walletAddress}
                        onChange={(e) => setWalletAddress(e.target.value)}
                        placeholder="0x..."
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground font-mono text-sm"
                      />
                      <p className="text-xs text-muted-foreground">
                        Enter your Ethereum or Polygon wallet address for USDC payouts
                      </p>
                    </div>
                  )}

                  <div className="rounded-lg border border-border bg-secondary/30 p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <Wallet className="h-5 w-5 text-primary" />
                      <span className="font-medium text-foreground">Settlement Information</span>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Funds are held in escrow until event completion</li>
                      <li>• Automatic distribution based on smart contract terms</li>
                      <li>• All transactions are recorded on-chain for transparency</li>
                      {settlementMethod === "usdc" && <li>• USDC settlements on Polygon network (low gas fees)</li>}
                      {settlementMethod === "usd" && <li>• USD transfers via Stripe Connect (1-2 business days)</li>}
                      {settlementMethod === "hybrid" && <li>• Split between USDC and USD based on your preference</li>}
                    </ul>
                  </div>

                  <div className="rounded-lg border border-chart-3/30 bg-chart-3/5 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="h-5 w-5 text-chart-3" />
                      <span className="font-medium text-foreground">Smart Contract Escrow</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Your funds are protected by our smart contract escrow system. Payouts are automatically triggered
                      based on your selected frequency.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(4)}>
                    Back
                  </Button>
                  <Button
                    onClick={() => setCurrentStep(6)}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Continue to Preview Contract
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </>
            )}

            {currentStep === 6 && (
              <>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Preview Smart Contract</h2>
                  <p className="text-muted-foreground">Review the contract terms before activation</p>
                </div>

                <div className="space-y-4">
                  <div className="rounded-lg border border-border bg-card p-4">
                    <h4 className="text-sm font-medium text-foreground mb-3">Stakeholders</h4>
                    <div className="space-y-2">
                      {contractData ? (
                        // Show synced data from contract studio
                        contractData.splits.map((split, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between py-2 border-b border-border last:border-0"
                          >
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                                <Users className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-foreground">{split.name || split.role}</p>
                                <p className="text-xs text-muted-foreground">{split.role}</p>
                                {split.wallet && (
                                  <p className="text-xs text-muted-foreground font-mono">{split.wallet}</p>
                                )}
                              </div>
                            </div>
                            <span className="text-sm font-bold text-primary">{split.percentage}%</span>
                          </div>
                        ))
                      ) : (
                        // Show default values
                        <>
                          <div className="flex items-center justify-between py-2 border-b border-border">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                                <Users className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-foreground">{event.artist}</p>
                                <p className="text-xs text-muted-foreground">Artist</p>
                              </div>
                            </div>
                            <span className="text-sm font-bold text-primary">60%</span>
                          </div>
                          <div className="flex items-center justify-between py-2 border-b border-border">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-chart-3/20 flex items-center justify-center">
                                <Building className="h-4 w-4 text-chart-3" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-foreground">{event.venue}</p>
                                <p className="text-xs text-muted-foreground">Venue</p>
                              </div>
                            </div>
                            <span className="text-sm font-bold text-chart-3">25%</span>
                          </div>
                          <div className="flex items-center justify-between py-2 border-b border-border">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center">
                                <Briefcase className="h-4 w-4 text-accent" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-foreground">Promoter</p>
                                <p className="text-xs text-muted-foreground">Promoter</p>
                              </div>
                            </div>
                            <span className="text-sm font-bold text-accent">10%</span>
                          </div>
                          {/* Removed Manager from default view as it's implied in the totals */}
                        </>
                      )}
                    </div>
                  </div>

                  <div className="rounded-lg border border-border bg-card p-4">
                    <h4 className="text-sm font-medium text-foreground mb-3">Settlement Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Method</span>
                        <span className="font-medium text-foreground">
                          {contractData?.settlementMethod || settlementMethod === "usdc"
                            ? "USDC (Polygon)"
                            : "Bank Transfer"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Frequency</span>
                        <span className="font-medium text-foreground">
                          {contractData?.settlementFrequency || payoutFrequency === "post-event"
                            ? "Post-Event"
                            : payoutFrequency === "weekly"
                              ? "Weekly"
                              : "Monthly"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full bg-transparent">
                    <FileText className="mr-2 h-4 w-4" />
                    Open Full Contract Viewer
                  </Button>
                </div>

                <div className="mt-6 flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(5)}>
                    Back
                  </Button>
                  <Button
                    onClick={() => setCurrentStep(7)}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Continue to Activation
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </>
            )}

            {currentStep === 7 && (
              <>
                <div className="mb-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-chart-3/20">
                    <Check className="h-8 w-8 text-chart-3" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">Ready to Activate</h2>
                  <p className="text-muted-foreground">
                    Review your configuration and activate ticket sales for {event.title}
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="rounded-lg bg-secondary/50 p-4">
                    <h3 className="font-medium text-foreground mb-2">Configuration Summary</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Venue Layout</p>
                        <p className="text-foreground capitalize">{selectedLayout}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Price Range</p>
                        <p className="text-foreground">
                          ${event.price.min} - ${event.price.max}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Revenue Split</p>
                        <p className="text-foreground">4 Participants</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Settlement</p>
                        <p className="text-foreground">USDC + Stripe</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(6)}>
                    Back
                  </Button>
                  <Button
                    onClick={() => {
                      setTicketingStatus("active")
                      setActiveTab("dashboard")
                    }}
                    className="bg-chart-3 text-background hover:bg-chart-3/90"
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    Activate Ticket Sales
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <SeatMapModal
        isOpen={showSeatMap}
        onClose={() => setShowSeatMap(false)}
        layout={selectedLayout}
        onSelectSeats={(seats) => console.log("Selected seats:", seats)}
      />

      {showContractStudio && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-xl border border-border bg-background shadow-lg">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background p-4">
              <div>
                <h2 className="text-xl font-bold text-foreground">Smart Contract Studio</h2>
                <p className="text-sm text-muted-foreground">Configure advanced contract settings for {event.title}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowContractStudio(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <ContractStudioContent
              event={event}
              initialSplits={[
                { role: "Artist", name: event.artist, percentage: artistSplit, wallet: "" },
                { role: "Venue", name: event.venue, percentage: venueSplit, wallet: "" },
                { role: "Promoter", name: "", percentage: 100 - artistSplit - venueSplit - 5, wallet: "" },
                { role: "Manager", name: "", percentage: 5, wallet: "" },
              ]}
              onSave={(data) => {
                setContractData(data)
                setShowContractStudio(false)
                setContractCreated(true)
              }}
              onCancel={() => setShowContractStudio(false)}
            />
          </div>
        </div>
      )}
    </div>
  )
}

function ContractStudioContent({
  event,
  initialSplits,
  onSave,
  onCancel,
}: {
  event: Event
  initialSplits: Array<{ role: string; name: string; percentage: number; wallet: string }>
  onSave: (data: {
    splits: Array<{ role: string; name: string; percentage: number; wallet: string }>
    settlementMethod: string
    settlementFrequency: string
  }) => void
  onCancel: () => void
}) {
  const [splits, setSplits] = useState(initialSplits)
  const [settlementMethod, setSettlementMethod] = useState("USDC (Polygon)")
  const [settlementFrequency, setSettlementFrequency] = useState("Per Sale")

  const totalPercentage = splits.reduce((acc, s) => acc + s.percentage, 0)

  const addSplit = () => {
    setSplits([...splits, { role: "", name: "", percentage: 0, wallet: "" }])
  }

  const removeSplit = (index: number) => {
    setSplits(splits.filter((_, i) => i !== index))
  }

  const updateSplit = (index: number, field: keyof (typeof splits)[0], value: string | number) => {
    setSplits(splits.map((s, i) => (i === index ? { ...s, [field]: value } : s)))
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - Split Configuration */}
        <div className="col-span-2 space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-foreground">
              <Users className="h-5 w-5" />
              Revenue Splits
            </h3>
            <div className="space-y-4">
              {splits.map((split, index) => (
                <div key={index} className="rounded-lg border border-border bg-muted/30 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm font-medium">Stakeholder {index + 1}</span>
                    {splits.length > 2 && (
                      <Button variant="ghost" size="sm" onClick={() => removeSplit(index)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs">Role</Label>
                      <Input
                        value={split.role}
                        onChange={(e) => updateSplit(index, "role", e.target.value)}
                        placeholder="e.g., Artist, Venue"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Name</Label>
                      <Input
                        value={split.name}
                        onChange={(e) => updateSplit(index, "name", e.target.value)}
                        placeholder="Legal name"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Wallet Address</Label>
                      <Input
                        value={split.wallet}
                        onChange={(e) => updateSplit(index, "wallet", e.target.value)}
                        placeholder="0x..."
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Percentage: {split.percentage}%</Label>
                      <Slider
                        value={[split.percentage]}
                        onValueChange={(v) => updateSplit(index, "percentage", v[0])}
                        max={100}
                        step={1}
                        className="mt-3"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" onClick={addSplit} className="w-full bg-transparent">
                <Plus className="mr-2 h-4 w-4" />
                Add Stakeholder
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column - Preview */}
        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-foreground">
              <Percent className="h-5 w-5" />
              Split Preview
            </h3>
            <div className="mb-4">
              <div className="flex h-8 overflow-hidden rounded-lg">
                {splits.map((s, i) => {
                  const colors = ["bg-primary", "bg-green-500", "bg-blue-500", "bg-orange-500", "bg-pink-500"]
                  return (
                    <div
                      key={i}
                      className={`${colors[i % colors.length]} flex items-center justify-center text-xs font-medium text-white transition-all`}
                      style={{ width: `${s.percentage}%` }}
                    >
                      {s.percentage > 10 && `${s.percentage}%`}
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="space-y-2">
              {splits.map((s, i) => {
                const colors = ["bg-primary", "bg-green-500", "bg-blue-500", "bg-orange-500", "bg-pink-500"]
                return (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className={`h-3 w-3 rounded-full ${colors[i % colors.length]}`} />
                      <span>{s.role || "Unnamed"}</span>
                    </div>
                    <span className="font-medium">{s.percentage}%</span>
                  </div>
                )
              })}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
              <span className="font-medium">Total</span>
              <span className={`font-bold ${totalPercentage === 100 ? "text-green-400" : "text-red-400"}`}>
                {totalPercentage}%
              </span>
            </div>
            {totalPercentage !== 100 && <p className="mt-2 text-xs text-red-400">Total must equal 100%</p>}
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-foreground">
              <Wallet className="h-5 w-5" />
              Settlement
            </h3>
            <div className="space-y-3">
              <div>
                <Label className="text-xs">Method</Label>
                <select
                  value={settlementMethod}
                  onChange={(e) => setSettlementMethod(e.target.value)}
                  className="mt-1 w-full rounded-md border border-border bg-background p-2 text-sm"
                >
                  <option>USDC (Polygon)</option>
                  <option>Bank Transfer</option>
                </select>
              </div>
              <div>
                <Label className="text-xs">Frequency</Label>
                <select
                  value={settlementFrequency}
                  onChange={(e) => setSettlementFrequency(e.target.value)}
                  className="mt-1 w-full rounded-md border border-border bg-background p-2 text-sm"
                >
                  <option>Per Sale</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              className="w-full bg-primary"
              disabled={totalPercentage !== 100}
              onClick={() => onSave({ splits, settlementMethod, settlementFrequency })}
            >
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Save & Sync to Contract
            </Button>
            <Button variant="outline" className="w-full bg-transparent" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
