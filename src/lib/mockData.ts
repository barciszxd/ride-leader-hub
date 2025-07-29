import { Challenge, Classification, Result, Athlete } from '@/types/leaderboard';
import { api } from './api';

// API function to get athletes
export const getAthletes = async (): Promise<Athlete[]> => {
  return await api.getAthletes();
};

// API function to get challenges
export const getChallenges = async (): Promise<Challenge[]> => {
  return await api.getChallenges();
};

// API function to get challenge results
export const getChallengeResults = async (
  challengeId: string,
  segmentType?: 'sprint' | 'climb',
  gender?: 'M' | 'F'
): Promise<Result[]> => {
  return await api.getChallengeResults(challengeId, segmentType, gender);
};

// Keep mockClassification as requested
export const mockClassification: Classification[] = [
  { athlete_id: '1', athlete_name: 'Alex Johnson', gender: 'M', total_sprint_points: 85, total_climb_points: 72},
  { athlete_id: '3', athlete_name: 'Mike Rodriguez', gender: 'M', total_sprint_points: 78, total_climb_points: 88 },
  { athlete_id: '5', athlete_name: 'David Chen', gender: 'M', total_sprint_points: 71, total_climb_points: 79 },
  { athlete_id: '7', athlete_name: 'Chris Anderson', gender: 'M', total_sprint_points: 65, total_climb_points: 65 },
  { athlete_id: '2', athlete_name: 'Sarah Miller', gender: 'F', total_sprint_points: 92, total_climb_points: 85 },
  { athlete_id: '4', athlete_name: 'Emma Wilson', gender: 'F', total_sprint_points: 88, total_climb_points: 90 },
  { athlete_id: '6', athlete_name: 'Lisa Thompson', gender: 'F', total_sprint_points: 75, total_climb_points: 78 },
  { athlete_id: '8', athlete_name: 'Rachel Green', gender: 'F', total_sprint_points: 68, total_climb_points: 71 },
];