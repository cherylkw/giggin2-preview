"use client"

import Image from "next/image"
import Link from "next/link"
import { Music, Users, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AIBadge } from "@/components/ui/ai-badge"

interface ArtistCardStandardProps {
  artist: {
    id: string
    name: string
    genre: string
    image?: string
    monthlyListeners?: number
    upcomingShows?: number
    aiDescription?: string
    tags?: string[]
  }
  showAIDescription?: boolean
}

export function ArtistCardStandard({ artist, showAIDescription = true }: ArtistCardStandardProps) {
  return (
    <Card className="overflow-hidden border-border bg-card hover:border-primary/50 transition-all">
      <div className="relative h-48">
        <Image
          src={artist.image || `/placeholder.svg?height=200&width=400&query=${encodeURIComponent(artist.name)}`}
          alt={artist.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
        <div className="absolute top-3 left-3">
          <Badge className="bg-card/80 backdrop-blur-sm text-foreground">{artist.genre}</Badge>
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-foreground text-lg">{artist.name}</h3>
          {artist.tags && (
            <div className="flex flex-wrap gap-1 mt-2">
              {artist.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {artist.monthlyListeners && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{artist.monthlyListeners.toLocaleString()} monthly listeners</span>
          </div>
        )}

        {artist.upcomingShows !== undefined && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{artist.upcomingShows} upcoming shows</span>
          </div>
        )}

        {showAIDescription && artist.aiDescription && (
          <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 space-y-2">
            <AIBadge text="AI Profile" />
            <p className="text-xs text-muted-foreground leading-relaxed">{artist.aiDescription}</p>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Link href={`/fan/artist/${artist.id}`} className="flex-1">
            <Button size="sm" variant="outline" className="w-full bg-transparent">
              <Music className="mr-2 h-4 w-4" />
              View Profile
            </Button>
          </Link>
          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Follow
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
