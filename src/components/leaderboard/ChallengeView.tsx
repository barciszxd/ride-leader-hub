import { useState, useMemo, useEffect } from 'react';
import { Challenge, Result, FilterCategory, FilterGender } from '@/types/leaderboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { SegmentBadge } from './SegmentBadge';
import { Trophy, Medal, Award, Calendar, MoveUpRight, ExternalLink, Ruler, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { api } from '@/lib/api';

interface ChallengeViewProps {
  challenges: Challenge[];
  category: FilterCategory;
  gender: FilterGender;
  isLoading?: boolean;
}

export function ChallengeView({ challenges, category, gender, isLoading = false }: ChallengeViewProps) {
  const [selectedChallengeId, setSelectedChallengeId] = useState<string>('');
  const [results, setResults] = useState<Result[]>([]);
  const [isLoadingResults, setIsLoadingResults] = useState(false);

  const selectedChallenge = challenges.find(c => c.id === selectedChallengeId);

  // Sorted copy of challenges (do not mutate original array)
  const sortedChallenges = useMemo(() => {
    return [...challenges].sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());
  }, [challenges]);

  // Auto-select active challenge when challenges load, fallback to challenge nearest to now
  useEffect(() => {
    if (sortedChallenges.length > 0 && !selectedChallengeId) {
      // First try to find an active challenge
      const activeChallenge = sortedChallenges.find(challenge => challenge.status === 'active');
      if (activeChallenge) {
        setSelectedChallengeId(activeChallenge.id);
      } else {
        // No active challenge — pick the one whose start_date is closest to now
        const now = Date.now();
        const nearest = sortedChallenges.reduce((best, c) => {
          const bestDiff = Math.abs(new Date(best.start_date).getTime() - now);
          const cDiff = Math.abs(new Date(c.start_date).getTime() - now);
          return cDiff < bestDiff ? c : best;
        }, sortedChallenges[0]);

        setSelectedChallengeId(nearest.id);
      }
    }
  }, [challenges, selectedChallengeId]);

  // Load results when challenge changes (fetch all results once)
  useEffect(() => {
    if (selectedChallengeId) {
      const loadResults = async () => {
        try {
          setIsLoadingResults(true);
          // Fetch all results for the challenge without filters
          const challengeResults = await api.getChallengeResults(
            selectedChallengeId,
            undefined, // No segment type filter
            undefined  // No gender filter
          );
          setResults(challengeResults);
        } catch (error) {
          console.error('Failed to load challenge results:', error);
          setResults([]);
        } finally {
          setIsLoadingResults(false);
        }
      };
      
      loadResults();
    }
  }, [selectedChallengeId]); // Only depend on challenge ID

  const filteredResults = useMemo(() => {
    let filtered = results;

    // Filter by segment type (sprint/climb)
    filtered = filtered.filter(result => result.segment_type === category);

    // Filter by gender
    filtered = filtered.filter(result => result.athlete_gender === gender);

    // Sort by position
    return filtered.sort((a, b) => a.position - b.position);
  }, [results, category, gender]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return minutes > 0 
      ? `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
      : `${seconds}s`;
  };

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Award className="w-4 h-4 text-gold" />;
      case 2:
        return <Award className="w-4 h-4 text-silver" />;
      case 3:
        return <Award className="w-4 h-4 text-bronze" />;
      default:
        return null;
    }
  };

  const getPositionStyle = (position: number) => {
    switch (position) {
      // case 1:
      //   return 'bg-gradient-to-r from-gold/10 to-gold/5 border-gold/20';
      // case 2:
      //   return 'bg-gradient-to-r from-silver/10 to-silver/5 border-silver/20';
      // case 3:
      //   return 'bg-gradient-to-r from-bronze/10 to-bronze/5 border-bronze/20';
      default:
        return 'bg-card border-border';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC', // Ensure UTC is used
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Herausforderung</h2>
          </div>
          
          <Skeleton className="h-10 w-full sm:w-64" />
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div>
                <Skeleton className="h-6 w-48 mb-2" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-20" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm font-medium text-muted-foreground border-b pb-2">
                <span>Fahrer</span>
                <span>Zeit</span>
              </div>
              
              {Array.from({ length: 6 }, (_, index) => (
                <Card key={index} className="transition-all duration-200">
                  <CardContent className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-6 h-6">
                        <span className="text-sm font-bold text-muted-foreground">
                          {index + 1}
                        </span>
                      </div>
                      
                      <div>
                        <Skeleton className="h-4 w-24 mb-1" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>

                    <div className="text-right">
                      <Skeleton className="h-4 w-16 mb-1" />
                      <Skeleton className="h-3 w-12" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (challenges.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground">No challenges available.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground">Herausforderung</h2>
      </div>

      <div className="flex items-center justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const idx = sortedChallenges.findIndex(c => c.id === selectedChallengeId);
            if (idx > 0) setSelectedChallengeId(sortedChallenges[idx - 1].id);
          }}
          disabled={sortedChallenges.findIndex(c => c.id === selectedChallengeId) <= 0}
          aria-label="Vorherige Herausforderung"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <Select value={selectedChallengeId} onValueChange={setSelectedChallengeId}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Herausforderung auswählen" />
          </SelectTrigger>
          <SelectContent>
            {sortedChallenges.map((challenge) => (
              <SelectItem key={challenge.id} value={challenge.id}>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <div className="text-xs text-muted-foreground">
                      {formatDate(challenge.start_date)} - {formatDate(challenge.end_date)}
                    </div>
                    {challenge.status === 'active' && (
                      <Play className="w-4 h-4 text-primary" />
                    )}
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const idx = sortedChallenges.findIndex(c => c.id === selectedChallengeId);
            if (idx >= 0 && idx < sortedChallenges.length - 1) setSelectedChallengeId(sortedChallenges[idx + 1].id);
          }}
          disabled={sortedChallenges.findIndex(c => c.id === selectedChallengeId) === -1 || sortedChallenges.findIndex(c => c.id === selectedChallengeId) >= sortedChallenges.length - 1}
          aria-label="Nächste Herausforderung"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {selectedChallenge && (
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <a 
                    href={`https://strava.com/segments/${(category === 'sprint' ? selectedChallenge.sprint_segment : selectedChallenge.climb_segment).id}`} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1">
                    {(category === 'sprint' ? selectedChallenge.sprint_segment.name : selectedChallenge.climb_segment.name) || 'Unnamed Segment'}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </CardTitle>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <SegmentBadge segment={category === 'sprint' ? selectedChallenge.sprint_segment : selectedChallenge.climb_segment} />
                  <div className="flex items-center gap-1">
                    <Ruler className="w-4 h-4" />
                    {((category === 'sprint' ? selectedChallenge.sprint_segment.distance : selectedChallenge.climb_segment.distance) / 1000).toFixed(2)}km
                    <MoveUpRight className="w-4 h-4 ml-4" />
                    {category === 'sprint' ? selectedChallenge.sprint_segment.elevation_gain : selectedChallenge.climb_segment.elevation_gain}m
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm font-medium text-muted-foreground border-b pb-2">
                <span>Fahrer</span>
                <span>Zeit</span>
              </div>
              
              {isLoadingResults ? (
                // Show skeleton cards while loading results
                Array.from({ length: 6 }, (_, index) => (
                  <Card key={index} className="transition-all duration-200">
                    <CardContent className="flex items-center justify-between p-3">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-6 h-6">
                          <span className="text-sm font-bold text-muted-foreground">
                            {index + 1}
                          </span>
                        </div>
                        
                        <div>
                          <Skeleton className="h-4 w-24 mb-1" />
                          <Skeleton className="h-3 w-16" />
                        </div>
                      </div>

                      <div className="text-right">
                        <Skeleton className="h-4 w-16 mb-1" />
                        <Skeleton className="h-3 w-12" />
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                filteredResults.map((result) => (
                  <Card
                    key={result.id}
                    className={cn(
                      'transition-all duration-200 hover:shadow-md cursor-pointer',
                      getPositionStyle(result.position)
                    )}
                    onClick={() => window.open(`https://strava.com/activities/${result.activity_id}`, '_blank')}
                  >
                    <CardContent className="flex items-center justify-between p-3">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-6 h-6">
                          {getPositionIcon(result.position) || (
                            <span className="text-sm font-bold text-muted-foreground">
                              {result.position}
                            </span>
                          )}
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-foreground">
                            {result.athlete_name}
                          </h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <Badge variant="outline" className="text-xs">
                              {result.points} pkt
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-mono font-semibold text-foreground">
                          {formatTime(result.time)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(result.recorded_at).toLocaleDateString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
              
              {!isLoadingResults && filteredResults.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  Keine Ergebnisse gefunden.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}