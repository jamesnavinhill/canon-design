# Foundation Rebuild Playbook

Date: 2026-04-17

## Purpose

Turn the current reset discussion into one concrete build decision:

- where the new app should live
- what happens to the current showcase app
- what gets carried forward
- what gets rebuilt
- what the first install and implementation steps should be

## Recommendation

Create a new clean app directory for the real foundation rebuild.

Do not try to purify the current extracted showcase app in place.

This means:

- the current app becomes reference material
- the new app becomes the real foundation
- the future `/lab` route belongs to the new app, not the current showcase page

## Why A New Directory Wins

The current repo still carries too much extracted-project shape:

- legacy naming
- a bloated reference page as the main runtime
- demo chat components that are not keeper assets
- custom logic mixed into areas that were supposed to be built on stronger primitives

Trying to clean that in place creates the wrong incentives:

- pressure to save components we already do not want
- more accidental carryover of naming and structure
- more ambiguity about what is legacy versus real foundation
- more time spent editing around old assumptions

A new directory keeps the reset honest.

## Decision Score

If the goal is to build the foundation the project actually intended, the choice scores roughly like this:

- new clean app directory: `90 / 100`
- reuse this app in place: `52 / 100`

Short explanation:

- in-place reuse wins on short-term convenience
- a new directory wins on clarity, maintainability, naming discipline, and alignment with the actual product goal

## What Happens To The Current App

Right now, nothing destructive needs to happen.

The current app should be treated as:

- a reference artifact
- a place to inspect shell proportions and layout ideas
- a place to inspect token and theme behavior that may still be useful
- a source for selective extraction of genuinely strong pieces

The current app should not be treated as:

- the active long-term foundation
- the thing we keep shipping from while claiming to reset
- a page structure we intend to preserve
- a chat foundation worth polishing forward

Important clarification:

- the current bloated showcase page is not the future `/lab`
- the future `/lab` is a new route inside the rebuilt app
- it should contain the new primitives, new patterns, and new experiments only

## What We Keep Versus Rebuild

### Keep As Source Material

Keep only the parts that are actually strong enough to justify extraction:

- shell proportions and spatial decisions that still feel right
- workbench concepts and tuning behaviors that are still useful
- token ideas
- typography decisions worth preserving
- any layout pieces that are already genuinely clean

These should be copied intentionally, not inherited by default.

### Do Not Carry Forward By Default

These should not be preserved automatically:

- the current showcase page
- the current conversation family
- legacy naming
- demo-first directory shape
- one-off custom behavior in areas where proper primitives or engines should be used instead

### Rebuild Properly

These should be rebuilt as part of the new foundation:

- routing and page structure
- chat UI
- split workspace
- dashboard surfaces
- table wrappers
- chart wrappers
- the new internal `/lab`

## Technical Strategy For The New App

The new app should keep the current high-level technology direction:

- Vite
- React
- TypeScript
- shared CSS-variable design system

The difference is in how behavior-heavy areas are built.

### Own Locally

The repo should still own:

- final component APIs
- names
- markup structure
- theme bindings
- token system
- visual language
- wrapper components

### Import Under The Hood

Use stronger primitives or engines underneath where they clearly reduce bespoke logic:

- chat behavior: AI SDK
- split layout behavior: `react-resizable-panels`
- table logic: TanStack Table
- virtualization: TanStack Virtual
- charts: Recharts
- overlays, selections, and complex accessibility behavior: only if needed, via a low-level primitive library

The important rule is:

- app code should depend on repo-owned components
- repo-owned components may depend on external primitives or engines underneath

## Recommended First Install

Start the new app lean.

Base install:

- Vite
- React
- TypeScript
- React Router
- ESLint
- Vitest
- Testing Library
- Playwright

First feature dependencies:

- `react-resizable-panels`
- `@tanstack/react-table`
- `@tanstack/react-virtual`
- `recharts`
- `ai`
- `@ai-sdk/react`

Optional later decision, not day-one mandatory:

- a low-level primitive library for overlays, selection, and accessibility-heavy components

## What The New App Should Look Like At The Start

The first meaningful new app should be small and clean:

- route shell
- workspace route
- settings route
- dashboards route
- `/lab` route
- token and theme layer
- workbench connection point

It should not start with:

- a giant everything-page
- a recreated showcase runtime
- copied demo chat components
- broad carryover of old naming

## Suggested Build Sequence

1. Create the new clean app directory.
2. Install the new base stack and tooling.
3. Set up route skeleton and empty page structure.
4. Port only the keeper token and theme pieces.
5. Rebuild shell layout on clean naming.
6. Rebuild split workspace on `react-resizable-panels`.
7. Rebuild chat on AI SDK.
8. Build shared table wrappers on TanStack Table.
9. Build shared chart wrappers on Recharts.
10. Add a new internal `/lab` route for the rebuilt system only.

## What We Should Not Do

Avoid this sequence:

1. delete half of the current app
2. keep shipping from the bloated showcase page
3. slowly rename things while still relying on old extracted structure
4. save components we already know we do not want

That path burns time without giving the reset a clean boundary.

## Migration And Cutover Vision

The transition should be simple:

- current app remains untouched while the new app is created
- useful ideas are copied over intentionally
- the new app becomes the active foundation as soon as it has a viable shell
- the current app can be archived, left as reference, or retired later

There is no need to retire the current showcase page before the new app exists.

There is also no need to keep improving the current showcase page if the rebuild decision is real.

## Final Recommendation

The cleanest path is:

- stop treating the current showcase app as the active foundation
- create a new clean app directory
- use the current repo only as reference and selective extraction material
- rebuild the real foundation on proper primitives and engines
- add a new `/lab` later inside the rebuilt app

That gives the project:

- a cleaner reset
- clearer naming
- less accidental carryover
- a better shot at the architecture that was originally intended
