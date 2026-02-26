"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AIBadge } from "@/components/ui/ai-badge"
import { ArrowLeft, Music, TrendingUp, Calendar, Sparkles, Users, Radio } from "lucide-react"
import { mockArtists, mockEvents } from "@/lib/mock-data"

const genreClusters = [
  { name: "Electronic", percentage: 42, color: "bg-primary", borderColor: "border-primary", textColor: "text-primary" },
  { name: "Jazz", percentage: 28, color: "bg-accent", borderColor: "border-accent", textColor: "text-accent" },
  {
    name: "Indie Pop",
    percentage: 18,
    color: "bg-emerald-500",
    borderColor: "border-emerald-500",
    textColor: "text-emerald-500",
  },
  {
    name: "Techno",
    percentage: 12,
    color: "bg-amber-500",
    borderColor: "border-amber-500",
    textColor: "text-amber-500",
  },
]

const tasteGraphToolCalls = [
  {
    tool: "mcp.taste_graph_analyze",
    status: "completed" as const,
    duration: "234ms",
    result: "Analyzed 847 listening sessions, 124 concert attendances",
  },
  {
    tool: "mcp.genre_clustering",
    status: "completed" as const,
    duration: "156ms",
    result: "Identified 4 primary genre clusters",
  },
  {
    tool: "mcp.artist_affinity",
    status: "completed" as const,
    duration: "189ms",
    result: "Mapped affinity scores for 156 artists",
  },
]

export default function TasteGraphPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/fan/pulse">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-foreground">Your Taste Graph</h1>
            <AIBadge text="AI-powered" />
          </div>
          <p className="text-muted-foreground">
            A living map of your musical identity, built from your listening history and concert attendance.
          </p>
        </div>
      </div>

      {/* AI Summary */}
      <Card className="border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">AI Taste Summary</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-foreground leading-relaxed">
            Your taste profile shows a strong affinity for{" "}
            <span className="text-primary font-medium">atmospheric electronic</span> and{" "}
            <span className="text-accent font-medium">contemporary jazz</span> sounds. You gravitate toward intimate
            venue experiences and artists with organic, layered production. Your concert attendance peaks during weekend
            evening shows, and you prefer venues with capacities under 3,000. Based on your taste graph, you{"'"}re
            likely to enjoy upcoming shows featuring ambient textures, live instrumentation, and immersive visual
            production.
          </p>
          <div className="mt-4">{/* Placeholder for ToolCallPanel if needed */}</div>
        </CardContent>
      </Card>

      {/* Taste Graph Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Music className="h-5 w-5 text-primary" />
            Genre Network
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative min-h-[400px] rounded-xl border border-border bg-background/50 p-8">
            {/* Center "You" node */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary bg-primary/20 shadow-lg shadow-primary/20">
                <span className="text-lg font-bold text-foreground">You</span>
              </div>
            </div>

            {/* Connection lines using CSS */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Lines from center to each genre - using gradient borders */}
              <div className="absolute left-1/2 top-1/2 w-32 h-0.5 bg-gradient-to-r from-primary/60 to-primary/20 origin-left -translate-y-1/2 -rotate-45 -translate-x-2" />
              <div className="absolute left-1/2 top-1/2 w-32 h-0.5 bg-gradient-to-r from-accent/60 to-accent/20 origin-left -translate-y-1/2 rotate-[-30deg] -translate-x-2" />
              <div className="absolute left-1/2 top-1/2 w-28 h-0.5 bg-gradient-to-r from-emerald-500/60 to-emerald-500/20 origin-left -translate-y-1/2 rotate-[210deg] -translate-x-2" />
              <div className="absolute left-1/2 top-1/2 w-28 h-0.5 bg-gradient-to-r from-amber-500/60 to-amber-500/20 origin-left -translate-y-1/2 rotate-[330deg] -translate-x-2" />
            </div>

            {/* Genre nodes positioned around center */}
            {/* Electronic - top left */}
            <div className="absolute left-[15%] top-[15%]">
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-primary bg-primary/20 shadow-lg shadow-primary/20">
                  <div className="text-center">
                    <div className="text-sm font-semibold text-foreground">Electronic</div>
                    <div className="text-lg font-bold text-primary">42%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Jazz - top right */}
            <div className="absolute right-[15%] top-[20%]">
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-accent bg-accent/20 shadow-lg shadow-accent/20">
                  <div className="text-center">
                    <div className="text-sm font-semibold text-foreground">Jazz</div>
                    <div className="text-lg font-bold text-accent">28%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Indie Pop - bottom left */}
            <div className="absolute left-[18%] bottom-[15%]">
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-18 w-18 items-center justify-center rounded-full border-2 border-emerald-500 bg-emerald-500/20 shadow-lg shadow-emerald-500/20 p-4">
                  <div className="text-center">
                    <div className="text-xs font-semibold text-foreground">Indie Pop</div>
                    <div className="text-base font-bold text-emerald-500">18%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Techno - bottom right */}
            <div className="absolute right-[18%] bottom-[18%]">
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-amber-500 bg-amber-500/20 shadow-lg shadow-amber-500/20">
                  <div className="text-center">
                    <div className="text-xs font-semibold text-foreground">Techno</div>
                    <div className="text-sm font-bold text-amber-500">12%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative smaller nodes */}
            <div className="absolute left-[40%] top-[10%]">
              <div className="h-3 w-3 rounded-full bg-primary/40" />
            </div>
            <div className="absolute right-[35%] top-[12%]">
              <div className="h-2 w-2 rounded-full bg-accent/40" />
            </div>
            <div className="absolute left-[10%] top-[50%]">
              <div className="h-2 w-2 rounded-full bg-emerald-500/40" />
            </div>
            <div className="absolute right-[10%] bottom-[40%]">
              <div className="h-3 w-3 rounded-full bg-amber-500/40" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Genre Clusters */}
      <Card>
        <CardHeader>
          <CardTitle>Genre Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {genreClusters.map((genre) => (
              <div key={genre.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{genre.name}</span>
                  <span className="text-muted-foreground">{genre.percentage}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className={`h-full rounded-full ${genre.color}`} style={{ width: `${genre.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommended Artists */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Top Recommended Artists
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {mockArtists.map((artist) => (
              <div
                key={artist.id}
                className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/50"
              >
                <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Music className="h-6 w-6 text-foreground/70" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground truncate">{artist.name}</h4>
                  <p className="text-sm text-muted-foreground">{artist.genre}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3 text-primary" />
                    <span className="text-xs text-primary">{artist.popularity}% match</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommended Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-accent" />
            Events Based on Your Taste
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {mockEvents.slice(0, 2).map((event) => (
              <div key={event.id} className="flex flex-col items-center gap-4">
                <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Radio className="h-12 w-12 text-foreground/70" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground truncate">{event.name}</h4>
                  <p className="text-sm text-muted-foreground">{event.date}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="h-3 w-3 text-primary" />
                    <span className="text-xs text-primary">{event.match}% match</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
