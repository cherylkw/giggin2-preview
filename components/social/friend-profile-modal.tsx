"use client"

import Image from "next/image"
import Link from "next/link"
import { X, MessageCircle, Calendar, Music, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface FriendProfileModalProps {
  isOpen: boolean
  onClose: () => void
  onStartChat: () => void
  friend: {
    id: string
    name: string
    avatar: string
    location: string
    eventsAttended: number
    mutualFriends: number
    sharedGenres: string[]
    upcomingEvents?: { id: string; name: string; date: string }[]
    recentMoments?: { id: string; image: string }[]
  }
}

export function FriendProfileModal({ isOpen, onClose, onStartChat, friend }: FriendProfileModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="relative p-6 pb-4 border-b border-border">
          <Button variant="ghost" size="icon" className="absolute top-4 right-4" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
          <div className="flex flex-col items-center text-center">
            <Image
              src={friend.avatar || "/placeholder.svg"}
              alt={friend.name}
              width={80}
              height={80}
              className="rounded-full border-2 border-primary"
            />
            <h2 className="text-xl font-bold text-foreground mt-4">{friend.name}</h2>
            <p className="text-sm text-muted-foreground">{friend.location}</p>
            <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
              <span>{friend.eventsAttended} events</span>
              <span>{friend.mutualFriends} mutual friends</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Shared Genres */}
          {friend.sharedGenres && friend.sharedGenres.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <Music className="h-4 w-4 text-primary" />
                Shared Genres
              </h4>
              <div className="flex flex-wrap gap-2">
                {friend.sharedGenres.map((genre) => (
                  <Badge key={genre} variant="outline" className="bg-primary/10 text-primary border-primary/30">
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Upcoming Events */}
          {friend.upcomingEvents && friend.upcomingEvents.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                Upcoming Events
              </h4>
              <div className="space-y-2">
                {friend.upcomingEvents.slice(0, 3).map((event) => (
                  <Link key={event.id} href={`/fan/events/${event.id}`}>
                    <div className="p-2 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer">
                      <p className="text-sm text-foreground">{event.name}</p>
                      <p className="text-xs text-muted-foreground">{new Date(event.date).toLocaleDateString()}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Recent Moments */}
          {friend.recentMoments && friend.recentMoments.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <Heart className="h-4 w-4 text-primary" />
                Recent Moments
              </h4>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {friend.recentMoments.slice(0, 4).map((moment) => (
                  <div
                    key={moment.id}
                    className="relative w-16 h-16 rounded-lg overflow-hidden border border-border shrink-0"
                  >
                    <Image src={moment.image || "/placeholder.svg"} alt="Moment" fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-6 pt-0 flex gap-3">
          <Button className="flex-1 bg-primary text-primary-foreground" onClick={onStartChat}>
            <MessageCircle className="mr-2 h-4 w-4" />
            Message
          </Button>
          <Link href={`/fan/profile/${friend.id}`} className="flex-1">
            <Button variant="outline" className="w-full bg-transparent">
              View Full Profile
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
