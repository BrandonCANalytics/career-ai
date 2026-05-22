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
    headline: "I build analytics systems, AI experiences, and data products that turn messy data into decisions.",
    subhead:
      "This is a conversational layer over my work, projects, and data product philosophy. Ask it how I think, what I have built, and where the technical decisions show up.",
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
    headline: "I build analytics engineering systems around semantic models, trusted marts, and decision-ready metrics.",
    subhead:
      "I care about the layer where raw data becomes something people can actually use: dbt models, warehouse-native ELT, consistent definitions, and tests that make the right path easier.",
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
    headline: "I build AI-native experiences powered by product-minded data work.",
    subhead:
      "The useful part of AI is not the demo. It is the system around it: structured context, clear retrieval, guardrails, and workflows that help people get to better answers faster.",
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
    headline: "I build GTM analytics and paid media intelligence like a product.",
    subhead:
      "Marketing teams do not need more disconnected reporting. They need clean cross-platform metrics, faster reads on performance, and insights that can actually change what happens next.",
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
    headline: "I build data platforms with pragmatic ELT and workload-fit architecture.",
    subhead:
      "I try to choose tools based on the shape of the problem. Sometimes that means Postgres. Sometimes it means BigQuery. The point is to build the system the workload actually needs.",
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
    headline: "I turn analysis into decision intelligence, not just reporting.",
    subhead:
      "Dashboards are useful when they help people decide. My focus is on clean KPIs, stakeholder-friendly interfaces, and analysis that explains what changed and what to do about it.",
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
