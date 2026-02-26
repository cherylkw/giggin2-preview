"use client"

import { useState } from "react"
import { Shield, ChevronRight, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FairAccessRules {
  maxTicketsPerFan: number
  requireVerifiedEmail: boolean
  requireVerifiedPhone: boolean
  groupBuyVerifiedOnly: boolean
  releaseInWaves: boolean
  nonTransferable: boolean
}

interface FairAccessNoticeProps {
  rules?: FairAccessRules
}

export function FairAccessNotice({ rules }: FairAccessNoticeProps) {
  const [showModal, setShowModal] = useState(false)

  const defaultRules: FairAccessRules = rules || {
    maxTicketsPerFan: 4,
    requireVerifiedEmail: true,
    requireVerifiedPhone: true,
    groupBuyVerifiedOnly: true,
    releaseInWaves: true,
    nonTransferable: true,
  }

  return (
    <>
      {/* Info Bar */}
      <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/30">
        <div className="flex items-center gap-3">
          <Shield className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm font-medium text-foreground">Giggin&apos; Fair Access</p>
            <p className="text-xs text-muted-foreground">
              This event uses Fair Access rules to limit scalpers and protect real fans.
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-primary hover:text-primary hover:bg-primary/20"
          onClick={() => setShowModal(true)}
        >
          View rules
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>

      {/* Rules Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-md mx-4 rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Fair Access Rules</h3>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowModal(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-3">
              <RuleItem label={`Max ${defaultRules.maxTicketsPerFan} tickets per fan`} enabled={true} />
              <RuleItem label="Verified email required" enabled={defaultRules.requireVerifiedEmail} />
              <RuleItem label="Verified phone required" enabled={defaultRules.requireVerifiedPhone} />
              <RuleItem label="Group Buy restricted to verified fans" enabled={defaultRules.groupBuyVerifiedOnly} />
              <RuleItem label="Tickets released in waves" enabled={defaultRules.releaseInWaves} />
            </div>

            <div className="mt-4 p-3 rounded-lg bg-secondary border border-border">
              <p className="text-xs text-muted-foreground">
                <strong className="text-foreground">Note:</strong> Some tickets may be non-transferable or subject to
                limited transfer to reduce resale abuse.
              </p>
            </div>

            <Button className="w-full mt-4" onClick={() => setShowModal(false)}>
              Got it
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

function RuleItem({ label, enabled }: { label: string; enabled: boolean }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
      <div
        className={`flex h-6 w-6 items-center justify-center rounded-full ${enabled ? "bg-green-500/20" : "bg-muted"}`}
      >
        <Check className={`h-4 w-4 ${enabled ? "text-green-400" : "text-muted-foreground"}`} />
      </div>
      <span className="text-sm text-foreground">{label}</span>
    </div>
  )
}
