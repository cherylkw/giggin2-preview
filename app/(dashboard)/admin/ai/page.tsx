"use client"

import { Bot, Activity, Cpu, Clock, CheckCircle2, AlertTriangle } from "lucide-react"
import { AIBadge } from "@/components/ui/ai-badge"
import { StatCard } from "@/components/ui/stat-card"

const aiModels = [
  { name: "Taste Graph Engine", status: "healthy", latency: "45ms", requests: "1.2M/day" },
  { name: "Demand Prediction", status: "healthy", latency: "120ms", requests: "450K/day" },
  { name: "Price Optimization", status: "warning", latency: "280ms", requests: "180K/day" },
  { name: "Recommendation Engine", status: "healthy", latency: "65ms", requests: "2.8M/day" },
]

export default function AIMonitoringPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">AI System Monitoring</h1>
        <p className="mt-2 text-muted-foreground">Monitor AI model performance and health</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Requests" value="4.6M/day" icon={Activity} />
        <StatCard title="Avg. Latency" value="89ms" icon={Clock} />
        <StatCard title="Success Rate" value="99.8%" icon={CheckCircle2} />
        <StatCard title="GPU Utilization" value="67%" icon={Cpu} />
      </div>

      {/* AI Models Status */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">AI Models</h2>
          <AIBadge text="Real-time monitoring" />
        </div>
        <div className="space-y-3">
          {aiModels.map((model) => (
            <div
              key={model.name}
              className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-4"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{model.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Latency: {model.latency} • {model.requests}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {model.status === "healthy" ? (
                  <CheckCircle2 className="h-5 w-5 text-chart-3" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-chart-4" />
                )}
                <span
                  className={`text-sm font-medium capitalize ${
                    model.status === "healthy" ? "text-chart-3" : "text-chart-4"
                  }`}
                >
                  {model.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reasoning Engine */}
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
        <div className="flex items-center gap-3 mb-3">
          <Bot className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">Giggin&apos;s Reasoning Engine</h3>
        </div>
        <p className="text-muted-foreground">
          The Reasoning Engine combines multiple AI models to provide intelligent recommendations, demand predictions,
          and automated pricing. Currently processing 4.6M requests daily with 99.8% success rate.
        </p>
        <p className="mt-3 text-xs text-muted-foreground">Powered by Giggin&apos;s Reasoning Engine + Taste Graph AI</p>
      </div>
    </div>
  )
}
