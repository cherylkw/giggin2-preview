"use client"

import { Ticket, Clock, Tag, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { AIBadge } from "@/components/ui/ai-badge"
import { Button } from "@/components/ui/button"

interface TicketCardProps {
  ticket: {
    eventName: string
    venueName: string
    date: string
    priceRange: { min: number; max: number }
    availability: "high" | "medium" | "low"
    groupDiscount?: number
    fairAccessEnabled: boolean
    tiers: {
      name: string
      price: number
      available: number
    }[]
  }
  confidenceLabel?: string
}

export function TicketCard({ ticket, confidenceLabel = "Live Pricing" }: TicketCardProps) {
  const getAvailabilityColor = () => {
    if (ticket.availability === "high") return "text-green-500"
    if (ticket.availability === "medium") return "text-yellow-500"
    return "text-red-500"
  }

  const getAvailabilityLabel = () => {
    if (ticket.availability === "high") return "Great Availability"
    if (ticket.availability === "medium") return "Limited Seats"
    return "Almost Sold Out"
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <AIBadge text={confidenceLabel} />
            </div>
            <h3 className="font-semibold text-foreground text-lg">{ticket.eventName}</h3>
            <p className="text-sm text-muted-foreground">{ticket.venueName}</p>
          </div>
          <Badge className="bg-primary/90 text-primary-foreground">
            <Ticket className="h-3 w-3 mr-1" />
            Available
          </Badge>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          {ticket.date}
        </div>
      </div>

      <div className="p-4">
        <div className="mb-4">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl font-bold text-foreground">${ticket.priceRange.min}</span>
            <span className="text-lg text-muted-foreground">- ${ticket.priceRange.max}</span>
          </div>
          <div className={`flex items-center gap-1 text-sm ${getAvailabilityColor()}`}>
            <span>{getAvailabilityLabel()}</span>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          {ticket.tiers.map((tier, idx) => (
            <div key={idx} className="flex items-center justify-between rounded-lg bg-secondary/50 p-3">
              <div>
                <p className="text-sm font-medium text-foreground">{tier.name}</p>
                <p className="text-xs text-muted-foreground">{tier.available} available</p>
              </div>
              <span className="text-sm font-semibold text-foreground">${tier.price}</span>
            </div>
          ))}
        </div>

        {ticket.fairAccessEnabled && (
          <div className="flex items-center gap-2 rounded-lg bg-green-500/10 border border-green-500/20 p-3 mb-4">
            <Zap className="h-4 w-4 text-green-500" />
            <div className="flex-1">
              <p className="text-xs font-medium text-foreground">Fair Access Enabled</p>
              <p className="text-xs text-muted-foreground">No bots, fair pricing for real fans</p>
            </div>
          </div>
        )}

        {ticket.groupDiscount && (
          <div className="flex items-center gap-2 rounded-lg bg-primary/5 border border-primary/20 p-3 mb-4">
            <Tag className="h-4 w-4 text-primary" />
            <div className="flex-1">
              <p className="text-xs font-medium text-foreground">Group Discount Available</p>
              <p className="text-xs text-muted-foreground">Save {ticket.groupDiscount}% with 4+ tickets</p>
            </div>
          </div>
        )}

        <Button size="sm" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
          Get Tickets
        </Button>
      </div>
    </div>
  )
}
