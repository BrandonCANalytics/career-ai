import fs from "node:fs";

const analytics = fs.readFileSync("lib/analytics.ts", "utf8");
const shell = fs.readFileSync("components/portfolio-shell.tsx", "utf8");
const chat = fs.readFileSync("components/chat/chat-panel.tsx", "utf8");
const projects = fs.readFileSync("components/projects/project-showcase.tsx", "utf8");
const source = [analytics, shell, chat, projects].join("\n");

const requiredEvents = [
  "prompt_clicked",
  "chat_submitted",
  "project_opened",
  "project_link_clicked",
  "resume_download_clicked",
  "cta_clicked",
  "role_viewed"
];

for (const event of requiredEvents) {
  if (!analytics.includes(`"${event}"`)) {
    throw new Error(`AnalyticsEvent union is missing "${event}".`);
  }

  if (!source.includes(`"${event}"`)) {
    throw new Error(`Tracking call is missing "${event}".`);
  }
}

for (const cta of ["ask_ai", "projects", "github"]) {
  if (!source.includes(`cta: "${cta}"`)) {
    throw new Error(`CTA tracking metadata is missing "${cta}".`);
  }
}

console.log("Tracking checks passed.");
