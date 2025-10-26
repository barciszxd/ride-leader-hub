export interface Athlete {
  id: string;
  name: string;
  gender: 'M' | 'F';
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
  distance: number; // in meters
  elevation_gain?: number; // in meters
}

export interface Result {
  id: string;
  activity_id: string;
  athlete_id: string;
  athlete_name: string;
  athlete_gender: 'M' | 'F';
  challenge_id: string;
  segment_id: string;
  segment_type: 'sprint' | 'climb';
  time: number; // in seconds
  points: number;
  position: number;
  recorded_at: string;
}

export interface Classification {
  athlete_id: string;
  athlete_name: string;
  gender: 'M' | 'F';
  total_sprint_points: number;
  total_climb_points: number;
}

export type FilterCategory = 'sprint' | 'climb';
export type FilterGender = 'M' | 'F';
export type ViewType = 'classification' | 'challenges';