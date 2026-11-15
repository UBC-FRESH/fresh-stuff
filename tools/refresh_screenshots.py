#!/usr/bin/env python3
"""Refresh the portal screenshots from locally running lab demos.

This is a maintainer tool, not a site runtime dependency. It uses Playwright
for capture and Pillow for WebP conversion.

    python3 -m pip install playwright pillow
    playwright install chromium
    python3 tools/refresh_screenshots.py --only ws4,fire

Targets live in ``tools/capture_targets.json``. Each target may include simple
actions (select, click, evaluate, wait) so a view like "FHOPS Plan tab" can be
reproduced. Raw PNGs go to ``tmp/screenshots`` by default; WebP copies go to
``assets/img``. Review the images before committing them.
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_TARGETS = ROOT / "tools" / "capture_targets.json"
DEFAULT_PNG = ROOT / "tmp" / "screenshots"
DEFAULT_WEBP = ROOT / "assets" / "img"


def load_targets(path: Path) -> dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def apply_actions(page: Any, actions: list[dict[str, Any]]) -> None:
    for action in actions:
        kind = action.get("type")
        if kind == "select":
            page.select_option(action["selector"], value=action["value"])
        elif kind == "click":
            locator = page.locator(action["selector"])
            if "text" in action:
                locator = locator.filter(has_text=action["text"])
            locator.first.click()
        elif kind == "click_role":
            page.get_by_role(
                action["role"], name=action["name"], exact=action.get("exact", True)
            ).first.click()
        elif kind == "evaluate":
            page.evaluate(action["script"])
        elif kind == "wait":
            page.wait_for_timeout(int(action.get("ms", 1000)))
        else:
            raise ValueError(f"unknown action type: {kind!r}")


def capture(targets: dict[str, Any], *, only: set[str], png_dir: Path, webp_dir: Path) -> int:
    from PIL import Image
    from playwright.sync_api import sync_playwright

    defaults = targets.get("defaults", {})
    width, height = defaults.get("viewport", [1600, 1000])
    png_dir.mkdir(parents=True, exist_ok=True)
    webp_dir.mkdir(parents=True, exist_ok=True)
    failures: list[str] = []
    with sync_playwright() as pw:
        browser = pw.chromium.launch()
        page = browser.new_page(
            viewport={"width": int(width), "height": int(height)}, device_scale_factor=1
        )
        for target in targets["targets"]:
            name = target["name"]
            if only and name not in only:
                continue
            print(f"capture {name}: {target['url']}")
            try:
                page.goto(target["url"], wait_until="domcontentloaded", timeout=90_000)
                page.wait_for_timeout(int(target.get("wait_ms", defaults.get("wait_ms", 2500))))
                apply_actions(page, target.get("actions", []))
                selector = target.get("selector")
                if selector:
                    page.locator(selector).screenshot(path=str(png_dir / f"{name}.png"))
                else:
                    page.screenshot(path=str(png_dir / f"{name}.png"))
                image = Image.open(png_dir / f"{name}.png").convert("RGB")
                if image.width > 1600:
                    image = image.resize(
                        (1600, round(image.height * 1600 / image.width)), Image.LANCZOS
                    )
                image.save(webp_dir / f"{name}.webp", "WEBP", quality=82, method=6)
                print(f"  wrote {png_dir / (name + '.png')} and {webp_dir / (name + '.webp')}")
            except Exception as exc:  # noqa: BLE001
                failures.append(f"{name}: {exc}")
                print(f"  FAILED: {exc}")
        browser.close()
    if failures:
        print("\nfailed targets:")
        for failure in failures:
            print(f"  {failure}")
        return 1
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--targets", type=Path, default=DEFAULT_TARGETS)
    parser.add_argument("--out", type=Path, default=DEFAULT_PNG, help="Raw PNG directory.")
    parser.add_argument("--webp", type=Path, default=DEFAULT_WEBP, help="WebP destination.")
    parser.add_argument("--only", default="", help="Comma-separated target names.")
    args = parser.parse_args()
    try:
        targets = load_targets(args.targets)
    except (OSError, json.JSONDecodeError) as exc:
        print(f"could not read {args.targets}: {exc}")
        return 2
    only = {part.strip() for part in args.only.split(",") if part.strip()}
    try:
        return capture(targets, only=only, png_dir=args.out, webp_dir=args.webp)
    except ImportError:
        print("install the maintainer tools first:")
        print("  python3 -m pip install playwright pillow")
        print("  playwright install chromium")
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
