interface ProgressBarProps {
  progress: number;
  className?: string;
  testId?: string;
}

export default function ProgressBar({ progress, className = "", testId }: ProgressBarProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`} data-testid={testId}>
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
          style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
        />
      </div>
      <span className="text-sm font-semibold text-foreground font-mono min-w-[3ch]" data-testid={`${testId}-value`}>
        {progress}%
      </span>
    </div>
  );
}
