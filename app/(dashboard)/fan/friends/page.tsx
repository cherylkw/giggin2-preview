"use client"

import { cn } from "@/lib/utils"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Users2, UserPlus, UserCheck, Search, Sparkles, Clock, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AIBadge } from "@/components/ui/ai-badge"
import { mockFans, mockFriendRequests, mockFriendChats } from "@/lib/mock-data"
import { FriendProfileModal } from "@/components/social/friend-profile-modal"
import { FriendChatModal } from "@/components/social/friend-chat-modal"
import type { ChatMessage } from "@/components/social/social-chat"

type TabType = "friends" | "followers" | "following" | "suggestions" | "requests"

export default function FriendsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("friends")
  const [searchQuery, setSearchQuery] = useState("")

  const [selectedFriend, setSelectedFriend] = useState<(typeof mockFans)[0] | null>(null)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showChatModal, setShowChatModal] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])

  const friends = mockFans.filter((f) => f.isFriend)
  const followers = mockFans.filter((f) => f.isFollower)
  const following = mockFans.filter((f) => f.isFollowing)
  const suggestions = mockFans.filter((f) => !f.isFriend && !f.isFollowing)
  const incomingRequests = mockFriendRequests.filter((r) => r.type === "incoming")
  const outgoingRequests = mockFriendRequests.filter((r) => r.type === "outgoing")

  const tabs = [
    { id: "friends" as TabType, label: "Friends", count: friends.length },
    { id: "followers" as TabType, label: "Followers", count: followers.length },
    { id: "following" as TabType, label: "Following", count: following.length },
    { id: "suggestions" as TabType, label: "Suggestions", count: suggestions.length },
    { id: "requests" as TabType, label: "Requests", count: mockFriendRequests.length },
  ]

  const filteredFans = (list: typeof mockFans) =>
    list.filter((fan) => fan.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleOpenProfile = (fan: (typeof mockFans)[0]) => {
    setSelectedFriend(fan)
    setShowProfileModal(true)
  }

  const handleStartChat = (fan: (typeof mockFans)[0]) => {
    setSelectedFriend(fan)
    setShowProfileModal(false)
    // Load existing chat messages
    const existingChat = mockFriendChats.find((c) => c.friendId === fan.id)
    setChatMessages(
      existingChat?.messages.map((m) => ({
        id: m.id,
        userId: m.userId,
        userName: m.userName,
        userAvatar: m.userAvatar,
        text: m.text,
        timestamp: m.timestamp,
        sharedEventId: m.sharedEventId,
        sharedEventName: m.sharedEventName,
      })) || [],
    )
    setShowChatModal(true)
  }

  const handleSendChatMessage = (text: string) => {
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      userId: "currentUser",
      userName: "You",
      userAvatar: "/user-avatar.jpg",
      text,
      timestamp: new Date().toISOString(),
    }
    setChatMessages([...chatMessages, newMessage])
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Friends</h1>
          <p className="mt-2 text-muted-foreground">Connect with fellow music fans</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-border pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              activeTab === tab.id
                ? "bg-primary/20 text-primary"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground",
            )}
          >
            {tab.label}
            <Badge variant="outline" className="text-xs">
              {tab.count}
            </Badge>
          </button>
        ))}
      </div>

      {/* Search */}
      {activeTab !== "requests" && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-border bg-secondary px-10 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      )}

      {/* Friends Tab */}
      {activeTab === "friends" && (
        <div className="space-y-3">
          {filteredFans(friends).length > 0 ? (
            filteredFans(friends).map((fan) => (
              <Card key={fan.id} className="border-border bg-card">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <button onClick={() => handleOpenProfile(fan)}>
                      <Image
                        src={fan.avatar || "/placeholder.svg"}
                        alt={fan.name}
                        width={48}
                        height={48}
                        className="rounded-full cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                      />
                    </button>
                    <div className="flex-1 min-w-0">
                      <button onClick={() => handleOpenProfile(fan)} className="text-left">
                        <h3 className="font-medium text-foreground hover:text-primary transition-colors cursor-pointer">
                          {fan.name}
                        </h3>
                      </button>
                      <p className="text-sm text-muted-foreground">{fan.location}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {fan.eventsAttended} events attended · {fan.mutualFriends} mutual friends
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="bg-transparent" onClick={() => handleStartChat(fan)}>
                      <MessageCircle className="mr-1 h-4 w-4" />
                      Message
                    </Button>
                    <Link href={`/fan/profile/${fan.id}`}>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        View Profile
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <Users2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No friends found</p>
            </div>
          )}
        </div>
      )}

      {/* Followers Tab */}
      {activeTab === "followers" && (
        <div className="space-y-3">
          {filteredFans(followers).length > 0 ? (
            filteredFans(followers).map((fan) => (
              <Card key={fan.id} className="border-border bg-card">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <button onClick={() => handleOpenProfile(fan)}>
                      <Image
                        src={fan.avatar || "/placeholder.svg"}
                        alt={fan.name}
                        width={48}
                        height={48}
                        className="rounded-full cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                      />
                    </button>
                    <div className="flex-1 min-w-0">
                      <button onClick={() => handleOpenProfile(fan)} className="text-left">
                        <h3 className="font-medium text-foreground hover:text-primary transition-colors cursor-pointer">
                          {fan.name}
                        </h3>
                      </button>
                      <p className="text-sm text-muted-foreground">{fan.location}</p>
                    </div>
                    {!fan.isFollowing ? (
                      <Button size="sm" className="bg-primary text-primary-foreground">
                        <UserPlus className="mr-1 h-4 w-4" />
                        Follow Back
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" className="bg-transparent">
                        <UserCheck className="mr-1 h-4 w-4" />
                        Following
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <Users2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No followers yet</p>
            </div>
          )}
        </div>
      )}

      {/* Following Tab */}
      {activeTab === "following" && (
        <div className="space-y-3">
          {filteredFans(following).length > 0 ? (
            filteredFans(following).map((fan) => (
              <Card key={fan.id} className="border-border bg-card">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <button onClick={() => handleOpenProfile(fan)}>
                      <Image
                        src={fan.avatar || "/placeholder.svg"}
                        alt={fan.name}
                        width={48}
                        height={48}
                        className="rounded-full cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                      />
                    </button>
                    <div className="flex-1 min-w-0">
                      <button onClick={() => handleOpenProfile(fan)} className="text-left">
                        <h3 className="font-medium text-foreground hover:text-primary transition-colors cursor-pointer">
                          {fan.name}
                        </h3>
                      </button>
                      <p className="text-sm text-muted-foreground">{fan.location}</p>
                    </div>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      <UserCheck className="mr-1 h-4 w-4" />
                      Following
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <Users2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Not following anyone yet</p>
            </div>
          )}
        </div>
      )}

      {/* Suggestions Tab */}
      {activeTab === "suggestions" && (
        <div className="space-y-6">
          <Card className="border-primary/30 bg-gradient-to-r from-primary/10 to-accent/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-foreground">Suggested Fans</h3>
                    <AIBadge text="AI-Powered" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Based on your concerts, genres, and Taste Graph activity.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            {filteredFans(suggestions).map((fan) => (
              <Card key={fan.id} className="border-border bg-card hover:border-primary/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <button onClick={() => handleOpenProfile(fan)}>
                      <Image
                        src={fan.avatar || "/placeholder.svg"}
                        alt={fan.name}
                        width={56}
                        height={56}
                        className="rounded-full cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                      />
                    </button>
                    <div className="flex-1 min-w-0">
                      <button onClick={() => handleOpenProfile(fan)} className="text-left">
                        <h3 className="font-medium text-foreground hover:text-primary transition-colors cursor-pointer">
                          {fan.name}
                        </h3>
                      </button>
                      <p className="text-sm text-muted-foreground">{fan.location}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {fan.mutualFriends} mutual friends · Likes {fan.sharedGenres.join(", ")}
                      </p>
                      <Button size="sm" className="mt-3 bg-primary text-primary-foreground">
                        <UserPlus className="mr-1 h-4 w-4" />
                        Add Friend
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Requests Tab */}
      {activeTab === "requests" && (
        <div className="space-y-6">
          {/* Incoming Requests */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Incoming Requests</h3>
            {incomingRequests.length > 0 ? (
              <div className="space-y-3">
                {incomingRequests.map((request) => (
                  <Card key={request.id} className="border-border bg-card">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <Link href={`/fan/profile/${request.userId}`}>
                          <Image
                            src={request.userAvatar || "/placeholder.svg"}
                            alt={request.userName}
                            width={48}
                            height={48}
                            className="rounded-full cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                          />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <Link href={`/fan/profile/${request.userId}`}>
                            <h3 className="font-medium text-foreground hover:text-primary transition-colors cursor-pointer">
                              {request.userName}
                            </h3>
                          </Link>
                          <p className="text-sm text-muted-foreground">
                            {request.mutualFriends} mutual friends · Likes {request.sharedGenres.join(", ")}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            <Clock className="inline h-3 w-3 mr-1" />
                            {new Date(request.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="bg-primary text-primary-foreground">
                            Accept
                          </Button>
                          <Button variant="outline" size="sm" className="bg-transparent">
                            Decline
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-border bg-card">
                <CardContent className="p-8 text-center">
                  <UserPlus className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No incoming requests</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Outgoing Requests */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Outgoing Requests</h3>
            {outgoingRequests.length > 0 ? (
              <div className="space-y-3">
                {outgoingRequests.map((request) => (
                  <Card key={request.id} className="border-border bg-card">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <Link href={`/fan/profile/${request.userId}`}>
                          <Image
                            src={request.userAvatar || "/placeholder.svg"}
                            alt={request.userName}
                            width={48}
                            height={48}
                            className="rounded-full cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                          />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <Link href={`/fan/profile/${request.userId}`}>
                            <h3 className="font-medium text-foreground hover:text-primary transition-colors cursor-pointer">
                              {request.userName}
                            </h3>
                          </Link>
                          <p className="text-xs text-muted-foreground">
                            <Clock className="inline h-3 w-3 mr-1" />
                            Sent {new Date(request.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-muted-foreground">
                          Pending
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-border bg-card">
                <CardContent className="p-8 text-center">
                  <Clock className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No outgoing requests</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}

      {selectedFriend && (
        <FriendProfileModal
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
          onStartChat={() => handleStartChat(selectedFriend)}
          friend={{
            id: selectedFriend.id,
            name: selectedFriend.name,
            avatar: selectedFriend.avatar,
            location: selectedFriend.location,
            eventsAttended: selectedFriend.eventsAttended,
            mutualFriends: selectedFriend.mutualFriends,
            sharedGenres: selectedFriend.sharedGenres,
            upcomingEvents: [
              { id: "1", name: "Neon Dreams Tour", date: "2025-01-15" },
              { id: "3", name: "Summer Vibes Festival", date: "2025-01-22" },
            ],
            recentMoments: [
              { id: "1", image: "/concert-crowd-neon-lights-phone-photo.jpg" },
              { id: "2", image: "/outdoor-festival-sunset-crowd.jpg" },
            ],
          }}
        />
      )}

      {selectedFriend && (
        <FriendChatModal
          isOpen={showChatModal}
          onClose={() => setShowChatModal(false)}
          friend={{
            id: selectedFriend.id,
            name: selectedFriend.name,
            avatar: selectedFriend.avatar,
          }}
          messages={chatMessages}
          onSendMessage={handleSendChatMessage}
        />
      )}
    </div>
  )
}
