#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

if command -v systemctl >/dev/null 2>&1 && systemctl list-unit-files fresh-stuff.service >/dev/null 2>&1; then
  echo "fresh-stuff is installed as a systemd service."
  echo "Use: sudo systemctl status|restart|stop fresh-stuff"
  exit 0
fi

PORT="${PORT:-8130}"
HOST="${HOST:-0.0.0.0}"
if [[ -f serve.pid ]] && kill -0 "$(cat serve.pid)" 2>/dev/null; then
  echo "fresh-stuff is already running (pid $(cat serve.pid))"
  exit 0
fi
nohup python3 serve.py --host "$HOST" --port "$PORT" > serve.log 2>&1 &
echo $! > serve.pid
sleep 1
echo "fresh-stuff started on http://127.0.0.1:${PORT}/ (pid $(cat serve.pid))"
echo "health: http://127.0.0.1:${PORT}/healthz"
