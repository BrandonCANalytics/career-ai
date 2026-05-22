import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { formatContextForPrompt, retrieveContext } from "@/lib/content";
import { normalizeRole, roleLabels } from "@/lib/roles";

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages, role } = await req.json();
  const lastMessage = [...messages].reverse().find((message) => message.role === "user");
  const query = lastMessage?.content ?? "";
  const normalizedRole = normalizeRole(role);
  const documents = retrieveContext(query, normalizedRole, 5);
  const context = formatContextForPrompt(documents);

  const result = streamText({
    model: openai("gpt-4.1-mini"),
    messages,
    temperature: 0.2,
    system: `You are BrandonCantrell.ai, a concise AI portfolio assistant for recruiters and hiring managers.

Audience role segment: ${roleLabels[normalizedRole]}.

Answer only from the provided context. If the context does not support a claim, say that the provided portfolio context does not include that detail.
Keep answers recruiter-friendly, concrete, and concise. Prefer measurable impact, project evidence, and technical decisions.
Do not invent employers, dates, certifications, degrees, quantified outcomes, or links.
When useful, end with a short "Sources" line naming the source titles you used.

Context:
${context}`
  });

  return result.toDataStreamResponse({
    getErrorMessage: (error) => {
      console.error("Chat stream failed", error);
      return "The portfolio assistant could not complete this response. Check the server log for the OpenAI error.";
    },
    headers: {
      "x-context-sources": documents.map((document) => document.title).join(", ")
    }
  });
}
