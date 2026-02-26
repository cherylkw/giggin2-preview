"use client"

import Image from "next/image"
import { Users, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AIBadge } from "@/components/ui/ai-badge"
import { mockArtists } from "@/lib/mock-data"

export default function RecommendedArtistsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Recommended Artists</h1>
        <p className="mt-2 text-muted-foreground">AI-curated artists based on your market demand</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockArtists.map((artist) => (
          <div
            key={artist.id}
            className="rounded-xl border border-border bg-card overflow-hidden transition-colors hover:border-primary/50"
          >
            <div className="relative aspect-square">
              <Image src={artist.image || "/placeholder.svg"} alt={artist.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              <AIBadge text={`${artist.popularity}% match`} className="absolute top-3 right-3" />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-foreground">{artist.name}</h3>
              <p className="text-sm text-muted-foreground">{artist.genre}</p>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  {(artist.followers / 1000).toFixed(0)}K followers
                </span>
                <span className="flex items-center gap-1 text-chart-3">
                  <TrendingUp className="h-4 w-4" />
                  High demand
                </span>
              </div>
              <Button className="mt-4 w-full bg-transparent" variant="outline">
                View Profile
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
