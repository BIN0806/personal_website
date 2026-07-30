import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  canRefreshActivity,
  formatCooldown,
  getGitHubActivity,
  refreshGitHubActivity,
  resolveCooldownRemaining,
  type ActivityResponse,
  type ContributionDay,
} from "@/lib/github-activity";

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const DAY_LABELS: Record<number, string> = {
  1: "MON",
  3: "WED",
  5: "FRI",
};

const LEVEL_CLASSES = [
  "activity-level-0",
  "activity-level-1",
  "activity-level-2",
  "activity-level-3",
  "activity-level-4",
];

type CalendarDay = ContributionDay & {
  inYear: boolean;
  isFuture: boolean;
};

type ActivitySectionProps = {
  embedded?: boolean;
};

function formatDateLocal(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function buildWeeksForFullYear(contributions: ContributionDay[]) {
  const byDate = new Map(contributions.map((day) => [day.date, day]));
  const year = new Date().getFullYear();
  const today = formatDateLocal(new Date());
  const start = new Date(year, 0, 1);
  start.setDate(start.getDate() - start.getDay());
  const end = new Date(year, 11, 31);
  end.setDate(end.getDate() + (6 - end.getDay()));

  const weeks: CalendarDay[][] = [];
  const current = new Date(start);

  while (current <= end) {
    const week: CalendarDay[] = [];
    for (let i = 0; i < 7; i++) {
      const dateStr = formatDateLocal(current);
      const inYear = current.getFullYear() === year;
      const isFuture = inYear && dateStr > today;
      const contribution = byDate.get(dateStr);

      week.push({
        date: dateStr,
        count: inYear && !isFuture ? contribution?.count ?? 0 : 0,
        level: inYear && !isFuture ? contribution?.level ?? 0 : 0,
        inYear,
        isFuture,
      });
      current.setDate(current.getDate() + 1);
    }
    weeks.push(week);
  }

  return weeks;
}

function getAllMonthLabels(weeks: CalendarDay[][]) {
  const year = new Date().getFullYear();
  const labels: { month: string; column: number }[] = [];

  for (let month = 0; month < 12; month++) {
    const firstOfMonth = formatDateLocal(new Date(year, month, 1));

    for (let column = 0; column < weeks.length; column++) {
      if (weeks[column].some((day) => day.date === firstOfMonth)) {
        labels.push({ month: MONTHS[month], column: column + 1 });
        break;
      }
    }
  }

  return labels;
}

function formatUpdatedDate(dateString: string) {
  const date = new Date(dateString);
  const month = MONTHS[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${month} ${day}, ${year} at ${time}`;
}

function formatContributionTooltip(count: number, dateStr: string) {
  const date = new Date(`${dateStr}T12:00:00`);
  const formatted = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (count === 0) {
    return `No contributions on ${formatted}`;
  }

  return `${count} contribution${count === 1 ? "" : "s"} on ${formatted}`;
}

function getCellClass(day: CalendarDay) {
  if (!day.inYear) return "activity-outside-year";
  if (day.isFuture) return "activity-future";
  return LEVEL_CLASSES[Math.min(day.level, 4)];
}

export default function ActivitySection({ embedded = false }: ActivitySectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [lastUpdatedAt, setLastUpdatedAt] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null);
  const [hoveredDay, setHoveredDay] = useState<CalendarDay | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const applyActivityData = useCallback((data: ActivityResponse) => {
    setContributions(data.contributions);
    setLastUpdatedAt(data.fetchedAt);
    setCooldownUntil(data.cooldownUntil);
    setCooldownRemaining(resolveCooldownRemaining(data.cooldownRemaining, data.cooldownUntil));
  }, []);

  const syncActivity = useCallback(async () => {
    try {
      const data = await getGitHubActivity();
      applyActivityData(data);
    } catch {
      // keep current view on transient sync errors
    }
  }, [applyActivityData]);

  useEffect(() => {
    async function loadActivity() {
      try {
        await syncActivity();
      } finally {
        setIsLoading(false);
      }
    }

    loadActivity();
  }, [syncActivity]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCooldownRemaining((current) => {
        if (cooldownUntil) {
          return Math.max(0, cooldownUntil - Date.now());
        }
        return Math.max(0, current - 1000);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [cooldownUntil]);

  useEffect(() => {
    const interval = setInterval(() => {
      syncActivity();
    }, 5000);

    return () => clearInterval(interval);
  }, [syncActivity]);

  const handleRefresh = async () => {
    if (!canRefreshActivity(cooldownRemaining) || isRefreshing) return;

    setIsRefreshing(true);
    try {
      const data = await refreshGitHubActivity();
      applyActivityData(data);
    } finally {
      setIsRefreshing(false);
    }
  };

  const weeks = useMemo(() => buildWeeksForFullYear(contributions), [contributions]);
  const monthLabels = useMemo(() => getAllMonthLabels(weeks), [weeks]);
  const refreshDisabled = isRefreshing || cooldownRemaining > 0;

  const handleCellMouseEnter = (day: CalendarDay, event: React.MouseEvent<HTMLDivElement>) => {
    if (!day.inYear || day.isFuture) return;
    setHoveredDay(day);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  const handleCellMouseMove = (day: CalendarDay, event: React.MouseEvent<HTMLDivElement>) => {
    if (!day.inYear || day.isFuture) return;
    setHoveredDay(day);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  const handleCellMouseLeave = () => {
    setHoveredDay(null);
  };

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: embedded ? 0.3 : 0 }}
      className={embedded ? "w-full mx-auto pt-8" : "max-w-4xl mx-auto"}
      ref={ref}
    >
      <div className={`flex items-center justify-between gap-4 ${embedded ? "mb-5" : "mb-8"}`}>
        <h2 className={embedded ? "text-3xl md:text-4xl font-bold text-foreground" : "text-4xl md:text-5xl font-bold text-foreground"}>
          Coding Activity
        </h2>
        <div className="flex items-center gap-3">
          {cooldownRemaining > 0 && (
            <span
              className={`${embedded ? "text-sm sm:text-base" : "text-xs sm:text-sm"} text-muted-foreground tabular-nums min-w-[4.75rem] text-right font-mono`}
              data-testid="activity-refresh-timer"
            >
              {formatCooldown(cooldownRemaining)}
            </span>
          )}
          <button
            onClick={handleRefresh}
            disabled={refreshDisabled}
            className={`inline-flex items-center gap-2 rounded-lg border border-border font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
              embedded ? "px-3.5 py-2.5 text-sm sm:text-base" : "px-3 py-2 text-xs sm:text-sm"
            }`}
            data-testid="button-refresh-activity"
            title={
              cooldownRemaining > 0
                ? `Refresh available in ${formatCooldown(cooldownRemaining)}`
                : "Refresh GitHub activity"
            }
          >
            <RefreshCw className={`${embedded ? "w-5 h-5" : "w-4 h-4"} ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      <div className={`bg-card border border-border rounded-2xl ${embedded ? "p-5 md:p-6" : "p-4 md:p-5"} ${embedded ? "" : "vintage-card-hover"}`}>
        {isLoading ? (
          <div className={`${embedded ? "h-32 text-base" : "h-28 text-sm"} flex items-center justify-center text-muted-foreground`}>
            Loading activity...
          </div>
        ) : (
          <div className="flex flex-col items-center w-full relative">
            {hoveredDay && (
              <div
                className="activity-tooltip"
                style={{
                  left: tooltipPosition.x,
                  top: tooltipPosition.y - 12,
                }}
                role="tooltip"
              >
                {formatContributionTooltip(hoveredDay.count, hoveredDay.date)}
              </div>
            )}

            <div
              className={`activity-calendar ${embedded ? "activity-calendar-embedded" : ""}`}
              style={{ "--activity-week-count": weeks.length } as React.CSSProperties}
            >
              <div className={`grid gap-x-1.5 w-full items-stretch ${embedded ? "grid-cols-[2rem_1fr]" : "grid-cols-[1.75rem_1fr]"}`}>
                <div />
                <div
                  className="activity-months"
                  style={{ gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))` }}
                >
                  {monthLabels.map(({ month, column }) => (
                    <span
                      key={month}
                      className="activity-month-label"
                      style={{ gridColumn: column }}
                    >
                      {month}
                    </span>
                  ))}
                </div>

                <div className="activity-day-labels">
                  {Array.from({ length: 7 }).map((_, rowIndex) => (
                    <span key={rowIndex} className="activity-day-label">
                      {DAY_LABELS[rowIndex] ?? ""}
                    </span>
                  ))}
                </div>

                <div
                  className="activity-grid"
                  style={{
                    gridTemplateRows: "repeat(7, minmax(0, 1fr))",
                    gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))`,
                  }}
                >
                  {weeks.flatMap((week, weekIndex) =>
                    week.map((day) => (
                      <div
                        key={`${weekIndex}-${day.date}`}
                        onMouseEnter={(event) => handleCellMouseEnter(day, event)}
                        onMouseMove={(event) => handleCellMouseMove(day, event)}
                        onMouseLeave={handleCellMouseLeave}
                        className={`activity-cell ${getCellClass(day)} ${
                          day.inYear && !day.isFuture ? "activity-cell-interactive" : ""
                        }`}
                        data-testid={`activity-day-${day.date}`}
                        aria-label={
                          day.inYear && !day.isFuture
                            ? formatContributionTooltip(day.count, day.date)
                            : undefined
                        }
                      />
                    ))
                  )}
                </div>
              </div>
            </div>

            {lastUpdatedAt && (
              <p className={`mt-4 text-muted-foreground text-center max-w-lg ${embedded ? "text-sm" : "text-xs"}`}>
                Last Updated at {formatUpdatedDate(new Date(lastUpdatedAt).toISOString())}
              </p>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );

  if (embedded) {
    return <div id="activity">{content}</div>;
  }

  return (
    <section className="pb-24 lg:pb-32 bg-background" id="activity">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">{content}</div>
    </section>
  );
}
