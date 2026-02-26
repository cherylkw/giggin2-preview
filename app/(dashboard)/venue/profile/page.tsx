"use client"

import { MapPin, Users, Calendar, Star, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function VenueProfilePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Venue Profile</h1>
          <p className="mt-2 text-muted-foreground">Manage your venue information</p>
        </div>
        <Button variant="outline">
          <Edit className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      {/* Venue Image */}
      <div className="relative h-64 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20" />
        <div className="absolute bottom-6 left-6">
          <h2 className="text-3xl font-bold text-foreground">The Anthem</h2>
          <div className="mt-2 flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>Washington DC</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <Users className="mx-auto h-6 w-6 text-primary" />
          <p className="mt-2 text-2xl font-bold text-foreground">3,500</p>
          <p className="text-sm text-muted-foreground">Capacity</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <Calendar className="mx-auto h-6 w-6 text-primary" />
          <p className="mt-2 text-2xl font-bold text-foreground">247</p>
          <p className="text-sm text-muted-foreground">Events/Year</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <Star className="mx-auto h-6 w-6 text-chart-4 fill-chart-4" />
          <p className="mt-2 text-2xl font-bold text-foreground">4.8</p>
          <p className="text-sm text-muted-foreground">Rating</p>
        </div>
      </div>

      {/* Details Form */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Venue Name</Label>
            <Input defaultValue="The Anthem" className="bg-secondary" />
          </div>
          <div className="space-y-2">
            <Label>Location</Label>
            <Input defaultValue="901 Wharf St SW, Washington, DC" className="bg-secondary" />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Description</Label>
          <textarea
            className="w-full rounded-lg border border-border bg-secondary p-3 text-foreground min-h-[100px]"
            defaultValue="The Anthem is a premier concert venue on The Wharf in Washington, DC, featuring flexible configurations for intimate shows to major concerts."
          />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label>Capacity</Label>
            <Input type="number" defaultValue="3500" className="bg-secondary" />
          </div>
          <div className="space-y-2">
            <Label>Standing Capacity</Label>
            <Input type="number" defaultValue="6000" className="bg-secondary" />
          </div>
          <div className="space-y-2">
            <Label>Venue Type</Label>
            <Input defaultValue="Concert Hall" className="bg-secondary" />
          </div>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Save Changes</Button>
      </div>
    </div>
  )
}
