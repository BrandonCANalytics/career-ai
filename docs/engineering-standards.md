# Engineering Standards

## Philosophy

This repository should operate like a modern product engineering codebase.

The goal is:

* maintainability
* readability
* consistency
* clean architecture
* professional engineering standards

The repository should feel like:

* a small high-quality SaaS product
  NOT:
* a chaotic side project

All changes should prioritize:

1. clarity
2. simplicity
3. composability
4. reliability
5. developer experience

---

# Git Workflow

## Branch Strategy

Never commit directly to main.

Use feature branches for all work.

Branch naming conventions:

feature/<name>
fix/<name>
refactor/<name>
chore/<name>

Examples:

feature/ai-chat-interface
feature/posthog-tracking
fix/mobile-sidebar-overflow
refactor/retrieval-system

---

# Pull Requests

All significant changes should:

* be isolated
* scoped appropriately
* reviewed before merge

PRs should:

* have clear titles
* explain purpose
* summarize architectural impact
* mention affected systems

Avoid giant PRs.

Prefer iterative development.

---

# Commit Standards

Use clean semantic commit messages.

Format:

type(scope): summary

Examples:

feat(chat): add streaming AI responses
fix(ui): resolve mobile layout overflow
refactor(retrieval): simplify context matching
chore(posthog): add analytics initialization

Allowed commit types:

* feat
* fix
* refactor
* chore
* docs
* style
* test

Avoid:

* vague commits
* “stuff”
* “updates”
* “fixes”
* giant mixed-purpose commits

Commits should represent coherent logical changes.

---

# CI/CD Philosophy

Deploy continuously through Vercel.

Main branch should always remain deployable.

All pull requests should:

* pass linting
* pass type checks
* pass build validation

Avoid:

* broken main branch
* unchecked merges
* inconsistent environments

---

# Testing Philosophy

Prioritize:

* critical path stability
* deterministic behavior
* retrieval correctness
* UI integrity

Focus testing on:

* retrieval logic
* personalization logic
* prompt systems
* API behavior
* analytics instrumentation

Avoid overengineering testing infrastructure early.

---

# Code Style

## TypeScript

Use:

* strict typing
* explicit interfaces
* readable naming
* small reusable functions

Avoid:

* excessive abstraction
* deeply nested logic
* giant utility files
* unclear generics

Code should optimize for readability.

---

# React Standards

Prefer:

* server components where appropriate
* modular reusable components
* isolated responsibilities
* predictable data flow

Avoid:

* giant monolithic components
* unnecessary client components
* prop drilling chaos
* excessive state management

---

# Tailwind Standards

Use:

* consistent spacing scales
* semantic layout structure
* restrained utility usage

Avoid:

* giant unreadable class lists
* arbitrary values everywhere
* inconsistent spacing systems

Extract reusable patterns into components.

---

# Component Design

Components should:

* have single responsibilities
* be composable
* remain visually consistent
* support dark mode

Avoid:

* giant “god components”
* duplicated UI patterns
* inconsistent interaction behavior

---

# AI Engineering Standards

The AI assistant should:

* remain grounded in repository context
* avoid hallucinating functionality
* explain architectural decisions clearly
* maintain design consistency

Do not generate:

* unnecessary complexity
* speculative architecture
* premature abstractions

---

# Retrieval Standards

Prefer:

* deterministic retrieval
* structured metadata
* predictable ranking
* explicit mappings

Avoid:

* black-box retrieval systems
* premature vector DB complexity
* autonomous agent orchestration

The system should remain explainable.

---

# Analytics Standards

Track:

* prompt clicks
* recruiter engagement
* project exploration
* resume downloads
* role segmentation
* session depth

All tracking should:

* have meaningful event names
* use structured metadata
* support future analysis

---

# Naming Conventions

Use:

* descriptive names
* predictable folder structure
* semantic naming

Avoid:

* abbreviations
* unclear utility names
* generic component names

---

# Documentation Standards

Important systems should include:

* purpose
* architectural reasoning
* tradeoffs
* future extension notes

Prefer concise technical documentation.

---

# Performance Standards

Optimize for:

* fast initial load
* responsive UI
* smooth streaming
* lightweight interactions

Avoid:

* excessive dependencies
* unnecessary animations
* bloated bundles

---

# Product Mindset

This application is a product artifact.

Engineering decisions should communicate:

* technical maturity
* systems thinking
* product judgment
* maintainability
* operational quality

The repository itself should feel professionally engineered.
