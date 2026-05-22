"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Download, Github, Linkedin, MessageSquare, PanelsTopLeft } from "lucide-react";
import { ChatPanel } from "@/components/chat/chat-panel";
import { ProjectShowcase } from "@/components/projects/project-showcase";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lightbox } from "@/components/ui/lightbox";
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

const githubUrl = "https://github.com/BrandonCANalytics";
const linkedinUrl = "https://www.linkedin.com/in/canalytics/";

const skillEvidence: Record<string, string> = {
  "Analytics engineering": "I build canonical marts, dimensional models, tested grains, and governed metrics.",
  "Semantic modeling": "I centralize definitions so BI, notebooks, and AI interfaces can use the same logic.",
  "AI-enabled workflows": "I use structured retrieval, guardrails, and role context to make AI outputs useful.",
  "Executive analytics": "I design dashboards for quick readouts first, with depth available when people need it.",
  "dbt marts": "I model cross-platform paid media data with clear grains, tests, and business-owned logic.",
  BigQuery: "I use BigQuery when the workload is aggregation-heavy and warehouse-native execution fits.",
  "Metric governance": "I standardize campaign, platform, cost, conversion, and ROAS definitions before they spread.",
  "Data quality tests": "I use tests to protect keys, grains, accepted values, null handling, and metric integrity.",
  "AI product design": "I shape AI experiences around visitor intent, structured context, and useful constraints.",
  "Structured retrieval": "I prefer deterministic context selection first because it is simple, explainable, and easy to debug.",
  "Prompt systems": "I use role-specific prompts and guarded behavior so answers stay focused and grounded.",
  "Decision intelligence": "I try to move analytics past reporting and toward interpretation people can act on.",
  "Paid media analytics": "I normalize Google Ads and Reddit Ads into canonical performance reporting.",
  "Executive dashboards": "I build overview, market, channel, detail, and insight paths for different depths of use.",
  "ROAS modeling": "I surface channel and campaign efficiency in ways stakeholders can quickly understand.",
  "PostHog instrumentation": "I track prompts, roles, projects, CTAs, and resume activity like product behavior.",
  "ELT pipelines": "I turn raw event data into staging, core, and mart layers that are easier to trust.",
  "Python orchestration": "I use Python for parameterized BigQuery jobs and reproducible data project setup.",
  Postgres: "I use Postgres for transactional app patterns, like the FastAPI app backed by Neon.",
  "Warehouse-backed apps": "I choose architecture based on workload shape, not default assumptions.",
  "KPI design": "I define KPIs like revenue, orders, CVR, AOV, spend, ROAS, CTR, and CPC clearly.",
  "Dashboard UX": "I build filters, tabs, hover states, and insight cards around how people actually scan data.",
  "Insight writing": "I write analysis as decision support, not just a recap of charts.",
  "Exploratory analysis": "I keep row-level detail close to rollups so people can investigate without losing the story."
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
  const [showGuardrails, setShowGuardrails] = useState(false);

  useEffect(() => {
    track("role_viewed", { role });
  }, [role]);

  return (
    <main className="min-h-screen overflow-x-clip lg:h-screen lg:overflow-hidden">
      <div className="mx-auto grid w-full min-w-0 max-w-7xl grid-cols-[minmax(0,1fr)] gap-6 px-4 py-5 lg:h-screen lg:grid-cols-[minmax(0,0.92fr)_minmax(520px,1.08fr)] lg:px-6">
        <section className="w-full min-w-0 max-w-[calc(100vw-2rem)] space-y-5 lg:flex lg:h-[calc(100vh-40px)] lg:max-w-none lg:flex-col lg:justify-between lg:overflow-hidden">
          <header className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">BrandonCantrell.ai</p>
              <p className="text-xs text-muted-foreground">A conversational layer over my work</p>
            </div>
            <Badge>{roleLabels[role]}</Badge>
          </header>

          <section className="space-y-4 pt-6 lg:pt-8 xl:pt-14">
            <div className="space-y-4">
              <h1 className="w-full max-w-3xl break-words text-3xl font-semibold tracking-normal text-white sm:text-4xl xl:text-5xl">
                {config.headline}
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground">{config.subhead}</p>
            </div>

            <div className="grid w-full min-w-0 grid-cols-[minmax(0,1fr)] gap-3 sm:grid-cols-2">
              {config.emphasizedSkills.map((skill) => (
                <div className="min-w-0 rounded-lg border bg-card p-3 shadow-soft-border sm:p-4" key={skill}>
                  <p className="text-sm font-medium">{skill}</p>
                  <p className="mt-2 break-words text-xs leading-5 text-muted-foreground">{skillEvidence[skill]}</p>
                </div>
              ))}
            </div>

          </section>
        </section>

        <aside className="flex h-[calc(100dvh-2rem)] min-h-[560px] w-full min-w-0 max-w-[calc(100vw-2rem)] flex-col sm:h-[calc(100dvh-2.5rem)] lg:sticky lg:top-5 lg:h-[calc(100vh-40px)] lg:min-h-0 lg:max-w-none" id="chat">
          <PanelActions activePanel={activePanel} onPanelChange={setActivePanel} role={role} />
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
            <button
              className="inline-flex items-center gap-1 text-primary transition-colors hover:text-foreground"
              onClick={() => {
                setShowGuardrails(true);
                track("cta_clicked", { role, cta: "llm_guardrails" });
              }}
              type="button"
            >
              LLM Guardrails
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </aside>
      </div>

      <Lightbox
        description="How I keep the assistant useful without pretending it knows everything."
        onClose={() => setShowGuardrails(false)}
        open={showGuardrails}
        title="LLM Guardrails"
      >
        <p>
          I built this like a small data product, not a magic answer box. The assistant gets a
          deterministic slice of local portfolio context before it responds, so the model is working from
          known material instead of guessing from the open internet.
        </p>
        <p>
          The prompt tells it to stay inside that context, keep answers concise, and say when the provided
          material does not support a claim. That matters because good AI systems should produce decision
          support, not confident noise.
        </p>
        <p>
          Inputs are constrained by role, suggested prompts, and a five-question session limit. Outputs are
          source-grounded and recruiter-focused. Nothing here replaces judgment; it gives the visitor a
          faster path to the parts of my work that are actually relevant.
        </p>
      </Lightbox>
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
    <section className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-lg border bg-card shadow-soft-border">
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

function PanelActions({
  activePanel,
  onPanelChange,
  role
}: {
  activePanel: "chat" | "projects";
  onPanelChange: (panel: "chat" | "projects") => void;
  role: RoleKey;
}) {
  return (
    <div className="mb-3 grid min-w-0 shrink-0 gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
      <div aria-label="Portfolio panel view" className="grid min-w-0 grid-cols-2 rounded-lg border bg-card p-1 shadow-soft-border">
        <button
          aria-pressed={activePanel === "chat"}
          className={
            activePanel === "chat"
              ? "inline-flex h-9 min-w-0 items-center justify-center gap-2 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground"
              : "inline-flex h-9 min-w-0 items-center justify-center gap-2 rounded-md px-3 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          }
          onClick={() => {
            onPanelChange("chat");
            track("cta_clicked", { role, cta: "ask_ai" });
          }}
          type="button"
        >
          <MessageSquare className="h-3.5 w-3.5" />
          Ask AI
        </button>
        <button
          aria-pressed={activePanel === "projects"}
          className={
            activePanel === "projects"
              ? "inline-flex h-9 min-w-0 items-center justify-center gap-2 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground"
              : "inline-flex h-9 min-w-0 items-center justify-center gap-2 rounded-md px-3 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          }
          onClick={() => {
            onPanelChange("projects");
            track("cta_clicked", { role, cta: "projects" });
          }}
          type="button"
        >
          <PanelsTopLeft className="h-3.5 w-3.5" />
          Projects
        </button>
      </div>
      <div className="grid min-w-0 grid-cols-3 rounded-lg border bg-card p-1 shadow-soft-border sm:w-[330px]">
        <a
          className="inline-flex h-9 min-w-0 items-center justify-center gap-2 rounded-md px-3 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          download
          href={resumeByRole[role]}
          onClick={() => track("resume_download_clicked", { role })}
        >
          <Download className="h-3.5 w-3.5" />
          Resume
        </a>
        <a
          className="inline-flex h-9 min-w-0 items-center justify-center gap-2 rounded-md px-3 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          href={githubUrl}
          onClick={() => track("cta_clicked", { role, cta: "github" })}
          rel="noreferrer"
          target="_blank"
        >
          <Github className="h-3.5 w-3.5" />
          GitHub
        </a>
        <a
          className="inline-flex h-9 min-w-0 items-center justify-center gap-2 rounded-md px-3 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          href={linkedinUrl}
          onClick={() => track("cta_clicked", { role, cta: "linkedin" })}
          rel="noreferrer"
          target="_blank"
        >
          <Linkedin className="h-3.5 w-3.5" />
          LinkedIn
        </a>
      </div>
    </div>
  );
}
