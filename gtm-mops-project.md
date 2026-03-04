# GTM / MOps Tech Stack Map — Claude Code Handoff

## Project Overview

An interactive HTML single-file app visualizing Benchling's GTM/Marketing Operations tech stack. Built for Nhat (Senior Manager, Marketing Systems & Operations at Benchling). The current deliverable is `gtm-mops-v3.html`.

---

## Current State (v3)

### What exists
- Single-file HTML app (~850 lines) with embedded CSS + JS
- 4-phase horizontal pipeline with click-to-expand detail panels
- Each phase has 4 tabs: Tools, Gaps & Opportunities, Industry Trends, AI/Claude/MCP
- AI Orchestration Layer banner (Listener → Topic → Creator agent types)
- Dark theme: Bebas Neue headlines, DM Mono monospace, Lato body
- Phase color coding: Blue (Plan), Teal (Data), Coral (Engage), Violet (Measure)

### File location
`gtm-mops-v3.html` — load directly in browser, no build step needed

---

## Architecture

### 4 Phases

| # | Phase | Color | Focus |
|---|-------|-------|-------|
| 1 | Plan & Orchestrate | `#4f8ef7` blue | Strategy, intake, campaign planning, MarTech governance |
| 2 | Data & Intelligence | `#29c4a0` teal | ICP, enrichment, lead routing, scoring |
| 3 | Engage & Activate | `#e0735a` coral | Demand gen, ABM, events, customer marketing |
| 4 | Measure & Optimize | `#b07ef8` violet | Attribution, pipeline reporting, spend optimization |

### Tool Inventory (19 tools mapped)

**Phase 1:** Airtable, Workato, Confluence, Google Docs/Slides, Figma, Contentful, Google Sheets, Salesforce (cross), Marketo (cross)

**Phase 2:** Snowflake, Sigma, Clay, Salesforce (cross), LinkedIn (cross), LeanData, Workato (cross), Marketo (cross)

**Phase 3:** Marketo, Workato (cross), RollWorks, LinkedIn (cross), Cvent, Splash, Salesforce (cross), Gainsight, Insided/Gainsight CC, Contentful (cross), Google Analytics/GTM

**Phase 4:** RampMetrics, Salesforce (cross), Marketo (cross), Sigma (cross), Snowflake (cross), Google Analytics (cross), RollWorks (cross), LinkedIn (cross), Google Analytics/GTM (cross)

### Data Structure (JavaScript)
Each phase is an object in the `PHASES` array:
```js
{
  id: 1,
  color: '#4f8ef7',
  icon: '📐',
  name: 'Plan &\nOrchestrate',
  subtitle: '...',
  categories: [
    {
      name: 'Category Name',
      tools: [
        { name: 'Tool', tag: 'core' | 'cross', desc: '...' }
      ]
    }
  ],
  gaps: [
    { type: 'gap' | 'opp' | 'risk', text: '...' }
  ],
  trends: [
    { type: 'now' | 'future', text: '...' }
  ],
  ai: [
    { badges: ['mcp', 'agent', 'code', 'claude'], text: '...' }
  ]
}
```

---

## Key Gaps Identified (prioritized)

### Critical
- **No intent data** (6sense, Bombora, G2) — missing in-market buying signals before leads enter funnel
- **No conversational marketing** (Qualified, Drift) — missing real-time website visitor engagement; now table stakes for B2B

### Operational
- **Post-event follow-up is manual** — no systematic hot/warm/cold segmentation → Marketo nurture
- **Gainsight health scores not feeding Marketo** — CS and Marketing operate in silos
- **No SLA monitoring dashboard** — leads aging past response SLA aren't surfaced in real-time

### Strategic
- **RampMetrics + Sigma potential overlap** — needs agreed attribution source of truth
- **No Marketing Mix Modeling (MMM)** — can't optimize budget allocation at portfolio level
- **No formal SaaS governance/renewal calendar** — tool sprawl risk

---

## AI / Claude / MCP Use Cases (by phase)

### Phase 1 — Plan & Orchestrate
- `MCP + Agent`: Airtable intake → Claude reads brief → auto-populates UTMs, Marketo program settings, asset checklist, routes for approval
- `Claude Code`: Builds Airtable→Marketo scaffolding via Workato recipes from campaign template specs
- `Agent`: Pre-launch QA — audits Marketo program before go-live, checks tokens/suppression/UTMs, flags to Slack

### Phase 2 — Data & Intelligence
- `MCP + Claude`: Snowflake MCP → weekly ICP drift reports; flags accounts moving in/out of ICP
- `Claude Code`: Python pipeline — Snowflake product signals → Clay enrichment → Salesforce score update
- `Agent`: SFDC MCP — detects leads stuck >7 days, drafts Slack alerts for SDR managers

### Phase 3 — Engage & Activate
- `MCP + Agent`: Cvent attendance → Workato → Claude segments attendees → writes 3 email variants per segment → loads to Marketo
- `Agent`: Gainsight health score drop → webhook → Claude reads SFDC context → drafts CSM talking points to Slack
- `Claude Code`: Splash webhook → Marketo API real-time check-in sync; replaces manual CSV uploads

### Phase 4 — Measure & Optimize
- `MCP + Claude`: Snowflake MCP → weekly pipeline attribution narrative for execs
- `Claude Code`: Builds parameterized Sigma dashboard templates pre-wired to Snowflake
- `Agent`: Weekly MOps digest — pulls Marketo + SFDC + Sigma → 5-bullet summary → posts to Slack Monday morning

---

## Industry Trends Incorporated (as of March 2026)

### Sources
Chief Martec 2025, State of Martech 2025, Demand Gen Report 2025, MOps-Apalooza 2025, demandDrive 2026, revlogic 2026, heyreach.io 2026, Growth Unhinged (Austin Hay / Clarify), ZoomInfo GTM Intelligence Report 2025

### Key themes
- **AI Orchestration Layer** is now its own stack tier (Listener → Topic → Creator agents)
- **Warehouse-first federation**: inputs → storage → capabilities → federation model
- **Signal-based selling** is now standard (not emerging) — buying signals over static firmographics
- **Stack consolidation** over best-of-breed: "stop adding, start connecting" (demandDrive 2026)
- **"Useful signals, not more visibility"** is the 2026 Measure & Optimize differentiator
- **Conversational AI** on websites moving from nice-to-have → standard for B2B
- **Attribution as decision dependency** — CFOs/boards use it for budget allocation

---

## Potential Next Features (ideas to continue building)

### Visual / UX
- [ ] Add a 5th "horizontal layer" row below the pipeline for the AI Orchestration Layer with visual connections to each phase
- [ ] Add a tool relationship/integration map view (toggle between phase view and integration graph)
- [ ] Add a "gaps only" filter mode that highlights phases with critical gaps
- [ ] Export to PNG / shareable link functionality
- [ ] Mobile responsive layout

### Content
- [ ] Add a "Roadmap" tab to each phase (what tools to evaluate/add in 2026)
- [ ] Add tool logos/icons to tool cards
- [ ] Add a global search/filter bar for finding tools across phases
- [ ] Add a "Stack Health Score" header metric (e.g., gaps filled / total identified)
- [ ] Add ROI/effort matrix for gap priorities

### Data
- [ ] Move PHASES data out to a separate `data.js` or `data.json` file for easier editing
- [ ] Add version history / changelog section
- [ ] Add a "Compare to industry benchmark" mode

### Integrations (advanced)
- [ ] Connect to a live Airtable base so tool/gap data can be edited without touching code
- [ ] Add Claude API integration to generate new AI use case suggestions dynamically

---

## Design System Reference

### Typography
```css
font-family: 'Bebas Neue'  /* headlines, phase names */
font-family: 'DM Mono'     /* labels, tags, monospace UI */
font-family: 'Lato'        /* body, descriptions */
```

### CSS Variables
```css
--bg:      #07080b   /* page background */
--surface: #0e1017   /* card background */
--s2:      #141720   /* elevated surface */
--s3:      #1b1f2c   /* most elevated */
--border:  rgba(255,255,255,0.06)
--border2: rgba(255,255,255,0.11)
--text:    #dde0ea
--muted:   #606680
--dim:     #383d52
```

### Badge types (AI tab)
```js
badges: ['mcp', 'agent', 'code', 'claude']
// mcp    → purple  — MCP server integration
// agent  → pink    — autonomous agent workflow
// code   → teal    — Claude Code / programmatic
// claude → blue    — Claude direct interaction
```

### Gap/trend types
```js
// gaps
type: 'gap'  → yellow warning
type: 'opp'  → teal opportunity
type: 'risk' → coral risk

// trends
type: 'now'    → teal  — happening today
type: 'future' → blue  — emerging/next
```

---

## Context on Owner

- **Nhat** — Senior Manager, Marketing Systems & Operations, Benchling
- Background: 9+ yrs MOps across B2B SaaS (Intercom, Malwarebytes), Marketo Certified Expert
- Stack expertise: Marketo, Salesforce, Workato, Snowflake, Sigma, Clay, LeanData, RampMetrics
- Director-driven development style: describes outcomes, Claude Code executes implementation
- Goal for this artifact: use as a strategic communication tool for leadership and cross-functional alignment

---

## Prompt Suggestions for Claude Code

**To add a new tool:**
> "Add [Tool Name] to Phase [X] under the [Category] sub-category. Tag it as core/cross. Description: [desc]"

**To add a new gap:**
> "Add a gap/opportunity/risk to Phase [X]: [text]"

**To add a new trend:**
> "Add a 'now'/'future' trend to Phase [X]: [text]"

**To build new features:**
> "Add a 5th tab to each phase called 'Roadmap' that lists tools to evaluate in 2026 with priority (high/medium/low) and estimated impact"

> "Add a global search bar at the top that filters tool cards across all phases in real time as I type"

> "Refactor the PHASES data into a separate JSON structure and add an admin edit mode where I can click any tool card to edit its description inline"
