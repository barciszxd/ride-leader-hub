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

  async joinLeaderboard(athleteData: Omit<Athlete, 'id'>): Promise<{ athlete: Athlete; strava_auth_url?: string }> {
    const response = await fetch(`${API_BASE_URL}/athletes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(athleteData),
    });

    if (!response.ok) {
      throw new Error(`Failed to join leaderboard: ${response.status}`);
    }

    return await response.json();
  }

  // STRAVA integration endpoints
  async authorizeStrava(riderId: string, code: string): Promise<{ success: boolean }> {
    const response = await fetch(`${API_BASE_URL}/strava/authorize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ athlete_id: riderId, code }),
    });

    if (!response.ok) {
      throw new Error(`STRAVA authorization failed: ${response.status}`);
    }

    return await response.json();
  }
}

export const api = new LeaderboardAPI();