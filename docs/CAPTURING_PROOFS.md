# Capturing real proof artifacts

Every chapter of the five-chapter walkthrough ("One session, end to end") on
the [features showcase](../site/index.html) carries a badge that must tell the
truth (ADR-0016 — zero fabricated proof):

| Badge | Meaning | Enforced by |
|---|---|---|
| `Verified Recording · <version>` | A real capture of the chapter's session, recorded against the released build, with all three artifacts committed and non-empty. | `scripts/verify-manifest-sync.mjs` — the build **fails** if any `captured: true` entry references a missing or empty file. |
| `Illustrative Schematic` | No capture exists yet. The stage says so explicitly and shows documented behaviour instead of pretending. | Same verifier — `captured: false` chapters carry honest limitations instead of a claim. |

There is no third state. A chapter can never look verified without a real file
on disk behind it.

## The chapters

Chapter ids live in `site/data/proofs.manifest.json` and map 1:1 to the
walkthrough in `site/data/story-stages.json`:

| id | Chapter |
|---|---|
| `chapter-01` | Keep your CLIs. Add a living brain. |
| `chapter-02` | Run agents in parallel without collisions. |
| `chapter-03` | Firewall tools, stop hangs, control spend. |
| `chapter-04` | Build, diff, and test mobile apps natively. |
| `chapter-05` | Ship only what passes independent proof. |

## The 3-step capture workflow (under 5 minutes per chapter)

Prerequisites: the released `axym` build installed (`axym --version` works),
a git project to run the session in, and this repo's toolchain (`node`).
Optional but nicer: [`asciinema`](https://asciinema.org) for a real `.cast`
recording — otherwise `script(1)` captures an honest transcript.

```sh
# 0. See what is still illustrative and confirm the manifest is healthy
scripts/capture-proof.sh --check

# 1. Record the real session, export the real diff, save the real receipt,
#    and flip the chapter to captured:true in the manifest
scripts/capture-proof.sh --chapter chapter-05 --project ~/src/payments

# 2. Commit the capture (never push from the script)
git add site/data/proofs.manifest.json site/assets/proofs/
git commit -m "[proofs] real capture for chapter-05"
```

What each step produces, all under `site/assets/proofs/`:

| Step | Artifact | How it is captured |
|---|---|---|
| 1 | `<chapter>.cast` (or `.transcript`) | `asciinema rec`, or `script -q` fallback — you run the real commands against the real build |
| 2 | `<chapter>.diff` | `git diff HEAD --stat` + full diff from the project you ran in |
| 3 | `<chapter>.receipt.json` | The receipt/Result Ledger JSON the run actually produced (validated as JSON before use) |
| 4 | manifest update | `captured: true`, the exact `axym --version` string, and today's ISO date |
| 5 | verification | `verify-manifest-sync.mjs` re-runs; the build must be green before you commit |

## Rules the script enforces for you

- **No axym, no capture.** The script refuses to run without the real binary —
  it will never fabricate a version string.
- **Empty means failed.** A zero-byte recording, diff or receipt aborts the
  capture and leaves the chapter honestly `captured: false`.
- **Build is the referee.** If a `captured: true` entry ever points at a file
  that is missing or empty, `npm run verify` fails and the site cannot deploy.
- **Replay counts, but is labelled.** An offline replay
  (`axym bench --reproduce`) can regenerate artifacts, but the
  `captured_version` you record must be the build that actually ran.
- **The schematic stays honest until then.** While `captured` is `false`, the
  stage keeps its `Illustrative Schematic` badge — editing narrative content
  in `story-stages.json` never flips a badge.

## Refreshing proofs for v0.25.0+

Proofs are pinned to a version. When a new Axym release ships:

1. Run `scripts/capture-proof.sh --check` to list chapters captured on older
   versions.
2. Re-capture any chapter whose behaviour changed (the schematic content in
   `story-stages.json` also needs a read — it quotes documented behaviour per
   release).
3. Update `captured_version` only through a fresh capture — the manifest is
   never hand-edited to bump a version.
