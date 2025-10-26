import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ClassificationView } from '@/components/leaderboard/ClassificationView';
import { ChallengeView } from '@/components/leaderboard/ChallengeView';
import { ChallengesOverview } from '@/components/leaderboard/ChallengesOverview';
import { RidersOverview } from '@/components/leaderboard/RidersOverview';
import { FilterToggle } from '@/components/leaderboard/FilterToggle';
import { SignUpButton } from '@/components/leaderboard/JoinButton';
import UserMenu from '@/components/leaderboard/UserMenu';
import { Challenge, Classification, ViewType, FilterCategory, FilterGender } from '@/types/leaderboard';
import { getChallenges, getClassification } from '@/lib/mockData';
import { api } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { Trophy, Target, Calendar, Users, Loader2, Zap, Mountain } from 'lucide-react';
import { MarsIcon, VenusIcon } from '@/components/ui/gender-icons';
import StravaLogo from '@/components/ui/strava-logo';

const Index = () => {
  const [view, setView] = useState<ViewType>('classification');
  const [category, setCategory] = useState<FilterCategory>('sprint');
  const [gender, setGender] = useState<FilterGender>('M');
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [classification, setClassification] = useState<Classification[]>([]);
  const [isLoadingClassification, setIsLoadingClassification] = useState(true);
  const [isLoadingChallenges, setIsLoadingChallenges] = useState(true);
  
  // Strava callback handling
  const [showStravaDialog, setShowStravaDialog] = useState(false);
  const [stravaDialogState, setStravaDialogState] = useState<'loading' | 'success' | 'error'>('loading');
  const [stravaMessage, setStravaMessage] = useState('');
  const [showChallengesOverview, setShowChallengesOverview] = useState(false);
  const [showRidersOverview, setShowRidersOverview] = useState(false);
  const { toast } = useToast();

  // Check for Strava callback on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const scope = urlParams.get('scope');
    
    if (code && scope) {
      // This is a Strava callback
      setShowStravaDialog(true);
      setStravaDialogState('loading');
      
      // Exchange the token
      const exchangeToken = async () => {
        try {
          const response = await api.exchangeTokenWithStrava(code, scope);
          
          if (response.success) {
            setStravaDialogState('success');
            const firstName = response.athlete?.firstname || 'there';
            // Save profile_medium in a cookie for 7 days
            const profileMedium = response.athlete?.profile_medium;
            if (profileMedium) {
              const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
              document.cookie = `profile_medium=${encodeURIComponent(profileMedium)}; expires=${expires}; path=/`;
            }
            if (response.athlete_created) {
              setStravaMessage(`Great to have you onboard, ${firstName}! Now go outside and ride!`);
            } else {
              setStravaMessage(`Hello, ${firstName}! You are already subscribed to the leaderboard. Now go outside and ride!`);
            }
          } else {
            setStravaDialogState('error');
            setStravaMessage(`We couldn't sign you to the leaderboard. ${response.message}`);
          }
        } catch (error) {
          setStravaDialogState('error');
          setStravaMessage('We couldn\'t sign you to the leaderboard. An unexpected error occurred.');
          console.error('Token exchange failed:', error);
        }
      };
      
      exchangeToken();
      
      // Clean up URL parameters
      const newUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, []);

  // Load initial data
  useEffect(() => {
    // Load challenges from API
    const loadData = async () => {
      try {
        setIsLoadingChallenges(true);
        setIsLoadingClassification(true);
        
        const challengesData = await getChallenges();
        setChallenges(challengesData);
        setIsLoadingChallenges(false);
        
        const classificationData = await getClassification();
        setClassification(classificationData);
        setIsLoadingClassification(false);
      } catch (error) {
        console.error('Failed to load challenges:', error);
        setIsLoadingChallenges(false);
        setIsLoadingClassification(false);
        // You might want to show an error message to the user here
      }
    };
    
    loadData();
  }, []);

  const activeChallenge = challenges.find(c => c.status === 'active');
  const totalRiders = classification.length;

  const handleStravaDialogClose = () => {
    setShowStravaDialog(false);
  };

  // Helper to get cookie value
  function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
  }

  const profileMediumCookie = getCookie('profile_medium');

  const handleLogout = () => {
    document.cookie = 'profile_medium=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.reload();
  };

  return (
    <>
      {/* Strava Authorization Dialog */}
      <Dialog open={showStravaDialog} onOpenChange={setShowStravaDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>STRAVA Connection</DialogTitle>
            <DialogDescription>
              {stravaDialogState === 'loading' && 'Connecting with STRAVA...'}
              {stravaDialogState === 'success' && 'Connection successful!'}
              {stravaDialogState === 'error' && 'Connection failed'}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-6 py-6">
            {stravaDialogState === 'loading' && (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Connecting with STRAVA...</span>
              </div>
            )}
            {(stravaDialogState === 'success' || stravaDialogState === 'error') && (
              <>
                <p className="text-center text-sm text-muted-foreground">
                  {stravaMessage}
                </p>
                <Button onClick={handleStravaDialogClose} className="w-full">
                  OK
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Challenges Overview Dialog */}
      <ChallengesOverview 
        challenges={challenges}
        open={showChallengesOverview}
        onOpenChange={setShowChallengesOverview}
      />

      <RidersOverview
        athletes={classification.map(c => ({ id: c.athlete_id, name: c.athlete_name, gender: c.gender }))}
        open={showRidersOverview}
        onOpenChange={setShowRidersOverview}
      />

      <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img 
                src="/CORA_Logo.jpg" 
                alt="CORA Logo" 
                className="object-contain"
              />
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                Leaderboard
              </h1>
            </div>
            <div className="shrink-0">
              {/* Show SignUpButton if no cookie, else show avatar menu */}
              {!profileMediumCookie ? (
                <SignUpButton />
              ) : (
                <UserMenu profileMediumUrl={decodeURIComponent(profileMediumCookie)} onLogout={handleLogout} />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div 
              className="flex items-center gap-2 cursor-pointer hover:opacity-80"
              onClick={() => setShowRidersOverview(true)}
            >
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                <strong className="text-foreground">{totalRiders}</strong> riders
              </span>
            </div>
            <div 
              className="flex items-center gap-2 cursor-pointer hover:opacity-80" 
              onClick={() => setShowChallengesOverview(true)}
            >
              <Target className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                <strong className="text-foreground">{challenges.length}</strong> challenges
              </span>
            </div>
            {activeChallenge && (
              <div className="flex items-center gap-2 col-span-2 sm:col-span-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Active: <strong className="text-foreground">{activeChallenge.name}</strong>
                </span>
                <Badge variant="default" className="text-xs">
                  Live
                </Badge>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Navigation Tabs */}
          <Tabs value={view} onValueChange={(value) => setView(value as ViewType)}>
            <div className="flex flex-row gap-4 items-center justify-between">
              <TabsList className="grid w-auto grid-cols-2">
                <TabsTrigger value="classification" className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 flex-shrink-0" />
                  <span className="hidden sm:inline">Classification</span>
                </TabsTrigger>
                <TabsTrigger value="challenges" className="flex items-center gap-2">
                  <Target className="w-4 h-4 flex-shrink-0" />
                  <span className="hidden sm:inline">Challenges</span>
                </TabsTrigger>
              </TabsList>

              {/* Filters */}
              <div className="flex gap-2 shrink-0">
                <FilterToggle
                  options={[
                    { value: 'sprint', label: 'Sprint', icon: Zap },
                    { value: 'climb', label: 'Climb', icon: Mountain },
                  ]}
                  value={category}
                  onChange={(value) => setCategory(value as FilterCategory)}
                />
                <FilterToggle
                  options={[
                    { value: 'M', label: 'Men', icon: MarsIcon },
                    { value: 'F', label: 'Women', icon: VenusIcon },
                  ]}
                  value={gender}
                  onChange={(value) => setGender(value as FilterGender)}
                />
              </div>
            </div>

            <TabsContent value="classification" className="mt-6">
              <ClassificationView
                data={classification}
                category={category}
                gender={gender}
                isLoading={isLoadingClassification}
              />
            </TabsContent>

            <TabsContent value="challenges" className="mt-6">
              <ChallengeView
                challenges={challenges}
                category={category}
                gender={gender}
                isLoading={isLoadingChallenges}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 CORA Leaderboard. Track your progress, compete with friends.</p>
          </div>
        </div>
      </footer>
      
      {/* Strava Logo */}
      <StravaLogo />
    </div>
    </>
  );
};

export default Index;
