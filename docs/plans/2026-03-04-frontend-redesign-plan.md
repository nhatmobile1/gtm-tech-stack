# Frontend Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redesign the GTM/MOps Tech Stack Map with proper design tokens, mobile responsiveness, accessibility, AI slop removal, and split file architecture.

**Architecture:** Split single-file HTML app into 4 files (index.html, styles.css, data.js, app.js). Establish CSS cascade layers with a three-tier design token system. Add full mobile responsiveness with vertical accordion pipeline. Fix all accessibility issues.

**Tech Stack:** Vanilla HTML + CSS + JavaScript. No framework, no build step.

**Design doc:** `docs/plans/2026-03-04-frontend-redesign-design.md`

---

### Task 1: Extract data.js

**Files:**
- Create: `data.js`

**Step 1: Create data.js with the PHASES array**

Extract the entire `const PHASES = [...]` block (lines 516-734 of gtm-mops-v3.html) into a new file. This is a straight copy — no modifications to the data structure.

```js
/* GTM / MOps Tech Stack — Phase Data
   Edit this file to add/remove tools, gaps, trends, and AI use cases.
   Each phase object follows this structure:
   { id, color, icon, name, subtitle, categories[], gaps[], trends[], ai[] }
*/
const PHASES = [
  // ... exact copy of lines 516-734 from gtm-mops-v3.html
];
```

**Step 2: Verify data.js is valid JavaScript**

Open browser console, paste the file contents, confirm no syntax errors and `PHASES.length === 4`.

---

### Task 2: Create styles.css with cascade layers and design tokens

**Files:**
- Create: `styles.css`

**Step 1: Write the layer declarations and token system**

```css
/* ═══ CASCADE LAYERS ═══ */
@layer reset, base, tokens, components, utilities;

/* ═══ RESET ═══ */
@layer reset {
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
}

/* ═══ TOKENS ═══ */
@layer tokens {
  :root {
    /* Spacing — 8pt grid */
    --space-1: 4px;
    --space-2: 8px;
    --space-3: 16px;
    --space-4: 24px;
    --space-5: 32px;
    --space-6: 48px;
    --space-7: 64px;

    /* Typography — fluid clamp */
    --text-xs: clamp(0.6875rem, 0.625rem + 0.25vw, 0.75rem);
    --text-sm: clamp(0.75rem, 0.7rem + 0.2vw, 0.8125rem);
    --text-base: clamp(0.875rem, 0.8rem + 0.3vw, 1rem);
    --text-lg: clamp(1.125rem, 1rem + 0.5vw, 1.375rem);
    --text-xl: clamp(1.5rem, 1.2rem + 1.2vw, 2rem);
    --text-2xl: clamp(2rem, 1.5rem + 2vw, 2.5rem);

    /* Radii */
    --radius-sm: 3px;
    --radius-md: 6px;
    --radius-lg: 10px;

    /* Surfaces — elevation via lightness */
    --surface-0: #07080b;
    --surface-1: #0e1017;
    --surface-2: #141720;
    --surface-3: #1b1f2c;

    /* Phase colors */
    --p1: #4f8ef7;
    --p2: #29c4a0;
    --p3: #e0735a;
    --p4: #b07ef8;

    /* Text — contrast-compliant */
    --text-primary: #dde0ea;
    --text-secondary: #8a8fa6;
    --text-tertiary: #555b73;

    /* Borders */
    --border-subtle: rgba(255,255,255,0.06);
    --border-medium: rgba(255,255,255,0.11);

    /* Focus */
    --color-focus: var(--p1);
  }
}
```

**Step 2: Port all component styles from gtm-mops-v3.html into @layer components**

Migrate every CSS block from the original file into `@layer components { ... }`, making these changes as you go:

Token replacements (apply throughout):
- `var(--bg)` → `var(--surface-0)`
- `var(--surface)` → `var(--surface-1)`
- `var(--s2)` → `var(--surface-2)`
- `var(--s3)` → `var(--surface-3)`
- `var(--border)` → `var(--border-subtle)`
- `var(--border2)` → `var(--border-medium)`
- `var(--text)` → `var(--text-primary)`
- `var(--muted)` → `var(--text-secondary)`
- `var(--dim)` → `var(--text-tertiary)`
- All hardcoded spacing (44px, 24px, 16px, etc.) → nearest `var(--space-N)` token
- All hardcoded font sizes → nearest `var(--text-N)` token

AI slop removals:
- DELETE the entire `body::before` noise texture block (lines 37-43)
- DELETE `.phase:hover { transform: translateY(-4px); box-shadow: ... }` (line 196)
- DELETE `.phase.open` box-shadow glow (line 199, keep border-color)
- DELETE `.panel-accent-bar` styles (lines 264-266)

AI slop replacements:
- `.phase:hover` → `border-color: var(--phase-color); transition: border-color 0.15s;`
- `.phase:active` → `transform: scale(0.98);`
- `.phase.open` → `border-color: var(--phase-color);` (no box-shadow)
- `.panel-head` → add `border-top: 2px solid var(--phase-color);`

Typography upgrades:
- Add `text-wrap: balance;` to `.phase-name`, `.panel-title`, `h1`
- Add `font-variant-numeric: tabular-nums;` to `.phase-tool-count`

**Step 3: Add base layer styles**

```css
@layer base {
  html, body {
    background: var(--surface-0);
    color: var(--text-primary);
    font-family: 'Lato', sans-serif;
    font-size: var(--text-base);
    min-height: 100vh;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }
}
```

**Step 4: Add utilities layer**

```css
@layer utilities {
  /* Focus styles */
  :focus-visible {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* Skip link */
  .skip-link {
    position: absolute;
    top: -100%;
    left: var(--space-3);
    padding: var(--space-2) var(--space-3);
    background: var(--surface-3);
    color: var(--text-primary);
    font-family: 'DM Mono', monospace;
    font-size: var(--text-sm);
    border-radius: var(--radius-md);
    z-index: 100;
    text-decoration: none;
  }
  .skip-link:focus {
    top: var(--space-2);
  }
}
```

---

### Task 3: Add responsive breakpoints to styles.css

**Files:**
- Modify: `styles.css` (append to end of @layer components)

**Step 1: Add tablet breakpoint (768-1024px)**

```css
@media (max-width: 1024px) {
  header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-3);
  }
  .header-right {
    text-align: left;
  }
  .legend-row {
    justify-content: flex-start;
  }
}
```

**Step 2: Add mobile breakpoint (< 768px)**

```css
@media (max-width: 768px) {
  /* Global spacing reduction */
  header,
  .mcp-bar,
  .pipeline-wrap,
  .detail,
  footer {
    margin-left: var(--space-3);
    margin-right: var(--space-3);
    padding-left: var(--space-3);
    padding-right: var(--space-3);
  }

  /* Header stacks */
  header {
    padding: var(--space-4) var(--space-3) var(--space-3);
  }
  h1 { font-size: var(--text-xl); }
  .legend-row { gap: var(--space-2); }
  .legend-hint { font-size: var(--text-xs); }

  /* Pipeline goes vertical */
  .pipeline {
    flex-direction: column;
    min-width: 0;
    gap: 0;
  }
  .phase {
    width: 100%;
  }
  .connector {
    flex-direction: column;
    width: 100%;
    height: 24px;
    justify-content: center;
    align-items: center;
  }
  .conn-line {
    width: 1px;
    height: 100%;
    flex: 1;
  }
  .conn-arrow {
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 7px solid var(--text-tertiary);
    border-bottom: none;
    transform: none;
  }

  /* MCP banner stacks */
  .mcp-agents-row {
    flex-direction: column;
    gap: var(--space-2);
  }
  .mcp-agent-sep { display: none; }
  .mcp-agent-type { min-width: 0; }
  .mcp-chain { margin-left: 0; }

  /* Detail panel full-width */
  .detail {
    margin-left: 0;
    margin-right: 0;
    border-radius: 0;
  }
  .tab-body { padding: var(--space-3); }
  .panel-head { padding: var(--space-3); }
  .tab-nav { padding: 0 var(--space-3); }

  /* Tool grid single column */
  .subcat.expanded .subcat-body {
    grid-template-columns: 1fr;
  }
  .subcat-body { padding-left: var(--space-3); }

  /* Gaps grid single column */
  .gaps-grid { grid-template-columns: 1fr; }

  /* Footer stacks */
  footer {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-2);
  }
  .fsrc { margin-left: 0; }
}
```

---

### Task 4: Create index.html with semantic markup

**Files:**
- Create: `index.html`

**Step 1: Write index.html**

The HTML structure is largely the same as gtm-mops-v3.html but with these changes:

1. **Font loading** — Replace `@import` with `<link rel="preconnect">` + `<link rel="stylesheet">`
2. **External files** — `<link rel="stylesheet" href="styles.css">`, `<script src="data.js">`, `<script src="app.js">`
3. **Skip link** — First element in `<body>`: `<a href="#pipeline" class="skip-link">Skip to pipeline</a>`
4. **Semantic landmarks** — Wrap pipeline + detail panel in `<main id="pipeline-section">`
5. **Remove panel-accent-bar** — Delete `<div class="panel-accent-bar" id="panelBar"></div>` from detail panel
6. **Tab nav** — Wrap in `<nav aria-label="Phase details">`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GTM / MOps Tech Stack — 2026</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400;500&family=Lato:wght@300;400;700&display=swap">
  <link rel="stylesheet" href="styles.css">
</head>
<body>

<a href="#pipeline-section" class="skip-link">Skip to pipeline</a>

<!-- Header: same content as v3, no structural changes -->
<header>
  <div class="header-left">
    <div class="eyebrow">Marketing Systems & Operations</div>
    <h1>GTM / <em>MOps</em> Tech Stack</h1>
    <div class="header-meta">
      <span class="pill active">2025–2026</span>
      <span class="pill">4 Phases</span>
      <span class="pill">19 Tools</span>
      <span class="pill">Click phase to expand</span>
    </div>
  </div>
  <div class="header-right">
    <div class="legend-row">
      <div class="leg"><div class="leg-dot" style="background:#4f8ef7"></div>Plan &amp; Orchestrate</div>
      <div class="leg"><div class="leg-dot" style="background:#29c4a0"></div>Data &amp; Intelligence</div>
      <div class="leg"><div class="leg-dot" style="background:#e0735a"></div>Engage &amp; Activate</div>
      <div class="leg"><div class="leg-dot" style="background:#b07ef8"></div>Measure &amp; Optimize</div>
    </div>
    <div class="legend-hint">Sources: Chief Martec · Demand Gen Report · demandDrive 2026 · revlogic 2026 · MOps-Apalooza 2025</div>
  </div>
</header>

<!-- MCP Banner: same content as v3 -->
<div class="mcp-bar">
  <div class="mcp-bar-top">
    <div class="mcp-label">⬡ AI Orchestration Layer — runs across all 4 phases</div>
    <div class="mcp-chain">
      <div class="mc mc-core">Claude</div><div class="mc-arr">→</div>
      <div class="mc mc-mcp">MCP Server</div><div class="mc-arr">⇄</div>
      <div class="mc mc-tool">Marketo</div><div class="mc-arr">+</div>
      <div class="mc mc-tool">Salesforce</div><div class="mc-arr">+</div>
      <div class="mc mc-tool">Snowflake</div><div class="mc-arr">+</div>
      <div class="mc mc-tool">Clay</div><div class="mc-arr">+</div>
      <div class="mc mc-tool">Airtable</div>
    </div>
  </div>
  <div class="mcp-agents-row">
    <div class="mcp-agent-type">
      <span class="agent-badge listener">👂 Listener Agent</span>
      <span class="agent-desc">Monitors signals: intent spikes, lifecycle stalls, health score drops, routing failures</span>
    </div>
    <div class="mcp-agent-sep">→</div>
    <div class="mcp-agent-type">
      <span class="agent-badge topic">💡 Topic Agent</span>
      <span class="agent-desc">Generates content briefs, segment hypotheses, and ICP drift summaries from signals</span>
    </div>
    <div class="mcp-agent-sep">→</div>
    <div class="mcp-agent-type">
      <span class="agent-badge creator">✦ Creator Agent</span>
      <span class="agent-desc">Drafts emails, talking points, Sigma dashboards, Workato recipes — ready for human approval</span>
    </div>
  </div>
</div>

<!-- Main content -->
<main id="pipeline-section">
  <div class="pipeline-wrap">
    <div class="pipeline" id="pipeline"></div>
  </div>

  <div class="detail" id="detailPanel">
    <div class="panel-head" id="panelHead">
      <div class="panel-icon" id="panelIcon"></div>
      <div>
        <div class="panel-title" id="panelTitle"></div>
        <div class="panel-subtitle" id="panelSub"></div>
      </div>
      <button class="panel-close" id="panelClose" aria-label="Close detail panel">✕ close</button>
    </div>
    <nav aria-label="Phase details">
      <div class="tab-nav" id="tabNav"></div>
    </nav>
    <div id="tabContent"></div>
  </div>
</main>

<footer>
  <div class="fstat">🔧 <strong>19 tools</strong> mapped</div>
  <div class="fstat">⚠️ <strong>Gaps &amp; opportunities</strong> in every phase</div>
  <div class="fstat">🤖 <strong>AI/Claude/MCP</strong> use cases across all 4 phases</div>
  <div class="fsrc">Chief Martec 2025 · Demand Gen Report · demandDrive 2026 · revlogic 2026 · heyreach.io 2026 · MOps-Apalooza 2025 · Growth Unhinged</div>
</footer>

<script src="data.js"></script>
<script src="app.js"></script>
</body>
</html>
```

---

### Task 5: Create app.js with accessibility and keyboard navigation

**Files:**
- Create: `app.js`

**Step 1: Port rendering logic from gtm-mops-v3.html**

Copy the JavaScript functions (renderPipeline, togglePhase, openPanel, closePanel, switchTab, renderTabContent, toggleSubcat) from lines 739-901 of gtm-mops-v3.html.

**Step 2: Add accessibility to renderPipeline()**

Modify the phase card creation to include ARIA attributes and keyboard support:

```js
// In renderPipeline(), when creating the phase element:
el.setAttribute('role', 'button');
el.setAttribute('tabindex', '0');
el.setAttribute('aria-expanded', 'false');
el.setAttribute('aria-controls', 'detailPanel');

// Replace el.onclick with:
el.addEventListener('click', () => togglePhase(p.id));
el.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    togglePhase(p.id);
  }
});
```

**Step 3: Update openPanel() and closePanel() for ARIA**

```js
// In openPanel():
// After adding 'open' class:
document.getElementById(`phase-${id}`).setAttribute('aria-expanded', 'true');
// Remove accent bar line:
// DELETE: document.getElementById('panelBar').style.background = p.color;
// Add phase color to panel head border:
document.getElementById('panelHead').style.borderTopColor = p.color;

// In closePanel():
// After removing 'open' class:
if (activePhase) {
  document.getElementById(`phase-${activePhase}`)?.setAttribute('aria-expanded', 'false');
}
```

**Step 4: Add keyboard support to subcategory headers**

In renderTabContent, modify the subcat-head HTML to include accessibility:

```js
// Change subcat-head from onclick to include role and tabindex:
`<div class="subcat-head" role="button" tabindex="0"
      onclick="toggleSubcat('sc-${phaseId}-${ci}')"
      onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();toggleSubcat('sc-${phaseId}-${ci}')}">`
```

**Step 5: Wire up close button via addEventListener**

```js
// At end of file, after renderPipeline():
document.getElementById('panelClose').addEventListener('click', closePanel);
```

Remove the inline `onclick="closePanel()"` from index.html (already done in Task 4 — the button has `id="panelClose"` instead).

**Step 6: Add the init call**

```js
// End of app.js
renderPipeline();
```

---

### Task 6: Visual verification in browser

**Files:** None (testing only)

**Step 1: Open index.html in browser**

Open `index.html` via Live Server or directly in browser. Verify:

- [ ] All 4 phase cards render with correct colors and data
- [ ] Clicking a phase opens the detail panel with correct content
- [ ] All 4 tabs work (Tools, Gaps, Trends, AI)
- [ ] Subcategory expand/collapse works
- [ ] Close button works
- [ ] No console errors

**Step 2: Verify accessibility**

- [ ] Tab key navigates between phase cards
- [ ] Enter/Space opens a phase
- [ ] Focus outline (blue ring) visible on all interactive elements
- [ ] Skip link appears on Tab from page top

**Step 3: Verify mobile responsiveness**

Open Chrome DevTools → toggle device toolbar:

- [ ] At 375px width: pipeline is vertical, cards full-width
- [ ] Connectors show vertical down-arrows
- [ ] MCP banner agents stack vertically
- [ ] Header stacks (left block above legend)
- [ ] Detail panel is full-width
- [ ] Tool cards are single-column
- [ ] Footer stats stack vertically
- [ ] No horizontal scrollbar

**Step 4: Verify reduced motion**

In Chrome DevTools → Rendering → check "Emulate CSS prefers-reduced-motion: reduce":

- [ ] No animations or transitions fire

**Step 5: Verify token consistency**

Inspect a few elements and confirm:
- [ ] No hardcoded `#606680` or `#383d52` colors remain (should be --text-secondary / --text-tertiary)
- [ ] No hardcoded `44px` margins remain (should be spacing tokens)
- [ ] Font sizes use `var(--text-*)` tokens

---

### Task 7: Commit

**Step 1: Stage and commit all new files**

```bash
git init
git add index.html styles.css data.js app.js docs/plans/
git commit -m "feat: redesign GTM/MOps tech stack with design tokens, mobile responsive, accessibility

- Split single-file app into index.html, styles.css, data.js, app.js
- Establish CSS cascade layers (@layer reset, base, tokens, components, utilities)
- Add 8pt grid spacing tokens, fluid clamp() typography, semantic color tokens
- Fix WCAG contrast: --text-secondary #8a8fa6, --text-tertiary #555b73
- Add full mobile responsiveness at 768px and 1024px breakpoints
- Vertical accordion pipeline on mobile, stacked MCP banner, single-column grids
- Add keyboard navigation (role=button, tabindex, Enter/Space handlers)
- Add ARIA attributes (aria-expanded, aria-controls, aria-label)
- Add skip link, semantic <main>/<nav> landmarks
- Add prefers-reduced-motion support
- Remove AI slop: noise texture, hover-lift, accent bars, glow shadows
- Replace with sharp border-color transitions and scale-down press
- Fix font loading: @import → preconnect + link
- Add text-wrap: balance on headlines, tabular-nums on counts
- Preserve gtm-mops-v3.html as legacy reference"
```

---

## Task Dependency Graph

```
Task 1 (data.js) ─────────┐
                           ├──→ Task 4 (index.html) ──→ Task 5 (app.js) ──→ Task 6 (verify) ──→ Task 7 (commit)
Task 2 (styles.css) ───────┤
                           │
Task 3 (responsive CSS) ───┘
        (appended to Task 2's file)
```

Tasks 1, 2, and 3 can be done in parallel (independent files). Task 3 appends to the file created in Task 2. Tasks 4 and 5 depend on all prior tasks. Task 6 is verification. Task 7 is commit.
