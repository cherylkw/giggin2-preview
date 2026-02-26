"use client"

import { Calendar, Users, DollarSign, TrendingUp, MapPin, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatCard } from "@/components/ui/stat-card"
import { AIBadge } from "@/components/ui/ai-badge"
import { EventCard } from "@/components/events/event-card"
import { mockEvents } from "@/lib/mock-data"
import Link from "next/link"

export default function VenueDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Venue Dashboard</h1>
          <p className="mt-2 text-muted-foreground">Welcome back to The Anthem</p>
        </div>
        <Link href="/venue/events/create">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Sparkles className="mr-2 h-4 w-4" />
            Start Booking
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Upcoming Events" value="12" icon={Calendar} description="Next: Jan 15, Luna Eclipse" />
        <StatCard title="Capacity Utilization" value="78%" change="+5%" changeType="positive" icon={Users} />
        <StatCard title="Revenue (MTD)" value="$124,500" change="+18%" changeType="positive" icon={DollarSign} />
        <StatCard title="Avg Fill Rate" value="82%" change="+8%" changeType="positive" icon={TrendingUp} />
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Link
          href="/venue/insights"
          className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Booking Intelligence</h3>
              <p className="text-sm text-muted-foreground">AI-powered demand insights</p>
            </div>
          </div>
        </Link>
        <Link
          href="/venue/calendar"
          className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-chart-3/20">
              <Calendar className="h-6 w-6 text-chart-3" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Booking Schedule</h3>
              <p className="text-sm text-muted-foreground">Manage your calendar</p>
            </div>
          </div>
        </Link>
        <Link
          href="/venue/profile"
          className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20">
              <MapPin className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Venue Profile</h3>
              <p className="text-sm text-muted-foreground">Capacity & preferences</p>
            </div>
          </div>
        </Link>
      </div>

      {/* AI Insights */}
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
        <div className="flex items-center gap-3 mb-3">
          <AIBadge text="AI Insights" />
        </div>
        <p className="text-foreground">
          <strong>Peak Opportunity:</strong> Fridays and Saturdays show 94% demand confidence for electronic acts. Luna
          Eclipse is a strong match for Jan 17—projected $52K-$68K revenue at 88% expected fill rate with low risk.
        </p>
        <p className="mt-3 text-xs text-muted-foreground">Powered by Giggin&apos;s Reasoning Engine + Taste Graph AI</p>
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
            <EventCard key={event.id} event={event} userRole="venue" isOwner={true} />
          ))}
        </div>
      </div>
    </div>
  )
}
