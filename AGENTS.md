# AGENTS.md

## Project Overview

BrandonCantrell.ai is an AI-powered analytics engineering portfolio application built with:

* Next.js App Router
* TypeScript
* TailwindCSS
* shadcn/ui
* OpenAI API
* PostHog

The application is designed to feel like a modern AI-native analytics product rather than a traditional portfolio website.

---

## Design System

IMPORTANT:
Read and follow:

/docs/design-system.md

All UI and UX decisions must align with the design system.

Avoid generic portfolio aesthetics.

---

## Engineering Priorities

Prioritize:

1. clarity
2. maintainability
3. composability
4. recruiter usability
5. polished interaction quality

Avoid:

* overengineering
* unnecessary abstractions
* excessive dependencies
* flashy animations
* autonomous agent complexity

---

## Preferred Architecture

Use:

* server components where appropriate
* modular reusable UI components
* deterministic retrieval logic
* structured content systems

Avoid:

* LangChain
* unnecessary vector DB complexity
* giant global state systems

---

## UI Direction

The application should resemble:

* ChatGPT
* Linear
* Vercel
* Perplexity
* Cursor

NOT:

* generic startup landing pages
* flashy portfolio templates
* dribbble-style experiments

---

## Styling Rules

Use:

* restrained color palettes
* calm dark themes
* strong typography hierarchy
* subtle hover states
* minimal motion

Use shadcn/ui components as the foundation.

---

## AI Behavior

The AI assistant should:

* stay grounded in provided context
* avoid hallucinating experience
* remain concise and recruiter-friendly
* explain technical systems clearly
* emphasize measurable impact

---

## Analytics

Track:

* prompt clicks
* role segmentation
* resume downloads
* project engagement
* session depth

using PostHog.
