# GTM / MOps Tech Stack

Interactive visualization of a GTM/Marketing Operations tech stack, built as a single-page app with no build step required.

## Quick Start

Open `index.html` in any browser. No server or dependencies needed.

## Architecture

**4-phase horizontal pipeline** — click any phase to expand its detail panel:

| Phase | Focus |
|-------|-------|
| Plan & Orchestrate | Strategy, intake, campaign planning, MarTech governance |
| Data & Intelligence | ICP, enrichment, lead routing, scoring |
| Engage & Activate | Demand gen, ABM, events, customer marketing |
| Measure & Optimize | Attribution, pipeline reporting, spend optimization |

Each phase has 4 tabs: **Tools**, **Gaps & Opportunities**, **Industry Trends**, **AI / Claude / MCP**.

## File Structure

```
index.html      — Semantic HTML shell
styles.css      — CSS cascade layers, design tokens, responsive breakpoints
data.js         — PHASES array (tools, gaps, trends, AI use cases)
app.js          — Rendering, interactions, keyboard navigation
```

## Editing Data

All tools, gaps, trends, and AI use cases live in `data.js`. Follow the existing structure:

```js
// Add a tool
{ name: 'Tool Name', tag: 'core', desc: 'What it does' }

// Add a gap/opportunity/risk
{ type: 'gap', text: 'Description of the gap' }   // gap | opp | risk

// Add a trend
{ type: 'now', text: 'Description of the trend' }  // now | future

// Add an AI use case
{ badges: ['mcp', 'agent'], text: 'Description of the use case' }
```

## Design System

- **Theme**: Dark mode with phase color coding (blue, teal, coral, violet)
- **Typography**: Bebas Neue (headlines), DM Mono (labels), Lato (body)
- **CSS**: Cascade layers (`@layer reset, base, tokens, components, utilities`)
- **Tokens**: 8pt grid spacing, fluid `clamp()` typography, semantic color variables
- **Responsive**: Mobile-first with breakpoints at 768px and 1024px
- **Accessibility**: WCAG AA contrast, keyboard navigation, ARIA states, skip link

## Legacy

`gtm-mops-v3.html` is the original single-file version (preserved for reference).
