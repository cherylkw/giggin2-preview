"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ChevronRight,
  ExternalLink,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  TrendingUp,
  Settings,
  Ticket,
  BarChart3,
  FileText,
  Sparkles,
  Clock,
  Edit,
  Eye,
  Shield,
  PieChart,
  Heart,
  Activity,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AIBadge } from "@/components/ui/ai-badge"
import { StatCard } from "@/components/ui/stat-card"

interface Event {
  id: string
  name: string
  artist: string
  venue: string
  city: string
  date: string
  time: string
  genre: string
  image: string
  price: { min: number; max: number }
  attendance: { projected: number; capacity: number }
  demand: number
}

interface EventManagementClientProps {
  event: Event
  userRole: "artist" | "promoter" | "venue" // Added "venue" to userRole type
}

type TabId = "overview" | "venue" | "tickets" | "ticketing" | "analytics"

const tabs: { id: TabId; name: string; icon: React.ElementType }[] = [
  { id: "overview", name: "Overview", icon: Settings },
  { id: "venue", name: "Venue & Schedule", icon: MapPin },
  { id: "tickets", name: "Tickets & Pricing", icon: DollarSign },
  { id: "ticketing", name: "Ticketing", icon: Ticket },
  { id: "analytics", name: "Analytics", icon: BarChart3 },
]

export function EventManagementClient({ event, userRole }: EventManagementClientProps) {
  const [activeTab, setActiveTab] = useState<TabId>("overview")
  const basePath = userRole === "artist" ? "/artist" : userRole === "promoter" ? "/promoter" : "/venue" // Adjusted basePath for venue role

  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  const projectedRevenue = event.attendance.projected * ((event.price.min + event.price.max) / 2)
  const ticketingStatus: "draft" | "active" = "draft"

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href={`${basePath}/events`} className="hover:text-foreground">
          Events
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{event.name}</span>
      </div>

      {/* Header with Event Info and Actions */}
      <div className="flex items-start justify-between">
        <div className="flex gap-6">
          {/* Event Thumbnail */}
          <div className="relative h-24 w-40 overflow-hidden rounded-lg">
            <Image src={event.image || "/placeholder.svg"} alt={event.name} fill className="object-cover" />
            <Badge className="absolute right-2 top-2 bg-primary/90 text-primary-foreground text-xs">
              {event.genre}
            </Badge>
          </div>

          {/* Event Details */}
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-foreground">{event.name}</h1>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  ticketingStatus === "active" ? "bg-chart-3/20 text-chart-3" : "bg-chart-4/20 text-chart-4"
                }`}
              >
                {ticketingStatus === "active" ? "Live" : "Draft"}
              </span>
            </div>
            <p className="mt-1 text-muted-foreground">{event.artist}</p>
            <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {event.time}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {event.venue}, {event.city}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link href={`/fan/events/${event.id}`} target="_blank">
            <Button variant="outline" className="gap-2 bg-transparent">
              <Eye className="h-4 w-4" />
              View as fan
              <ExternalLink className="h-3 w-3" />
            </Button>
          </Link>
          <Link href={`${basePath}/events/${event.id}/edit`}>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Edit className="h-4 w-4" />
              Edit Details
            </Button>
          </Link>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/50"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <StatCard
              title="Projected Attendance"
              value={event.attendance.projected.toLocaleString()}
              subtitle={`of ${event.attendance.capacity.toLocaleString()} capacity`}
              icon={Users}
              change={{ value: 12, label: "vs last event" }}
            />
            <StatCard
              title="Demand Score"
              value={`${event.demand}%`}
              subtitle="Based on taste graph matches"
              icon={TrendingUp}
              change={{ value: 8, label: "this week" }}
            />
            <StatCard
              title="Price Range"
              value={`$${event.price.min} - $${event.price.max}`}
              subtitle="Across all tiers"
              icon={DollarSign}
            />
            <StatCard
              title="Projected Revenue"
              value={`$${projectedRevenue.toLocaleString()}`}
              subtitle="Based on current demand"
              icon={BarChart3}
              change={{ value: 15, label: "vs estimate" }}
            />
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Smart Contract Status</h3>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Draft</Badge>
                  <span className="text-sm text-muted-foreground">Contract SC-00{event.id}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Revenue split configured • 4 stakeholders • Settlement: USDC (Polygon)
                </p>
              </div>
              <Link href={`${basePath}/contracts/SC-00${event.id}`}>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Eye className="h-4 w-4" />
                  View Contract
                </Button>
              </Link>
            </div>
          </div>

          {/* AI Insights */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <AIBadge />
              <h3 className="font-semibold text-foreground">Event Insights</h3>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                <Sparkles className="inline h-4 w-4 mr-2 text-primary" />
                Based on your Taste Graph, this event has strong appeal to fans of {event.genre} in the {event.city}{" "}
                area.
              </p>
              <p>
                <TrendingUp className="inline h-4 w-4 mr-2 text-chart-3" />
                Similar events in this venue have averaged 87% capacity. Consider increasing marketing 2 weeks before
                the date.
              </p>
              <p>
                <Users className="inline h-4 w-4 mr-2 text-chart-1" />
                234 fans who follow {event.artist} are within 50 miles and haven't attended a show in 3+ months.
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid gap-4 md:grid-cols-3">
            <button
              onClick={() => setActiveTab("ticketing")}
              className="rounded-xl border border-border bg-card p-6 text-left transition-colors hover:border-primary/50"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                  <Ticket className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Smart Ticketing</h3>
                  <p className="text-sm text-muted-foreground">Configure pricing & distribution</p>
                </div>
              </div>
              <Badge variant="outline" className="mt-2">
                {ticketingStatus === "active" ? "Active" : "Setup Required"}
              </Badge>
            </button>

            <Link
              href={`${basePath}/contracts`}
              className="rounded-xl border border-border bg-card p-6 text-left transition-colors hover:border-primary/50"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-3/20">
                  <FileText className="h-5 w-5 text-chart-3" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Smart Contracts</h3>
                  <p className="text-sm text-muted-foreground">View revenue splits</p>
                </div>
              </div>
              <Badge variant="outline" className="mt-2">
                Not Configured
              </Badge>
            </Link>

            <button
              onClick={() => setActiveTab("analytics")}
              className="rounded-xl border border-border bg-card p-6 text-left transition-colors hover:border-primary/50"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-1/20">
                  <BarChart3 className="h-5 w-5 text-chart-1" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Analytics</h3>
                  <p className="text-sm text-muted-foreground">Track performance</p>
                </div>
              </div>
              <Badge variant="outline" className="mt-2">
                View Insights
              </Badge>
            </button>
          </div>
        </div>
      )}

      {activeTab === "venue" && (
        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-semibold text-foreground mb-4">Venue Information</h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground">Venue Name</label>
                  <p className="text-foreground font-medium">{event.venue}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">City</label>
                  <p className="text-foreground font-medium">{event.city}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Capacity</label>
                  <p className="text-foreground font-medium">{event.attendance.capacity.toLocaleString()} people</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground">Event Date</label>
                  <p className="text-foreground font-medium">{formattedDate}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Event Time</label>
                  <p className="text-foreground font-medium">{event.time}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Timezone</label>
                  <p className="text-foreground font-medium">Eastern Time (ET)</p>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Link href={`${basePath}/events/${event.id}/edit`}>
                <Button variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Venue & Schedule
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {activeTab === "tickets" && (
        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-semibold text-foreground mb-4">Ticket Tiers</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                <div>
                  <p className="font-medium text-foreground">General Admission</p>
                  <p className="text-sm text-muted-foreground">Standard entry</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-foreground">${event.price.min}</p>
                  <p className="text-sm text-muted-foreground">500 available</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                <div>
                  <p className="font-medium text-foreground">VIP</p>
                  <p className="text-sm text-muted-foreground">Priority entry + merch</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-foreground">${event.price.max}</p>
                  <p className="text-sm text-muted-foreground">100 available</p>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <Link href={`${basePath}/events/${event.id}/edit`}>
                <Button variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Ticket Tiers
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {activeTab === "ticketing" && <TicketingTab event={event} basePath={basePath} />}

      {activeTab === "analytics" && (
        <div className="space-y-6">
          {/* Stats Row - Similar to Engagement Score style */}
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            {/* Demand Score */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Demand Score</span>
                <TrendingUp className="h-4 w-4 text-primary" />
              </div>
              <p className="text-3xl font-bold text-foreground">
                87<span className="text-lg text-muted-foreground">/100</span>
              </p>
              <p className="text-xs text-chart-3 mt-1">Top 15% in your market</p>
            </div>

            {/* Predicted Attendance */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Predicted Attendance</span>
                <Users className="h-4 w-4 text-primary" />
              </div>
              <p className="text-3xl font-bold text-foreground">2,847</p>
              <p className="text-xs text-muted-foreground mt-1">of 3,200 capacity (89%)</p>
            </div>

            {/* Pulse-to-Ticket Intent */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Pulse™-to-Ticket Intent</span>
                <Ticket className="h-4 w-4 text-primary" />
              </div>
              <p className="text-3xl font-bold text-foreground">34%</p>
              <p className="text-xs text-chart-3 mt-1">+8% vs similar events</p>
            </div>

            {/* Anti-Scalper Score - Same style as Engagement Score */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Anti-Scalper Score</span>
                <Shield className="h-4 w-4 text-primary" />
              </div>
              <p className="text-3xl font-bold text-foreground">
                92<span className="text-lg text-muted-foreground">/100</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">Strong protection active</p>
            </div>
          </div>

          <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Fair Access Protection</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  View detailed bot detection, anti-scalping metrics, and ticketing fairness analysis for this event.
                </p>
              </div>
              {/* Update link to point to insights page with fair-access tab */}
              <Link href={`${basePath}/insights?tab=fair-access`}>
                <Button variant="outline" className="gap-2 bg-transparent">
                  View Fair Access
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Price Sensitivity Chart */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Price Sensitivity</h3>
                  <p className="text-xs text-muted-foreground mt-1">Demand elasticity by price point</p>
                </div>
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              {/* Price sensitivity curve visualization */}
              <div className="space-y-3">
                {[
                  { price: "$45", demand: 95, optimal: false },
                  { price: "$55", demand: 88, optimal: false },
                  { price: "$65", demand: 76, optimal: true },
                  { price: "$75", demand: 58, optimal: false },
                  { price: "$85", demand: 42, optimal: false },
                  { price: "$95", demand: 28, optimal: false },
                ].map((point) => (
                  <div key={point.price} className="flex items-center gap-3">
                    <span
                      className={`w-12 text-sm ${point.optimal ? "text-primary font-semibold" : "text-muted-foreground"}`}
                    >
                      {point.price}
                    </span>
                    <div className="flex-1 h-3 rounded-full bg-muted overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${point.optimal ? "bg-primary" : "bg-chart-2"}`}
                        style={{ width: `${point.demand}%` }}
                      />
                    </div>
                    <span className="w-12 text-sm text-muted-foreground text-right">{point.demand}%</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-2 p-3 rounded-lg bg-primary/10">
                <Sparkles className="h-4 w-4 text-primary flex-shrink-0" />
                <p className="text-xs text-muted-foreground">
                  Optimal price: <span className="text-primary font-semibold">$65</span> maximizes revenue at 76% demand
                </p>
              </div>
            </div>

            {/* Fan Demographics */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Interested Fan Demographics</h3>
                  <p className="text-xs text-muted-foreground mt-1">Age distribution of potential attendees</p>
                </div>
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-3">
                {[
                  { age: "18-24", percentage: 32 },
                  { age: "25-34", percentage: 45 },
                  { age: "35-44", percentage: 18 },
                  { age: "45-54", percentage: 5 },
                ].map((segment) => (
                  <div key={segment.age} className="flex items-center gap-3">
                    <span className="w-16 text-sm text-muted-foreground">{segment.age}</span>
                    <div className="flex-1 h-3 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full bg-chart-1" style={{ width: `${segment.percentage}%` }} />
                    </div>
                    <span className="w-12 text-sm text-foreground font-medium text-right">{segment.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Three Column Analytics Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Marketing Reach */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Marketing Reach</h3>
                <TrendingUp className="h-5 w-5 text-chart-3" />
              </div>
              <p className="text-2xl font-bold text-foreground">14.2K</p>
              <p className="text-xs text-muted-foreground mt-1">Fans reached via Pulse™</p>
              <div className="mt-4 flex items-center gap-2">
                <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-chart-3" style={{ width: "68%" }} />
                </div>
                <span className="text-xs text-chart-3 font-medium">68%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">of target audience reached</p>
            </div>

            {/* Conversion Rate */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Conversion Rate</h3>
                <Heart className="h-5 w-5 text-chart-5" />
              </div>
              <p className="text-2xl font-bold text-foreground">24.3%</p>
              <p className="text-xs text-muted-foreground mt-1">Pulse™ views to ticket saves</p>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Views</span>
                  <span className="text-foreground font-medium">14,200</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Saves</span>
                  <span className="text-chart-5 font-medium">3,451</span>
                </div>
              </div>
            </div>

            {/* Ticket Velocity */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Ticket Velocity</h3>
                <Activity className="h-5 w-5 text-chart-2" />
              </div>
              <p className="text-2xl font-bold text-foreground">42/day</p>
              <p className="text-xs text-muted-foreground mt-1">Average sales rate</p>
              <div className="mt-4 flex items-center gap-2 p-2 rounded-lg bg-chart-2/10">
                <TrendingUp className="h-4 w-4 text-chart-2 flex-shrink-0" />
                <p className="text-xs text-muted-foreground">
                  Trending <span className="text-chart-2 font-semibold">+18%</span> this week
                </p>
              </div>
            </div>
          </div>

          {/* Full-Width Trend Chart */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Ticket Sales Trend</h3>
                <p className="text-xs text-muted-foreground mt-1">Daily sales over the last 30 days</p>
              </div>
              <PieChart className="h-5 w-5 text-primary" />
            </div>
            {/* Simulated line chart */}
            <div className="flex items-end justify-between h-40 gap-1">
              {[
                12, 15, 18, 14, 22, 28, 32, 29, 35, 38, 42, 45, 48, 52, 55, 58, 62, 65, 68, 72, 75, 78, 82, 85, 88, 92,
                95, 98, 102, 105,
              ].map((value, i) => (
                <div
                  key={i}
                  className="flex-1 bg-primary/80 rounded-t-sm transition-all hover:bg-primary"
                  style={{ height: `${(value / 105) * 100}%` }}
                />
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>30 days ago</span>
              <span>Today</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Ticketing Tab Component
function TicketingTab({ event, basePath }: { event: Event; basePath: string }) {
  const [showWizard, setShowWizard] = useState(false)
  const [ticketingStatus, setTicketingStatus] = useState<"draft" | "active">("draft")
  const [currentStep, setCurrentStep] = useState(1)

  const [venueLayout, setVenueLayout] = useState("club")
  const [pricingStrategy, setPricingStrategy] = useState("dynamic")
  const [basePriceGA, setBasePriceGA] = useState(event.price.min)
  const [basePriceVIP, setBasePriceVIP] = useState(event.price.max)
  const [dynamicPricingEnabled, setDynamicPricingEnabled] = useState(true)
  const [artistSplit, setArtistSplit] = useState(60)
  const [venueSplit, setVenueSplit] = useState(25)
  const [platformSplit, setPlatformSplit] = useState(15)
  const [settlementMethod, setSettlementMethod] = useState("usdc")
  const [payoutFrequency, setPayoutFrequency] = useState("post-event")
  const [walletAddress, setWalletAddress] = useState("")

  const wizardSteps = [
    { id: 1, name: "Event Info", completed: false },
    { id: 2, name: "Venue Layout", completed: false },
    { id: 3, name: "Pricing Strategy", completed: false },
    { id: 4, name: "Auto-Split", completed: false },
    { id: 5, name: "Settlement", completed: false },
    { id: 6, name: "Preview Contract", completed: false },
    { id: 7, name: "Activate", completed: false },
  ]

  const projectedRevenue = event.attendance.projected * ((event.price.min + event.price.max) / 2)

  const renderWizardStepContent = () => {
    switch (currentStep) {
      case 1:
        // Step 1 — Event Info (read-only)
        return (
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground uppercase tracking-wide">Event Name</label>
                <p className="text-foreground font-medium">{event.name}</p>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground uppercase tracking-wide">Artist</label>
                <p className="text-foreground font-medium">{event.artist}</p>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground uppercase tracking-wide">Date & Time</label>
                <p className="text-foreground font-medium">
                  {new Date(event.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}{" "}
                  at {event.time}
                </p>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground uppercase tracking-wide">Genre</label>
                <p className="text-foreground font-medium">{event.genre}</p>
              </div>
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
                <p className="text-foreground font-medium">{event.attendance.capacity.toLocaleString()} attendees</p>
              </div>
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground uppercase tracking-wide">Projected Attendance</label>
                <p className="text-foreground font-medium">
                  {event.attendance.projected.toLocaleString()} ({event.demand}% demand)
                </p>
              </div>
            </div>
          </div>
        )

      case 2:
        // Step 2 — Venue Layout
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Layout Type</label>
              <select
                value={venueLayout}
                onChange={(e) => setVenueLayout(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground"
              >
                <option value="club">Club / Standing Room</option>
                <option value="theater">Theater / Seated</option>
                <option value="stadium">Stadium / Arena</option>
                <option value="festival">Festival / Open Air</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Seat Map Preview</label>
              <div className="rounded-lg border border-border bg-secondary/30 p-8 flex items-center justify-center min-h-[200px]">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 mx-auto rounded-lg bg-primary/20 flex items-center justify-center">
                    <MapPin className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {venueLayout === "club" && "Standing room layout with GA zones"}
                    {venueLayout === "theater" && "Seated theater layout with sections"}
                    {venueLayout === "stadium" && "Stadium layout with tiered seating"}
                    {venueLayout === "festival" && "Open air layout with multiple stages"}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-chart-3/30 bg-chart-3/5 p-4">
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-chart-3 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">AI Recommendation</p>
                  <p className="text-sm text-muted-foreground">
                    Based on {event.venue}, we recommend the "{venueLayout}" layout. This venue typically hosts{" "}
                    {venueLayout === "club" ? "standing" : "seated"} events.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        // Step 3 — Pricing Strategy
        return (
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

            {/* AI Recommended Pricing Card */}
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="font-medium text-foreground">AI Recommended Pricing</span>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-lg bg-background/50 p-3">
                  <p className="text-xs text-muted-foreground">Recommended GA</p>
                  <p className="text-lg font-bold text-foreground">${Math.round(basePriceGA * 1.1)}</p>
                  <p className="text-xs text-chart-3">+10% vs base</p>
                </div>
                <div className="rounded-lg bg-background/50 p-3">
                  <p className="text-xs text-muted-foreground">Recommended VIP</p>
                  <p className="text-lg font-bold text-foreground">${Math.round(basePriceVIP * 1.15)}</p>
                  <p className="text-xs text-chart-3">+15% vs base</p>
                </div>
              </div>
            </div>

            {/* Demand Curve Placeholder */}
            <div className="rounded-lg border border-border bg-secondary/30 p-4">
              <p className="text-sm font-medium text-foreground mb-3">Projected Demand Curve</p>
              <div className="h-32 flex items-end justify-between gap-1">
                {[40, 55, 70, 85, 95, 100, 90, 75].map((h, i) => (
                  <div key={i} className="flex-1 bg-primary/60 rounded-t" style={{ height: `${h}%` }} />
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>8 weeks out</span>
                <span>Event day</span>
              </div>
            </div>
          </div>
        )

      case 4:
        // Step 4 — Auto-Split
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">Artist Share</label>
                  <span className="text-sm text-primary font-medium">{artistSplit}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={artistSplit}
                  onChange={(e) => {
                    const newVal = Number(e.target.value)
                    setArtistSplit(newVal)
                    const remaining = 100 - newVal - platformSplit
                    setVenueSplit(Math.max(0, remaining))
                  }}
                  className="w-full accent-primary"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">Venue Share</label>
                  <span className="text-sm text-chart-3 font-medium">{venueSplit}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={venueSplit}
                  onChange={(e) => {
                    const newVal = Number(e.target.value)
                    setVenueSplit(newVal)
                    const remaining = 100 - newVal - platformSplit
                    setArtistSplit(Math.max(0, remaining))
                  }}
                  className="w-full accent-chart-3"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">Platform Fee</label>
                  <span className="text-sm text-muted-foreground font-medium">{platformSplit}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                  <div className="h-full rounded-full bg-muted-foreground/50" style={{ width: `${platformSplit}%` }} />
                </div>
                <p className="text-xs text-muted-foreground">Platform fee is fixed at 15%</p>
              </div>
            </div>

            {/* Split Preview */}
            <div className="rounded-lg border border-border bg-secondary/30 p-4">
              <p className="text-sm font-medium text-foreground mb-3">Revenue Split Preview</p>
              <div className="flex h-8 rounded-lg overflow-hidden">
                <div
                  className="bg-primary flex items-center justify-center text-xs text-white font-medium"
                  style={{ width: `${artistSplit}%` }}
                >
                  {artistSplit > 15 && `${artistSplit}%`}
                </div>
                <div
                  className="bg-chart-3 flex items-center justify-center text-xs text-white font-medium"
                  style={{ width: `${venueSplit}%` }}
                >
                  {venueSplit > 15 && `${venueSplit}%`}
                </div>
                <div
                  className="bg-muted-foreground flex items-center justify-center text-xs text-white font-medium"
                  style={{ width: `${platformSplit}%` }}
                >
                  {platformSplit}%
                </div>
              </div>
              <div className="flex justify-between mt-2 text-xs">
                <span className="text-primary">Artist</span>
                <span className="text-chart-3">Venue</span>
                <span className="text-muted-foreground">Platform</span>
              </div>
            </div>

            {/* Projected Earnings */}
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="text-sm font-medium text-foreground mb-3">Projected Earnings</p>
              <div className="grid gap-3 md:grid-cols-3">
                <div>
                  <p className="text-xs text-muted-foreground">Artist Earnings</p>
                  <p className="text-lg font-bold text-primary">
                    ${Math.round((projectedRevenue * artistSplit) / 100).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Venue Earnings</p>
                  <p className="text-lg font-bold text-chart-3">
                    ${Math.round((projectedRevenue * venueSplit) / 100).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Platform Fee</p>
                  <p className="text-lg font-bold text-muted-foreground">
                    ${Math.round((projectedRevenue * platformSplit) / 100).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full bg-transparent">
              <FileText className="mr-2 h-4 w-4" />
              Sync to Contract
            </Button>
          </div>
        )

      case 5:
        // Step 5 — Settlement
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Settlement Method</label>
              <select
                value={settlementMethod}
                onChange={(e) => setSettlementMethod(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground"
              >
                <option value="usdc">USDC (Stablecoin)</option>
                <option value="usd">USD (Bank Transfer)</option>
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

            <div className="rounded-lg border border-border bg-secondary/30 p-4 space-y-2">
              <p className="text-sm font-medium text-foreground">Settlement Information</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Funds are held in escrow until event completion</li>
                <li>• Automatic distribution based on smart contract terms</li>
                <li>• All transactions are recorded on-chain for transparency</li>
                {settlementMethod === "usdc" && <li>• USDC settlements on Polygon network (low gas fees)</li>}
                {settlementMethod === "usd" && <li>• USD transfers via Stripe Connect (1-2 business days)</li>}
              </ul>
            </div>
          </div>
        )

      case 6:
        // Step 6 — Preview Contract
        return (
          <div className="space-y-4">
            {/* Stakeholders Card */}
            <div className="rounded-lg border border-border bg-card p-4">
              <h4 className="text-sm font-medium text-foreground mb-3">Stakeholders</h4>
              <div className="space-y-2">
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
                  <Badge variant="outline" className="text-primary border-primary">
                    {artistSplit}%
                  </Badge>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-chart-3/20 flex items-center justify-center">
                      <MapPin className="h-4 w-4 text-chart-3" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{event.venue}</p>
                      <p className="text-xs text-muted-foreground">Venue</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-chart-3 border-chart-3">
                    {venueSplit}%
                  </Badge>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                      <Ticket className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Giggin' Platform</p>
                      <p className="text-xs text-muted-foreground">Service Fee</p>
                    </div>
                  </div>
                  <Badge variant="outline">{platformSplit}%</Badge>
                </div>
              </div>
            </div>

            {/* Split Percentages Card */}
            <div className="rounded-lg border border-border bg-card p-4">
              <h4 className="text-sm font-medium text-foreground mb-3">Split Percentages</h4>
              <div className="flex h-6 rounded-lg overflow-hidden mb-2">
                <div className="bg-primary" style={{ width: `${artistSplit}%` }} />
                <div className="bg-chart-3" style={{ width: `${venueSplit}%` }} />
                <div className="bg-muted-foreground" style={{ width: `${platformSplit}%` }} />
              </div>
              <p className="text-xs text-muted-foreground">
                Revenue split: {artistSplit}% Artist / {venueSplit}% Venue / {platformSplit}% Platform
              </p>
            </div>

            {/* Settlement Rules Card */}
            <div className="rounded-lg border border-border bg-card p-4">
              <h4 className="text-sm font-medium text-foreground mb-3">Settlement Rules</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Method</span>
                  <span className="text-foreground font-medium">
                    {settlementMethod === "usdc"
                      ? "USDC (Stablecoin)"
                      : settlementMethod === "usd"
                        ? "USD (Bank)"
                        : "Hybrid"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Frequency</span>
                  <span className="text-foreground font-medium">
                    {payoutFrequency === "post-event"
                      ? "Post-Event"
                      : payoutFrequency === "weekly"
                        ? "Weekly"
                        : "Instant"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Network</span>
                  <span className="text-foreground font-medium">Polygon</span>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full bg-transparent">
              <ExternalLink className="mr-2 h-4 w-4" />
              Open Contract Viewer
            </Button>
          </div>
        )

      case 7:
        // Step 7 — Activate Ticketing
        return (
          <div className="space-y-6">
            {/* Checklist */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="h-5 w-5 rounded-full bg-chart-3 flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-foreground">Event details confirmed</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="h-5 w-5 rounded-full bg-chart-3 flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-foreground">Venue layout selected</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="h-5 w-5 rounded-full bg-chart-3 flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-foreground">Pricing strategy configured</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="h-5 w-5 rounded-full bg-chart-3 flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-foreground">Revenue split defined</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="h-5 w-5 rounded-full bg-chart-3 flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-foreground">Settlement method selected</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="h-5 w-5 rounded-full bg-chart-3 flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-foreground">Smart contract reviewed</span>
              </div>
            </div>

            {/* Confirmation Card */}
            <div className="rounded-lg border border-chart-3/30 bg-chart-3/5 p-4">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-chart-3/20 flex items-center justify-center flex-shrink-0">
                  <Ticket className="h-5 w-5 text-chart-3" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Ready to Go Live</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your ticketing is configured and ready. Once activated, fans will be able to purchase tickets for{" "}
                    {event.name} through the Giggin' platform.
                  </p>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="grid gap-3 md:grid-cols-2 text-sm">
                <div>
                  <span className="text-muted-foreground">GA Price:</span>
                  <span className="ml-2 text-foreground font-medium">${basePriceGA}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">VIP Price:</span>
                  <span className="ml-2 text-foreground font-medium">${basePriceVIP}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Venue Layout:</span>
                  <span className="ml-2 text-foreground font-medium capitalize">{venueLayout}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Settlement:</span>
                  <span className="ml-2 text-foreground font-medium uppercase">{settlementMethod}</span>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (showWizard) {
    return (
      <div className="space-y-6">
        {/* Wizard Header */}
        <div className="rounded-xl border border-primary/50 bg-primary/5 p-4">
          <div className="flex items-center gap-2 text-primary">
            <Sparkles className="h-5 w-5" />
            <span className="font-semibold">
              Smart Ticketing Setup for: {event.name} –{" "}
              {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </span>
          </div>
        </div>

        {/* Step Progress */}
        <div className="flex items-center justify-between">
          {wizardSteps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                  currentStep > step.id
                    ? "bg-chart-3 text-white"
                    : currentStep === step.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground"
                }`}
              >
                {currentStep > step.id ? "✓" : step.id}
              </div>
              {index < wizardSteps.length - 1 && (
                <div className={`h-1 w-8 mx-1 ${currentStep > step.id ? "bg-chart-3" : "bg-secondary"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-semibold text-foreground mb-4">
            Step {currentStep}: {wizardSteps[currentStep - 1].name}
          </h3>
          <p className="text-muted-foreground mb-6">
            {currentStep === 1 && "Confirm your event details before setting up ticketing."}
            {currentStep === 2 && "Select the venue layout that best matches your event space."}
            {currentStep === 3 && "Configure your pricing strategy with AI-powered recommendations."}
            {currentStep === 4 && "Set up automatic revenue splits between stakeholders."}
            {currentStep === 5 && "Choose your settlement method and payout preferences."}
            {currentStep === 6 && "Review the smart contract terms before activation."}
            {currentStep === 7 && "Activate your ticketing and go live!"}
          </p>

          {renderWizardStepContent()}
        </div>

        {/* Wizard Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => {
              if (currentStep === 1) {
                setShowWizard(false)
              } else {
                setCurrentStep(currentStep - 1)
              }
            }}
          >
            {currentStep === 1 ? "Cancel" : "Back"}
          </Button>
          <Button
            className="bg-primary text-primary-foreground"
            onClick={() => {
              if (currentStep === 7) {
                setTicketingStatus("active")
                setShowWizard(false)
              } else {
                setCurrentStep(currentStep + 1)
              }
            }}
          >
            {currentStep === 7 ? "Activate Ticketing" : "Continue"}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Ticketing Dashboard Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-foreground">Event Ticketing Dashboard</h3>
          <p className="text-sm text-muted-foreground">Manage ticketing for {event.name}</p>
        </div>
        <Button className="bg-primary text-primary-foreground" onClick={() => setShowWizard(true)}>
          <Sparkles className="mr-2 h-4 w-4" />
          {ticketingStatus === "active" ? "Edit Smart Ticketing" : "Start Smart Ticketing Setup"}
        </Button>
      </div>

      {/* Status Card */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-foreground">Ticketing Status</h4>
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              ticketingStatus === "active" ? "bg-chart-3/20 text-chart-3" : "bg-chart-4/20 text-chart-4"
            }`}
          >
            {ticketingStatus === "active" ? "Active" : "Draft"}
          </span>
        </div>
        {ticketingStatus === "draft" ? (
          <p className="text-muted-foreground text-sm">
            Smart Ticketing has not been configured for this event. Click "Start Smart Ticketing Setup" to begin.
          </p>
        ) : (
          <p className="text-muted-foreground text-sm">
            Ticketing is live. Fans can now purchase tickets through the Giggin' platform.
          </p>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <DollarSign className="h-4 w-4" />
            <span className="text-sm">Pricing Overview</span>
          </div>
          <p className="text-xl font-bold text-foreground">
            ${event.price.min} - ${event.price.max}
          </p>
          <p className="text-xs text-muted-foreground">2 ticket tiers</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm">Demand Forecast</span>
          </div>
          <p className="text-xl font-bold text-foreground">{event.demand}%</p>
          <p className="text-xs text-muted-foreground">High demand expected</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Users className="h-4 w-4" />
            <span className="text-sm">Auto-Split</span>
          </div>
          <p className="text-xl font-bold text-foreground">Not Set</p>
          <p className="text-xs text-muted-foreground">Configure in setup</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <FileText className="h-4 w-4" />
            <span className="text-sm">Smart Contract</span>
          </div>
          <p className="text-xl font-bold text-foreground">Pending</p>
          <p className="text-xs text-muted-foreground">Complete setup to generate</p>
        </div>
      </div>

      {/* AI Insights */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <AIBadge />
          <h4 className="font-medium text-foreground">Pricing Recommendations</h4>
        </div>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>
            <Sparkles className="inline h-4 w-4 mr-2 text-primary" />
            Based on similar {event.genre} events at {event.venue}, we recommend starting GA tickets at $
            {Math.round(event.price.min * 0.9)} for early bird pricing.
          </p>
          <p>
            <TrendingUp className="inline h-4 w-4 mr-2 text-chart-3" />
            VIP tier pricing is competitive. Consider adding a "Meet & Greet" tier at $
            {Math.round(event.price.max * 1.5)} to capture high-value fans.
          </p>
        </div>
      </div>
    </div>
  )
}
