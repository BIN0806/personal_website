# My Website

You can view my website here:

[Billy's Personal Website](https://billynguyen.netlify.app)

Feel free to explore and let me know if you have any feedback!

## Local development

```bash
npm install
npm run dev
```

App runs at `http://localhost:5000` (or set `PORT=3000` if 5000 is taken on macOS).

## Obsidian graph

Generate the Self-Learning graph JSON from a vault folder:

```bash
node scripts/generate-obsidian-graph.mjs \
  --vault /path/to/ObsidianVerse/MultiVerse \
  --out client/public/obsidian-graph.json
```
