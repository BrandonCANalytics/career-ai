import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { formatContextForPrompt, retrieveContext } from "@/lib/content";
import { normalizeRole, roleLabels } from "@/lib/roles";

const maxUserMessages = 5;
const maxMessages = 12;
const maxMessageChars = 1200;
const maxTotalChars = 6000;
const maxResponseTokens = 500;

type ChatMessage = {
  role: "assistant" | "user" | "system";
  content: string;
};

export async function POST(req: Request) {
  const { messages, role } = await req.json();
  const validationError = validateMessages(messages);

  if (validationError) {
    return Response.json({ error: validationError.message }, { status: validationError.status });
  }

  const safeMessages = messages as ChatMessage[];
  const lastMessage = [...safeMessages].reverse().find((message) => message.role === "user");
  const query = lastMessage?.content ?? "";
  const normalizedRole = normalizeRole(role);
  const documents = retrieveContext(query, normalizedRole, 5);
  const context = formatContextForPrompt(documents);

  const result = streamText({
    model: openai("gpt-4.1-mini"),
    messages: safeMessages,
    maxTokens: maxResponseTokens,
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

function validateMessages(messages: unknown): { message: string; status: number } | null {
  if (!Array.isArray(messages)) {
    return { message: "Invalid chat request.", status: 400 };
  }

  if (messages.length === 0 || messages.length > maxMessages) {
    return { message: "Chat request exceeds the allowed session length.", status: 429 };
  }

  let userMessages = 0;
  let totalChars = 0;

  for (const message of messages) {
    if (!isChatMessage(message)) {
      return { message: "Invalid chat message.", status: 400 };
    }

    if (message.role === "user") {
      userMessages += 1;
    }

    if (message.content.length > maxMessageChars) {
      return { message: "Chat message is too long.", status: 413 };
    }

    totalChars += message.content.length;
  }

  if (userMessages > maxUserMessages) {
    return { message: "Chat request exceeds the question limit.", status: 429 };
  }

  if (totalChars > maxTotalChars) {
    return { message: "Chat request is too large.", status: 413 };
  }

  return null;
}

function isChatMessage(message: unknown): message is ChatMessage {
  if (!message || typeof message !== "object") {
    return false;
  }

  const candidate = message as Record<string, unknown>;

  return (
    typeof candidate.role === "string" &&
    ["assistant", "user", "system"].includes(candidate.role) &&
    typeof candidate.content === "string"
  );
}
