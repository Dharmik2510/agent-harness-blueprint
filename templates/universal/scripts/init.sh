#!/usr/bin/env bash
# Universal harness bootstrap — customize for your stack
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "→ Installing dependencies..."
if [[ -f package.json ]]; then
  npm ci
elif [[ -f requirements.txt ]]; then
  python -m pip install -r requirements.txt
else
  echo "  (no package manager detected — add install steps)"
fi

echo "→ Running health checks..."
if [[ -f package.json ]]; then
  npm run lint --if-present
  npm test --if-present -- --passWithNoTests
fi

echo "✓ Environment ready"
