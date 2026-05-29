# GLOSSARY — mylifeportal

Terms and naming conventions used in this repo.

---

## What this is
Rebecca's personal life portal — a Cloudflare Pages app backed by D1 via `rebecca-portal-api`.
Live at: `mylifeportal.pages.dev`

## Pages
| Folder | What it is |
|--------|-----------|
| `/` (index.html) | Main portal dashboard — all modules (tasks, habits, prayers, schedule, etc.) |
| `/daily/` | Daily log and morning routine tracker |
| `/projects/` | Projects tracker and task board |
| `/test/` | Dev copy — not for production use |

## Scripts (`/scripts/`)
| File | What it does |
|------|-------------|
| `seed-completed.js` | Seeds completed tasks into D1 |
| `seed-gbb-priorities.js` | Seeds GBB priority tasks into D1 |
| `seed-missing-tasks.js` | Seeds missing/backfilled tasks into D1 |
| `seed-vision.js` | Seeds vision items into D1 |
| `update-sheet-structure.gs` | Google Apps Script — updates Sheet backup structure |
| `worker-index-stale-copy.js` | Stale copy of `rebecca-portal-api/src/index.js` — verify and delete |

## Infrastructure
| Item | Value |
|------|-------|
| Deployed on | Cloudflare Pages |
| Backend | `rebecca-portal-api` Worker |
| Database | D1 — `rebecca-portal` (ID: 10cd4914-4514-403c-9a1d-d76fc60399c9) |
| Google Sheets backup | Apps Script — URL in `js/portal.js` |

## CSS tokens
| Token | Hex | Use |
|-------|-----|-----|
| `--navy` | `#1B2A4A` | Primary dark / sidebar |
| `--peony` | `#C2738A` | Accent |
| `--sage` | `#4A7C6F` | Secondary accent |
| `--amber` | `#C4895A` | Tertiary accent |
| `--faith` | `#6B8CB8` | Faith/prayer module color |
