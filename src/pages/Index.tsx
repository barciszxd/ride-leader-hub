import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ClassificationView } from '@/components/leaderboard/ClassificationView';
import { ChallengeView } from '@/components/leaderboard/ChallengeView';
import { FilterToggle } from '@/components/leaderboard/FilterToggle';
import { JoinButton } from '@/components/leaderboard/JoinButton';
import { Challenge, Classification, ViewType, FilterCategory, FilterGender } from '@/types/leaderboard';
import { getChallenges, mockClassification } from '@/lib/mockData';
import { Trophy, Target, Calendar, Users } from 'lucide-react';

const Index = () => {
  const [view, setView] = useState<ViewType>('classification');
  const [category, setCategory] = useState<FilterCategory>('sprint');
  const [gender, setGender] = useState<FilterGender>('all');
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [classification, setClassification] = useState<Classification[]>([]);

  // Load initial data
  useEffect(() => {
    // Load challenges from API
    const loadData = async () => {
      try {
        const challengesData = await getChallenges();
        setChallenges(challengesData);
        setClassification(mockClassification);
      } catch (error) {
        console.error('Failed to load challenges:', error);
        // You might want to show an error message to the user here
      }
    };
    
    loadData();
  }, []);

  const activeChallenge = challenges.find(c => c.status === 'active');
  const totalRiders = classification.length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                Cycling Club Leaderboard
              </h1>
              <p className="text-muted-foreground mt-1">
                Track your performance across sprint and climb challenges
              </p>
            </div>
            <JoinButton />
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                <strong className="text-foreground">{totalRiders}</strong> riders
              </span>
            </div>
            <div className="flex items-center gap-2">
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
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <TabsList className="grid w-full sm:w-auto grid-cols-2">
                <TabsTrigger value="classification" className="flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  General Classification
                </TabsTrigger>
                <TabsTrigger value="challenges" className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Individual Challenges
                </TabsTrigger>
              </TabsList>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <FilterToggle
                  options={[
                    { value: 'sprint', label: 'Sprint' },
                    { value: 'climb', label: 'Climb' },
                  ]}
                  value={category}
                  onChange={(value) => setCategory(value as FilterCategory)}
                />
                <FilterToggle
                  options={[
                    { value: 'all', label: 'All' },
                    { value: 'M', label: 'Men' },
                    { value: 'F', label: 'Women' },
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
              />
            </TabsContent>

            <TabsContent value="challenges" className="mt-6">
              <ChallengeView
                challenges={challenges}
                category={category}
                gender={gender}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 Cycling Club Leaderboard. Track your progress, compete with friends.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
