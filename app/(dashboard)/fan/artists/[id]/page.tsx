"use client"

import Link from "next/link"
import Image from "next/image"
import { MapPin, Music, ChevronRight, Ticket, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AIBadge } from "@/components/ui/ai-badge"
import { ArtistSocialLinks } from "@/components/artist/social-links"
import { EventCard } from "@/components/events/event-card"
import { mockEvents, mockPastEvents, mockMoments, mockArtists } from "@/lib/mock-data"

export default async function ArtistProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const artistData = mockArtists.find((a) => a.id === id)

  const artist = artistData
    ? {
        ...artistData,
        coverImage: "/electronic-music-concert-stage-lights.jpg",
        eventsThisYear: 24,
        topGenres: [artistData.genre, "Ambient", "Downtempo"],
        upcomingEvents: mockEvents
          .filter((e) => e.artist === artistData.name || e.artist === "Luna Eclipse")
          .slice(0, 2),
        pastEvents: mockPastEvents.filter((e) => e.artist === artistData.name || e.artist === "Luna Eclipse"),
      }
    : {
        id,
        name: "Luna Eclipse",
        genre: "Electronic",
        bio: "Luna Eclipse is a boundary-pushing electronic artist known for immersive live shows that blend cutting-edge visuals with deep, melodic soundscapes. Rising from the underground scene, Luna has become a festival favorite with performances at Coachella, Tomorrowland, and Electric Forest.",
        image: "/female-electronic-music-artist.jpg",
        coverImage: "/electronic-music-concert-stage-lights.jpg",
        location: "Los Angeles, CA",
        followers: 125000,
        monthlyListeners: 890000,
        eventsThisYear: 24,
        socialLinks: {
          instagram: "https://instagram.com/lunaeclipse",
          spotify: "https://open.spotify.com/artist/lunaeclipse",
          youtube: "https://youtube.com/@lunaeclipse",
          tiktok: "https://tiktok.com/@lunaeclipse",
          indieCity: "https://indiecity.com/lunaeclipse",
          website: "https://lunaeclipse.com",
        },
        topGenres: ["Electronic", "Ambient", "Downtempo"],
        upcomingEvents: mockEvents.slice(0, 2),
        pastEvents: mockPastEvents.slice(0, 2),
      }

  // Get moments for this artist
  const artistMoments = mockMoments.slice(0, 4)

  return (
    <div className="space-y-8">
      {/* Cover Image */}
      <div className="relative h-48 md:h-64 overflow-hidden rounded-2xl">
        <Image src={artist.coverImage || "/placeholder.svg"} alt={artist.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      {/* Artist Header */}
      <div className="flex flex-col md:flex-row gap-6 -mt-20 relative z-10 px-4">
        <div className="relative h-32 w-32 md:h-40 md:w-40 flex-shrink-0 overflow-hidden rounded-full border-4 border-background shadow-xl">
          <Image src={artist.image || "/placeholder.svg"} alt={artist.name} fill className="object-cover" />
        </div>
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">{artist.name}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Music className="h-4 w-4" />
                  {artist.genre}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {artist.location}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {artist.topGenres.map((genre) => (
                  <Badge key={genre} variant="secondary">
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Follow</Button>
              <Button variant="outline">Share</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <p className="text-2xl font-bold text-foreground">{(artist.followers / 1000).toFixed(1)}K</p>
          <p className="text-sm text-muted-foreground">Followers</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <p className="text-2xl font-bold text-foreground">{(artist.monthlyListeners / 1000).toFixed(0)}K</p>
          <p className="text-sm text-muted-foreground">Monthly Listeners</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <p className="text-2xl font-bold text-foreground">{artist.eventsThisYear}</p>
          <p className="text-sm text-muted-foreground">Events This Year</p>
        </div>
      </div>

      {/* Social Links */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Connect</h2>
        <ArtistSocialLinks links={artist.socialLinks} />
      </div>

      {/* Bio */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-3 text-lg font-semibold text-foreground">About</h2>
        <p className="text-muted-foreground leading-relaxed">{artist.bio}</p>
      </div>

      {/* Upcoming Events */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Upcoming Shows</h2>
          <Button variant="ghost" size="sm" className="text-primary">
            View all <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        {artist.upcomingEvents && artist.upcomingEvents.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {artist.upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-card p-6 text-center">
            <p className="text-muted-foreground">No upcoming shows scheduled</p>
          </div>
        )}
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Past Shows</h2>
        </div>
        {artist.pastEvents && artist.pastEvents.length > 0 ? (
          <div className="space-y-3">
            {artist.pastEvents.map((event) => (
              <div key={event.id} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card">
                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                  <Image src={event.image || "/placeholder.svg"} alt={event.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">{event.name}</h3>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(event.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span>{event.venue}</span>
                    <span>{event.city}</span>
                  </div>
                </div>
                {event.hasMoments && (
                  <Link href={`/fan/moments/${event.id}`}>
                    <Button variant="outline" size="sm">
                      View Moments
                    </Button>
                  </Link>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-card p-6 text-center">
            <p className="text-muted-foreground">No past shows to display</p>
          </div>
        )}
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Moments from Fans</h2>
          <Link href="/fan/moments">
            <Button variant="ghost" size="sm" className="text-primary">
              View all <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {artistMoments.map((moment) => (
            <Link
              key={moment.id}
              href={`/fan/moments/${moment.eventId}`}
              className="group relative min-w-[140px] max-w-[140px] overflow-hidden rounded-xl border border-border"
            >
              <div className="relative aspect-square">
                <Image
                  src={moment.image || "/placeholder.svg"}
                  alt={moment.caption}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-2">
                <p className="text-xs text-foreground line-clamp-2">{moment.caption}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
        <AIBadge text="Artist Insights" className="mb-3" />
        <p className="text-foreground">
          {artist.name}&apos;s shows in your area typically sell out within 48 hours. Based on your taste graph, you
          have a 94% compatibility with this artist. We recommend setting a ticket alert for upcoming announcements.
        </p>
        <Button className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
          <Ticket className="mr-2 h-4 w-4" />
          Set Ticket Alert
        </Button>
      </div>
    </div>
  )
}
