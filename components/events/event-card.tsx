"use client"

import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin, Users, Ticket, Pencil, Bookmark, CalendarPlus, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { usePreserveCode } from "@/hooks/use-preserve-code"

interface EventCardProps {
  event: {
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
    createdBy?: string // Added createdBy field for ownership checking
  }
  variant?: "default" | "compact"
  userRole?: "fan" | "artist" | "venue" | "promoter" | "admin"
  isOwner?: boolean
  showActions?: boolean // Added prop to control whether to show action buttons
}

export function EventCard({ event, variant = "default", userRole, isOwner, showActions = true }: EventCardProps) {
  const withCode = usePreserveCode()
  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })

  const showEditButton = isOwner && (userRole === "artist" || userRole === "promoter" || userRole === "venue")

  // Artists/Promoters/Venues go to Event Management page, Fans go to fan-facing event page
  const eventHref =
    (userRole === "artist" || userRole === "promoter" || userRole === "venue") && isOwner
      ? `/${userRole}/events/${event.id}`
      : `/fan/events/${event.id}`

  const editHref =
    userRole === "artist"
      ? `/artist/events/${event.id}/edit`
      : userRole === "promoter"
        ? `/promoter/events/${event.id}/edit`
        : `/venue/events/${event.id}/edit`

  if (variant === "compact") {
    return (
      <Link href={withCode(eventHref)}>
        <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-3 transition-colors hover:border-primary/50">
          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
            <Image src={event.image || "/placeholder.svg"} alt={event.name} fill className="object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-foreground truncate">{event.name}</h4>
            <p className="text-sm text-muted-foreground truncate">{event.artist}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-foreground">{formattedDate}</p>
            <p className="text-xs text-muted-foreground">${event.price.min}+</p>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <div className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
      <Link href={withCode(eventHref)}>
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={event.image || "/placeholder.svg"}
            alt={event.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          <Badge className="absolute right-3 top-3 bg-primary/90 text-primary-foreground">{event.genre}</Badge>
          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-foreground/90">
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {event.demand}% demand
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <div className="p-4">
        <Link href={withCode(eventHref)}>
          <h3 className="font-semibold text-foreground text-lg hover:text-primary transition-colors">{event.name}</h3>
        </Link>
        <p className="mt-1 text-sm text-muted-foreground">{event.artist}</p>
        <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {formattedDate} • {event.time}
          </span>
        </div>
        <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          {event.venue}, {event.city}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-foreground">${event.price.min}</span>
            <span className="text-sm text-muted-foreground"> - ${event.price.max}</span>
          </div>
          <div className="flex items-center gap-2">
            {showEditButton && (
              <Link href={withCode(editHref)}>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-muted-foreground hover:text-foreground bg-transparent"
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </Link>
            )}
            <Link href={withCode(eventHref)}>
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Ticket className="mr-2 h-4 w-4" />
                {(userRole === "artist" || userRole === "promoter" || userRole === "venue") && isOwner
                  ? "Manage"
                  : "Get Tickets"}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {showActions && userRole === "fan" && (
        <div className="border-t border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground hover:bg-primary/10"
              onClick={(e) => {
                e.preventDefault()
              }}
            >
              <Bookmark className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground hover:bg-primary/10"
              onClick={(e) => {
                e.preventDefault()
              }}
            >
              <CalendarPlus className="mr-2 h-4 w-4" />
              Add to Calendar
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground hover:bg-primary/10"
              onClick={(e) => {
                e.preventDefault()
              }}
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
