"use client"

import { useState, useEffect, createContext, useContext } from "react"
import { useSearchParams } from "next/navigation"
import { Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

const VALID_CODES = new Set([
  "K7M4X2",
  "T9Q3L8",
  "R6V2P5",
  "Z4N8K1",
  "J8X3W6",
  "L2R9T4",
  "M5Q7V1",
  "X3K8N2",
  "P6T4Z9",
  "W9L2R7",
])

const AccessContext = createContext<{ code: string | null }>({ code: null })
export const useAccessCode = () => useContext(AccessContext)

type GateState = "loading" | "restricted" | "entry" | "granted"

export function AccessGate({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams()
  const code = searchParams.get("code")
  const [state, setState] = useState<GateState>("loading")

  useEffect(() => {
    if (!code || !VALID_CODES.has(code.toUpperCase())) {
      setState("restricted")
      return
    }
    // Check if already granted in this session
    const storedCode = sessionStorage.getItem("giggin-access-granted")
    if (storedCode === code.toUpperCase()) {
      setState("granted")
    } else {
      setState("entry")
    }
  }, [code])

  const handleEnter = () => {
    if (validCode) {
      sessionStorage.setItem("giggin-access-granted", validCode)
    }
    setState("granted")
  }

  const validCode = code?.toUpperCase() ?? null

  // Loading state
  if (state === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  // Access Restricted
  if (state === "restricted") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
        <div className="flex max-w-md flex-col items-center text-center">
          <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card">
            <Shield className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Strictly Confidential
          </p>
          <h1 className="mb-6 text-2xl font-bold text-foreground sm:text-3xl">
            Access Restricted
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground">
            This preview is private and access is restricted.
          </p>
        </div>
      </div>
    )
  }

  // Entry Screen
  if (state === "entry") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
        <div className="flex max-w-lg flex-col items-center text-center">
          <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Private Preview
          </p>
          <h1 className="mb-6 text-2xl font-bold text-foreground sm:text-3xl text-balance">
            Strictly Confidential
          </h1>
          <div className="mb-10 space-y-3 text-base leading-relaxed text-muted-foreground">
            <p>
              This preview is strictly confidential and for private viewing only.
            </p>
            <p>
              Please do not share, screenshot, or record.
            </p>
            <p className="text-sm">
              Access is traceable via your Access ID.
            </p>
          </div>
          <Button
            size="lg"
            className="min-w-[200px] bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={handleEnter}
          >
            Enter Preview
          </Button>
          <p className="mt-6 text-xs text-muted-foreground/60">
            Access ID: {validCode}
          </p>
        </div>
      </div>
    )
  }

  // Granted - render app with watermarks
  return (
    <AccessContext.Provider value={{ code: validCode }}>
      <div className="relative min-h-screen">
        {/* Background watermark overlay */}
        <div
          className="pointer-events-none fixed inset-0 z-[60] select-none overflow-hidden"
          aria-hidden="true"
        >
          <div className="flex h-full w-full -rotate-[25deg] scale-150 flex-col items-center justify-center gap-48 opacity-[0.03]">
            {Array.from({ length: 8 }).map((_, i) => (
              <p
                key={i}
                className="whitespace-nowrap text-2xl font-bold uppercase tracking-[0.3em] text-foreground"
              >
                STRICTLY CONFIDENTIAL PRIVATE PREVIEW
              </p>
            ))}
          </div>
        </div>

        {/* App content */}
        {children}

        {/* Persistent footer watermark */}
        <div className="fixed bottom-0 left-0 right-0 z-[55] flex items-center justify-center bg-background/80 py-1.5 backdrop-blur-sm border-t border-border/50">
          <p className="text-xs text-muted-foreground/70 tracking-wide">
            Private Preview &bull; Access ID: {validCode}
          </p>
        </div>
      </div>
    </AccessContext.Provider>
  )
}
