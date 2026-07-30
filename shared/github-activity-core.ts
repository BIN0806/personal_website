export const GITHUB_USERNAME = "BIN0806";
export const REFRESH_COOLDOWN_MS = 60 * 60 * 1000;
export const CACHE_TTL_MS = 3 * 24 * 60 * 60 * 1000;

export type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

export type LatestCommit = {
  date: string;
  sha: string;
  repo: string;
  url: string;
};

export type ActivityData = {
  contributions: ContributionDay[];
  latestCommit: LatestCommit | null;
  fetchedAt: number;
  cacheYear: number;
};

export type ActivityResponse = ActivityData & {
  cooldownRemaining: number;
  cooldownUntil: number | null;
};

type GitHubContributionsResponse = {
  contributions: ContributionDay[];
};

type GitHubPushEvent = {
  type: string;
  created_at: string;
  repo: { name: string };
  payload: {
    head?: string;
    commits?: { sha: string }[];
  };
};

export function getCurrentYear() {
  return new Date().getFullYear();
}

export function formatCooldown(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map((value) => String(value).padStart(2, "0"))
    .join(":");
}

export function getCooldownRemaining(lastGlobalRefresh: number | null): number {
  if (!lastGlobalRefresh) return 0;
  return Math.max(0, REFRESH_COOLDOWN_MS - (Date.now() - lastGlobalRefresh));
}

export function getCooldownUntil(lastGlobalRefresh: number | null): number | null {
  if (!lastGlobalRefresh) return null;
  const remaining = getCooldownRemaining(lastGlobalRefresh);
  return remaining > 0 ? Date.now() + remaining : null;
}

export function isCacheFresh(data: ActivityData): boolean {
  if (data.cacheYear !== getCurrentYear()) return false;
  return Date.now() - data.fetchedAt < CACHE_TTL_MS;
}

export async function fetchGitHubActivityData(): Promise<ActivityData> {
  const year = getCurrentYear();
  const [contributionsRes, eventsRes] = await Promise.all([
    fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}`),
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=100`),
  ]);

  let contributions: ContributionDay[] = [];
  let latestCommit: LatestCommit | null = null;

  if (contributionsRes.ok) {
    const data: GitHubContributionsResponse = await contributionsRes.json();
    contributions = data.contributions;
  }

  if (eventsRes.ok) {
    const events: GitHubPushEvent[] = await eventsRes.json();
    const latestPush = events.find(
      (event) =>
        event.type === "PushEvent" &&
        new Date(event.created_at).getFullYear() === year &&
        (event.payload.head || event.payload.commits?.length),
    );

    if (latestPush) {
      const sha =
        latestPush.payload.head ??
        latestPush.payload.commits?.[latestPush.payload.commits.length - 1]?.sha ??
        "";
      const repoFullName = latestPush.repo.name;
      const repo = repoFullName.split("/")[1] ?? repoFullName;

      if (sha) {
        latestCommit = {
          date: latestPush.created_at,
          sha: sha.slice(0, 7),
          repo,
          url: `https://github.com/${repoFullName}/commit/${sha}`,
        };
      }
    }
  }

  return {
    contributions,
    latestCommit,
    fetchedAt: Date.now(),
    cacheYear: year,
  };
}

export function toActivityResponse(
  data: ActivityData,
  lastGlobalRefresh: number | null,
): ActivityResponse {
  const cooldownRemaining = getCooldownRemaining(lastGlobalRefresh);
  return {
    ...data,
    cooldownRemaining,
    cooldownUntil: getCooldownUntil(lastGlobalRefresh),
  };
}
