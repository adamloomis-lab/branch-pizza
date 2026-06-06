# POS price sync

The website menu mirrors the restaurant's **live POS pricing** automatically.
Once a day a GitHub Action reads the prices straight from their Heartland /
MobileBytes online-ordering feed and updates the site if anything changed. No
manual price edits needed.

## How it works

1. **`.github/workflows/pos-sync.yml`** runs daily (and on-demand from the
   Actions tab).
2. It runs **`scripts/pos-sync/sync.mjs`**, which:
   - opens the POS ordering page in headless Chromium (Playwright) and captures
     the `initial_data` menu feed (the same data the order page itself uses),
   - maps each POS item to one of ours using **`scripts/pos-sync/pos-map.json`**,
   - writes the prices to **`src/data/pos-prices.json`**.
3. If `pos-prices.json` changed, the workflow commits it. That push triggers the
   normal Netlify deploy, so the live menu updates within a couple minutes.
4. If nothing changed, it's a no-op.

Only **prices** are synced. Item names, descriptions, ordering, categories and
styling stay hand-curated in `src/data/site.ts`. `site.ts` overlays
`pos-prices.json` on top of its hand-coded defaults, so if the feed is ever
unreachable the site still renders the last-known-good prices.

## Safety / guardrails

- An item that can't be found in the feed is **skipped** (keeps its default
  price) and logged, never blanked out.
- If more than 25% of mapped items go missing, the run **aborts without
  publishing** (the POS menu structure probably changed). The workflow fails and
  GitHub emails the repo admin. Fix `pos-map.json` and re-run.
- Every change is a git commit, so the history is a full audit log of price
  changes.

## Run it manually

```bash
npm run sync:pos          # fetch live prices and write pos-prices.json
node scripts/pos-sync/sync.mjs --dry   # show what would change, write nothing
```

## When the menu changes (new items, renames)

`pos-map.json` maps our display names to POS item names. If the owner adds a new
item or renames one in the POS, add/adjust the mapping there (and add the item to
`site.ts` with a description). Item types: `pizza` (size grid), `single` (one
price), `twoSize` (Small/Large), `combo` (joins several POS items, e.g. wings).

## Optional GitHub secrets

- `NETLIFY_BUILD_HOOK` — build-hook URL; pinged after a price commit so the
  deploy always fires (the push webhook already does this; this is a backup).
- `RESEND_API_KEY`, `POS_SYNC_EMAIL`, `POS_SYNC_FROM` — set all three to get an
  email summary whenever prices change.
