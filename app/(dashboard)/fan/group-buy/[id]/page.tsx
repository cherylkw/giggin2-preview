"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  Users,
  Clock,
  Copy,
  Check,
  Share2,
  LogOut,
  Calendar,
  MapPin,
  Ticket,
  AlertCircle,
  PartyPopper,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { SocialChat, type ChatMessage } from "@/components/social/social-chat"
import { FairAccessStrip } from "@/components/fair-access/fair-access-strip"
import { mockGroupBuys, mockGroupBuyChat } from "@/lib/mock-data"

export default function GroupBuyRoomPage() {
  const params = useParams()
  const groupBuyId = params.id as string

  const groupBuy = mockGroupBuys.find((gb) => gb.id === groupBuyId) || mockGroupBuys[0]
  const initialMessages = mockGroupBuyChat
    .filter((m) => m.groupBuyId === groupBuyId)
    .map((m) => ({
      id: m.id,
      userId: m.userId,
      userName: m.userName,
      userAvatar: m.userAvatar,
      text: m.text,
      timestamp: m.timestamp,
    }))

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [copied, setCopied] = useState(false)
  const [timeLeft, setTimeLeft] = useState("")

  const progress = (groupBuy.currentSize / groupBuy.minSize) * 100
  const isComplete = groupBuy.currentSize >= groupBuy.minSize
  const savings = groupBuy.originalPrice - groupBuy.groupPrice
  const totalSavings = savings * groupBuy.currentSize

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date()
      const expires = new Date(groupBuy.expiresAt)
      const diff = expires.getTime() - now.getTime()

      if (diff <= 0) {
        setTimeLeft("Expired")
        return
      }

      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      setTimeLeft(`${hours}h ${minutes}m`)
    }

    updateTimer()
    const interval = setInterval(updateTimer, 60000)
    return () => clearInterval(interval)
  }, [groupBuy.expiresAt])

  const handleCopyCode = () => {
    navigator.clipboard.writeText(groupBuy.joinCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSendMessage = (text: string) => {
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      userId: "currentUser",
      userName: "You",
      userAvatar: "/user-avatar.jpg",
      text,
      timestamp: new Date().toISOString(),
    }
    setMessages([...messages, newMessage])
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/fan/ticketing">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Group Buy Room</h1>
          <p className="text-muted-foreground">Save together on tickets</p>
        </div>
      </div>

      <FairAccessStrip maxTicketsPerFan={4} verifiedOnly={true} />

      {/* Event Banner */}
      <Card className="overflow-hidden">
        <div className="relative h-32 md:h-40">
          <Image
            src={groupBuy.eventImage || "/placeholder.svg"}
            alt={groupBuy.eventName}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="text-xl font-bold text-foreground">{groupBuy.eventName}</h2>
            <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(groupBuy.eventDate).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {groupBuy.eventVenue}
              </span>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                {groupBuy.ticketTier}
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* ... rest of existing code remains unchanged ... */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress Card */}
          <Card className={isComplete ? "border-green-500/50 bg-green-500/5" : "border-primary/30"}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Group Progress
                </CardTitle>
                {isComplete ? (
                  <Badge className="bg-green-500/20 text-green-400">
                    <Check className="mr-1 h-3 w-3" />
                    Ready to checkout
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-amber-400 border-amber-400/30">
                    <Clock className="mr-1 h-3 w-3" />
                    {timeLeft} left
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Members joined</span>
                  <span className="text-foreground font-medium">
                    {groupBuy.currentSize} / {groupBuy.minSize} minimum
                  </span>
                </div>
                <Progress value={Math.min(progress, 100)} className="h-3" />
                <p className="text-xs text-muted-foreground">
                  {isComplete
                    ? `Group complete! Can add up to ${groupBuy.maxSize - groupBuy.currentSize} more members.`
                    : `Need ${groupBuy.minSize - groupBuy.currentSize} more to unlock group pricing.`}
                </p>
              </div>

              {/* Members List */}
              <div className="pt-4 border-t border-border">
                <h4 className="text-sm font-medium text-foreground mb-3">Members</h4>
                <div className="flex flex-wrap gap-3">
                  {groupBuy.members.map((member) => (
                    <Link key={member.id} href={`/fan/profile/${member.id}`}>
                      <div className="flex items-center gap-2 p-2 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer">
                        <Image
                          src={member.avatar || "/placeholder.svg"}
                          alt={member.name}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                        <div>
                          <p className="text-sm font-medium text-foreground">{member.name}</p>
                          {member.isCreator && <p className="text-xs text-primary">Organizer</p>}
                        </div>
                      </div>
                    </Link>
                  ))}
                  {/* Empty slots */}
                  {Array.from({ length: groupBuy.minSize - groupBuy.currentSize }).map((_, i) => (
                    <div
                      key={`empty-${i}`}
                      className="flex items-center gap-2 p-2 rounded-lg border-2 border-dashed border-border"
                    >
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                        <Users className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground">Waiting...</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Group Chat */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Group Chat</CardTitle>
            </CardHeader>
            <CardContent>
              <SocialChat
                messages={messages}
                onSendMessage={handleSendMessage}
                placeholder="Message your group..."
                showAddFriend={true}
                maxHeight="300px"
                emptyMessage="Start chatting with your group!"
              />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pricing Card */}
          <Card className="border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Ticket className="h-5 w-5 text-primary" />
                Pricing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Original price</span>
                  <span className="text-muted-foreground line-through">${groupBuy.originalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground font-medium">Group price</span>
                  <span className="text-2xl font-bold text-primary">${groupBuy.groupPrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-green-400">You save</span>
                  <span className="text-green-400 font-medium">${savings} per ticket</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="text-sm text-green-400 text-center">
                  <PartyPopper className="inline h-4 w-4 mr-1" />
                  Group saving ${totalSavings} total!
                </p>
              </div>

              <Button className="w-full bg-primary text-primary-foreground" size="lg" disabled={!isComplete}>
                {isComplete ? "Checkout Now" : "Waiting for members..."}
              </Button>

              {!isComplete && (
                <p className="text-xs text-muted-foreground text-center">
                  <AlertCircle className="inline h-3 w-3 mr-1" />
                  Your card will only be charged once the group completes.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Invite Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Invite Friends</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 rounded-lg bg-secondary border border-border">
                <p className="text-xs text-muted-foreground mb-1">Join Code</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-mono font-bold text-foreground">{groupBuy.joinCode}</span>
                  <Button variant="ghost" size="sm" onClick={handleCopyCode}>
                    {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button variant="outline" className="w-full bg-transparent">
                <Share2 className="mr-2 h-4 w-4" />
                Share Invite Link
              </Button>
            </CardContent>
          </Card>

          {/* Rules Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Group Buy Rules</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Minimum {groupBuy.minSize} people required
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Maximum {groupBuy.maxSize} people allowed
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  24 hours to complete the group
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Auto-refund if group fails to complete
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Leave Button */}
          <Button
            variant="outline"
            className="w-full bg-transparent text-red-400 border-red-400/30 hover:bg-red-400/10"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Leave Group
          </Button>
        </div>
      </div>
    </div>
  )
}
