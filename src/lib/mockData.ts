import { Challenge, Classification, Result, Rider } from '@/types/leaderboard';

export const mockRiders: Rider[] = [
  { id: '1', name: 'Alex Johnson', gender: 'men', strava_id: 'alex_j' },
  { id: '2', name: 'Sarah Miller', gender: 'women', strava_id: 'sarah_m' },
  { id: '3', name: 'Mike Rodriguez', gender: 'men', strava_id: 'mike_r' },
  { id: '4', name: 'Emma Wilson', gender: 'women', strava_id: 'emma_w' },
  { id: '5', name: 'David Chen', gender: 'men', strava_id: 'david_c' },
  { id: '6', name: 'Lisa Thompson', gender: 'women', strava_id: 'lisa_t' },
  { id: '7', name: 'Chris Anderson', gender: 'men', strava_id: 'chris_a' },
  { id: '8', name: 'Rachel Green', gender: 'women', strava_id: 'rachel_g' },
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
  { rider_id: '1', rider_name: 'Alex Johnson', gender: 'men', total_sprint_points: 85, total_climb_points: 72, sprint_position: 1, climb_position: 3 },
  { rider_id: '3', rider_name: 'Mike Rodriguez', gender: 'men', total_sprint_points: 78, total_climb_points: 88, sprint_position: 2, climb_position: 1 },
  { rider_id: '5', rider_name: 'David Chen', gender: 'men', total_sprint_points: 71, total_climb_points: 79, sprint_position: 3, climb_position: 2 },
  { rider_id: '7', rider_name: 'Chris Anderson', gender: 'men', total_sprint_points: 65, total_climb_points: 65, sprint_position: 4, climb_position: 4 },
  { rider_id: '2', rider_name: 'Sarah Miller', gender: 'women', total_sprint_points: 92, total_climb_points: 85, sprint_position: 1, climb_position: 2 },
  { rider_id: '4', rider_name: 'Emma Wilson', gender: 'women', total_sprint_points: 88, total_climb_points: 90, sprint_position: 2, climb_position: 1 },
  { rider_id: '6', rider_name: 'Lisa Thompson', gender: 'women', total_sprint_points: 75, total_climb_points: 78, sprint_position: 3, climb_position: 3 },
  { rider_id: '8', rider_name: 'Rachel Green', gender: 'women', total_sprint_points: 68, total_climb_points: 71, sprint_position: 4, climb_position: 4 },
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