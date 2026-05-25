"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useChat } from "ai/react";
import ReactMarkdown from "react-markdown";
import { ArrowUp, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Lightbox } from "@/components/ui/lightbox";
import { Textarea } from "@/components/ui/textarea";
import { track } from "@/lib/analytics";
import type { RoleKey } from "@/lib/types";

type ChatPanelProps = {
  role: RoleKey;
  prompts: string[];
};

const maxQuestions = 5;

export function ChatPanel({ role, prompts }: ChatPanelProps) {
  const messagesRef = useRef<HTMLDivElement>(null);
  const [showCreditLimit, setShowCreditLimit] = useState(false);
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
    const messagesElement = messagesRef.current;

    if (!messagesElement) {
      return;
    }

    messagesElement.scrollTo({
      behavior: "smooth",
      top: messagesElement.scrollHeight
    });
  }, [messages, isLoading]);

  function submit(event: FormEvent<HTMLFormElement>) {
    if (sessionDepth >= maxQuestions) {
      event.preventDefault();
      setShowCreditLimit(true);
      track("cta_clicked", { role, cta: "chat_credit_limit", sessionDepth });
      return;
    }

    track("chat_submitted", { role, sessionDepth, prompt: input });
    handleSubmit(event);
  }

  function clickPrompt(prompt: string) {
    if (sessionDepth >= maxQuestions) {
      setShowCreditLimit(true);
      track("cta_clicked", { role, cta: "chat_credit_limit", sessionDepth, prompt });
      return;
    }

    track("prompt_clicked", { role, prompt, sessionDepth });
    append({ role: "user", content: prompt });
  }

  return (
    <>
      <Lightbox
        description="A very real, extremely serious usage limit."
        onClose={() => setShowCreditLimit(false)}
        open={showCreditLimit}
        title="You've run out of credits!"
      >
        <p>
          You used your five free questions. The meter is empty. The dashboard is blinking. Finance is
          asking questions.
        </p>
        <p>
          Contact{" "}
          <a className="font-medium text-primary hover:underline" href="mailto:brandoncantrell2000@gmail.com">
            Brandon
          </a>{" "}
          for more.
        </p>
      </Lightbox>

      <section className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-lg border bg-card shadow-soft-border">
        <div
          aria-hidden="true"
          className="memoji-badge-stage pointer-events-none absolute left-1/2 top-[19rem] z-0 h-40 w-40 -translate-x-1/2 opacity-[0.12] sm:top-24 sm:h-56 sm:w-56"
        >
          <div className="memoji-coin h-full w-full">
            <Image
              alt=""
              className="memoji-coin-face object-contain"
              height={224}
              src="/memoji.png"
              width={224}
            />
            <Image
              alt=""
              className="memoji-coin-face memoji-coin-face-back object-contain"
              height={224}
              src="/real-me.png"
              width={224}
            />
          </div>
        </div>

        <div className="relative z-10 flex shrink-0 items-center justify-between border-b bg-card/92 px-4 py-3 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Sparkles className="h-4 w-4 text-primary" />
            BrandonCantrell.ai
          </div>
          <div className="text-xs text-muted-foreground">
            {sessionDepth}/{maxQuestions} questions asked
          </div>
        </div>

        <div className="relative z-10 min-h-0 min-w-0 flex-1 space-y-4 overflow-y-auto p-4" ref={messagesRef}>
          {messages.map((message) => (
            <div key={message.id} className={message.role === "user" ? "flex justify-end" : "flex justify-start"}>
              <div
                className={
                  message.role === "user"
                    ? "max-w-[85%] break-words rounded-lg bg-primary px-4 py-3 text-sm text-primary-foreground"
                    : "markdown max-w-[92%] break-words rounded-lg border bg-background px-4 py-3 text-sm leading-6"
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
        </div>

        <div className="relative z-10 shrink-0 border-t bg-card/92 p-4 backdrop-blur-sm">
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

          <form className="flex min-w-0 items-end gap-2" onSubmit={submit}>
            <Textarea
              aria-label="Ask about my work"
              className="min-w-0"
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
    </>
  );
}
