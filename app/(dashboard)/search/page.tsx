"use client"

import { useSearchParams } from "next/navigation"
import { EventCard } from "@/components/events/event-card"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  const isDemoQuery = query.toLowerCase() === "jazz in new york this weekend"

  const mockJazzEvents = [
    {
      id: "jazz-1",
      name: "Joe Lovano Quartet",
      artist: "Joe Lovano Quartet",
      venue: "Village Vanguard",
      city: "Greenwich Village",
      date: "2025-01-31",
      time: "Evening sets",
      genre: "Jazz",
      image: "/jazz-quartet-village-vanguard.jpg",
      price: { min: 45, max: 45 },
      attendance: { projected: 120, capacity: 150 },
      demand: 95,
      description: "Legendary New York jazz venue with intimate seating and world-class acoustics.",
      dateLabel: "This weekend (Fri–Sun)",
    },
    {
      id: "jazz-2",
      name: "Rising Voices Jazz Night",
      artist: "Rising Voices Jazz Night",
      venue: "Smalls Jazz Club",
      city: "West Village",
      date: "2025-02-01",
      time: "9:30 PM",
      genre: "Jazz",
      image: "/jazz-club-intimate-performance.jpg",
      price: { min: 30, max: 30 },
      attendance: { projected: 80, capacity: 100 },
      demand: 88,
      description: "Late-night jazz session featuring emerging NYC artists. High-energy, standing room.",
      dateLabel: "Saturday",
    },
    {
      id: "jazz-3",
      name: "Modern Jazz Collective",
      artist: "Modern Jazz Collective",
      venue: "Blue Note Jazz Club",
      city: "Midtown",
      date: "2025-02-01",
      time: "8:00 PM",
      genre: "Jazz",
      image: "/modern-jazz-blue-note-club.jpg",
      price: { min: 55, max: 55 },
      attendance: { projected: 180, capacity: 200 },
      demand: 92,
      description: "Contemporary jazz with crossover appeal. Seated tables and polished production.",
      dateLabel: "Saturday",
    },
  ]

  const events = isDemoQuery ? mockJazzEvents : []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Search Results</h1>
        <p className="mt-1 text-muted-foreground">
          Showing results for: <span className="font-medium text-foreground">&quot;{query}&quot;</span>
        </p>
      </div>

      {isDemoQuery && (
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-sm">
            {events.length} events found
          </Badge>
          <Badge variant="secondary" className="text-sm">
            This weekend
          </Badge>
          <Badge variant="secondary" className="text-sm">
            New York
          </Badge>
        </div>
      )}

      {events.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} userRole="fan" />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="rounded-full bg-secondary p-4 mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No results found</h3>
          <p className="text-muted-foreground max-w-md">
            Try searching for &quot;Jazz in New York this weekend&quot; to see demo results
          </p>
        </div>
      )}
    </div>
  )
}
