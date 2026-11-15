# Maintenance tools

These scripts are for maintainers. They are not imported by `serve.py` and are
not required to run the site.

## Link check

```bash
python3 tools/check_links.py
python3 tools/check_links.py --external
```

The default run is offline: it checks every local `href`, `src`, CSS `url(...)`,
`data.js` screenshot path, and in-page anchor, including the bundled Brushline
demo. It is what CI runs.

`--external` additionally probes the docs, GitHub, and lab-hosted demo URLs.
Cloudflare Access redirects count as reachable. Known lab services can be
paused; review warnings rather than treating every non-200 as a site failure.

## Screenshot refresh

```bash
python3 -m pip install playwright pillow
playwright install chromium
python3 tools/refresh_screenshots.py --only ws4,fire
```

Targets live in `tools/capture_targets.json`. Each entry has a local URL, a
viewport/wait inherited from `defaults`, optional simple actions, and an
optional CSS selector for an element-only capture. Raw PNGs go to
`tmp/screenshots/`; WebP copies overwrite `assets/img/<name>.webp`.

The checked-in screenshots were captured from the lab's running portals. Some
views need a solved fixture (FHOPS `tfl6`, fresh-fvsbc `ct60`) or the HectaresBC
server (`fresh-hectaresbc/scripts/serve_web_app.py`). Adjust the target JSON for
your local checkout. Review every refreshed image before committing it.

The Nemora and TSA 27 screenshots come from public documentation/assets rather
than a live local portal; refresh those from their source repositories.
