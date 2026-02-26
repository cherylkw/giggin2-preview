"use client"

import { useState } from "react"
import Link from "next/link"
import { FileText, Search, Plus, DollarSign, PieChart, Shield, Clock, HelpCircle, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { mockContracts } from "@/lib/mock-data"

const mockPayouts = [
  {
    id: "P-001",
    event: "Neon Dreams Tour",
    payee: "Luna Eclipse",
    role: "Artist",
    amount: 27000,
    currency: "USDC",
    status: "paid",
    date: "2025-01-16",
    datePaid: "2025-01-16",
  },
  {
    id: "P-002",
    event: "Neon Dreams Tour",
    payee: "The Anthem",
    role: "Venue",
    amount: 11250,
    currency: "Stripe",
    status: "paid",
    date: "2025-01-16",
    datePaid: "2025-01-16",
  },
  {
    id: "P-003",
    event: "Neon Dreams Tour",
    payee: "Live Nation",
    role: "Promoter",
    amount: 4500,
    currency: "Stripe",
    status: "scheduled",
    date: "2025-01-20",
    datePaid: null,
  },
  {
    id: "P-004",
    event: "Summer Vibes Festival",
    payee: "Multiple Artists",
    role: "Artist",
    amount: 0,
    currency: "USDC",
    status: "pending",
    date: "2025-01-25",
    datePaid: null,
  },
  {
    id: "P-005",
    event: "Summer Vibes Festival",
    payee: "Pier 17",
    role: "Venue",
    amount: 0,
    currency: "Stripe",
    status: "pending",
    date: "2025-01-25",
    datePaid: null,
  },
]

const mockSplits = [
  {
    id: "SP-001",
    event: "Neon Dreams Tour",
    eventDate: "2025-01-15",
    stakeholders: [
      { name: "Luna Eclipse", role: "Artist", split: "60%", guarantee: null },
      { name: "The Anthem", role: "Venue", split: "25%", guarantee: null },
      { name: "Live Nation", role: "Promoter", split: "10%", guarantee: null },
      { name: "Stellar Mgmt", role: "Manager", split: "5%", guarantee: null },
    ],
    model: "Percentage Split",
    tiers: "All tiers",
    effectiveDate: "2025-01-10",
  },
  {
    id: "SP-002",
    event: "Acoustic Sessions",
    eventDate: "2025-01-18",
    stakeholders: [
      { name: "River Stone", role: "Artist", split: "70%", guarantee: "$5,000" },
      { name: "Blue Note", role: "Venue", split: "20%", guarantee: null },
      { name: "Jazz Mgmt", role: "Manager", split: "10%", guarantee: null },
    ],
    model: "Guarantee + Upside",
    tiers: "GA, VIP",
    effectiveDate: "2025-01-12",
  },
  {
    id: "SP-003",
    event: "Summer Vibes Festival",
    eventDate: "2025-01-22",
    stakeholders: [
      { name: "Multiple Artists", role: "Artist", split: "50%", guarantee: "$15,000" },
      { name: "Pier 17", role: "Venue", split: "30%", guarantee: null },
      { name: "Festival Co", role: "Promoter", split: "15%", guarantee: null },
      { name: "Giggin'", role: "Platform", split: "5%", guarantee: null },
    ],
    model: "Guarantee + Upside",
    tiers: "GA, VIP, Early Bird",
    effectiveDate: "2025-01-14",
  },
]

const mockSettlements = [
  {
    id: "SET-001",
    event: "Neon Dreams Tour",
    eventDate: "2025-01-15",
    grossRevenue: 45000,
    fees: 2250,
    netRevenue: 42750,
    status: "closed",
    closeoutDate: "2025-01-16",
  },
  {
    id: "SET-002",
    event: "Acoustic Sessions",
    eventDate: "2025-01-18",
    grossRevenue: 8500,
    fees: 425,
    netRevenue: 8075,
    status: "partial",
    closeoutDate: null,
  },
  {
    id: "SET-003",
    event: "Summer Vibes Festival",
    eventDate: "2025-01-22",
    grossRevenue: 0,
    fees: 0,
    netRevenue: 0,
    status: "open",
    closeoutDate: null,
  },
]

export default function PromoterFinancePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [view, setView] = useState<"registry" | "studio">("registry")
  const [activeTab, setActiveTab] = useState<"payouts" | "splits" | "contracts" | "settlements">("payouts")

  const filteredContracts = mockContracts.filter(
    (c) =>
      c.eventTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "paid":
      case "closed":
        return "bg-green-500/20 text-green-500"
      case "draft":
      case "pending":
      case "open":
        return "bg-amber-500/20 text-amber-500"
      case "scheduled":
      case "partial":
        return "bg-blue-500/20 text-blue-500"
      default:
        return "bg-secondary text-muted-foreground"
    }
  }

  const getAutomationColor = (level: string) => {
    switch (level) {
      case "Automated":
        return "bg-green-500/20 text-green-500"
      case "Semi":
        return "bg-blue-500/20 text-blue-500"
      case "Manual":
        return "bg-amber-500/20 text-amber-500"
      default:
        return "bg-secondary text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Finance</h1>
          <p className="mt-2 text-muted-foreground">Manage payouts, revenue splits, and smart contracts</p>
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

      <div className="flex gap-2 border-b border-border">
        <button
          onClick={() => setActiveTab("payouts")}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "payouts"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <DollarSign className="h-4 w-4" />
          Payouts
        </button>
        <button
          onClick={() => setActiveTab("splits")}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "splits"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <PieChart className="h-4 w-4" />
          Revenue Splits
        </button>
        <button
          onClick={() => setActiveTab("contracts")}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "contracts"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Shield className="h-4 w-4" />
          Smart Contracts
        </button>
        <button
          onClick={() => setActiveTab("settlements")}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "settlements"
              ? "border-b-2 border-primary text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Clock className="h-4 w-4" />
          Settlements
        </button>
      </div>

      {view === "registry" && (
        <>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by event, payee, or contract ID..."
              className="pl-10"
            />
          </div>

          {activeTab === "payouts" && (
            <div className="rounded-xl border border-border bg-card">
              <div className="grid grid-cols-7 gap-4 border-b border-border p-4 text-sm font-medium text-muted-foreground">
                <div className="col-span-2">Event</div>
                <div>Payee</div>
                <div>Amount</div>
                <div>Currency / Rail</div>
                <div>Status</div>
                <div>Date</div>
              </div>
              {mockPayouts.map((payout) => (
                <div
                  key={payout.id}
                  className="grid grid-cols-7 gap-4 border-b border-border p-4 transition-colors hover:bg-secondary/50 last:border-0"
                >
                  <div className="col-span-2">
                    <p className="font-medium text-foreground">{payout.event}</p>
                    <p className="text-xs text-muted-foreground">{payout.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground">{payout.payee}</p>
                    <p className="text-xs text-muted-foreground">{payout.role}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold text-foreground">
                      {payout.amount > 0 ? `$${payout.amount.toLocaleString()}` : "—"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-muted-foreground">{payout.currency}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-2 py-1 text-xs capitalize ${getStatusColor(payout.status)}`}>
                      {payout.status}
                    </span>
                    {payout.status === "pending" && (
                      <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" title="Event not yet settled" />
                    )}
                  </div>
                  <div className="flex items-center">
                    <div>
                      <p className="text-sm text-foreground">{payout.datePaid || payout.date}</p>
                      <p className="text-xs text-muted-foreground">
                        {payout.status === "paid" ? "Paid" : payout.status === "scheduled" ? "Expected" : "TBD"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "splits" && (
            <div className="space-y-4">
              {mockSplits.map((split) => (
                <div key={split.id} className="rounded-xl border border-border bg-card p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{split.event}</h3>
                      <p className="text-sm text-muted-foreground">{split.eventDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Split Model</p>
                      <p className="font-medium text-foreground">{split.model}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {split.stakeholders.map((stakeholder, idx) => (
                      <div key={idx} className="flex items-center justify-between rounded-lg bg-secondary/30 p-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-sm font-medium text-primary">
                            {stakeholder.role[0]}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{stakeholder.name}</p>
                            <p className="text-xs text-muted-foreground">{stakeholder.role}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-foreground">{stakeholder.split}</p>
                          {stakeholder.guarantee && (
                            <p className="text-xs text-muted-foreground">+ {stakeholder.guarantee} guarantee</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center gap-6 text-sm text-muted-foreground">
                    <span>Ticket Tiers: {split.tiers}</span>
                    <span>Effective: {split.effectiveDate}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "contracts" && (
            <div className="rounded-xl border border-border bg-card">
              <div className="grid grid-cols-6 gap-4 border-b border-border p-4 text-sm font-medium text-muted-foreground">
                <div>Contract ID</div>
                <div className="col-span-2">Event</div>
                <div>Status</div>
                <div>Automation</div>
                <div>Settlement Rail</div>
              </div>
              {mockContracts.map((contract) => (
                <Link
                  key={contract.id}
                  href={`/promoter/contracts/${contract.id}`}
                  className="grid grid-cols-6 gap-4 border-b border-border p-4 transition-colors hover:bg-secondary/50 last:border-0"
                >
                  <div className="flex items-center">
                    <span className="font-mono text-sm text-primary">{contract.id}</span>
                  </div>
                  <div className="col-span-2">
                    <p className="font-medium text-foreground">{contract.eventTitle}</p>
                    <p className="text-sm text-muted-foreground">{contract.eventDate}</p>
                  </div>
                  <div className="flex items-center">
                    <span className={`rounded-full px-2 py-1 text-xs capitalize ${getStatusColor(contract.status)}`}>
                      {contract.status}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${getAutomationColor(
                        contract.settlementMethod === "USDC"
                          ? "Automated"
                          : contract.settlementMethod === "Hybrid"
                            ? "Semi"
                            : "Manual",
                      )}`}
                    >
                      {contract.settlementMethod === "USDC"
                        ? "Automated"
                        : contract.settlementMethod === "Hybrid"
                          ? "Semi"
                          : "Manual"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{contract.settlementMethod}</span>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {activeTab === "settlements" && (
            <div className="space-y-4">
              {mockSettlements.map((settlement) => (
                <div key={settlement.id} className="rounded-xl border border-border bg-card p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{settlement.event}</h3>
                      <p className="text-sm text-muted-foreground">{settlement.eventDate}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(settlement.status)}`}>
                      {settlement.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    <div className="rounded-lg bg-secondary/30 p-4">
                      <p className="text-xs text-muted-foreground">Gross Ticket Revenue</p>
                      <p className="mt-1 text-2xl font-bold text-foreground">
                        {settlement.grossRevenue > 0 ? `$${settlement.grossRevenue.toLocaleString()}` : "—"}
                      </p>
                    </div>
                    <div className="rounded-lg bg-secondary/30 p-4">
                      <p className="text-xs text-muted-foreground">Platform Fees</p>
                      <p className="mt-1 text-2xl font-bold text-red-500">
                        {settlement.fees > 0 ? `-$${settlement.fees.toLocaleString()}` : "—"}
                      </p>
                    </div>
                    <div className="rounded-lg bg-primary/10 p-4">
                      <p className="text-xs text-muted-foreground">Net Revenue</p>
                      <p className="mt-1 text-2xl font-bold text-primary">
                        {settlement.netRevenue > 0 ? `$${settlement.netRevenue.toLocaleString()}` : "—"}
                      </p>
                    </div>
                  </div>

                  {settlement.closeoutDate && (
                    <div className="mt-4 text-sm text-muted-foreground">Closed on {settlement.closeoutDate}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {view === "studio" && (
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold">Auto-Split Studio</h2>
          <p className="text-muted-foreground">Create a new smart contract by setting up an event in the Events tab.</p>
          <Link href="/promoter/events">
            <Button className="mt-4 bg-primary text-primary-foreground">Go to Events</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
