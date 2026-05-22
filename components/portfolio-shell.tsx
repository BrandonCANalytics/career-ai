"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Download, MessageSquare, PanelsTopLeft } from "lucide-react";
import { ChatPanel } from "@/components/chat/chat-panel";
import { ProjectShowcase } from "@/components/projects/project-showcase";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";
import { roleLabels } from "@/lib/roles";
import type { Project, RoleKey } from "@/lib/types";

const resumeByRole: Record<RoleKey, string> = {
  default: "/resumes/brandon-cantrell-resume.pdf",
  ae: "/resumes/brandon-cantrell-resume.pdf",
  ai: "/resumes/brandon-cantrell-ai-resume.pdf",
  gtm: "/resumes/brandon-cantrell-gtm-resume.pdf",
  de: "/resumes/brandon-cantrell-resume.pdf",
  da: "/resumes/brandon-cantrell-resume.pdf"
};

const skillEvidence: Record<string, string> = {
  "Analytics engineering": "Canonical marts, dimensional models, tested grains, and metric governance.",
  "Semantic modeling": "Centralized business definitions that can support BI, notebooks, and AI interfaces.",
  "AI-enabled workflows": "Structured retrieval, guardrails, role targeting, and source-grounded answers.",
  "Executive analytics": "Stakeholder dashboards designed for quick readouts and deeper investigation.",
  "dbt marts": "Cross-platform paid media mart with non-null, accepted-value, and grain tests.",
  BigQuery: "Warehouse-native ELT with Python orchestration and analytics-ready KPI tables.",
  "Metric governance": "Consistent campaign, platform, cost, conversion, and ROAS definitions.",
  "Data quality tests": "Validation around keys, grain, accepted values, null handling, and metric integrity.",
  "AI product design": "Conversational portfolio UX shaped around visitor intent and role-specific context.",
  "Structured retrieval": "Deterministic local context selection before model generation.",
  "Prompt systems": "Role-specific suggested prompts and guarded system behavior.",
  "Decision intelligence": "Moving analytics from reporting toward recommendations and interpretation.",
  "Paid media analytics": "Google Ads and Reddit Ads normalized into canonical performance reporting.",
  "Executive dashboards": "Overview, market, channel, details, and insights views for different depths of use.",
  "ROAS modeling": "Channel and campaign efficiency surfaced through stakeholder-friendly metrics.",
  "PostHog instrumentation": "Prompt, role, project, CTA, and resume interactions captured as product events.",
  "ELT pipelines": "Raw event data transformed through staging, core, and mart layers.",
  "Python orchestration": "Parameterized BigQuery jobs and reproducible data project setup.",
  Postgres: "FastAPI app backed by Neon Postgres with async SQLAlchemy.",
  "Warehouse-backed apps": "Architecture decisions based on workload shape and analytics needs.",
  "KPI design": "Revenue, orders, CVR, AOV, sessions, spend, ROAS, CTR, and CPC.",
  "Dashboard UX": "Global filters, tabbed analysis paths, hover states, and insight cards.",
  "Insight writing": "Clear interpretation of data as decision support, not raw reporting.",
  "Exploratory analysis": "Row-level detail plus rollups for investigation and executive scanning."
};

type PortfolioShellProps = {
  config: {
    headline: string;
    subhead: string;
    emphasizedSkills: string[];
    projectOrder: string[];
    prompts: string[];
  };
  projects: Project[];
  role: RoleKey;
};

export function PortfolioShell({ config, projects, role }: PortfolioShellProps) {
  const [activePanel, setActivePanel] = useState<"chat" | "projects">("chat");

  useEffect(() => {
    track("role_viewed", { role });
  }, [role]);

  return (
    <main className="min-h-screen lg:h-screen lg:overflow-hidden">
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-5 lg:h-screen lg:grid-cols-[minmax(0,0.92fr)_minmax(520px,1.08fr)] lg:px-6">
        <section className="space-y-6 lg:flex lg:h-[calc(100vh-40px)] lg:flex-col lg:justify-between lg:overflow-hidden">
          <header className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">BrandonCantrell.ai</p>
              <p className="text-xs text-muted-foreground">AI-powered professional experience layer</p>
            </div>
            <Badge>{roleLabels[role]}</Badge>
          </header>

          <section className="space-y-5 pt-8 lg:pt-8 xl:pt-14">
            <div className="space-y-4">
              <Badge className="bg-background">Role target: {roleLabels[role]}</Badge>
              <h1 className="max-w-3xl text-4xl font-semibold tracking-normal text-white sm:text-5xl">
                {config.headline}
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground">{config.subhead}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {config.emphasizedSkills.map((skill) => (
                <div className="rounded-lg border bg-card p-4 shadow-soft-border" key={skill}>
                  <p className="text-sm font-medium">{skill}</p>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">{skillEvidence[skill]}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => {
                  setActivePanel("chat");
                  track("cta_clicked", { role, cta: "ask_ai" });
                }}
                variant={activePanel === "chat" ? "default" : "outline"}
              >
                <MessageSquare className="h-4 w-4" />
                Ask AI
              </Button>
              <Button asChild onClick={() => track("resume_download_clicked", { role })} variant="outline">
                <a download href={resumeByRole[role]}>
                  <Download className="h-4 w-4" />
                  Resume
                </a>
              </Button>
              <Button
                onClick={() => {
                  setActivePanel("projects");
                  track("cta_clicked", { role, cta: "projects" });
                }}
                variant={activePanel === "projects" ? "default" : "ghost"}
              >
                <PanelsTopLeft className="h-4 w-4" />
                Projects
              </Button>
            </div>
          </section>

          <section className="grid gap-3 rounded-lg border bg-card p-4 shadow-soft-border sm:grid-cols-3">
            <Metric label="Retrieval" value="Local JSON" />
            <Metric label="Model" value="GPT-4.1 mini" />
            <Metric label="Analytics" value="PostHog" />
          </section>
        </section>

        <aside className="min-h-0 lg:sticky lg:top-5 lg:flex lg:h-[calc(100vh-40px)] lg:flex-col" id="chat">
          {activePanel === "chat" ? (
            <ChatPanel prompts={config.prompts} role={role} />
          ) : (
            <ProjectsPanel
              onBackToChat={() => setActivePanel("chat")}
              projects={projects}
              role={role}
            />
          )}
          <div className="mt-3 flex shrink-0 items-center justify-between rounded-lg border bg-card px-4 py-3 text-xs text-muted-foreground">
            <span>
              {activePanel === "chat"
                ? "Context is role-prioritized and deterministic."
                : "Projects are reordered for this visitor segment."}
            </span>
            <span className="inline-flex items-center gap-1 text-primary">
              {activePanel === "chat" ? "Sources enforced" : "Backed by local content"}
              <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </aside>
      </div>
    </main>
  );
}

function ProjectsPanel({
  onBackToChat,
  projects,
  role
}: {
  onBackToChat: () => void;
  projects: Project[];
  role: RoleKey;
}) {
  return (
    <section className="flex h-[calc(100dvh-2rem)] min-h-[520px] flex-col overflow-hidden rounded-lg border bg-card shadow-soft-border lg:h-auto lg:min-h-0 lg:flex-1">
      <div className="flex shrink-0 items-center justify-between border-b px-4 py-3">
        <div>
          <p className="text-sm font-medium">Selected work</p>
          <p className="text-xs text-muted-foreground">Project evidence for this role target</p>
        </div>
        <Button onClick={onBackToChat} size="sm" variant="outline">
          <MessageSquare className="h-3.5 w-3.5" />
          Chat
        </Button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        <ProjectShowcase projects={projects} role={role} showHeader={false} />
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}
