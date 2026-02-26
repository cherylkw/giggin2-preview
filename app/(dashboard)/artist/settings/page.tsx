"use client"

import { useState } from "react"
import { Save, Instagram, Youtube, Globe, Music2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function ArtistSettingsPage() {
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    // Basic Info
    artistName: "Luna Eclipse",
    bio: "Boundary-pushing electronic artist known for immersive live shows that blend cutting-edge visuals with deep, melodic soundscapes.",
    location: "Los Angeles, CA",
    genre: "Electronic",
    // Social Links
    instagram: "https://instagram.com/lunaeclipse",
    spotify: "https://open.spotify.com/artist/lunaeclipse",
    youtube: "https://youtube.com/@lunaeclipse",
    tiktok: "https://tiktok.com/@lunaeclipse",
    indieCity: "https://indiecity.com/lunaeclipse",
    website: "https://lunaeclipse.com",
  })

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Profile Settings</h1>
          <p className="mt-2 text-muted-foreground">Manage your artist profile and social media connections</p>
        </div>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {/* Basic Info */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Your public artist profile information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="artistName">Artist / Band Name</Label>
              <Input
                id="artistName"
                value={formData.artistName}
                onChange={(e) => handleChange("artistName", e.target.value)}
                className="bg-secondary border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="genre">Primary Genre</Label>
              <Input
                id="genre"
                value={formData.genre}
                onChange={(e) => handleChange("genre", e.target.value)}
                className="bg-secondary border-border"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              placeholder="City, State/Country"
              className="bg-secondary border-border"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              rows={4}
              className="bg-secondary border-border resize-none"
              placeholder="Tell fans about yourself..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Social Media Links */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Social Media & Links</CardTitle>
          <CardDescription>Connect your social profiles to display on your artist page</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Instagram */}
          <div className="space-y-2">
            <Label htmlFor="instagram" className="flex items-center gap-2">
              <Instagram className="h-4 w-4 text-pink-500" />
              Instagram
            </Label>
            <Input
              id="instagram"
              value={formData.instagram}
              onChange={(e) => handleChange("instagram", e.target.value)}
              placeholder="https://instagram.com/yourusername"
              className="bg-secondary border-border"
            />
          </div>

          {/* Spotify */}
          <div className="space-y-2">
            <Label htmlFor="spotify" className="flex items-center gap-2">
              <Music2 className="h-4 w-4 text-green-500" />
              Spotify Artist URL
            </Label>
            <Input
              id="spotify"
              value={formData.spotify}
              onChange={(e) => handleChange("spotify", e.target.value)}
              placeholder="https://open.spotify.com/artist/..."
              className="bg-secondary border-border"
            />
          </div>

          {/* YouTube */}
          <div className="space-y-2">
            <Label htmlFor="youtube" className="flex items-center gap-2">
              <Youtube className="h-4 w-4 text-red-500" />
              YouTube Channel URL
            </Label>
            <Input
              id="youtube"
              value={formData.youtube}
              onChange={(e) => handleChange("youtube", e.target.value)}
              placeholder="https://youtube.com/@yourchannel"
              className="bg-secondary border-border"
            />
          </div>

          {/* TikTok */}
          <div className="space-y-2">
            <Label htmlFor="tiktok" className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
              </svg>
              TikTok URL
            </Label>
            <Input
              id="tiktok"
              value={formData.tiktok}
              onChange={(e) => handleChange("tiktok", e.target.value)}
              placeholder="https://tiktok.com/@yourusername"
              className="bg-secondary border-border"
            />
          </div>

          <Separator className="bg-border" />

          {/* Indie City */}
          <div className="space-y-2">
            <Label htmlFor="indieCity" className="flex items-center gap-2">
              <span className="flex h-4 w-4 items-center justify-center rounded bg-primary/20 text-[10px] font-bold text-primary">
                IC
              </span>
              Indie City Profile URL
            </Label>
            <Input
              id="indieCity"
              value={formData.indieCity}
              onChange={(e) => handleChange("indieCity", e.target.value)}
              placeholder="https://indiecity.com/yourprofile"
              className="bg-secondary border-border"
            />
            <p className="text-xs text-muted-foreground">
              Connect your Indie City profile to reach independent music fans.{" "}
              <a
                href="https://indiecity.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline inline-flex items-center gap-1"
              >
                Learn more <ExternalLink className="h-3 w-3" />
              </a>
            </p>
          </div>

          <Separator className="bg-border" />

          {/* Website */}
          <div className="space-y-2">
            <Label htmlFor="website" className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-blue-500" />
              Website
            </Label>
            <Input
              id="website"
              value={formData.website}
              onChange={(e) => handleChange("website", e.target.value)}
              placeholder="https://yourwebsite.com"
              className="bg-secondary border-border"
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button (Mobile) */}
      <div className="flex justify-end md:hidden">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  )
}
