# Capturing real proof artifacts

Every proof sequence on the [features showcase](../site/index.html) carries a
badge that must tell the truth (ADR-0016 — zero fabricated proof):

| Badge | Meaning | Enforced by |
|---|---|---|
| `Verified Recording · <version>` | A real capture of the sequence, recorded against the released build, with all three artifacts committed and non-empty. | `scripts/verify-manifest-sync.mjs` — the build **fails** if any `captured: true` entry references a missing or empty file. |
| `Illustrative Schematic` | No capture exists yet. The viewer says so explicitly and shows documented behaviour instead of pretending. | Same verifier — `captured: false` entries must carry an honest caption. |

There is no third state. A slot can never look verified without a real file on
disk behind it.

## The 3-step capture workflow (under 5 minutes)

Prerequisites: the released `axym` build installed (`axym --version` works),
a git project to run the sequence in, and this repo's toolchain (`node`).
Optional but nicer: [`asciinema`](https://asciinema.org) for a real `.cast`
recording — otherwise `script(1)` captures an honest transcript.

```sh
# 0. See what is still illustrative and confirm the manifest is healthy
scripts/capture-proof.sh --check

# 1. Record the real session, export the real diff, save the real receipt,
#    and flip the sequence to captured:true in the manifest
scripts/capture-proof.sh --sequence idea-to-verified-code --project ~/src/payments

# 2. Commit the capture (never push from the script)
git add site/data/proofs.manifest.json site/assets/proofs/
git commit -m "[proofs] real capture for idea-to-verified-code"
```

What each step produces, all under `site/assets/proofs/`:

| Step | Artifact | How it is captured |
|---|---|---|
| 1 | `<sequence>.cast` (or `.transcript`) | `asciinema rec`, or `script -q` fallback — you run the real commands against the real build |
| 2 | `<sequence>.diff` | `git diff HEAD --stat` + full diff from the project you ran in |
| 3 | `<sequence>.receipt.json` | The receipt/Result Ledger JSON the run actually produced (validated as JSON before use) |
| 4 | manifest update | `captured: true`, the exact `axym --version` string, and today's ISO date |
| 5 | verification | `verify-manifest-sync.mjs` re-runs; the build must be green before you commit |

## Rules the script enforces for you

- **No axym, no capture.** The script refuses to run without the real binary —
  it will never fabricate a version string.
- **Empty means failed.** A zero-byte recording, diff or receipt aborts the
  capture and leaves the sequence honestly `captured: false`.
- **Build is the referee.** If a `captured: true` entry ever points at a file
  that is missing or empty, `npm run verify` fails and the site cannot deploy.
- **Replay counts, but is labelled.** An offline replay
  (`axym bench --reproduce`) can regenerate artifacts, but the
  `captured_version` you record must be the build that actually ran.

## Refreshing proofs for v0.25.0+

Proofs are pinned to a version. When a new Axym release ships:

1. Run `scripts/capture-proof.sh --check` to list sequences captured on older
   versions.
2. Re-capture any sequence whose behaviour changed (the schematic captions
   also need a read — they quote documented behaviour per release).
3. Update `captured_version` only through a fresh capture — the manifest is
   never hand-edited to bump a version.
