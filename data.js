/* FRESH stuff — project content.
 * Everything here is public-safe copy about public repositories and demos.
 */
window.FRESH_PROJECTS = [
  {
    id: "ws4",
    name: "WS4",
    tier: "headliners",
    index: "01",
    tag: "Forest estate model",
    status: "v0.2.0 · live demo",
    accent: "forest",
    headline: true,
    tagline: "A spatially explicit forest estate model that treats space as part of the problem.",
    what:
      "WS4 is a CLI-first, HPC-ready forest estate model. Fragments are the decision unit; blocks aggregate them at runtime; adjacency, patch structure, road access, carbon, and LiDAR-derived operability are enforced inside simulation and optimization rather than allocated afterwards.",
    why:
      "Most estate models plan the volume and hope the map works out. WS4 makes the map the model: you can see which blocks open, which patches connect, and what the schedule costs in wood, carbon, and access. It runs from a laptop to a parallel search, and leaves a replayable record of every run.",
    bullets: [
      "Fragment-level compile, block-level runtime",
      "Adjacency, patch size, and road access",
      "Carbon accounting and LiDAR terrain",
      "Resident-state and GPU search lanes",
      "Browser UI: map, plan, results, Pareto",
      "Deterministic schedules and exact replay",
    ],
    stack:
      "The runtime decision engine. Consumes FEMIC instances, Nemora fixtures, and fresh-cbm carbon tables; FreshForge orchestrates it.",
    proof: [["Spatial", "by construction"], ["Carbon", "in the model"], ["Replay", "every run"]],
    links: [
      { label: "Live demo", href: "https://ws4.01101.dev", kind: "live" },
      { label: "Docs", href: "https://ubc-fresh.github.io/ws4/", kind: "docs" },
      { label: "GitHub", href: "https://github.com/UBC-FRESH/ws4", kind: "code" },
    ],
    shots: [
      {
        src: "assets/img/ws4.webp",
        alt: "WS4 browser map showing harvested and untreated blocks over the Sunshine Coast.",
        caption: "Map view · treated blocks, patches, and treatment schedule.",
      },
      {
        src: "assets/img/ws4-atlas.webp",
        alt: "WS4 stand density management atlas with isopleths and a reviewed evidence panel.",
        caption: "SDMD atlas · reviewed stand-density diagrams with source evidence.",
      },
      {
        src: "assets/img/ws4-portal.webp",
        alt: "WS4 public instance portal with cards for each FEMIC instance.",
        caption: "Public instance portal · one door into every FEMIC case.",
      },
    ],
  },
  {
    id: "fhops",
    name: "FHOPS",
    tier: "headliners",
    index: "02",
    tag: "Harvesting operations",
    status: "v1.1 · live demo",
    accent: "clay",
    headline: true,
    tagline: "From harvest block to machine, landing, shift, and dollar.",
    what:
      "FHOPS is a Python package and CLI for building, solving, and evaluating forest harvesting operations plans. Pydantic contracts describe blocks, machines, landings, and calendars; a deterministic Pyomo/HiGHS MIP and a simulated-annealing engine solve the same problem.",
    why:
      "Strategic plans stop at “harvest this block this period.” FHOPS answers the operational question underneath: which machine, which landing, which shift, which road, and at what cost? It connects the estate model to the real world of equipment and terrain — with exact methods when you need them and heuristics when you don’t.",
    bullets: [
      "Pydantic scenario contract",
      "MIP with HiGHS; optional Gurobi",
      "SA, ILS, tabu, and rolling horizon",
      "LiDAR operability and ground support",
      "Gantt schedule and KPI explorer",
      "Benchmarks and tuned presets",
    ],
    stack:
      "Downstream of WS4 schedules and FEMIC LiDAR bundles. Shares the AOI geometry and terrain context.",
    proof: [["MIP", "HiGHS / Gurobi"], ["SA + ILS", "heuristics"], ["Gantt", "shift plan"]],
    links: [
      { label: "Live demo", href: "https://fhops.01101.dev", kind: "live" },
      { label: "Docs", href: "https://ubc-fresh.github.io/fhops/", kind: "docs" },
      { label: "GitHub", href: "https://github.com/UBC-FRESH/fhops", kind: "code" },
    ],
    shots: [
      {
        src: "assets/img/fhops.webp",
        alt: "FHOPS operational schedule Gantt chart with machines on rows and days on columns.",
        caption: "Operational schedule · machines, shifts, and blocks.",
      },
      {
        src: "assets/img/fhops-results.webp",
        alt: "FHOPS KPI results panel with production, mobilisation, and sequencing metrics.",
        caption: "Results · production, mobilisation, utilisation, sequencing.",
      },
    ],
  },
  {
    id: "fresh-urban-forest-lab",
    name: "FRESH Urban Forest Lab",
    tier: "headliners",
    index: "03",
    tag: "Urban canopy twin",
    status: "v0.3.0 · live demo",
    accent: "mint",
    headline: true,
    tagline: "A 2D and 3D digital twin for the forest in the city.",
    what:
      "The FRESH Urban Forest Lab links public LiDAR, municipal tree inventories, and individual-tree growth models to a 2D map and a 3D instanced-tree scene. It measures canopy structure, detects crowns, compares repeat measures, and projects planting, removal, replacement, and movement scenarios.",
    why:
      "Most people meet forests in cities, but urban forestry rarely gets the modelling rigour of commercial forestry. This brings open data, reproducible canopy metrics, and a 3D scenario tool to questions like: what happens to canopy, carbon, shade, and diversity if we plant here, remove there, and grow for 30 years?",
    bullets: [
      "UBC campus and City of Vancouver pilots",
      "184k public trees, 181 LiDAR tiles",
      "Canopy volume, carbon, shade, rainfall",
      "2D MapLibre and 3D Three.js editor",
      "Scenario projection and Pareto explore",
      "Offline demo from derived data",
    ],
    stack:
      "Independent by design, with design lineage from FEMIC (materialization), FHOPS (validated edits), and WS4 (dataset manifests).",
    proof: [["184k", "public trees"], ["26.9%", "canopy cover"], ["2D + 3D", "browser"]],
    links: [
      { label: "Live demo", href: "https://fresh-urban-forest-lab.01101.dev", kind: "live" },
      { label: "Docs", href: "https://ubc-fresh.github.io/fresh-urban-forest-lab/", kind: "docs" },
      { label: "GitHub", href: "https://github.com/UBC-FRESH/fresh-urban-forest-lab", kind: "code" },
    ],
    shots: [
      {
        src: "assets/img/urban.webp",
        alt: "City of Vancouver canopy map with inventory metrics and scenario controls.",
        caption: "City of Vancouver · 184,151 trees; 26.9% CHM cover (≥2 m, buildings/water excluded).",
      },
      {
        src: "assets/img/urban-3d.webp",
        alt: "3D instanced-tree scene of the UBC Vancouver campus.",
        caption: "3D scene · individual trees over terrain, in the browser.",
      },
      {
        src: "assets/img/urban-portal.webp",
        alt: "FRESH Urban Forest Lab demo landing page with UBC and Vancouver cards.",
        caption: "Public demos · campus proof and full-city pilot.",
      },
    ],
  },
  {
    id: "brushline",
    name: "Brushline",
    tier: "headliners",
    index: "04",
    tag: "Corridor vegetation",
    status: "v0.1.0 · phase 2 active",
    accent: "amber",
    headline: true,
    tagline: "Vegetation management for the corridors that keep the lights on.",
    what:
      "Brushline is decision support for vegetation along powerlines, pipelines, roads, and railways. It couples a shrub and young-tree growth model, treatment transitions, strategic/tactical/operational planning, adaptive remote monitoring, and a multi-objective metaheuristic search — with one versioned plan artifact for owner and contractor.",
    why:
      "A utility may manage thousands of kilometres of corridor. Treat too little and reliability and fire risk suffer; treat too often and the budget disappears. Brushline makes the trade-off explicit: where and when to treat, where and when to monitor, and what the plan costs under uncertainty.",
    bullets: [
      "Segment-level corridor model",
      "State-transition vegetation growth",
      "Strategic → tactical → operational",
      "Value-of-information monitoring",
      "Pareto archive of cost, risk, service",
      "Owner and contractor plan views",
    ],
    stack:
      "Built on the fresh-solutions search engine and FEMIC-extended instances. The planning studio is in build; the static demo runs the synthetic corridor fixture.",
    proof: [["5 seg", "synthetic fixture"], ["3 scales", "strategy to ops"], ["Pareto", "cost / risk"]],
    links: [
      { label: "Static demo", href: "demos/brushline/", kind: "live" },
      { label: "Docs", href: "https://ubc-fresh.github.io/brushline/", kind: "docs" },
      { label: "GitHub", href: "https://github.com/UBC-FRESH/brushline", kind: "code" },
    ],
    shots: [
      {
        src: "assets/img/brushline.svg",
        alt: "Stylised Brushline corridor planning concept with treatment nodes and a cost-risk frontier.",
        caption: "Concept visual · corridor segments, treatment windows, and the cost/risk frontier.",
      },
      {
        src: "assets/img/brushline-demo.webp",
        alt: "Brushline static public demo showing a synthetic corridor instance.",
        caption: "Static demo · the synthetic corridor fixture, read-only and public.",
      },
    ],
  },
  {
    id: "fresh-fvsbc",
    name: "fresh-fvsbc",
    tier: "headliners",
    index: "05",
    tag: "Individual-tree growth",
    status: "v0.21.4 · live demo",
    accent: "pine",
    headline: true,
    tagline: "The BC variant of FVS, scriptable in Python.",
    what:
      "fresh-fvsbc wraps the BC variant of the Forest Vegetation Simulator in a pinned PyFVS build, adds BC keywords, species and BEC handling, tidy simulation I/O, provenance checks, and a browser UI over the run’s own tables.",
    why:
      "Empirical yield curves struggle with partial cutting, treatment timing, and species-level response. FVS is a process-based individual-tree model that can represent those questions. Python makes it composable with the rest of the stack instead of a separate desktop workflow — and the web UI lets you inspect the stand, results, and calibration evidence without opening a spreadsheet.",
    bullets: [
      "Pinned FVSbc build",
      "Tidy tree-list and summary I/O",
      "Provenance and oracle checks",
      "2D and 3D stand viewer",
      "Calibration bundles and warnings",
      "Feeds FEMIC, WS3, and WS4",
    ],
    stack:
      "Feeds FEMIC yield curves and WS3/WS4 model instances. Nemora can prime it with synthetic tree lists.",
    proof: [["FVSbc", "pinned build"], ["100 yr", "run horizon"], ["2D/3D", "stand view"]],
    links: [
      { label: "Live demo", href: "https://fresh-fvsbc.01101.dev", kind: "live" },
      { label: "Docs", href: "https://ubc-fresh.github.io/fresh-fvsbc/", kind: "docs" },
      { label: "GitHub", href: "https://github.com/UBC-FRESH/fresh-fvsbc", kind: "code" },
    ],
    shots: [
      {
        src: "assets/img/fvsbc.webp",
        alt: "fresh-fvsbc results view with summary metrics, BA series chart, and rows table.",
        caption: "Results · 100-year BA, TPH, QMD, top height, and volume.",
      },
      {
        src: "assets/img/fvsbc-stand.webp",
        alt: "fresh-fvsbc stand view showing a plot of live and cut trees.",
        caption: "Stand view · every value read from the run’s own tree tables.",
      },
      {
        src: "assets/img/fvsbc-calibration.webp",
        alt: "fresh-fvsbc calibration bundles with review warnings.",
        caption: "Calibration · bundle metadata, boundaries, and review warnings.",
      },
    ],
  },

  {
    id: "femic",
    name: "FEMIC",
    tier: "build",
    index: "07",
    tag: "Model-instance factory",
    status: "v0.2.0a1 · active",
    accent: "forest",
    tagline: "The factory that turns public data into a defensible model instance.",
    what:
      "FEMIC discovers and materializes inventory, growth-and-yield curves, TSR/THLB evidence, LiDAR, and carbon data; builds curves and fragments; and emits a versioned model package with ForestModel XML and validation reports.",
    why:
      "The hard part of forest modelling is rarely the optimizer. It is building a model instance from messy public data that someone else can inspect and rerun. FEMIC makes that repeatable, documented, and shareable — and the public TSA instances show the pattern end to end.",
    bullets: [
      "Data discovery and hashed materialization",
      "Curve building and fragment compilation",
      "ForestModel XML and Patchworks export",
      "Carbon package and GCBM bridge",
      "Versioned DataLad instances",
      "Public TSA 24/27/46/47/48 examples",
    ],
    stack:
      "Upstream of WS4 and FHOPS. Uses fresh-fvsbc curves, fresh-cbm carbon, Nemora fixtures, and FreshForge setup.",
    links: [
      { label: "Docs", href: "https://ubc-fresh.github.io/femic/", kind: "docs" },
      { label: "GitHub", href: "https://github.com/UBC-FRESH/femic", kind: "code" },
      { label: "TSA 27 instance", href: "https://github.com/UBC-FRESH/femic-tsa27-instance", kind: "data" },
    ],
    visual: "femic",
  },
  {
    id: "nemora",
    name: "Nemora",
    tier: "build",
    index: "08",
    tag: "Forest analytics",
    status: "v0.1.0a1 · web UI",
    accent: "mint",
    tagline: "Forest analytics, from raw inventory to synthetic forests.",
    what:
      "Nemora is a meta-package for forest analytics: inventory ingestion, a central registry of forestry distributions, grouped and mixture fitting, sampling, and synthetic forest generation — with an optional web UI.",
    why:
      "The two-stage method for fitting truncated stem-diameter distributions is published; Nemora makes it usable instead of leaving it in a paper and a one-off script. Synthetic stem populations are also a powerful way to stress-test models and ask “what if the inventory looked like this?”",
    bullets: [
      "35 built-in distributions",
      "Grouped EM and mixture fitting",
      "Bootstrap and Monte Carlo sampling",
      "Synthetic stem populations",
      "Inventory ingestion and ETL",
      "Web UI for fits, maps, libraries",
    ],
    stack:
      "Primes fresh-fvsbc with tree lists and generates deterministic WS4 fixtures.",
    links: [
      { label: "Live demo", href: "https://nemora.01101.dev", kind: "live" },
      { label: "Docs", href: "https://ubc-fresh.github.io/nemora/", kind: "docs" },
      { label: "GitHub", href: "https://github.com/UBC-FRESH/nemora", kind: "code" },
    ],
    shots: [
      {
        src: "assets/img/nemora.webp",
        alt: "Nemora fit view with observed versus fitted PDF, CDF, and diagnostics table.",
        caption: "Fit view · observed vs fitted PDF, CDF, and evidence.",
      },
      {
        src: "assets/img/nemora-browse.webp",
        alt: "Nemora inventory browser with catalog cards.",
        caption: "Browse · inventories, fits, landscapes, and synthesis.",
      },
      {
        src: "assets/img/nemora-compare.webp",
        alt: "Nemora comparison view across fitted libraries.",
        caption: "Compare · library-level comparison and review.",
      },
    ],
  },
  {
    id: "fresh-cbm",
    name: "fresh-cbm",
    tier: "build",
    index: "09",
    tag: "Carbon accounting",
    status: "v0.2.0 · exact caches",
    accent: "clay",
    tagline: "Exact carbon accounting, cached as a lookup.",
    what:
      "fresh-cbm stores deterministic per-hectare carbon accounts from libcbm for a declared package and treatment family. Consumers look up a stand state instead of rebuilding a CBM model for every analysis.",
    why:
      "Carbon is usually the slow, fragile part of a forest model. fresh-cbm turns it into a fast, exact lookup with a manifest, checksums, and validation. Projecting 148,828 TSA41 blocks took about 2.3 seconds; 371,565 TSA08 blocks took about 5 seconds. That makes carbon-aware optimization practical.",
    bullets: [
      "libcbm stand-state caches",
      "Manifest and checksums",
      "Harvested-wood-product lifecycle",
      "TSA41 and TSA08 published caches",
      "WS4 carbon lane",
      "FEMIC carbon export",
    ],
    stack:
      "The carbon backbone for WS4 and FEMIC, bridging to libcbm/GCBM without rebuilding state tables.",
    links: [
      { label: "Docs", href: "https://ubc-fresh.github.io/fresh-cbm/", kind: "docs" },
      { label: "GitHub", href: "https://github.com/UBC-FRESH/fresh-cbm", kind: "code" },
      { label: "Building guide", href: "https://ubc-fresh.github.io/fresh-cbm/guides/building.html", kind: "docs" },
    ],
    visual: "carbon",
  },
  {
    id: "fresh-hectaresbc",
    name: "Fresh HectaresBC",
    tier: "build",
    index: "10",
    tag: "Public data recovery",
    status: "recovered archive · live demo",
    accent: "pine",
    tagline: "A decommissioned provincial data platform, brought back to life.",
    what:
      "Fresh HectaresBC recovers, inventories, documents, and modernizes the archived HectaresBC geospatial collection: 2,183 ZIP payloads, 418 data layers, 1,765 virtual layers, and about 17.5 GB of published data, managed through DataLad and git-annex.",
    why:
      "Valuable public data disappeared when the original platform shut down in 2022. This brings it back in an open, searchable, reproducible form, with provenance and licensing kept visible. The Compare and Series tools are genuinely useful for cumulative-effects and time-series work, not just archival nostalgia.",
    bullets: [
      "Browse, Dataset, Map, Compare, Series",
      "2,183 records and previews",
      "DataLad-backed archive",
      "PNG export and tour routes",
      "Python API and Typer CLI",
      "Feeds FEMIC, WS4, and urban work",
    ],
    stack:
      "A public data recovery layer for the rest of the stack. Its catalog and materialization patterns are reused elsewhere.",
    links: [
      { label: "Live demo", href: "https://fresh-hectaresbc.01101.dev", kind: "live" },
      { label: "Docs", href: "https://ubc-fresh.github.io/fresh-hectaresbc/", kind: "docs" },
      { label: "GitHub", href: "https://github.com/UBC-FRESH/fresh-hectaresbc", kind: "code" },
    ],
    shots: [
      {
        src: "assets/img/hectares.webp",
        alt: "HectaresBC map view showing BCTS operating areas across British Columbia.",
        caption: "Map · 2,183 recovered layers with previews and provenance.",
      },
      {
        src: "assets/img/hectares-browse.webp",
        alt: "HectaresBC archive browser with filters and layer records.",
        caption: "Browse · facets, preview status, verification, and saved searches.",
      },
    ],
  },
  {
    id: "fresh-solutions",
    name: "Fresh Solutions",
    tier: "build",
    index: "11",
    tag: "General solver",
    status: "v0.8.0 · research",
    accent: "amber",
    tagline: "The general solver extracted from WS4’s search engine.",
    what:
      "Fresh Solutions is a general, reproducible hybrid metaheuristic solver for hard combinatorial optimization: compiled sparse state, exact incremental accounting, CPU local moves, batched GPU population search, weighted goal programming, and exact replay.",
    why:
      "The optimization engine is no longer forestry-only. The same architecture that searches forest schedules can attack travelling-salesman, quadratic-assignment, and other hard problems — with the same emphasis on evidence, seeds, and replay. It gives the WS4 search ideas a clean general home and a two-paper research programme.",
    bullets: [
      "Iterated Lin–Kernighan",
      "QAP delta-matrix tabu",
      "GPU population search",
      "Weighted goal programming",
      "Exact replay of incumbents",
      "Optional LKH backend",
    ],
    stack:
      "Extracted from WS4; the papers project carries the benchmark evidence and broader claims.",
    links: [
      { label: "GitHub", href: "https://github.com/UBC-FRESH/fresh-solutions", kind: "code" },
      { label: "Papers", href: "https://github.com/UBC-FRESH/fresh-solutions-papers", kind: "paper" },
    ],
    visual: "solver",
  },

  {
    id: "freshforge",
    name: "FreshForge",
    tier: "glue",
    index: "12",
    tag: "Workflow-as-code",
    status: "v0.1.0a5 · alpha",
    accent: "forest",
    tagline: "Workflow-as-code for the whole modelling stack.",
    what:
      "FreshForge is an early public-alpha Python package for writing forest modelling workflows as typed, version-controlled, executable graphs. It supports YAML/JSON loading, structural and provider-aware validation, a provider registry, inspection, non-executing run planning, a serial local runner, and run matrices.",
    why:
      "Complex workflows are where reproducibility usually dies: a clone, a submodule, a virtual environment, a data remote, a config file, and three commands in the right order. FreshForge lets us write that sequence down, validate it, preview it, and run it consistently. The TSA29 instance setup is already a concrete example.",
    bullets: [
      "Typed workflow graphs",
      "Provider-aware validation",
      "Run planning without execution",
      "Serial local runner",
      "Run matrices",
      "TSA29 setup example",
    ],
    stack:
      "The glue layer that will orchestrate FEMIC, FHOPS, WS4, Nemora, Modelwright, and the rest.",
    links: [
      { label: "Docs", href: "https://ubc-fresh.github.io/freshforge/", kind: "docs" },
      { label: "GitHub", href: "https://github.com/UBC-FRESH/freshforge", kind: "code" },
    ],
    visual: "forge",
  },
  {
    id: "modelwright",
    name: "Modelwright",
    tier: "glue",
    index: "13",
    tag: "Spreadsheet archaeology",
    status: "early implementation",
    accent: "clay",
    tagline: "Spreadsheets in. Transparent Python models out.",
    what:
      "Modelwright inspects workbook structure, extracts formulas and dependencies, builds a dependency graph, generates Python source, and validates the generated model against the original workbook outputs.",
    why:
      "A huge amount of forest modelling still lives in spreadsheets that nobody can test, diff, or safely modify. Modelwright is a path from “the model is in this workbook and only one person understands it” to “the model is Python, with tests and a validation report against the original.” That is a quiet but enormous win for reproducibility.",
    bullets: [
      "Workbook structure inspection",
      "Formula and dependency extraction",
      "Python source generation",
      "Validation against original outputs",
      "Dependency graph",
      "Early implementation",
    ],
    stack:
      "Designed to feed converted models into FEMIC, WS4, and FreshForge pipelines.",
    links: [
      { label: "Docs", href: "https://ubc-fresh.github.io/modelwright/", kind: "docs" },
      { label: "GitHub", href: "https://github.com/UBC-FRESH/modelwright", kind: "code" },
    ],
    visual: "modelwright",
  },
  {
    id: "fresh-vdyp",
    name: "fresh-vdyp",
    tier: "glue",
    index: "14",
    tag: "Yield-curve interop",
    status: "v0.1.0 · P0–P7 complete",
    accent: "mint",
    tagline: "VDYP7 without the GUI boundary.",
    what:
      "fresh-vdyp reads the BC VDYP7 coefficient and control bundle, wraps the VDYP7Console runner, exposes typed yield curves, and validates incremental Python growth equations against official console outputs. Every extracted value records source, version, file hash, extraction date, and citation.",
    why:
      "The original model is a black box with a desktop boundary. fresh-vdyp makes its coefficients and yield tables queryable, testable, and usable from FEMIC and other tools — while keeping authorship and provenance explicit. It is an interoperability layer, not a claim to have rewritten VDYP7.",
    bullets: [
      "Coefficient and control parser",
      "VDYP7Console runner and parser",
      "Typed Python curve API",
      "Equation validation by family",
      "Provenance on every value",
      "FastAPI service and web UI",
    ],
    stack:
      "Supplies yield curves to FEMIC and other UBC-FRESH tools.",
    links: [
      { label: "Docs", href: "https://ubc-fresh.github.io/fresh-vdyp/", kind: "docs" },
      { label: "GitHub", href: "https://github.com/UBC-FRESH/fresh-vdyp", kind: "code" },
    ],
    visual: "curve",
  },
  {
    id: "fresh-tipsy",
    name: "fresh-tipsy",
    tier: "glue",
    index: "15",
    tag: "Growth + economics",
    status: "v0.1.0 · released",
    accent: "pine",
    tagline: "TASS/TIPSY tables and FAN$IER economics, in Python.",
    what:
      "fresh-tipsy reads TIPSY and FAN$IER data tables, exposes growth, product-recovery, and economics workflows, and preserves the provenance of every value. It includes typed growth queries, log-grade recovery with mass-balance checks, NPV/Faustmann economics, a CLI, a FastAPI service, and a server-rendered UI.",
    why:
      "TIPSY tables are still a practical backbone for BC yield and product recovery, but they are trapped in old workflows. fresh-tipsy makes them scriptable and inspectable, with explicit unavailable metrics and source hashes. It is an interoperability layer over precomputed tables, not a TASS rewrite.",
    bullets: [
      ".tab/.taf parsers and manifests",
      "Growth queries with interpolation",
      "Lumber, residue, and log-grade recovery",
      "NPV, Faustmann, sensitivity cases",
      "CLI, API, and web UI",
      "FEMIC adapter",
    ],
    stack:
      "Feeds FEMIC yield and product assumptions; complements fresh-vdyp.",
    links: [
      { label: "Docs", href: "https://ubc-fresh.github.io/fresh-tipsy/", kind: "docs" },
      { label: "GitHub", href: "https://github.com/UBC-FRESH/fresh-tipsy", kind: "code" },
    ],
    visual: "tipsy",
  },
  {
    id: "ubc-fresh-dev-workflow",
    name: "UBC-FRESH Dev Workflow",
    tier: "glue",
    index: "16",
    tag: "Agent-assisted delivery",
    status: "seed kit · live docs",
    accent: "amber",
    tagline: "How the lab builds software with agents — written down.",
    what:
      "A seed and onboarding kit for agent-assisted science and engineering projects: a phase/task/subtask roadmap mirrored in GitHub issues, agent operating contracts, agent-friendly docs, and a container-per-project dev server recipe.",
    why:
      "Good software habits are usually tribal knowledge. This repo makes them portable: the same roadmap, issue, branch, changelog, and review loop that built the rest of this stack. It is also a worked example — the workflow runs on itself.",
    bullets: [
      "Roadmap ↔ GitHub issue mapping",
      "Agent operating contracts",
      "Onboarding in a fixed order",
      "Workflow validator and CI",
      "Container-per-project recipe",
      "Project seed generator",
    ],
    stack:
      "The operating system for every other project here.",
    links: [
      { label: "Docs", href: "https://ubc-fresh.github.io/ubc-fresh-dev-workflow/", kind: "docs" },
      { label: "GitHub", href: "https://github.com/UBC-FRESH/ubc-fresh-dev-workflow", kind: "code" },
    ],
    visual: "workflow",
  },
  {
    id: "figrecover",
    name: "figrecover",
    tier: "glue",
    index: "17",
    tag: "Figure data recovery",
    status: "v0.1.0a1 · alpha",
    accent: "clay",
    tagline: "Recover the data trapped inside published figures.",
    what:
      "figrecover recovers approximate source tables from published figures when the original data were not released. It uses deterministic PDF and crop tools, optional local VLM metadata proposals, pixel-to-data calibration, extractors for lines/scatter/bars/areas, QA overlays, review manifests, and exports for FEMIC and FHOPS.",
    why:
      "Technical documents are full of figures whose underlying tables were never published. Manual digitization is slow, inconsistent, and impossible to audit. figrecover makes recovery auditable: every crop, calibration decision, diagnostic, and review status is recorded, and the result is explicitly approximate rather than pretend-exact.",
    bullets: [
      "Deterministic crop and calibration",
      "Line, scatter, bar, and area extractors",
      "QA overlays and review manifests",
      "FEMIC and FHOPS export",
      "Optional local VLM assist",
      "Approximate by design",
    ],
    stack:
      "Recovers data for FEMIC TSR ingestion and FHOPS reference documents. Complements Modelwright.",
    links: [
      { label: "Docs", href: "https://ubc-fresh.github.io/figrecover/", kind: "docs" },
      { label: "GitHub", href: "https://github.com/UBC-FRESH/figrecover", kind: "code" },
    ],
    visual: "figrecover",
  },

  {
    id: "fresh-woodlots",
    name: "Woodlots BC",
    tier: "wild",
    index: "18",
    tag: "Production portal",
    status: "live · 845 licences",
    accent: "forest",
    tagline: "Every active woodlot in BC, modelled from public data.",
    what:
      "A public-data planning portal for BC woodlot licences. All 845 active licences are catalogued; 798 have a public AAC and a built WS4 model, each with a FHOPS operational pilot. Three featured pilots also carry a formal ten-year tactical-operational plan.",
    why:
      "Woodlot licence holders rarely have the budget for a bespoke consulting model. This shows what open data and the FRESH stack can do at province scale: search a licence, open its strategic model, inspect an operational pilot, and see a full ten-year plan for the featured cases — without a private dataset or a login.",
    bullets: [
      "845 licences catalogued",
      "798 WS4 models built",
      "FHOPS operational pilots",
      "10-year tactical-operational plans",
      "Tree Lab 3D",
      "Public data only",
    ],
    stack:
      "A production example of WS4 + FHOPS + FEMIC on public data.",
    links: [
      { label: "Live demo", href: "https://fresh-woodlotsbc.01101.dev", kind: "live" },
      { label: "GitHub", href: "https://github.com/UBC-FRESH/fresh-woodlots", kind: "code" },
    ],
    shots: [
      {
        src: "assets/img/woodlots.webp",
        alt: "Woodlots BC planning portal landing page with a map of woodlot licences.",
        caption: "Woodlots BC · 845 licences, 798 models, three featured pilots.",
      },
    ],
  },
  {
    id: "fresh-community-forests",
    name: "Community Forests",
    tier: "wild",
    index: "19",
    tag: "Production portal",
    status: "lab-hosted · 62 forests",
    accent: "mint",
    tagline: "Province-scale planning for community forests.",
    what:
      "A public-data planning portal for BC community forests. All 62 active community forest agreements have a WS4 strategic model and a FHOPS operational pilot; the featured Bamfield, Logan Lake, and FNFN/NRRM pilots include ten-year tactical-operational plans, Pareto exploration, Tree Lab 3D, and an assistant.",
    why:
      "Community forests are where local control meets provincial-scale planning. This portal gives every agreement a model, a map, and a plan that can be inspected against public data — and gives the featured pilots a full tactical-operational workflow.",
    bullets: [
      "62 community forests",
      "WS4 strategic models",
      "FHOPS operational pilots",
      "Pareto exploration",
      "Tree Lab 3D",
      "Ask-the-assistant",
    ],
    stack:
      "Another production example of the WS4 + FHOPS + FEMIC stack.",
    links: [],
    shots: [
      {
        src: "assets/img/community.webp",
        alt: "BC Community Forest Planning Portal with a map of featured community forests.",
        caption: "Community forests · 62 agreements, three featured pilots.",
      },
    ],
  },
  {
    id: "fresh-fire-studio",
    name: "FRESH Fire Studio",
    tier: "headliners",
    index: "06",
    tag: "Public fire demo",
    status: "public · live demo",
    accent: "clay",
    tagline: "Six public fires. Real terrain. A replay you can walk through.",
    what:
      "An interactive 3D fire studio built on public benchmark fires, real terrain, real weather, and FBP/WS4 fire behaviour. Each scene is a deterministic replay of a public event; pick a fire, orbit the landscape, and scrub the front.",
    why:
      "Fire behaviour is spatial, dynamic, and hard to communicate in a table. The studio makes it tangible — six benchmark fires, a 500 stems/ha near-field stand, canopy and tree-level LOD — while keeping every source input public and every replay deterministic.",
    bullets: [
      "6 public benchmark fires",
      "3D terrain and synthetic trees",
      "FBP/WS4 fire behaviour",
      "Deterministic front scrubbing",
      "Public-data provenance",
      "Research demo",
    ],
    stack:
      "A public-facing visualization of WS4 fire behaviour work, built from public benchmark fires and a synthetic tree layer.",
    proof: [["6", "public fires"], ["3D", "terrain + trees"], ["Open", "no login"]],
    links: [
      { label: "Public demo", href: "https://ubc-fresh.github.io/fresh-fire-studio/", kind: "live" },
      { label: "Lab demo", href: "https://fresh-fire.01101.dev", kind: "live" },
      { label: "GitHub", href: "https://github.com/UBC-FRESH/fresh-fire-studio", kind: "code" },
    ],
    shots: [
      {
        src: "assets/img/fire.webp",
        alt: "FRESH Fire Studio landing page with a dark interface and 3D fire scene cards.",
        caption: "Fire Studio · benchmark fires, 3D terrain, and deterministic replay.",
      },
      {
        src: "assets/img/fire-scene.webp",
        alt: "3D Dogrib 2001 fire scene with terrain, forest canopy, and the replay timeline.",
        caption: "Dogrib 2001 · 3D scene, deterministic replay, and public benchmark evidence.",
      },
    ],
  },
  {
    id: "femic-tsa27-instance",
    name: "TSA 27 Revelstoke",
    tier: "wild",
    index: "20",
    tag: "Public model instance",
    status: "public instance · data",
    accent: "amber",
    tagline: "A complete, public model instance for Revelstoke.",
    what:
      "A public FEMIC deployment instance and WS4 model case for the Revelstoke TSA (TSA 27), with a reproducible TSR evidence base and a caribou-policy modelling pipeline.",
    why:
      "Most model instances are private, undocumented, or impossible to rebuild. This one carries its evidence, its config, and its build. It is a template for how to publish a defensible forest planning model — including the caribou question that makes TSA 27 hard.",
    bullets: [
      "Public DataLad instance",
      "TSR evidence base",
      "Caribou policy pipeline",
      "WS4-ready dataset",
      "Reproducible build",
      "Map and reports",
    ],
    stack:
      "A worked example of FEMIC → WS4, with the evidence kept in the open.",
    links: [
      { label: "GitHub", href: "https://github.com/UBC-FRESH/femic-tsa27-instance", kind: "code" },
      { label: "FEMIC docs", href: "https://ubc-fresh.github.io/femic/", kind: "docs" },
    ],
    shots: [
      {
        src: "assets/img/tsa27.webp",
        alt: "Map of caribou herd ranges over BC timber supply areas in the Revelstoke region.",
        caption: "Caribou ranges over TSA boundaries · the evidence that shapes the case.",
      },
    ],
  },
];
