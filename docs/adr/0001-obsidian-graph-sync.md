# Auto-sync Obsidian knowledge graph to the personal website

- Date: 2026-08-24
- Status: Accepted

## Context

Self-Learning should show an interactive Obsidian graph without manually regenerating HTML after every vault change. The vault already lives in a private GitHub repo. Embedding full note bodies is unnecessary and riskier; titles + wiki-links are enough for a graph view.

## Decision

1. Extract a public **metadata-only** graph JSON (`client/public/obsidian-graph.json`) from markdown wiki-links and tags via `scripts/generate-obsidian-graph.mjs`.
2. Render it in a fullscreen React force-graph viewer opened from Self-Learning ("Open Graph").
3. Sync on vault push: the vault repo dispatches an event to this website repo; a GitHub Action checks out the private vault, regenerates JSON, and commits if changed.

## Consequences

- Graph updates automatically when the vault is pushed (after one-time Actions secrets are configured).
- Only note titles, paths, tags, and link edges are published — not note content.
- Large vault growth increases JSON size and force-graph cost; filtering folders later is straightforward.
