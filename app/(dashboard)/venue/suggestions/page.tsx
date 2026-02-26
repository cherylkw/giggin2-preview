"use client"

import Image from "next/image"
import { TrendingUp, Star, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AIBadge } from "@/components/ui/ai-badge"
import { mockArtists } from "@/lib/mock-data"

const suggestions = [
  { day: "Friday", date: "Jan 17", genre: "Electronic", confidence: 92 },
  { day: "Saturday", date: "Jan 25", genre: "Jazz", confidence: 87 },
  { day: "Friday", date: "Feb 7", genre: "Indie Rock", confidence: 84 },
]

export default function BookingSuggestionsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Booking Suggestions</h1>
        <p className="mt-2 text-muted-foreground">AI-recommended bookings based on demand analysis</p>
      </div>

      {/* Best Nights */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Best Nights for Booking</h2>
          <AIBadge text="Demand Analysis" />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {suggestions.map((item) => (
            <div key={item.date} className="rounded-lg border border-primary/30 bg-primary/5 p-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">{item.day}</span>
                <span className="text-sm text-muted-foreground">{item.date}</span>
              </div>
              <p className="mt-2 text-primary">{item.genre}</p>
              <div className="mt-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-chart-3" />
                <span className="text-sm text-chart-3">{item.confidence}% demand confidence</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Artists */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Recommended Artists</h2>
          <AIBadge text="Taste Graph Match" />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {mockArtists.map((artist) => (
            <div
              key={artist.id}
              className="flex items-center gap-4 rounded-lg border border-border bg-secondary/50 p-4"
            >
              <Image
                src={artist.image || "/placeholder.svg"}
                alt={artist.name}
                width={60}
                height={60}
                className="rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium text-foreground">{artist.name}</h3>
                <p className="text-sm text-muted-foreground">{artist.genre}</p>
                <div className="mt-1 flex items-center gap-1">
                  <Star className="h-3 w-3 text-chart-4 fill-chart-4" />
                  <span className="text-xs text-muted-foreground">{artist.popularity}% match</span>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Book
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue Projections */}
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
        <div className="flex items-center gap-3 mb-3">
          <Sparkles className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">Revenue Projection</h3>
        </div>
        <p className="text-muted-foreground">
          Based on current demand and your venue capacity, booking the suggested artists on recommended nights could
          generate an estimated <span className="font-bold text-chart-3">$124,500</span> in ticket revenue for Q1 2025.
        </p>
        <p className="mt-3 text-xs text-muted-foreground">Powered by Giggin&apos;s Reasoning Engine + Taste Graph AI</p>
      </div>
    </div>
  )
}
