import fs from "node:fs";

const roles = ["default", "ae", "ai", "gtm", "de", "da"];
const projects = JSON.parse(fs.readFileSync("content/projects/projects.json", "utf8"));
const prompts = JSON.parse(fs.readFileSync("content/prompts/prompts.json", "utf8"));

for (const role of roles) {
  if (!Array.isArray(prompts[role]) || prompts[role].length < 3) {
    throw new Error(`Expected at least 3 prompts for role "${role}".`);
  }
}

for (const project of projects) {
  for (const field of ["id", "title", "summary", "details"]) {
    if (!project[field]) {
      throw new Error(`Project "${project.id ?? "unknown"}" is missing ${field}.`);
    }
  }

  if (!Array.isArray(project.roleFit) || project.roleFit.length === 0) {
    throw new Error(`Project "${project.id}" must include roleFit metadata.`);
  }
}

for (const resume of [
  "public/resumes/brandon-cantrell-resume.pdf",
  "public/resumes/brandon-cantrell-ai-resume.pdf",
  "public/resumes/brandon-cantrell-gtm-resume.pdf"
]) {
  if (!fs.existsSync(resume)) {
    throw new Error(`Missing resume asset: ${resume}`);
  }
}

if (!fs.existsSync("app/icon.svg")) {
  throw new Error("Missing favicon asset: app/icon.svg");
}

console.log("Smoke checks passed.");
