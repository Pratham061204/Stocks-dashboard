import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  value: string;
  subValue?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
}

export const SummaryCard = ({ title, value, subValue, icon: Icon, trend = 'neutral' }: SummaryCardProps) => {
  return (
    <div className="glass-card rounded-xl p-5 animate-fade-in">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-2xl font-semibold tracking-tight font-mono">{value}</p>
          {subValue && (
            <p className={cn(
              "text-sm font-medium font-mono",
              trend === 'up' && "text-profit",
              trend === 'down' && "text-loss",
              trend === 'neutral' && "text-muted-foreground"
            )}>
              {subValue}
            </p>
          )}
        </div>
        <div className={cn(
          "p-2.5 rounded-lg",
          trend === 'up' && "bg-success/10",
          trend === 'down' && "bg-destructive/10",
          trend === 'neutral' && "bg-primary/10"
        )}>
          <Icon className={cn(
            "w-5 h-5",
            trend === 'up' && "text-success",
            trend === 'down' && "text-destructive",
            trend === 'neutral' && "text-primary"
          )} />
        </div>
      </div>
    </div>
  );
};
