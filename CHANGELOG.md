# CHANGELOG — mylifeportal

All notable changes to this repo are documented here.

---

## [Unreleased]

## [2026-05-29]
### Changed
- Moved all flat HTML files into named folders (`/daily/`, `/projects/`, `/test/`)
- Extracted inline CSS from every HTML file into `/styles/[name].css`
- Extracted inline JavaScript from every HTML file into `/js/[name].js`
- Moved all seed scripts and `.gs` file into `/scripts/`
- Renamed `js/worker-index.js` → `scripts/worker-index-stale-copy.js` (flagged as stale)
- Added header comments to all files
- Added `.gitignore`, CHANGELOG.md, TODO.md, GLOSSARY.md

### Deleted (via PowerShell)
- `daily.html`, `projects.html` (moved to named folders)
- `seed-completed (1).js`, `seed-gbb-priorities (1).js` (Windows duplicate copies)
- `seed-completed.js`, `seed-gbb-priorities.js`, `seed-missing-tasks.js`, `seed-vision.js` (moved to `/scripts/`)
- `update-sheet-structure.gs` (moved to `/scripts/`)
- `js/worker-index.js` (moved to `/scripts/worker-index-stale-copy.js`)
