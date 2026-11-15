/* FRESH stuff — tabbed project explorer. */
(() => {
  "use strict";

  document.documentElement.classList.add("js");

  const PROJECTS = window.FRESH_PROJECTS || [];
  const TIERS = [
    { id: "headliners", label: "Headliners" },
    { id: "build", label: "Build & evidence" },
    { id: "glue", label: "Workflow & glue" },
    { id: "wild", label: "In the wild" },
  ];
  const TIER_LABEL = Object.fromEntries(TIERS.map((tier) => [tier.id, tier.label]));
  const byId = new Map(PROJECTS.map((project) => [project.id, project]));

  const $ = (selector, root = document) => root.querySelector(selector);
  const esc = (value) =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");

  const liveDemos = [
    {
      name: "WS4",
      host: "ws4.01101.dev",
      href: "https://ws4.01101.dev",
      status: "Lab-hosted",
      tone: "lab",
      description: "Open a public FEMIC instance, run a schedule, inspect the map, targets, reports, and Pareto front.",
    },
    {
      name: "FHOPS",
      host: "fhops.01101.dev",
      href: "https://fhops.01101.dev",
      status: "Lab-hosted",
      tone: "lab",
      description: "Operational planning: Gantt schedules, machine assignments, KPIs, and scenario comparison.",
    },
    {
      name: "Urban Forest Lab",
      host: "fresh-urban-forest-lab.01101.dev",
      href: "https://fresh-urban-forest-lab.01101.dev",
      status: "Lab-hosted",
      tone: "lab",
      description: "UBC campus and City of Vancouver canopy twins, with 2D/3D editing and scenario projection.",
    },
    {
      name: "fresh-fvsbc",
      host: "fresh-fvsbc.01101.dev",
      href: "https://fresh-fvsbc.01101.dev",
      status: "Lab-hosted",
      tone: "lab",
      description: "Inspect an FVSbc stand, 100-year results, calibration bundles, and provenance evidence.",
    },
    {
      name: "HectaresBC",
      host: "fresh-hectaresbc.01101.dev",
      href: "https://fresh-hectaresbc.01101.dev",
      status: "Lab-hosted",
      tone: "lab",
      description: "Browse and map 2,183 recovered layers, with Compare, Series, tours, and previews.",
    },
    {
      name: "Woodlots BC",
      host: "fresh-woodlotsbc.01101.dev",
      href: "https://fresh-woodlotsbc.01101.dev",
      status: "Lab-hosted",
      tone: "lab",
      description: "845 licences catalogued; 798 built with WS4 and a FHOPS pilot; three full ten-year plans.",
    },
    {
      name: "Fire Studio",
      host: "fresh-fire.01101.dev",
      href: "https://fresh-fire.01101.dev",
      status: "Public",
      tone: "public",
      description: "Six public benchmark fires, real terrain and weather, deterministic 3D replay.",
    },
    {
      name: "Nemora",
      host: "nemora.01101.dev",
      href: "https://nemora.01101.dev",
      status: "Lab-hosted",
      tone: "lab",
      description: "Inventory ingestion, distribution fitting, synthetic forests, and a fit-review web UI.",
    },
    {
      name: "Brushline",
      host: "this site / demos/brushline",
      href: "demos/brushline/",
      status: "Static · public",
      tone: "static",
      description: "The read-only synthetic corridor demo, bundled here so it always has a door.",
    },
  ];

  /* Featured cards ------------------------------------------------------- */
  const featuredPlan = [
    { id: "ws4", cls: "feature--wide feature--ws4", badge: "Flagship · live" },
    { id: "fresh-urban-forest-lab", cls: "feature--half feature--urban", badge: "Live · 184k trees" },
    { id: "fhops", cls: "feature--third feature--fhops", badge: "Live · operations" },
    { id: "brushline", cls: "feature--third feature--brushline", badge: "In build · demo" },
    { id: "fresh-fvsbc", cls: "feature--third feature--fvsbc", badge: "Live · FVSbc" },
    { id: "fresh-fire-studio", cls: "feature--fire", badge: "Public · no login" },
  ];

  function featuredCard(project, plan) {
    const shot = project.shots?.[0];
    const media = shot && project.id !== "brushline"
      ? `<div class="feature-media"><img src="${esc(shot.src)}" alt="${esc(shot.alt)}" loading="lazy" width="1600" height="1000" /><span class="feature-badge"><span class="dot"></span>${esc(plan.badge)}</span></div>`
      : `<span class="feature-badge" style="position:absolute;top:16px;right:16px;left:auto"><span class="dot"></span>${esc(plan.badge)}</span>`;
    return `
      <a class="feature ${plan.cls}" href="#${esc(project.id)}" data-open-project="${esc(project.id)}">
        ${media}
        <div class="feature-body">
          <div class="feature-kicker"><span class="num">${esc(project.index)}</span><span>${esc(project.tag)}</span></div>
          <h3>${esc(project.name)}</h3>
          <p>${esc(project.tagline)}</p>
          ${
            project.proof
              ? `<dl class="feature-proof">${project.proof
                  .map(([value, label]) => `<div><dt>${esc(value)}</dt><dd>${esc(label)}</dd></div>`)
                  .join("")}</dl>`
              : ""
          }
          <div class="feature-foot"><span>Explore the package</span><span class="arrow" aria-hidden="true">→</span></div>
        </div>
      </a>`;
  }

  const featuredGrid = $("#featured-grid");
  if (featuredGrid) {
    featuredGrid.innerHTML = featuredPlan
      .map((plan) => byId.get(plan.id))
      .filter(Boolean)
      .map((project, index) => featuredCard(project, featuredPlan[index]))
      .join("");
  }

  /* Rail ----------------------------------------------------------------- */
  const tabsRoot = $("#project-tabs");
  const panel = $("#project-panel");

  function renderTabs(activeId) {
    if (!tabsRoot) return;
    tabsRoot.innerHTML = TIERS.map((tier) => {
      const items = PROJECTS.filter((project) => project.tier === tier.id);
      if (!items.length) return "";
      const buttons = items
        .map(
          (project, index) => `
          <button
            class="rail-tab${index === 0 && tier.id !== "headliners" ? " rail-first" : ""}"
            id="tab-${esc(project.id)}"
            type="button"
            role="tab"
            data-project="${esc(project.id)}"
            data-tier="${esc(project.tier)}"
            aria-selected="${project.id === activeId}"
            aria-controls="project-panel"
            tabindex="${project.id === activeId ? "0" : "-1"}"
            title="${esc(project.name)}"
          >
            <span class="rail-num">${esc(project.index)}</span>
            <span class="rail-name">${esc(project.name)}</span>
            <span class="rail-dot" aria-hidden="true"></span>
          </button>`
        )
        .join("");
      return `<div class="rail-group"><div class="rail-group-label">${esc(tier.label)}</div>${buttons}</div>`;
    }).join("");
  }

  /* Visuals -------------------------------------------------------------- */
  const VISUALS = {
    femic: () => `
      <div class="visual-inner" role="img" aria-label="FEMIC pipeline: inventory and evidence to curves and fragments to a model package.">
        <h5>FEMIC / instance factory</h5>
        <div class="v-pipe v-pipe--stack">
          <div class="v-node"><b>Inventory</b><span>FAIB, FIA, TSR, THLB, LiDAR</span></div>
          <div class="v-node"><b>Curves</b><span>VDYP, TIPSY, FVSbc, recovered figures</span></div>
          <div class="v-node"><b>Fragments</b><span>tracks, treatments, features, products</span></div>
          <div class="v-node"><b>Package</b><span>ForestModel XML + manifest + reports</span></div>
        </div>
        <div class="v-pillrow"><span>hashed inputs</span><span>versioned instance</span><span>DataLad</span><span>validation report</span></div>
      </div>`,
    carbon: () => `
      <div class="visual-inner" role="img" aria-label="fresh-cbm ledger with 148,828 blocks in 2.3 seconds and 26 carbon accounts.">
        <h5>fresh-cbm / exact lookup</h5>
        <div class="v-ledger">
          <div class="v-stat"><b>148,828</b><span>TSA41 blocks</span></div>
          <div class="v-stat"><b>2.3 s</b><span>projection</span></div>
          <div class="v-stat"><b>26</b><span>carbon accounts</span></div>
          <div class="v-stat"><b>5 s</b><span>371,565 TSA08 blocks</span></div>
          <div class="v-stat"><b>0</b><span>rebuilds per lookup</span></div>
          <div class="v-stat"><b>~0.03%</b><span>ledger vs exact engine</span></div>
        </div>
        <div class="v-code"><span class="c"># one stand state, looked up not rebuilt</span>
account = cache.lookup(package, treatment, state)
ws4.carbon.apply(account)</div>
      </div>`,
    solver: () => `
      <div class="visual-inner" role="img" aria-label="Fresh Solutions convergence bars and solver statistics.">
        <h5>Fresh Solutions / search trace</h5>
        <div class="v-bars" aria-hidden="true">
          ${[38, 47, 44, 55, 58, 54, 66, 63, 71, 76, 73, 82, 80, 88, 86, 94]
            .map((h) => `<i style="height:${h}%"></i>`)
            .join("")}
        </div>
        <div class="v-legend"><span>iteration 0</span><span>incumbent replay</span><span>16k</span></div>
        <div class="v-pillrow"><span>CPU local moves</span><span>GPU population</span><span>weighted goals</span><span>exact replay</span></div>
        <p class="v-note">Illustrative search trace. The papers project carries the benchmark evidence.</p>
      </div>`,
    forge: () => `
      <div class="visual-inner" role="img" aria-label="A FreshForge YAML workflow that validates and runs a model pipeline.">
        <h5>FreshForge / workflow.yaml</h5>
        <div class="v-code"><span class="k">workflow</span>: tsa29-setup
<span class="k">steps</span>:
  - <span class="s">materialize</span>:  { provider: datalad, source: arbutus }
  - <span class="s">install</span>:      { provider: femic, instance: tsa29 }
  - <span class="s">audit</span>:        { provider: s3, scope: coverage }
  - <span class="s">record</span>:       { provider: manifest, out: setup.json }</div>
        <div class="v-pillrow"><span>validate</span><span>plan</span><span>run</span><span>inspect</span></div>
      </div>`,
    modelwright: () => `
      <div class="visual-inner" role="img" aria-label="Modelwright turning a spreadsheet grid into generated Python code.">
        <h5>Modelwright / workbook → model</h5>
        <div class="v-split">
          <div>
            <div class="v-spreadsheet" aria-hidden="true">
              <span class="h">year</span><span class="h">vol</span><span class="h">cost</span><span class="h">npv</span><span class="h">cut</span><span class="h">reg</span>
              <span>0</span><span>293</span><span>12.4</span><span>1.0</span><span>0</span><span>0</span>
              <span>10</span><span>200</span><span>14.1</span><span>0.94</span><span>1</span><span>1</span>
              <span>20</span><span>233</span><span>15.7</span><span>0.86</span><span>0</span><span>1</span>
              <span>30</span><span>256</span><span>17.2</span><span>0.79</span><span>0</span><span>1</span>
            </div>
          </div>
          <div class="v-arrow" aria-hidden="true">→</div>
          <div>
            <div class="v-code" style="margin:0">def <span class="k">npv</span>(year, vol, cost):
    <span class="c"># extracted, tested, diffable</span>
    return (vol * price - cost) / (1 + r) ** year</div>
          </div>
        </div>
        <div class="v-pillrow"><span>dependency graph</span><span>generated source</span><span>validation report</span></div>
      </div>`,
    curve: () => `
      <div class="visual-inner" role="img" aria-label="Typed yield curves from fresh-vdyp compared with console output.">
        <h5>fresh-vdyp / typed yield curves</h5>
        <svg class="v-curve" viewBox="0 0 640 260" aria-hidden="true">
          <g stroke="rgba(244,241,232,.12)" stroke-width="1">
            <path d="M40 30V220H610" fill="none"/>
            <path d="M40 80H610M40 130H610M40 180H610" fill="none" stroke-dasharray="2 7"/>
          </g>
          <path d="M40 210 C120 205 160 170 220 150 C300 122 360 90 430 70 C500 52 560 46 610 42" fill="none" stroke="#9ad6c0" stroke-width="2.4"/>
          <path d="M40 212 C120 208 170 178 230 158 C310 130 370 98 440 78 C505 60 565 54 610 50" fill="none" stroke="#e9c96a" stroke-width="2" stroke-dasharray="5 5"/>
          <circle cx="430" cy="70" r="4" fill="#f4f1e8"/>
          <circle cx="430" cy="78" r="4" fill="#e9c96a"/>
          <g fill="#8fae99" font-family="ui-monospace,monospace" font-size="10">
            <text x="40" y="242">0</text><text x="220" y="242">50</text><text x="420" y="242">100</text><text x="590" y="242">150 yr</text>
            <text x="48" y="24">m³/ha</text>
          </g>
        </svg>
        <div class="v-legend"><span>— Python equation</span><span>– – VDYP7Console</span><span>source SHA-256 kept</span></div>
        <p class="v-note">Illustrative curve shape; validation is per equation family.</p>
      </div>`,
    tipsy: () => `
      <div class="visual-inner" role="img" aria-label="fresh-tipsy product recovery and economics summary.">
        <h5>fresh-tipsy / product + economics</h5>
        <div class="v-ledger">
          <div class="v-stat"><b>TIPSY</b><span>growth tables</span></div>
          <div class="v-stat"><b>FAN$IER</b><span>economics</span></div>
          <div class="v-stat"><b>SHA-256</b><span>provenance</span></div>
          <div class="v-stat"><b>FEMIC</b><span>adapter</span></div>
          <div class="v-stat"><b>CLI</b><span>API + web UI</span></div>
          <div class="v-stat"><b>Explicit</b><span>unavailable metrics</span></div>
        </div>
        <div class="v-pillrow"><span>TIPSY tables</span><span>FAN$IER economics</span><span>provenance</span><span>FEMIC adapter</span></div>
      </div>`,
    workflow: () => `
      <div class="visual-inner" role="img" aria-label="UBC-FRESH roadmap and GitHub issue workflow.">
        <h5>UBC-FRESH / delivery loop</h5>
        <div class="v-pipe">
          <div class="v-node"><b>ROADMAP</b><span>phase → task → subtask</span></div>
          <div class="v-node"><b>ISSUES</b><span>parent → child → checklist</span></div>
          <div class="v-node"><b>BRANCH</b><span>feature/p&lt;n&gt;-slug</span></div>
          <div class="v-node"><b>GATE</b><span>tests + docs + changelog</span></div>
          <div class="v-node"><b>PR</b><span>review, merge, close</span></div>
        </div>
        <div class="v-pillrow"><span>agent contracts</span><span>workflow validator</span><span>seed generator</span><span>container per project</span></div>
        <p class="v-note">The same loop runs on this repository. The workflow is the scaffold, not the fire escape.</p>
      </div>`,
    figrecover: () => `
      <div class="visual-inner" role="img" aria-label="figrecover turning a published chart into a reviewable table.">
        <h5>figrecover / figure → evidence</h5>
        <div class="v-split">
          <div>
            <svg viewBox="0 0 280 190" class="v-curve" aria-hidden="true">
              <rect x="10" y="10" width="260" height="170" fill="rgba(244,241,232,.04)" stroke="rgba(244,241,232,.12)"/>
              <path d="M40 150 C80 120 110 140 140 100 C170 60 210 80 245 40" fill="none" stroke="#e9c96a" stroke-width="2.5"/>
              <path d="M40 160 C90 145 120 120 160 118 C200 116 220 90 245 84" fill="none" stroke="#9ad6c0" stroke-width="2"/>
              <circle cx="140" cy="100" r="4" fill="#f4f1e8"/><circle cx="200" cy="92" r="4" fill="#f4f1e8"/>
              <g fill="#8fae99" font-size="8" font-family="ui-monospace,monospace"><text x="16" y="26">Fig. 4</text><text x="210" y="172">year</text></g>
            </svg>
          </div>
          <div class="v-arrow" aria-hidden="true">→</div>
          <div>
            <div class="v-spreadsheet" aria-hidden="true" style="grid-template-columns:repeat(3,1fr)">
              <span class="h">x</span><span class="h">y</span><span class="h">fit</span>
              <span>0</span><span>0.10</span><span>0.11</span>
              <span>10</span><span>0.26</span><span>0.25</span>
              <span>20</span><span>0.42</span><span>0.43</span>
              <span>30</span><span>0.55</span><span>0.54</span>
            </div>
            <p class="v-note">Approximate. Every crop, calibration, and review is recorded.</p>
          </div>
        </div>
        <div class="v-pillrow"><span>PDF crop</span><span>pixel calibration</span><span>QA overlay</span><span>review manifest</span></div>
      </div>`,
  };

  /* Panel ---------------------------------------------------------------- */
  function linkPill(link) {
    const cls = link.kind === "live" ? "link-pill link-pill--live" : `link-pill link-pill--${esc(link.kind)}`;
    return `<a class="${cls}" href="${esc(link.href)}"${link.href.startsWith("http") ? ' target="_blank" rel="noreferrer"' : ""}>${esc(link.label)}</a>`;
  }

  function gallery(project) {
    if (!project.shots?.length) {
      const visual = VISUALS[project.visual];
      return `<div class="visual-stage">${visual ? visual() : ""}</div>`;
    }
    const first = project.shots[0];
    const thumbs = project.shots
      .map(
        (shot, index) => `
        <button class="gallery-thumb" type="button" data-shot="${index}" aria-current="${index === 0}" aria-label="Show ${esc(shot.caption)}">
          <img src="${esc(shot.src)}" alt="" loading="lazy" width="320" height="200" />
        </button>`
      )
      .join("");
    return `
      <div class="gallery">
        <div class="gallery-main" data-zoom="0" role="button" tabindex="0" aria-label="Open screenshot: ${esc(first.caption)}">
          <img src="${esc(first.src)}" alt="${esc(first.alt)}" width="1600" height="1000" loading="eager" />
          <span class="gallery-caption">${esc(first.caption)}</span>
        </div>
        <div class="gallery-thumbs">${thumbs}</div>
      </div>`;
  }

  function renderPanel(project) {
    if (!panel || !project) return;
    const links = project.links?.length
      ? project.links.map(linkPill).join("")
      : `<span class="link-pill link-pill--soon">Public mirror pending</span>`;
    panel.innerHTML = `
      <div class="panel-inner panel-enter">
        <div class="panel-head">
          <div>
            <div class="panel-kicker">
              <strong>${esc(project.index)}</strong>
              <span>${esc(TIER_LABEL[project.tier] || project.tier)}</span>
              <span>·</span>
              <span>${esc(project.tag)}</span>
              <span class="status-pill">${esc(project.status)}</span>
            </div>
            <h3 class="panel-title">${esc(project.name)}</h3>
            <p class="panel-tagline">${esc(project.tagline)}</p>
          </div>
          <div class="panel-tools">
            <button class="icon-button" id="copy-project-link" type="button" aria-label="Copy a deep link to ${esc(project.name)}" title="Copy deep link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.1 0l2-2a5 5 0 0 0-7-7.1l-1.2 1.2"/><path d="M14 11a5 5 0 0 0-7.1 0l-2 2a5 5 0 0 0 7 7.1l1.2-1.2"/></svg>
            </button>
          </div>
        </div>
        <div class="panel-main">
          ${gallery(project)}
          <div class="panel-copy">
            <h4>What is this?</h4>
            <p>${esc(project.what)}</p>
            <h4>Why should I care?</h4>
            <p>${esc(project.why)}</p>
          </div>
        </div>
        <div class="panel-footer">
          <ul class="chips">${project.bullets.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
          <p class="stack-line">${esc(project.stack)}</p>
          <div class="panel-links">${links}</div>
        </div>
      </div>`;
    panel.setAttribute("aria-labelledby", `tab-${project.id}`);
    wirePanel(project);
  }

  function wirePanel(project) {
    const main = $(".gallery-main", panel);
    const thumbs = [...panel.querySelectorAll(".gallery-thumb")];
    const setShot = (index) => {
      if (!main || !project.shots?.[index]) return;
      const shot = project.shots[index];
      const img = $("img", main);
      img.src = shot.src;
      img.alt = shot.alt;
      $(".gallery-caption", main).textContent = shot.caption;
      main.dataset.zoom = String(index);
      main.setAttribute("aria-label", `Open screenshot: ${shot.caption}`);
      thumbs.forEach((thumb, i) => thumb.setAttribute("aria-current", String(i === index)));
    };
    thumbs.forEach((thumb) => {
      thumb.addEventListener("click", () => setShot(Number(thumb.dataset.shot)));
    });
    if (main) {
      main.addEventListener("click", () => openLightbox(project, Number(main.dataset.zoom || 0)));
      main.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openLightbox(project, Number(main.dataset.zoom || 0));
        }
      });
    }
    const copy = $("#copy-project-link", panel);
    copy?.addEventListener("click", async () => {
      const url = `${location.origin}${location.pathname}#${project.id}`;
      try {
        await navigator.clipboard.writeText(url);
        copy.classList.add("is-copied");
        copy.setAttribute("title", "Copied");
        window.setTimeout(() => {
          copy.classList.remove("is-copied");
          copy.setAttribute("title", "Copy deep link");
        }, 1400);
      } catch {
        window.prompt("Copy this link", url);
      }
    });
  }

  /* Selection ------------------------------------------------------------- */
  let currentId = null;

  function activate(id, { scroll = false, updateHash = true } = {}) {
    const project = byId.get(id) || byId.get("ws4");
    if (!project) return;
    currentId = project.id;
    renderTabs(currentId);
    renderPanel(project);
    requestAnimationFrame(() => {
      const tab = document.getElementById(`tab-${project.id}`);
      const rail = document.querySelector(".explorer-rail");
      if (!tab || !rail) return;
      const tr = tab.getBoundingClientRect();
      const rr = rail.getBoundingClientRect();
      if (tr.left < rr.left || tr.right > rr.right) {
        rail.scrollLeft += tr.left - rr.left - 12;
      }
      if (tr.top < rr.top || tr.bottom > rr.bottom) {
        rail.scrollTop += tr.top - rr.top - 12;
      }
    });
    if (updateHash && location.hash !== `#${project.id}`) {
      history.pushState({ project: project.id }, "", `#${project.id}`);
    }
    if (scroll) {
      $("#explorer")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  tabsRoot?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-project]");
    if (!button) return;
    activate(button.dataset.project);
  });

  tabsRoot?.addEventListener("keydown", (event) => {
    if (!["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    const tabs = [...tabsRoot.querySelectorAll(".rail-tab")];
    const index = tabs.indexOf(document.activeElement);
    if (index < 0) return;
    event.preventDefault();
    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % tabs.length;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = tabs.length - 1;
    const target = tabs[next];
    const projectId = target.dataset.project;
    activate(projectId);
    document.getElementById(`tab-${projectId}`)?.focus();
  });

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-open-project]");
    if (!trigger) return;
    event.preventDefault();
    activate(trigger.dataset.openProject, { scroll: true });
  });

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-project-link]");
    if (!trigger) return;
    event.preventDefault();
    activate(trigger.dataset.projectLink, { scroll: true });
  });

  window.addEventListener("popstate", () => {
    const id = location.hash.replace("#", "");
    if (byId.has(id)) activate(id);
  });

  window.addEventListener("hashchange", () => {
    const id = location.hash.replace("#", "");
    if (byId.has(id) && id !== currentId) activate(id);
  });

  /* Live demos ------------------------------------------------------------ */
  const liveGrid = $("#live-grid");
  if (liveGrid) {
    liveGrid.innerHTML = liveDemos
      .map(
        (demo) => `
      <a class="live-card" href="${esc(demo.href)}"${demo.href.startsWith("http") ? ' target="_blank" rel="noreferrer"' : ""}>
        <div class="live-top">
          <span class="live-status"><span class="dot" style="${demo.tone === "public" ? "" : demo.tone === "static" ? "background:var(--amber)" : "background:var(--moss)"}"></span>${esc(demo.status)}</span>
          <span class="live-arrow" aria-hidden="true">↗</span>
        </div>
        <h3>${esc(demo.name)}</h3>
        <span class="live-host">${esc(demo.host)}</span>
        <p>${esc(demo.description)}</p>
      </a>`
      )
      .join("");
  }

  /* Lightbox -------------------------------------------------------------- */
  const lightbox = $("#lightbox");
  const lightboxImg = $("#lightbox-img");
  const lightboxCaption = $("#lightbox-caption");
  let lastFocus = null;

  function openLightbox(project, index) {
    const shot = project.shots?.[index];
    if (!shot || !lightbox) return;
    lastFocus = document.activeElement;
    lightboxImg.src = shot.src;
    lightboxImg.alt = shot.alt;
    lightboxCaption.textContent = shot.caption;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    $(".lightbox-close", lightbox)?.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  $(".lightbox-close", lightbox)?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox && !lightbox.hidden) closeLightbox();
  });

  /* Header + reveal ------------------------------------------------------- */
  const header = $("#site-header");
  const onScroll = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px" }
    );
    document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
  } else {
    document.querySelectorAll(".reveal").forEach((node) => node.classList.add("is-visible"));
  }

  /* Boot ------------------------------------------------------------------ */
  const bootId = location.hash.replace("#", "");
  const initial = byId.has(bootId) ? bootId : "ws4";
  activate(initial, { updateHash: false, scroll: Boolean(byId.has(bootId)) });
})();
