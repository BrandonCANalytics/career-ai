export type RoleKey = "default" | "ae" | "ai" | "gtm" | "de" | "da";

export type ContentDocument = {
  id: string;
  title: string;
  type: "resume" | "project" | "case-study" | "skill" | "about" | "philosophy";
  roles: RoleKey[];
  topics: string[];
  priority: number;
  summary: string;
  body: string;
  source: string;
};

export type Project = {
  id: string;
  title: string;
  roleFit: RoleKey[];
  summary: string;
  impact: string[];
  stack: string[];
  architecture: string[];
  metrics: string[];
  links: { label: string; href: string }[];
  details: string;
};
