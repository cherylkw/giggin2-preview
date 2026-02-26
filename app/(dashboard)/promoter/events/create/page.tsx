"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Upload,
  MapPinIcon,
  UsersIcon,
  PlusIcon,
  Trash2Icon,
  CheckIcon,
  ChevronRightIcon,
  MusicIcon,
  BuildingIcon,
  TheaterIcon,
  EyeIcon,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { AIBadge } from "@/components/ui/ai-badge"
import { useRouter } from "next/navigation"

const wizardSteps = [
  { id: 1, name: "Event Details" },
  { id: 2, name: "Venue & Schedule" },
  { id: 3, name: "Tickets & Pricing" },
  { id: 4, name: "Review & Publish" },
]

const eventTypesOptions = [
  { value: "concert", label: "Concert" },
  { value: "festival", label: "Festival" },
  { value: "tour", label: "Tour Stop" },
  { value: "showcase", label: "Showcase" },
  { value: "private", label: "Private Event" },
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
    id: "theater",
    name: "Theater",
    description: "Orchestra, Mezzanine, and Balcony seating",
    icon: TheaterIcon,
    capacity: "1,000-5,000",
  },
  {
    id: "club",
    name: "Club",
    description: "Small stage, standing area, VIP tables",
    icon: MusicIcon,
    capacity: "500-2,000",
  },
  {
    id: "ga",
    name: "General Admission",
    description: "Open floor, no assigned seating",
    icon: UsersIcon,
    capacity: "Any",
  },
]

interface TicketTier {
  id: string
  name: string
  description: string
  price: number
  quantity: number
}

export default function PromoterCreateEventPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [eventName, setEventName] = useState("")
  const [eventType, setEventType] = useState("")
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [description, setDescription] = useState("")
  const [artistName, setArtistName] = useState("")
  const [venueName, setVenueName] = useState("")
  const [venueCity, setVenueCity] = useState("")
  const [eventDate, setEventDate] = useState("")
  const [eventTime, setEventTime] = useState("")
  const [doorsTime, setDoorsTime] = useState("")
  const [selectedLayout, setSelectedLayout] = useState("")
  const [capacity, setCapacity] = useState("")
  const [ticketTiers, setTicketTiers] = useState<TicketTier[]>([
    { id: "1", name: "General Admission", description: "Standard entry", price: 65, quantity: 1000 },
  ])
  const [enableDynamicPricing, setEnableDynamicPricing] = useState(false)

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) => (prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]))
  }

  const addTicketTier = () => {
    setTicketTiers([...ticketTiers, { id: Date.now().toString(), name: "", description: "", price: 0, quantity: 0 }])
  }

  const removeTicketTier = (id: string) => {
    setTicketTiers(ticketTiers.filter((t) => t.id !== id))
  }

  const updateTicketTier = (id: string, field: keyof TicketTier, value: string | number) => {
    setTicketTiers(ticketTiers.map((t) => (t.id === id ? { ...t, [field]: value } : t)))
  }

  const handlePublish = () => {
    router.push("/promoter/events")
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Event Name</Label>
              <Input
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="e.g., Summer Music Summit 2025"
              />
            </div>
            <div className="space-y-2">
              <Label>Headlining Artist</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={artistName}
                  onChange={(e) => setArtistName(e.target.value)}
                  placeholder="Search for artist..."
                  className="pl-10"
                />
              </div>
              <p className="text-xs text-muted-foreground">Search or enter "Various Artists" for multi-act events</p>
            </div>
            <div className="space-y-2">
              <Label>Event Type</Label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {eventTypesOptions.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setEventType(type.value)}
                    className={`rounded-lg border p-3 text-left transition-colors ${eventType === type.value ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/50"}`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Genres</Label>
              <div className="flex flex-wrap gap-2">
                {genresList.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => toggleGenre(genre)}
                    className={`rounded-full px-3 py-1.5 text-sm transition-colors ${selectedGenres.includes(genre) ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:bg-secondary/80"}`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your event..."
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label>Event Image</Label>
              <div className="flex h-32 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-border hover:border-primary/50">
                <div className="text-center">
                  <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">Click to upload or drag and drop</p>
                </div>
              </div>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Venue Name</Label>
                <div className="relative">
                  <MapPinIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={venueName}
                    onChange={(e) => setVenueName(e.target.value)}
                    placeholder="Search venue..."
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>City</Label>
                <Input value={venueCity} onChange={(e) => setVenueCity(e.target.value)} placeholder="e.g., New York" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Event Date</Label>
                <Input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Show Time</Label>
                <Input type="time" value={eventTime} onChange={(e) => setEventTime(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Doors Open</Label>
              <Input type="time" value={doorsTime} onChange={(e) => setDoorsTime(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Venue Layout</Label>
              <div className="grid gap-3 sm:grid-cols-2">
                {venueLayouts.map((layout) => (
                  <button
                    key={layout.id}
                    onClick={() => setSelectedLayout(layout.id)}
                    className={`flex items-start gap-3 rounded-lg border p-4 text-left transition-colors ${selectedLayout === layout.id ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`}
                  >
                    <layout.icon
                      className={`h-5 w-5 ${selectedLayout === layout.id ? "text-primary" : "text-muted-foreground"}`}
                    />
                    <div>
                      <p className={`font-medium ${selectedLayout === layout.id ? "text-primary" : "text-foreground"}`}>
                        {layout.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{layout.description}</p>
                      <p className="mt-1 text-xs text-muted-foreground">Capacity: {layout.capacity}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Event Capacity</Label>
              <Input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                placeholder="e.g., 5000"
              />
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Ticket Tiers</h3>
              <Button variant="outline" size="sm" onClick={addTicketTier}>
                <PlusIcon className="mr-2 h-4 w-4" />
                Add Tier
              </Button>
            </div>
            <div className="space-y-4">
              {ticketTiers.map((tier) => (
                <div key={tier.id} className="rounded-lg border border-border p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <h4 className="font-medium">Ticket Tier</h4>
                    {ticketTiers.length > 1 && (
                      <Button variant="ghost" size="sm" onClick={() => removeTicketTier(tier.id)}>
                        <Trash2Icon className="h-4 w-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Tier Name</Label>
                      <Input
                        value={tier.name}
                        onChange={(e) => updateTicketTier(tier.id, "name", e.target.value)}
                        placeholder="e.g., VIP"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Price ($)</Label>
                      <Input
                        type="number"
                        value={tier.price}
                        onChange={(e) => updateTicketTier(tier.id, "price", Number(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Quantity</Label>
                      <Input
                        type="number"
                        value={tier.quantity}
                        onChange={(e) => updateTicketTier(tier.id, "quantity", Number(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Input
                        value={tier.description}
                        onChange={(e) => updateTicketTier(tier.id, "description", e.target.value)}
                        placeholder="What's included"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-lg border border-border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Dynamic Pricing</h4>
                  <p className="text-sm text-muted-foreground">Automatically adjust prices based on demand</p>
                </div>
                <Switch checked={enableDynamicPricing} onCheckedChange={setEnableDynamicPricing} />
              </div>
              {enableDynamicPricing && (
                <div className="mt-4 rounded-lg bg-primary/10 p-3">
                  <AIBadge />
                  <p className="mt-2 text-sm text-muted-foreground">
                    AI will optimize pricing based on demand patterns, competitor events, and historical data.
                  </p>
                </div>
              )}
            </div>
          </div>
        )
      case 4:
        return (
          <div className="space-y-6">
            <div className="rounded-lg border border-border p-6">
              <h3 className="mb-4 text-lg font-semibold">Event Summary</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Event Name</p>
                  <p className="font-medium">{eventName || "Not set"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Artist</p>
                  <p className="font-medium">{artistName || "Not set"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Venue</p>
                  <p className="font-medium">{venueName ? `${venueName}, ${venueCity}` : "Not set"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date & Time</p>
                  <p className="font-medium">{eventDate ? `${eventDate} at ${eventTime}` : "Not set"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Capacity</p>
                  <p className="font-medium">{capacity || "Not set"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ticket Tiers</p>
                  <p className="font-medium">{ticketTiers.length} tier(s)</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border border-border p-6">
              <h3 className="mb-4 text-lg font-semibold">Pricing Summary</h3>
              <div className="space-y-2">
                {ticketTiers.map((tier) => (
                  <div key={tier.id} className="flex items-center justify-between">
                    <span className="text-muted-foreground">{tier.name || "Unnamed Tier"}</span>
                    <span className="font-medium">
                      ${tier.price} × {tier.quantity}
                    </span>
                  </div>
                ))}
                <div className="border-t border-border pt-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Potential Revenue</span>
                    <span className="font-bold text-primary">
                      ${ticketTiers.reduce((sum, t) => sum + t.price * t.quantity, 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-green-500/10 p-4">
              <CheckIcon className="h-5 w-5 text-green-500" />
              <p className="text-sm text-green-500">
                Event is ready to publish. It will appear on your calendar and be available for ticket sales.
              </p>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/promoter/events">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Create Event</h1>
          <p className="text-muted-foreground">Organize a new event as a promoter</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-2">
            {wizardSteps.map((step) => (
              <button
                key={step.id}
                onClick={() => setCurrentStep(step.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors ${currentStep === step.id ? "bg-primary text-primary-foreground" : currentStep > step.id ? "bg-green-500/20 text-green-500" : "bg-secondary text-muted-foreground"}`}
              >
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-sm ${currentStep === step.id ? "bg-primary-foreground text-primary" : currentStep > step.id ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"}`}
                >
                  {currentStep > step.id ? <CheckIcon className="h-4 w-4" /> : step.id}
                </span>
                {step.name}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="rounded-xl border border-border bg-card p-6">
            {renderStepContent()}
            <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
              >
                Back
              </Button>
              <div className="flex gap-3">
                {currentStep < 4 ? (
                  <Button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="bg-primary text-primary-foreground"
                  >
                    Continue
                    <ChevronRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <>
                    <Button variant="outline">
                      <EyeIcon className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                    <Button onClick={handlePublish} className="bg-primary text-primary-foreground">
                      Publish Event
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
