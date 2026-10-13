export const navigation: Record<string, string[]> = {
  Solutions: [
    "Consumer Insights",
    "Brand Research",
    "Communication Research",
    "Product & Innovation",
    "Market Assessment",
    "Customer Experience",
    "Pricing",
    "B2B Research",
    "Retail & Shopper",
    "Census",
    "Social Research",
  ],
  Methodologies: [
    "Quantitative",
    "Qualitative",
    "Mixed Methods",
    "CAPI / F2F",
    "CATI",
    "CAWI",
    "Focus Groups",
    "In-depth Interviews",
    "Ethnography",
    "CLT",
    "IHUT",
    "Mystery Shopping",
    "Secondary Research",
  ],
  Industries: [
    "FMCG",
    "Healthcare",
    "Automotive",
    "BFSI",
    "Retail & E-commerce",
    "Technology",
    "Consumer Durables",
    "Education",
    "Manufacturing / B2B",
    "Agriculture",
    "Real Estate",
    "Hospitality",
    "Public Sector",
  ],
  "Data & Fieldwork": [
    "Data Collection",
    "Recruitment",
    "Survey Programming",
    "Translation",
    "Transcription",
    "Data Processing",
  ],
  "Academic Research": [
    "Academic Data Collection",
    "Longitudinal",
    "Experimental",
    "Multi-Wave",
    "Quantitative",
    "Qualitative",
  ],
  Resources: [
    "Research Approach",
    "Research Methodologies",
    "Quality & Process",
  ],
  Company: ["About NexGen", "Why NexGen", "PAN-India Network", "Quality"],
  Contact: ["Talk to an Expert", "Request a Proposal"],
}
export const capabilities = [
  {
    title: "Consumer Insights",
    tag: "UNDERSTAND PEOPLE",
    icon: "people",
    description:
      "Go beyond what people do. Understand the needs, motivations and moments that shape their decisions.",
    details:
      "Usage & attitude studies · Consumer segmentation · Purchase journey mapping · Behaviour & motivation research · Emerging trends",
    tone: "sage",
  },
  {
    title: "Brand & Communication Research",
    tag: "BUILD RELEVANCE",
    icon: "spark",
    description:
      "Discover how your brand lives in people’s minds—and what will make it matter more.",
    details:
      "Brand awareness & recall · Brand equity · Positioning · Competitive benchmarking · Brand tracking · Communication effectiveness",
    tone: "sand",
  },
  {
    title: "Market Intelligence",
    tag: "FIND OPPORTUNITY",
    icon: "chart",
    description:
      "See the market clearly. Uncover its potential, competitive landscape and your next opportunity.",
    details:
      "Market sizing · Demand assessment · Competitive mapping · Market entry · Channel assessment · Opportunity prioritisation",
    tone: "blue",
  },
  {
    title: "Customer Experience",
    tag: "CREATE CONNECTION",
    icon: "heart",
    description:
      "Identify the moments that build loyalty, the friction that breaks it, and where to make a difference.",
    details:
      "Customer satisfaction · NPS · Journey mapping · Service quality · Churn & loyalty · Mystery shopping",
    tone: "blue",
  },
  {
    title: "B2B Intelligence",
    tag: "REACH THE RIGHT PEOPLE",
    icon: "network",
    description:
      "Decode complex buying decisions with evidence from professionals and hard-to-reach audiences.",
    details:
      "Decision-maker research · Expert interviews · Buyer journeys · Channel research · Vendor selection · B2B market opportunity",
    tone: "sage",
  },
  {
    title: "Product & Innovation Research",
    tag: "BRING IDEAS TO LIFE",
    icon: "lightbulb",
    description:
      "Bring consumer evidence into every stage of innovation, from early concepts to market-ready products.",
    details:
      "Idea screening · Concept testing · Product testing · Packaging research · IHUT · CLT · Post-launch research",
    tone: "sand",
  },
  {
    title: "Retail & Shopper Intelligence",
    tag: "UNDERSTAND THE MOMENT OF CHOICE",
    icon: "shopper",
    description:
      "Decode what happens where purchase decisions are made, across stores, channels and digital journeys.",
    details:
      "Shopper journeys · Retail audits · Store census · Mystery shopping · Distribution · Merchandising audits",
    tone: "blue",
  },
  {
    title: "Social & Development Research",
    tag: "EVIDENCE FOR MEANINGFUL IMPACT",
    icon: "social",
    description:
      "Capture community experiences and generate credible evidence for programmes, policies and interventions.",
    details:
      "Baseline & endline studies · Monitoring & evaluation · Impact assessment · KAP studies · Public health · Beneficiary research",
    tone: "sage",
  },
]
export const steps = [
  [
    "Define",
    "Start with the right question.",
    "We work with you to understand the business decision, clarify objectives and identify the evidence that will make a difference.",
  ],
  [
    "Design",
    "The question shapes the method.",
    "Qualitative, quantitative, hybrid or secondary research—we build the approach around your question, not a predetermined package.",
  ],
  [
    "Execute",
    "Real people. Real-world context.",
    "Locally experienced field teams and centralised project management connect your study with the right audiences across India.",
  ],
  [
    "Validate",
    "Quality is built in, not added on.",
    "Respondent verification, field monitoring, response checks and data consistency controls protect the integrity of the evidence.",
  ],
  [
    "Analyse",
    "Turn evidence into understanding.",
    "We connect statistical patterns with human context to explain not only what is happening, but why it matters.",
  ],
  [
    "Activate",
    "Insight that moves you forward.",
    "Clear findings and actionable recommendations help you turn uncertainty into confident business decisions.",
  ],
]
export const photo = "/assets/research-discussion.jpg"

export type Capability = typeof capabilities[number]
export type Navigate = (label: string, category: string) => void

export const serviceAliases: Record<string, string> = {
  "Brand Research": "Brand & Communication Research",
  "Communication Research": "Brand & Communication Research",
  "Product & Innovation": "Product & Innovation Research",
  "Market Assessment": "Market Intelligence",
  "B2B Research": "B2B Intelligence",
  "Retail & Shopper": "Retail & Shopper Intelligence",
  Census: "Retail & Shopper Intelligence",
  "Social Research": "Social & Development Research",
}
