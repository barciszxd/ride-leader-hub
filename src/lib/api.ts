import { Challenge, Classification, Result, Athlete } from '@/types/leaderboard';

// API Base URL - should be configured via environment variables in production
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://cora-leaderboard.onrender.com/api';

class LeaderboardAPI {
  private async request<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // General Classification endpoints
  async getClassification(gender?: 'M' | 'F'): Promise<Classification[]> {
    const params = gender ? `?gender=${gender}` : '';
    return this.request<Classification[]>(`/classification${params}`);
  }

  // Challenge endpoints
  async getChallenges(): Promise<Challenge[]> {
    return this.request<Challenge[]>('/challenges');
  }

  async getChallenge(challengeId: string): Promise<Challenge> {
    return this.request<Challenge>(`/challenges/${challengeId}`);
  }

  async getChallengeResults(
    challengeId: string,
    segmentType?: 'sprint' | 'climb',
    gender?: 'M' | 'F'
  ): Promise<Result[]> {
    const params = new URLSearchParams();
    if (segmentType) params.append('segment_type', segmentType);
    if (gender) params.append('gender', gender);
    
    const queryString = params.toString();
    const endpoint = `/challenges/${challengeId}/results${queryString ? `?${queryString}` : ''}`;
    console.log(`Fetching challenge results from: ${endpoint}`);
    return this.request<Result[]>(endpoint);
  }

  // Athlete endpoints
  async getAthletes(): Promise<Athlete[]> {
    return this.request<Athlete[]>('/athletes');
  }

  // Token exchange endpoint
  async exchangeTokenWithStrava(code: string, scope: string): Promise<{ 
    success: boolean; 
    message: string; 
    athlete_created?: boolean; 
    athlete?: { firstname: string; [key: string]: any } 
  }> {
    const params = new URLSearchParams();
    params.append('code', code);
    params.append('scope', scope);
    
    const response = await fetch(`${API_BASE_URL}/exchange_token?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`Token exchange failed: ${response.status}`);
    }

    return await response.json();
  }
}

export const api = new LeaderboardAPI();