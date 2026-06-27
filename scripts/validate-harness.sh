#!/usr/bin/env bash
# Back-compat wrapper around the harness-score CLI.
# Usage: bash scripts/validate-harness.sh [path] [--min N] [--md report.md]
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
exec node "$DIR/scorecard/bin/harness-score.js" "$@"
