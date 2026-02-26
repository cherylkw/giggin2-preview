"use client"

import Image from "next/image"
import Link from "next/link"
import { Music, Users, TrendingUp, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AIBadge } from "@/components/ui/ai-badge"
import { usePreserveCode } from "@/hooks/use-preserve-code"

interface ArtistCardProps {
  artist: {
    id: string
    name: string
    genre: string
    followers: number
    monthlyListeners: number
    image: string
    popularity: number
    location: string
    badge?: string | null
  }
  confidenceLabel?: string
  reasoning?: string
  showActions?: boolean
  userRole?: "fan" | "venue" | "promoter"
}

export function ArtistCard({ artist, confidenceLabel, reasoning, showActions = true, userRole }: ArtistCardProps) {
  const withCode = usePreserveCode()
  return (
    <div className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={artist.image || "/placeholder.svg"}
          alt={artist.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        {confidenceLabel && (
          <div className="absolute left-3 top-3">
            <AIBadge text={confidenceLabel} />
          </div>
        )}
        {artist.badge && (
          <Badge className="absolute right-3 top-3 bg-primary/90 text-primary-foreground">{artist.badge}</Badge>
        )}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center gap-2 text-xs text-foreground/90">
            <span className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              {artist.popularity}% popularity
            </span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-foreground text-lg">{artist.name}</h3>
        <div className="mt-1 flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            {artist.genre}
          </Badge>
          <span className="text-sm text-muted-foreground">{artist.location}</span>
        </div>
        <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {(artist.followers / 1000).toFixed(0)}K followers
          </span>
          <span className="flex items-center gap-1">
            <Music className="h-4 w-4" />
            {(artist.monthlyListeners / 1000).toFixed(0)}K monthly
          </span>
        </div>
        {reasoning && (
          <div className="mt-3 rounded-lg bg-primary/5 border border-primary/20 p-3">
            <p className="text-xs text-muted-foreground italic">{reasoning}</p>
          </div>
        )}
        {showActions && (
          <div className="mt-4 flex items-center gap-2">
            <Link href={withCode(`/fan/artist/${artist.id}`)} className="flex-1">
              <Button size="sm" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <Music className="mr-2 h-4 w-4" />
                {userRole === "fan" ? "View Profile" : "View Details"}
              </Button>
            </Link>
            {(userRole === "venue" || userRole === "promoter") && (
              <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                <Calendar className="mr-2 h-4 w-4" />
                Book Artist
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
