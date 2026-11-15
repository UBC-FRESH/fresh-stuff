#!/usr/bin/env python3
"""Serve the FRESH stuff portal as a tiny static site.

No third-party dependencies. The site is plain HTML, CSS, JavaScript, WebP
images, and one self-hosted font. Bind to 0.0.0.0 when a Cloudflare tunnel on
the root host needs to reach the container over its bridge address.

Examples
--------
    python3 serve.py
    python3 serve.py --port 8130 --host 0.0.0.0
    PORT=9000 python3 serve.py
"""

from __future__ import annotations

import argparse
import json
import mimetypes
import os
import socket
import sys
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parent
PROJECT_COUNT = 20
PRIVATE_PATHS = {
    "/serve.log",
    "/serve.pid",
    "/serve.py",
    "/start.sh",
    "/stop.sh",
    "/.gitignore",
    "/README.md",
}
PRIVATE_PREFIXES = ("/deploy/",)

mimetypes.add_type("image/webp", ".webp")
mimetypes.add_type("font/woff2", ".woff2")
mimetypes.add_type("image/svg+xml", ".svg")


class PortalHandler(SimpleHTTPRequestHandler):
    """Static handler with a health endpoint and sensible cache headers."""

    server_version = "fresh-stuff/1.0"
    protocol_version = "HTTP/1.1"

    def __init__(self, *args: object, **kwargs: object) -> None:
        super().__init__(*args, directory=str(ROOT), **kwargs)  # type: ignore[arg-type]

    def do_GET(self) -> None:  # noqa: N802 (stdlib naming)
        path = urlsplit(self.path).path
        if path == "/healthz":
            payload = {
                "ok": True,
                "service": "fresh-stuff",
                "projects": PROJECT_COUNT,
                "site": "fresh-stuff.01101.dev",
            }
            body = json.dumps(payload).encode("utf-8")
            self.send_response(HTTPStatus.OK)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            self.wfile.write(body)
            return
        if path in ("", "/"):
            self.path = "/index.html"
        if (
            path.startswith("/.")
            or path in PRIVATE_PATHS
            or any(path.startswith(prefix) for prefix in PRIVATE_PREFIXES)
        ):
            self.send_error(HTTPStatus.NOT_FOUND, "Not found")
            return
        super().do_GET()

    def list_directory(self, path: str) -> None:  # noqa: ARG002
        """Do not expose directory listings."""
        self.send_error(HTTPStatus.NOT_FOUND, "Not found")

    def end_headers(self) -> None:
        path = urlsplit(self.path).path
        if path.startswith("/assets/") or path.startswith("/demos/"):
            self.send_header("Cache-Control", "public, max-age=86400")
        else:
            self.send_header("Cache-Control", "no-cache")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Referrer-Policy", "strict-origin-when-cross-origin")
        super().end_headers()

    def log_message(self, fmt: str, *args: object) -> None:
        sys.stderr.write("[fresh-stuff] %s - %s\n" % (self.address_string(), fmt % args))


class PortalServer(ThreadingHTTPServer):
    daemon_threads = True
    allow_reuse_address = True


def container_ip() -> str | None:
    try:
        return socket.gethostbyname(socket.gethostname())
    except OSError:
        return None


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--host",
        default=os.environ.get("HOST", "0.0.0.0"),
        help="Bind address (default: 0.0.0.0; use 127.0.0.1 to keep it local).",
    )
    parser.add_argument(
        "--port",
        type=int,
        default=int(os.environ.get("PORT", "8130")),
        help="Bind port (default: 8130, or $PORT).",
    )
    args = parser.parse_args()

    server = PortalServer((args.host, args.port), PortalHandler)
    ip = container_ip()
    print("FRESH stuff portal")
    print(f"  local:   http://127.0.0.1:{args.port}/")
    if args.host == "0.0.0.0" and ip:
        print(f"  bridge:  http://{ip}:{args.port}/")
    print(f"  health:  http://127.0.0.1:{args.port}/healthz")
    print("  stop:    Ctrl+C")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nshutting down")
    finally:
        server.server_close()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
