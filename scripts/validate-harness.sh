#!/usr/bin/env bash
# Score a repository against the five harness pillars
set -euo pipefail

TARGET="${1:-.}"
cd "$TARGET"

score=0
max=10
issues=()

check_file() {
  local path="$1"
  local pillar="$2"
  if [[ -f "$path" ]]; then
    echo "  ✓ $path"
    score=$((score + 1))
  else
    echo "  ✗ missing: $path"
    issues+=("[$pillar] Add $path")
  fi
}

echo "Harness validation: $TARGET"
echo ""

echo "Instructions pillar:"
check_file "AGENTS.md" "Instructions"
if [[ -f ".github/copilot-instructions.md" ]] || [[ -f "CLAUDE.md" ]]; then
  echo "  ✓ tool-specific instructions present"
  score=$((score + 1))
else
  echo "  ✗ missing: .github/copilot-instructions.md or CLAUDE.md"
  issues+=("[Instructions] Add Copilot or Claude instruction file")
fi

echo ""
echo "State pillar:"
check_file "PROGRESS.md" "State"
check_file "feature_list.json" "State"

echo ""
echo "Verification pillar:"
if grep -qE '(npm test|pytest|cargo test|go test|verify|lint)' AGENTS.md 2>/dev/null; then
  echo "  ✓ AGENTS.md mentions verification commands"
  score=$((score + 1))
else
  echo "  ✗ AGENTS.md lacks explicit verification commands"
  issues+=("[Verification] Add runnable verify commands to AGENTS.md")
fi

echo ""
echo "Scope pillar:"
if grep -qE '"status"' feature_list.json 2>/dev/null; then
  echo "  ✓ feature_list.json has status field"
  score=$((score + 1))
else
  echo "  ✗ feature_list.json missing structured status"
  issues+=("[Scope] Use feature_list.json with status per feature")
fi

echo ""
echo "Lifecycle pillar:"
if [[ -f "scripts/init.sh" ]]; then
  echo "  ✓ scripts/init.sh"
  score=$((score + 1))
else
  echo "  ✗ missing: scripts/init.sh"
  issues+=("[Lifecycle] Add scripts/init.sh bootstrap")
fi
check_file "SESSION_HANDOFF.md" "Lifecycle"

echo ""
echo "Score: $score / $max"
if [[ ${#issues[@]} -gt 0 ]]; then
  echo ""
  echo "Suggested fixes:"
  for i in "${issues[@]}"; do echo "  - $i"; done
  exit 1
fi
echo "All core harness files present."
exit 0
