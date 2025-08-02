import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { UserPlus } from 'lucide-react';

export function JoinButton() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleStravaConnect = async () => {
    setLoading(true);
    try {
      // Simulate STRAVA OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Successfully connected!',
        description: 'Your STRAVA account has been linked to the leaderboard.',
      });
      
      setOpen(false);
    } catch (error) {
      toast({
        title: 'Connection failed',
        description: 'Failed to connect to STRAVA. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <UserPlus className="mr-2 h-4 w-4" />
          Join Leaderboard
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect with STRAVA</DialogTitle>
          <DialogDescription>
            Connect your STRAVA account to join the leaderboard and compete in our cycling challenges.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-6 py-6">
          <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/30">
            <span className="text-xs text-muted-foreground text-center">STRAVA<br/>LOGO</span>
          </div>
          <Button 
            onClick={handleStravaConnect} 
            disabled={loading} 
            className="w-full bg-[#fc4c02] hover:bg-[#e84402] text-white"
          >
            {loading ? 'Connecting...' : 'Connect with STRAVA'}
          </Button>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="w-full"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}