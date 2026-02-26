"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload, Sparkles, Trash2, ExternalLink, Plus, X, Eye, ChevronRight, Ticket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"

interface TicketTier {
  id: string
  name: string
  price: number
  quantity: number
  description: string
}

interface Event {
  id: string
  name: string
  artist: string
  venue: string
  city: string
  date: string
  time: string
  genre: string
  image: string
  price: { min: number; max: number }
  attendance: { projected: number; capacity: number }
  demand?: number
}

interface EditEventClientProps {
  event: Event
  userRole: "artist" | "promoter" | "venue" // Added venue role support
}

export function EditEventClient({ event, userRole }: EditEventClientProps) {
  const router = useRouter()
  const basePath = userRole === "artist" ? "/artist" : userRole === "promoter" ? "/promoter" : "/venue"
  const [showToast, setShowToast] = useState(false)

  // Basic Info State
  const [eventName, setEventName] = useState(event.name)
  const [subtitle, setSubtitle] = useState("A night of electronic music and visual art")
  const [artistLineup, setArtistLineup] = useState(event.artist)
  const [genreTags, setGenreTags] = useState([event.genre])
  const [newTag, setNewTag] = useState("")
  const [eventStatus, setEventStatus] = useState<"draft" | "published" | "cancelled">("published")
  const [coverImage, setCoverImage] = useState(event.image)

  // Date & Time State
  const [eventDate, setEventDate] = useState(event.date)
  const [startTime, setStartTime] = useState(event.time.split(" - ")[0] || "20:00")
  const [endTime, setEndTime] = useState("23:00")
  const [timezone, setTimezone] = useState("America/New_York")

  // Location State
  const [venueName, setVenueName] = useState(event.venue)
  const [address, setAddress] = useState("123 Main Street")
  const [city, setCity] = useState(event.city)
  const [mapLink, setMapLink] = useState("")
  const [capacity, setCapacity] = useState((event.attendance?.capacity || 1000).toString())

  // Description State
  const [description, setDescription] = useState(
    "Join us for an unforgettable night of live music featuring incredible performances and immersive visuals. This event promises to be one of the highlights of the season.",
  )

  // Ticketing State
  const [ticketingType, setTicketingType] = useState<"giggin" | "external">("giggin")
  const [externalTicketUrl, setExternalTicketUrl] = useState("")
  const [showPriceRange, setShowPriceRange] = useState(true)
  const [ticketTiers, setTicketTiers] = useState<TicketTier[]>([
    { id: "1", name: "General Admission", price: event.price?.min || 50, quantity: 500, description: "Standard entry" },
    { id: "2", name: "VIP", price: event.price?.max || 150, quantity: 100, description: "Priority entry + merch" },
  ])

  const addGenreTag = () => {
    if (newTag && !genreTags.includes(newTag)) {
      setGenreTags([...genreTags, newTag])
      setNewTag("")
    }
  }

  const removeGenreTag = (tag: string) => {
    setGenreTags(genreTags.filter((t) => t !== tag))
  }

  const addTicketTier = () => {
    setTicketTiers([...ticketTiers, { id: Date.now().toString(), name: "", price: 0, quantity: 0, description: "" }])
  }

  const removeTicketTier = (id: string) => {
    setTicketTiers(ticketTiers.filter((t) => t.id !== id))
  }

  const updateTicketTier = (id: string, field: keyof TicketTier, value: string | number) => {
    setTicketTiers(ticketTiers.map((t) => (t.id === id ? { ...t, [field]: value } : t)))
  }

  const handleSave = () => {
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
    setTimeout(() => {
      router.push(`${basePath}/events`)
    }, 1000)
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this event? This action cannot be undone.")) {
      router.push(`${basePath}/dashboard`)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href={`${basePath}/events`}>
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href={`${basePath}/events`} className="hover:text-foreground">
                Events
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">Edit Event</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => router.push(`${basePath}/events`)}>
              Cancel
            </Button>
            <Button variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
            <Button onClick={handleSave} className="bg-primary text-primary-foreground">
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column - Main Form */}
          <div className="space-y-6 lg:col-span-2">
            {/* Basic Info Card */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-6 text-lg font-semibold text-foreground">Basic Info</h2>
              <div className="space-y-5">
                <div>
                  <Label htmlFor="eventName">Event Name</Label>
                  <Input
                    id="eventName"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="subtitle">Subtitle / Tagline</Label>
                  <Input
                    id="subtitle"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="mt-1.5"
                    placeholder="A night of electronic music..."
                  />
                </div>
                <div>
                  <Label htmlFor="artistLineup">Artist / Lineup</Label>
                  <Input
                    id="artistLineup"
                    value={artistLineup}
                    onChange={(e) => setArtistLineup(e.target.value)}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label>Genre Tags</Label>
                  <div className="mt-1.5 flex flex-wrap gap-2">
                    {genreTags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <button onClick={() => removeGenreTag(tag)} className="ml-1 hover:text-destructive">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    <div className="flex items-center gap-2">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && addGenreTag()}
                        placeholder="Add tag..."
                        className="h-7 w-24"
                      />
                      <Button size="sm" variant="outline" onClick={addGenreTag} className="h-7 bg-transparent">
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div>
                  <Label>Event Status</Label>
                  <div className="mt-1.5 flex gap-2">
                    {(["draft", "published", "cancelled"] as const).map((status) => (
                      <Button
                        key={status}
                        size="sm"
                        variant={eventStatus === status ? "default" : "outline"}
                        onClick={() => setEventStatus(status)}
                        className="capitalize"
                      >
                        {status}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Cover Image</Label>
                  <div className="mt-1.5 flex items-center gap-4">
                    <div className="h-24 w-40 overflow-hidden rounded-lg border border-border bg-muted">
                      <img src={coverImage || "/placeholder.svg"} alt="Cover" className="h-full w-full object-cover" />
                    </div>
                    <Button variant="outline">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload New
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Date & Time Card */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-6 text-lg font-semibold text-foreground">Date & Time</h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="eventDate">Event Date</Label>
                  <Input
                    id="eventDate"
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <select
                    id="timezone"
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-6 text-lg font-semibold text-foreground">Location</h2>
              <div className="space-y-5">
                <div>
                  <Label htmlFor="venueName">Venue Name</Label>
                  <Input
                    id="venueName"
                    value={venueName}
                    onChange={(e) => setVenueName(e.target.value)}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} className="mt-1.5" />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="capacity">Capacity</Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={capacity}
                      onChange={(e) => setCapacity(e.target.value)}
                      className="mt-1.5"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="mapLink">Map Link (optional)</Label>
                  <Input
                    id="mapLink"
                    value={mapLink}
                    onChange={(e) => setMapLink(e.target.value)}
                    className="mt-1.5"
                    placeholder="https://maps.google.com/..."
                  />
                </div>
              </div>
            </div>

            {/* Description Card */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-6 text-lg font-semibold text-foreground">Description</h2>
              <div>
                <Label htmlFor="description">Event Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1.5 min-h-[150px]"
                  placeholder="Tell fans about your event..."
                />
              </div>
            </div>

            {/* Ticketing Settings Card */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-foreground">Ticketing Settings</h2>
                <Link href={`${basePath}/events/${event.id}/ticketing`}>
                  <Button variant="outline" size="sm" className="text-primary bg-transparent">
                    <Ticket className="mr-2 h-4 w-4" />
                    Open Ticketing Dashboard
                  </Button>
                </Link>
              </div>
              <div className="space-y-6">
                <div>
                  <Label>Ticketing Type</Label>
                  <div className="mt-2 flex gap-3">
                    <Button
                      variant={ticketingType === "giggin" ? "default" : "outline"}
                      onClick={() => setTicketingType("giggin")}
                      className="flex-1"
                    >
                      Giggin' Smart Ticketing
                    </Button>
                    <Button
                      variant={ticketingType === "external" ? "default" : "outline"}
                      onClick={() => setTicketingType("external")}
                      className="flex-1"
                    >
                      External Link
                    </Button>
                  </div>
                </div>

                {ticketingType === "external" ? (
                  <div>
                    <Label htmlFor="externalUrl">External Ticket URL</Label>
                    <div className="mt-1.5 flex gap-2">
                      <Input
                        id="externalUrl"
                        value={externalTicketUrl}
                        onChange={(e) => setExternalTicketUrl(e.target.value)}
                        placeholder="https://..."
                      />
                      <Button variant="outline" size="icon">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Show Price Range on Listing</Label>
                        <p className="text-sm text-muted-foreground">Display $XX - $XX on event cards</p>
                      </div>
                      <Switch checked={showPriceRange} onCheckedChange={setShowPriceRange} />
                    </div>

                    <div>
                      <div className="mb-3 flex items-center justify-between">
                        <Label>Ticket Tiers</Label>
                        <Button size="sm" variant="outline" onClick={addTicketTier}>
                          <Plus className="mr-1 h-3 w-3" />
                          Add Tier
                        </Button>
                      </div>
                      <div className="space-y-3">
                        {ticketTiers.map((tier, index) => (
                          <div key={tier.id} className="rounded-lg border border-border bg-muted/30 p-4">
                            <div className="mb-3 flex items-center justify-between">
                              <span className="text-sm font-medium">Tier {index + 1}</span>
                              {ticketTiers.length > 1 && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => removeTicketTier(tier.id)}
                                  className="h-7 text-destructive hover:text-destructive"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                            <div className="grid gap-3 sm:grid-cols-3">
                              <Input
                                placeholder="Tier name"
                                value={tier.name}
                                onChange={(e) => updateTicketTier(tier.id, "name", e.target.value)}
                              />
                              <Input
                                type="number"
                                placeholder="Price"
                                value={tier.price || ""}
                                onChange={(e) =>
                                  updateTicketTier(tier.id, "price", Number.parseFloat(e.target.value) || 0)
                                }
                              />
                              <Input
                                type="number"
                                placeholder="Quantity"
                                value={tier.quantity || ""}
                                onChange={(e) =>
                                  updateTicketTier(tier.id, "quantity", Number.parseInt(e.target.value) || 0)
                                }
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Event Snapshot */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Event Snapshot
              </h3>
              <div className="aspect-video overflow-hidden rounded-lg border border-border bg-muted">
                <img src={coverImage || "/placeholder.svg"} alt="Preview" className="h-full w-full object-cover" />
              </div>
              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">Event Name</p>
                  <p className="font-medium">{eventName || "Untitled Event"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Artist</p>
                  <p className="font-medium">{artistLineup || "TBA"}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">When</p>
                  <p className="font-medium">
                    {eventDate
                      ? new Date(eventDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                      : "Date TBA"}{" "}
                    • {startTime || "Time TBA"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Where</p>
                  <p className="font-medium">
                    {venueName || "Venue TBA"}
                    {city && `, ${city}`}
                  </p>
                </div>
              </div>
            </div>

            {/* Analytics Preview */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Capacity</span>
                  <span className="font-medium">{capacity || "—"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Ticket Tiers</span>
                  <span className="font-medium">{ticketTiers.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Price Range</span>
                  <span className="font-medium">
                    {ticketTiers.length > 0
                      ? `$${Math.min(...ticketTiers.map((t) => t.price))} - $${Math.max(...ticketTiers.map((t) => t.price))}`
                      : "—"}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href={`${basePath}/events/${event.id}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Event Details
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-destructive hover:text-destructive bg-transparent"
                  onClick={handleDelete}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Event
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-lg border border-green-500/50 bg-green-500/10 px-6 py-4 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20">
              <Sparkles className="h-4 w-4 text-green-500" />
            </div>
            <div>
              <p className="font-medium text-green-500">Event Updated</p>
              <p className="text-sm text-muted-foreground">Your changes have been saved successfully</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
