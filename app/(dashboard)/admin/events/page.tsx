"use client"

import { Database, Upload, RefreshCw, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AIBadge } from "@/components/ui/ai-badge"

const ingestionStats = [
  { source: "Ticketmaster API", events: 12450, lastSync: "2 min ago", status: "synced" },
  { source: "Eventbrite", events: 8320, lastSync: "5 min ago", status: "synced" },
  { source: "Manual Uploads", events: 1240, lastSync: "1 hour ago", status: "synced" },
  { source: "Partner Feeds", events: 3890, lastSync: "10 min ago", status: "syncing" },
]

export default function EventIngestionPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Event Ingestion</h1>
          <p className="mt-2 text-muted-foreground">Manage event data sources and imports</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Manual Upload
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <RefreshCw className="mr-2 h-4 w-4" />
            Sync All
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Total Events</p>
          <p className="text-3xl font-bold text-foreground">25,900</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Active Sources</p>
          <p className="text-3xl font-bold text-foreground">4</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Daily Syncs</p>
          <p className="text-3xl font-bold text-foreground">48</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Data Quality</p>
          <p className="text-3xl font-bold text-chart-3">98.5%</p>
        </div>
      </div>

      {/* Data Sources */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Data Sources</h2>
          <AIBadge text="Auto-deduplication enabled" />
        </div>
        <div className="space-y-3">
          {ingestionStats.map((source) => (
            <div
              key={source.source}
              className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-4"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                  <Database className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{source.source}</h3>
                  <p className="text-sm text-muted-foreground">
                    {source.events.toLocaleString()} events • Last sync: {source.lastSync}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {source.status === "synced" ? (
                  <CheckCircle2 className="h-5 w-5 text-chart-3" />
                ) : (
                  <RefreshCw className="h-5 w-5 text-primary animate-spin" />
                )}
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
