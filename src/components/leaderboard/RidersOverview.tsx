import { Athlete } from '@/types/leaderboard';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { User } from 'lucide-react';
import { MarsIcon, VenusIcon } from '@/components/ui/gender-icons';

interface RidersOverviewProps {
  athletes: Athlete[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const RidersOverview = ({ athletes, open, onOpenChange }: RidersOverviewProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Riders Overview</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-4 font-medium">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>Rider</span>
                  </div>
                </th>
                <th className="text-left py-2 px-4 font-medium w-24">
                  <div className="flex items-center gap-2">
                    <span>Gender</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {[...athletes]
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((athlete) => (
                <tr key={athlete.id} className="border-b">
                  <td className="py-2 px-4">
                    <a 
                      href={`https://strava.com/athletes/${athlete.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {athlete.name}
                    </a>
                  </td>
                  <td className="py-2 px-4">
                    {athlete.gender === 'M' ? (
                      <MarsIcon className="w-4 h-4" />
                    ) : (
                      <VenusIcon className="w-4 h-4" />
                    )}
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