/* GTM / MOps Tech Stack — Phase Data
   Edit this file to add/remove tools, gaps, trends, and AI use cases.
   Each phase object follows this structure:
   { id, color, icon, name, subtitle, categories[], gaps[], trends[], ai[] }
*/
const PHASES = [
  {
    id: 1,
    color: '#3d73cc',
    icon: '📐',
    name: 'Plan &\nOrchestrate',
    subtitle: 'Strategy, intake, campaign planning, project management & MarTech governance',
    categories: [
      {
        name: 'Campaign & Project Mgmt',
        tools: [
          { name: 'Airtable',    tag: 'core',  desc: 'Campaign intake, creative briefs, launch calendar, program tracking, run-of-show for events' },
          { name: 'Workato',     tag: 'core',  desc: 'Automation of intake → program creation workflows; approval routing between Airtable, Marketo, SFDC' },
          { name: 'Confluence',  tag: 'core',  desc: 'SOPs, naming conventions, playbooks, onboarding docs, integration diagrams' },
          { name: 'Google Docs/Slides', tag: 'core', desc: 'Campaign briefs, stakeholder decks, planning docs' },
          { name: 'Figma',       tag: 'core',  desc: 'Creative design, ad templates, landing page mockups, brand assets' },
        ]
      },
      {
        name: 'Content & Asset Management',
        tools: [
          { name: 'Contentful',  tag: 'core',  desc: 'Headless CMS for web content, landing pages, product pages' },
          { name: 'Google Sheets', tag: 'core', desc: 'Budget planning, media spend tracking, ad-hoc data handoffs' },
        ]
      },
      {
        name: 'MarTech Governance',
        tools: [
          { name: 'Salesforce',  tag: 'cross', desc: 'System of record; field governance, data standards, territory definitions' },
          { name: 'Marketo',     tag: 'cross', desc: 'Program template library, naming conventions, scoring model governance' },
          { name: 'Workato',     tag: 'cross', desc: 'Integration recipe management, error monitoring, stack orchestration layer' },
        ]
      }
    ],
    gaps: [
      { type: 'gap', text: 'No formal stack governance process or renewal calendar — tool sprawl risk without a central SaaS inventory owner.' },
      { type: 'gap', text: 'Campaign intake → Marketo program creation is partially automated via Workato but still requires manual QA steps.' },
      { type: 'opp', text: 'Airtable as a full "Campaign OS": intake → brief → asset tracking → launch checklist → post-mortem, all in one base.' },
      { type: 'opp', text: 'Claude Code can auto-generate Marketo field documentation and Workato recipe inventories from API calls — removing manual upkeep.' },
    ],
    trends: [
      { type: 'now',    text: 'Campaign OS model: Single Airtable/Notion base as the source of truth for all campaign work replaces scattered docs and Slack threads (MOps-Apalooza 2025).' },
      { type: 'now',    text: 'Tiered SLA frameworks (T1 = 5 days, T2 = 2 weeks) becoming standard in mature MOps orgs for predictable launch velocity.' },
      { type: 'now',    text: 'Stack consolidation vs. best-of-breed tension: leading teams are simplifying and integrating rather than adding new tools — "stop adding, start connecting" (demandDrive 2026).' },
      { type: 'future', text: 'Self-documenting stacks: AI agents read integrations and auto-update Confluence documentation continuously — no human maintenance.' },
    ],
    ai: [
      { badges: ['mcp','agent'], text: 'New Airtable intake record → Claude reads brief via MCP → auto-populates UTM parameters, Marketo program settings, asset checklist, and routes for approval.' },
      { badges: ['code'],        text: 'Claude Code builds Airtable→Marketo scaffolding: generates Workato recipes from campaign template specs, reducing setup from hours to minutes.' },
      { badges: ['agent'],       text: 'Pre-launch QA agent: Claude audits Marketo program before go-live — checks tokens, suppression lists, UTMs, and smart list logic. Flags issues to Slack.' },
    ]
  },
  {
    id: 2,
    color: '#1f8f74',
    icon: '🧬',
    name: 'Data &\nIntelligence',
    subtitle: 'ICP definition, data enrichment, audience building, lead routing & scoring foundation',
    categories: [
      {
        name: 'Data Warehouse & BI',
        tools: [
          { name: 'Snowflake',   tag: 'core',  desc: 'Unified data warehouse — marketing, sales, product, and CS data; backbone for all reporting and AI workflows' },
          { name: 'Sigma',       tag: 'core',  desc: 'Self-serve BI and dashboards connected directly to Snowflake; marketing and pipeline reporting' },
        ]
      },
      {
        name: 'Enrichment & ICP',
        tools: [
          { name: 'Clay',        tag: 'core',  desc: 'Waterfall data enrichment, ICP scoring, contact/account data append; pre-routing enrichment workflows' },
          { name: 'Salesforce',  tag: 'cross', desc: 'Account/contact source of truth; TAM segmentation, firmographic storage, territory definitions' },
          { name: 'LinkedIn',    tag: 'cross', desc: 'Firmographic signals, audience targeting inputs, job change triggers for Clay workflows' },
        ]
      },
      {
        name: 'Lead Routing & Lifecycle',
        tools: [
          { name: 'LeanData',    tag: 'core',  desc: 'Lead-to-account matching, territory-based routing, round-robin assignment, routing analytics' },
          { name: 'Workato',     tag: 'cross', desc: 'Marketo↔SFDC lifecycle sync, recycled lead programs, routing trigger automation' },
          { name: 'Marketo',     tag: 'cross', desc: 'Lead scoring model, lifecycle stage transitions, MQL thresholds, program membership' },
        ]
      }
    ],
    gaps: [
      { type: 'gap',  text: 'No intent data provider (6sense, Bombora, G2). Missing buying signals before leads enter the funnel — blind spot for in-market accounts.' },
      { type: 'gap',  text: 'No SLA monitoring dashboard — leads aging past response SLA aren\'t surfaced in real-time to SDR managers.' },
      { type: 'opp',  text: 'Snowflake + Clay pipeline: warehouse-native ICP enrichment without a CDP. Product usage signals + firmographics = smarter scoring.' },
      { type: 'opp',  text: 'LeanData routing logs → Snowflake → Sigma: real-time lead routing quality and SLA compliance dashboard.' },
    ],
    trends: [
      { type: 'now',    text: 'Warehouse-native enrichment replacing point CDPs at mid-market scale — Snowflake→Clay→Marketo is the new standard data pipeline.' },
      { type: 'now',    text: 'Composite lead scoring: behavioral + firmographic + product usage signals vs. simple point models (MOps-Apalooza top priority 2025).' },
      { type: 'now',    text: 'Signal-based selling is now standard: tools trigger outreach from buying signals (hiring spikes, funding rounds, tech changes) not static firmographics (heyreach.io 2026).' },
      { type: 'now',    text: 'Warehouse-first federation: GTM stacks built on inputs → storage → capabilities → federation. Stack flexibility = ability to build and stream audiences to any destination without data lock-in.' },
      { type: 'now',    text: 'Waterfall enrichment is the new standard: sequential multi-provider append (Clay → fallback providers) replaces single-source data — no single vendor has complete coverage (coldIQ 2026).' },
      { type: 'future', text: 'AI-native routing: Claude agents read account context, territory rules, and rep capacity to dynamically assign leads — no static rule sets.' },
    ],
    ai: [
      { badges: ['mcp','claude'], text: 'Snowflake MCP → Claude auto-generates weekly ICP drift reports: flags accounts moving in/out of ICP, surfaces top expansion signals.' },
      { badges: ['code'],         text: 'Claude Code builds a Python pipeline: Snowflake product signals → Clay enrichment → Salesforce account score update. Zero manual CSV exports.' },
      { badges: ['agent'],        text: 'SFDC MCP: Claude detects leads stuck in lifecycle stages >7 days, drafts Slack alerts for SDR managers with full context and recommended action.' },
      { badges: ['mcp','agent'],   text: 'Waterfall enrichment monitor: Claude tracks Clay enrichment fill rates via MCP, flags coverage drops by provider, and recommends provider reordering to maximize match rates.' },
    ]
  },
  {
    id: 3,
    color: '#c06047',
    icon: '⚡',
    name: 'Engage &\nActivate',
    subtitle: 'Campaign execution, demand gen, ABM, events, customer marketing & lifecycle programs',
    categories: [
      {
        name: 'Marketing Automation & Email',
        tools: [
          { name: 'Marketo',     tag: 'core',  desc: 'Email campaigns, engagement programs, nurture tracks, smart lists, A/B testing, lifecycle programs' },
          { name: 'Workato',     tag: 'cross', desc: 'Cross-system triggers: event check-ins, form fills, enrichment completed → Marketo program actions' },
        ]
      },
      {
        name: 'ABM & Paid',
        tools: [
          { name: 'RollWorks',   tag: 'core',  desc: 'ABM display ads, account targeting, site retargeting, intent-based ad activation' },
          { name: 'LinkedIn',    tag: 'cross', desc: 'Sponsored content, lead gen forms, matched audiences, account-based campaigns' },
        ]
      },
      {
        name: 'Events & Field Marketing',
        tools: [
          { name: 'Cvent',       tag: 'core',  desc: 'Large-scale event registration, logistics, hotel blocks, badge management, enterprise events' },
          { name: 'Splash',      tag: 'core',  desc: 'Branded event pages, virtual/hybrid events, field events, on-site check-in' },
          { name: 'Marketo',     tag: 'cross', desc: 'Event program setup, pre/post nurture, attendee lifecycle tracking, campaign member status' },
          { name: 'Salesforce',  tag: 'cross', desc: 'Campaign member tracking, event-influenced pipeline, opportunity association' },
        ]
      },
      {
        name: 'Customer Marketing & Retention',
        tools: [
          { name: 'Gainsight',   tag: 'core',  desc: 'Customer health scores, CSM workflows, renewal alerts, QBR tracking, expansion signals' },
          { name: 'Insided / Gainsight CC', tag: 'core', desc: 'Customer community, product forums, engagement tracking, knowledge base' },
          { name: 'Marketo',     tag: 'cross', desc: 'Customer nurture programs, expansion campaigns, onboarding sequences, re-engagement' },
          { name: 'Salesforce',  tag: 'cross', desc: 'Renewal tracking, expansion opportunities, account health visibility for CS and Marketing' },
        ]
      },
      {
        name: 'Web & Digital',
        tools: [
          { name: 'Contentful',  tag: 'cross', desc: 'Landing page delivery for campaigns; content syndication to digital channels' },
          { name: 'Google Analytics / GTM', tag: 'core', desc: 'Web traffic, channel performance, form conversion tracking, tag management' },
        ]
      }
    ],
    gaps: [
      { type: 'gap',  text: 'No conversational marketing tool (Qualified, Drift). Missing real-time website visitor engagement for in-market accounts.' },
      { type: 'gap',  text: 'Post-event follow-up is manual — no systematic hot/warm/cold attendee segmentation driving immediate Marketo nurture.' },
      { type: 'gap',  text: 'Gainsight health scores not feeding back into Marketo for dynamic customer segmentation — CS and Marketing operate in silos.' },
      { type: 'opp',  text: 'Workato bridge: Splash/Cvent check-in → Marketo campaign member status → SFDC in real-time. Eliminate manual post-event uploads.' },
      { type: 'opp',  text: 'Gainsight→Marketo integration: health score drops auto-trigger Marketing re-engagement programs without CSM intervention.' },
    ],
    trends: [
      { type: 'now',    text: 'Events as pipeline acceleration: attendee-to-opportunity velocity becoming a core MOps KPI, not just a brand awareness metric (2025).' },
      { type: 'now',    text: 'Customer marketing as a revenue function: expansion pipeline from Marketing-sourced programs tracked separately from CS-led renewal.' },
      { type: 'now',    text: 'Conversational AI on websites moving from "nice to have" to standard: real-time web visitor engagement is now table stakes for mid-market B2B (MOps-Apalooza 2025).' },
      { type: 'future', text: 'Agentic demand gen: AI drafts, tests, and iterates email/ad copy with human approval gates — humans set strategy, agents execute.' },
    ],
    ai: [
      { badges: ['mcp','agent'], text: 'Post-event: Cvent attendance data → Workato → Claude segments attendees by engagement → writes 3 personalized email variants per segment, loads into Marketo.' },
      { badges: ['agent'],       text: 'Gainsight health score drop → Workato webhook → Claude reads SFDC account context → drafts CSM-ready re-engagement talking points to Slack.' },
      { badges: ['code'],        text: 'Claude Code builds Splash webhook → Marketo API: real-time check-in → program member status sync. Replaces post-event manual CSV upload process.' },
    ]
  },
  {
    id: 4,
    color: '#7e5ab8',
    icon: '📡',
    name: 'Measure &\nOptimize',
    subtitle: 'Attribution, pipeline reporting, performance analytics, spend optimization & continuous improvement',
    categories: [
      {
        name: 'Attribution & Revenue Analytics',
        tools: [
          { name: 'RampMetrics', tag: 'core',  desc: 'Multi-touch attribution modeling, marketing influence on pipeline, channel ROI reporting' },
          { name: 'Salesforce',  tag: 'cross', desc: 'Campaign influence reports, pipeline by source, funnel stage tracking, opportunity attribution' },
          { name: 'Marketo',     tag: 'cross', desc: 'Email/program performance, revenue cycle explorer, engagement scoring, A/B results' },
        ]
      },
      {
        name: 'Business Intelligence & Dashboards',
        tools: [
          { name: 'Sigma',       tag: 'cross', desc: 'Self-serve BI dashboards; blend RampMetrics + SFDC + product usage data in one view via Snowflake' },
          { name: 'Snowflake',   tag: 'cross', desc: 'Single source of truth for all GTM data; powers all downstream analytics and AI workflows' },
          { name: 'Google Analytics', tag: 'cross', desc: 'Web channel performance, traffic source analysis, conversion funnel tracking' },
        ]
      },
      {
        name: 'Channel Performance',
        tools: [
          { name: 'RollWorks',   tag: 'cross', desc: 'ABM ad performance, account-level engagement metrics, pipeline influenced by display' },
          { name: 'LinkedIn',    tag: 'cross', desc: 'Paid campaign analytics, lead gen form performance, audience reach reporting' },
          { name: 'Google Analytics / GTM', tag: 'cross', desc: 'Tag-based tracking, UTM attribution, goal conversion reporting across web properties' },
        ]
      }
    ],
    gaps: [
      { type: 'gap',  text: 'RampMetrics + Sigma may have overlapping attribution reporting — needs an agreed source of truth for pipeline influence across GTM.' },
      { type: 'gap',  text: 'No Marketing Mix Modeling (MMM) capability — can\'t optimize budget allocation across paid, events, and organic at a portfolio level.' },
      { type: 'risk', text: 'Traditional attribution relying on email opens/clicks is increasingly inaccurate due to privacy changes (iOS, cookie deprecation). Needs micro-behavior signals.' },
      { type: 'opp',  text: 'Snowflake as attribution backbone: pipe RampMetrics data into Snowflake so Sigma can blend it with product usage + CS health for a true full-funnel view.' },
    ],
    trends: [
      { type: 'now',    text: 'Attribution is now a "decision dependency" — CFOs and boards use it for budget allocation, not just marketing reporting (Demand Gen Report 2025).' },
      { type: 'now',    text: '"Useful signals, not more visibility" is the 2026 differentiator — dashboards are table stakes; the edge is operationalizing insights into automated action (revlogic 2026).' },
      { type: 'now',    text: 'Predictive attribution replacing rule-based models: connecting micro-behaviors (session depth, content type) to revenue outcomes is the new standard.' },
      { type: 'future', text: 'Natural language reporting: "What drove pipeline last quarter?" → Claude queries Snowflake and returns plain-English executive narrative with recommendations.' },
    ],
    ai: [
      { badges: ['mcp','claude'], text: 'Snowflake MCP → Claude generates executive pipeline attribution narrative weekly: what drove pipeline, what underperformed, recommended budget shifts.' },
      { badges: ['code'],         text: 'Claude Code builds parameterized Sigma dashboard templates for each campaign type, pre-wired to Snowflake — deployable in minutes vs. hours.' },
      { badges: ['agent'],        text: 'Weekly MOps digest agent: Claude pulls Marketo + SFDC + Sigma data, writes a 5-bullet performance summary, posts to Slack every Monday morning.' },
    ]
  }
];
