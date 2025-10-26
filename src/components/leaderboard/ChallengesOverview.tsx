import { Challenge } from '@/types/leaderboard';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Calendar, Zap, Mountain } from 'lucide-react';

interface ChallengesOverviewProps {
  challenges: Challenge[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ChallengesOverview = ({ challenges, open, onOpenChange }: ChallengesOverviewProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Challenges Overview</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-4 font-medium" style={{ width: '200px' }}>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Time Span</span>
                  </div>
                </th>
                <th className="text-left py-2 px-4 font-medium">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    <span>Sprint Segment</span>
                  </div>
                </th>
                <th className="text-left py-2 px-4 font-medium">
                  <div className="flex items-center gap-2">
                    <Mountain className="w-4 h-4" />
                    <span>Climb Segment</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {challenges.map((challenge) => (
                <tr key={challenge.id} className="border-b">
                  <td className="py-2 px-4">
                    {new Date(challenge.start_date).toLocaleDateString('en-GB', { 
                      day: 'numeric', 
                      month: 'short'
                    })} - {new Date(challenge.end_date).toLocaleDateString('en-GB', { 
                      day: 'numeric', 
                      month: 'short'
                    })}
                  </td>
                    <td className="py-2 px-4">
                      <a 
                        href={`https://strava.com/segments/${challenge.sprint_segment.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {challenge.sprint_segment.name}
                      </a>
                    </td>
                    <td className="py-2 px-4">
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