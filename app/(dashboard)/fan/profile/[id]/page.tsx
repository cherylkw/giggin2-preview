"use client"

import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, UserPlus, UserMinus, UserCheck, Music, Calendar, MapPin, Camera, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockFans, mockEvents, mockUserMoments } from "@/lib/mock-data"

export default function ProfilePage() {
  const params = useParams()
  const fanId = params.id as string

  const fan = mockFans.find((f) => f.id === fanId) || mockFans[0]
  const eventsAttended = mockEvents.slice(0, 3)
  const moments = mockUserMoments

  return (
    <div className="space-y-8">
      {/* Back button */}
      <div className="flex items-center gap-4">
        <Link href="/fan/friends">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <span className="text-muted-foreground">Back to Friends</span>
      </div>

      {/* Profile Header */}
      <Card className="border-border bg-card overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary/30 via-primary/20 to-accent/20" />
        <CardContent className="relative pt-0">
          <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-16">
            <Image
              src={fan.avatar || "/placeholder.svg"}
              alt={fan.name}
              width={128}
              height={128}
              className="rounded-full border-4 border-card"
            />
            <div className="flex-1 pb-2">
              <h1 className="text-2xl font-bold text-foreground">{fan.name}</h1>
              <p className="text-muted-foreground flex items-center gap-1 mt-1">
                <MapPin className="h-4 w-4" />
                {fan.location}
              </p>
            </div>
            <div className="flex gap-2 pb-2">
              {fan.isFriend ? (
                <Button variant="outline" className="bg-transparent">
                  <UserMinus className="mr-2 h-4 w-4" />
                  Unfriend
                </Button>
              ) : (
                <Button className="bg-primary text-primary-foreground">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Friend
                </Button>
              )}
              {fan.isFollowing ? (
                <Button variant="outline" className="bg-transparent">
                  <UserCheck className="mr-2 h-4 w-4" />
                  Following
                </Button>
              ) : (
                <Button variant="outline" className="bg-transparent">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Follow
                </Button>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{fan.eventsAttended}</p>
              <p className="text-sm text-muted-foreground">Events</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{fan.mutualFriends}</p>
              <p className="text-sm text-muted-foreground">Mutual Friends</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{moments.length}</p>
              <p className="text-sm text-muted-foreground">Moments</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shared Artists & Genres */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music className="h-5 w-5 text-primary" />
                Shared Interests
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {fan.sharedArtists && fan.sharedArtists.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Artists you both like</p>
                  <div className="flex flex-wrap gap-2">
                    {fan.sharedArtists.map((artist) => (
                      <Badge key={artist} className="bg-primary/20 text-primary">
                        {artist}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {fan.sharedGenres && fan.sharedGenres.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Genres you both enjoy</p>
                  <div className="flex flex-wrap gap-2">
                    {fan.sharedGenres.map((genre) => (
                      <Badge key={genre} variant="outline">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {(!fan.sharedArtists || fan.sharedArtists.length === 0) &&
                (!fan.sharedGenres || fan.sharedGenres.length === 0) && (
                  <p className="text-center text-muted-foreground py-4">No shared music interests yet</p>
                )}
            </CardContent>
          </Card>

          {/* Events Attended */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Events Attended
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {eventsAttended.map((event) => (
                  <Link key={event.id} href={`/fan/events/${event.id}`}>
                    <div className="flex items-center gap-4 p-3 rounded-xl border border-border bg-secondary/30 hover:border-primary/50 transition-colors cursor-pointer">
                      <div className="relative h-16 w-16 rounded-lg overflow-hidden shrink-0">
                        <Image src={event.image || "/placeholder.svg"} alt={event.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground truncate">{event.name}</h4>
                        <p className="text-sm text-muted-foreground">{event.artist}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(event.date).toLocaleDateString()} · {event.venue}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Moments Posted */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-primary" />
                Moments Posted
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                {moments.map((moment) => (
                  <div
                    key={moment.id}
                    className="relative aspect-square rounded-xl overflow-hidden border border-border group cursor-pointer"
                  >
                    <Image
                      src={moment.image || "/placeholder.svg"}
                      alt={moment.caption}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
                {moments.length === 0 && (
                  <div className="col-span-3 text-center py-8">
                    <Camera className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">No moments shared yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* View Taste Graph */}
          <Card className="border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card">
            <CardContent className="p-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Taste Graph</h3>
              <p className="text-sm text-muted-foreground mb-4">
                See how your music taste compares with {fan.name.split(" ")[0]}
              </p>
              <Link href="/fan/taste-graph">
                <Button className="w-full bg-primary text-primary-foreground">View Taste Graph</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Member since</span>
                <span className="text-sm text-foreground">Jan 2024</span>
              </div>
              {fan.sharedArtists && fan.sharedArtists.length > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Most seen artist</span>
                  <span className="text-sm text-foreground">{fan.sharedArtists[0]}</span>
                </div>
              )}
              {fan.sharedGenres && fan.sharedGenres.length > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Favorite genre</span>
                  <span className="text-sm text-foreground">{fan.sharedGenres[0]}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
