"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Share2,
  Send,
  Sparkles,
  Users,
  Calendar,
  MapPin,
  Music,
  UserPlus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AIBadge } from "@/components/ui/ai-badge"
import { ToolCallPanel } from "@/components/ui/tool-call-panel"
import { mockEvents, mockMoments, mockMomentComments, mockFriendActivity } from "@/lib/mock-data"

const emojiReactions = ["🔥", "❤️", "🎵", "🤘", "✨", "🎉"]

export default function EventMomentHubPage() {
  const params = useParams()
  const eventId = params.eventId as string

  const event = mockEvents.find((e) => e.id === eventId) || mockEvents[0]
  const eventMoments = mockMoments.filter((m) => m.eventId === eventId)
  const comments = mockMomentComments.filter((c) => eventMoments.some((m) => m.id === c.momentId))
  const friendActivity = mockFriendActivity.filter((f) => f.eventId === eventId)

  const [newComment, setNewComment] = useState("")
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null)

  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  const recapToolCalls = [
    {
      tool: "mcp.analyze_moments",
      status: "completed" as const,
      duration: "234ms",
      result: `Analyzed ${eventMoments.length} fan uploads`,
    },
    { tool: "mcp.generate_recap", status: "completed" as const, duration: "567ms", result: "Generated event summary" },
    {
      tool: "mcp.sentiment_analysis",
      status: "completed" as const,
      duration: "123ms",
      result: "Overall sentiment: 94% positive",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/fan/moments">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <span className="text-muted-foreground">Back to Moments</span>
      </div>

      {/* Event Info Banner */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="relative h-24 w-24 rounded-xl overflow-hidden border border-border shrink-0">
            <Image src={event.image || "/placeholder.svg"} alt={event.name} fill className="object-cover" />
          </div>
          <div className="flex-1">
            <Badge className="mb-2 bg-primary/20 text-primary">{event.genre}</Badge>
            <h1 className="text-2xl font-bold text-foreground">{event.name}</h1>
            <p className="text-muted-foreground">{event.artist}</p>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {event.venue}, {event.city}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="bg-transparent">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Link href={`/fan/events/${event.id}`}>
              <Button size="sm" className="bg-primary text-primary-foreground">
                View Event
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Fan Media Gallery */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Music className="h-5 w-5 text-primary" />
                  Fan Media Gallery
                </CardTitle>
                <Badge variant="outline">{eventMoments.length} uploads</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {eventMoments.map((moment) => (
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
                    <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-xs text-foreground font-medium truncate">{moment.userName}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Heart className="h-3 w-3" /> {moment.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3" /> {moment.comments}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                {/* Placeholder for more */}
                {eventMoments.length < 6 &&
                  Array.from({ length: 6 - eventMoments.length }).map((_, i) => (
                    <div
                      key={`placeholder-${i}`}
                      className="aspect-square rounded-xl border-2 border-dashed border-border flex items-center justify-center bg-secondary/30"
                    >
                      <p className="text-xs text-muted-foreground text-center px-2">More moments coming</p>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Live Comment Thread */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                Live Comment Thread
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Emoji Reactions */}
              <div className="flex items-center gap-2 pb-4 border-b border-border">
                <span className="text-sm text-muted-foreground mr-2">React:</span>
                {emojiReactions.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => setSelectedEmoji(emoji)}
                    className={`text-xl p-2 rounded-lg transition-colors ${
                      selectedEmoji === emoji ? "bg-primary/20" : "hover:bg-secondary"
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>

              {/* Comments List */}
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <Link href={`/fan/profile/${comment.userId}`}>
                      <Image
                        src={comment.userAvatar || "/placeholder.svg"}
                        alt={comment.userName}
                        width={36}
                        height={36}
                        className="rounded-full h-9 w-9 cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                      />
                    </Link>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Link href={`/fan/profile/${comment.userId}`}>
                          <span className="font-medium text-foreground text-sm hover:text-primary transition-colors cursor-pointer">
                            {comment.userName}
                          </span>
                        </Link>
                        {comment.isArtist && <Badge className="bg-primary/20 text-primary text-xs h-5">Artist</Badge>}
                        {comment.isVenue && <Badge className="bg-accent/20 text-accent text-xs h-5">Venue</Badge>}
                        <span className="text-xs text-muted-foreground">
                          {new Date(comment.timestamp).toLocaleDateString()}
                        </span>
                        {!comment.isArtist && !comment.isVenue && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-5 px-1 text-primary hover:bg-primary/10 ml-auto"
                          >
                            <UserPlus className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comment Input */}
              <div className="flex gap-2 pt-4 border-t border-border">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 bg-secondary rounded-lg px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <Button size="icon" className="bg-primary text-primary-foreground shrink-0">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* AI Event Recap */}
          <Card className="border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  AI Event Recap
                </CardTitle>
                <AIBadge text="Generated" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="text-foreground font-medium">{event.name}</span> was an electrifying night at{" "}
                {event.venue}. {event.artist} delivered an unforgettable {event.genre.toLowerCase()}
                performance with stunning visuals and crowd-pleasing hits. Fan sentiment analysis shows 94% positive
                reactions, with the most captured moments during the main set's climax. The venue reached{" "}
                {Math.round((event.attendance.projected / event.attendance.capacity) * 100)}% capacity with fans sharing{" "}
                {eventMoments.length}+ moments throughout the night.
              </p>
              <div className="pt-2">
                <ToolCallPanel calls={recapToolCalls} />
              </div>
            </CardContent>
          </Card>

          {/* Friend Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Friend Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {friendActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-3">
                    <Link href={`/fan/profile/${activity.id}`}>
                      <Image
                        src={activity.userAvatar || "/placeholder.svg"}
                        alt={activity.userName}
                        width={32}
                        height={32}
                        className="rounded-full cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">
                        <Link href={`/fan/profile/${activity.id}`}>
                          <span className="font-medium hover:text-primary transition-colors cursor-pointer">
                            {activity.userName}
                          </span>
                        </Link>{" "}
                        <span className="text-muted-foreground">{activity.action}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(activity.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" className="h-7 px-2 text-primary hover:bg-primary/10">
                      <UserPlus className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
                {friendActivity.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">No friend activity yet</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardContent className="p-4 space-y-2">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Share2 className="mr-2 h-4 w-4" />
                Share Event Recap
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Sparkles className="mr-2 h-4 w-4" />
                Create AI Collage
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
