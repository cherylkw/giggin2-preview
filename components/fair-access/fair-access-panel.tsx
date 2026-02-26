"use client"

import { useState } from "react"
import { Shield, Info, MapPin, Layers, Check, X } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FairAccessSettings {
  maxTicketsPerFan: number
  requireVerifiedEmail: boolean
  requireVerifiedPhone: boolean
  requireBasicProfile: boolean
  enableGroupBuy: boolean
  maxActiveGroupBuys: number
  groupBuyVerifiedOnly: boolean
  prioritizeLocalFans: boolean
  localRadius: number
  releaseInWaves: boolean
  wave1Percent: number
  wave2Percent: number
}

interface FairAccessPanelProps {
  settings?: FairAccessSettings
  onSettingsChange?: (settings: FairAccessSettings) => void
}

export function FairAccessPanel({ settings: initialSettings, onSettingsChange }: FairAccessPanelProps) {
  const [settings, setSettings] = useState<FairAccessSettings>(
    initialSettings || {
      maxTicketsPerFan: 4,
      requireVerifiedEmail: true,
      requireVerifiedPhone: true,
      requireBasicProfile: false,
      enableGroupBuy: false,
      maxActiveGroupBuys: 1,
      groupBuyVerifiedOnly: true,
      prioritizeLocalFans: false,
      localRadius: 25,
      releaseInWaves: false,
      wave1Percent: 40,
      wave2Percent: 40,
    },
  )

  const updateSetting = <K extends keyof FairAccessSettings>(key: K, value: FairAccessSettings[K]) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onSettingsChange?.(newSettings)
  }

  const reservedPercent = 100 - settings.wave1Percent - settings.wave2Percent

  // Calculate summary status
  const summaryItems = [
    { label: "Ticket limit set", enabled: settings.maxTicketsPerFan <= 6 },
    { label: "Verified checks enabled", enabled: settings.requireVerifiedEmail || settings.requireVerifiedPhone },
    { label: "Group Buy protected", enabled: !settings.enableGroupBuy || settings.groupBuyVerifiedOnly },
    { label: "Location priority", enabled: settings.prioritizeLocalFans },
    { label: "Wave release", enabled: settings.releaseInWaves },
  ]

  return (
    <div className="rounded-xl border border-border bg-secondary/50 p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
          <Shield className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Fair Access & Anti-Scalper Rules</h3>
          <p className="text-sm text-muted-foreground">Protect real fans from bots and scalpers</p>
        </div>
      </div>

      {/* Ticket Purchase Limits */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Label className="font-medium text-foreground">Ticket Purchase Limits</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">Limits how many tickets one account can buy for this event.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex items-center gap-4">
          <Label className="text-sm text-muted-foreground whitespace-nowrap">Max tickets per fan:</Label>
          <Slider
            value={[settings.maxTicketsPerFan]}
            onValueChange={(val) => updateSetting("maxTicketsPerFan", val[0])}
            min={1}
            max={8}
            step={1}
            className="flex-1 max-w-xs"
          />
          <span className="text-sm font-medium text-foreground w-8 text-center">{settings.maxTicketsPerFan}</span>
        </div>
      </div>

      {/* Verified Fan Requirements */}
      <div className="space-y-3 pt-4 border-t border-border">
        <Label className="font-medium text-foreground">Verified Fan Requirements</Label>
        <p className="text-xs text-muted-foreground">Fans must meet these checks before they can complete checkout.</p>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm text-muted-foreground">Require verified email</Label>
            <Switch
              checked={settings.requireVerifiedEmail}
              onCheckedChange={(checked) => updateSetting("requireVerifiedEmail", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-sm text-muted-foreground">Require verified phone</Label>
            <Switch
              checked={settings.requireVerifiedPhone}
              onCheckedChange={(checked) => updateSetting("requireVerifiedPhone", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-sm text-muted-foreground">Require basic profile setup</Label>
            <Switch
              checked={settings.requireBasicProfile}
              onCheckedChange={(checked) => updateSetting("requireBasicProfile", checked)}
            />
          </div>
        </div>
      </div>

      {/* Group Buy Protection */}
      <div className="space-y-3 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div>
            <Label className="font-medium text-foreground">Group Buy Protection</Label>
            <p className="text-xs text-muted-foreground mt-1">Prevents fake accounts from abusing group discounts.</p>
          </div>
          <Switch
            checked={settings.enableGroupBuy}
            onCheckedChange={(checked) => updateSetting("enableGroupBuy", checked)}
          />
        </div>
        {settings.enableGroupBuy && (
          <div className="ml-4 pl-4 border-l-2 border-primary/30 space-y-3">
            <div className="flex items-center gap-4">
              <Label className="text-sm text-muted-foreground whitespace-nowrap">Max active group buys per fan:</Label>
              <Select
                value={String(settings.maxActiveGroupBuys)}
                onValueChange={(val) => updateSetting("maxActiveGroupBuys", Number(val))}
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-sm text-muted-foreground">Group Buy only for verified fans</Label>
              <Switch
                checked={settings.groupBuyVerifiedOnly}
                onCheckedChange={(checked) => updateSetting("groupBuyVerifiedOnly", checked)}
              />
            </div>
          </div>
        )}
      </div>

      {/* Location Priority */}
      <div className="space-y-3 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            <div>
              <Label className="font-medium text-foreground">Location Priority</Label>
              <p className="text-xs text-muted-foreground mt-1">Gives earlier access to fans near the venue.</p>
            </div>
          </div>
          <Switch
            checked={settings.prioritizeLocalFans}
            onCheckedChange={(checked) => updateSetting("prioritizeLocalFans", checked)}
          />
        </div>
        {settings.prioritizeLocalFans && (
          <div className="ml-4 pl-4 border-l-2 border-primary/30">
            <div className="flex items-center gap-4">
              <Label className="text-sm text-muted-foreground whitespace-nowrap">Local radius:</Label>
              <Select
                value={String(settings.localRadius)}
                onValueChange={(val) => updateSetting("localRadius", Number(val))}
              >
                <SelectTrigger className="w-28">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 km</SelectItem>
                  <SelectItem value="25">25 km</SelectItem>
                  <SelectItem value="50">50 km</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>

      {/* Release Waves */}
      <div className="space-y-3 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-primary" />
            <div>
              <Label className="font-medium text-foreground">Release Tickets in Waves</Label>
              <p className="text-xs text-muted-foreground mt-1">Helps stop bots from buying everything at launch.</p>
            </div>
          </div>
          <Switch
            checked={settings.releaseInWaves}
            onCheckedChange={(checked) => updateSetting("releaseInWaves", checked)}
          />
        </div>
        {settings.releaseInWaves && (
          <div className="ml-4 pl-4 border-l-2 border-primary/30 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Wave 1</span>
                <span className="text-foreground font-medium">{settings.wave1Percent}%</span>
              </div>
              <Slider
                value={[settings.wave1Percent]}
                onValueChange={(val) => updateSetting("wave1Percent", val[0])}
                min={10}
                max={80}
                step={5}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Wave 2</span>
                <span className="text-foreground font-medium">{settings.wave2Percent}%</span>
              </div>
              <Slider
                value={[settings.wave2Percent]}
                onValueChange={(val) => updateSetting("wave2Percent", val[0])}
                min={10}
                max={80}
                step={5}
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Reserved</span>
              <span className="text-primary font-medium">{reservedPercent}% (auto-calculated)</span>
            </div>
          </div>
        )}
      </div>

      {/* Fair Access Summary */}
      <div className="pt-4 border-t border-border">
        <Label className="font-medium text-foreground mb-3 block">Fair Access Summary</Label>
        <div className="grid gap-2 sm:grid-cols-2">
          {summaryItems.map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                item.enabled ? "bg-green-500/10 text-green-400" : "bg-secondary text-muted-foreground"
              }`}
            >
              {item.enabled ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
