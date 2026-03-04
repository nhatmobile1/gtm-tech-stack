# CLAUDE.md — Project Instructions for Claude Code

## Project Overview

GTM/MOps Tech Stack visualization — a static HTML/CSS/JS app with no build step. Open `index.html` in a browser to run.

## File Structure

- `index.html` — Semantic HTML shell (fonts, landmarks, scripts)
- `styles.css` — All styles using CSS cascade layers
- `data.js` — `PHASES` array with all content (tools, gaps, trends, AI use cases)
- `app.js` — Rendering logic, interactions, keyboard navigation
- `gtm-mops-v3.html` — Legacy single-file version (do not modify)
- `gtm-mops-project.md` — Detailed project documentation and handoff notes

## Key Conventions

### CSS
- Uses `@layer reset, base, tokens, components, utilities` — respect layer order
- Design tokens defined as CSS custom properties in `:root` within `@layer tokens`
- 8pt grid spacing: `--space-1` (4px) through `--space-7` (64px)
- Fluid typography via `clamp()`: `--text-xs` through `--text-2xl`
- Phase colors: blue (`#4f8ef7`), teal (`#29c4a0`), coral (`#e0735a`), violet (`#b07ef8`)
- Responsive breakpoints: 1024px (tablet), 768px (mobile)

### JavaScript
- No frameworks, no modules, no build step — plain JS loaded via `<script>` tags
- `data.js` loads first (defines global `PHASES`), then `app.js` consumes it
- All DOM manipulation uses `document.getElementById` / `querySelector`
- Event listeners use `addEventListener` (no inline handlers)

### Data Editing
- To add/modify tools, gaps, trends, or AI use cases: edit `data.js` only
- Each phase object: `{ id, color, icon, name, subtitle, categories[], gaps[], trends[], ai[] }`
- Tool tags: `'core'` (primary) or `'cross'` (cross-phase)
- Gap types: `'gap'` | `'opp'` | `'risk'`
- Trend types: `'now'` | `'future'`
- AI badges: `'mcp'` | `'agent'` | `'code'` | `'claude'`

### Accessibility
- Phase cards have `role="button"`, `tabindex="0"`, `aria-expanded`, `aria-controls`
- Subcategory headers have `role="button"`, `tabindex="0"`, keyboard handlers
- Escape key closes detail panel
- Skip link targets `#pipeline-section`
- `prefers-reduced-motion` disables all animations

### What NOT to Do
- Do not add a build step or bundler — this must remain a static file app
- Do not use ES modules (`import`/`export`) — must work with `file://` protocol
- Do not modify `gtm-mops-v3.html` — it's the preserved legacy version
- Do not add Benchling or any company branding
