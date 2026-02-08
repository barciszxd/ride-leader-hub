import { Athlete } from '@/types/leaderboard';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { User } from 'lucide-react';
import { MarsIcon, VenusIcon, VenusAndMarsIcon } from '@/components/ui/gender-icons';

interface RidersOverviewProps {
  athletes: Athlete[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const RidersOverview = ({ athletes, open, onOpenChange }: RidersOverviewProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* Viewport height constraint ensures dialog fits on small screens */}
      <DialogContent className="sm:max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Fahrer</DialogTitle>
        </DialogHeader>
        {/* Scroll container allows overflow while keeping table within dialog bounds */}
        <div className="overflow-auto max-h-[calc(80vh-8rem)]">
          <table className="w-full">
            <thead>
              {/* Sticky header row remains visible during vertical scroll */}
              <tr className="border-b sticky top-0 bg-background z-20">
                <th className="text-left py-2 px-4 font-medium">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>Name</span>
                  </div>
                </th>
                <th className="text-left py-2 px-4 font-medium w-24">
                  <div className="flex items-center gap-2">
                    <VenusAndMarsIcon className="w-4 h-4" />
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