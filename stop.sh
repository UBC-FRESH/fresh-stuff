#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

if command -v systemctl >/dev/null 2>&1 && systemctl list-unit-files fresh-stuff.service >/dev/null 2>&1; then
  echo "fresh-stuff is installed as a systemd service."
  echo "Use: sudo systemctl stop fresh-stuff"
  exit 0
fi

if [[ ! -f serve.pid ]]; then
  echo "no serve.pid; nothing to stop"
  exit 0
fi
PID="$(cat serve.pid)"
if kill -0 "$PID" 2>/dev/null; then
  kill "$PID"
  echo "stopped fresh-stuff (pid $PID)"
else
  echo "process $PID was not running"
fi
rm -f serve.pid
