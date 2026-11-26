#!/usr/bin/env bash
# =============================================================================
# AXYM PORTAL — real-proof capture workflow (ADR-0016)
# =============================================================================
# Guides a maintainer through replacing an "Illustrative Schematic" proof
# sequence with a REAL captured artifact set:
#
#   1. records the real axym session   (asciinema rec, or script(1) fallback)
#   2. exports the real git diff       (from the demo project you ran in)
#   3. saves the real Result Ledger receipt JSON
#   4. updates site/data/proofs.manifest.json (captured:true, exact
#      `axym --version`, ISO date) and re-runs the drift-prevention verifier
#
# Zero external dependencies beyond the repo toolchain: bash, git, node
# (already required by the verifiers) and, optionally, asciinema.
# NEVER pushes. Never invents a checksum, version or recording: if a step is
# skipped, the sequence stays honestly captured:false.
#
# Usage:
#   scripts/capture-proof.sh --sequence <id> [--project <dir>] [--check] [--help]
#
# Examples:
#   scripts/capture-proof.sh --check
#   scripts/capture-proof.sh --sequence idea-to-verified-code --project ~/src/payments
# =============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
PROOFS_MANIFEST="$ROOT/site/data/proofs.manifest.json"
PROOFS_DIR="$ROOT/site/assets/proofs"

SEQUENCE=""
PROJECT_DIR="$(pwd)"
DO_CHECK=0

usage() {
  sed -n '2,24p' "$0" | sed 's/^# \{0,1\}//'
  exit 0
}

fail() { echo "ERROR: $*" >&2; exit 1; }

info() { echo "  $*"; }

need_node() {
  command -v node >/dev/null 2>&1 || fail "node is required (it already powers the site verifiers)."
}

[[ "${1:-}" == "--help" ]] && usage
[[ -f "$PROOFS_MANIFEST" ]] || fail "proofs manifest not found at $PROOFS_MANIFEST"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --sequence) SEQUENCE="${2:-}"; shift 2 ;;
    --project) PROJECT_DIR="${2:-}"; shift 2 ;;
    --check) DO_CHECK=1; shift ;;
    *) fail "unknown argument: $1 (try --help)" ;;
  esac
done

need_node

# --------------------------------------------------------------- --check --
if [[ "$DO_CHECK" -eq 1 ]]; then
  echo "Proof manifest check"
  echo "===================="
  node "$ROOT/scripts/verify-manifest-sync.mjs"
  echo ""
  echo "Captured sequences and their artifacts:"
  node - "$PROOFS_MANIFEST" <<'NODE'
const m = require(process.argv[2]);
for (const s of m.sequences) {
  const files = [s.recording_path, s.diff_path, s.receipt_path].filter(Boolean).join(', ');
  const state = s.captured ? `captured ${s.captured_version} @ ${s.captured_at}` : 'illustrative (no capture committed)';
  console.log(`- ${s.id}: ${state}${files ? ` [${files}]` : ''}`);
}
NODE
  exit 0
fi

# ------------------------------------------------------------ sequence id --
if [[ -z "$SEQUENCE" ]]; then
  echo "Available sequences:"
  node - "$PROOFS_MANIFEST" <<'NODE'
const m = require(process.argv[2]);
m.sequences.forEach((s, i) => console.log(`  ${i + 1}. ${s.id} — ${s.title} (${s.captured ? 'captured' : 'illustrative'})`));
NODE
  read -r -p "Sequence id to capture: " SEQUENCE
fi

SEQ_EXISTS=$(node - "$PROOFS_MANIFEST" "$SEQUENCE" <<'NODE'
const m = require(process.argv[2]);
console.log(m.sequences.some((s) => s.id === process.argv[3]) ? "yes" : "no");
NODE
)
[[ "$SEQ_EXISTS" == "yes" ]] || fail "sequence '$SEQUENCE' is not in the proofs manifest."

# ------------------------------------------------------------- axym build --
AXYM_VERSION=""
if command -v axym >/dev/null 2>&1; then
  AXYM_VERSION="$(axym --version 2>/dev/null || true)"
fi
if [[ -z "$AXYM_VERSION" ]]; then
  fail "axym is not on PATH. Install the released build first (see README.md); this script records REAL sessions and refuses to invent a version."
fi
info "axym version: $AXYM_VERSION"

mkdir -p "$PROOFS_DIR"

# ------------------------------------------------------- 1. the recording --
RECORDING_EXT="cast"
RECORDING="$PROOFS_DIR/$SEQUENCE.cast"
echo ""
echo "Step 1 — record the real session"
echo "--------------------------------"
echo "Run the sequence against the released axym build. Speak the commands in"
echo "the schematic, for real, in: $PROJECT_DIR"
if command -v asciinema >/dev/null 2>&1; then
  read -r -p "Start asciinema recording now? [Y/n] " ANSWER
  if [[ ! "$ANSWER" =~ ^[Nn] ]]; then
    asciinema rec -c "bash -l" "$RECORDING"
  fi
else
  echo "asciinema not found — falling back to script(1) (terminal transcript)."
  echo "Install asciinema later for a richer .cast; a transcript is a real recording too."
  read -r -p "Start script(1) transcript now? [Y/n] " ANSWER
  if [[ ! "$ANSWER" =~ ^[Nn] ]]; then
    RECORDING="$PROOFS_DIR/$SEQUENCE.transcript"
    SCRIPT_CMD=(script -q "$RECORDING")
    if script --help 2>&1 | grep -q "^\s*-c"; then
      SCRIPT_CMD=(script -q -c "bash -l" "$RECORDING")
    fi
    "${SCRIPT_CMD[@]}"
  fi
fi

if [[ ! -s "$RECORDING" ]]; then
  echo "No recording captured — leaving the sequence honestly captured:false."
  exit 2
fi
info "recording: $RECORDING ($(wc -c < "$RECORDING" | tr -d ' ') bytes)"

# ------------------------------------------------------------ 2. the diff --
echo ""
echo "Step 2 — export the real git diff from $PROJECT_DIR"
echo "----------------------------------------------------"
[[ -d "$PROJECT_DIR/.git" ]] || fail "$PROJECT_DIR is not a git work tree."
DIFF_OUT="$PROOFS_DIR/$SEQUENCE.diff"
{
  echo "# git -C $PROJECT_DIR diff HEAD --stat"
  git -C "$PROJECT_DIR" diff HEAD --stat
  echo ""
  git -C "$PROJECT_DIR" diff HEAD
} > "$DIFF_OUT"
[[ -s "$DIFF_OUT" ]] || fail "the exported diff is empty — nothing to prove."
info "diff: $DIFF_OUT ($(wc -c < "$DIFF_OUT" | tr -d ' ') bytes)"

# --------------------------------------------------------- 3. the receipt --
echo ""
echo "Step 3 — save the real Result Ledger receipt"
echo "---------------------------------------------"
echo "Point this at the receipt JSON the run actually produced (e.g. the"
echo "Result Ledger export or /receipt output saved to a file)."
read -r -p "Path to the real receipt JSON: " RECEIPT_SRC
[[ -n "$RECEIPT_SRC" && -s "$RECEIPT_SRC" ]] || fail "receipt file missing or empty: $RECEIPT_SRC"
node -e "JSON.parse(require('fs').readFileSync(process.argv[1], 'utf8'))" "$RECEIPT_SRC" \
  || fail "receipt is not valid JSON."
RECEIPT_OUT="$PROOFS_DIR/$SEQUENCE.receipt.json"
cp "$RECEIPT_SRC" "$RECEIPT_OUT"
info "receipt: $RECEIPT_OUT"

# ------------------------------------------------------- 4. the manifest --
echo ""
echo "Step 4 — mark the sequence captured in the manifest"
echo "----------------------------------------------------"
node - "$PROOFS_MANIFEST" "$SEQUENCE" "$AXYM_VERSION" "$RECORDING" "$DIFF_OUT" "$RECEIPT_OUT" <<'NODE'
const fs = require('fs');
const [manifestPath, id, version, recording, diff, receipt] = process.argv.slice(2);
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const seq = manifest.sequences.find((s) => s.id === id);
if (!seq) { console.error(`sequence ${id} vanished mid-run`); process.exit(1); }
const rel = (p) => 'assets/proofs/' + require('path').basename(p);
seq.captured = true;
seq.captured_version = version;
seq.captured_at = new Date().toISOString().slice(0, 10);
seq.recording_path = rel(recording);
seq.diff_path = rel(diff);
seq.receipt_path = rel(receipt);
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
console.log(`  ${id}: captured=true · ${version} · ${seq.captured_at}`);
NODE

# ------------------------------------------------------------- 5. verify --
echo ""
echo "Step 5 — re-run the drift-prevention verifier"
echo "----------------------------------------------"
node "$ROOT/scripts/verify-manifest-sync.mjs"

echo ""
echo "Capture complete and verified. Commit it (never push from this script):"
echo "  git add site/data/proofs.manifest.json site/assets/proofs/"
echo "  git commit -m \"[proofs] real capture for $SEQUENCE ($AXYM_VERSION)\""
