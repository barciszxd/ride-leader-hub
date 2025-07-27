import { Challenge, Classification, Result, Athlete } from '@/types/leaderboard';

export const mockAthletes: Athlete[] = [
  { id: '1', name: 'Alex Johnson', gender: 'M'},
  { id: '2', name: 'Sarah Miller', gender: 'F'},
  { id: '3', name: 'Mike Rodriguez', gender: 'M'},
  { id: '4', name: 'Emma Wilson', gender: 'F'},
  { id: '5', name: 'David Chen', gender: 'M'},
  { id: '6', name: 'Lisa Thompson', gender: 'F'},
  { id: '7', name: 'Chris Anderson', gender: 'M'},
  { id: '8', name: 'Rachel Green', gender: 'F'},
];

export const mockChallenges: Challenge[] = [
  {
    id: '1',
    name: 'Spring Sprint Challenge',
    start_date: '2024-03-01',
    end_date: '2024-03-15',
    status: 'completed',
    sprint_segment: {
      id: 's1',
      name: 'Main Street Sprint',
      type: 'sprint',
      strava_segment_id: '12345',
      distance: 800,
    },
    climb_segment: {
      id: 'c1',
      name: 'Hill Climb Challenge',
      type: 'climb',
      strava_segment_id: '12346',
      distance: 2400,
      elevation_gain: 180,
    },
  },
  {
    id: '2',
    name: 'Valley Challenge',
    start_date: '2024-03-16',
    end_date: '2024-03-30',
    status: 'completed',
    sprint_segment: {
      id: 's2',
      name: 'Valley Road Sprint',
      type: 'sprint',
      strava_segment_id: '12347',
      distance: 1200,
    },
    climb_segment: {
      id: 'c2',
      name: 'Valley Climb',
      type: 'climb',
      strava_segment_id: '12348',
      distance: 3200,
      elevation_gain: 250,
    },
  },
  {
    id: '3',
    name: 'Easter Classic',
    start_date: '2024-04-01',
    end_date: '2024-04-15',
    status: 'active',
    sprint_segment: {
      id: 's3',
      name: 'Easter Sprint',
      type: 'sprint',
      strava_segment_id: '12349',
      distance: 600,
    },
    climb_segment: {
      id: 'c3',
      name: 'Easter Hill',
      type: 'climb',
      strava_segment_id: '12350',
      distance: 1800,
      elevation_gain: 120,
    },
  },
];

export const mockClassification: Classification[] = [
  { rider_id: '1', rider_name: 'Alex Johnson', gender: 'M', total_sprint_points: 85, total_climb_points: 72},
  { rider_id: '3', rider_name: 'Mike Rodriguez', gender: 'M', total_sprint_points: 78, total_climb_points: 88 },
  { rider_id: '5', rider_name: 'David Chen', gender: 'M', total_sprint_points: 71, total_climb_points: 79 },
  { rider_id: '7', rider_name: 'Chris Anderson', gender: 'M', total_sprint_points: 65, total_climb_points: 65 },
  { rider_id: '2', rider_name: 'Sarah Miller', gender: 'F', total_sprint_points: 92, total_climb_points: 85 },
  { rider_id: '4', rider_name: 'Emma Wilson', gender: 'F', total_sprint_points: 88, total_climb_points: 90 },
  { rider_id: '6', rider_name: 'Lisa Thompson', gender: 'F', total_sprint_points: 75, total_climb_points: 78 },
  { rider_id: '8', rider_name: 'Rachel Green', gender: 'F', total_sprint_points: 68, total_climb_points: 71 },
];

export const mockResults: Record<string, Result[]> = {
  '1': [
    { id: 'r1', rider_id: '1', rider_name: 'Alex Johnson', challenge_id: '1', segment_id: 's1', segment_type: 'sprint', time: 78, points: 20, position: 1, recorded_at: '2024-03-10T10:30:00Z' },
    { id: 'r2', rider_id: '3', rider_name: 'Mike Rodriguez', challenge_id: '1', segment_id: 's1', segment_type: 'sprint', time: 82, points: 17, position: 2, recorded_at: '2024-03-11T14:20:00Z' },
    { id: 'r3', rider_id: '5', rider_name: 'David Chen', challenge_id: '1', segment_id: 's1', segment_type: 'sprint', time: 85, points: 15, position: 3, recorded_at: '2024-03-12T16:45:00Z' },
    { id: 'r4', rider_id: '3', rider_name: 'Mike Rodriguez', challenge_id: '1', segment_id: 'c1', segment_type: 'climb', time: 420, points: 20, position: 1, recorded_at: '2024-03-11T14:30:00Z' },
    { id: 'r5', rider_id: '5', rider_name: 'David Chen', challenge_id: '1', segment_id: 'c1', segment_type: 'climb', time: 435, points: 17, position: 2, recorded_at: '2024-03-12T17:00:00Z' },
    { id: 'r6', rider_id: '1', rider_name: 'Alex Johnson', challenge_id: '1', segment_id: 'c1', segment_type: 'climb', time: 445, points: 15, position: 3, recorded_at: '2024-03-10T11:00:00Z' },
  ],
  '2': [
    { id: 'r7', rider_id: '2', rider_name: 'Sarah Miller', challenge_id: '2', segment_id: 's2', segment_type: 'sprint', time: 95, points: 20, position: 1, recorded_at: '2024-03-20T09:15:00Z' },
    { id: 'r8', rider_id: '4', rider_name: 'Emma Wilson', challenge_id: '2', segment_id: 's2', segment_type: 'sprint', time: 98, points: 17, position: 2, recorded_at: '2024-03-21T11:30:00Z' },
    { id: 'r9', rider_id: '6', rider_name: 'Lisa Thompson', challenge_id: '2', segment_id: 's2', segment_type: 'sprint', time: 102, points: 15, position: 3, recorded_at: '2024-03-22T15:20:00Z' },
    { id: 'r10', rider_id: '4', rider_name: 'Emma Wilson', challenge_id: '2', segment_id: 'c2', segment_type: 'climb', time: 580, points: 20, position: 1, recorded_at: '2024-03-21T12:00:00Z' },
    { id: 'r11', rider_id: '2', rider_name: 'Sarah Miller', challenge_id: '2', segment_id: 'c2', segment_type: 'climb', time: 590, points: 17, position: 2, recorded_at: '2024-03-20T09:45:00Z' },
    { id: 'r12', rider_id: '6', rider_name: 'Lisa Thompson', challenge_id: '2', segment_id: 'c2', segment_type: 'climb', time: 605, points: 15, position: 3, recorded_at: '2024-03-22T15:50:00Z' },
  ],
};