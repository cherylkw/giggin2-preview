"use client"

import { CheckCircle2, Circle, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface ToolCall {
  tool: string
  status: "pending" | "running" | "completed"
  duration?: string
  result?: string
}

interface ToolCallPanelProps {
  calls: ToolCall[]
  title?: string
}

export function ToolCallPanel({ calls, title = "AI Agent Tools" }: ToolCallPanelProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
        <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
        {title}
      </h3>
      <div className="space-y-2">
        {calls.map((call, index) => (
          <div
            key={index}
            className={cn(
              "flex items-start gap-3 rounded-lg border border-border bg-secondary/50 p-3",
              call.status === "completed" && "border-primary/30",
            )}
          >
            <div className="mt-0.5">
              {call.status === "pending" && <Circle className="h-4 w-4 text-muted-foreground" />}
              {call.status === "running" && <Loader2 className="h-4 w-4 animate-spin text-primary" />}
              {call.status === "completed" && <CheckCircle2 className="h-4 w-4 text-chart-3" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <code className="text-xs font-mono text-primary">{call.tool}</code>
                {call.duration && <span className="text-xs text-muted-foreground">{call.duration}</span>}
              </div>
              {call.result && <p className="mt-1 text-xs text-muted-foreground truncate">{call.result}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
