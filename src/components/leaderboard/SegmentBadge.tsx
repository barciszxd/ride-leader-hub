import { cn } from '@/lib/utils';
import { Zap, Mountain } from 'lucide-react';

interface SegmentBadgeProps {
  type: 'sprint' | 'climb';
  className?: string;
}

export function SegmentBadge({ type, className }: SegmentBadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
        type === 'sprint' 
          ? 'bg-sprint text-sprint-foreground' 
          : 'bg-climb text-climb-foreground',
        className
      )}
    >
      {type === 'sprint' ? (
        <Zap className="w-3 h-3" />
      ) : (
        <Mountain className="w-3 h-3" />
      )}
      {type === 'sprint' ? 'Sprint' : 'Climb'}
    </div>
  );
}