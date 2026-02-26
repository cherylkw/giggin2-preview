"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  FileText,
  Users,
  Wallet,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
  Download,
  Edit,
  Send,
} from "lucide-react"

interface Stakeholder {
  role: string
  name: string
  wallet: string
  percentage: number
}

interface Contract {
  id: string
  eventId: number
  eventTitle: string
  eventDate: string
  status: string
  createdAt: string
  stakeholders: Stakeholder[]
  settlementMethod: string
  payoutFrequency: string
  totalRevenue: number
  totalDistributed: number
}

export function ContractDetailClient({ contract }: { contract: Contract }) {
  const [copied, setCopied] = useState<string | null>(null)

  const statusColors: Record<string, string> = {
    active: "bg-green-500/20 text-green-400 border-green-500/30",
    draft: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    pending: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    completed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(null), 2000)
  }

  const distributedPercentage =
    contract.totalRevenue > 0 ? (contract.totalDistributed / contract.totalRevenue) * 100 : 0

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/artist/contracts"
            className="mb-2 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Contracts
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">{contract.eventTitle}</h1>
            <Badge className={statusColors[contract.status]}>
              {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
            </Badge>
          </div>
          <p className="mt-1 text-muted-foreground">
            Contract {contract.id} • Event Date: {contract.eventDate}
          </p>
        </div>
        <div className="flex gap-2">
          {contract.status === "draft" && (
            <>
              <Button variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button className="bg-primary">
                <Send className="mr-2 h-4 w-4" />
                Send for Approval
              </Button>
            </>
          )}
          {contract.status === "active" && (
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
          )}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="rounded-xl border border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Contract ID</p>
                <p className="font-semibold">{contract.id}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-xl border border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/20">
                <DollarSign className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="font-semibold">${contract.totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-xl border border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20">
                <Users className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Stakeholders</p>
                <p className="font-semibold">{contract.stakeholders.length} Parties</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-xl border border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/20">
                <Wallet className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Settlement</p>
                <p className="font-semibold">{contract.settlementMethod}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - Contract Details */}
        <div className="col-span-2 space-y-6">
          {/* Stakeholders */}
          <Card className="rounded-xl border border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Stakeholders & Revenue Split
              </CardTitle>
              <CardDescription>Parties involved in this contract and their share</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Visual Split Bar */}
              <div className="mb-6">
                <div className="flex h-8 overflow-hidden rounded-lg">
                  {contract.stakeholders.map((s, i) => {
                    const colors = ["bg-primary", "bg-green-500", "bg-blue-500", "bg-orange-500", "bg-pink-500"]
                    return (
                      <div
                        key={s.name}
                        className={`${colors[i % colors.length]} flex items-center justify-center text-xs font-medium text-white`}
                        style={{ width: `${s.percentage}%` }}
                      >
                        {s.percentage}%
                      </div>
                    )
                  })}
                </div>
                <div className="mt-2 flex flex-wrap gap-3">
                  {contract.stakeholders.map((s, i) => {
                    const colors = ["bg-primary", "bg-green-500", "bg-blue-500", "bg-orange-500", "bg-pink-500"]
                    return (
                      <div key={s.name} className="flex items-center gap-1.5 text-xs">
                        <div className={`h-2.5 w-2.5 rounded-full ${colors[i % colors.length]}`} />
                        <span className="text-muted-foreground">{s.name}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Stakeholder Cards */}
              <div className="space-y-3">
                {contract.stakeholders.map((stakeholder, index) => (
                  <div
                    key={stakeholder.name}
                    className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 font-semibold text-primary">
                        {stakeholder.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="font-medium">{stakeholder.name}</p>
                        <p className="text-sm text-muted-foreground">{stakeholder.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Wallet</p>
                        <div className="flex items-center gap-1">
                          <code className="text-xs">{stakeholder.wallet}</code>
                          <button
                            onClick={() => copyToClipboard(stakeholder.wallet, stakeholder.name)}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            {copied === stakeholder.name ? (
                              <CheckCircle2 className="h-3 w-3 text-green-400" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Share</p>
                        <p className="text-xl font-bold text-primary">{stakeholder.percentage}%</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Earnings</p>
                        <p className="font-semibold text-green-400">
                          ${((contract.totalRevenue * stakeholder.percentage) / 100).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Settlement History */}
          <Card className="rounded-xl border border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Settlement History
              </CardTitle>
              <CardDescription>Transaction history and payout records</CardDescription>
            </CardHeader>
            <CardContent>
              {contract.totalDistributed > 0 ? (
                <div className="space-y-3">
                  {[
                    { date: "2025-01-15", amount: 15000, status: "completed", tx: "0xabc...123" },
                    { date: "2025-01-14", amount: 12000, status: "completed", tx: "0xdef...456" },
                    { date: "2025-01-13", amount: 11250, status: "completed", tx: "0xghi...789" },
                  ].map((tx, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg border border-border p-3">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-400" />
                        <div>
                          <p className="font-medium">${tx.amount.toLocaleString()} distributed</p>
                          <p className="text-sm text-muted-foreground">{tx.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <code className="text-xs text-muted-foreground">{tx.tx}</code>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <AlertCircle className="mb-2 h-8 w-8 text-muted-foreground" />
                  <p className="text-muted-foreground">No settlements yet</p>
                  <p className="text-sm text-muted-foreground">
                    Transactions will appear here after ticket sales begin
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Summary & Actions */}
        <div className="space-y-6">
          {/* Contract Terms */}
          <Card className="rounded-xl border border-border bg-card">
            <CardHeader>
              <CardTitle>Contract Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Settlement Method</span>
                <span className="font-medium">{contract.settlementMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payout Frequency</span>
                <span className="font-medium">{contract.payoutFrequency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created</span>
                <span className="font-medium">{contract.createdAt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Event Date</span>
                <span className="font-medium">{contract.eventDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Network</span>
                <span className="font-medium">Polygon (MATIC)</span>
              </div>
            </CardContent>
          </Card>

          {/* Distribution Progress */}
          <Card className="rounded-xl border border-border bg-card">
            <CardHeader>
              <CardTitle>Distribution Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-muted-foreground">Distributed</span>
                  <span className="font-medium">{distributedPercentage.toFixed(0)}%</span>
                </div>
                <Progress value={distributedPercentage} className="h-2" />
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-lg font-semibold">${contract.totalRevenue.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Distributed</p>
                  <p className="text-lg font-semibold text-green-400">${contract.totalDistributed.toLocaleString()}</p>
                </div>
              </div>
              <div className="pt-2">
                <p className="text-sm text-muted-foreground">Remaining</p>
                <p className="text-lg font-semibold text-orange-400">
                  ${(contract.totalRevenue - contract.totalDistributed).toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="rounded-xl border border-border bg-card">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Calendar className="mr-2 h-4 w-4" />
                View Event
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <FileText className="mr-2 h-4 w-4" />
                View Full Contract
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <ExternalLink className="mr-2 h-4 w-4" />
                View on Blockchain
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
