# GTM / MOps Tech Stack — Frontend Redesign Design Doc

**Date:** 2026-03-04
**Status:** Approved
**Author:** Nhat + Claude Code

---

## Summary

Redesign the GTM/MOps Tech Stack Map app to fix accessibility, add mobile responsiveness, remove AI slop patterns, establish a design token system, optimize font loading, and split the single-file architecture into separate HTML/CSS/JS/data files.

**Tech stack:** Plain HTML + CSS + JavaScript (no framework, no build step).

---

## Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Architecture | Split into 4 files (index.html, styles.css, data.js, app.js) | Maintainability without build-step friction |
| Framework | None (vanilla JS) | App is read-only data viz; framework overhead not justified |
| Interaction style | Sharp & technical | Matches dark terminal aesthetic; crisp border transitions, scale-down on press |
| Mobile strategy | Vertical accordion pipeline | Phase cards stack, detail expands inline below card |
| Token system | CSS custom properties with @layer | Three-tier: primitive → semantic → component |

---

## 1. File Structure

```
gtm-tech-stack/
├── index.html          # Semantic markup, link/script tags
├── styles.css          # @layer declarations, tokens, responsive CSS
├── data.js             # PHASES array (plain const, no modules)
├── app.js              # Rendering, interactions, keyboard nav
├── docs/plans/         # Design docs
└── gtm-mops-v3.html    # Preserved as legacy reference
```

- `data.js` and `app.js` loaded via `<script src>` (no ES modules — works with file://)
- `data.js` loads first so `PHASES` is available to `app.js`

---

## 2. Design Token System

### Cascade layers (priority order, lowest → highest):
```
@layer reset, base, tokens, components, utilities
```

### Tokens:

**Spacing (8pt grid):**
- `--space-1` through `--space-7` (4px → 64px)

**Typography (fluid clamp):**
- `--text-xs`: 11-12px
- `--text-sm`: 12-13px
- `--text-base`: 14-16px
- `--text-lg`: 18-22px
- `--text-xl`: 24-32px
- `--text-2xl`: 32-40px

**Surfaces (elevation via lightness):**
- `--surface-0`: #07080b (base)
- `--surface-1`: #0e1017 (cards)
- `--surface-2`: #141720 (raised)
- `--surface-3`: #1b1f2c (highest)

**Text (contrast-compliant):**
- `--text-primary`: #dde0ea
- `--text-secondary`: #8a8fa6 (bumped from #606680 for WCAG)
- `--text-tertiary`: #555b73 (bumped from #383d52 for WCAG)

**Borders:**
- `--border-subtle`: rgba(255,255,255,0.06)
- `--border-medium`: rgba(255,255,255,0.11)

**Radii:**
- `--radius-sm`: 3px, `--radius-md`: 6px, `--radius-lg`: 10px

**Phase colors (unchanged):**
- `--p1`: #4f8ef7, `--p2`: #29c4a0, `--p3`: #e0735a, `--p4`: #b07ef8

---

## 3. AI Slop Removal

| Remove | Replace with |
|--------|-------------|
| `body::before` noise texture SVG overlay | Nothing — clean dark surface |
| `.panel-accent-bar` (left vertical stripe) | `border-top: 2px solid var(--phase-color)` on panel header |
| `.phase:hover` translateY(-4px) lift | Border-color transition to phase color |
| `.phase.open` colored box-shadow glow | Solid border-color only |
| `.phase:hover` box-shadow | No shadow — border only |

### New interaction model:
- **Hover:** `border-color: var(--phase-color)` with `0.15s` transition
- **Active/press:** `scale(0.98)` press-down
- **Tab switch:** Bottom border slides in via transition
- **Panel entrance:** `translateY(-6px)` fade-in preserved (functional)

---

## 4. Mobile Responsive Layout

### Breakpoints:
- `> 1024px`: Desktop — horizontal pipeline, side-by-side header
- `768px–1024px`: Tablet — pipeline scrolls horizontally, header stacks
- `< 768px`: Mobile — vertical accordion pipeline, single-column everything

### Mobile pipeline (< 768px):
- Phase cards stack vertically, full-width
- Connectors become vertical down-arrows
- Detail panel expands inline below tapped card
- One phase open at a time

### Mobile header:
- Header left/right stack vertically
- Legend wraps to 2x2 grid
- Padding reduced from 44px to `var(--space-3)` (16px)

### Mobile MCP banner:
- Agent types stack vertically (remove → separators)
- MCP chain pills wrap

### Mobile detail panel:
- Tab nav scrolls horizontally
- Tool grid → single column
- Gaps grid → single column

### Mobile footer:
- Stats stack vertically, source wraps

---

## 5. Accessibility

### Keyboard navigation:
- Phase cards: `role="button"`, `tabindex="0"`, Enter/Space handlers
- Subcategory headers: `role="button"`, `tabindex="0"`
- All interactive elements get visible focus styles

### Focus style:
```css
:focus-visible {
  outline: 2px solid var(--p1);
  outline-offset: 2px;
}
```

### Semantic HTML:
- `<main>` wraps pipeline + detail panel
- `<nav>` wraps tab navigation
- `aria-expanded` on phase cards
- `aria-controls` linking cards to detail panel
- Skip link as first focusable element

### Contrast fixes:
- `--text-secondary` bumped to #8a8fa6 (passes 4.5:1)
- `--text-tertiary` bumped to #555b73 (passes 3:1 for UI)
- Minimum font size: 11px (from 9px)

### Reduced motion:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 6. Font Loading & Performance

### Font loading fix:
- Remove `@import` from CSS
- Add `<link rel="preconnect">` + `<link rel="stylesheet">` in `<head>`

### Other performance:
- Remove noise texture (eliminates fixed-position repaint)
- `contain: layout` on detail panel
- `text-wrap: balance` on Bebas Neue headlines
- `font-variant-numeric: tabular-nums` on tool counts

---

## Out of Scope (future work)

- Admin/inline editing mode
- Global search bar
- Roadmap tab
- Tool logos/icons
- Export to PNG
- Live Airtable connection
- Stack Health Score metric
