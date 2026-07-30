import {
  type ActivityResponse,
  fetchGitHubActivityData,
  getCurrentYear,
  getCooldownRemaining,
  isCacheFresh,
  toActivityResponse,
} from "@shared/github-activity-core";

type GlobalActivityCache = {
  lastGlobalRefresh: number | null;
  data: ActivityResponse | null;
};

declare global {
  var __githubActivityCache: GlobalActivityCache | undefined;
  var __githubActivityRefreshLock: boolean | undefined;
}

function getMemoryCache(): GlobalActivityCache {
  if (!globalThis.__githubActivityCache) {
    globalThis.__githubActivityCache = { lastGlobalRefresh: null, data: null };
  }
  return globalThis.__githubActivityCache;
}

function normalizeCache(data: ActivityResponse): ActivityResponse {
  if (data.cacheYear !== getCurrentYear()) {
    return toActivityResponse(
      {
        contributions: [],
        latestCommit: null,
        fetchedAt: Date.now(),
        cacheYear: getCurrentYear(),
      },
      getMemoryCache().lastGlobalRefresh,
    );
  }
  return data;
}

async function getActivity(): Promise<ActivityResponse> {
  const cache = getMemoryCache();
  const normalized = cache.data ? normalizeCache(cache.data) : null;

  if (normalized && isCacheFresh(normalized)) {
    return toActivityResponse(normalized, cache.lastGlobalRefresh);
  }

  const data = await fetchGitHubActivityData();
  const response = toActivityResponse(data, cache.lastGlobalRefresh);
  cache.data = response;
  return response;
}

async function refreshActivity(): Promise<{ data: ActivityResponse; wasRefreshed: boolean }> {
  if (globalThis.__githubActivityRefreshLock) {
    const cache = getMemoryCache();
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

  globalThis.__githubActivityRefreshLock = true;

  try {
    const cache = getMemoryCache();
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
    cache.lastGlobalRefresh = Date.now();
    const response = toActivityResponse(data, cache.lastGlobalRefresh);
    cache.data = response;

    return {
      data: response,
      wasRefreshed: true,
    };
  } finally {
    globalThis.__githubActivityRefreshLock = false;
  }
}

const corsHeaders = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default async (request: Request) => {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    const url = new URL(request.url);
    const isRefresh = request.method === "POST" || url.pathname.endsWith("/refresh");

    if (isRefresh) {
      const { data, wasRefreshed } = await refreshActivity();
      return new Response(JSON.stringify(data), {
        status: wasRefreshed ? 200 : 429,
        headers: corsHeaders,
      });
    }

    const payload = await getActivity();
    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: corsHeaders,
    });
  } catch {
    return new Response(JSON.stringify({ message: "Failed to fetch GitHub activity" }), {
      status: 500,
      headers: corsHeaders,
    });
  }
};
