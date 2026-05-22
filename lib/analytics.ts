"use client";

import posthog from "posthog-js";

export type AnalyticsEvent =
  | "prompt_clicked"
  | "chat_submitted"
  | "project_opened"
  | "project_link_clicked"
  | "resume_download_clicked"
  | "cta_clicked"
  | "role_viewed";

export function track(event: AnalyticsEvent, properties?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;
  posthog.capture(event, properties);
}
