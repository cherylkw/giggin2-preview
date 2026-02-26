"use client"

import { useState } from "react"
import Link from "next/link"
import { FileText, Search, Plus, Eye, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { mockContracts } from "@/lib/mock-data"

export default function VenueContractsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [view, setView] = useState<"registry" | "studio">("registry")

  const filteredContracts = mockContracts.filter(
    (c) =>
      c.eventTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-500"
      case "draft":
        return "bg-amber-500/20 text-amber-500"
      case "pending":
        return "bg-blue-500/20 text-blue-500"
      default:
        return "bg-secondary text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-foreground">Smart Contracts</h1>
            <span className="rounded-full bg-primary/20 px-3 py-1 text-sm text-primary">Registry</span>
          </div>
          <p className="mt-2 text-muted-foreground">Manage event-linked smart contracts and revenue distribution</p>
        </div>
        <Button onClick={() => setView(view === "registry" ? "studio" : "registry")} variant="outline">
          {view === "registry" ? (
            <>
              <Plus className="mr-2 h-4 w-4" />
              New Contract
            </>
          ) : (
            <>
              <FileText className="mr-2 h-4 w-4" />
              View Registry
            </>
          )}
        </Button>
      </div>

      {view === "registry" && (
        <>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search contracts by event or ID..."
              className="pl-10"
            />
          </div>

          <div className="rounded-xl border border-border bg-card">
            <div className="grid grid-cols-6 gap-4 border-b border-border p-4 text-sm font-medium text-muted-foreground">
              <div className="col-span-2">Event</div>
              <div>Contract ID</div>
              <div>Status</div>
              <div>Stakeholders</div>
              <div>Settlement</div>
            </div>
            {filteredContracts.map((contract) => (
              <Link
                key={contract.id}
                href={`/venue/contracts/${contract.id}`}
                className="grid grid-cols-6 gap-4 border-b border-border p-4 transition-colors hover:bg-secondary/50 last:border-0"
              >
                <div className="col-span-2">
                  <p className="font-medium text-foreground">{contract.eventTitle}</p>
                  <p className="text-sm text-muted-foreground">{contract.eventDate}</p>
                </div>
                <div className="flex items-center">
                  <span className="font-mono text-sm text-primary">{contract.id}</span>
                </div>
                <div className="flex items-center">
                  <span className={`rounded-full px-2 py-1 text-xs capitalize ${getStatusColor(contract.status)}`}>
                    {contract.status}
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    {contract.stakeholders.slice(0, 3).map((s, i) => (
                      <div
                        key={i}
                        className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-card bg-secondary text-xs font-medium"
                      >
                        {s.role[0]}
                      </div>
                    ))}
                    {contract.stakeholders.length > 3 && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-card bg-primary text-xs font-medium text-primary-foreground">
                        +{contract.stakeholders.length - 3}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{contract.settlementMethod}</span>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      {view === "studio" && (
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold">Auto-Split Studio</h2>
          <p className="text-muted-foreground">
            Create a new smart contract by setting up an event in the Ticketing tab.
          </p>
          <Link href="/venue/events">
            <Button className="mt-4 bg-primary text-primary-foreground">
              Go to Events
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
