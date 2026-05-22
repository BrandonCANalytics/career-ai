import type { RoleKey } from "./types";

export const roleLabels: Record<RoleKey, string> = {
  default: "Adaptive portfolio",
  ae: "Analytics engineering",
  ai: "AI product",
  gtm: "GTM analytics",
  de: "Data engineering",
  da: "Data analytics"
};

export const roleConfig: Record<
  RoleKey,
  {
    headline: string;
    subhead: string;
    emphasizedSkills: string[];
    projectOrder: string[];
    prompts: string[];
  }
> = {
  default: {
    headline: "Ask BrandonCantrell.ai about analytics engineering, AI systems, and data products.",
    subhead:
      "A conversational portfolio that answers from curated career context, project artifacts, and Brandon's data product philosophy.",
    emphasizedSkills: ["Analytics engineering", "Semantic modeling", "AI-enabled workflows", "Executive analytics"],
    projectOrder: ["paid-media-mart", "productdw", "burrito-dashboard", "hard-thing"],
    prompts: [
      "How does Brandon approach analytics engineering?",
      "What AI-enabled systems has Brandon built?",
      "Show examples of stakeholder-facing analytics products",
      "What technologies has Brandon used?"
    ]
  },
  ae: {
    headline: "Analytics engineering portfolio, tuned for semantic models and trusted marts.",
    subhead:
      "Explore Brandon's approach to dbt modeling, warehouse-native ELT, metrics consistency, and decision-ready data products.",
    emphasizedSkills: ["dbt marts", "BigQuery", "Metric governance", "Data quality tests"],
    projectOrder: ["paid-media-mart", "productdw", "burrito-dashboard", "hard-thing"],
    prompts: [
      "How does Brandon implement semantic modeling?",
      "What production-minded dbt patterns has Brandon used?",
      "Show Brandon's analytics engineering projects",
      "How does Brandon balance speed and governance?"
    ]
  },
  ai: {
    headline: "AI-native experience layer for product-minded data work.",
    subhead:
      "A concise view of Brandon's ability to turn structured context, analytics workflows, and user intent into useful AI experiences.",
    emphasizedSkills: ["AI product design", "Structured retrieval", "Prompt systems", "Decision intelligence"],
    projectOrder: ["hard-thing", "paid-media-mart", "productdw", "burrito-dashboard"],
    prompts: [
      "What AI-enabled systems has Brandon built?",
      "How would Brandon design AI over a semantic layer?",
      "How does Brandon avoid hallucination in AI products?",
      "What product thinking does Brandon bring to AI?"
    ]
  },
  gtm: {
    headline: "GTM analytics and paid media intelligence, built like a product.",
    subhead:
      "See how Brandon thinks about media performance, executive reporting, cross-platform metrics, and activation-ready insights.",
    emphasizedSkills: ["Paid media analytics", "Executive dashboards", "ROAS modeling", "PostHog instrumentation"],
    projectOrder: ["paid-media-mart", "burrito-dashboard", "productdw", "hard-thing"],
    prompts: [
      "Show Brandon's paid media analytics work",
      "How does Brandon create stakeholder-facing analytics products?",
      "What metrics does Brandon standardize for GTM teams?",
      "How would Brandon instrument this portfolio as a product?"
    ]
  },
  de: {
    headline: "Data platform work with pragmatic ELT and workload-fit architecture.",
    subhead:
      "Review Brandon's warehouse, orchestration, normalization, and deployment decisions across analytics-heavy products.",
    emphasizedSkills: ["ELT pipelines", "Python orchestration", "Postgres", "Warehouse-backed apps"],
    projectOrder: ["productdw", "paid-media-mart", "hard-thing", "burrito-dashboard"],
    prompts: [
      "What data platform patterns has Brandon used?",
      "How does Brandon choose between BigQuery and Postgres?",
      "Show Brandon's pipeline and deployment experience",
      "What does Brandon value in data quality?"
    ]
  },
  da: {
    headline: "Analysis that moves from reporting to decision intelligence.",
    subhead:
      "A recruiter-friendly view of Brandon's analytics, dashboarding, stakeholder communication, and insight generation.",
    emphasizedSkills: ["KPI design", "Dashboard UX", "Insight writing", "Exploratory analysis"],
    projectOrder: ["burrito-dashboard", "paid-media-mart", "productdw", "hard-thing"],
    prompts: [
      "Show examples of stakeholder-facing analytics products",
      "How does Brandon turn data into recommendations?",
      "What dashboard design choices has Brandon made?",
      "What technologies has Brandon used for analysis?"
    ]
  }
};

export function normalizeRole(role?: string): RoleKey {
  if (role === "ae" || role === "ai" || role === "gtm" || role === "de" || role === "da") {
    return role;
  }
  return "default";
}
