#!/usr/bin/env python3
"""Check local links, anchors, and asset references in the FRESH stuff site.

The default run is offline and deterministic, so it is suitable for CI. Pass
``--external`` to also probe the docs, GitHub, and lab-hosted demo URLs. A
Cloudflare Access redirect (3xx) counts as reachable; a 4xx/5xx is reported.
"""

from __future__ import annotations

import argparse
import re
import urllib.error
import urllib.request
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
SKIP_SCHEMES = ("http:", "https:", "mailto:", "tel:", "data:", "javascript:")
EXTERNAL_SKIP = {"https://fresh-stuff.01101.dev"}
LOCAL_ATTR_RE = re.compile(r'(?:src|href)="([^"]+)"')
DATA_RE = re.compile(r'\b(?:src|href):\s*"([^"]+)"')
CSS_URL_RE = re.compile(r'url\(\s*["\']?([^"\')]+)["\']?\s*\)')
PROJECT_IDS = set(re.findall(r'\bid:\s*"([^"]+)"', (ROOT / "data.js").read_text(encoding="utf-8")))


class PageParser(HTMLParser):
    """Collect links and anchor ids from one HTML page."""

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.links: list[str] = []
        self.ids: set[str] = set()

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = dict(attrs)
        for key in ("href", "src"):
            value = values.get(key)
            if value:
                self.links.append(value)
        element_id = values.get("id")
        if element_id:
            self.ids.add(element_id)


def parse_page(path: Path) -> PageParser:
    parser = PageParser()
    parser.feed(path.read_text(encoding="utf-8"))
    return parser


def is_local(ref: str) -> bool:
    if not ref:
        return False
    if ref.startswith("#"):
        return True
    return not ref.lower().startswith(SKIP_SCHEMES)


def resolve(page: Path, ref: str) -> Path | None:
    parts = urlsplit(ref)
    path = unquote(parts.path)
    if not path:
        return page
    if path.startswith("/"):
        target = ROOT / path.lstrip("/")
    else:
        target = (page.parent / path).resolve()
    if target.is_dir():
        target = target / "index.html"
    return target


def check_anchor(page: Path, ref: str, ids_by_page: dict[Path, set[str]]) -> str | None:
    parts = urlsplit(ref)
    if not parts.fragment:
        return None
    target = resolve(page, ref) or page
    if target.suffix.lower() not in (".html", ""):
        return None
    if target not in ids_by_page:
        if not target.exists():
            return f"{page.relative_to(ROOT)}: missing anchor target {ref}"
        ids_by_page[target] = parse_page(target).ids
    fragment = unquote(parts.fragment)
    if fragment in ids_by_page[target]:
        return None
    if target == ROOT / "index.html" and fragment in PROJECT_IDS:
        return None
    return f"{page.relative_to(ROOT)}: broken anchor #{fragment}"


def html_files() -> list[Path]:
    files = [ROOT / "index.html"]
    files.extend(sorted((ROOT / "demos" / "brushline").rglob("*.html")))
    return files


def collect_references() -> list[tuple[Path, str]]:
    refs: list[tuple[Path, str]] = []
    for page in html_files():
        for ref in parse_page(page).links:
            if is_local(ref):
                refs.append((page, ref))
    for source in (ROOT / "data.js", ROOT / "app.js"):
        for ref in DATA_RE.findall(source.read_text(encoding="utf-8")):
            if is_local(ref):
                refs.append((source, ref))
    for source in (ROOT / "styles.css",):
        for ref in CSS_URL_RE.findall(source.read_text(encoding="utf-8")):
            if is_local(ref):
                refs.append((source, ref))
    return refs


def check_local() -> tuple[int, list[str]]:
    refs = collect_references()
    errors: list[str] = []
    ids_by_page: dict[Path, set[str]] = {}
    for page, ref in refs:
        target = resolve(page, ref)
        if target is None:
            continue
        if not target.exists():
            errors.append(f"{page.relative_to(ROOT)}: missing {ref} -> {target.relative_to(ROOT)}")
            continue
        anchor_error = check_anchor(page, ref, ids_by_page)
        if anchor_error:
            errors.append(anchor_error)
    return len(refs), errors


def check_external() -> tuple[int, list[str], list[str]]:
    urls: set[str] = set()
    for page in html_files():
        for ref in parse_page(page).links:
            if ref.lower().startswith(("http:", "https:")):
                urls.add(ref)
    for source in (ROOT / "data.js",):
        for ref in DATA_RE.findall(source.read_text(encoding="utf-8")):
            if ref.lower().startswith(("http:", "https:")):
                urls.add(ref)
    errors: list[str] = []
    warnings: list[str] = []
    seen: set[str] = set()
    for url in sorted(urls):
        if url in EXTERNAL_SKIP or url in seen:
            continue
        seen.add(url)
        try:
            request = urllib.request.Request(
                url, headers={"User-Agent": "fresh-stuff-link-check/1.0"}, method="GET"
            )
            with urllib.request.urlopen(request, timeout=12) as response:
                status = response.status
            if status >= 400:
                errors.append(f"{url}: HTTP {status}")
        except urllib.error.HTTPError as exc:
            if exc.code in (401, 403, 405, 429):
                warnings.append(f"{url}: HTTP {exc.code} (not a dead link)")
            elif exc.code in (404, 410):
                errors.append(f"{url}: HTTP {exc.code}")
            else:
                warnings.append(f"{url}: HTTP {exc.code}")
        except (urllib.error.URLError, TimeoutError, OSError) as exc:
            warnings.append(f"{url}: {exc}")
    return len(seen), errors, warnings


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--external", action="store_true", help="Also probe remote URLs.")
    args = parser.parse_args()

    count, errors = check_local()
    print(f"checked {count} local references across {len(html_files())} HTML pages")
    for error in errors:
        print(f"  ERROR {error}")
    if args.external:
        ext_count, ext_errors, warnings = check_external()
        print(f"checked {ext_count} external references")
        for warning in warnings:
            print(f"  WARN  {warning}")
        for error in ext_errors:
            print(f"  ERROR {error}")
        errors.extend(ext_errors)
    if errors:
        print(f"FAILED: {len(errors)} broken reference(s)")
        return 1
    print("OK")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
