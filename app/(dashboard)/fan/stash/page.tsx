"use client"

import { useState } from "react"
import { Bookmark, Clock, History, RefreshCw, Save, FolderPlus, Calendar, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AIBadge } from "@/components/ui/ai-badge"
import { EventCard } from "@/components/events/event-card"
import { mockEvents, mockSearchHistory } from "@/lib/mock-data"

export default function StashPage() {
  const [activeTab, setActiveTab] = useState("saved")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Your Stash</h1>
        <p className="mt-2 text-muted-foreground">
          Saved events, past experiences, and search history all in one place.
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-secondary">
          <TabsTrigger
            value="saved"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Bookmark className="mr-2 h-4 w-4" />
            Saved Events
          </TabsTrigger>
          <TabsTrigger
            value="past"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Clock className="mr-2 h-4 w-4" />
            Past Events
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <History className="mr-2 h-4 w-4" />
            Search History
          </TabsTrigger>
        </TabsList>

        {/* Saved Events */}
        <TabsContent value="saved" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockEvents.slice(0, 3).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </TabsContent>

        {/* Past Events */}
        <TabsContent value="past" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockEvents.slice(1, 4).map((event) => (
              <div key={event.id} className="relative">
                <EventCard event={event} />
                <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-card/80 backdrop-blur-sm">
                  <div className="text-center">
                    <Calendar className="mx-auto h-8 w-8 text-primary" />
                    <p className="mt-2 font-medium text-foreground">Attended</p>
                    <p className="text-sm text-muted-foreground">Jan 15, 2025</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Search History - Perplexity-style */}
        <TabsContent value="history" className="mt-6">
          <div className="space-y-4">
            {mockSearchHistory.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/50"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <h3 className="font-semibold text-foreground">{item.query}</h3>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{item.summary}</p>
                    <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                      <span>{item.results} results found</span>
                      {item.saved && <AIBadge text="Saved" className="bg-chart-3/20 text-chart-3" />}
                    </div>
                  </div>
                </div>

                {/* Mini Event Cards */}
                <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                  {item.eventIds?.map((eventId) => {
                    const event = mockEvents.find((e) => e.id === eventId)
                    return event ? <EventCard key={event.id} event={event} variant="compact" /> : null
                  })}
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" className="text-xs bg-transparent">
                    <RefreshCw className="mr-1.5 h-3 w-3" />
                    Re-run with AI
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs bg-transparent">
                    <Save className="mr-1.5 h-3 w-3" />
                    Save insights
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs bg-transparent">
                    <FolderPlus className="mr-1.5 h-3 w-3" />
                    Convert to Collection
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
