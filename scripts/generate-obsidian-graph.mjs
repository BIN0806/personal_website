#!/usr/bin/env node
/**
 * Extract an Obsidian link graph (note titles + wiki-links + tags) from a vault.
 * Does not include note body text — safe for public site metadata.
 *
 * Usage:
 *   node scripts/generate-obsidian-graph.mjs --vault /path/to/MultiVerse --out client/public/obsidian-graph.json
 */

import fs from "node:fs";
import path from "node:path";

const IMAGE_EXT = /\.(png|jpe?g|gif|webp|svg|bmp|pdf|mp[34]|wav|mov|m4a)$/i;
const WIKI_LINK_RE = /\[\[([^\[\]]+)\]\]/g;
const TAG_RE = /(?<!\S)#([A-Za-z][\w/-]*)/g;

function parseArgs(argv) {
  const args = { vault: "", out: "client/public/obsidian-graph.json" };
  for (let i = 2; i < argv.length; i += 1) {
    if (argv[i] === "--vault") args.vault = argv[++i];
    else if (argv[i] === "--out") args.out = argv[++i];
  }
  if (!args.vault) {
    console.error("Missing --vault <path>");
    process.exit(1);
  }
  return args;
}

function walkMarkdown(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkMarkdown(full, files);
    else if (entry.isFile() && entry.name.endsWith(".md")) files.push(full);
  }
  return files;
}

function noteIdFromPath(vaultRoot, filePath) {
  const rel = path.relative(vaultRoot, filePath).replace(/\\/g, "/");
  return rel.replace(/\.md$/i, "");
}

function noteTitle(filePath) {
  return path.basename(filePath, ".md");
}

function topFolder(noteId) {
  const parts = noteId.split("/");
  return parts.length > 1 ? parts[0] : "Root";
}

function resolveWikiTarget(raw, sourceId, titleIndex) {
  const target = raw.split("|")[0].split("#")[0].trim();
  if (!target || IMAGE_EXT.test(target)) return null;

  // Exact title match (case-insensitive)
  const byTitle = titleIndex.get(target.toLowerCase());
  if (byTitle) return byTitle;

  // Path-relative from source folder
  const sourceDir = path.posix.dirname(sourceId);
  const joined = path.posix.normalize(path.posix.join(sourceDir, target));
  if (titleIndex.has(`id:${joined.toLowerCase()}`)) return joined;

  // Basename fallback across vault
  const base = path.posix.basename(target).toLowerCase();
  const matches = titleIndex.get(`base:${base}`);
  if (matches?.length === 1) return matches[0];

  return target; // unresolved — still useful as a node label
}

function extract(vaultRoot) {
  const files = walkMarkdown(vaultRoot);
  const titleIndex = new Map();
  const nodesById = new Map();

  for (const file of files) {
    const id = noteIdFromPath(vaultRoot, file);
    const title = noteTitle(file);
    const group = topFolder(id);
    nodesById.set(id, { id, title, group, tags: [], exists: true });

    const lowerTitle = title.toLowerCase();
    titleIndex.set(lowerTitle, id);
    titleIndex.set(`id:${id.toLowerCase()}`, id);
    const baseKey = `base:${lowerTitle}`;
    if (!titleIndex.has(baseKey)) titleIndex.set(baseKey, []);
    titleIndex.get(baseKey).push(id);
  }

  const links = [];
  const linkKeys = new Set();

  for (const file of files) {
    const sourceId = noteIdFromPath(vaultRoot, file);
    const content = fs.readFileSync(file, "utf8");

    const tags = new Set();
    for (const match of content.matchAll(TAG_RE)) tags.add(match[1]);
    nodesById.get(sourceId).tags = [...tags].sort();

    for (const match of content.matchAll(WIKI_LINK_RE)) {
      const targetId = resolveWikiTarget(match[1], sourceId, titleIndex);
      if (!targetId || targetId === sourceId) continue;

      if (!nodesById.has(targetId)) {
        nodesById.set(targetId, {
          id: targetId,
          title: path.posix.basename(targetId),
          group: "Unresolved",
          tags: [],
          exists: false,
        });
      }

      const key = `${sourceId}::${targetId}`;
      if (linkKeys.has(key)) continue;
      linkKeys.add(key);
      links.push({ source: sourceId, target: targetId });
    }
  }

  const nodes = [...nodesById.values()].sort((a, b) => a.id.localeCompare(b.id));
  return {
    generatedAt: new Date().toISOString(),
    vault: "ObsidianVerse/MultiVerse",
    nodeCount: nodes.length,
    linkCount: links.length,
    nodes,
    links,
  };
}

function main() {
  const { vault, out } = parseArgs(process.argv);
  const vaultRoot = path.resolve(vault);
  const graph = extract(vaultRoot);
  const outPath = path.resolve(out);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, `${JSON.stringify(graph, null, 2)}\n`, "utf8");
  console.log(
    `Wrote ${graph.nodeCount} nodes / ${graph.linkCount} links → ${outPath}`,
  );
}

main();
