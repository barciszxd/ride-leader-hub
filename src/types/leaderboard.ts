export interface Athlete {
  id: string;
  name: string;
  gender: 'men' | 'women';
  strava_id?: string;
}

export interface Challenge {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  sprint_segment: Segment;
  climb_segment: Segment;
  status: 'upcoming' | 'active' | 'completed';
}

export interface Segment {
  id: string;
  name: string;
  type: 'sprint' | 'climb';
  strava_segment_id: string;
  distance: number; // in meters
  elevation_gain?: number; // in meters
}

export interface Result {
  id: string;
  rider_id: string;
  rider_name: string;
  challenge_id: string;
  segment_id: string;
  segment_type: 'sprint' | 'climb';
  time: number; // in seconds
  points: number;
  position: number;
  recorded_at: string;
}

export interface Classification {
  rider_id: string;
  rider_name: string;
  gender: 'men' | 'women';
  total_sprint_points: number;
  total_climb_points: number;
  sprint_position: number;
  climb_position: number;
}

export type FilterCategory = 'sprint' | 'climb';
export type FilterGender = 'men' | 'women' | 'all';
export type ViewType = 'classification' | 'challenges';