import { cn } from '@/lib/utils';
import { Zap, Mountain, ExternalLink } from 'lucide-react';
import { Segment } from '@/types/leaderboard';

interface SegmentBadgeProps {
  segment: Segment;
  className?: string;
}

export function SegmentBadge({ segment, className }: SegmentBadgeProps) {
  const handleClick = () => {
    window.open(`https://www.strava.com/segments/${segment.id}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium duration-200 hover:opacity-80 cursor-pointer',
        segment.type === 'sprint' 
          ? 'bg-sprint text-sprint-foreground' 
          : 'bg-climb text-climb-foreground',
        className
      )}
    >
      {segment.type === 'sprint' ? (
        <Zap className="w-3 h-3" />
      ) : (
        <Mountain className="w-3 h-3" />
      )}
      <span className="max-w-32 truncate">{segment.type.charAt(0).toUpperCase() + segment.type.slice(1)}</span>
    </button>
  );
}