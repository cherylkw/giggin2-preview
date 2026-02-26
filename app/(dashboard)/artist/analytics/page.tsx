"use client"
import { BarChart3, Users, MapPin, TrendingUp, Sparkles, Globe, Search, Share2, Activity, Shield } from "lucide-react"
import { AIBadge } from "@/components/ui/ai-badge"
import { StatCard } from "@/components/ui/stat-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const cityData = [
  { city: "New York", fans: 12500, engagement: 94 },
  { city: "Los Angeles", fans: 9800, engagement: 87 },
  { city: "Chicago", fans: 6200, engagement: 82 },
  { city: "Austin", fans: 5100, engagement: 91 },
  { city: "Seattle", fans: 4300, engagement: 78 },
]

const similarArtists = [
  { name: "Bonobo", overlap: 78 },
  { name: "Tycho", overlap: 72 },
  { name: "Four Tet", overlap: 68 },
  { name: "Jamie xx", overlap: 65 },
]

const discoveryChannels = [
  { source: "Ask Giggin'", percentage: 32 },
  { source: "Pulse™ – For You", percentage: 24 },
  { source: "Pulse™ – Local", percentage: 18 },
  { source: "Pulse™ – Global", percentage: 8 },
  { source: "Shared by Friends", percentage: 10 },
  { source: "Artist Profile", percentage: 5 },
  { source: "External Link", percentage: 3 },
]

const topIntentPhrases = [
  { phrase: "chill electronic set tonight", count: 847 },
  { phrase: "ambient indie vibes under $200 HKD", count: 623 },
  { phrase: "late night electronic near me", count: 512 },
  { phrase: "similar to Tycho this weekend", count: 489 },
  { phrase: "mellow DJ sets downtown", count: 356 },
]

const moodPatterns = [
  { insight: "High engagement when mood was: mellow / chill", percentage: 78 },
  { insight: "Saturday activity spike for 'party' mood", percentage: 65 },
  { insight: "Weekday preference for 'focus' mood", percentage: 52 },
  { insight: "Late-night searches for 'atmospheric' mood", percentage: 44 },
]

const tasteClusterEngagement = [
  { cluster: "Indie Electronic Cluster", engagement: 82 },
  { cluster: "Ambient Night Crowd", engagement: 76 },
  { cluster: "HK After-Work Jazz Cluster", engagement: 68 },
  { cluster: "LA Electronic Underground", engagement: 61 },
]

const socialMetrics = [
  { metric: "Group RSVPs", value: "34%" },
  { metric: "Shared → Views conversion", value: "67%" },
  { metric: "Shared → RSVPs conversion", value: "28%" },
  { metric: "Most effective channel", value: "WhatsApp" },
]

const viralPaths = [
  "Your HK promo was shared 140 times",
  "Friend groups of 3+ generated 22% of total RSVPs",
  "Instagram Stories drove 45% of external traffic",
  "Direct shares outperformed public posts by 3x",
]

const pulseImpact = {
  impressions: { forYou: "12.4K", local: "8.2K", global: "3.1K" },
  clickThroughRate: "8.7%",
  topStories: [
    "Trending: Ambient set in Central tonight",
    "Because you follow Tycho: similar artists in town this weekend",
    "New Release: Luna Eclipse drops surprise EP",
    "Local Buzz: Electronic scene heating up in Wan Chai",
  ],
}

const pulseInsightsData = {
  fanGrowth: {
    current: 45200,
    previous: 41700,
    growthRate: 8.4,
    weeklyGrowth: [
      { week: "W1", fans: 42100 },
      { week: "W2", fans: 42800 },
      { week: "W3", fans: 43500 },
      { week: "W4", fans: 44200 },
      { week: "W5", fans: 45200 },
    ],
    sources: [
      { source: "Pulse™ Discovery", percentage: 42 },
      { source: "Ask Giggin'", percentage: 28 },
      { source: "Friend Referrals", percentage: 18 },
      { source: "External Links", percentage: 12 },
    ],
  },
  pulseEngagement: {
    totalViews: "89.2K",
    saves: "4.8K",
    shares: "2.1K",
    clickThrough: "12.3%",
    breakdown: [
      { type: "Show Announcements", views: 34200, engagement: 78 },
      { type: "New Releases", views: 28100, engagement: 85 },
      { type: "Tour Updates", views: 18400, engagement: 62 },
      { type: "Behind the Scenes", views: 8500, engagement: 91 },
    ],
  },
  moodDistribution: [
    { mood: "Chill / Mellow", percentage: 34, color: "bg-blue-500" },
    { mood: "Energetic / Hype", percentage: 24, color: "bg-orange-500" },
    { mood: "Atmospheric / Ambient", percentage: 22, color: "bg-purple-500" },
    { mood: "Focus / Work", percentage: 12, color: "bg-green-500" },
    { mood: "Party / Social", percentage: 8, color: "bg-pink-500" },
  ],
  tasteClusters: [
    { cluster: "Late Night Electronic", fans: 12400, affinity: 92 },
    { cluster: "Ambient Explorers", fans: 9800, affinity: 87 },
    { cluster: "Indie Crossover", fans: 7200, affinity: 74 },
    { cluster: "Jazz-Influenced Electronic", fans: 5100, affinity: 68 },
    { cluster: "Festival Circuit", fans: 4300, affinity: 61 },
  ],
}

export default function ArtistAnalyticsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Artist Analytics</h1>
        <p className="mt-2 text-muted-foreground">Deep insights into your fanbase powered by the Taste Graph</p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="taste-graph">Taste Graph</TabsTrigger>
          <TabsTrigger value="fan-behavior">Fan Behavior</TabsTrigger>
          <TabsTrigger value="market-insights">Market Insights</TabsTrigger>
          <TabsTrigger value="pulse-insights">Pulse™ Insights</TabsTrigger>
          <TabsTrigger value="fair-access">Fair Access</TabsTrigger>
          <TabsTrigger value="ai-summary">AI Insights</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-8">
          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Total Fans" value="45,200" change="+8.3% this month" changeType="positive" icon={Users} />
            <StatCard
              title="Monthly Listeners"
              value="890K"
              change="+12% vs last month"
              changeType="positive"
              icon={BarChart3}
            />
            <StatCard title="Cities Reached" value="127" icon={Globe} description="Across 23 countries" />
            <StatCard title="Engagement Score" value="87/100" icon={TrendingUp} description="Top 15% of artists" />
          </div>

          {/* Discovery Channels */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* How Fans Found You */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">How Fans Found You</h2>
                  <p className="text-xs text-muted-foreground mt-1">Breakdown of discovery sources across Giggin.</p>
                </div>
                <Search className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-3">
                {discoveryChannels.map((channel) => (
                  <div key={channel.source} className="flex items-center gap-4">
                    <span className="w-32 text-sm text-foreground truncate">{channel.source}</span>
                    <div className="flex-1">
                      <div className="h-5 rounded-full bg-secondary">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                          style={{ width: `${channel.percentage}%` }}
                        />
                      </div>
                    </div>
                    <span className="w-12 text-right text-sm text-muted-foreground">{channel.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Intent Phrases */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Top Intent Phrases</h2>
                  <p className="text-xs text-muted-foreground mt-1">Summarized from Ask Giggin' search intent.</p>
                </div>
                <AIBadge text="NLP Analysis" />
              </div>
              <div className="space-y-3">
                {topIntentPhrases.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-3"
                  >
                    <span className="text-sm text-foreground">"{item.phrase}"</span>
                    <span className="text-sm text-muted-foreground">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Similar Artists */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Fan Overlap with Artists</h2>
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              {similarArtists.map((artist) => (
                <div
                  key={artist.name}
                  className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-3"
                >
                  <span className="font-medium text-foreground">{artist.name}</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-24 rounded-full bg-muted">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${artist.overlap}%` }} />
                    </div>
                    <span className="text-sm text-muted-foreground">{artist.overlap}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Taste Graph Tab */}
        <TabsContent value="taste-graph" className="space-y-8">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Taste Graph Visualization */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">Taste Graph</h2>
                <AIBadge text="Network Analysis" />
              </div>
              <div className="relative h-80 rounded-lg bg-secondary/30">
                {/* Central Node */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                    You
                  </div>
                </div>
                {/* Connected Nodes */}
                {[
                  { label: "Electronic", x: 20, y: 20, size: 16 },
                  { label: "Ambient", x: 75, y: 15, size: 14 },
                  { label: "Indie", x: 85, y: 50, size: 12 },
                  { label: "Jazz", x: 70, y: 80, size: 10 },
                  { label: "Fans", x: 15, y: 70, size: 18 },
                  { label: "NYC", x: 30, y: 85, size: 12 },
                  { label: "LA", x: 55, y: 90, size: 10 },
                ].map((node) => (
                  <div
                    key={node.label}
                    className="absolute flex items-center justify-center rounded-full bg-accent/80 text-accent-foreground text-xs font-medium"
                    style={{
                      left: `${node.x}%`,
                      top: `${node.y}%`,
                      width: `${node.size * 4}px`,
                      height: `${node.size * 4}px`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {node.label}
                  </div>
                ))}
                {/* Connection Lines */}
                <svg className="absolute inset-0 h-full w-full" style={{ pointerEvents: "none" }}>
                  <line x1="50%" y1="50%" x2="20%" y2="20%" stroke="rgba(185, 108, 255, 0.3)" strokeWidth="2" />
                  <line x1="50%" y1="50%" x2="75%" y2="15%" stroke="rgba(185, 108, 255, 0.3)" strokeWidth="2" />
                  <line x1="50%" y1="50%" x2="85%" y2="50%" stroke="rgba(185, 108, 255, 0.3)" strokeWidth="2" />
                  <line x1="50%" y1="50%" x2="15%" y2="70%" stroke="rgba(185, 108, 255, 0.3)" strokeWidth="2" />
                </svg>
              </div>
              <p className="mt-4 text-xs text-muted-foreground text-center">
                Interactive taste graph showing fan connections, genres, and geographic clusters
              </p>
            </div>

            {/* Taste Cluster Insights */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Taste Cluster Insights</h2>
                  <p className="text-xs text-muted-foreground mt-1">Fan segments from the Taste Graph</p>
                </div>
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-3">
                {pulseInsightsData.tasteClusters.map((cluster) => (
                  <div
                    key={cluster.cluster}
                    className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-3"
                  >
                    <div>
                      <span className="font-medium text-foreground">{cluster.cluster}</span>
                      <p className="text-xs text-muted-foreground">{cluster.fans.toLocaleString()} fans</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-20 rounded-full bg-muted">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${cluster.affinity}%` }} />
                      </div>
                      <span className="text-sm text-primary font-medium">{cluster.affinity}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Taste Cluster Engagement */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Taste Cluster Engagement</h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Taste Graph clusters most engaged with your audience.
                </p>
              </div>
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {tasteClusterEngagement.map((cluster) => (
                <div
                  key={cluster.cluster}
                  className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-3"
                >
                  <span className="font-medium text-foreground">{cluster.cluster}</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-24 rounded-full bg-muted">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${cluster.engagement}%` }} />
                    </div>
                    <span className="text-sm text-muted-foreground">{cluster.engagement}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Fan Behavior Tab */}
        <TabsContent value="fan-behavior" className="space-y-8">
          {/* Fan Growth */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Fan Growth</h3>
                <p className="text-xs text-muted-foreground mt-1">New followers from Pulse™ activity</p>
              </div>
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-3xl font-bold text-foreground">
                {pulseInsightsData.fanGrowth.current.toLocaleString()}
              </span>
              <span className="text-sm text-chart-3">+{pulseInsightsData.fanGrowth.growthRate}%</span>
            </div>
            {/* Growth bar chart */}
            <div className="flex items-end gap-1 h-20 mb-4">
              {pulseInsightsData.fanGrowth.weeklyGrowth.map((week) => (
                <div key={week.week} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t bg-gradient-to-t from-primary to-accent"
                    style={{ height: `${((week.fans - 41000) / 5000) * 100}%` }}
                  />
                  <span className="text-xs text-muted-foreground">{week.week}</span>
                </div>
              ))}
            </div>
            {/* Sources */}
            <div className="space-y-2">
              {pulseInsightsData.fanGrowth.sources.map((source) => (
                <div key={source.source} className="flex items-center gap-3">
                  <span className="w-28 text-xs text-muted-foreground truncate">{source.source}</span>
                  <div className="flex-1 h-2 rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${source.percentage}%` }} />
                  </div>
                  <span className="w-8 text-xs text-muted-foreground text-right">{source.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Peak Time & Fan Behavior Insights */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">Fan Behavior Insights</h2>
                <AIBadge text="AI Generated" />
              </div>
              <div className="space-y-4">
                <div className="rounded-lg border border-border bg-secondary/50 p-4">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">People who saved your show also saved:</span>
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {["Bonobo @ Brooklyn Steel", "Tycho @ Terminal 5", "Four Tet @ Avant Gardner"].map((event) => (
                      <span key={event} className="rounded-full bg-primary/20 px-3 py-1 text-xs text-primary">
                        {event}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg border border-border bg-secondary/50 p-4">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">Peak engagement times:</span>
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">Thursday 8-10 PM EST, Saturday 2-4 PM EST</p>
                </div>
                <div className="rounded-lg border border-border bg-secondary/50 p-4">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">Trending signal:</span>
                  </p>
                  <p className="mt-1 text-sm text-chart-3">+23% search volume for your name in Austin this week</p>
                </div>
              </div>
            </div>

            {/* Viral Paths */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Viral Paths</h2>
                  <p className="text-xs text-muted-foreground mt-1">How your events propagate socially.</p>
                </div>
                <Share2 className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-3">
                {viralPaths.map((path, index) => (
                  <div key={index} className="rounded-lg border border-border bg-secondary/50 p-3">
                    <p className="text-sm text-foreground">{path}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* City Engagement Heatmap */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">City-Level Engagement</h2>
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-3">
              {cityData.map((city) => (
                <div key={city.city} className="flex items-center gap-4">
                  <span className="w-24 text-sm text-foreground">{city.city}</span>
                  <div className="flex-1">
                    <div className="h-6 rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                        style={{ width: `${city.engagement}%` }}
                      />
                    </div>
                  </div>
                  <span className="w-16 text-right text-sm text-muted-foreground">{city.fans.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Market Insights Tab */}
        <TabsContent value="market-insights" className="space-y-8">
          {/* Mood Distribution */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Mood Distribution</h3>
                <p className="text-xs text-muted-foreground mt-1">What moods fans associate with your music</p>
              </div>
              <AIBadge text="Sentiment Analysis" />
            </div>
            {/* Mood bar */}
            <div className="flex h-8 rounded-full overflow-hidden mb-4">
              {pulseInsightsData.moodDistribution.map((mood) => (
                <div
                  key={mood.mood}
                  className={`${mood.color} transition-all hover:opacity-80`}
                  style={{ width: `${mood.percentage}%` }}
                  title={`${mood.mood}: ${mood.percentage}%`}
                />
              ))}
            </div>
            {/* Legend */}
            <div className="space-y-2">
              {pulseInsightsData.moodDistribution.map((mood) => (
                <div key={mood.mood} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${mood.color}`} />
                    <span className="text-sm text-foreground">{mood.mood}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{mood.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mood Patterns & Scene Insights */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Mood Patterns */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Mood Patterns</h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    Based on mood signals extracted from fan search patterns.
                  </p>
                </div>
                <Activity className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-3">
                {moodPatterns.map((pattern, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <span className="flex-1 text-sm text-foreground">{pattern.insight}</span>
                    <div className="w-24">
                      <div className="h-2 rounded-full bg-muted">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${pattern.percentage}%` }} />
                      </div>
                    </div>
                    <span className="w-10 text-right text-sm text-muted-foreground">{pattern.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Friends & Group Engagement (Scene Insights) */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Scene Insights</h2>
                  <p className="text-xs text-muted-foreground mt-1">Social sharing and group behavior metrics.</p>
                </div>
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-3">
                {socialMetrics.map((item) => (
                  <div
                    key={item.metric}
                    className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-3"
                  >
                    <span className="text-sm text-foreground">{item.metric}</span>
                    <span className="font-medium text-primary">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Pulse Insights Tab */}
        <TabsContent value="pulse-insights" className="space-y-8">
          {/* Pulse Engagement */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Pulse™ Engagement</h3>
                <p className="text-xs text-muted-foreground mt-1">How fans interact with your Pulse™ content</p>
              </div>
              <Activity className="h-5 w-5 text-primary" />
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              <div className="rounded-lg border border-border bg-secondary/50 p-2 text-center">
                <p className="text-lg font-bold text-foreground">{pulseInsightsData.pulseEngagement.totalViews}</p>
                <p className="text-xs text-muted-foreground">Views</p>
              </div>
              <div className="rounded-lg border border-border bg-secondary/50 p-2 text-center">
                <p className="text-lg font-bold text-foreground">{pulseInsightsData.pulseEngagement.saves}</p>
                <p className="text-xs text-muted-foreground">Saves</p>
              </div>
              <div className="rounded-lg border border-border bg-secondary/50 p-2 text-center">
                <p className="text-lg font-bold text-foreground">{pulseInsightsData.pulseEngagement.shares}</p>
                <p className="text-xs text-muted-foreground">Shares</p>
              </div>
              <div className="rounded-lg border border-border bg-secondary/50 p-2 text-center">
                <p className="text-lg font-bold text-primary">{pulseInsightsData.pulseEngagement.clickThrough}</p>
                <p className="text-xs text-muted-foreground">CTR</p>
              </div>
            </div>
            {/* Breakdown */}
            <div className="space-y-3">
              {pulseInsightsData.pulseEngagement.breakdown.map((item) => (
                <div key={item.type} className="flex items-center gap-3">
                  <span className="w-32 text-sm text-foreground truncate">{item.type}</span>
                  <div className="flex-1 h-4 rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                      style={{ width: `${item.engagement}%` }}
                    />
                  </div>
                  <span className="w-16 text-xs text-muted-foreground text-right">{item.views.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pulse Discovery & CTR */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Pulse Impact Impressions */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-foreground">Pulse™ Discovery</h2>
                <p className="text-xs text-muted-foreground mt-1">Impressions across different Pulse™ feed types</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-3">
                  <span className="text-sm text-muted-foreground">For You Feed</span>
                  <span className="text-lg font-medium text-foreground">{pulseImpact.impressions.forYou}</span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-3">
                  <span className="text-sm text-muted-foreground">Local Feed</span>
                  <span className="text-lg font-medium text-foreground">{pulseImpact.impressions.local}</span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-3">
                  <span className="text-sm text-muted-foreground">Global Feed</span>
                  <span className="text-lg font-medium text-foreground">{pulseImpact.impressions.global}</span>
                </div>
              </div>
            </div>

            {/* Click-through Rate */}
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-foreground">Pulse™ CTR</h2>
                <p className="text-xs text-muted-foreground mt-1">Overall click-through rate across Pulse™</p>
              </div>
              <div className="flex h-32 items-center justify-center rounded-lg border border-border bg-secondary/50">
                <span className="text-5xl font-bold text-primary">{pulseImpact.clickThroughRate}</span>
              </div>
              <p className="mt-3 text-xs text-muted-foreground text-center">Above average for your genre</p>
            </div>
          </div>

          {/* Pulse Impact - Top Stories */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-foreground">Pulse™ Impact</h2>
              <p className="text-xs text-muted-foreground mt-1">Top-performing stories in your Pulse™ feed</p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {pulseImpact.topStories.map((story, index) => (
                <div key={index} className="rounded-lg border border-border bg-secondary/50 p-3">
                  <p className="text-sm text-foreground">{story}</p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Fair Access Tab */}
        <TabsContent value="fair-access" className="space-y-8">
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Bot Detection</h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Fair Access monitoring ensures real fans get tickets
                </p>
              </div>
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-6">
              {/* Bot Detection Stats */}
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-border bg-secondary/50 p-4 text-center">
                  <p className="text-3xl font-bold text-chart-3">99.2%</p>
                  <p className="mt-1 text-sm text-muted-foreground">Real Fan Rate</p>
                </div>
                <div className="rounded-lg border border-border bg-secondary/50 p-4 text-center">
                  <p className="text-3xl font-bold text-destructive">0.8%</p>
                  <p className="mt-1 text-sm text-muted-foreground">Bot Attempts Blocked</p>
                </div>
                <div className="rounded-lg border border-border bg-secondary/50 p-4 text-center">
                  <p className="text-3xl font-bold text-primary">342</p>
                  <p className="mt-1 text-sm text-muted-foreground">Suspicious Activities</p>
                </div>
              </div>

              {/* Protection Features */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-foreground">Active Protections</h3>
                <div className="space-y-2">
                  {[
                    { feature: "Device Fingerprinting", status: "Active", effectiveness: 98 },
                    { feature: "Behavioral Analysis", status: "Active", effectiveness: 96 },
                    { feature: "Rate Limiting", status: "Active", effectiveness: 94 },
                    { feature: "CAPTCHA v3", status: "Active", effectiveness: 92 },
                  ].map((item) => (
                    <div
                      key={item.feature}
                      className="flex items-center justify-between rounded-lg border border-border bg-secondary/50 p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-chart-3" />
                        <span className="text-sm text-foreground">{item.feature}</span>
                        <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs text-primary">
                          {item.status}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">{item.effectiveness}% effective</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Blocks */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-foreground">Recent Bot Blocks</h3>
                <div className="space-y-2">
                  {[
                    { time: "2 hours ago", type: "Multiple Account Detection", blocked: 47 },
                    { time: "5 hours ago", type: "Rapid Purchase Attempts", blocked: 23 },
                    { time: "1 day ago", type: "IP Pattern Match", blocked: 89 },
                  ].map((block, index) => (
                    <div key={index} className="rounded-lg border border-border bg-secondary/50 p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">{block.type}</span>
                        <span className="text-sm text-destructive">{block.blocked} blocked</span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{block.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* AI Insights Summary Tab */}
        <TabsContent value="ai-summary" className="space-y-8">
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">AI Insights Summary</h2>
            </div>
            <div className="space-y-4">
              <div className="rounded-lg border border-border bg-card p-4">
                <h3 className="mb-2 font-medium text-foreground">Fanbase Analysis</h3>
                <p className="text-muted-foreground">
                  Your fanbase is highly engaged in the NYC metro area with strong crossover potential in the
                  ambient/electronic scene. Consider booking shows in Austin where search interest is spiking.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <h3 className="mb-2 font-medium text-foreground">Collaboration Opportunities</h3>
                <p className="text-muted-foreground">
                  Fans who attend your shows have 78% overlap with Bonobo audiences—a potential collaboration or tour
                  pairing opportunity. Similar crossover exists with Tycho (72%) and Four Tet (68%).
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <h3 className="mb-2 font-medium text-foreground">Timing Recommendations</h3>
                <p className="text-muted-foreground">
                  Peak engagement occurs Thursday 8-10 PM EST and Saturday 2-4 PM EST. Schedule announcements and
                  releases during these windows for maximum impact.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <h3 className="mb-2 font-medium text-foreground">Geographic Strategy</h3>
                <p className="text-muted-foreground">
                  Strong presence in New York (12.5K fans, 94% engagement) and Los Angeles (9.8K fans, 87% engagement).
                  Austin shows emerging potential with +23% search volume growth this week.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <h3 className="mb-2 font-medium text-foreground">Mood & Style Insights</h3>
                <p className="text-muted-foreground">
                  Your music resonates most with "Chill/Mellow" moods (34%) and late-night electronic audiences.
                  Consider emphasizing these aspects in your marketing and show design.
                </p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Powered by Giggin&apos;s Reasoning Engine + Taste Graph AI • Last updated: Just now
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      {/* </CHANGE> */}
    </div>
  )
}
