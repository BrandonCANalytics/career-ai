"use client";

import { FormEvent, useEffect, useMemo, useRef } from "react";
import { useChat } from "ai/react";
import ReactMarkdown from "react-markdown";
import { ArrowUp, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { track } from "@/lib/analytics";
import type { RoleKey } from "@/lib/types";

type ChatPanelProps = {
  role: RoleKey;
  prompts: string[];
};

export function ChatPanel({ role, prompts }: ChatPanelProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const { messages, input, handleInputChange, handleSubmit, append, isLoading } = useChat({
    api: "/api/chat",
    body: { role },
    initialMessages: [
      {
        id: "intro",
        role: "assistant",
        content:
          "Ask me about my analytics engineering work, AI product thinking, data platforms, or stakeholder-facing analytics projects. I answer from curated portfolio context."
      }
    ]
  });

  const sessionDepth = useMemo(() => messages.filter((message) => message.role === "user").length, [messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  function submit(event: FormEvent<HTMLFormElement>) {
    track("chat_submitted", { role, sessionDepth, prompt: input });
    handleSubmit(event);
  }

  function clickPrompt(prompt: string) {
    track("prompt_clicked", { role, prompt, sessionDepth });
    append({ role: "user", content: prompt });
  }

  return (
    <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border bg-card shadow-soft-border">
      <div className="shrink-0 flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Sparkles className="h-4 w-4 text-primary" />
          BrandonCantrell.ai
        </div>
        <div className="text-xs text-muted-foreground">{sessionDepth} questions asked</div>
      </div>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((message) => (
          <div key={message.id} className={message.role === "user" ? "flex justify-end" : "flex justify-start"}>
            <div
              className={
                message.role === "user"
                  ? "max-w-[85%] rounded-lg bg-primary px-4 py-3 text-sm text-primary-foreground"
                  : "markdown max-w-[92%] rounded-lg border bg-background px-4 py-3 text-sm leading-6"
              }
            >
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          </div>
        ))}
        {isLoading ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Reading portfolio context
          </div>
        ) : null}
        <div ref={bottomRef} />
      </div>

      <div className="shrink-0 border-t p-4">
        <div className="mb-3 flex flex-wrap gap-2">
          {prompts.map((prompt) => (
            <button
              className="rounded-md border bg-secondary px-3 py-1.5 text-left text-xs text-secondary-foreground transition-colors hover:bg-accent"
              key={prompt}
              onClick={() => clickPrompt(prompt)}
              type="button"
            >
              {prompt}
            </button>
          ))}
        </div>

        <form className="flex items-end gap-2" onSubmit={submit}>
          <Textarea
            aria-label="Ask about my work"
            onChange={handleInputChange}
            placeholder="Ask about semantic modeling, AI systems, GTM analytics, or technical projects..."
            value={input}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                event.currentTarget.form?.requestSubmit();
              }
            }}
          />
          <Button aria-label="Send message" disabled={isLoading || input.trim().length === 0} size="icon" type="submit">
            <ArrowUp className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </section>
  );
}
