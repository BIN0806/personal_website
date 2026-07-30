import fs from "fs";
import path from "path";
import {
  type ActivityData,
  type ActivityResponse,
  fetchGitHubActivityData,
  getCurrentYear,
  getCooldownRemaining,
  isCacheFresh,
  REFRESH_COOLDOWN_MS,
  toActivityResponse,
} from "@shared/github-activity-core";

type GlobalActivityCache = {
  lastGlobalRefresh: number | null;
  data: ActivityData | null;
};

const CACHE_FILE = path.join(import.meta.dirname, ".activity-cache.json");

let memoryCache: GlobalActivityCache | null = null;
let refreshLock = false;

function readCacheFile(): GlobalActivityCache {
  if (memoryCache) return memoryCache;

  try {
    if (fs.existsSync(CACHE_FILE)) {
      const parsed = JSON.parse(fs.readFileSync(CACHE_FILE, "utf-8")) as GlobalActivityCache;
      if (parsed.data?.cacheYear !== getCurrentYear()) {
        const cleared: GlobalActivityCache = { lastGlobalRefresh: null, data: null };
        writeCacheFile(cleared);
        return cleared;
      }
      memoryCache = parsed;
      return parsed;
    }
  } catch {
    // fall through to empty cache
  }

  memoryCache = { lastGlobalRefresh: null, data: null };
  return memoryCache;
}

function writeCacheFile(cache: GlobalActivityCache) {
  memoryCache = cache;
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
}

export async function getGitHubActivity(): Promise<ActivityResponse> {
  const cache = readCacheFile();

  if (cache.data && isCacheFresh(cache.data)) {
    return toActivityResponse(cache.data, cache.lastGlobalRefresh);
  }

  const data = await fetchGitHubActivityData();
  writeCacheFile({
    lastGlobalRefresh: cache.lastGlobalRefresh,
    data,
  });

  return toActivityResponse(data, cache.lastGlobalRefresh);
}

export async function refreshGitHubActivity(): Promise<{
  data: ActivityResponse;
  wasRefreshed: boolean;
}> {
  if (refreshLock) {
    const cache = readCacheFile();
    return {
      data: cache.data
        ? toActivityResponse(cache.data, cache.lastGlobalRefresh)
        : toActivityResponse(
            {
              contributions: [],
              latestCommit: null,
              fetchedAt: Date.now(),
              cacheYear: getCurrentYear(),
            },
            cache.lastGlobalRefresh,
          ),
      wasRefreshed: false,
    };
  }

  refreshLock = true;

  try {
    const cache = readCacheFile();
    const cooldownRemaining = getCooldownRemaining(cache.lastGlobalRefresh);

    if (cooldownRemaining > 0) {
      return {
        data: cache.data
          ? toActivityResponse(cache.data, cache.lastGlobalRefresh)
          : toActivityResponse(
              {
                contributions: [],
                latestCommit: null,
                fetchedAt: Date.now(),
                cacheYear: getCurrentYear(),
              },
              cache.lastGlobalRefresh,
            ),
        wasRefreshed: false,
      };
    }

    const data = await fetchGitHubActivityData();
    const lastGlobalRefresh = Date.now();

    writeCacheFile({
      lastGlobalRefresh,
      data,
    });

    return {
      data: toActivityResponse(data, lastGlobalRefresh),
      wasRefreshed: true,
    };
  } finally {
    refreshLock = false;
  }
}

export { REFRESH_COOLDOWN_MS };
