"use client"
import { BarChart3, Users, TrendingUp, Sparkles, Globe, Search, Share2, Activity, Shield, Info } from "lucide-react"
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

export default function ArtistInsightsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Artist Insights</h1>
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
          <div className="mb-6 rounded-lg border border-border bg-secondary/30 p-4">
            <p className="text-sm text-muted-foreground">
              Shows how strongly your music connects with different fan taste clusters based on listening behavior and
              event engagement.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {tasteClusterEngagement.map((cluster) => (
              <div key={cluster.cluster} className="rounded-xl border border-border bg-card p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-medium text-muted-foreground">{cluster.cluster}</h3>
                  <div className="group relative">
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                    <div className="absolute right-0 top-6 z-10 hidden w-64 rounded-lg border border-border bg-popover p-3 text-xs text-popover-foreground shadow-lg group-hover:block">
                      Calculated from saves, listens, event interest, and repeat engagement
                    </div>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="text-3xl font-bold text-foreground">{cluster.engagement}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-medium text-primary">Taste Affinity Score</div>
                  <p className="text-xs text-muted-foreground">
                    {cluster.engagement >= 80 ? "High" : cluster.engagement >= 60 ? "Moderate" : "Developing"} alignment
                    with this fan taste cluster
                  </p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Fan Behavior Tab */}
        <TabsContent value="fan-behavior" className="space-y-8">
          <div className="mb-6 rounded-lg border border-border bg-secondary/30 p-4">
            <p className="text-sm text-muted-foreground">
              Relative activity patterns compared to your average fan baseline, showing when and how fans engage.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {moodPatterns.map((pattern) => (
              <div key={pattern.insight} className="rounded-xl border border-border bg-card p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-medium text-muted-foreground">{pattern.insight}</h3>
                  <div className="group relative">
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                    <div className="absolute right-0 top-6 z-10 hidden w-64 rounded-lg border border-border bg-popover p-3 text-xs text-popover-foreground shadow-lg group-hover:block">
                      Based on time-of-day activity, repeat visits, and interaction depth
                    </div>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="text-3xl font-bold text-foreground">{pattern.percentage}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-medium text-primary">Engagement Index</div>
                  <p className="text-xs text-muted-foreground">
                    {pattern.percentage >= 70
                      ? "Significantly more"
                      : pattern.percentage >= 50
                        ? "Moderately more"
                        : "Slightly more"}{" "}
                    active in this context
                  </p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Market Insights Tab */}
        <TabsContent value="market-insights" className="space-y-8">
          <div className="mb-6 rounded-lg border border-border bg-secondary/30 p-4">
            <p className="text-sm text-muted-foreground">
              Shows where your most engaged audiences are concentrated geographically.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {cityData.map((city) => (
              <div key={city.city} className="rounded-xl border border-border bg-card p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-medium text-muted-foreground">{city.city}</h3>
                  <div className="group relative">
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                    <div className="absolute right-0 top-6 z-10 hidden w-64 rounded-lg border border-border bg-popover p-3 text-xs text-popover-foreground shadow-lg group-hover:block">
                      Fans who searched, saved, or interacted with your events in this region
                    </div>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="text-3xl font-bold text-foreground">{city.fans.toLocaleString()}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-medium text-primary">Active Fan Count</div>
                  <p className="text-xs text-muted-foreground">Engagement Rate: {city.engagement}%</p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Pulse™ Insights Tab */}
        <TabsContent value="pulse-insights" className="space-y-8">
          <div className="mb-6 rounded-lg border border-border bg-secondary/30 p-4">
            <p className="text-sm text-muted-foreground">
              Track fanbase growth, content engagement, and emotional connection through Pulse™ discovery and
              interactions.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Fanbase Growth & Activity</h3>
              <p className="text-sm text-muted-foreground">Is my fanbase growing?</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-medium text-muted-foreground">Total Followers</h3>
                  <div className="group relative">
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                    <div className="absolute right-0 top-6 z-10 hidden w-64 rounded-lg border border-border bg-popover p-3 text-xs text-popover-foreground shadow-lg group-hover:block">
                      Total fans following your profile, includes follows from Pulse™, event discovery, and shares
                    </div>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="text-3xl font-bold text-foreground">
                    {pulseInsightsData.fanGrowth.current.toLocaleString()}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-medium text-primary">Fan Growth</div>
                  <p className="text-xs text-green-500">
                    +{pulseInsightsData.fanGrowth.growthRate.toFixed(1)}% (last 30 days)
                  </p>
                </div>
              </div>

              {pulseInsightsData.fanGrowth.weeklyGrowth.map((growth, index) => (
                <div key={growth.week} className="rounded-xl border border-border bg-card p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-sm font-medium text-muted-foreground">{growth.week}</h3>
                    <div className="group relative">
                      <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                      <div className="absolute right-0 top-6 z-10 hidden w-64 rounded-lg border border-border bg-popover p-3 text-xs text-popover-foreground shadow-lg group-hover:block">
                        {index === 0 ? "Most recent 7 days" : `${index + 1} weeks ago`}
                      </div>
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="text-3xl font-bold text-foreground">{growth.fans.toLocaleString()}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-medium text-primary">Weekly Active Fans (Rolling)</div>
                    <p className="text-xs text-muted-foreground">
                      {index === 0 ? "W1 = most recent 7 days" : `W${index + 1} = ${index + 1} weeks ago`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Content Engagement</h3>
              <p className="text-sm text-muted-foreground">How fans interact with your content, events, and updates.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-medium text-muted-foreground">Total Views</h3>
                  <Search className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="mb-2">
                  <div className="text-3xl font-bold text-foreground">
                    {pulseInsightsData.pulseEngagement.totalViews}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-medium text-primary">Views</div>
                  <p className="text-xs text-muted-foreground">Total impressions on your content</p>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-medium text-muted-foreground">Saves</h3>
                  <div className="flex items-center gap-2">
                    <div className="group relative">
                      <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                      <div className="absolute right-0 top-6 z-10 hidden w-64 rounded-lg border border-border bg-popover p-3 text-xs text-popover-foreground shadow-lg group-hover:block">
                        Number of users who bookmarked your content or events
                      </div>
                    </div>
                    <Share2 className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
                <div className="mb-2">
                  <div className="text-3xl font-bold text-foreground">{pulseInsightsData.pulseEngagement.saves}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-medium text-primary">Bookmarks</div>
                  <p className="text-xs text-muted-foreground">Intent to attend signal</p>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-medium text-muted-foreground">Shares</h3>
                  <div className="flex items-center gap-2">
                    <div className="group relative">
                      <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                      <div className="absolute right-0 top-6 z-10 hidden w-64 rounded-lg border border-border bg-popover p-3 text-xs text-popover-foreground shadow-lg group-hover:block">
                        Times your content was shared to friends or external platforms
                      </div>
                    </div>
                    <Activity className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
                <div className="mb-2">
                  <div className="text-3xl font-bold text-foreground">{pulseInsightsData.pulseEngagement.shares}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-medium text-primary">Social Reach</div>
                  <p className="text-xs text-muted-foreground">Viral amplification</p>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-card p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-medium text-muted-foreground">Click-Through Rate</h3>
                  <div className="flex items-center gap-2">
                    <div className="group relative">
                      <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                      <div className="absolute right-0 top-6 z-10 hidden w-64 rounded-lg border border-border bg-popover p-3 text-xs text-popover-foreground shadow-lg group-hover:block">
                        Percentage of views that resulted in a click (to profile, event page, or ticket link)
                      </div>
                    </div>
                    <Shield className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
                <div className="mb-2">
                  <div className="text-3xl font-bold text-foreground">
                    {pulseInsightsData.pulseEngagement.clickThrough}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-medium text-primary">CTR</div>
                  <p className="text-xs text-muted-foreground">Views → Actions</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Fan Mood Distribution</h3>
              <p className="text-sm text-muted-foreground">
                Derived from fan search intent, event interactions, listening behavior, and Pulse™ engagement.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {pulseInsightsData.moodDistribution.map((mood) => (
                <div key={mood.mood} className="rounded-xl border border-border bg-card p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-sm font-medium text-muted-foreground">{mood.mood}</h3>
                    <TrendingUp className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="mb-2">
                    <div className="text-3xl font-bold text-foreground">{mood.percentage}%</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-medium text-primary">Mood Affinity</div>
                    <p className="text-xs text-muted-foreground">Why fans connect emotionally</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Fair Access Tab */}
        <TabsContent value="fair-access" className="space-y-8">
          <div className="mb-6 rounded-lg border border-border bg-secondary/30 p-4">
            <p className="text-sm text-muted-foreground">
              Measures how group sharing and friend invites translate into views and RSVPs.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {socialMetrics.map((metric) => (
              <div key={metric.metric} className="rounded-xl border border-border bg-card p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-medium text-muted-foreground">{metric.metric}</h3>
                  <div className="group relative">
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                    <div className="absolute right-0 top-6 z-10 hidden w-64 rounded-lg border border-border bg-popover p-3 text-xs text-popover-foreground shadow-lg group-hover:block">
                      {metric.metric.includes("conversion")
                        ? "From share → action"
                        : metric.metric === "Group RSVPs"
                          ? "Percentage of total RSVPs from groups of 2+"
                          : "Primary platform for event sharing"}
                    </div>
                  </div>
                </div>
                <div className="mb-2">
                  <div className="text-3xl font-bold text-foreground">{metric.value}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-medium text-primary">
                    {metric.metric.includes("conversion") ? "Conversion Rate" : "Share Metric"}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {metric.metric === "Shared → Views conversion"
                      ? "Group shares significantly outperform solo discovery"
                      : metric.metric === "Shared → RSVPs conversion"
                        ? "Strong intent signal when friends share"
                        : metric.metric === "Group RSVPs"
                          ? "Social proof drives discovery"
                          : "Most effective sharing channel"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* AI Insights Tab */}
        <TabsContent value="ai-summary" className="space-y-8">
          <div className="mb-6 rounded-lg border border-border bg-secondary/30 p-4">
            <p className="text-sm text-muted-foreground">
              AI-detected patterns in your fan behavior with actionable recommendations.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-3 flex items-center gap-2">
                <AIBadge text="AI Insight" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-foreground">
                Direct shares outperform public posts by 3×
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="mb-1 text-xs font-medium text-primary">Pattern</div>
                  <p className="text-muted-foreground">
                    Private sharing through WhatsApp and DMs generates significantly higher conversion rates than public
                    social posts
                  </p>
                </div>
                <div>
                  <div className="mb-1 text-xs font-medium text-primary">Implication</div>
                  <p className="text-muted-foreground">
                    Your fans trust friend recommendations more than algorithm-driven discovery
                  </p>
                </div>
                <div>
                  <div className="mb-1 text-xs font-medium text-primary">Suggested Action</div>
                  <p className="text-foreground">Prioritize private sharing prompts after fans RSVP or save an event</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-3 flex items-center gap-2">
                <AIBadge text="AI Insight" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-foreground">
                Friend groups of 3+ generated 22% of total RSVPs
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="mb-1 text-xs font-medium text-primary">Pattern</div>
                  <p className="text-muted-foreground">
                    Groups making collective decisions drive disproportionate engagement
                  </p>
                </div>
                <div>
                  <div className="mb-1 text-xs font-medium text-primary">Implication</div>
                  <p className="text-muted-foreground">Social coordination is a key driver of your event attendance</p>
                </div>
                <div>
                  <div className="mb-1 text-xs font-medium text-primary">Suggested Action</div>
                  <p className="text-foreground">Enable group ticketing features and group discount prompts</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-3 flex items-center gap-2">
                <AIBadge text="AI Insight" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-foreground">Your HK promo was shared 140 times</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="mb-1 text-xs font-medium text-primary">Pattern</div>
                  <p className="text-muted-foreground">
                    Regional events generate strong organic sharing within local networks
                  </p>
                </div>
                <div>
                  <div className="mb-1 text-xs font-medium text-primary">Implication</div>
                  <p className="text-muted-foreground">
                    Your Hong Kong fanbase is highly engaged and actively promoting your shows
                  </p>
                </div>
                <div>
                  <div className="mb-1 text-xs font-medium text-primary">Suggested Action</div>
                  <p className="text-foreground">Double down on HK market with exclusive pre-sales for local fans</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-3 flex items-center gap-2">
                <AIBadge text="AI Insight" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-foreground">
                Instagram Stories drove 45% of external traffic
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="mb-1 text-xs font-medium text-primary">Pattern</div>
                  <p className="text-muted-foreground">
                    Visual, ephemeral content significantly outperforms static posts
                  </p>
                </div>
                <div>
                  <div className="mb-1 text-xs font-medium text-primary">Implication</div>
                  <p className="text-muted-foreground">
                    Your audience prefers authentic, time-sensitive event announcements
                  </p>
                </div>
                <div>
                  <div className="mb-1 text-xs font-medium text-primary">Suggested Action</div>
                  <p className="text-foreground">
                    Increase Stories frequency with countdown stickers for upcoming shows
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
