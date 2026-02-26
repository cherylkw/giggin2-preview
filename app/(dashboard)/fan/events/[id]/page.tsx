"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { mockEvents, mockArtists, mockMoments, mockEventAttendees } from "@/lib/mock-data"
import { AIBadge } from "@/components/ui/ai-badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ToolCallPanel } from "@/components/ui/tool-call-panel"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  Users,
  TrendingUp,
  Ticket,
  Music,
  Share2,
  Heart,
  Info,
  Camera,
  MessageCircle,
  UserPlus,
  CreditCard,
  Smartphone,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { EventChat } from "@/components/social/event-chat"
import { usePreserveCode } from "@/hooks/use-preserve-code"

export default function EventDetailPage() {
  const params = useParams()
  const withCode = usePreserveCode()
  const [ticketModalOpen, setTicketModalOpen] = useState(false)
  const event = mockEvents.find((e) => e.id === params.id) || mockEvents[0]
  const relatedArtist = mockArtists.find((a) => a.name === event.artist)
  const eventMoments = mockMoments.filter((m) => m.eventId === event.id)
  const attendeesData = mockEventAttendees.find((a) => a.eventId === event.id)
  const attendees = attendeesData?.attendees || []

  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  const demandLevel = event.demand >= 85 ? "High" : event.demand >= 60 ? "Moderate" : "Low"
  const demandColor = event.demand >= 85 ? "text-red-400" : event.demand >= 60 ? "text-amber-400" : "text-emerald-400"

  const demandToolCalls = [
    {
      tool: "mcp.demand_forecast",
      status: "completed" as const,
      duration: "178ms",
      result: "Projected 87% sellout probability",
    },
    {
      tool: "mcp.price_optimizer",
      status: "completed" as const,
      duration: "134ms",
      result: "Current prices within optimal range",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Back button */}
      <div className="flex items-center gap-4">
        <Link href={withCode("/fan/ask")}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <span className="text-muted-foreground">Back to Ask Giggin&apos;</span>
      </div>

      {/* Hero Image */}
      <div className="relative h-48 rounded-2xl overflow-hidden border border-border sm:h-64 md:h-80">
        <Image
          src={event.image || "/placeholder.svg?height=400&width=800&query=concert venue stage"}
          alt={event.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
          <Badge className="mb-2 bg-primary/90 text-primary-foreground sm:mb-3">{event.genre}</Badge>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl md:text-4xl text-balance">{event.name}</h1>
          <p className="mt-1 text-base text-muted-foreground sm:mt-2 sm:text-lg">{event.artist}</p>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <Button variant="outline" size="icon" className="bg-card/80 backdrop-blur-sm">
            <Heart className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="bg-card/80 backdrop-blur-sm">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Event Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                Event Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-3 text-foreground">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">{formattedDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-foreground">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Doors Open</p>
                    <p className="font-medium">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-foreground">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                    <MapPin className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Venue</p>
                    <p className="font-medium">{event.venue}</p>
                    <p className="text-sm text-muted-foreground">{event.city}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-foreground">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                    <Users className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Capacity</p>
                    <p className="font-medium">{event.attendance.capacity.toLocaleString()} people</p>
                    <p className="text-sm text-muted-foreground">
                      {event.attendance.projected.toLocaleString()} projected
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Who's Attending */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Who&apos;s Attending
                </CardTitle>
                <Badge variant="outline">{attendees.length} going</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
                {attendees.map((attendee) => (
                  <div key={attendee.id} className="shrink-0">
                    <div className="relative group">
                      <Image
                        src={attendee.avatar || "/placeholder.svg"}
                        alt={attendee.name}
                        width={56}
                        height={56}
                        className="rounded-full border-2 border-border object-cover"
                      />
                      {attendee.isFriend && (
                        <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1">
                          <Users className="h-3 w-3 text-primary-foreground" />
                        </div>
                      )}
                      <div className="mt-1.5 text-center">
                        <span className="text-xs text-muted-foreground">
                          {attendee.name}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="shrink-0 flex h-14 w-14 items-center justify-center rounded-full border-2 border-dashed border-border bg-secondary/30 cursor-pointer hover:border-primary/50 transition-colors">
                  <UserPlus className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              {attendees.filter((a) => a.isFriend).length > 0 && (
                <p className="text-sm text-muted-foreground mt-4">
                  {attendees.filter((a) => a.isFriend).length} of your friends are going
                </p>
              )}
            </CardContent>
          </Card>

          {/* About */}
          <Card>
            <CardHeader>
              <CardTitle>About This Event</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Experience an unforgettable night as {event.artist} takes the stage at {event.venue}. This{" "}
                {event.genre.toLowerCase()} showcase promises an immersive journey through sound and light, featuring
                cutting-edge production design and an intimate connection with the audience. Join thousands of fans for
                a night that will resonate long after the final note fades.
              </p>
            </CardContent>
          </Card>

          <EventChat eventId={event.id} />

          {/* Moments from This Show */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5 text-primary" />
                  Moments from This Show
                </CardTitle>
                <Button variant="outline" size="sm" className="bg-transparent cursor-default opacity-60" disabled>
                  View All Moments
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {eventMoments.length > 0 ? (
                <>
                  <div className="flex gap-3 overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide">
                    {eventMoments.map((moment) => (
                      <div key={moment.id} className="shrink-0">
                        <div className="relative w-32 h-40 rounded-xl overflow-hidden border border-border">
                          <Image
                            src={moment.image || "/placeholder.svg"}
                            alt={moment.caption}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent" />
                          <div className="absolute bottom-2 left-2 right-2">
                            <p className="text-xs text-foreground font-medium truncate">{moment.userName}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span className="flex items-center gap-0.5">
                                <Heart className="h-3 w-3" /> {moment.likes}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="shrink-0 w-32 h-40 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center bg-secondary/30 cursor-pointer hover:border-primary/50 transition-colors">
                      <Camera className="h-6 w-6 text-muted-foreground mb-2" />
                      <p className="text-xs text-muted-foreground text-center px-2">Share your moment</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-2 mb-3">
                      <MessageCircle className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">Fan Comments</span>
                    </div>
                    <div className="space-y-2">
                      {eventMoments.slice(0, 2).map((moment) => (
                        <div key={moment.id} className="flex items-start gap-2">
                          <Image
                            src={moment.userAvatar || "/placeholder.svg"}
                            alt={moment.userName}
                            width={24}
                            height={24}
                            className="rounded-full"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm">
                              <span className="font-medium text-foreground">{moment.userName}</span>{" "}
                              <span className="text-muted-foreground">{moment.caption}</span>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="ghost" size="sm" className="mt-2 text-primary cursor-default opacity-60" disabled>
                      View all comments
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <Camera className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No moments shared yet</p>
                  <p className="text-sm text-muted-foreground mt-1">Be the first to share your experience!</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Lineup */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music className="h-5 w-5 text-primary" />
                Lineup
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 rounded-xl border border-primary/30 bg-primary/5 p-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/20">
                    <Music className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-foreground">{event.artist}</h4>
                      <Badge variant="outline" className="text-primary border-primary/30">
                        Headliner
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{event.genre}</p>
                    {relatedArtist && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {relatedArtist.monthlyListeners.toLocaleString()} monthly listeners
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{event.time}</p>
                    <p className="text-xs text-muted-foreground">Main Stage</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                    <Music className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">Opening Act</h4>
                    <p className="text-sm text-muted-foreground">Local Artist Showcase</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">7:00 PM</p>
                    <p className="text-xs text-muted-foreground">Main Stage</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Ticketing */}
        <div className="space-y-6">
          {/* Price & Get Tickets */}
          <Card className="border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Tickets</CardTitle>
                <AIBadge text="Smart Pricing" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Price Range</p>
                <p className="text-3xl font-bold text-foreground">
                  ${event.price.min} <span className="text-lg font-normal text-muted-foreground">-</span> $
                  {event.price.max}
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Demand Level</span>
                  <span className={`font-medium ${demandColor}`}>{demandLevel}</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${event.demand}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Low</span>
                  <span>{event.demand}% demand</span>
                  <span>High</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span>Prices may increase as demand rises</span>
              </div>

              <Button
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                size="lg"
                onClick={() => setTicketModalOpen(true)}
              >
                <Ticket className="mr-2 h-5 w-5" />
                Get Tickets
              </Button>

              <div className="pt-2">
                <ToolCallPanel calls={demandToolCalls} />
              </div>
            </CardContent>
          </Card>

          {/* AI Match */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                Your Match Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16">
                  <svg className="h-16 w-16 -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15.5" fill="none" stroke="hsl(var(--muted))" strokeWidth="3" />
                    <circle
                      cx="18"
                      cy="18"
                      r="15.5"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="3"
                      strokeDasharray={`${87} 100`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold text-foreground">87%</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">
                    Based on your Taste Graph, listening history, and concert preferences.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Buy Ticket Modal */}
      <Dialog open={ticketModalOpen} onOpenChange={setTicketModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Get Tickets - {event.name}</DialogTitle>
            <DialogDescription>
              Select your preferred payment method to proceed.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 pt-4">
            <button className="flex w-full items-center gap-4 rounded-xl border border-border bg-card p-4 text-left transition-colors hover:border-primary/50 hover:bg-primary/5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">Credit / Debit Card</p>
                <p className="text-sm text-muted-foreground">Visa, Mastercard, Amex</p>
              </div>
            </button>
            <button className="flex w-full items-center gap-4 rounded-xl border border-border bg-card p-4 text-left transition-colors hover:border-primary/50 hover:bg-primary/5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground/10">
                <Smartphone className="h-5 w-5 text-foreground" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">Apple Pay</p>
                <p className="text-sm text-muted-foreground">Pay with your Apple device</p>
              </div>
            </button>
            <button className="flex w-full items-center gap-4 rounded-xl border border-border bg-card p-4 text-left transition-colors hover:border-primary/50 hover:bg-primary/5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10">
                <svg className="h-5 w-5 text-indigo-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">Stripe</p>
                <p className="text-sm text-muted-foreground">Secure payment processing</p>
              </div>
            </button>
          </div>
          <div className="pt-4 border-t border-border mt-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Price range</span>
              <span className="font-semibold text-foreground">${event.price.min} - ${event.price.max}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              This is a demo. Payment processing is not connected.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
