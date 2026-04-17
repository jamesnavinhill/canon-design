# Design Rules

Updated: 2026-04-17

## Purpose

Keep the repo clean, reusable, and normal as the shell foundation grows into a full application.

## Core Rules

1. Use normal names.
Do not introduce new internal prefixes or branded naming schemes in app code. Legacy names like `canon`, `ds`, `studio`, and `showcase` are slated for removal, not replacement with a new prefix. Avoid filler umbrella names such as `Canonical*`, `Base*`, `Core*`, `Default*`, or similar placeholders when a plain domain name is enough.

2. One visual system.
Do not introduce a second styling approach casually. New libraries may provide behavior, accessibility, data, or state, but visual output should still flow through the same shared design system.

3. Tokens before styling.
New colors, spacing, radii, motion, shadows, and layout values should enter through the shared token system first, not through one-off literals in page code.

4. Shared primitives before page-specific copies.
If a layout pattern, panel structure, table scaffold, viewer frame, or settings section will appear more than once, build it as a shared primitive before spreading variants across pages.

5. Surface-first composition.
Primary page content should sit directly on the intended panel or page surface. Avoid stacked cards and container-within-container layouts unless a nested surface is functionally necessary.

6. Dividers over extra boxes.
When a panel needs internal structure, prefer section rhythm and separators over adding more bordered containers.

7. Replace legacy as we go.
When a cleaner replacement lands, remove the outdated version in the same pass unless a short-lived migration path is truly required.

8. Keep docs current with the work.
Any structural, naming, theme, or layout change should update the relevant docs in the same change.

## Prefix Cleanup Rule

- `ds-*` is legacy.
- The target end state is zero `ds-*` prefixes left in app code.
- The target end state is also zero new replacement prefixes added in their place.
- Class names, component names, folders, and tokens should settle into plain, readable names that match what they are.

## Theme Rules

The theme editor should behave by current mode, without extra mode-specific toggle clutter.

- When editing in dark mode, changes should affect only dark mode.
- When editing in light mode, changes should affect only light mode.
- This mode-aware separation should apply to:
  - surfaces
  - accent
  - graph colors
  - background
  - selected theme preset
  - dividers

## Layout Rules

### App Shell

- The current product is still primarily a shell foundation: sidebar, rails, toolbar, menus, modals, controls, fonts, and the token system.
- New work should now shift toward real content structure and page architecture rather than further studio/demo presentation.

### Workbench

- The workbench may remain available under a simple `/lab` path.
- The dock should default to open on the left on desktop.
- The workbench should behave like internal tooling, not the main product identity.

### Split Workspace

- The split layout must be a shared primitive, not page-local resize code.
- Users should be able to drag freely, with helpful presets such as `30 / 70`, `50 / 50`, and `70 / 30`.
- Both sides should support collapse and restore without losing the prior meaningful size.

### Chat

- Transcript owns the scroll region.
- Composer is bottom-anchored.
- Chat should feel standard and expected, not overly boxed or decorative.
- Plain message content should sit naturally on the surface without unnecessary wrappers.

### Dashboards

- Layout is data, not CSS-only behavior.
- Widget placement, span, and saved dashboard state should serialize cleanly.
- Start with explicit grid structures before adopting drag-heavy dashboard builders.

### Settings

- Settings should use one shared rhythm and section structure.
- Tabs organize categories, but content should still live directly on the page surface when possible.

## Decision Gates

Pause for discussion before landing anything that:

- changes the platform direction
- adds a new styling layer
- adds a major dependency with strong visual opinions
- introduces a new naming convention
- adds a new top-level architecture layer
- changes the persistence model
