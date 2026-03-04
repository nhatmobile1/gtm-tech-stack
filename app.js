/* GTM / MOps Tech Stack — App Logic
   Rendering, interactions, keyboard navigation, accessibility
*/

let activePhase = null;
let activeTab = {};

/* ═══════════════════════════════════════════════════════════════
   RENDER PIPELINE
═══════════════════════════════════════════════════════════════ */
function renderPipeline() {
  const pipe = document.getElementById('pipeline');
  pipe.innerHTML = '';

  PHASES.forEach((p, i) => {
    if (i > 0) {
      const conn = document.createElement('div');
      conn.className = 'connector';
      conn.innerHTML = '<div class="conn-line"></div><div class="conn-arrow"></div>';
      pipe.appendChild(conn);
    }

    const toolCount = p.categories.reduce((n, c) => n + c.tools.length, 0);
    const catNames = p.categories.map(c => c.name);

    const el = document.createElement('div');
    el.className = 'phase';
    el.id = 'phase-' + p.id;
    el.style.setProperty('--phase-color', p.color);

    // Accessibility attributes
    el.setAttribute('role', 'button');
    el.setAttribute('tabindex', '0');
    el.setAttribute('aria-expanded', 'false');
    el.setAttribute('aria-controls', 'detailPanel');

    el.innerHTML =
      '<div class="phase-accent" style="background:' + p.color + '"></div>' +
      '<div class="phase-inner">' +
        '<div class="phase-num">Phase 0' + p.id + '</div>' +
        '<span class="phase-icon">' + p.icon + '</span>' +
        '<div class="phase-name">' + p.name.replace('\n', '<br>') + '</div>' +
        '<div class="phase-subtitle">' + p.subtitle.split(',').slice(0, 2).join(',') + '</div>' +
        '<div class="phase-cats">' +
          catNames.map(function(n) { return '<span class="cat-chip">' + n.toLowerCase() + '</span>'; }).join('') +
        '</div>' +
        '<div class="phase-tool-count"><span>' + toolCount + '</span> tools mapped</div>' +
      '</div>';

    // Event listeners
    el.addEventListener('click', function() { togglePhase(p.id); });
    el.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        togglePhase(p.id);
      }
    });

    pipe.appendChild(el);
  });
}

/* ═══════════════════════════════════════════════════════════════
   TOGGLE / OPEN / CLOSE
═══════════════════════════════════════════════════════════════ */
function togglePhase(id) {
  if (activePhase === id) { closePanel(); return; }
  openPanel(id);
}

function openPanel(id) {
  var p = PHASES.find(function(x) { return x.id === id; });
  if (!p) return;

  // Remove previous open state
  if (activePhase) {
    var prevEl = document.getElementById('phase-' + activePhase);
    if (prevEl) {
      prevEl.classList.remove('open');
      prevEl.setAttribute('aria-expanded', 'false');
    }
  }

  // Set new open state
  var phaseEl = document.getElementById('phase-' + id);
  phaseEl.classList.add('open');
  phaseEl.setAttribute('aria-expanded', 'true');
  activePhase = id;

  // Panel header
  var panelHead = document.getElementById('panelHead');
  panelHead.style.setProperty('--phase-color', p.color);
  panelHead.style.borderTopColor = p.color;
  document.getElementById('panelIcon').textContent = p.icon;
  document.getElementById('panelTitle').textContent = p.name.replace('\n', ' / ');
  document.getElementById('panelSub').textContent = p.subtitle;

  // Tabs
  var tabs = ['Tools', 'Gaps & Opportunities', 'Industry Trends', 'AI / Claude / MCP'];
  var nav = document.getElementById('tabNav');
  nav.style.setProperty('--phase-color', p.color);
  nav.innerHTML = tabs.map(function(t, i) {
    return '<button class="tab-btn' + (i === 0 ? ' active' : '') + '" data-tab="' + i + '">' + t + '</button>';
  }).join('');

  // Tab click listeners
  nav.querySelectorAll('.tab-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      switchTab(id, parseInt(btn.dataset.tab));
    });
  });

  activeTab[id] = 0;
  renderTabContent(id, 0);

  var panel = document.getElementById('detailPanel');
  panel.classList.add('open');
  panel.style.setProperty('--phase-color', p.color);
  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function closePanel() {
  document.getElementById('detailPanel').classList.remove('open');
  if (activePhase) {
    var el = document.getElementById('phase-' + activePhase);
    if (el) {
      el.classList.remove('open');
      el.setAttribute('aria-expanded', 'false');
    }
  }
  activePhase = null;
}

function switchTab(phaseId, tabIdx) {
  activeTab[phaseId] = tabIdx;
  document.querySelectorAll('.tab-btn').forEach(function(b, i) {
    b.classList.toggle('active', i === tabIdx);
  });
  renderTabContent(phaseId, tabIdx);
}

/* ═══════════════════════════════════════════════════════════════
   RENDER TAB CONTENT
═══════════════════════════════════════════════════════════════ */
function renderTabContent(phaseId, tabIdx) {
  var p = PHASES.find(function(x) { return x.id === phaseId; });
  var box = document.getElementById('tabContent');

  if (tabIdx === 0) {
    // ── TOOLS ──
    var subcatsHtml = p.categories.map(function(cat, ci) {
      var toolsHtml = cat.tools.map(function(t) {
        return '<div class="tool-card">' +
          '<div class="tool-top">' +
            '<div class="tool-dot" style="background:' + p.color + '"></div>' +
            '<div class="tool-name">' + t.name + '</div>' +
            '<span class="tool-tag ' + t.tag + '">' + (t.tag === 'core' ? 'primary' : 'cross-phase') + '</span>' +
          '</div>' +
          '<div class="tool-desc">' + t.desc + '</div>' +
        '</div>';
      }).join('');

      return '<div class="subcat expanded" id="sc-' + phaseId + '-' + ci + '">' +
        '<div class="subcat-head" role="button" tabindex="0" data-subcat="sc-' + phaseId + '-' + ci + '">' +
          '<div class="subcat-toggle">−</div>' +
          '<div class="subcat-name">' + cat.name + '</div>' +
          '<div class="subcat-count">' + cat.tools.length + ' tools</div>' +
        '</div>' +
        '<div class="subcat-body">' + toolsHtml + '</div>' +
      '</div>';
    }).join('');

    box.innerHTML = '<div class="tab-body active"><div class="subcats">' + subcatsHtml + '</div></div>';

    // Attach subcat toggle listeners
    box.querySelectorAll('.subcat-head').forEach(function(head) {
      var subcatId = head.dataset.subcat;
      function toggle() { toggleSubcat(subcatId); }
      head.addEventListener('click', toggle);
      head.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      });
    });

  } else if (tabIdx === 1) {
    // ── GAPS ──
    var html = p.gaps.map(function(g) {
      var label = g.type === 'gap' ? '⚠ Gap' : g.type === 'opp' ? '💡 Opportunity' : '⛔ Risk';
      return '<div class="gap-card">' +
        '<div class="gap-type ' + g.type + '">' + label + '</div>' +
        '<div class="gap-text">' + g.text + '</div>' +
      '</div>';
    }).join('');
    box.innerHTML = '<div class="tab-body active"><div class="gaps-grid">' + html + '</div></div>';

  } else if (tabIdx === 2) {
    // ── TRENDS ──
    var html = p.trends.map(function(t) {
      return '<div class="trend-item">' +
        '<span class="trend-badge ' + t.type + '">' + (t.type === 'now' ? '▶ Now' : '◈ Emerging') + '</span>' +
        '<div class="trend-text">' + t.text + '</div>' +
      '</div>';
    }).join('');
    box.innerHTML = '<div class="tab-body active"><div class="trends-list">' + html + '</div></div>';

  } else if (tabIdx === 3) {
    // ── AI ──
    var badgeMap = { mcp: 'ab-mcp', agent: 'ab-agent', code: 'ab-code', claude: 'ab-claude' };
    var badgeLabel = { mcp: '⬡ MCP', agent: '⚡ Agent', code: '</> Claude Code', claude: '✦ Claude' };
    var html = p.ai.map(function(a) {
      var bdg = a.badges.map(function(b) {
        return '<span class="ai-badge ' + badgeMap[b] + '">' + badgeLabel[b] + '</span>';
      }).join('');
      return '<div class="ai-item"><div class="ai-badges">' + bdg + '</div><div class="ai-text">' + a.text + '</div></div>';
    }).join('');
    box.innerHTML = '<div class="tab-body active"><div class="ai-list">' + html + '</div></div>';
  }
}

function toggleSubcat(id) {
  var el = document.getElementById(id);
  if (!el) return;
  el.classList.toggle('expanded');
  var btn = el.querySelector('.subcat-toggle');
  if (btn) btn.textContent = el.classList.contains('expanded') ? '−' : '+';
}

/* ═══════════════════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════════════════ */
renderPipeline();

// Close panel button
document.getElementById('panelClose').addEventListener('click', closePanel);

// Close panel on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && activePhase) {
    closePanel();
  }
});
