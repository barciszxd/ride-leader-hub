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

// API function to get classification
export const getClassification = async (gender?: 'M' | 'F'): Promise<Classification[]> => {
  return await api.getClassification(gender);
};