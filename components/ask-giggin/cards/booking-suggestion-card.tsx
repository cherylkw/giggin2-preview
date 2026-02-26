"use client"

import Image from "next/image"
import { Calendar, DollarSign, TrendingUp, Users, Building } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { AIBadge } from "@/components/ui/ai-badge"
import { Button } from "@/components/ui/button"

interface BookingSuggestionCardProps {
  suggestion: {
    id: string
    artistName: string
    artistImage: string
    venueName: string
    venueCity: string
    suggestedDate: string
    estimatedRevenue: { min: number; max: number }
    projectedAttendance: number
    venueCapacity: number
    matchScore: number
    reasoning: string
  }
  confidenceLabel?: string
  userRole?: "venue" | "promoter"
}

export function BookingSuggestionCard({
  suggestion,
  confidenceLabel = "Estimated",
  userRole,
}: BookingSuggestionCardProps) {
  const fillRate = (suggestion.projectedAttendance / suggestion.venueCapacity) * 100

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={suggestion.artistImage || "/placeholder.svg"}
          alt={suggestion.artistName}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        <div className="absolute left-3 top-3">
          <AIBadge text={confidenceLabel} />
        </div>
        <Badge className="absolute right-3 top-3 bg-primary/90 text-primary-foreground">
          {suggestion.matchScore}% Match
        </Badge>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-foreground text-lg mb-1">{suggestion.artistName}</h3>
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
          <Building className="h-4 w-4" />
          {suggestion.venueName}, {suggestion.venueCity}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="rounded-lg bg-secondary/50 p-3">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Suggested Date</span>
            </div>
            <p className="text-sm font-semibold text-foreground">{suggestion.suggestedDate}</p>
          </div>
          <div className="rounded-lg bg-secondary/50 p-3">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Est. Revenue</span>
            </div>
            <p className="text-sm font-semibold text-foreground">
              ${suggestion.estimatedRevenue.min / 1000}K-${suggestion.estimatedRevenue.max / 1000}K
            </p>
          </div>
          <div className="rounded-lg bg-secondary/50 p-3">
            <div className="flex items-center gap-2 mb-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Projected Attendance</span>
            </div>
            <p className="text-sm font-semibold text-foreground">{suggestion.projectedAttendance}</p>
          </div>
          <div className="rounded-lg bg-secondary/50 p-3">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Fill Rate</span>
            </div>
            <p className="text-sm font-semibold text-foreground">{fillRate.toFixed(0)}%</p>
          </div>
        </div>

        <div className="rounded-lg bg-primary/5 border border-primary/20 p-3 mb-4">
          <p className="text-xs text-muted-foreground italic">{suggestion.reasoning}</p>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
            View Details
          </Button>
          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
            Contact Artist
          </Button>
        </div>
      </div>
    </div>
  )
}
