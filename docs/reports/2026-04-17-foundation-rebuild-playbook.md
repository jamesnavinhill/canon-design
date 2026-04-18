# Foundation Rebuild Roadmap

Date: 2026-04-17

Status: Current working plan

This document is the current source of truth for the foundation rebuild. Older audit and productization notes remain useful background, but they should not be treated as parallel roadmap documents.

## Purpose

Turn the current audit, rebuild notes, and still-relevant parts of the earlier productization plan into one current roadmap for moving from the shell/reference app to a real application foundation.

## Verified Baseline

The points below are confirmed against the repo on 2026-04-17.

- `npm run build` passes.
- The current stack is Vite + React + TypeScript.
- Current scripts are `dev`, `build`, `typecheck`, and `preview`.
- There is no router yet.
- There is no lint, unit test, or e2e setup yet.
- `src/App.tsx` is still a single 1,667-line reference consumer.
- Legacy identity is still present in `package.json`, `index.html`, and local storage keys.
- `ds-*` is still widespread: 2,161 occurrences across 57 files in `src/`.
- The current app is still primarily a shell foundation and reference surface, not a production-ready application structure.

## Working Rebuild Direction

This roadmap is written around the recommended reset path:

- create a new clean app directory for the real rebuild
- keep the current app available as reference material during the rebuild
- stop treating the current showcase runtime as the long-term foundation
- rebuild the forward-looking app in plain-named directories
- keep `/lab` in the new app as the internal tooling and exploration route

If the team decides not to rebuild in a new directory, this roadmap should be revised before implementation begins.

## End State

The rebuild should produce:

- a real routed application instead of a single reference page
- a reusable shell and shipped workbench
- a fully customizable, exportable design system underneath that shell
- a primary workspace surface built on stronger primitives where behavior is complex
- dashboards, settings, and an internal `/lab` route
- a foundation that can support more than one app later without carrying forward old identity or demo structure

## Role Of The Current App During The Rebuild

During the rebuild, the current app should be treated as:

- reference material for shell proportions, layout behavior, and tuning ideas
- a source for selective extraction of genuinely strong system pieces
- a place to confirm theme behavior, saved sizing, and workbench patterns that still deserve to survive

During the rebuild, the current app should not be treated as:

- the active long-term foundation
- the place where new product architecture continues to accumulate
- the future `/lab`
- the chat foundation to polish forward

## Keeper Assets To Carry Forward Intentionally

These should survive only through deliberate extraction or rebuild work:

- shell proportions, shell shape, and the current spatial behavior that already feel right
- sidebar, rails, toolbar, menu, modal, and control foundations that are already strong
- workbench behavior, docking, look, setup, and flow
- the principle that the workbench ships with the system and is not studio-only
- the current theme system as a foundation, including all current theme controls, all current theme presets, saved state, exportability, and the good persistence logic already in place
- the current typography direction, which is already strong enough to preserve while leaving room for more font options later
- resizable layout behavior and saved sizing where it already works well
- any layout pieces that are already genuinely clean
- a new global spacing or app-padding control so shell rhythm can be tuned at the app level

## Do Not Carry Forward By Default

These are not keeper assets unless a specific piece proves it belongs:

- the current `src/App.tsx` showcase/reference page
- the current conversation family
- legacy naming such as `ds`, `canon`, `studio`, and `showcase`
- demo-first folder structure
- page-local bespoke behavior in areas that should be rebuilt on stronger primitives or engines
- broad copy-forward of old code just because it already exists

## Non-Negotiable Roadmap Rules

- Use plain, domain-based names.
- Do not replace old prefixes with new umbrella prefixes.
- Give each reusable concern one obvious home in the file tree.
- Keep one visual system. External packages may provide behavior, state, data, or accessibility, but not the visible product language.
- Put tokens first. New spacing, radii, motion, shadow, color, and layout values should enter through the shared system.
- Build shared primitives before page-local copies when a pattern will repeat.
- Prefer direct page surfaces, section rhythm, and dividers over box-in-box composition.
- Replace legacy pieces as cleaner replacements land. \*No legacy undesired conventions will be in the new app. old app can remain as-is, no need to do edit old app files
- Keep docs current in the same pass as structural or system changes.
- Add tests after boundaries and APIs are intentionally stable enough to lock.
- Keep the workbench focused on global system tuning, not page-local configuration.

## Technical Direction

The rebuild should stay on:

- Vite
- React
- TypeScript
- a shared CSS-variable design system

The repo should continue to own:

- final component APIs
- markup structure
- visual language
- theme bindings
- tokens
- persistence model
- wrapper components

The repo should intentionally use stronger packages underneath where they reduce bespoke logic:

- chat behavior: `ai` and `@ai-sdk/react`
- split layout: `react-resizable-panels`
- tables: `@tanstack/react-table`
- virtualization: `@tanstack/react-virtual` when needed
- charts: `recharts`
- overlays, selections, and accessibility-heavy behavior: low-level primitives only when clearly justified

This phase should not introduce a new Tailwind or shadcn baseline, and it should not switch the platform to Next.js.

## Theme And Persistence Requirements

- Editing in dark mode should affect only dark mode.
- Editing in light mode should affect only light mode.
- This mode-aware behavior must apply to surfaces, accent, graph colors, background, selected theme preset, and dividers.
- This behavior should follow the current mode context automatically, without extra mode-specific control clutter.
- All current theme controls that are part of the real tuning surface are expected to survive the rebuild.
- New controls may be added later, but the rebuild should start by matching the current tuning surface rather than shrinking it.
- The new foundation should preserve and clean up the existing save and export flow rather than discard it.
- Layout sizing persistence should survive, but the final storage keys should be renamed once the new app identity is settled.

## Target App Shape

The first real rebuilt app should include:

- a shared shell
- a workspace route
- a dashboards route
- a settings route
- an internal `/lab` route
- a token and theme layer
- a workbench connection point
- a clear path to charts, tables, viewers, and future content surfaces

A reasonable target structure is:

```text
src/
  app/
    providers/
    routes/
    shell/
  components/
    chat/
    dashboard/
    data-display/
    layout/
    settings/
    viewer/
    workbench/
  features/
    dashboards/
    lab/
    settings/
    workspace/
  system/
    persistence/
    schema/
    theme/
```

The exact folder names can move slightly, but the separation between app shell, shared components, feature composition, and system code should stay clear.

## Roadmap Phases

### Phase 0: Lock The Rebuild Boundary

Goal:

- turn the reset recommendation into an executable plan before code starts

Deliver:

- confirm the new-directory rebuild approach
- define what remains reference-only versus what must be rebuilt
- record keeper assets that must survive
- decide how the current app stays available during the rebuild
- decide the naming boundary and storage migration rule

Exit criteria:

- the rebuild boundary is documented clearly enough that implementation can start without reopening the same decision each day

### Phase 1: Bootstrap The New App

Goal:

- create a clean foundation that is safe to grow

Deliver:

- create the new app directory
- add the route layer and provider scaffolding
- add baseline quality tooling
- install the base stack and the first behavior packages
- establish empty `/workspace`, `/dashboards`, `/settings`, and `/lab` routes

Recommended baseline dependencies:

- React Router
- ESLint
- `typescript-eslint`
- `eslint-plugin-react-hooks`
- accessibility linting
- Vitest
- Testing Library
- Playwright
- `react-resizable-panels`
- `@tanstack/react-table`
- `@tanstack/react-virtual`
- `recharts`
- `ai`
- `@ai-sdk/react`

Exit criteria:

- the new app boots, routes resolve, and the minimum quality gates run

### Phase 2: Carry Over The System Foundation

Goal:

- port the strongest reusable system pieces before page work spreads

Deliver:

- bring forward tokens, theme foundations, and typography
- add the missing global spacing or app-padding control
- implement proper dark and light mode separation
- bring forward the save, export, and sizing persistence that are worth keeping
- keep new code free of legacy prefixes and filler wrapper naming

Exit criteria:

- the new app can express the design system and its tuning model without depending on the old reference page

### Phase 3: Rebuild The Shell And Workbench

Goal:

- re-establish the strongest current asset on clean foundations

Deliver:

- rebuild the sidebar, rails, toolbar, and shell framing
- rebuild the attached workbench with preserved docking behavior
- keep the desktop workbench default open on the left unless that behavior is intentionally changed later
- preserve resize and restore behavior where it matters
- establish `/lab` as the internal tooling surface in the new app

Exit criteria:

- the new app has a viable shell that already feels like the intended product foundation

### Phase 4: Land The Primary Workspace

Goal:

- deliver the first real product page

Deliver:

- shared split workspace primitive built on `react-resizable-panels`
- viewer host for browser, PDF, media, and future viewer types
- rebuilt chat foundation on AI SDK behavior
- a standard, bottom-anchored composer and transcript flow

Exit criteria:

- the workspace route works as the first real application surface and no longer depends on the old conversation components

### Phase 5: Land Dashboards And Data Display

Goal:

- establish reusable structured data surfaces

Deliver:

- dashboard layout model
- 1 to 3 column dashboard structures
- chart wrappers
- table wrappers
- saved dashboard state

Exit criteria:

- dashboards are built from shared data-display primitives rather than page-local one-offs

### Phase 6: Land Settings Architecture

Goal:

- establish a stable configuration page pattern

Deliver:

- shared settings scaffold
- category tabs such as general, profile, configuration, and data
- consistent section rhythm, field structure, and page flow

Exit criteria:

- settings pages are straightforward to extend without inventing new layout rules

### Phase 7: Stabilize, Document, And Cut Over

Goal:

- move from rebuild effort to the real active foundation

Deliver:

- continue legacy naming cleanup in all active surfaces
- keep docs aligned with what actually shipped
- add focused tests once the rebuilt boundaries are stable
- move active development to the new app as soon as shell plus workspace are viable
- decide whether the old app is archived, retained as reference, or retired later

Exit criteria:

- the new app is the active foundation and the old showcase is no longer treated as the product base

## Cross-Cutting Expectations

### Documentation

- update this roadmap when direction changes
- update design rules and any component or system inventory in the same pass as meaningful structural work
- keep the distinction clear between reference-only code and real foundation code

### Validation

Minimum validation during the rebuild:

- `npm run typecheck`
- `npm run build`

When linting and tests are added to the new app, use the narrowest credible lint or test command for the changed area in addition to the global checks.

### Naming Cleanup

- do not add new `ds`, `canon`, `studio`, or `showcase` naming in new code
- do not replace those with another umbrella prefix
- treat naming cleanup as incomplete until the active app surfaces are free of legacy identity terms

## Open Decisions Before Phase 1 Starts

- What is the exact new app location and name?
- Does the current app remain at the repo root during the rebuild, or does it move under a clearly named reference path once the new app exists?
- Should the new app intentionally reset persistence keys, or should it migrate old local storage values where practical?
- What should become the first real landing route once routing exists: `/`, `/workspace`, or a redirect into the primary working surface?

## What Not To Do

Avoid this path:

- keep shipping from the bloated reference page while claiming the reset is underway
- copy the whole current app into a new directory and rename it slowly
- save the current conversation family by default
- keep introducing new legacy naming in parallel with cleanup plans
- introduce a visually opinionated dependency as the new baseline
- over-optimize the old reference app instead of building the new one

## Recommended Near-Term Decision Order

1. Confirm the rebuild boundary and the new-app location.
2. Write the keeper inventory for shell, workbench, theme, typography, and persistence.
3. Bootstrap the new app and tooling.
4. Port the system foundation.
5. Rebuild shell and workbench.
6. Land workspace.
7. Land dashboards and settings.
8. Stabilize, document, and cut over.
