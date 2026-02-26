type UserRole = "fan" | "artist" | "venue" | "promoter" | "admin"

export type IntentType =
  | "discovery" // Fan: find shows, explore artists
  | "social" // Fan: coordinate with friends, invite
  | "ticketing" // Fan: check prices, availability
  | "planning" // Artist/Promoter: plan shows, find venues
  | "prediction" // Artist/Venue/Promoter: predict attendance, demand
  | "booking" // Venue/Promoter: booking assistance
  | "analytics" // Any: insights, metrics
  | "general" // General query

export type Tool =
  | "taste_graph" // Access user's taste preferences
  | "pulse" // Query Pulse™ feed data
  | "social_graph" // Access friend network
  | "event_db" // Search events database
  | "venue_db" // Search venues database
  | "artist_db" // Search artists database
  | "demand_engine" // Predict demand/attendance
  | "booking_matcher" // Match artists with venues
  | "ticket_api" // Check ticket availability/prices

export type CardType =
  | "event"
  | "artist"
  | "venue"
  | "ticket"
  | "social"
  | "insight"
  | "prediction"
  | "booking_suggestion"

export type PageContext =
  | "dashboard"
  | "events"
  | "analytics"
  | "profile"
  | "ticketing"
  | "pulse"
  | "stage"
  | "event_detail"
  | "venue_detail"
  | "settings"
  | "unknown"

export interface ReasoningStep {
  id: string
  message: string
  status: "running" | "completed"
  timestamp: number
}

export interface ToolCall {
  id: string
  tool: Tool
  description: string
  status: "pending" | "running" | "completed" | "error"
  result?: any
}

export interface CardOutput {
  type: CardType
  data: any
  reasoning?: string
  confidenceLabel?: string // "Estimated", "Projected", "Likely", etc.
}

export interface AskGigginResponse {
  intent: IntentType
  reasoning: ReasoningStep[]
  toolCalls: ToolCall[]
  cards: CardOutput[]
  summary: string
  followUpSuggestions?: string[]
}

// Intent detection based on query and user role
export function detectIntent(query: string, role: UserRole, pageContext?: PageContext): IntentType {
  const lowerQuery = query.toLowerCase()

  // Fan-specific intents
  if (role === "fan") {
    if (
      lowerQuery.includes("find") ||
      lowerQuery.includes("show") ||
      lowerQuery.includes("concert") ||
      lowerQuery.includes("recommend")
    ) {
      return "discovery"
    }
    if (lowerQuery.includes("friend") || lowerQuery.includes("together") || lowerQuery.includes("group")) {
      return "social"
    }
    if (lowerQuery.includes("ticket") || lowerQuery.includes("price") || lowerQuery.includes("available")) {
      return "ticketing"
    }
  }

  // Promoter: artist matching / suitability queries
  if (role === "promoter") {
    if (
      (lowerQuery.includes("artist") && (lowerQuery.includes("suited") || lowerQuery.includes("match") || lowerQuery.includes("fit"))) ||
      (lowerQuery.includes("artist") && lowerQuery.includes("electronic")) ||
      (lowerQuery.includes("artist") && lowerQuery.includes("live event"))
    ) {
      return "booking"
    }
  }

  // Artist/Promoter intents
  if (role === "artist" || role === "promoter") {
    if (
      lowerQuery.includes("plan") ||
      lowerQuery.includes("schedule") ||
      lowerQuery.includes("book") ||
      lowerQuery.includes("venue")
    ) {
      return "planning"
    }
    if (
      lowerQuery.includes("predict") ||
      lowerQuery.includes("attendance") ||
      lowerQuery.includes("sell") ||
      lowerQuery.includes("demand")
    ) {
      return "prediction"
    }
  }

  // Venue-specific intents
  if (role === "venue") {
    if (lowerQuery.includes("book") || lowerQuery.includes("artist") || lowerQuery.includes("match")) {
      return "booking"
    }
    if (lowerQuery.includes("demand") || lowerQuery.includes("predict") || lowerQuery.includes("forecast")) {
      return "prediction"
    }
  }

  // Analytics intent for all roles
  if (
    lowerQuery.includes("analytics") ||
    lowerQuery.includes("insight") ||
    lowerQuery.includes("trend") ||
    lowerQuery.includes("report")
  ) {
    return "analytics"
  }

  if (
    pageContext === "analytics" &&
    (lowerQuery.includes("what") || lowerQuery.includes("why") || lowerQuery.includes("explain"))
  ) {
    return "analytics"
  }

  if (pageContext === "event_detail" && lowerQuery.includes("predict")) {
    return "prediction"
  }

  return "general"
}

// Select tools based on intent and role
export function selectTools(intent: IntentType, role: UserRole, pageContext?: PageContext): Tool[] {
  const toolMap: Record<IntentType, Tool[]> = {
    discovery: ["taste_graph", "event_db", "pulse", "artist_db"],
    social: ["social_graph", "event_db"],
    ticketing: ["event_db", "ticket_api"],
    planning: ["venue_db", "event_db", "booking_matcher"],
    prediction: ["demand_engine", "event_db", "pulse"],
    booking: ["booking_matcher", "artist_db", "demand_engine"],
    analytics: ["pulse", "demand_engine", "event_db"],
    general: ["event_db"],
  }

  if (pageContext === "analytics") {
    return [...toolMap[intent], "pulse", "demand_engine"]
  }

  if (pageContext === "event_detail") {
    return [...toolMap[intent], "demand_engine", "social_graph"]
  }

  return toolMap[intent] || []
}

// Generate reasoning steps based on intent and role
export function generateReasoningSteps(intent: IntentType, role: UserRole, query: string): string[] {
  const rolePrefix = role === "fan" ? "your" : "available"

  const reasoningMap: Record<IntentType, string[]> = {
    discovery: [
      `Analyzing ${rolePrefix} taste preferences and listening history...`,
      `Searching events database for compatible matches...`,
      `Calculating Taste Graph compatibility scores...`,
      `Filtering by location and date preferences...`,
    ],
    social: [
      `Checking your friend network and their interests...`,
      `Finding events your friends are attending...`,
      `Identifying group-friendly shows and dates...`,
    ],
    ticketing: [
      `Querying ticket availability across platforms...`,
      `Comparing prices and seating options...`,
      `Checking for Fair Access and dynamic pricing...`,
    ],
    planning: [
      role === "artist"
        ? `Analyzing your past performance data...`
        : `Reviewing promoter booking history and preferences...`,
      `Finding available venues matching your requirements...`,
      `Estimating potential attendance and revenue...`,
    ],
    prediction: [
      `Analyzing historical demand patterns...`,
      `Processing Pulse™ trend data and social signals...`,
      `Running attendance prediction models...`,
      `Estimating ticket sales trajectory...`,
    ],
    booking: [
      `Scanning available artists in your preferred genres...`,
      `Matching artist popularity with venue capacity...`,
      `Analyzing demand forecast for optimal booking...`,
    ],
    analytics: [
      `Gathering performance metrics...`,
      `Analyzing trend data and patterns...`,
      `Generating insights and recommendations...`,
    ],
    general: [`Processing your query...`, `Searching relevant data...`],
  }

  return reasoningMap[intent] || reasoningMap.general
}

// Generate role-specific card types
export function determineCardTypes(intent: IntentType, role: UserRole): CardType[] {
  if (role === "fan") {
    if (intent === "discovery") return ["event", "artist"]
    if (intent === "social") return ["event", "social"]
    if (intent === "ticketing") return ["event", "ticket"]
  }

  if (role === "artist" || role === "promoter") {
    if (intent === "planning") return ["venue", "booking_suggestion"]
    if (intent === "prediction") return ["prediction", "insight"]
  }

  if (role === "venue") {
    if (intent === "booking") return ["artist", "booking_suggestion", "prediction"]
    if (intent === "prediction") return ["prediction", "insight"]
  }

  if (intent === "analytics") return ["insight"]

  return ["event"]
}

// Generate confidence labels for predictions
export function getConfidenceLabel(intent: IntentType): string {
  if (intent === "prediction") return "Projected"
  if (intent === "booking") return "Estimated"
  if (intent === "discovery") return "Likely Match"
  return "AI-Powered"
}

// Detect page context based on pathname
export function detectPageContext(pathname: string): PageContext {
  if (pathname.includes("/dashboard")) return "dashboard"
  if (pathname.includes("/analytics")) return "analytics"
  if (pathname.includes("/events") && pathname.match(/\/events\/[^/]+$/)) return "event_detail"
  if (pathname.includes("/events")) return "events"
  if (pathname.includes("/profile")) return "profile"
  if (pathname.includes("/ticketing")) return "ticketing"
  if (pathname.includes("/pulse")) return "pulse"
  if (pathname.includes("/stage")) return "stage"
  if (pathname.includes("/settings")) return "settings"
  return "unknown"
}

export function getContextAwareSuggestions(
  role: UserRole,
  pageContext: PageContext,
): Array<{ title: string; subtitle: string }> {
  // Fan suggestions
  if (role === "fan") {
    return [
      { title: "Shows matching", subtitle: "my taste this weekend" },
      { title: "Friends likely going", subtitle: "to nearby events" },
      { title: "Group discounts", subtitle: "near me" },
      { title: "Tickets under", subtitle: "$40" },
      { title: "Trending shows", subtitle: "tonight" },
    ]
  }

  // Artist suggestions
  if (role === "artist") {
    return [
      { title: "Cost to host", subtitle: "a mini concert in Brooklyn" },
      { title: "Estimated attendance", subtitle: "for a show next month" },
      { title: "Venues that fit", subtitle: "my audience size" },
      { title: "Best songs", subtitle: "for this crowd" },
      { title: "Best days to perform", subtitle: "for my genre" },
    ]
  }

  // Venue suggestions
  if (role === "venue") {
    return [
      { title: "Artists to book", subtitle: "next month" },
      { title: "Under-served genres", subtitle: "at my venue" },
      { title: "Attendance prediction", subtitle: "for a Friday show" },
      { title: "High-demand", subtitle: "dates" },
      { title: "Rising artists", subtitle: "for my capacity" },
    ]
  }

  // Promoter suggestions
  if (role === "promoter") {
    return [
      { title: "Artists suited for", subtitle: "an electronic live event" },
      { title: "Ticket demand", subtitle: "forecast" },
      { title: "Optimal ticket", subtitle: "pricing" },
      { title: "Trending cities", subtitle: "for electronic live events" },
      { title: "Local co-promotion", subtitle: "partners" },
    ]
  }

  // Default suggestions
  return [
    { title: "Shows matching", subtitle: "my taste this weekend" },
    { title: "Trending shows", subtitle: "tonight" },
    { title: "Group discounts", subtitle: "near me" },
    { title: "Tickets under", subtitle: "$40" },
  ]
}

// Main orchestration function
export async function processQuery(
  query: string,
  role: UserRole,
  pageContext?: PageContext,
): Promise<{ intent: IntentType; tools: Tool[]; reasoning: string[]; cardTypes: CardType[]; confidenceLabel: string }> {
  const intent = detectIntent(query, role, pageContext)
  const tools = selectTools(intent, role, pageContext)
  const reasoning = generateReasoningSteps(intent, role, query)
  const cardTypes = determineCardTypes(intent, role)
  const confidenceLabel = getConfidenceLabel(intent)

  return {
    intent,
    tools,
    reasoning,
    cardTypes,
    confidenceLabel,
  }
}
