import {
  type ActivityData,
  type ActivityResponse,
  fetchGitHubActivityData,
  REFRESH_COOLDOWN_MS,
  toActivityResponse,
} from "@shared/github-activity-core";

export type {
  ActivityResponse,
  ContributionDay,
  LatestCommit,
} from "@shared/github-activity-core";
export { formatCooldown, REFRESH_COOLDOWN_MS } from "@shared/github-activity-core";

const LOCAL_CACHE_KEY = "github-activity-local-cache";
const LOCAL_COOLDOWN_UNTIL_KEY = "github-activity-cooldown-until";

function readLocalCache(): ActivityResponse | null {
  try {
    const raw = localStorage.getItem(LOCAL_CACHE_KEY);
    return raw ? (JSON.parse(raw) as ActivityResponse) : null;
  } catch {
    return null;
  }
}

function writeLocalCache(data: ActivityResponse) {
  localStorage.setItem(LOCAL_CACHE_KEY, JSON.stringify(data));
}

function getLocalCooldownUntil(): number | null {
  const raw = localStorage.getItem(LOCAL_COOLDOWN_UNTIL_KEY);
  if (!raw) return null;
  const until = parseInt(raw, 10);
  return until > Date.now() ? until : null;
}

function setLocalCooldownUntil(until: number) {
  localStorage.setItem(LOCAL_COOLDOWN_UNTIL_KEY, String(until));
}

function getLocalCooldownRemaining(): number {
  const until = getLocalCooldownUntil();
  if (!until) return 0;
  return Math.max(0, until - Date.now());
}

function withLocalCooldown(data: ActivityData): ActivityResponse {
  const until = getLocalCooldownUntil();
  const lastGlobalRefresh = until ? until - REFRESH_COOLDOWN_MS : null;
  return toActivityResponse(data, lastGlobalRefresh);
}

async function parseResponse(res: Response): Promise<ActivityResponse | null> {
  if (!res.ok && res.status !== 429) return null;
  const data: ActivityResponse = await res.json();

  if (data.cooldownUntil) {
    setLocalCooldownUntil(data.cooldownUntil);
  } else {
    localStorage.removeItem(LOCAL_COOLDOWN_UNTIL_KEY);
  }

  writeLocalCache(data);
  return data;
}

async function fetchFromApi(path: string, options?: RequestInit): Promise<ActivityResponse | null> {
  try {
    const res = await fetch(path, options);
    return await parseResponse(res);
  } catch {
    return null;
  }
}

async function fetchFallbackActivity(): Promise<ActivityResponse> {
  const cached = readLocalCache();
  if (cached && cached.contributions.length > 0) {
    const remaining = getLocalCooldownRemaining();
    if (remaining > 0) {
      return {
        ...cached,
        cooldownRemaining: remaining,
        cooldownUntil: getLocalCooldownUntil(),
      };
    }
  }

  const data = await fetchGitHubActivityData();
  const response = withLocalCooldown(data);
  writeLocalCache(response);
  return response;
}

async function refreshFallbackActivity(): Promise<ActivityResponse> {
  const remaining = getLocalCooldownRemaining();
  const cached = readLocalCache();

  if (remaining > 0 && cached) {
    return {
      ...cached,
      cooldownRemaining: remaining,
      cooldownUntil: getLocalCooldownUntil(),
    };
  }

  const data = await fetchGitHubActivityData();
  const until = Date.now() + REFRESH_COOLDOWN_MS;
  setLocalCooldownUntil(until);

  const response: ActivityResponse = {
    ...data,
    cooldownRemaining: REFRESH_COOLDOWN_MS,
    cooldownUntil: until,
  };

  writeLocalCache(response);
  return response;
}

export async function getGitHubActivity(): Promise<ActivityResponse> {
  const apiData = await fetchFromApi("/api/github/activity");
  if (apiData) return apiData;
  return fetchFallbackActivity();
}

export async function refreshGitHubActivity(): Promise<ActivityResponse> {
  const apiData = await fetchFromApi("/api/github/activity/refresh", { method: "POST" });
  if (apiData) return apiData;
  return refreshFallbackActivity();
}

export function canRefreshActivity(cooldownRemaining: number): boolean {
  return cooldownRemaining <= 0;
}

export function resolveCooldownRemaining(
  cooldownRemaining: number,
  cooldownUntil: number | null,
): number {
  if (cooldownUntil) {
    return Math.max(0, cooldownUntil - Date.now());
  }
  return Math.max(0, cooldownRemaining);
}
