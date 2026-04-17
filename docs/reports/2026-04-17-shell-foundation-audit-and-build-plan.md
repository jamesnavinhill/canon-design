# Shell Foundation Audit And Build Plan

Date: 2026-04-17

## Purpose

Capture the current state of the repo, clarify what this project actually is right now, and set the next development phases so the shell foundation turns into a real application.

## Important Corrections

These points clarify the intended direction more accurately.

- The current app is still primarily a shell foundation, not a full application.
- The strongest work already in place is the outer shell:
  - sidebar
  - rails
  - toolbar
  - menus
  - modals
  - controls
  - typography
  - parameterized theme and tuning system
- The next major work is content structure, page structure, and real reusable application patterns inside that shell.
- The next foundation pass should prefer proven package or headless primitives for behavior-heavy features instead of treating extracted demo components as long-term base assets.
- Legacy internal naming should be removed rather than reintroduced in new work.
- Keeping an internal `/lab` route is acceptable because it is a simple place to keep the system tooling and exploration surfaces.

## Current Repo Facts

These are direct observations from the repo on 2026-04-17.

- The app currently builds cleanly with `npm run build`.
- The runtime is a minimal Vite + React + TypeScript stack with no lint, test, or e2e scripts yet. See `package.json`.
- The main app is still a single large reference consumer in `src/App.tsx` at 1,665 lines.
- The repo does not currently have a router or page layer.
- The current workbench default in code was `closed` and right-docked before this pass; it has been updated to default open on the left on desktop in `src/App.tsx`.
- The repo still carries heavy legacy naming:
  - `package.json` name: `canon-design-system-studio`
  - `index.html` title and meta: `Canon Design System Studio`
  - local storage keys in `src/App.tsx`: `canon-design-system-studio/v5` and `/v4`
- `ds-*` naming is still widespread:
  - 2,157 `ds-*` occurrences in `src/`
  - 57 source files contain `ds-*` classes or variables
- The current chat presentation does not match the desired product direction:
  - transcript messages are boxed in `src/styles/conversation.css`
  - the composer textarea is vertically resizable in `src/styles/conversation.css`
  - the current chat family is still demo or reference oriented and should be treated as disposable reference code rather than a foundation to refactor forward

## Theme System Gaps

The theme system already separates some values by mode, especially surfaces and some background color points, but it is not fully mode-aware yet in the way the project wants.

Current limitations:

- `accent` is shared globally
- `graphs` are shared globally
- divider settings are shared globally in `theme.shell`
- the selected theme preset is effectively shared rather than independently chosen by mode
- background color points are split by mode, but background behavior and config are not fully mode-separated

Required direction:

- Editing while in dark mode should only affect dark mode.
- Editing while in light mode should only affect light mode.
- This should apply to:
  - surfaces
  - accent
  - graph colors
  - background
  - selected theme preset
  - dividers
- This should happen through the current mode context automatically, without extra mode-specific control clutter.

## Audit Summary

The repo already has meaningful groundwork:

- a tokenized theme system
- a usable shell foundation
- reusable controls and surfaces
- a useful internal workbench

What is still missing:

- page routing
- real page and content structures
- a production chat foundation built on proper chat tooling rather than a refactor of the current demo chat components
- dashboard infrastructure
- settings architecture
- repo tooling maturity
- naming cleanup

## Naming Direction

This is a removal plan, not a replacement-prefix plan.

Target end state:

- zero `ds-*` prefixes left in app code
- zero new replacement prefixes introduced in their place
- zero new folder, component, or token naming built around old internal identity terms
- zero filler umbrella naming such as `Canonical*`, `Base*`, `Core*`, `Default*`, or similar placeholders when a plain domain name would do

Practical cleanup sequence:

1. Stop adding any new `ds-*`, `canon`, `studio`, `showcase`, or filler umbrella names immediately.
2. Replace shell-level class and component names first, because they currently define the project's visible structure.
3. Rename shared system variables and component APIs next, keeping page work aligned with the cleaned names.
4. Remove remaining legacy names as each feature area lands.
5. Treat the cleanup as incomplete until searches for the legacy prefixes return zero relevant app-code results.

## Platform Direction

Current decision:

- stay on the current Vite + React + TypeScript stack
- keep the shared CSS-variable design system
- add targeted package or headless tooling where it removes bespoke logic without forcing a Tailwind or shadcn baseline

This means:

- do not introduce Next.js + shadcn/Tailwind as a baseline requirement for this phase
- do not hand-build every behavior-heavy primitive if a proven low-level package already covers the hard part well
- do keep the visible UI, naming, tokens, and final component API inside the repo's own shared system

## Primitive Strategy

The intended hybrid model is:

- own the design system, tokens, markup, visual language, and final component API
- import package engines or low-level primitives for behavior-heavy areas when they are materially better than custom logic
- wrap those dependencies behind plain local components so app code depends on repo-owned interfaces rather than vendor APIs

This is the default direction for:

- chat behavior
- split layout behavior
- table logic
- virtualization
- chart rendering
- overlay and selection primitives if a package clearly produces a cleaner foundation

## Package Direction

## 1. Chat

Use Vercel AI SDK for chat behavior, streaming, tool and data parts, and provider flexibility.

Notes:

- Staying on the current stack means using AI SDK behavior directly and rebuilding the visible chat UI inside the repo's own shared system.
- Do not treat the current `conversation/` components as the foundation for this work. Replace them.
- If richer low-level primitives are needed for menus, selections, overlays, or accessible input behavior, add them intentionally rather than carrying bespoke demo logic forward.

Official sources:

- [AI SDK `useChat`](https://ai-sdk.dev/docs/reference/ai-sdk-ui/use-chat)
- [AI SDK transport](https://ai-sdk.dev/docs/ai-sdk-ui/transport)
- [AI Elements overview](https://elements.ai-sdk.dev/)
- [AI Elements setup](https://elements.ai-sdk.dev/docs/setup)

## 2. Split Workspace

Use `react-resizable-panels` as the resize engine and wrap it in a shared split workspace primitive.

Required behavior:

- even starting split
- `30 / 70`, `50 / 50`, `70 / 30` helpful notches
- free drag between them
- collapse and restore on both sides
- support for many viewer types on the right side
- keep app-facing naming plain and local even if the resize behavior comes from the package

Official sources:

- [shadcn resizable docs](https://ui.shadcn.com/docs/components/resizable)
- [react-resizable-panels](https://github.com/bvaughn/react-resizable-panels)

## 3. Charts

Use Recharts directly, with small shared wrappers for chart framing and shared behavior.

Wrapper rule:

- do not expose raw charting-library structure all over page code
- keep chart framing, empty states, titles, legends, sizing conventions, and theme bindings inside shared repo-owned components

Official sources:

- [shadcn chart docs](https://ui.shadcn.com/docs/components/chart)
- [Recharts size guide](https://recharts.github.io/en-US/guide/sizes/)
- [Recharts ResponsiveContainer](https://recharts.github.io/en-US/api/ResponsiveContainer/)

## 4. Tables

Use TanStack Table as the default table engine and TanStack Virtual when the data size requires virtualization.

Wrapper rule:

- use TanStack for table logic, not for final product naming or visual identity
- keep table markup, toolbar structure, empty and loading states, and theme bindings in shared repo-owned components

AG Grid remains a future escalation option only if analyst-grade grid features become a real requirement.

Official sources:

- [TanStack Table](https://tanstack.com/table/latest)
- [TanStack table virtualization guide](https://tanstack.com/table/latest/docs/guide/virtualization)
- [TanStack Virtual](https://tanstack.com/virtual/latest/docs)
- [shadcn data-table guide](https://ui.shadcn.com/docs/components/data-table)
- [AG Grid Community vs Enterprise](https://www.ag-grid.com/angular-data-grid/community-vs-enterprise/)

## Foundation Reset Option

Given that this repo was extracted from a larger project and does not fully reflect the intended packaged-primitives-first architecture, an early reset is a reasonable option.

Practical reset shape:

- keep the current reference or lab surface available as internal tooling
- extract the keeper assets:
  - shell composition ideas
  - workbench concepts
  - token and typography decisions
  - any layout pieces that are already genuinely clean
- do not preserve the current chat components by default
- rebuild the forward-looking foundation in plain-named directories with packaged primitives or engines underneath where that makes the system cleaner
- treat the current repo as source material, not as the unquestioned base layer

## What The App Should Become

The next phases should turn the shell into a normal application structure with:

- real routes
- a workspace page
- a split chat and viewer page
- a dashboard page
- a settings page
- a retained internal `/lab` route

## Proposed High-Level Structure

```text
src/
  app/
    routes/
    shell/
    providers/
  components/
    chat/
    layout/
    dashboard/
    data-display/
    settings/
    viewer/
    workbench/
  features/
    workspace/
    dashboards/
    settings/
    lab/
  system/
    theme/
    schema/
    persistence/
```

Direction notes:

- move away from legacy internal folder naming over time
- keep names plain and domain-based
- shared system pieces live in shared component and system layers
- feature folders compose those pieces into pages
- do not introduce umbrella adjective names for wrappers when plain domain names are enough

## Phase Plan

## Phase 0: Repo And Tooling Cleanup

Goal: make the repo safe to grow.

Add:

- ESLint flat config
- `typescript-eslint`
- `eslint-plugin-react-hooks`
- accessibility linting
- `lint`, `lint:fix`, and `check` scripts
- Vitest + Testing Library
- Playwright smoke coverage

Official sources:

- [ESLint flat config migration](https://eslint.org/docs/latest/use/configure/migration-guide)
- [typescript-eslint](https://typescript-eslint.io/)
- [eslint-plugin-react-hooks](https://react.dev/reference/eslint-plugin-react-hooks)

## Phase 1: Reset Scope, Naming, And App Skeleton

Goal: stop centering the repo around the old extracted identity and lock the real foundation direction before more page work lands.

Deliver:

- decide keeper-extraction scope versus clean-reset scope
- real route layer
- `/workspace`, `/dashboards`, `/settings`, `/lab`
- begin the explicit removal of `ds-*`, `canon`, `studio`, and `showcase` naming
- do not replace `ds-*` with another umbrella prefix
- do not introduce filler adjective wrappers in new shared component names
- normalize top-level app identity

## Phase 2: Theme System Normalization

Goal: finish the mode-aware editing model before the app grows.

Deliver:

- mode-separated accent editing
- mode-separated graph color editing
- mode-separated background editing
- mode-separated selected theme preset behavior
- mode-separated divider editing
- no extra mode clutter in the workbench controls

## Phase 3: Split Workspace + Chat + Viewer

Goal: land the primary application page.

Deliver:

- shared split workspace primitive
- bottom-anchored professional chat experience rebuilt on proper tooling
- viewer host for browser, PDF, media, and future viewer types

## Phase 4: Dashboards

Goal: land structured data-display pages.

Deliver:

- dashboard layout model
- 1-3 column dashboard structures
- saved dashboards
- charts, tables, and metric surfaces

## Phase 5: Settings

Goal: land the administrative and configuration page structure.

Deliver:

- shared settings scaffold
- tabs for general, profile, configuration, and data
- stable section rhythm and field presentation

## Immediate Next Build Order

1. Lock the naming and primitive rules in docs.
2. Decide keeper-extraction scope versus clean-reset scope.
3. Tooling and linting.
4. Route skeleton and `/lab`.
5. Naming cleanup in touched app-shell areas.
6. Theme system mode separation.
7. Shared split workspace.
8. Chat and viewer foundation.
9. Dashboard infrastructure.
10. Settings page structure.

## Final Recommendation

The safest way to continue is:

- treat the current app as source material and shell groundwork, not as the finished architecture
- if the packaged-primitives-first foundation is the real goal, pause now and reset before more page work multiplies
- clean up the repo and tooling first
- normalize naming as work proceeds
- finish the theme system's mode-aware behavior early
- keep the workbench available under `/lab`
- rebuild chat instead of polishing the current demo conversation family
- move next into real page and content patterns instead of further studio or demo polish

## Settled Decisions

### 1. Platform Direction

Decision:

- stay on Vite + React + TypeScript
- keep the shared CSS-variable system
- add targeted package or headless tooling instead of adopting Next.js + shadcn/Tailwind as the baseline

### 2. Naming Direction

Decision:

- use plain, domain-based names
- do not introduce new umbrella prefixes or filler adjective wrappers such as `Canonical*`, `Base*`, `Core*`, or similar placeholder naming

### 3. Chat Direction

Decision:

- do not treat the current conversation family as a keeper asset
- rebuild chat against AI SDK behavior and stronger low-level primitives as needed
- test and productize the replacement chat foundation, not the current demo pair

## Source Links

- AI SDK: [useChat](https://ai-sdk.dev/docs/reference/ai-sdk-ui/use-chat), [Transport](https://ai-sdk.dev/docs/ai-sdk-ui/transport)
- AI Elements: [Overview](https://elements.ai-sdk.dev/), [Setup](https://elements.ai-sdk.dev/docs/setup)
- shadcn/ui: [Vite install](https://ui.shadcn.com/docs/installation/vite), [Resizable](https://ui.shadcn.com/docs/components/resizable), [Chart](https://ui.shadcn.com/docs/components/chart), [Data Table](https://ui.shadcn.com/docs/components/data-table)
- TanStack: [Table](https://tanstack.com/table/latest), [Table virtualization guide](https://tanstack.com/table/latest/docs/guide/virtualization), [Virtual](https://tanstack.com/virtual/latest/docs)
- Recharts: [Chart size](https://recharts.github.io/en-US/guide/sizes/), [ResponsiveContainer](https://recharts.github.io/en-US/api/ResponsiveContainer/)
- AG Grid: [Community vs Enterprise](https://www.ag-grid.com/angular-data-grid/community-vs-enterprise/)
- ESLint: [Flat config migration](https://eslint.org/docs/latest/use/configure/migration-guide)
- typescript-eslint: [typescript-eslint.io](https://typescript-eslint.io/)
- React hooks linting: [eslint-plugin-react-hooks](https://react.dev/reference/eslint-plugin-react-hooks)
