"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Users, Percent, Wallet, CheckCircle2, Search, Eye, Sparkles } from "lucide-react"
import { mockContracts } from "@/lib/mock-data"

interface Split {
  id: string
  role: string
  name: string
  percentage: number
  wallet: string
}

function ContractStatusBadge({ status }: { status: string }) {
  const styles = {
    active: "bg-green-500/20 text-green-400 border-green-500/30",
    draft: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    pending: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  }
  return (
    <span
      className={`rounded-full border px-2 py-0.5 text-xs font-medium capitalize ${styles[status as keyof typeof styles] || styles.draft}`}
    >
      {status}
    </span>
  )
}

export default function SmartContractsPage() {
  const [showStudio, setShowStudio] = useState(false)
  const [splits, setSplits] = useState<Split[]>([
    { id: "1", role: "Artist", name: "Luna Eclipse", percentage: 60, wallet: "0x1a2b...3c4d" },
    { id: "2", role: "Venue", name: "The Anthem", percentage: 25, wallet: "0x5e6f...7g8h" },
    { id: "3", role: "Promoter", name: "", percentage: 15, wallet: "" },
  ])
  const [searchQuery, setSearchQuery] = useState("")

  const totalPercentage = splits.reduce((acc, s) => acc + s.percentage, 0)

  const filteredContracts = mockContracts.filter(
    (c) =>
      c.eventTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const addSplit = () => {
    setSplits([...splits, { id: Date.now().toString(), role: "", name: "", percentage: 0, wallet: "" }])
  }

  const removeSplit = (id: string) => {
    setSplits(splits.filter((s) => s.id !== id))
  }

  const updateSplit = (id: string, field: keyof Split, value: string | number) => {
    setSplits(splits.map((s) => (s.id === id ? { ...s, [field]: value } : s)))
  }

  if (showStudio) {
    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Auto-Split Studio</h1>
            <p className="text-muted-foreground">Configure revenue distribution for your event</p>
          </div>
          <Button variant="outline" onClick={() => setShowStudio(false)}>
            Back to Registry
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - Split Configuration */}
          <div className="col-span-2 space-y-6">
            <Card className="rounded-xl border border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Revenue Splits
                </CardTitle>
                <CardDescription>Define how ticket revenue will be distributed</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {splits.map((split, index) => (
                  <div key={split.id} className="rounded-lg border border-border bg-muted/30 p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-sm font-medium">Stakeholder {index + 1}</span>
                      {splits.length > 2 && (
                        <Button variant="ghost" size="sm" onClick={() => removeSplit(split.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs">Role</Label>
                        <Input
                          value={split.role}
                          onChange={(e) => updateSplit(split.id, "role", e.target.value)}
                          placeholder="e.g., Artist, Venue"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Name</Label>
                        <Input
                          value={split.name}
                          onChange={(e) => updateSplit(split.id, "name", e.target.value)}
                          placeholder="Legal name"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Wallet Address</Label>
                        <Input
                          value={split.wallet}
                          onChange={(e) => updateSplit(split.id, "wallet", e.target.value)}
                          placeholder="0x..."
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Percentage: {split.percentage}%</Label>
                        <Slider
                          value={[split.percentage]}
                          onValueChange={(v) => updateSplit(split.id, "percentage", v[0])}
                          max={100}
                          step={1}
                          className="mt-3"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" onClick={addSplit} className="w-full bg-transparent">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Stakeholder
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Preview */}
          <div className="space-y-6">
            <Card className="rounded-xl border border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Percent className="h-5 w-5" />
                  Split Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex h-8 overflow-hidden rounded-lg">
                    {splits.map((s, i) => {
                      const colors = ["bg-primary", "bg-green-500", "bg-blue-500", "bg-orange-500", "bg-pink-500"]
                      return (
                        <div
                          key={s.id}
                          className={`${colors[i % colors.length]} flex items-center justify-center text-xs font-medium text-white transition-all`}
                          style={{ width: `${s.percentage}%` }}
                        >
                          {s.percentage > 10 && `${s.percentage}%`}
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="space-y-2">
                  {splits.map((s, i) => {
                    const colors = ["bg-primary", "bg-green-500", "bg-blue-500", "bg-orange-500", "bg-pink-500"]
                    return (
                      <div key={s.id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className={`h-3 w-3 rounded-full ${colors[i % colors.length]}`} />
                          <span>{s.role || "Unnamed"}</span>
                        </div>
                        <span className="font-medium">{s.percentage}%</span>
                      </div>
                    )
                  })}
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                  <span className="font-medium">Total</span>
                  <span className={`font-bold ${totalPercentage === 100 ? "text-green-400" : "text-red-400"}`}>
                    {totalPercentage}%
                  </span>
                </div>
                {totalPercentage !== 100 && <p className="mt-2 text-xs text-red-400">Total must equal 100%</p>}
              </CardContent>
            </Card>

            <Card className="rounded-xl border border-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  Settlement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Method</span>
                  <span>USDC on Polygon</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Frequency</span>
                  <span>Per Sale</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Gas Fees</span>
                  <span>~$0.01/tx</span>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full bg-primary" disabled={totalPercentage !== 100}>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Deploy Contract
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Registry View
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">Smart Contracts</h1>
            <Badge variant="outline" className="bg-primary/10 text-primary">
              <Sparkles className="mr-1 h-3 w-3" />
              Registry
            </Badge>
          </div>
          <p className="text-muted-foreground">Manage event-linked smart contracts and revenue distribution</p>
        </div>
        <Button className="bg-primary" onClick={() => setShowStudio(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Contract
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search contracts by event or ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Contracts Table */}
      <Card className="rounded-xl border border-border bg-card">
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Event</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Contract ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Stakeholders</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Settlement</th>
                <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContracts.map((contract) => (
                <tr
                  key={contract.id}
                  className="cursor-pointer border-b border-border transition-colors hover:bg-muted/50"
                  onClick={() => (window.location.href = `/artist/contracts/${contract.id}`)}
                >
                  <td className="px-4 py-4">
                    <div>
                      <p className="font-medium">{contract.eventTitle}</p>
                      <p className="text-sm text-muted-foreground">{contract.eventDate}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <code className="text-sm text-primary">{contract.id}</code>
                  </td>
                  <td className="px-4 py-4">
                    <Badge
                      className={
                        contract.status === "active"
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : contract.status === "draft"
                            ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                            : "bg-orange-500/20 text-orange-400 border-orange-500/30"
                      }
                    >
                      {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex -space-x-2">
                      {contract.stakeholders.slice(0, 3).map((s, i) => (
                        <div
                          key={i}
                          className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium"
                          title={s.name}
                        >
                          {s.role[0]}
                        </div>
                      ))}
                      {contract.stakeholders.length > 3 && (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-primary text-xs font-medium text-white">
                          +{contract.stakeholders.length - 3}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-muted-foreground">{contract.settlementMethod}</span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <Link href={`/artist/contracts/${contract.id}`} onClick={(e) => e.stopPropagation()}>
                      <Button variant="outline" size="sm">
                        <Eye className="mr-1 h-3 w-3" />
                        View
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
