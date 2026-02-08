import { Challenge } from '@/types/leaderboard';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Calendar, Zap, Mountain } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ChallengesOverviewProps {
  challenges: Challenge[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ChallengesOverview = ({ challenges, open, onOpenChange }: ChallengesOverviewProps) => {
  const isMobile = useIsMobile();

  // Format date range based on viewport size
  const formatDateRange = (startDate: string, endDate: string) => {
    if (isMobile) {
      // Mobile: compact format without trailing periods (14.05-28.05)
      const start = new Date(startDate).toLocaleDateString('de-DE', { 
        day: 'numeric', 
        month: '2-digit'
      }).replace(/\.$/, ''); // Remove trailing period
      const end = new Date(endDate).toLocaleDateString('de-DE', { 
        day: 'numeric', 
        month: '2-digit'
      }).replace(/\.$/, ''); // Remove trailing period
      return `${start}-${end}`;
    } else {
      // Desktop: descriptive format with month names (14. Mai - 28. Mai)
      const start = new Date(startDate).toLocaleDateString('de-DE', { 
        day: 'numeric', 
        month: 'short'
      });
      const end = new Date(endDate).toLocaleDateString('de-DE', { 
        day: 'numeric', 
        month: 'short'
      });
      return `${start} - ${end}`;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* Viewport height constraint ensures dialog fits on small screens */}
      <DialogContent className="sm:max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Herausforderungen</DialogTitle>
        </DialogHeader>
        {/* Scroll container allows overflow while keeping table within dialog bounds */}
        <div className="overflow-auto max-h-[calc(80vh-8rem)]">
          <table className="w-full">
            <thead>
              {/* Sticky header row remains visible during vertical scroll */}
              <tr className="border-b sticky top-0 bg-background z-20">
                {/* Sticky date column header at intersection - highest z-index for proper layering */}
                <th className="text-left py-2 px-4 font-medium sticky left-0 bg-background z-30" style={{ minWidth: '120px', width: '170px' }}>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Datum</span>
                  </div>
                </th>
                <th className="text-left py-2 px-4 font-medium">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    <span>Sprint</span>
                  </div>
                </th>
                <th className="text-left py-2 px-4 font-medium">
                  <div className="flex items-center gap-2">
                    <Mountain className="w-4 h-4" />
                    <span>Berg</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {challenges.map((challenge) => (
                <tr key={challenge.id} className="border-b">
                  {/* Sticky date cell remains visible during horizontal scroll */}
                  <td className="py-2 px-4 sticky left-0 bg-background z-10">
                    {formatDateRange(challenge.start_date, challenge.end_date)}
                  </td>
                    <td className="py-2 px-4 whitespace-nowrap">
                      <a 
                        href={`https://strava.com/segments/${challenge.sprint_segment.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {challenge.sprint_segment.name}
                      </a>
                    </td>
                    <td className="py-2 px-4 whitespace-nowrap">
                      <a 
                        href={`https://strava.com/segments/${challenge.climb_segment.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {challenge.climb_segment.name}
                      </a>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
};