import { Suspense } from "react";
import { PortfolioShell } from "@/components/portfolio-shell";
import { getProjects } from "@/lib/content";
import { normalizeRole, roleConfig } from "@/lib/roles";

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const roleParam = typeof params?.role === "string" ? params.role : undefined;
  const role = normalizeRole(roleParam);
  const config = roleConfig[role];
  const projects = getProjects(role);

  return (
    <Suspense>
      <PortfolioShell config={config} projects={projects} role={role} />
    </Suspense>
  );
}
