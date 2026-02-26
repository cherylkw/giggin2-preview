"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, CalendarIcon, List, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { mockPromoterEvents } from "@/lib/mock-data"

type ViewMode = "calendar" | "list"

export default function PromoterCalendarPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("calendar")
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 0, 1))

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()
    return { daysInMonth, startingDay }
  }

  const { daysInMonth, startingDay } = getDaysInMonth(currentMonth)

  const getEventsForDay = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return mockPromoterEvents.filter((e) => e.date === dateStr)
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Event Calendar</h1>
          <p className="mt-2 text-muted-foreground">View and manage your promoted events</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex rounded-lg border border-border">
            <button
              onClick={() => setViewMode("calendar")}
              className={`flex items-center gap-2 px-3 py-2 text-sm ${viewMode === "calendar" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <CalendarIcon className="h-4 w-4" />
              Calendar
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-2 px-3 py-2 text-sm ${viewMode === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <List className="h-4 w-4" />
              List
            </button>
          </div>
          <Link href="/promoter/events/create">
            <Button className="bg-primary text-primary-foreground">
              <Plus className="mr-2 h-4 w-4" />
              Create Event
            </Button>
          </Link>
        </div>
      </div>

      {viewMode === "calendar" ? (
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h2>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={prevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-px bg-border">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="bg-card p-3 text-center text-sm font-medium text-muted-foreground">
                {day}
              </div>
            ))}
            {Array.from({ length: startingDay }).map((_, i) => (
              <div key={`empty-${i}`} className="min-h-[100px] bg-card p-2" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1
              const events = getEventsForDay(day)
              return (
                <div key={day} className="min-h-[100px] bg-card p-2">
                  <span className="text-sm text-muted-foreground">{day}</span>
                  <div className="mt-1 space-y-1">
                    {events.map((event) => (
                      <Link
                        key={event.id}
                        href={`/promoter/events/${event.id}`}
                        className="block truncate rounded bg-primary/20 px-2 py-1 text-xs text-primary hover:bg-primary/30"
                      >
                        {event.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold">Upcoming Events</h2>
          <div className="space-y-3">
            {mockPromoterEvents
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .map((event) => (
                <Link
                  key={event.id}
                  href={`/promoter/events/${event.id}`}
                  className="flex items-center gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-secondary/50"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
                    <CalendarIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{event.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2 py-1 text-xs ${event.createdBy === "promoter" ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"}`}
                  >
                    {event.createdBy === "promoter" ? "Your Event" : "Managing"}
                  </span>
                  <span
                    className={`rounded-full px-2 py-1 text-xs ${event.genre === "Electronic" ? "bg-purple-500/20 text-purple-400" : event.genre === "Jazz" ? "bg-amber-500/20 text-amber-400" : event.genre === "Rock" ? "bg-red-500/20 text-red-400" : "bg-blue-500/20 text-blue-400"}`}
                  >
                    {event.genre}
                  </span>
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
