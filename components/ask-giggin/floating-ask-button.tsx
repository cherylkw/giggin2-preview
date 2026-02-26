"use client"

import { useState } from "react"
import { Sparkles, X, Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useRouter, usePathname } from "next/navigation"
import { processQuery } from "@/lib/ask-giggin-engine"

export function FloatingAskButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const getUserRole = (): "fan" | "artist" | "venue" | "promoter" | "admin" => {
    if (pathname.startsWith("/artist")) return "artist"
    if (pathname.startsWith("/venue")) return "venue"
    if (pathname.startsWith("/promoter")) return "promoter"
    if (pathname.startsWith("/admin")) return "admin"
    return "fan"
  }

  const handleQuickQuery = async () => {
    if (!query.trim()) return

    setIsProcessing(true)

    // Quick processing
    const userRole = getUserRole()
    const result = await processQuery(query, userRole)

    // Navigate to Ask Giggin' page with query
    const askPath = `/${userRole}/ask`
    router.push(`${askPath}?q=${encodeURIComponent(query)}`)

    setIsProcessing(false)
    setIsOpen(false)
    setQuery("")
  }

  const handleOpenFullPage = () => {
    const userRole = getUserRole()
    router.push(`/${userRole}/ask`)
    setIsOpen(false)
  }

  // Don't show on Ask Giggin' pages
  if (pathname.includes("/ask")) {
    return null
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:scale-110 hover:shadow-xl",
          isOpen && "rotate-90",
        )}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Sparkles className="h-6 w-6" />}
      </button>

      {/* Quick Query Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 animate-in slide-in-from-bottom-4 fade-in duration-200">
          <div className="rounded-xl border border-border bg-card shadow-2xl">
            <div className="border-b border-border p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground">Ask Giggin&apos;</h3>
              </div>
              <p className="text-xs text-muted-foreground">Get instant answers about events, artists, and more</p>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex gap-2">
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleQuickQuery()}
                  placeholder="Ask anything..."
                  className="flex-1"
                  disabled={isProcessing}
                />
                <Button onClick={handleQuickQuery} disabled={isProcessing || !query.trim()} size="icon">
                  {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs bg-transparent"
                onClick={handleOpenFullPage}
              >
                Open Full Experience
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
