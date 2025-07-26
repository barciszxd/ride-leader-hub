import { Challenge, Classification, Result, Rider } from '@/types/leaderboard';

// API Base URL - should be configured via environment variables in production
const API_BASE_URL = process.env.VITE_API_URL || 'https://api.cyclingclub.com';

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
  async getClassification(gender?: 'men' | 'women'): Promise<Classification[]> {
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
    gender?: 'men' | 'women'
  ): Promise<Result[]> {
    const params = new URLSearchParams();
    if (segmentType) params.append('segment_type', segmentType);
    if (gender) params.append('gender', gender);
    
    const queryString = params.toString();
    const endpoint = `/challenges/${challengeId}/results${queryString ? `?${queryString}` : ''}`;
    
    return this.request<Result[]>(endpoint);
  }

  // Rider endpoints
  async getRiders(): Promise<Rider[]> {
    return this.request<Rider[]>('/riders');
  }

  async joinLeaderboard(riderData: Omit<Rider, 'id'>): Promise<{ rider: Rider; strava_auth_url?: string }> {
    const response = await fetch(`${API_BASE_URL}/riders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(riderData),
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
      body: JSON.stringify({ rider_id: riderId, code }),
    });

    if (!response.ok) {
      throw new Error(`STRAVA authorization failed: ${response.status}`);
    }

    return await response.json();
  }
}

export const api = new LeaderboardAPI();