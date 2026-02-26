import { mockEvents, mockArtists } from "@/lib/mock-data"
import type { Tool } from "./ask-giggin-engine"

// Mock tool execution functions - in production these would call actual APIs

export interface ToolExecutionResult {
  success: boolean
  data: any
  error?: string
}

export async function executeTool(tool: Tool, params: any): Promise<ToolExecutionResult> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  switch (tool) {
    case "taste_graph":
      return executeTasteGraph(params)
    case "pulse":
      return executePulse(params)
    case "social_graph":
      return executeSocialGraph(params)
    case "event_db":
      return executeEventDB(params)
    case "venue_db":
      return executeVenueDB(params)
    case "artist_db":
      return executeArtistDB(params)
    case "demand_engine":
      return executeDemandEngine(params)
    case "booking_matcher":
      return executeBookingMatcher(params)
    case "ticket_api":
      return executeTicketAPI(params)
    default:
      return { success: false, data: null, error: "Unknown tool" }
  }
}

// Taste Graph: Analyze user's music preferences
async function executeTasteGraph(params: any): Promise<ToolExecutionResult> {
  return {
    success: true,
    data: {
      topGenres: ["Electronic", "Jazz", "Indie Pop"],
      preferredArtists: ["Luna Eclipse", "River Stone", "Skyward"],
      tasteScore: 92,
      recentInterests: ["Live performances", "Jazz fusion", "Electronic festivals"],
    },
  }
}

// Pulse: Query Pulse™ feed for trending content
async function executePulse(params: any): Promise<ToolExecutionResult> {
  return {
    success: true,
    data: {
      trendingArtists: ["Luna Eclipse", "Bass Culture", "Synthesize"],
      trendingVenues: ["The Anthem", "Blue Note", "Pier 17"],
      viralEvents: mockEvents.slice(0, 2),
      pulseActivity: "high",
    },
  }
}

// Social Graph: Access friend network and social connections
async function executeSocialGraph(params: any): Promise<ToolExecutionResult> {
  return {
    success: true,
    data: {
      friendsAttending: [
        { id: "1", name: "Sarah Chen", avatar: "/placeholder.svg" },
        { id: "2", name: "Marcus Rivera", avatar: "/placeholder.svg" },
        { id: "3", name: "Emma Thompson", avatar: "/placeholder.svg" },
      ],
      friendsInterested: 12,
      groupMatches: ["Luna Eclipse fans", "Jazz enthusiasts"],
    },
  }
}

// Event DB: Search events database
async function executeEventDB(params: any): Promise<ToolExecutionResult> {
  const query = params?.query?.toLowerCase() || ""
  const isJazzNYQuery =
    query.includes("jazz") && query.includes("new york") && (query.includes("weekend") || query.includes("week"))

  if (isJazzNYQuery) {
    // Return specific jazz events for investor demo
    const jazzEvents = [
      {
        id: "jazz-1",
        name: "Joe Lovano Quartet",
        artist: "Joe Lovano Quartet",
        venue: "Village Vanguard",
        city: "Greenwich Village",
        date: "2025-01-31",
        time: "Evening sets",
        genre: "Jazz",
        image: "/jazz-quartet-village-vanguard.jpg",
        price: { min: 45, max: 45 },
        attendance: { projected: 120, capacity: 150 },
        demand: 95,
        description: "Legendary New York jazz venue with intimate seating and world-class acoustics.",
      },
      {
        id: "jazz-2",
        name: "Rising Voices Jazz Night",
        artist: "Rising Voices Jazz Night",
        venue: "Smalls Jazz Club",
        city: "West Village",
        date: "2025-02-01",
        time: "9:30 PM",
        genre: "Jazz",
        image: "/jazz-club-intimate-performance.jpg",
        price: { min: 30, max: 30 },
        attendance: { projected: 80, capacity: 100 },
        demand: 88,
        description: "Late-night jazz session featuring emerging NYC artists. High-energy, standing room.",
      },
      {
        id: "jazz-3",
        name: "Modern Jazz Collective",
        artist: "Modern Jazz Collective",
        venue: "Blue Note Jazz Club",
        city: "Midtown",
        date: "2025-02-01",
        time: "8:00 PM",
        genre: "Jazz",
        image: "/modern-jazz-blue-note-club.jpg",
        price: { min: 55, max: 55 },
        attendance: { projected: 180, capacity: 200 },
        demand: 92,
        description: "Contemporary jazz with crossover appeal. Seated tables and polished production.",
      },
    ]

    return {
      success: true,
      data: {
        events: jazzEvents,
        totalFound: jazzEvents.length,
      },
    }
  }

  // Default behavior for other queries
  let filteredEvents = [...mockEvents]

  if (params?.genre) {
    filteredEvents = filteredEvents.filter((e) => e.genre.toLowerCase().includes(params.genre.toLowerCase()))
  }

  if (params?.city) {
    filteredEvents = filteredEvents.filter((e) => e.city.toLowerCase().includes(params.city.toLowerCase()))
  }

  return {
    success: true,
    data: {
      events: filteredEvents.slice(0, 4),
      totalFound: filteredEvents.length,
    },
  }
}

// Venue DB: Search venues database
async function executeVenueDB(params: any): Promise<ToolExecutionResult> {
  const mockVenues = [
    {
      id: "1",
      name: "The Anthem",
      location: "The Wharf",
      city: "Washington DC",
      capacity: 3500,
      image: "/large-modern-concert-venue.jpg",
      availability: ["Jan 20", "Jan 27", "Feb 3"],
      avgAttendance: 85,
      genre: "Multi-genre",
    },
    {
      id: "2",
      name: "Blue Note",
      location: "Greenwich Village",
      city: "New York",
      capacity: 200,
      image: "/intimate-jazz-club.jpg",
      availability: ["Jan 18", "Jan 25", "Feb 1"],
      avgAttendance: 95,
      genre: "Jazz",
    },
    {
      id: "3",
      name: "Warehouse 9",
      location: "Arts District",
      city: "Los Angeles",
      capacity: 1000,
      image: "/industrial-warehouse-venue.jpg",
      availability: ["Jan 22", "Jan 29", "Feb 5"],
      avgAttendance: 78,
      genre: "Electronic",
    },
  ]

  let filteredVenues = [...mockVenues]

  if (params?.city) {
    filteredVenues = filteredVenues.filter((v) => v.city.toLowerCase().includes(params.city.toLowerCase()))
  }

  if (params?.minCapacity) {
    filteredVenues = filteredVenues.filter((v) => v.capacity >= params.minCapacity)
  }

  return {
    success: true,
    data: {
      venues: filteredVenues,
      totalFound: filteredVenues.length,
    },
  }
}

// Artist DB: Search artists database
async function executeArtistDB(params: any): Promise<ToolExecutionResult> {
  const query = params?.query?.toLowerCase() || ""
  const isElectronicArtistQuery =
    (query.includes("artist") && query.includes("electronic")) ||
    (query.includes("suited") && query.includes("electronic")) ||
    (query.includes("artist") && query.includes("live event") && query.includes("electronic"))

  if (isElectronicArtistQuery) {
    return {
      success: true,
      data: {
        type: "promoter_artist_match",
        genre: "Electronic",
        context: "Ticketed live event",
        stage: "Pre-booking",
        artists: [
          {
            id: "elec-match-1",
            name: "Luna Eclipse",
            image: "/female-electronic-music-dj-artist-with-neon-lights.jpg",
            genreFit: "Melodic Techno / Progressive Electronic",
            fitConfidence: "Strong",
            whyThisArtist: [
              "Consistent draw of 1,800\u20132,500 at mid-size electronic events in the last 12 months",
              "High Pulse\u2122 engagement in target electronic markets (NYC, Chicago, LA)",
            ],
            riskNote: "Booking cost trending upward due to recent festival appearances \u2014 negotiate early for best rate.",
            popularity: 92,
            followers: 45000,
            monthlyListeners: 128000,
          },
          {
            id: "elec-match-2",
            name: "Neon Futures",
            image: "/alternative-synth-rock-band-neon-purple-lighting.jpg",
            genreFit: "House / Deep House",
            fitConfidence: "Strong",
            whyThisArtist: [
              "Strong audience overlap with melodic electronic fans \u2014 ideal mid-card or co-headline act",
              "3 sold-out club shows (1,500\u20132,000 cap) in the past 6 months with 90%+ fill rates",
            ],
            riskNote: "Less proven at 2,500+ capacity \u2014 consider pairing with a stronger headliner for larger venues.",
            popularity: 78,
            followers: 22000,
            monthlyListeners: 67000,
          },
          {
            id: "elec-match-3",
            name: "DJ Phantom",
            image: "/edm-dj-performing-turntables-neon-lights.jpg",
            genreFit: "Progressive Electronic / Trance",
            fitConfidence: "Medium",
            whyThisArtist: [
              "Dedicated fanbase skews toward 25\u201335 demographic \u2014 high willingness-to-pay for live experiences",
              "Recent streaming growth (+40% in 90 days) suggests rising demand that hasn\u2019t yet been tested live",
            ],
            riskNote: "Limited live event track record at ticketed shows \u2014 demand signals are strong but unproven at scale.",
            popularity: 71,
            followers: 15000,
            monthlyListeners: 45000,
          },
        ],
      },
    }
  }

  let filteredArtists = [...mockArtists]

  if (params?.genre) {
    filteredArtists = filteredArtists.filter((a) => a.genre.toLowerCase().includes(params.genre.toLowerCase()))
  }

  if (params?.minPopularity) {
    filteredArtists = filteredArtists.filter((a) => a.popularity >= params.minPopularity)
  }

  return {
    success: true,
    data: {
      artists: filteredArtists.slice(0, 4),
      totalFound: filteredArtists.length,
    },
  }
}

// Demand Engine: Predict demand and attendance
async function executeDemandEngine(params: any): Promise<ToolExecutionResult> {
  const query = params?.query?.toLowerCase() || ""
  const isTrendingCitiesQuery =
    (query.includes("trending") && query.includes("cit")) ||
    (query.includes("city") && query.includes("genre")) ||
    (query.includes("trending") && query.includes("genre"))

  if (isTrendingCitiesQuery) {
    return {
      success: true,
      data: {
        type: "city_demand",
        cities: [
          {
            rank: 1,
            name: "Chicago",
            state: "IL",
            demandScore: 91,
            momentum: "Growing",
            confidence: 88,
            projectedAttendance: { min: 2400, max: 3200 },
            estimatedRevenue: { min: 156000, max: 224000 },
            drivers: [
              "Fan intent signals up 22% week-over-week",
              "3 comparable sold-out events in last 60 days",
              "Strong Pulse indicators from local listener base",
              "Underserved market relative to genre demand",
            ],
          },
          {
            rank: 2,
            name: "New York",
            state: "NY",
            demandScore: 87,
            momentum: "Growing",
            confidence: 92,
            projectedAttendance: { min: 3100, max: 4500 },
            estimatedRevenue: { min: 248000, max: 382000 },
            drivers: [
              "Accelerating demand week-over-week despite higher ticket prices",
              "Dense artist fanbase with high social engagement",
              "Multiple viable venue options across boroughs",
              "Strong crossover appeal from adjacent genres",
            ],
          },
          {
            rank: 3,
            name: "Austin",
            state: "TX",
            demandScore: 79,
            momentum: "Stable",
            confidence: 84,
            projectedAttendance: { min: 1800, max: 2600 },
            estimatedRevenue: { min: 108000, max: 169000 },
            drivers: [
              "Consistent baseline demand from festival-adjacent audience",
              "Historical genre performance is reliable but not accelerating",
              "Venue saturation may limit upside",
              "Price sensitivity slightly above national average",
            ],
          },
          {
            rank: 4,
            name: "Los Angeles",
            state: "CA",
            demandScore: 74,
            momentum: "Cooling",
            confidence: 71,
            projectedAttendance: { min: 2000, max: 3400 },
            estimatedRevenue: { min: 150000, max: 272000 },
            drivers: [
              "Strong fan intent but lower conversion confidence",
              "Competing events in same genre window",
              "Wide attendance range reflects market uncertainty",
              "Premium pricing viable if positioning is right",
            ],
          },
          {
            rank: 5,
            name: "Nashville",
            state: "TN",
            demandScore: 68,
            momentum: "Growing",
            confidence: 76,
            projectedAttendance: { min: 1200, max: 1900 },
            estimatedRevenue: { min: 72000, max: 123500 },
            drivers: [
              "Emerging market for this genre with growing listener base",
              "Lower venue costs improve margin potential",
              "Early Pulse signals show curiosity-driven interest",
              "Limited comparable events creates first-mover opportunity",
            ],
          },
        ],
        insights: [
          {
            type: "comparison",
            text: "Chicago shows 18% higher early demand than Austin for this genre, with stronger week-over-week momentum.",
          },
          {
            type: "comparison",
            text: "NYC demand is accelerating week-over-week despite higher ticket prices, suggesting strong willingness-to-pay.",
          },
          {
            type: "comparison",
            text: "LA shows strong intent but lower conversion confidence \u2014 consider targeted pre-sale campaigns to de-risk.",
          },
          {
            type: "opportunity",
            text: "Nashville is an emerging opportunity with low competition and growing genre interest. First-mover advantage is high.",
          },
        ],
        demandScore: 87,
        marketTrend: "growing",
      },
    }
  }

  const predictions = [
    {
      type: "attendance" as const,
      title: "Projected Event Attendance",
      value: 2800,
      unit: "attendees",
      confidence: 87,
      trend: "up" as const,
      trendPercent: 15,
      details:
        "Based on historical data for similar events in this market, we project strong attendance with high confidence.",
      factors: [
        "Artist has 92% social media engagement in target market",
        "Similar genre events sold out in past 3 months",
        "Optimal date/time for target demographic",
        "Strong Pulse\u2122 trending indicators",
      ],
      comparison: {
        label: "Venue Capacity",
        value: 3500,
      },
    },
    {
      type: "revenue" as const,
      title: "Estimated Ticket Revenue",
      value: 185000,
      unit: "USD",
      confidence: 82,
      trend: "up" as const,
      trendPercent: 12,
      details: "Revenue projection based on dynamic pricing model and historical sales patterns.",
      factors: [
        "Average ticket price: $65",
        "Premium seating uptake: 35%",
        "Early bird sales momentum: strong",
        "Market willingness-to-pay: above average",
      ],
      comparison: {
        label: "Break-even Point",
        value: 120000,
      },
    },
  ]

  return {
    success: true,
    data: {
      predictions,
      demandScore: 87,
      marketTrend: "growing",
    },
  }
}

// Booking Matcher: Match artists with venues
async function executeBookingMatcher(params: any): Promise<ToolExecutionResult> {
  const suggestions = [
    {
      id: "match-1",
      artistName: "Luna Eclipse",
      artistImage: "/female-electronic-music-dj-artist.jpg",
      venueName: "The Anthem",
      venueCity: "Washington DC",
      suggestedDate: "Jan 28, 2025",
      estimatedRevenue: { min: 150000, max: 220000 },
      projectedAttendance: 2800,
      venueCapacity: 3500,
      matchScore: 94,
      reasoning:
        "Strong genre fit, artist popularity aligns with venue capacity, and historical data shows excellent performance in this market.",
    },
    {
      id: "match-2",
      artistName: "River Stone",
      artistImage: "/jazz-musician-portrait.jpg",
      venueName: "Blue Note",
      venueCity: "New York",
      suggestedDate: "Feb 2, 2025",
      estimatedRevenue: { min: 15000, max: 25000 },
      projectedAttendance: 190,
      venueCapacity: 200,
      matchScore: 91,
      reasoning:
        "Perfect intimate venue match for jazz performer, high expected fill rate based on artist's local following.",
    },
  ]

  return {
    success: true,
    data: {
      suggestions,
      totalMatches: suggestions.length,
    },
  }
}

// Ticket API: Check ticket availability and prices
async function executeTicketAPI(params: any): Promise<ToolExecutionResult> {
  return {
    success: true,
    data: {
      available: true,
      inventory: 450,
      priceRange: { min: 45, max: 120 },
      tiers: [
        { name: "General Admission", price: 45, available: 200 },
        { name: "Reserved Seating", price: 75, available: 150 },
        { name: "VIP", price: 120, available: 100 },
      ],
      dynamicPricing: true,
      fairAccessEnabled: true,
    },
  }
}

// Generate insights from tool results
export function generateInsights(toolResults: Record<Tool, ToolExecutionResult>): any[] {
  const insights = []

  // Check if taste graph shows strong preferences
  if (toolResults.taste_graph?.success) {
    const { topGenres, tasteScore } = toolResults.taste_graph.data
    if (tasteScore > 85) {
      insights.push({
        type: "recommendation",
        title: "Strong Taste Match Found",
        description: `Based on your taste profile (${tasteScore}% confidence), these events align perfectly with your preferences in ${topGenres.join(", ")}.`,
        metrics: [
          { label: "Taste Score", value: `${tasteScore}%`, icon: "trending" },
          { label: "Top Genres", value: topGenres.length, icon: "users" },
        ],
      })
    }
  }

  // Check social graph for friend activity
  if (toolResults.social_graph?.success) {
    const { friendsAttending } = toolResults.social_graph.data
    if (friendsAttending.length > 0) {
      insights.push({
        type: "opportunity",
        title: "Friends Are Going",
        description: `${friendsAttending.length} of your friends are attending events this week. Join them for a great time!`,
        metrics: [
          { label: "Friends Attending", value: friendsAttending.length, icon: "users" },
          { label: "Group Matches", value: 2, icon: "calendar" },
        ],
        actionLabel: "See All Friend Activity",
      })
    }
  }

  // Check demand engine for opportunities
  if (toolResults.demand_engine?.success) {
    const { demandScore, marketTrend } = toolResults.demand_engine.data
    if (demandScore > 80 && marketTrend === "growing") {
      insights.push({
        type: "alert",
        title: "High Demand Alert",
        description: `This event is trending at ${demandScore}% demand. Tickets are selling fast and prices may increase soon.`,
        metrics: [
          { label: "Demand Score", value: `${demandScore}%`, icon: "trending" },
          { label: "Market", value: "Growing", icon: "trending" },
        ],
        actionLabel: "Get Tickets Now",
      })
    }
  }

  return insights
}

// Generate mock cost breakdown for artists
export function generateMockCostBreakdown(venueName: string, city: string) {
  const venueRental = 5000 + Math.floor(Math.random() * 5000)
  const staffing = 2000 + Math.floor(Math.random() * 2000)
  const promotion = 3000 + Math.floor(Math.random() * 3000)
  const equipment = 1500 + Math.floor(Math.random() * 1500)

  return {
    eventName: "Your Show",
    venueName,
    city,
    totalCost: venueRental + staffing + promotion + equipment,
    breakdown: [
      { category: "Venue Rental", amount: venueRental, icon: "venue" as const },
      { category: "Staff & Security", amount: staffing, icon: "staff" as const },
      { category: "Promotion & Marketing", amount: promotion, icon: "promotion" as const },
      { category: "Equipment & Production", amount: equipment, icon: "equipment" as const },
    ],
  }
}

// Generate mock ticket data for fans
export function generateMockTicketData(eventName: string, venueName: string, date: string) {
  const basePrice = 45
  const tiers = [
    { name: "General Admission", price: basePrice, available: 200 },
    { name: "Reserved Seating", price: basePrice + 30, available: 150 },
    { name: "VIP", price: basePrice + 75, available: 100 },
  ]

  return {
    eventName,
    venueName,
    date,
    priceRange: { min: basePrice, max: basePrice + 75 },
    availability: ["high", "medium", "low"][Math.floor(Math.random() * 3)] as "high" | "medium" | "low",
    groupDiscount: 15,
    fairAccessEnabled: true,
    tiers,
  }
}
