"use client"
import Link from "next/link"
import {
  Calendar,
  TrendingUp,
  Users,
  DollarSign,
  FileText,
  Ticket,
  ArrowRight,
  Target,
  Zap,
  Instagram,
} from "lucide-react"
import { StatCard } from "@/components/ui/stat-card"
import { mockPromoterEvents } from "@/lib/mock-data"

export default function PromoterDashboardPage() {
  const upcomingEvents = mockPromoterEvents.filter((e) => new Date(e.date) > new Date()).slice(0, 3)
  const totalRevenue = mockPromoterEvents.reduce(
    (sum, e) => sum + (e.price?.min || 0) * (e.attendance?.projected || 0),
    0,
  )

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Promoter Dashboard</h1>
        <p className="mt-2 text-muted-foreground">Overview of your events and performance</p>
      </div>

      {/* Stats Row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard
          title="Active Events"
          value={mockPromoterEvents.length.toString()}
          icon={Calendar}
          change="+2 this month"
        />
        <StatCard
          title="Total Projected Attendance"
          value={mockPromoterEvents.reduce((sum, e) => sum + (e.attendance?.projected || 0), 0).toLocaleString()}
          icon={Users}
          change="+15% vs last month"
        />
        <StatCard
          title="Projected Revenue"
          value={`$${(totalRevenue / 1000).toFixed(0)}K`}
          icon={DollarSign}
          change="+22% growth"
        />
        <StatCard
          title="Avg Demand Score"
          value={Math.round(
            mockPromoterEvents.reduce((sum, e) => sum + (e.demand || 0), 0) / mockPromoterEvents.length,
          ).toString()}
          icon={TrendingUp}
          change="Above average"
        />
        <StatCard title="Sell-Through %" value="68%" icon={Target} change="+4% vs last week" />
        <StatCard title="Sales Pace" value="Ahead" icon={Zap} change="+12% vs target" />
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Marketing Snapshot</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Top Channel</span>
              <div className="flex items-center gap-2">
                <Instagram className="h-4 w-4 text-pink-500" />
                <span className="font-medium text-foreground">IG Ads</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Estimated ROI</span>
              <span className="font-semibold text-green-500">3.2x</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">CPA (Cost per Acquisition)</span>
              <span className="font-medium text-foreground">$12.50</span>
            </div>
          </div>
          <div className="space-y-2">
            <span className="text-sm text-muted-foreground">Conversion Funnel</span>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">View</span>
                <span className="font-medium text-foreground">100%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Click</span>
                <span className="font-medium text-foreground">18%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Cart</span>
                <span className="font-medium text-foreground">8%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Purchase</span>
                <span className="font-medium text-green-500">5.2%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/promoter/events"
          className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
            <Ticket className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold text-foreground">Manage Events</h3>
          <p className="mt-1 text-sm text-muted-foreground">View and edit your events</p>
        </Link>
        <Link
          href="/promoter/calendar"
          className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/20">
            <Calendar className="h-6 w-6 text-green-500" />
          </div>
          <h3 className="font-semibold text-foreground">Calendar</h3>
          <p className="mt-1 text-sm text-muted-foreground">View event schedule</p>
        </Link>
        <Link
          href="/promoter/contracts"
          className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/20">
            <FileText className="h-6 w-6 text-amber-500" />
          </div>
          <h3 className="font-semibold text-foreground">Finance</h3>
          <p className="mt-1 text-sm text-muted-foreground">Manage payouts and splits</p>
        </Link>
      </div>

      {/* Upcoming Events */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Upcoming Events</h2>
          <Link href="/promoter/events" className="flex items-center gap-1 text-sm text-primary hover:underline">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="space-y-3">
          {upcomingEvents.map((event) => (
            <Link
              key={event.id}
              href={`/promoter/events/${event.id}`}
              className="flex items-center gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-secondary/50"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{event.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {event.venue} • {new Date(event.date).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">
                  {event.attendance?.projected?.toLocaleString()} expected
                </p>
                <p className="text-sm text-muted-foreground">{event.demand}% demand</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
