import { useMemo } from 'react';
import { Classification, FilterCategory, FilterGender } from '@/types/leaderboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Shirt, Medal, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ClassificationViewProps {
  data: Classification[];
  category: FilterCategory;
  gender: FilterGender;
  isLoading?: boolean;
}

export function ClassificationView({ data, category, gender, isLoading = false }: ClassificationViewProps) {
  const filteredData = useMemo(() => {
    let filtered = data;

    filtered = filtered.filter(rider => rider.gender === gender);

    // Sort by the selected category points
    return filtered.sort((a, b) => {
      const pointsA = category === 'sprint' ? a.total_sprint_points : a.total_climb_points;
      const pointsB = category === 'sprint' ? b.total_sprint_points : b.total_climb_points;
      return pointsB - pointsA;
    });
  }, [data, category, gender]);

  const getPositionIcon = (position: number) => {
    if (position === 1) {
      return <Shirt className={cn("w-5 h-5 [stroke-width:0]", category === 'sprint' ? "[fill:green]" : "[fill:red]")} />;
    }
  };

  const getPositionStyle = (position: number) => {
    if (position === 1) {
      if (category === 'sprint') {
        return 'bg-green-400/5 border-green-500';
      } else {
        return 'bg-[url("/PolkaDot.jpg")] bg-[length:10rem_10rem] border-red-500';
      }
    }
    return '';
  };

  const categoryTitle = category === 'sprint' ? 'Sprintwertung' : 'Bergwertung';
  const genderTitle = gender === 'M' ? 'Männer' : 'Frauen';

  // Loading skeleton component
  const SkeletonCard = ({ position }: { position: number }) => (
    <Card
      className={cn(
        'transition-all duration-200',
        getPositionStyle(position)
      )}
    >
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-8 h-8">
            {getPositionIcon(position) || (
              <span className="text-lg font-bold text-muted-foreground">
                {position}
              </span>
            )}
          </div>
          
          <div>
            <Skeleton className="h-6 w-32 mb-2" />
          </div>
        </div>

        <div className="text-right">
          <Skeleton className="h-8 w-12 mb-1" />
          <Skeleton className="h-4 w-10" />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground">{categoryTitle}</h2>
        <p className="text-muted-foreground">{genderTitle}</p>
      </div>

      <div className="flex items-center justify-between text-sm font-medium text-muted-foreground border-b pb-2">
        <span>Fahrer</span>
        <span>Punkte</span>
      </div>

      <div className="space-y-3">
        {isLoading ? (
          // Show skeleton cards while loading
          Array.from({ length: 8 }, (_, index) => (
            <SkeletonCard key={index} position={index + 1} />
          ))
        ) : (
          // Show actual data when loaded
          filteredData.map((rider, index) => {
            const position = index + 1;
            const points = category === 'sprint' ? rider.total_sprint_points : rider.total_climb_points;
            const counted = category === 'sprint' ? rider.counted_sprints : rider.counted_climbs;
            const completed = category === 'sprint' ? rider.completed_sprints : rider.completed_climbs;
            
            return (
              <Card
                key={rider.athlete_id}
                className={cn(
                  'transition-all duration-200 hover:shadow-md cursor-pointer',
                  getPositionStyle(position)
                )}
                onClick={() => window.open(`https://strava.com/athletes/${rider.athlete_id}`, '_blank')}
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8">
                      {getPositionIcon(position) || (
                        <span className="text-lg font-bold text-muted-foreground">
                          {position}
                        </span>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground">{rider.athlete_name}</h3>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      {points}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {counted}/{completed}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {!isLoading && filteredData.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">
              Keine Ergebnisse gefunden.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}