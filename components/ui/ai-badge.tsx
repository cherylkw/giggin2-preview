import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface AIBadgeProps {
  text?: string
  className?: string
}

export function AIBadge({ text = "AI Powered", className }: AIBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-primary/20 px-2.5 py-1 text-xs font-medium text-primary",
        className,
      )}
    >
      <Sparkles className="h-3 w-3" />
      {text}
    </div>
  )
}
