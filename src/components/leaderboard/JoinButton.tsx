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
    window.location.href = `http://www.strava.com/oauth/authorize?client_id=127158&response_type=code&redirect_uri=${window.location.origin}&approval_prompt=force&scope=read,activity:read`;
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
          <DialogTitle>Join Leaderboard</DialogTitle>
          <DialogDescription>
            Sign up with your STRAVA account to join the leaderboard and compete in our cycling challenges.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-6 py-6">
          <Button 
            onClick={handleStravaConnect} 
            disabled={loading} 
            className="p-0 border-0 bg-transparent hover:bg-transparent disabled:bg-[#fc4c02] disabled:opacity-80"
            style={{ width: '237px', height: '48px' }}
          >
            {loading ? (
              <div className="w-full h-full bg-[#fc4c02] rounded-md flex items-center justify-center text-white font-medium">
                Connecting...
              </div>
            ) : (
              <img 
                src="/btn_strava_connect_with_orange.svg" 
                alt="Connect with STRAVA" 
                className="w-full h-full hover:opacity-90 transition-opacity"
              />
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}