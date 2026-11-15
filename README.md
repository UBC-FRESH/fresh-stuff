# FRESH stuff

A static, guided tour of the UBC FRESH Lab's open forest modelling stack:
**WS4**, **FHOPS**, the **FRESH Urban Forest Lab**, **Brushline**,
**fresh-fvsbc**, **FRESH Fire Studio**, and the packages that make them reproducible.

One tab per project. Each tab answers “what is this?”, “why should I care?”, and
links to the live demo, docs, and repository where they exist.

## Run it

No build step and no dependencies beyond Python 3.10+:

```bash
cd fresh-stuff
python3 serve.py
```

Defaults:

- bind: `0.0.0.0:8130`
- local: `http://127.0.0.1:8130/`
- bridge (this container): `http://<container-ip>:8130/`
- health: `http://127.0.0.1:8130/healthz`

Overrides:

```bash
PORT=9000 python3 serve.py
python3 serve.py --host 127.0.0.1 --port 8130
```

Run it in the background without systemd:

```bash
./start.sh          # writes serve.pid and serve.log
./stop.sh
```

`start.sh` respects `PORT` and `HOST` in the environment, the same as `serve.py`.

### Installed as a systemd service

The lab container runs the portal as `fresh-stuff.service`, enabled at boot.
Edit `WorkingDirectory` and `ReadOnlyPaths` in `deploy/fresh-stuff.service` to
match your checkout before installing it:

```bash
sudo systemctl status fresh-stuff
sudo systemctl restart fresh-stuff
sudo systemctl stop fresh-stuff
```

The unit is checked in at `deploy/fresh-stuff.service`. If the service is
installed, `start.sh` and `stop.sh` defer to systemd instead of starting a
second copy.

## Cloudflare tunnel

The tunnel is set up on the **root host**, not in this container. Add a public
hostname:

- subdomain: `fresh-stuff`
- domain: `01101.dev`
- path: leave empty
- service: `http://<container-ip>:8130`

Confirm the container address before saving the tunnel config:

```bash
hostname -I
```

If `cloudflared` runs inside this container instead, use
`http://127.0.0.1:8130`. The site is plain HTTP; no websockets, SSE, or special
headers are required.

The matching ingress rule on the root host:

```yaml
ingress:
  - hostname: fresh-stuff.01101.dev
    service: http://<container-ip>:8130
  - service: http_status:404
```

## What is here

```text
index.html            page shell, hero, sections, field notes, footer
data.js               all 20 project records: copy, links, screenshots, tiers
app.js                tabbed explorer, deep links, gallery, lightbox
styles.css            the whole visual system
serve.py              tiny static server with /healthz
assets/img/           WebP screenshots + the Brushline concept SVG
assets/fonts/         self-hosted Alegreya (SIL OFL; see OFL.txt)
assets/leaf.svg       logo and favicon
demos/brushline/      bundled read-only Brushline public demo
deploy/               systemd unit
tools/                link checker and screenshot refresher
CHANGELOG.md          dated history
robots.txt, sitemap.xml
.github/workflows/    CI: syntax, local links, server smoke test
```

### Editing a project

Everything the explorer renders comes from `data.js`. A record looks like:

```js
{
  id: "ws4",
  name: "WS4",
  tier: "headliners",          // headliners | build | glue | wild
  index: "01",
  tag: "Forest estate model",
  status: "v0.2.0 · live demo",
  tagline: "One sentence.",
  what: "What is this?",
  why: "Why should I care?",
  bullets: ["Capability one", "Capability two"],
  stack: "How it relates to the rest of the stack.",
  links: [{ label: "Live demo", href: "https://…", kind: "live" }],
  shots: [{ src: "assets/img/ws4.webp", alt: "…", caption: "…" }],
  visual: "carbon"            // optional, for projects without a screenshot
}
```

- `tier: "headliners"` puts the record in the featured cards and the first rail group.
- `proof` (optional) adds the three-stat row on a featured card.
- `visual` picks a hand-built panel visual from `VISUALS` in `app.js`; use this
  when a package has no honest web screenshot.
- `shots` can be omitted; the panel then renders the visual or an empty stage.

### Screenshots

Screenshots were captured with Playwright from the lab's locally running portals
(WS4, FHOPS, fresh-fvsbc, Urban Forest Lab, HectaresBC, Woodlots, Community
Forests, Fire Studio) and from existing public docs assets (Urban 3D, Nemora,
TSA 27). They are converted to WebP at 1600 px wide.

The capture scripts and raw PNGs live outside the deploy directory in
a sibling working directory outside the served site, so the deployable folder stays small.

### Brushline demo

`demos/brushline/` is a copy of the static demo produced by
`brushline demo build`, built from the synthetic corridor fixture. It is
read-only, contains synthetic evidence, and is clearly labelled as such. A small
top bar links back to this portal; the rest is the generated demo.

## Maintenance

```bash
python3 tools/check_links.py            # offline, CI-safe
python3 tools/check_links.py --external # docs, GitHub, lab demos
python3 tools/refresh_screenshots.py    # needs Playwright + Pillow
```

CI checks Python and JavaScript syntax, every local link and anchor, the capture
target JSON, and starts the server for a smoke test. External link checks are
manual because lab-hosted demos can pause behind Cloudflare Access.

## Design notes

- **No tracking, no accounts, no external requests at runtime.** All images,
  fonts, CSS, and JS are local. Live demo links go to lab-hosted services.
- **Deep links work.** Every project has a hash URL (`#ws4`, `#femic`, …).
- **The screenshots are real.** Where a package has no usable web interface,
  the panel uses a labelled schematic rather than a fake screenshot.
- **Lab-hosted demos may be behind UBC Cloudflare Access (CWL or Globus).** The
  portal says so rather than implying everything is public.

## Credit

Built by the UBC FRESH Lab. Public data, public repos, public docs.
Demos and packages belong to their respective repositories.

Made on unceded xʷməθkʷəy̓əm territory.
