"use client"

import { useState } from "react"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PersistentAskGiggin } from "@/components/chat/persistent-ask-giggin"

export function FloatingAskButton() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 left-6 z-40 h-14 gap-2 bg-primary text-primary-foreground shadow-2xl hover:bg-primary/90 hover:scale-105 transition-all rounded-full px-6"
      >
        <Sparkles className="h-5 w-5" />
        <span className="font-medium">Ask Giggin'</span>
      </Button>

      <PersistentAskGiggin isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  )
}
