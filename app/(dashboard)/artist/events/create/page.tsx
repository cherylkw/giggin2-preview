"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Upload,
  DollarSign,
  PartyPopper,
  MapPinIcon,
  UsersIcon,
  PlusIcon,
  Trash2Icon,
  CheckIcon,
  ChevronRightIcon,
  MusicIcon,
  BuildingIcon,
  TheaterIcon,
  ZapIcon,
  FileTextIcon,
  EyeIcon,
  Share2Icon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { AIBadge } from "@/components/ui/ai-badge"
import { FairAccessPanel } from "@/components/fair-access/fair-access-panel"
import { useRouter } from "next/navigation"
import { Slider } from "@/components/ui/slider"
import { NFTTicketToggle } from "@/components/ticketing/nft-ticket-toggle"

const wizardSteps = [
  { id: 1, name: "Event Details" },
  { id: 2, name: "Venue & Schedule" },
  { id: 3, name: "Tickets & Pricing" },
  { id: 4, name: "Review & Publish" },
]

const eventTypesOptions = [
  { value: "concert", label: "Concert" },
  { value: "festival", label: "Festival" },
  { value: "club_night", label: "Club Night" },
  { value: "acoustic", label: "Acoustic Set" },
  { value: "album_release", label: "Album Release" },
]

const genresList = ["Electronic", "Jazz", "Rock", "Pop", "Hip-Hop", "R&B", "Classical", "Folk", "Metal", "Indie"]

const venueLayouts = [
  {
    id: "stadium",
    name: "Stadium",
    description: "Multi-ring sections: Floor, Lower Bowl, Upper Bowl",
    icon: BuildingIcon,
    capacity: "10,000+",
  },
  {
    id: "club",
    name: "Club",
    description: "Small stage, standing area, VIP tables",
    icon: MusicIcon,
    capacity: "500-2,000",
  },
  {
    id: "theater",
    name: "Theater",
    description: "Orchestra, Mezzanine, and Balcony seating",
    icon: TheaterIcon,
    capacity: "1,000-5,000",
  },
  {
    id: "ga",
    name: "General Admission",
    description: "Open floor, no assigned seating",
    icon: UsersIcon,
    capacity: "Any",
  },
]

const settlementMethodsOptions = [
  { id: "stripe", name: "Stripe (USD)", description: "Fiat payments via card", fee: "2.9% + $0.30" },
  { id: "usdc", name: "USDC (Stablecoin)", description: "On-chain settlement", fee: "1.5% flat" },
  { id: "hybrid", name: "Hybrid", description: "Accept both methods", fee: "Variable" },
]

interface TicketTier {
  id: string
  name: string
  description: string
  price: number
  quantity: number
  earlyBird: boolean
  earlyBirdPrice: number
  earlyBirdCutoff: string
}

interface Participant {
  id: string
  name: string
  role: string
  percentage: number
}

export default function CreateEventPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isPublished, setIsPublished] = useState(false)
  const [createdEventId, setCreatedEventId] = useState<string | null>(null)

  // Event Details State
  const [eventTitle, setEventTitle] = useState("")
  const [eventSubtitle, setEventSubtitle] = useState("")
  const [primaryArtist, setPrimaryArtist] = useState("")
  const [lineup, setLineup] = useState<string[]>([])
  const [newArtist, setNewArtist] = useState("")
  const [genre, setGenre] = useState("")
  const [eventType, setEventType] = useState("concert")
  const [shortDescription, setShortDescription] = useState("")
  const [fullDescription, setFullDescription] = useState("")
  const [showOnStage, setShowOnStage] = useState(true)
  const [enableMoments, setEnableMoments] = useState(true)

  // Venue & Schedule State
  const [eventDate, setEventDate] = useState("")
  const [eventTime, setEventTime] = useState("")
  const [timezone, setTimezone] = useState("America/New_York")
  const [venueName, setVenueName] = useState("")
  const [venueAddress, setVenueAddress] = useState("")
  const [venueCity, setVenueCity] = useState("")
  const [venueCapacity, setVenueCapacity] = useState("")
  const [seatMapType, setSeatMapType] = useState<"stadium" | "club" | "theater" | "ga">("ga")

  // Tickets State
  const [ticketTiers, setTicketTiers] = useState<TicketTier[]>([
    {
      id: "1",
      name: "General Admission",
      price: 0,
      quantity: 0,
      description: "",
      earlyBird: false,
      earlyBirdPrice: 0,
      earlyBirdCutoff: "",
    },
  ])
  const [settlementMethod, setSettlementMethod] = useState("stripe")
  const [participants, setParticipants] = useState<Participant[]>([
    { id: "1", name: "Primary Artist", role: "Artist", percentage: 60 },
    { id: "2", name: "Venue", role: "Venue", percentage: 30 },
    { id: "3", name: "Giggin' Fee", role: "Other", percentage: 10 },
  ])
  const [enableNFT, setEnableNFT] = useState(false)

  const [fairAccessSettings, setFairAccessSettings] = useState({
    maxTicketsPerFan: 4,
    requireVerifiedEmail: true,
    requireVerifiedPhone: true,
    requireBasicProfile: false,
    enableGroupBuy: false,
    maxActiveGroupBuys: 1,
    groupBuyVerifiedOnly: true,
    prioritizeLocalFans: false,
    localRadius: 25,
    releaseInWaves: false,
    wave1Percent: 40,
    wave2Percent: 40,
  })

  const steps = [
    { id: 1, name: "Event Details", icon: MusicIcon },
    { id: 2, name: "Venue & Schedule", icon: MapPinIcon },
    { id: 3, name: "Tickets & Pricing", icon: DollarSign },
    { id: 4, name: "Review & Publish", icon: FileTextIcon },
  ]

  const totalPercentage = participants.reduce((acc, p) => acc + p.percentage, 0)

  const addTicketTier = () => {
    setTicketTiers([
      ...ticketTiers,
      {
        id: String(Date.now()),
        name: "",
        description: "",
        price: 0,
        quantity: 0,
        earlyBird: false,
        earlyBirdPrice: 0,
        earlyBirdCutoff: "",
      },
    ])
  }

  const removeTicketTier = (id: string) => {
    if (ticketTiers.length > 1) {
      setTicketTiers(ticketTiers.filter((t) => t.id !== id))
    }
  }

  const updateTicketTier = (id: string, field: keyof TicketTier, value: string | number | boolean) => {
    setTicketTiers(ticketTiers.map((t) => (t.id === id ? { ...t, [field]: value } : t)))
  }

  const addParticipant = () => {
    setParticipants([...participants, { id: String(Date.now()), name: "", role: "Other", percentage: 0 }])
  }

  const removeParticipant = (id: string) => {
    if (participants.length > 1) {
      setParticipants(participants.filter((p) => p.id !== id))
    }
  }

  const updateParticipant = (id: string, field: keyof Participant, value: string | number) => {
    setParticipants(participants.map((p) => (p.id === id ? { ...p, [field]: value } : p)))
  }

  const handlePublish = () => {
    // Simulate creating the event
    const newEventId = String(Date.now())
    setCreatedEventId(newEventId)
    setIsPublished(true)
  }

  // Calculate price range for summary
  const priceRange =
    ticketTiers.length > 0
      ? {
          min: Math.min(...ticketTiers.map((t) => (t.earlyBird ? t.earlyBirdPrice : t.price))),
          max: Math.max(...ticketTiers.map((t) => t.price)),
        }
      : { min: 0, max: 0 }

  const totalTickets = ticketTiers.reduce((acc, t) => acc + t.quantity, 0)

  const addLineupArtist = () => {
    if (newArtist.trim()) {
      setLineup([...lineup, newArtist.trim()])
      setNewArtist("")
    }
  }

  const removeLineupArtist = (index: number) => {
    setLineup(lineup.filter((_, i) => i !== index))
  }

  // Published confirmation screen
  if (isPublished) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center max-w-lg">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20">
            <PartyPopper className="h-10 w-10 text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Event Published!</h1>
          <p className="text-muted-foreground mb-8">
            Your event &quot;{eventTitle || "Untitled Event"}&quot; is now live and visible to fans.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/fan/events/1">
              <Button variant="outline" className="w-full sm:w-auto bg-transparent">
                <EyeIcon className="mr-2 h-4 w-4" />
                View Event Page
              </Button>
            </Link>
            <Link href="/artist/ticketing">
              <Button className="w-full sm:w-auto bg-primary text-primary-foreground">
                <DollarSign className="mr-2 h-4 w-4" />
                Go to Smart Ticketing
              </Button>
            </Link>
            <Button variant="outline" className="w-full sm:w-auto bg-transparent">
              <Share2Icon className="mr-2 h-4 w-4" />
              Share to Stage & Moments
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/artist/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Create Event</h1>
          <p className="text-muted-foreground">Set up your next show with AI-powered tools</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <button
              onClick={() => setCurrentStep(step.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentStep === step.id
                  ? "bg-primary/20 text-primary"
                  : step.id < currentStep
                    ? "bg-green-500/20 text-green-400"
                    : "bg-secondary text-muted-foreground"
              }`}
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  currentStep === step.id
                    ? "bg-primary text-primary-foreground"
                    : step.id < currentStep
                      ? "bg-green-500 text-background"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {step.id < currentStep ? <CheckIcon className="h-4 w-4" /> : <step.icon className="h-4 w-4" />}
              </div>
              <span className="hidden sm:inline font-medium">{step.name}</span>
            </button>
            {index < steps.length - 1 && <ChevronRightIcon className="mx-2 h-5 w-5 text-muted-foreground" />}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="rounded-xl border border-border bg-card p-6">
        {/* STEP 1: Event Details */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Event Details</h2>
              <p className="text-muted-foreground">Tell fans about your event</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Event Title *</Label>
                <Input
                  placeholder="e.g. Neon Dreams Tour"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Subtitle</Label>
                <Input
                  placeholder="e.g. 2025 World Tour"
                  value={eventSubtitle}
                  onChange={(e) => setEventSubtitle(e.target.value)}
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Primary Artist *</Label>
                <Input
                  placeholder="Your artist/band name"
                  value={primaryArtist}
                  onChange={(e) => setPrimaryArtist(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Genre *</Label>
                <select
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  className="w-full rounded-md border border-border bg-card px-3 py-2 text-foreground"
                >
                  <option value="">Select genre</option>
                  {genresList.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Lineup Builder */}
            <div className="space-y-3">
              <Label>Supporting Lineup</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add artist name"
                  value={newArtist}
                  onChange={(e) => setNewArtist(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addLineupArtist()}
                />
                <Button onClick={addLineupArtist} variant="outline">
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </div>
              {lineup.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {lineup.map((artist, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm"
                    >
                      {artist}
                      <button onClick={() => removeLineupArtist(index)} className="hover:text-destructive">
                        <Trash2Icon className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Event Type</Label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full rounded-md border border-border bg-card px-3 py-2 text-foreground"
              >
                {eventTypesOptions.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Hero Image */}
            <div className="space-y-2">
              <Label>Hero Image</Label>
              <div className="flex h-48 items-center justify-center rounded-xl border-2 border-dashed border-border bg-secondary/50 hover:border-primary/50 transition-colors cursor-pointer">
                <div className="text-center">
                  <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">Drag & drop or click to upload</p>
                  <p className="text-xs text-muted-foreground">Recommended: 1920x1080 px</p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Short Description</Label>
                <Input
                  placeholder="One-line hook for listings"
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Full Description</Label>
                <Textarea
                  placeholder="Detailed event description..."
                  value={fullDescription}
                  onChange={(e) => setFullDescription(e.target.value)}
                  rows={3}
                />
              </div>
            </div>

            {/* Toggles */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <Switch checked={showOnStage} onCheckedChange={setShowOnStage} />
                <Label className="text-sm">Show on Stage (Artist Directory)</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={enableMoments} onCheckedChange={setEnableMoments} />
                <Label className="text-sm">Enable Moments (Fan content)</Label>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                onClick={() => setCurrentStep(2)}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Continue to Venue & Schedule
                <ChevronRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: Venue & Schedule */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Venue & Schedule</h2>
              <p className="text-muted-foreground">Set date, time, and location details</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <Label>Event Date *</Label>
                <Input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Start Time *</Label>
                <Input type="time" value={eventTime} onChange={(e) => setEventTime(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Timezone</Label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full rounded-md border border-border bg-card px-3 py-2 text-foreground"
                >
                  <option value="America/New_York">Eastern (ET)</option>
                  <option value="America/Chicago">Central (CT)</option>
                  <option value="America/Denver">Mountain (MT)</option>
                  <option value="America/Los_Angeles">Pacific (PT)</option>
                </select>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Venue Name *</Label>
                <Input placeholder="e.g. The Anthem" value={venueName} onChange={(e) => setVenueName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Venue Capacity</Label>
                <Input
                  type="number"
                  placeholder="e.g. 5000"
                  value={venueCapacity}
                  onChange={(e) => setVenueCapacity(e.target.value)}
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Venue Address</Label>
                <Input
                  placeholder="Street address"
                  value={venueAddress}
                  onChange={(e) => setVenueAddress(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>City *</Label>
                <Input
                  placeholder="e.g. Washington, DC"
                  value={venueCity}
                  onChange={(e) => setVenueCity(e.target.value)}
                />
              </div>
            </div>

            {/* Seat Map Type */}
            <div className="space-y-3">
              <Label>Seat Map Type</Label>
              <div className="grid gap-4 md:grid-cols-4">
                {[
                  { id: "ga", name: "General Admission", icon: UsersIcon, desc: "Standing room, no assigned seats" },
                  { id: "stadium", name: "Stadium", icon: BuildingIcon, desc: "Multi-tier bowl seating" },
                  { id: "club", name: "Club", icon: MusicIcon, desc: "Standing + VIP tables" },
                  { id: "theater", name: "Theater", icon: TheaterIcon, desc: "Orchestra, Mezzanine, Balcony" },
                ].map((layout) => (
                  <button
                    key={layout.id}
                    onClick={() => setSeatMapType(layout.id as any)}
                    className={`rounded-xl border-2 p-4 text-left transition-all ${
                      seatMapType === layout.id
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <layout.icon
                      className={`h-6 w-6 mb-2 ${seatMapType === layout.id ? "text-primary" : "text-muted-foreground"}`}
                    />
                    <p className="font-medium text-foreground">{layout.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{layout.desc}</p>
                  </button>
                ))}
              </div>
              {seatMapType !== "ga" && (
                <div className="mt-4 p-4 rounded-lg border border-primary/30 bg-primary/5">
                  <p className="text-sm text-muted-foreground">
                    Visual seat map preview will be available in the Smart Ticketing dashboard after publishing.
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(1)}>
                Back
              </Button>
              <Button
                onClick={() => setCurrentStep(3)}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Continue to Tickets & Pricing
                <ChevronRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: Tickets & Pricing */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Tickets & Pricing</h2>
              <p className="text-muted-foreground">Set up ticket tiers and pricing strategy</p>
            </div>

            {/* Ticket Tiers */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Ticket Tiers</h3>
                <Button onClick={addTicketTier} variant="outline" size="sm">
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Add Tier
                </Button>
              </div>

              {ticketTiers.map((tier, index) => (
                <div key={tier.id} className="rounded-xl border border-border bg-secondary/50 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-foreground">Tier {index + 1}</h4>
                    {ticketTiers.length > 1 && (
                      <Button
                        onClick={() => removeTicketTier(tier.id)}
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2Icon className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-2">
                      <Label>Tier Name *</Label>
                      <Input
                        placeholder="e.g. General Admission"
                        value={tier.name}
                        onChange={(e) => updateTicketTier(tier.id, "name", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Price (USD) *</Label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={tier.price || ""}
                        onChange={(e) => updateTicketTier(tier.id, "price", Number(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Available Quantity *</Label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={tier.quantity || ""}
                        onChange={(e) => updateTicketTier(tier.id, "quantity", Number(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Input
                        placeholder="e.g. Front section access..."
                        value={tier.description}
                        onChange={(e) => updateTicketTier(tier.id, "description", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Early Bird */}
                  <div className="mt-4 flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={tier.earlyBird}
                        onCheckedChange={(checked) => updateTicketTier(tier.id, "earlyBird", checked)}
                      />
                      <Label className="text-sm">Early Bird Pricing</Label>
                    </div>
                    {tier.earlyBird && (
                      <>
                        <div className="flex items-center gap-2">
                          <Label className="text-sm">Price:</Label>
                          <Input
                            type="number"
                            className="w-24"
                            value={tier.earlyBirdPrice || ""}
                            onChange={(e) => updateTicketTier(tier.id, "earlyBirdPrice", Number(e.target.value))}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Label className="text-sm">Until:</Label>
                          <Input
                            type="date"
                            className="w-auto"
                            value={tier.earlyBirdCutoff}
                            onChange={(e) => updateTicketTier(tier.id, "earlyBirdCutoff", e.target.value)}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* AI Pricing Insights */}
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
              <div className="flex items-center gap-2 mb-4">
                <ZapIcon className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground">AI Pricing Insights</h3>
                <AIBadge text="Dynamic Pricing" />
              </div>

              {/* Mini Chart */}
              <div className="rounded-lg border border-border bg-card p-4 mb-4">
                <p className="text-sm text-muted-foreground mb-2">Demand vs Price (Simulated)</p>
                <div className="h-20 flex items-end gap-1">
                  {[85, 78, 70, 62, 55, 48, 40, 35].map((h, i) => (
                    <div key={i} className="flex-1 rounded-t bg-primary/60" style={{ height: `${h}%` }} />
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>$30</span>
                  <span>$150</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-3">
                Based on similar events and market demand, we recommend pricing GA tickets between{" "}
                <span className="text-primary font-medium">$45 - $75</span> for optimal revenue.
              </p>

              <Button variant="outline" size="sm">
                <ZapIcon className="mr-2 h-4 w-4" />
                Run AI Optimization
              </Button>
            </div>

            <FairAccessPanel settings={fairAccessSettings} onSettingsChange={setFairAccessSettings} />

            {/* NFT Ticket Toggle */}
            <NFTTicketToggle mode="creator" enabled={enableNFT} onEnabledChange={setEnableNFT} />

            {/* Settlement & Splits */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Payout & Splits</h3>

              {/* Settlement Method */}
              <div className="space-y-3">
                <Label>Settlement Method</Label>
                <div className="grid gap-4 md:grid-cols-3">
                  {settlementMethodsOptions.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSettlementMethod(method.id)}
                      className={`rounded-xl border-2 p-4 text-left transition-all ${
                        settlementMethod === method.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <h4 className="font-semibold text-foreground">{method.name}</h4>
                      <p className="mt-1 text-sm text-muted-foreground">{method.description}</p>
                      <p className="mt-2 text-xs text-primary">Fee: {method.fee}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Revenue Split Builder */}
              <div className="rounded-xl border border-border bg-secondary/50 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-foreground">Revenue Split</h4>
                  <Button onClick={addParticipant} variant="outline" size="sm">
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Add Participant
                  </Button>
                </div>

                <div className="space-y-4">
                  {participants.map((participant) => (
                    <div key={participant.id} className="flex items-center gap-4">
                      <Input
                        placeholder="Name"
                        value={participant.name}
                        onChange={(e) => updateParticipant(participant.id, "name", e.target.value)}
                        className="flex-1"
                      />
                      <select
                        value={participant.role}
                        onChange={(e) => updateParticipant(participant.id, "role", e.target.value)}
                        className="rounded-md border border-border bg-card px-3 py-2 text-foreground"
                      >
                        <option value="Artist">Artist</option>
                        <option value="Venue">Venue</option>
                        <option value="Promoter">Promoter</option>
                        <option value="Manager">Manager</option>
                        <option value="Other">Other</option>
                      </select>
                      <div className="flex items-center gap-2 w-32">
                        <Slider
                          value={[participant.percentage]}
                          onValueChange={(val) => updateParticipant(participant.id, "percentage", val[0])}
                          min={0}
                          max={100}
                          step={1}
                          className="flex-1"
                        />
                        <span className="text-sm font-medium text-foreground w-12 text-right">
                          {participant.percentage}%
                        </span>
                      </div>
                      {participants.length > 1 && (
                        <Button
                          onClick={() => removeParticipant(participant.id)}
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2Icon className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Smart Contract Preview */}
                <div className="mt-6 p-4 rounded-lg border border-primary/30 bg-primary/5">
                  <p className="text-sm font-medium text-foreground mb-2">Smart Contract Preview</p>
                  <p className="text-xs text-muted-foreground">
                    Revenue will be automatically split according to the percentages above. Settlement via{" "}
                    {settlementMethod === "stripe"
                      ? "Stripe (USD)"
                      : settlementMethod === "usdc"
                        ? "USDC on-chain"
                        : "Hybrid (USD + USDC)"}
                    .
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(2)}>
                Back
              </Button>
              <Button
                onClick={() => setCurrentStep(4)}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Continue to Review
                <ChevronRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 4: Review & Publish */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Review & Publish</h2>
              <p className="text-muted-foreground">Verify all details before going live</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Left Column - Event Details */}
              <div className="space-y-4">
                <div className="rounded-xl border border-border bg-secondary/50 p-4">
                  <h3 className="font-semibold text-foreground mb-3">Event Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Title</span>
                      <span className="text-foreground">{eventTitle || "Not set"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Artist</span>
                      <span className="text-foreground">{primaryArtist || "Not set"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Genre</span>
                      <span className="text-foreground">{genre || "Not set"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type</span>
                      <span className="text-foreground capitalize">{eventType.replace("_", " ")}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-secondary/50 p-4">
                  <h3 className="font-semibold text-foreground mb-3">Venue & Schedule</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date</span>
                      <span className="text-foreground">{eventDate || "Not set"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time</span>
                      <span className="text-foreground">{eventTime || "Not set"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Venue</span>
                      <span className="text-foreground">{venueName || "Not set"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">City</span>
                      <span className="text-foreground">{venueCity || "Not set"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Layout</span>
                      <span className="text-foreground capitalize">{seatMapType}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Tickets & Settings */}
              <div className="space-y-4">
                <div className="rounded-xl border border-border bg-secondary/50 p-4">
                  <h3 className="font-semibold text-foreground mb-3">Ticket Tiers</h3>
                  <div className="space-y-2">
                    {ticketTiers.map((tier, index) => (
                      <div key={tier.id} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{tier.name || `Tier ${index + 1}`}</span>
                        <span className="text-foreground">
                          ${tier.price} × {tier.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-secondary/50 p-4">
                  <h3 className="font-semibold text-foreground mb-3">Revenue Split</h3>
                  <div className="space-y-2">
                    {participants.map((p) => (
                      <div key={p.id} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {p.name} ({p.role})
                        </span>
                        <span className="text-foreground">{p.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-primary" />
                    Fair Access Enabled
                  </h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>• Max {fairAccessSettings.maxTicketsPerFan} tickets per fan</p>
                    {fairAccessSettings.requireVerifiedEmail && <p>• Verified email required</p>}
                    {fairAccessSettings.requireVerifiedPhone && <p>• Verified phone required</p>}
                    {fairAccessSettings.enableGroupBuy && <p>• Group Buy enabled (verified only)</p>}
                    {fairAccessSettings.releaseInWaves && (
                      <p>
                        • Wave release ({fairAccessSettings.wave1Percent}% / {fairAccessSettings.wave2Percent}%)
                      </p>
                    )}
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-secondary/50 p-4">
                  <h3 className="font-semibold text-foreground mb-3">Settings</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Settlement</span>
                      <span className="text-foreground capitalize">{settlementMethod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">NFT Ticket</span>
                      <span className="text-foreground">{enableNFT ? "Enabled" : "Disabled"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Show on Stage</span>
                      <span className="text-foreground">{showOnStage ? "Yes" : "No"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Moments</span>
                      <span className="text-foreground">{enableMoments ? "Enabled" : "Disabled"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(3)}>
                Back
              </Button>
              <Button
                onClick={handlePublish}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                size="lg"
              >
                <PartyPopper className="mr-2 h-5 w-5" />
                Publish Event
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
