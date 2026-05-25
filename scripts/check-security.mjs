import { execFileSync } from "node:child_process";
import fs from "node:fs";

const ignoredEnv = execFileSync("git", ["check-ignore", "-v", ".env"], {
  encoding: "utf8"
});

if (!ignoredEnv.includes(".gitignore")) {
  throw new Error(".env must be ignored by .gitignore.");
}

const trackedFiles = execFileSync("git", ["ls-files"], { encoding: "utf8" })
  .split("\n")
  .filter(Boolean)
  .filter((file) => file !== "scripts/check-security.mjs")
  .filter((file) => !file.endsWith(".pdf"))
  .filter((file) => fs.existsSync(file));

const secretPatterns = [
  /sk-proj-[A-Za-z0-9_-]+/,
  /sk-[A-Za-z0-9_-]{20,}/,
  /OPENAI_API_KEY=(?!your_|example_|<|$)[^\s]+/,
  /NEXT_PUBLIC_POSTHOG_KEY=(?!your_|example_|<|$)[^\s]+/
];

for (const file of trackedFiles) {
  const content = fs.readFileSync(file, "utf8");
  for (const pattern of secretPatterns) {
    if (pattern.test(content)) {
      throw new Error(`Potential secret found in tracked file: ${file}`);
    }
  }
}

const chatRoute = fs.readFileSync("app/api/chat/route.ts", "utf8");
if (chatRoute.includes('runtime = "edge"') || chatRoute.includes("runtime = 'edge'")) {
  throw new Error('Cloudflare OpenNext deployment requires removing route-level runtime = "edge".');
}

for (const requiredGuard of ["maxUserMessages", "maxMessages", "maxMessageChars", "maxTotalChars", "maxResponseTokens"]) {
  if (!chatRoute.includes(requiredGuard)) {
    throw new Error(`Chat API is missing request guard: ${requiredGuard}.`);
  }
}

console.log("Security checks passed.");
