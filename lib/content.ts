import projects from "@/content/projects/projects.json";
import profile from "@/content/about/profile.json";
import skills from "@/content/skills/skills.json";
import type { ContentDocument, Project, RoleKey } from "./types";
import { normalizeRole } from "./roles";

const topicSynonyms: Record<string, string[]> = {
  "analytics engineering": ["analytics engineering", "dbt", "semantic", "metrics", "mart", "marts", "grain"],
  ai: ["ai", "assistant", "retrieval", "hallucination", "prompt", "chat", "semantic layer"],
  gtm: ["gtm", "paid media", "marketing", "campaign", "roas", "ads", "executive"],
  data: ["data", "warehouse", "bigquery", "postgres", "elt", "pipeline", "platform", "normalization"],
  analysis: ["dashboard", "insight", "stakeholder", "kpi", "recommendation", "visualization"]
};

const philosophyBody = profile.principles.join("\n");

export function getProjects(role: RoleKey): Project[] {
  const ordered = [...(projects as Project[])];
  const configOrder = role === "default" ? [] : ordered.filter((p) => p.roleFit.includes(role)).map((p) => p.id);
  const order = new Map(configOrder.map((id, index) => [id, index]));

  return ordered.sort((a, b) => {
    const aRole = a.roleFit.includes(role) ? 0 : 1;
    const bRole = b.roleFit.includes(role) ? 0 : 1;
    if (aRole !== bRole) return aRole - bRole;
    return (order.get(a.id) ?? 99) - (order.get(b.id) ?? 99);
  });
}

export function getAllDocuments(): ContentDocument[] {
  const projectDocs: ContentDocument[] = (projects as Project[]).map((project, index) => ({
    id: project.id,
    title: project.title,
    type: "project",
    roles: project.roleFit,
    topics: [
      ...project.stack.map((item) => item.toLowerCase()),
      ...project.metrics.map((item) => item.toLowerCase()),
      ...project.architecture.map((item) => item.toLowerCase())
    ],
    priority: 80 - index,
    summary: project.summary,
    body: [
      project.summary,
      "Impact:",
      ...project.impact,
      "Architecture:",
      ...project.architecture,
      "Stack:",
      project.stack.join(", "),
      "Metrics:",
      project.metrics.join(", "),
      "Details:",
      project.details
    ].join("\n"),
    source: `content/projects/projects.json#${project.id}`
  }));

  const skillDocs: ContentDocument[] = skills.map((skill, index) => ({
    id: `skill-${skill.name.toLowerCase().replaceAll(" ", "-")}`,
    title: skill.name,
    type: "skill",
    roles: ["default", "ae", "ai", "gtm", "de", "da"],
    topics: skill.topics,
    priority: 65 - index,
    summary: skill.evidence,
    body: `${skill.name}\nTopics: ${skill.topics.join(", ")}\nEvidence: ${skill.evidence}`,
    source: "content/skills/skills.json"
  }));

  return [
    {
      id: "profile",
      title: profile.name,
      type: "about",
      roles: ["default", "ae", "ai", "gtm", "de", "da"],
      topics: ["profile", "about", "positioning", "philosophy"],
      priority: 90,
      summary: profile.positioning,
      body: `${profile.positioning}\n\nPrinciples:\n${philosophyBody}`,
      source: "content/about/profile.json"
    },
    {
      id: "data-thought-leadership",
      title: "Data Product Philosophy",
      type: "philosophy",
      roles: ["default", "ae", "ai", "gtm", "de", "da"],
      topics: ["decision intelligence", "semantic layer", "systems", "bigquery", "product analytics"],
      priority: 70,
      summary:
        "Brandon frames analytics as decision intelligence, semantic-layer-centered systems, and product experiences that should be instrumented and improved.",
      body:
        "Brandon argues that data teams should produce intelligence, not just raw reporting. He favors semantic layers where metrics, business logic, and relationships are centralized so dashboards, notebooks, and AI interfaces can sit on top. He treats personal sites and analytics products as products that should be instrumented with events and dashboards. He also evaluates databases by workload shape, distinguishing transactional Postgres-style workloads from aggregation-heavy BigQuery-style analytics engines.",
      source: "career-context/Data Thought Leader Writing.md"
    },
    ...projectDocs,
    ...skillDocs
  ];
}

function tokenize(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 2);
}

function topicScore(query: string, document: ContentDocument) {
  const normalized = query.toLowerCase();
  let score = 0;

  for (const [topic, words] of Object.entries(topicSynonyms)) {
    if (normalized.includes(topic) || words.some((word) => normalized.includes(word))) {
      score += document.topics.some((docTopic) => words.some((word) => docTopic.includes(word))) ? 18 : 0;
    }
  }

  const tokens = tokenize(query);
  const haystack = `${document.title} ${document.summary} ${document.body} ${document.topics.join(" ")}`.toLowerCase();
  score += tokens.reduce((sum, token) => sum + (haystack.includes(token) ? 4 : 0), 0);

  return score;
}

export function retrieveContext(query: string, roleParam?: string, limit = 5) {
  const role = normalizeRole(roleParam);
  const docs = getAllDocuments();

  return docs
    .map((document) => {
      const roleBoost = document.roles.includes(role) ? 24 : document.roles.includes("default") ? 10 : 0;
      return {
        ...document,
        score: document.priority + roleBoost + topicScore(query, document)
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export function formatContextForPrompt(documents: ReturnType<typeof retrieveContext>) {
  return documents
    .map(
      (document, index) =>
        `[Source ${index + 1}: ${document.title} | ${document.source}]\n${document.body}`
    )
    .join("\n\n---\n\n");
}
