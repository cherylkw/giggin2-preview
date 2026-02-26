"use client"

import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EventCard } from "@/components/events/event-card"
import { mockPromoterEvents } from "@/lib/mock-data"

export default function PromoterEventsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Your Events</h1>
          <p className="mt-2 text-muted-foreground">Manage events you promote and organize</p>
        </div>
        <Link href="/promoter/events/create">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Create Event
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockPromoterEvents.map((event) => (
          <EventCard key={event.id} event={event} userRole="promoter" isOwner={event.createdBy === "promoter"} />
        ))}
      </div>
    </div>
  )
}
