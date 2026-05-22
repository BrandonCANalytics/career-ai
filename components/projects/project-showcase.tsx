"use client";

import { ChevronDown, ChevronRight, ExternalLink, Layers, Target } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { track } from "@/lib/analytics";
import type { Project, RoleKey } from "@/lib/types";

export function ProjectShowcase({
  projects,
  role,
  showHeader = true
}: {
  projects: Project[];
  role: RoleKey;
  showHeader?: boolean;
}) {
  const [openProject, setOpenProject] = useState(projects[0]?.id);

  return (
    <section className="space-y-3">
      {showHeader ? (
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Selected work</p>
            <h2 className="mt-2 text-xl font-semibold">Projects reordered for this visitor</h2>
          </div>
        </div>
      ) : null}

      <div className="grid gap-3">
        {projects.map((project) => {
          const isOpen = openProject === project.id;
          return (
            <Card key={project.id} className="overflow-hidden">
              <button
                aria-expanded={isOpen}
                className="group w-full text-left"
                onClick={() => {
                  setOpenProject(isOpen ? "" : project.id);
                  track("project_opened", { role, project: project.id });
                }}
                type="button"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <CardTitle>{project.title}</CardTitle>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{project.summary}</p>
                    </div>
                    <span
                      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border bg-background text-muted-foreground transition-colors group-hover:text-foreground"
                      title={isOpen ? "Collapse project details" : "Expand project details"}
                    >
                      {isOpen ? (
                        <ChevronDown aria-hidden="true" className="h-4 w-4" />
                      ) : (
                        <ChevronRight aria-hidden="true" className="h-4 w-4" />
                      )}
                      <span className="sr-only">{isOpen ? "Collapse project details" : "Expand project details"}</span>
                    </span>
                  </div>
                </CardHeader>
              </button>

              {isOpen ? (
                <CardContent className="space-y-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-md border bg-background p-3">
                      <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                        <Target className="h-4 w-4 text-primary" />
                        Impact
                      </div>
                      <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
                        {project.impact.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-md border bg-background p-3">
                      <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                        <Layers className="h-4 w-4 text-primary" />
                        Architecture
                      </div>
                      <ol className="space-y-2 text-sm leading-6 text-muted-foreground">
                        {project.architecture.map((item, index) => (
                          <li key={item}>
                            <span className="mr-2 text-xs text-primary">{index + 1}</span>
                            {item}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <Badge className="bg-background" key={item}>
                        {item}
                      </Badge>
                    ))}
                  </div>

                  <p className="text-sm leading-6 text-muted-foreground">{project.details}</p>

                  {project.links.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {project.links.map((link) => (
                        <Button asChild key={link.href} size="sm" variant="outline">
                          <a
                            href={link.href}
                            onClick={() => track("project_link_clicked", { role, project: project.id, href: link.href })}
                            rel="noreferrer"
                            target="_blank"
                          >
                            {link.label}
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        </Button>
                      ))}
                    </div>
                  ) : null}
                </CardContent>
              ) : null}
            </Card>
          );
        })}
      </div>
    </section>
  );
}
