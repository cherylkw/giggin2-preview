"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { mockArtists, mockEvents } from "@/lib/mock-data"
import { AIBadge } from "@/components/ui/ai-badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Activity,
  Bookmark,
  Share2,
  Ticket,
  ExternalLink,
  Music,
  MapPin,
  Globe,
  Sparkles,
  Newspaper,
  Camera,
  TrendingUp,
  UserPlus,
} from "lucide-react"

type MainTab = "for-you" | "local" | "global"

interface PulseItem {
  id: string
  type:
    | "new_show"
    | "event_news"
    | "artist_update"
    | "trending"
    | "just_announced"
    | "local_spotlight"
    | "global_news"
    | "release"
    | "show_announcement"
    | "bts"
    | "scene_insight"
    | "similar_artist"
  artist?: {
    id: string
    name: string
    image: string
    genre: string
  }
  title: string
  description: string
  contextLine: string
  eventId?: string
  timestamp: string
  image?: string
  source?: string
  releaseType?: "Single" | "EP" | "Album"
  tags?: string[]
  dataHighlight?: string
  category?: string
}

// Generate For You feed items
const generateForYouItems = (): PulseItem[] => {
  const items: PulseItem[] = []

  mockEvents.forEach((event, index) => {
    const artist = mockArtists[index % mockArtists.length]
    items.push({
      id: `foryou-show-${event.id}`,
      type: index % 3 === 0 ? "just_announced" : "new_show",
      artist: {
        id: artist.id,
        name: event.artist,
        image: artist.image,
        genre: artist.genre,
      },
      title: event.title,
      description: `${event.venue} · ${event.date}`,
      contextLine: index % 2 === 0 ? `Because you follow ${event.artist}` : "Based on your recent searches",
      eventId: event.id.toString(),
      timestamp: index === 0 ? "2h ago" : `${index + 1}h ago`,
    })
  })

  mockArtists.slice(0, 4).forEach((artist, index) => {
    items.push({
      id: `foryou-update-${artist.id}`,
      type: "artist_update",
      artist: {
        id: artist.id,
        name: artist.name,
        image: artist.image,
        genre: artist.genre,
      },
      title: `${artist.name} ${["announces summer tour", "drops new single", "releases concert film", "shares behind-the-scenes"][index % 4]}`,
      description: [
        "12 new dates added",
        "Available now on all platforms",
        "Watch the full show",
        "Exclusive studio footage",
      ][index % 4],
      contextLine: `Because you follow ${artist.name}`,
      timestamp: `${index + 1}d ago`,
    })
  })

  mockArtists
    .filter((a) => a.badge === "Trending")
    .slice(0, 2)
    .forEach((artist) => {
      items.push({
        id: `foryou-trending-${artist.id}`,
        type: "trending",
        artist: {
          id: artist.id,
          name: artist.name,
          image: artist.image,
          genre: artist.genre,
        },
        title: `${artist.name} is trending among fans like you`,
        description: `${(artist.followers / 1000).toFixed(0)}K+ fans are watching`,
        contextLine: "Trending among fans like you",
        timestamp: "Just now",
      })
    })

  const releaseArtists = mockArtists.slice(0, 3)
  releaseArtists.forEach((artist, index) => {
    const releaseTypes: Array<"Single" | "EP" | "Album"> = ["Single", "EP", "Album"]
    const releaseTitles = ["Midnight Dreams", "Summer Nights EP", "Echoes of Tomorrow"]
    items.push({
      id: `foryou-release-${artist.id}`,
      type: "release",
      artist: {
        id: artist.id,
        name: artist.name,
        image: artist.image,
        genre: artist.genre,
      },
      title: releaseTitles[index],
      description: `New ${releaseTypes[index]} by ${artist.name}`,
      contextLine: `Based on your taste in ${artist.genre}`,
      timestamp: `${index + 1}h ago`,
      releaseType: releaseTypes[index],
      tags: [artist.genre, index % 2 === 0 ? "Upbeat" : "Chill"],
      image: artist.image,
    })
  })

  mockEvents.slice(0, 2).forEach((event, index) => {
    const artist = mockArtists[index % mockArtists.length]
    items.push({
      id: `foryou-show-announcement-${event.id}`,
      type: "show_announcement",
      artist: {
        id: artist.id,
        name: event.artist,
        image: artist.image,
        genre: artist.genre,
      },
      title: event.title,
      description: `${event.date} • ${event.venue}`,
      contextLine: `Matches your ${artist.genre} taste`,
      eventId: event.id.toString(),
      timestamp: `${index + 3}h ago`,
      image: event.image,
    })
  })

  const btsArtist = mockArtists[0]
  items.push({
    id: "foryou-bts-1",
    type: "bts",
    artist: {
      id: btsArtist.id,
      name: btsArtist.name,
      image: btsArtist.image,
      genre: btsArtist.genre,
    },
    title: "Studio update",
    description: "Working on new album in the studio",
    contextLine: "Fans in Hong Kong are engaging with this update",
    timestamp: "5h ago",
    image: "/recording-studio-session.png",
  })

  mockArtists.slice(3, 5).forEach((artist, index) => {
    const followedArtist = mockArtists[index].name
    items.push({
      id: `foryou-similar-${artist.id}`,
      type: "similar_artist",
      artist: {
        id: artist.id,
        name: artist.name,
        image: artist.image,
        genre: artist.genre,
      },
      title: `Discover ${artist.name}`,
      description: `${artist.genre} artist with ${(artist.followers / 1000).toFixed(0)}K followers`,
      contextLine: `Fans of ${followedArtist} also follow this`,
      timestamp: `${index + 1}d ago`,
    })
  })

  return items.sort(() => Math.random() - 0.5)
}

// Generate Local feed items
const generateLocalItems = (): PulseItem[] => {
  const items: PulseItem[] = []
  const cities = ["Hong Kong", "Vancouver", "Los Angeles", "New York"]
  const city = cities[0]

  mockEvents.slice(0, 4).forEach((event, index) => {
    const artist = mockArtists[index % mockArtists.length]
    items.push({
      id: `local-event-${event.id}`,
      type: "new_show",
      artist: {
        id: artist.id,
        name: event.artist,
        image: artist.image,
        genre: artist.genre,
      },
      title: event.title,
      description: `${event.venue} · ${event.date}`,
      contextLine: "In your area",
      eventId: event.id.toString(),
      timestamp: `${index + 1}h ago`,
    })
  })

  items.push({
    id: "local-venue-news",
    type: "event_news",
    title: `The Warehouse announces summer lineup`,
    description: `${city}'s premier electronic venue reveals 20+ shows`,
    contextLine: "Local spotlight",
    timestamp: "3h ago",
    image: "/concert-venue-announcement.jpg",
  })

  items.push({
    id: "local-festival",
    type: "just_announced",
    title: `Clockenflap Festival 2025 dates revealed`,
    description: "March 7-9 at Central Harbourfront",
    contextLine: "Local spotlight",
    timestamp: "1d ago",
    image: "/outdoor-music-festival.png",
  })

  mockArtists
    .filter((a) => a.badge === "Local to you")
    .slice(0, 2)
    .forEach((artist, index) => {
      items.push({
        id: `local-artist-${artist.id}`,
        type: "local_spotlight",
        artist: {
          id: artist.id,
          name: artist.name,
          image: artist.image,
          genre: artist.genre,
        },
        title: `${artist.name} featured in local media`,
        description: `Rising ${artist.genre.toLowerCase()} artist gaining momentum`,
        contextLine: `Trending in ${city}`,
        timestamp: `${index + 2}d ago`,
      })
    })

  items.push({
    id: "local-scene-insight-1",
    type: "scene_insight",
    title: "Indie Electronic Rising in Hong Kong",
    description:
      "AI analysis shows growing interest in indie electronic music across local venues with increased ticket sales for smaller shows.",
    contextLine: "Local Trend",
    timestamp: "1d ago",
    dataHighlight: "+17% search volume this week",
    category: "Local Trend",
  })

  const localArtist = mockArtists.find((a) => a.badge === "Local to you") || mockArtists[0]
  items.push({
    id: `local-release-${localArtist.id}`,
    type: "release",
    artist: {
      id: localArtist.id,
      name: localArtist.name,
      image: localArtist.image,
      genre: localArtist.genre,
    },
    title: "City Lights",
    description: `New Single by ${localArtist.name}`,
    contextLine: `Local artist in ${city}`,
    timestamp: "2h ago",
    releaseType: "Single",
    tags: [localArtist.genre, "Local"],
    image: localArtist.image,
  })

  const localEvent = mockEvents[0]
  items.push({
    id: `local-show-announcement-${localEvent.id}`,
    type: "show_announcement",
    artist: {
      id: mockArtists[0].id,
      name: localEvent.artist,
      image: mockArtists[0].image,
      genre: mockArtists[0].genre,
    },
    title: localEvent.title,
    description: `${localEvent.date} • ${localEvent.venue}`,
    contextLine: `Popular in ${city}`,
    eventId: localEvent.id.toString(),
    timestamp: "4h ago",
    image: localEvent.image,
  })

  return items
}

// Generate Global feed items
const generateGlobalItems = (): PulseItem[] => {
  const items: PulseItem[] = [
    {
      id: "global-1",
      type: "global_news",
      title: "Taylor Swift's Eras Tour becomes highest-grossing tour of all time",
      description: "Surpassing $2 billion in total revenue across 150+ shows",
      contextLine: "Global update",
      timestamp: "2h ago",
      source: "Billboard",
      image: "/stadium-concert-aerial-view.jpg",
    },
    {
      id: "global-2",
      type: "global_news",
      title: "Coachella 2025 lineup announced",
      description: "Lady Gaga, Green Day, and Post Malone to headline",
      contextLine: "Major announcement",
      timestamp: "4h ago",
      source: "Pitchfork",
      image: "/coachella-desert-festival-stage.jpg",
    },
    {
      id: "global-3",
      type: "global_news",
      title: "Viral TikTok moment: Fan catches guitar pick mid-air",
      description: "Video has 50M+ views and counting",
      contextLine: "Trending worldwide",
      timestamp: "6h ago",
      image: "/concert-crowd-hands-up.png",
    },
    {
      id: "global-4",
      type: "global_news",
      title: "Grammy nominations announced for Best New Artist",
      description: "Chappell Roan, Sabrina Carpenter among nominees",
      contextLine: "Global update",
      timestamp: "1d ago",
      source: "Recording Academy",
      image: "/grammy-award-trophy.jpg",
    },
    {
      id: "global-5",
      type: "global_news",
      title: "Glastonbury sells out in record 37 minutes",
      description: "200,000+ tickets gone in unprecedented demand",
      contextLine: "Trending worldwide",
      timestamp: "2d ago",
      source: "NME",
      image: "/glastonbury-festival-pyramid-stage.jpg",
    },
  ]

  // Add some artist-specific global news based on taste
  mockArtists.slice(0, 2).forEach((artist, index) => {
    items.push({
      id: `global-artist-${artist.id}`,
      type: "artist_update",
      artist: {
        id: artist.id,
        name: artist.name,
        image: artist.image,
        genre: artist.genre,
      },
      title: `${artist.name} announces world tour dates`,
      description: "50+ cities across 6 continents",
      contextLine: "Relevant to your taste",
      timestamp: `${index + 3}d ago`,
    })
  })

  items.push(
    {
      id: "global-scene-insight-1",
      type: "scene_insight",
      title: "Latin Music Dominates Streaming Charts",
      description:
        "AI analysis reveals Latin genres now represent 25% of global streaming, with reggaeton and Latin pop leading growth.",
      contextLine: "Global Trend",
      timestamp: "6h ago",
      dataHighlight: "+32% year-over-year growth",
      category: "Global Trend",
    },
    {
      id: "global-scene-insight-2",
      type: "scene_insight",
      title: "AI-Generated Music Sparks Industry Debate",
      description: "Major labels and artists discuss the impact of AI tools on music creation and copyright.",
      contextLine: "Global Trend",
      timestamp: "1d ago",
      dataHighlight: "500K+ conversations tracked",
      category: "Global Trend",
    },
  )

  const globalArtist = mockArtists[1]
  items.push({
    id: "global-bts-1",
    type: "bts",
    artist: {
      id: globalArtist.id,
      name: globalArtist.name,
      image: globalArtist.image,
      genre: globalArtist.genre,
    },
    title: "Tour rehearsal clip",
    description: "Sneak peek of the world tour production",
    contextLine: "Fans worldwide are engaging with this update",
    timestamp: "8h ago",
    image: "/tour-rehearsal-stage.jpg",
  })

  mockArtists.slice(0, 2).forEach((artist, index) => {
    const releaseTypes: Array<"Single" | "EP" | "Album"> = ["Album", "EP"]
    const releaseTitles = ["Horizons", "Neon Nights EP"]
    items.push({
      id: `global-release-${artist.id}`,
      type: "release",
      artist: {
        id: artist.id,
        name: artist.name,
        image: artist.image,
        genre: artist.genre,
      },
      title: releaseTitles[index],
      description: `New ${releaseTypes[index]} by ${artist.name}`,
      contextLine: `Trending in ${artist.genre}`,
      timestamp: `${index + 2}d ago`,
      releaseType: releaseTypes[index],
      tags: [artist.genre, "New Release"],
      image: artist.image,
    })
  })

  return items
}

const forYouItems = generateForYouItems()
const localItems = generateLocalItems()
const globalItems = generateGlobalItems()

const activityTags: Record<PulseItem["type"], { label: string; variant: "default" | "secondary" | "outline" }> = {
  new_show: { label: "New Show", variant: "default" },
  event_news: { label: "Event News", variant: "secondary" },
  artist_update: { label: "Artist Update", variant: "outline" },
  trending: { label: "Trending", variant: "default" },
  just_announced: { label: "Just Announced", variant: "default" },
  local_spotlight: { label: "Local Spotlight", variant: "secondary" },
  global_news: { label: "Global News", variant: "outline" },
  release: { label: "New Release", variant: "default" },
  show_announcement: { label: "Show Announcement", variant: "default" },
  bts: { label: "Behind The Scenes", variant: "secondary" },
  scene_insight: { label: "Scene Insight", variant: "secondary" },
  similar_artist: { label: "Similar Artist", variant: "outline" },
}

export default function PulsePage() {
  const [activeTab, setActiveTab] = useState<MainTab>("for-you")
  const [savedItems, setSavedItems] = useState<Set<string>>(new Set())

  const mainTabs: { id: MainTab; label: string; icon: React.ElementType }[] = [
    { id: "for-you", label: "For You", icon: Sparkles },
    { id: "local", label: "Local", icon: MapPin },
    { id: "global", label: "Global", icon: Globe },
  ]

  const getActiveItems = (): PulseItem[] => {
    switch (activeTab) {
      case "for-you":
        return forYouItems
      case "local":
        return localItems
      case "global":
        return globalItems
      default:
        return forYouItems
    }
  }

  const activeItems = getActiveItems()

  const toggleSave = (id: string) => {
    setSavedItems((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const renderCardContent = (item: PulseItem) => {
    // Release Card
    if (item.type === "release") {
      return (
        <>
          {item.artist ? (
            <Link href={`/fan/artists/${item.artist.id}`} className="shrink-0">
              <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                <Image
                  src={item.image || item.artist.image || "/placeholder.svg?height=64&width=64&query=album"}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
            </Link>
          ) : null}

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              {item.artist && (
                <Link
                  href={`/fan/artists/${item.artist.id}`}
                  className="font-semibold text-foreground hover:text-primary transition-colors"
                >
                  {item.artist.name}
                </Link>
              )}
              <Badge variant={activityTags[item.type].variant} className="text-xs">
                {activityTags[item.type].label}
              </Badge>
              <span className="text-xs text-muted-foreground">{item.timestamp}</span>
            </div>

            <p className="mt-1 font-medium text-foreground">{item.title}</p>
            <div className="flex items-center gap-2 mt-1">
              {item.releaseType && (
                <Badge variant="secondary" className="text-xs">
                  {item.releaseType}
                </Badge>
              )}
              {item.tags?.map((tag, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <p className="mt-1 text-xs text-muted-foreground italic">{item.contextLine}</p>

            <div className="mt-3 flex flex-wrap gap-2">
              <Button variant="default" size="sm" className="h-8 text-xs">
                <Music className="mr-1 h-3 w-3" />
                Listen
              </Button>
              {item.artist && (
                <Link href={`/fan/artists/${item.artist.id}`}>
                  <Button variant="outline" size="sm" className="h-8 text-xs bg-transparent">
                    <ExternalLink className="mr-1 h-3 w-3" />
                    View Artist
                  </Button>
                </Link>
              )}
              <Button
                variant={savedItems.has(item.id) ? "default" : "outline"}
                size="sm"
                className="h-8 text-xs"
                onClick={() => toggleSave(item.id)}
              >
                <Bookmark className={`mr-1 h-3 w-3 ${savedItems.has(item.id) ? "fill-current" : ""}`} />
                {savedItems.has(item.id) ? "Saved" : "Save"}
              </Button>
              <Button variant="outline" size="sm" className="h-8 text-xs bg-transparent">
                <Share2 className="mr-1 h-3 w-3" />
                Share
              </Button>
            </div>
          </div>
        </>
      )
    }

    // Show Announcement Card
    if (item.type === "show_announcement") {
      return (
        <>
          <Link href={`/fan/events/${item.eventId}`} className="shrink-0">
            <div className="relative h-16 w-24 overflow-hidden rounded-lg">
              <Image
                src={item.image || "/placeholder.svg?height=64&width=96&query=event"}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
          </Link>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              {item.artist && (
                <Link
                  href={`/fan/artists/${item.artist.id}`}
                  className="font-semibold text-foreground hover:text-primary transition-colors"
                >
                  {item.artist.name}
                </Link>
              )}
              <Badge variant={activityTags[item.type].variant} className="text-xs">
                {activityTags[item.type].label}
              </Badge>
              <span className="text-xs text-muted-foreground">{item.timestamp}</span>
            </div>

            <p className="mt-1 font-medium text-foreground">{item.title}</p>
            <p className="text-sm text-muted-foreground">{item.description}</p>
            <p className="mt-1 text-xs text-muted-foreground italic">{item.contextLine}</p>

            <div className="mt-3 flex flex-wrap gap-2">
              {item.eventId && (
                <Link href={`/fan/events/${item.eventId}`}>
                  <Button variant="default" size="sm" className="h-8 text-xs">
                    <ExternalLink className="mr-1 h-3 w-3" />
                    View Show
                  </Button>
                </Link>
              )}
              <Button
                variant={savedItems.has(item.id) ? "default" : "outline"}
                size="sm"
                className="h-8 text-xs"
                onClick={() => toggleSave(item.id)}
              >
                <Bookmark className={`mr-1 h-3 w-3 ${savedItems.has(item.id) ? "fill-current" : ""}`} />
                {savedItems.has(item.id) ? "Saved" : "Save"}
              </Button>
              <Button variant="outline" size="sm" className="h-8 text-xs bg-transparent">
                <Share2 className="mr-1 h-3 w-3" />
                Share
              </Button>
            </div>
          </div>
        </>
      )
    }

    // Behind-the-Scenes Card
    if (item.type === "bts") {
      return (
        <>
          {item.artist ? (
            <div className="shrink-0">
              <div className="relative h-16 w-24 overflow-hidden rounded-lg">
                <Image
                  src={item.image || "/placeholder.svg?height=64&width=96&query=backstage"}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ) : null}

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              {item.artist && (
                <Link
                  href={`/fan/artists/${item.artist.id}`}
                  className="font-semibold text-foreground hover:text-primary transition-colors"
                >
                  {item.artist.name}
                </Link>
              )}
              <Badge variant={activityTags[item.type].variant} className="text-xs">
                {activityTags[item.type].label}
              </Badge>
              <span className="text-xs text-muted-foreground">{item.timestamp}</span>
            </div>

            <p className="mt-1 font-medium text-foreground">{item.title}</p>
            <p className="text-sm text-muted-foreground">{item.description}</p>
            <p className="mt-1 text-xs text-muted-foreground italic">{item.contextLine}</p>

            <div className="mt-3 flex flex-wrap gap-2">
              {item.artist && (
                <Link href={`/fan/artists/${item.artist.id}`}>
                  <Button variant="outline" size="sm" className="h-8 text-xs bg-transparent">
                    <Camera className="mr-1 h-3 w-3" />
                    View More
                  </Button>
                </Link>
              )}
              <Button
                variant={savedItems.has(item.id) ? "default" : "outline"}
                size="sm"
                className="h-8 text-xs"
                onClick={() => toggleSave(item.id)}
              >
                <Bookmark className={`mr-1 h-3 w-3 ${savedItems.has(item.id) ? "fill-current" : ""}`} />
                {savedItems.has(item.id) ? "Saved" : "Save"}
              </Button>
              <Button variant="outline" size="sm" className="h-8 text-xs bg-transparent">
                <Share2 className="mr-1 h-3 w-3" />
                Share
              </Button>
            </div>
          </div>
        </>
      )
    }

    // Scene Insight Card
    if (item.type === "scene_insight") {
      return (
        <>
          <div className="h-16 w-16 rounded-lg bg-secondary flex items-center justify-center shrink-0">
            <TrendingUp className="h-6 w-6 text-primary" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant={activityTags[item.type].variant} className="text-xs">
                {activityTags[item.type].label}
              </Badge>
              {item.category && (
                <Badge variant="outline" className="text-xs">
                  {item.category}
                </Badge>
              )}
              <span className="text-xs text-muted-foreground">{item.timestamp}</span>
            </div>

            <p className="mt-1 font-medium text-foreground">{item.title}</p>
            <p className="text-sm text-muted-foreground">{item.description}</p>
            {item.dataHighlight && (
              <div className="mt-2 flex items-center gap-1 text-xs font-medium text-chart-3">
                <TrendingUp className="h-3 w-3" />
                {item.dataHighlight}
              </div>
            )}

            <div className="mt-3 flex flex-wrap gap-2">
              <Button
                variant={savedItems.has(item.id) ? "default" : "outline"}
                size="sm"
                className="h-8 text-xs"
                onClick={() => toggleSave(item.id)}
              >
                <Bookmark className={`mr-1 h-3 w-3 ${savedItems.has(item.id) ? "fill-current" : ""}`} />
                {savedItems.has(item.id) ? "Saved" : "Save"}
              </Button>
              <Button variant="outline" size="sm" className="h-8 text-xs bg-transparent">
                <Share2 className="mr-1 h-3 w-3" />
                Share
              </Button>
            </div>
          </div>
        </>
      )
    }

    // Similar Artist Card
    if (item.type === "similar_artist") {
      return (
        <>
          {item.artist ? (
            <Link href={`/fan/artists/${item.artist.id}`} className="shrink-0">
              <div className="relative h-16 w-16 overflow-hidden rounded-full">
                <Image
                  src={item.artist.image || "/placeholder.svg?height=64&width=64&query=artist"}
                  alt={item.artist.name}
                  fill
                  className="object-cover"
                />
              </div>
            </Link>
          ) : null}

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              {item.artist && (
                <Link
                  href={`/fan/artists/${item.artist.id}`}
                  className="font-semibold text-foreground hover:text-primary transition-colors"
                >
                  {item.artist.name}
                </Link>
              )}
              <Badge variant={activityTags[item.type].variant} className="text-xs">
                {activityTags[item.type].label}
              </Badge>
              <span className="text-xs text-muted-foreground">{item.timestamp}</span>
            </div>

            <p className="mt-1 font-medium text-foreground">{item.title}</p>
            <p className="text-sm text-muted-foreground">{item.description}</p>
            <p className="mt-1 text-xs text-muted-foreground italic">{item.contextLine}</p>

            <div className="mt-3 flex flex-wrap gap-2">
              {item.artist && (
                <Link href={`/fan/artists/${item.artist.id}`}>
                  <Button variant="default" size="sm" className="h-8 text-xs">
                    <UserPlus className="mr-1 h-3 w-3" />
                    Explore Artist
                  </Button>
                </Link>
              )}
              <Button
                variant={savedItems.has(item.id) ? "default" : "outline"}
                size="sm"
                className="h-8 text-xs"
                onClick={() => toggleSave(item.id)}
              >
                <Bookmark className={`mr-1 h-3 w-3 ${savedItems.has(item.id) ? "fill-current" : ""}`} />
                {savedItems.has(item.id) ? "Saved" : "Save"}
              </Button>
              <Button variant="outline" size="sm" className="h-8 text-xs bg-transparent">
                <Share2 className="mr-1 h-3 w-3" />
                Share
              </Button>
            </div>
          </div>
        </>
      )
    }

    // Default rendering for existing card types
    return (
      <>
        {item.artist ? (
          <Link href={`/fan/artists/${item.artist.id}`} className="shrink-0">
            <div className="relative h-16 w-16 overflow-hidden rounded-full">
              <Image
                src={item.artist.image || "/placeholder.svg?height=64&width=64&query=artist"}
                alt={item.artist.name}
                fill
                className="object-cover"
              />
            </div>
          </Link>
        ) : item.image ? (
          <div className="relative h-16 w-24 overflow-hidden rounded-lg shrink-0">
            <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
          </div>
        ) : (
          <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center shrink-0">
            <Newspaper className="h-6 w-6 text-muted-foreground" />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            {item.artist ? (
              <Link
                href={`/fan/artists/${item.artist.id}`}
                className="font-semibold text-foreground hover:text-primary transition-colors"
              >
                {item.artist.name}
              </Link>
            ) : item.source ? (
              <span className="font-semibold text-foreground">{item.source}</span>
            ) : null}
            <Badge variant={activityTags[item.type].variant} className="text-xs">
              {activityTags[item.type].label}
            </Badge>
            <span className="text-xs text-muted-foreground">{item.timestamp}</span>
          </div>

          <p className="mt-1 font-medium text-foreground">{item.title}</p>
          <p className="text-sm text-muted-foreground">{item.description}</p>
          <p className="mt-1 text-xs text-muted-foreground italic">{item.contextLine}</p>

          <div className="mt-3 flex flex-wrap gap-2">
            {item.eventId && (
              <Link href={`/fan/events/${item.eventId}`}>
                <Button variant="outline" size="sm" className="h-8 text-xs bg-transparent">
                  <ExternalLink className="mr-1 h-3 w-3" />
                  View Event
                </Button>
              </Link>
            )}
            {item.artist && (
              <Link href={`/fan/artists/${item.artist.id}`}>
                <Button variant="outline" size="sm" className="h-8 text-xs bg-transparent">
                  <Music className="mr-1 h-3 w-3" />
                  View Artist
                </Button>
              </Link>
            )}
            {!item.artist && activeTab === "global" && (
              <Button variant="outline" size="sm" className="h-8 text-xs bg-transparent">
                <ExternalLink className="mr-1 h-3 w-3" />
                Read More
              </Button>
            )}
            <Button
              variant={savedItems.has(item.id) ? "default" : "outline"}
              size="sm"
              className="h-8 text-xs"
              onClick={() => toggleSave(item.id)}
            >
              <Bookmark className={`mr-1 h-3 w-3 ${savedItems.has(item.id) ? "fill-current" : ""}`} />
              {savedItems.has(item.id) ? "Saved" : "Save"}
            </Button>
            {item.eventId && (
              <Link href={`/fan/ticketing?event=${item.eventId}`}>
                <Button variant="outline" size="sm" className="h-8 text-xs bg-transparent">
                  <Ticket className="mr-1 h-3 w-3" />
                  Get Tickets
                </Button>
              </Link>
            )}
            <Button variant="outline" size="sm" className="h-8 text-xs bg-transparent">
              <Share2 className="mr-1 h-3 w-3" />
              Share
            </Button>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Pulse™</h1>
        </div>
        <p className="mt-1 text-muted-foreground">Your personalized music and event updates.</p>
      </div>

      <div className="flex gap-2">
        {mainTabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab(tab.id)}
            className="gap-2"
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Pulse Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeItems.length === 0 ? (
          <Card className="border-border bg-card col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Activity className="h-12 w-12 text-muted-foreground/50" />
              <p className="mt-4 text-muted-foreground">No updates in this category yet.</p>
            </CardContent>
          </Card>
        ) : (
          activeItems.map((item) => (
            <Card key={item.id} className="border-border bg-card transition-colors hover:bg-card/80">
              <CardContent className="p-4">
                <div className="flex gap-4">{renderCardContent(item)}</div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* AI Badge */}
      <div className="flex justify-center pt-4">
        <AIBadge text="Powered by Giggin' Taste Graph AI" />
      </div>
    </div>
  )
}
