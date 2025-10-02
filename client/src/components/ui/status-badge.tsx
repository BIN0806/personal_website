interface StatusBadgeProps {
  status: string;
  className?: string;
  testId?: string;
}

export default function StatusBadge({ status, className = "", testId }: StatusBadgeProps) {
  const getStatusDisplay = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return { text: "Active", dotColor: "bg-accent" };
      case "scheduled":
        return { text: "Scheduled", dotColor: "bg-primary" };
      case "paused":
        return { text: "Paused", dotColor: "bg-muted-foreground" };
      case "completed":
        return { text: "Completed", dotColor: "bg-secondary" };
      case "draft":
        return { text: "Draft", dotColor: "bg-muted-foreground" };
      default:
        return { text: status, dotColor: "bg-muted-foreground" };
    }
  };

  const statusDisplay = getStatusDisplay(status);

  return (
    <span className={`status-badge ${className}`} data-testid={testId}>
      <span className={`w-1.5 h-1.5 ${statusDisplay.dotColor} rounded-full`}></span>
      {statusDisplay.text}
    </span>
  );
}
