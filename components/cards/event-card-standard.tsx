"use client"

import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin, TrendingUp, Ticket } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AIBadge } from "@/components/ui/ai-badge"
import { usePreserveCode } from "@/hooks/use-preserve-code"

interface EventCardStandardProps {
  event: {
    id: string
    name: string
    artist: string
    venue: string
    city: string
    date: string
    time: string
    price: {
      min: number
      max: number
    }
    genre: string
    image?: string
    demand?: number
    matchScore?: number
    aiReason?: string
  }
  showAIInsight?: boolean
  compact?: boolean
}

export function EventCardStandard({ event, showAIInsight = true, compact = false }: EventCardStandardProps) {
  const withCode = usePreserveCode()
  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  return (
    <Card className="overflow-hidden border-border bg-card hover:border-primary/50 transition-all">
      <div className={`relative ${compact ? "h-32" : "h-48"}`}>
        <Image
          src={event.image || `/placeholder.svg?height=200&width=400&query=${encodeURIComponent(event.name)}`}
          alt={event.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          <Badge className="bg-card/80 backdrop-blur-sm text-foreground">{event.genre}</Badge>
          {event.matchScore && (
            <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm">{event.matchScore}% Match</Badge>
          )}
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-foreground line-clamp-1">{event.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-1">{event.artist}</p>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4 shrink-0" />
            <span className="truncate">{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0" />
            <span className="truncate">
              {event.venue}, {event.city}
            </span>
          </div>
        </div>

        {showAIInsight && event.aiReason && (
          <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 space-y-2">
            <AIBadge text="AI Insight" />
            <p className="text-xs text-muted-foreground leading-relaxed">{event.aiReason}</p>
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground">From</p>
            <p className="font-semibold text-foreground">
              ${event.price.min} - ${event.price.max}
            </p>
          </div>
          <Link href={withCode(`/fan/events/${event.id}`)}>
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Ticket className="mr-2 h-4 w-4" />
              View Event
            </Button>
          </Link>
        </div>

        {event.demand && event.demand > 70 && (
          <div className="flex items-center gap-2 text-xs text-amber-500">
            <TrendingUp className="h-3 w-3" />
            <span>High demand - {event.demand}% sellout probability</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
