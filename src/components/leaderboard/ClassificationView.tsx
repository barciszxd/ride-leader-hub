import { useMemo } from 'react';
import { Classification, FilterCategory, FilterGender } from '@/types/leaderboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ClassificationViewProps {
  data: Classification[];
  category: FilterCategory;
  gender: FilterGender;
}

export function ClassificationView({ data, category, gender }: ClassificationViewProps) {
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
    switch (position) {
      case 1:
        return <Trophy className="w-5 h-5 text-gold" />;
      case 2:
        return <Medal className="w-5 h-5 text-silver" />;
      case 3:
        return <Award className="w-5 h-5 text-bronze" />;
      default:
        return null;
    }
  };

  const getPositionStyle = (position: number) => {
    switch (position) {
      case 1:
        return 'bg-gradient-to-r from-gold/10 to-gold/5 border-gold/20';
      case 2:
        return 'bg-gradient-to-r from-silver/10 to-silver/5 border-silver/20';
      case 3:
        return 'bg-gradient-to-r from-bronze/10 to-bronze/5 border-bronze/20';
      default:
        return 'bg-card border-border';
    }
  };

  const categoryTitle = category === 'sprint' ? 'Sprint Classification' : 'Climb Classification';
  const genderTitle = gender === 'M' ? 'Men' : 'Women';

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground">{categoryTitle}</h2>
        <p className="text-muted-foreground">{genderTitle} Standings</p>
      </div>

      <div className="space-y-3">
        {filteredData.map((rider, index) => {
          const position = index + 1;
          const points = category === 'sprint' ? rider.total_sprint_points : rider.total_climb_points;
          
          return (
            <Card
              key={rider.athlete_id}
              className={cn(
                'transition-all duration-200 hover:shadow-md',
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
                    <h3 className="font-semibold text-foreground">{rider.athlete_name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge 
                        variant="secondary" 
                        className="text-xs"
                      >
                        {rider.gender === 'M' ? 'Men' : 'Women'}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    {points}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    points
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredData.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">
              No riders found for the selected filters.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}