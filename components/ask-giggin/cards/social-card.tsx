"use client"

import Image from "next/image"
import { Users, Calendar, MapPin, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { AIBadge } from "@/components/ui/ai-badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface SocialCardProps {
  social: {
    type: "friend_attending" | "group_recommendation" | "friend_invite"
    eventName: string
    eventImage: string
    eventDate: string
    eventVenue: string
    friendsAttending: {
      id: string
      name: string
      avatar: string
    }[]
    totalFriends: number
    matchReason?: string
  }
  confidenceLabel?: string
}

export function SocialCard({ social, confidenceLabel = "Social Match" }: SocialCardProps) {
  const displayedFriends = social.friendsAttending.slice(0, 3)
  const remainingCount = social.totalFriends - displayedFriends.length

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image src={social.eventImage || "/placeholder.svg"} alt={social.eventName} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        <div className="absolute left-3 top-3">
          <AIBadge text={confidenceLabel} />
        </div>
        {social.type === "friend_attending" && (
          <Badge className="absolute right-3 top-3 bg-green-500/90 text-white">
            <Users className="h-3 w-3 mr-1" />
            Friends Going
          </Badge>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-foreground text-lg mb-2">{social.eventName}</h3>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {social.eventDate}
          </span>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
          <MapPin className="h-4 w-4" />
          {social.eventVenue}
        </div>

        <div className="rounded-lg bg-primary/5 border border-primary/20 p-3 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              {social.totalFriends} {social.totalFriends === 1 ? "friend is" : "friends are"} attending
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {displayedFriends.map((friend) => (
                <Avatar key={friend.id} className="h-8 w-8 border-2 border-card">
                  <AvatarImage src={friend.avatar || "/placeholder.svg"} alt={friend.name} />
                  <AvatarFallback>{friend.name[0]}</AvatarFallback>
                </Avatar>
              ))}
              {remainingCount > 0 && (
                <div className="h-8 w-8 rounded-full border-2 border-card bg-secondary flex items-center justify-center">
                  <span className="text-xs font-medium text-muted-foreground">+{remainingCount}</span>
                </div>
              )}
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">
                {displayedFriends.map((f) => f.name).join(", ")}
                {remainingCount > 0 && ` and ${remainingCount} more`}
              </p>
            </div>
          </div>
        </div>

        {social.matchReason && <p className="text-xs text-muted-foreground italic mb-4">{social.matchReason}</p>}

        <div className="flex items-center gap-2">
          <Button size="sm" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
            <Check className="mr-2 h-4 w-4" />
            I'm Going Too
          </Button>
          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
            View Event
          </Button>
        </div>
      </div>
    </div>
  )
}
