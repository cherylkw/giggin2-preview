"use client"

import Image from "next/image"
import { MapPin, Users, TrendingUp, Calendar, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AIBadge } from "@/components/ui/ai-badge"

interface VenueCardProps {
  venue: {
    id: string
    name: string
    location: string
    city: string
    capacity: number
    image: string
    availability: string[]
    avgAttendance: number
    genre?: string
  }
  confidenceLabel?: string
  reasoning?: string
  showActions?: boolean
  userRole?: "artist" | "promoter" | "venue"
}

export function VenueCard({ venue, confidenceLabel, reasoning, showActions = true, userRole }: VenueCardProps) {
  return (
    <div className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={venue.image || "/placeholder.svg"}
          alt={venue.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        {confidenceLabel && (
          <div className="absolute left-3 top-3">
            <AIBadge text={confidenceLabel} />
          </div>
        )}
        {venue.genre && (
          <Badge className="absolute right-3 top-3 bg-primary/90 text-primary-foreground">{venue.genre}</Badge>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-foreground text-lg">{venue.name}</h3>
        <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          {venue.location}, {venue.city}
        </div>
        <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {venue.capacity.toLocaleString()} capacity
          </span>
          <span className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            {venue.avgAttendance}% avg fill
          </span>
        </div>
        {venue.availability && venue.availability.length > 0 && (
          <div className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-foreground">Available Dates:</p>
              <p className="text-xs">{venue.availability.join(", ")}</p>
            </div>
          </div>
        )}
        {reasoning && (
          <div className="mt-3 rounded-lg bg-primary/5 border border-primary/20 p-3">
            <p className="text-xs text-muted-foreground italic">{reasoning}</p>
          </div>
        )}
        {showActions && (
          <div className="mt-4 flex items-center gap-2">
            <Button size="sm" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
              <Building className="mr-2 h-4 w-4" />
              View Details
            </Button>
            {userRole === "artist" && (
              <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                Request Booking
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
