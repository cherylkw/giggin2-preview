"use client"

import { Calendar, Users, DollarSign, Ticket, FileText, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatCard } from "@/components/ui/stat-card"
import { AIBadge } from "@/components/ui/ai-badge"
import { EventCard } from "@/components/events/event-card"
import { FairAccessHealthCard } from "@/components/fair-access/fair-access-health-card"
import { mockEvents } from "@/lib/mock-data"
import Link from "next/link"

const mockFairAccessEvents = [
  {
    id: "1",
    name: "Neon Dreams @ The Anthem",
    date: "2025-01-15",
    healthScore: "Strong" as const,
    protectionsEnabled: 5,
    totalProtections: 5,
  },
  {
    id: "2",
    name: "Midnight Sessions",
    date: "2025-02-20",
    healthScore: "Moderate" as const,
    protectionsEnabled: 3,
    totalProtections: 5,
  },
  {
    id: "3",
    name: "Summer Festival Set",
    date: "2025-06-10",
    healthScore: "Weak" as const,
    protectionsEnabled: 1,
    totalProtections: 5,
  },
]

export default function ArtistDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Artist Portal</h1>
          <p className="mt-2 text-muted-foreground">Welcome back, Luna Eclipse</p>
        </div>
        <Link href="/artist/events/create">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Calendar className="mr-2 h-4 w-4" />
            Create Event
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Upcoming Events" value="4" icon={Calendar} description="Next: Jan 15, The Anthem" />
        <StatCard title="Total Fans" value="45.2K" change="+8.3%" changeType="positive" icon={Users} />
        <StatCard title="Revenue (MTD)" value="$24,850" change="+12%" changeType="positive" icon={DollarSign} />
        <StatCard title="Ticket Sales" value="1,247" change="+23%" changeType="positive" icon={Ticket} />
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Link
          href="/artist/ticketing"
          className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
              <Ticket className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Smart Ticketing</h3>
              <p className="text-sm text-muted-foreground">AI-powered pricing</p>
            </div>
          </div>
        </Link>
        <Link
          href="/artist/contracts"
          className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-chart-3/20">
              <FileText className="h-6 w-6 text-chart-3" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Smart Contracts</h3>
              <p className="text-sm text-muted-foreground">Auto-split revenue</p>
            </div>
          </div>
        </Link>
        <Link
          href="/artist/analytics"
          className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20">
              <BarChart3 className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Analytics</h3>
              <p className="text-sm text-muted-foreground">Taste graph insights</p>
            </div>
          </div>
        </Link>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <FairAccessHealthCard events={mockFairAccessEvents} />

        {/* AI Insights - moved here to balance the row */}
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
          <div className="flex items-center gap-3 mb-3">
            <AIBadge text="AI Insights" />
          </div>
          <p className="text-foreground">
            Your next show at The Anthem is trending 23% higher than your last DC show. Consider adding a late-night
            afterparty to capture additional revenue—similar artists see 15% uplift.
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            Powered by Giggin&apos;s Reasoning Engine + Taste Graph AI
          </p>
        </div>
      </div>

      {/* Upcoming Events */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Your Upcoming Events</h2>
          <Button variant="ghost" size="sm" className="text-primary">
            View all
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockEvents.slice(0, 3).map((event) => (
            <EventCard key={event.id} event={event} userRole="artist" isOwner={true} />
          ))}
        </div>
      </div>
    </div>
  )
}
