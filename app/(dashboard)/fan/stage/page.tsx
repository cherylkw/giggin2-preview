"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Grid3X3, List, ChevronDown, TrendingUp, Sparkles, MapPin, Activity, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { mockArtists } from "@/lib/mock-data"

const pulsePreviewItems = [
  {
    id: "1",
    artistName: "Luna Eclipse",
    artistImage: mockArtists[0]?.image || "/placeholder.svg",
    tag: "New Show",
    title: "Neon Dreams Tour - Los Angeles",
    timestamp: "2h ago",
  },
  {
    id: "2",
    artistName: "Synthesize",
    artistImage: mockArtists[5]?.image || "/placeholder.svg",
    tag: "Tour Update",
    title: "Summer festival dates announced",
    timestamp: "4h ago",
  },
  {
    id: "3",
    artistName: "Ember Waves",
    artistImage: mockArtists[4]?.image || "/placeholder.svg",
    tag: "New Release",
    title: 'New single: "Fading Light"',
    timestamp: "1d ago",
  },
  {
    id: "4",
    artistName: "DJ Phantom",
    artistImage: mockArtists[3]?.image || "/placeholder.svg",
    tag: "Trending Near You",
    title: "Trending in your area",
    timestamp: "Just now",
  },
]

const genres = ["For You", "All", "Electronic", "Jazz", "Rock", "Alternative", "Folk", "Indie Pop", "EDM", "Techno"]

export default function StagePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("For You")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("Popularity")

  const filteredArtists = mockArtists.filter((artist) => {
    const matchesSearch = artist.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGenre = selectedGenre === "For You" || selectedGenre === "All" || artist.genre === selectedGenre
    return matchesSearch && matchesGenre
  })

  const sortedArtists = [...filteredArtists].sort((a, b) => {
    switch (sortBy) {
      case "Popularity":
        return b.popularity - a.popularity
      case "Name A-Z":
        return a.name.localeCompare(b.name)
      case "Name Z-A":
        return b.name.localeCompare(a.name)
      case "Followers":
        return b.followers - a.followers
      default:
        return 0
    }
  })

  return (
    <div className="space-y-6">
      <section>
        <div className="mb-3 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">From Your Pulse™</h2>
            </div>
            <p className="text-sm text-muted-foreground">Your personalized music and event updates.</p>
          </div>
          <Link href="/fan/pulse">
            <Button variant="ghost" size="sm" className="text-primary gap-1">
              Open Pulse™ <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {pulsePreviewItems.map((item) => (
            <Link key={item.id} href="/fan/pulse">
              <Card className="border-border bg-card hover:bg-card/80 transition-colors cursor-pointer h-full">
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
                      <Image
                        src={item.artistImage || "/placeholder.svg"}
                        alt={item.artistName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground truncate">{item.artistName}</span>
                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                          {item.tag}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{item.title}</p>
                      <p className="text-[10px] text-muted-foreground/70">{item.timestamp}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Stage</h1>
        <p className="mt-1 text-muted-foreground">Discover artists on Giggin&apos; and explore their live shows.</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search artists..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-secondary border-border"
          />
        </div>
        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex rounded-lg border border-border overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground"}`}
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 ${viewMode === "list" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground"}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-border bg-transparent">
                {sortBy} <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-card border-border">
              {["Popularity", "Name A-Z", "Name Z-A", "Followers"].map((option) => (
                <DropdownMenuItem
                  key={option}
                  onClick={() => setSortBy(option)}
                  className={sortBy === option ? "bg-primary/10 text-primary" : ""}
                >
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Genre Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              selectedGenre === genre
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
            }`}
          >
            {genre === "For You" && <Sparkles className="inline-block mr-1 h-3 w-3" />}
            {genre}
          </button>
        ))}
      </div>

      {/* Artists Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {sortedArtists.map((artist) => (
            <Link
              key={artist.id}
              href={`/fan/artists/${artist.id}`}
              className="group flex flex-col items-center text-center"
            >
              <div className="relative mb-3">
                <div className="relative h-28 w-28 md:h-32 md:w-32 overflow-hidden rounded-full border-2 border-border group-hover:border-primary transition-colors">
                  <Image
                    src={artist.image || "/placeholder.svg"}
                    alt={artist.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                {artist.badge && (
                  <Badge
                    className={`absolute -bottom-1 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap ${
                      artist.badge === "New"
                        ? "bg-accent text-accent-foreground"
                        : artist.badge === "Trending"
                          ? "bg-chart-3 text-white"
                          : "bg-chart-2 text-white"
                    }`}
                  >
                    {artist.badge === "Trending" && <TrendingUp className="mr-1 h-3 w-3" />}
                    {artist.badge === "Local to you" && <MapPin className="mr-1 h-3 w-3" />}
                    {artist.badge}
                  </Badge>
                )}
              </div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {artist.name}
              </h3>
              <p className="text-sm text-muted-foreground">{artist.genre}</p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {sortedArtists.map((artist) => (
            <Link
              key={artist.id}
              href={`/fan/artists/${artist.id}`}
              className="group flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary transition-colors"
            >
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full border border-border">
                <Image src={artist.image || "/placeholder.svg"} alt={artist.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                    {artist.name}
                  </h3>
                  {artist.badge && (
                    <Badge
                      className={`text-xs ${
                        artist.badge === "New"
                          ? "bg-accent text-accent-foreground"
                          : artist.badge === "Trending"
                            ? "bg-chart-3 text-white"
                            : "bg-chart-2 text-white"
                      }`}
                    >
                      {artist.badge}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{artist.genre}</p>
                <p className="text-xs text-muted-foreground mt-1">{(artist.followers / 1000).toFixed(1)}K followers</p>
              </div>
              <div className="text-right hidden sm:block">
                <p className="text-sm text-muted-foreground">{artist.location}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Empty State */}
      {sortedArtists.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No artists found matching your search.</p>
        </div>
      )}
    </div>
  )
}
