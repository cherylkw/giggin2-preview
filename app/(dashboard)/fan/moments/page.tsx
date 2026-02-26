"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Camera,
  Heart,
  MessageCircle,
  Share2,
  Sparkles,
  Upload,
  Wand2,
  Palette,
  BookOpen,
  Users,
  Smile,
  Music2,
  ChevronDown,
  ChevronUp,
  Clapperboard,
  Zap,
  UserPlus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { AIBadge } from "@/components/ui/ai-badge"
import { mockMoments, mockEvents } from "@/lib/mock-data"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const remixStyles = [
  { name: "Neon Nights", color: "from-purple-500 to-pink-500" },
  { name: "Indie Pastel", color: "from-pink-300 to-yellow-200" },
  { name: "Jazz Noir", color: "from-gray-900 to-gray-600" },
  { name: "Cyber Pop", color: "from-cyan-400 to-blue-500" },
]

const genAIModules = [
  {
    id: "poster",
    name: "AI Concert Poster Maker",
    description: "Generate stunning concert posters from your photos",
    icon: Palette,
    styles: [
      "Vaporwave",
      "Indie Vintage",
      "Metal Skullwave",
      "Kawaii Punk",
      "Minimalist Tour Poster",
      "90s Grunge",
      "Jazz Noir Retro",
    ],
    preview: "/concert-poster-art-vaporwave.jpg",
  },
  {
    id: "reels",
    name: "AI Reels Auto-Edit",
    description: "Generate rhythm-synced reels with transitions",
    icon: Clapperboard,
    options: ["10s Quick Cut", "30s Full Edit"],
    preview: "/video-reel-music-rhythm.jpg",
  },
  {
    id: "story",
    name: "AI 'My Night Out' Story Builder",
    description: "Auto-create shareable recap pages",
    icon: BookOpen,
    preview: "/photo-story-collage-night.jpg",
  },
  {
    id: "face",
    name: "AI Face Highlights",
    description: "Detect and enhance faces in your photos",
    icon: Smile,
    preview: "/enhanced-portrait-concert.jpg",
  },
  {
    id: "collab",
    name: "Fan Collab Mode",
    description: "Combine photos from two users into one remix",
    icon: Users,
    preview: "/photo-collage-two-people.jpg",
  },
  {
    id: "setlist",
    name: "AI Setlist Guess & Mood Map",
    description: "Predict setlist and mood from fan uploads",
    icon: Music2,
    preview: "/music-setlist-visualization.jpg",
  },
]

const additionalFilters = [
  { name: "Shoegaze Dreamblur", color: "from-pink-400/50 to-blue-400/50" },
  { name: "Hyperpop Glitch", color: "from-cyan-400 to-magenta-500" },
  { name: "Indie Film Grain", color: "from-amber-200 to-orange-300" },
  { name: "UK Garage Sparkle", color: "from-yellow-300 to-pink-400" },
  { name: "Lo-Fi Purple Haze", color: "from-purple-600 to-purple-300" },
  { name: "Retro 70s", color: "from-orange-500 to-yellow-400" },
  { name: "Synthwave Plasma", color: "from-pink-500 to-cyan-400" },
  { name: "Bluesy Mocha", color: "from-amber-800 to-amber-500" },
]

export default function MomentsPage() {
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null)
  const [expandedModule, setExpandedModule] = useState<string | null>(null)
  const [showAllFilters, setShowAllFilters] = useState(false)

  const getEventForMoment = (eventId: string) => {
    return mockEvents.find((e) => e.id === eventId)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Moments</h1>
          <p className="mt-2 text-muted-foreground">Share and relive your concert experiences</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Upload className="mr-2 h-4 w-4" />
              Share Your Moment
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground">Share Your Moment</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="flex h-48 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-border bg-secondary/50 transition-colors hover:border-primary">
                <div className="text-center">
                  <Camera className="mx-auto h-10 w-10 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">Click to upload photos or videos</p>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">AI Remix Style</label>
                <div className="grid grid-cols-2 gap-2">
                  {remixStyles.map((style) => (
                    <button
                      key={style.name}
                      onClick={() => setSelectedStyle(style.name)}
                      className={`flex items-center gap-2 rounded-lg border p-3 text-left transition-colors ${
                        selectedStyle === style.name
                          ? "border-primary bg-primary/10"
                          : "border-border bg-secondary hover:border-primary/50"
                      }`}
                    >
                      <div className={`h-6 w-6 rounded-full bg-gradient-to-r ${style.color}`} />
                      <span className="text-sm text-foreground">{style.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Wand2 className="mr-2 h-4 w-4" />
                  Create AI Photo Remix
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Create AI Reel Remix
                </Button>
              </div>
              <Button className="w-full bg-primary text-primary-foreground">Post Moment</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-primary/30 bg-gradient-to-r from-primary/10 to-accent/10">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
              <Wand2 className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <CardTitle>GenAI Remix Tools</CardTitle>
                <AIBadge text="Expanded" />
              </div>
              <p className="text-sm text-muted-foreground">
                Transform your concert photos into stunning AI-generated art
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Original Style Filters */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">Quick Filters</h4>
            <div className="flex flex-wrap gap-2">
              {remixStyles.map((style) => (
                <Button key={style.name} variant="outline" size="sm" className="text-xs bg-transparent">
                  <div className={`mr-2 h-3 w-3 rounded-full bg-gradient-to-r ${style.color}`} />
                  {style.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Additional Genre Theme Filters */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-foreground">Genre Theme Filters</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAllFilters(!showAllFilters)}
                className="text-xs text-muted-foreground"
              >
                {showAllFilters ? "Show Less" : "Show All"}
                {showAllFilters ? <ChevronUp className="ml-1 h-3 w-3" /> : <ChevronDown className="ml-1 h-3 w-3" />}
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {(showAllFilters ? additionalFilters : additionalFilters.slice(0, 4)).map((filter) => (
                <Button key={filter.name} variant="outline" size="sm" className="text-xs bg-transparent">
                  <div className={`mr-2 h-3 w-3 rounded-full bg-gradient-to-r ${filter.color}`} />
                  {filter.name}
                </Button>
              ))}
            </div>
          </div>

          {/* GenAI Module Cards */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">AI Creative Tools</h4>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {genAIModules.map((module) => {
                const Icon = module.icon
                const isExpanded = expandedModule === module.id
                return (
                  <Card
                    key={module.id}
                    className={`cursor-pointer transition-all border-border hover:border-primary/50 ${isExpanded ? "border-primary bg-primary/5" : "bg-card"}`}
                    onClick={() => setExpandedModule(isExpanded ? null : module.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-medium text-foreground text-sm">{module.name}</h5>
                          <p className="text-xs text-muted-foreground mt-1">{module.description}</p>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t border-border">
                          <div className="flex gap-3">
                            <div className="relative h-20 w-20 rounded-lg overflow-hidden border border-border shrink-0">
                              <Image
                                src={module.preview || "/placeholder.svg"}
                                alt={module.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              {module.styles && (
                                <div className="flex flex-wrap gap-1">
                                  {module.styles.slice(0, 3).map((style) => (
                                    <Badge key={style} variant="outline" className="text-xs">
                                      {style}
                                    </Badge>
                                  ))}
                                  {module.styles.length > 3 && (
                                    <Badge variant="outline" className="text-xs text-muted-foreground">
                                      +{module.styles.length - 3} more
                                    </Badge>
                                  )}
                                </div>
                              )}
                              {module.options && (
                                <div className="flex flex-wrap gap-1">
                                  {module.options.map((opt) => (
                                    <Badge key={opt} variant="outline" className="text-xs">
                                      {opt}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                              <Button size="sm" className="mt-2 h-7 text-xs bg-primary text-primary-foreground">
                                <Zap className="mr-1 h-3 w-3" />
                                Try Now
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Moments Feed - Made clickable to Event Moment Hub */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockMoments.map((moment) => {
          const event = getEventForMoment(moment.eventId)
          return (
            <div
              key={moment.id}
              className="overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/50"
            >
              <Link href={`/fan/moments/${moment.eventId}`} className="block">
                <div className="relative aspect-[4/5]">
                  <Image src={moment.image || "/placeholder.svg"} alt={moment.caption} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  {event && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-card/80 backdrop-blur-sm text-foreground text-xs">{event.name}</Badge>
                    </div>
                  )}
                </div>
              </Link>
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <Link href={`/fan/profile/${moment.userId}`}>
                    <Image
                      src={moment.userAvatar || "/placeholder.svg"}
                      alt={moment.userName}
                      width={36}
                      height={36}
                      className="rounded-full cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                    />
                  </Link>
                  <div className="flex-1">
                    {/* Making username clickable to profile */}
                    <Link href={`/fan/profile/${moment.userId}`}>
                      <p className="font-medium text-foreground hover:text-primary transition-colors cursor-pointer">
                        {moment.userName}
                      </p>
                    </Link>
                    <p className="text-xs text-muted-foreground">{new Date(moment.timestamp).toLocaleDateString()}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 px-2 text-primary hover:bg-primary/10">
                    <UserPlus className="h-4 w-4" />
                  </Button>
                </div>
                <p className="mt-3 text-sm text-foreground">{moment.caption}</p>
                <div className="mt-4 flex items-center gap-4">
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Heart className="h-4 w-4" />
                    {moment.likes}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MessageCircle className="h-4 w-4" />
                    {moment.comments}
                  </span>
                  <span className="ml-auto text-muted-foreground">
                    <Share2 className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
