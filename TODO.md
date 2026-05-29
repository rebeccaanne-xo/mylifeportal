# TODO — mylifeportal

Open items for this repo. Move to CHANGELOG when done.

---

## Code quality
- [ ] `js/portal.js` is 3923 lines — review for logical split into feature files
      (e.g. `tasks.js` · `habits.js` · `prayers.js` · `schedule.js`) when refactoring
- [ ] `js/test.js` mirrors `js/portal.js` — delete `/test/` folder once portal is stable
- [ ] `scripts/worker-index-stale-copy.js` is a copy of `rebecca-portal-api/src/index.js`
      Delete this file once confirmed no unique changes were made to it

## Infrastructure
- [ ] Add PWA manifest (`manifest.json`) — listed as pending in CLAUDE.md
- [ ] Add push notification support — listed as pending
- [ ] Connect Anthropic API key — listed as pending

## Security
- [ ] Worker calls in `js/portal.js` use hardcoded Worker URL — move to a config constant at top of file

## Seed scripts (`/scripts/`)
- [ ] All seed scripts are one-time use — confirm which have already been run against production D1
      and archive or delete them once confirmed
