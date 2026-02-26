"use client"
import Link from "next/link"
import { Calendar, ChevronLeft, ChevronRight, Plus, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AIBadge } from "@/components/ui/ai-badge"
import { mockVenueEvents } from "@/lib/mock-data"

export default function VenueCalendarPage() {
  const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1)

  const events = mockVenueEvents.map((event) => ({
    id: event.id,
    day: Number.parseInt(event.date.split("-")[2]),
    name: event.name,
    type: event.genre.toLowerCase(),
    createdBy: event.createdBy,
  }))

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Venue Calendar</h1>
          <p className="mt-2 text-muted-foreground">Manage your booking schedule</p>
        </div>
        <Link href="/venue/events/create">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Add Booking
          </Button>
        </Link>
      </div>

      {/* Calendar Header */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-semibold text-foreground">January 2025</h2>
            <Button variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <AIBadge text="3 AI Suggestions" />
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
              {day}
            </div>
          ))}
          {/* Empty cells for offset */}
          {[...Array(3)].map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}
          {calendarDays.map((day) => {
            const event = events.find((e) => e.day === day)
            return (
              <Link
                key={day}
                href={event ? `/venue/events/${event.id}` : "#"}
                className={`aspect-square rounded-lg border p-2 transition-colors ${
                  event
                    ? "border-primary bg-primary/10 cursor-pointer hover:bg-primary/20"
                    : "border-border bg-secondary/30 hover:border-primary/50 pointer-events-none"
                }`}
              >
                <span className="text-sm text-foreground">{day}</span>
                {event && <div className="mt-1 truncate text-xs text-primary">{event.name}</div>}
              </Link>
            )
          })}
        </div>
      </div>

      {/* Upcoming Events List */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Upcoming at Your Venue</h2>
        <div className="space-y-3">
          {events.map((event) => (
            <Link
              key={event.id}
              href={`/venue/events/${event.id}`}
              className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-4 transition-colors hover:border-primary/50 hover:bg-secondary/80"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-foreground">{event.name}</h3>
                    {event.createdBy === "venue" && (
                      <span className="rounded bg-green-500/20 px-1.5 py-0.5 text-[10px] font-medium text-green-400">
                        Your Event
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">Jan {event.day}, 2025</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary capitalize">
                  {event.type}
                </span>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
