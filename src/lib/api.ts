import { Challenge, Classification, Result, Athlete } from '@/types/leaderboard';

// API Base URL - should be configured via environment variables in production
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://cora-leaderboard.onrender.com/api';

class LeaderboardAPI {
  private async request<T>(endpoint: string): Promise<T> {
    try {
      // credentials: 'include' sends the HTTP-only auth_session cookie with
      // every request, even when the frontend and backend are on different origins.
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        credentials: 'include',
      });
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
    
    // credentials: 'include' is required so the browser stores the HTTP-only
    // auth_session cookie that the backend sets in this response.
    const response = await fetch(`${API_BASE_URL}/exchange_token?${params.toString()}`, {
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error(`Token exchange failed: ${response.status}`);
    }

    return await response.json();
  }

  // Clear all session cookies so the user is considered logged out.
  // The HTTP-only auth_session cookie cannot be deleted by JavaScript, so
  // logout is handled solely by clearing the client-visible profile_medium
  // cookie and reloading.  The auth_session cookie will naturally expire
  // after its max-age (1 day) or can be removed by a future /logout route.
  logout(): void {
    document.cookie = 'profile_medium=; max-age=0; path=/';
  }

  /**
   * Permanently sign the authenticated athlete out of the leaderboard by
   * calling DELETE /me on the backend.
   *
   * @param hard - When true, the athlete's record and all efforts are deleted
   *   (hard sign-out).  When false (default), only the stored Strava
   *   credentials are revoked while historical data is preserved.
   *
   * Clears the client-side profile cookie regardless of the mode so that the
   * browser reflects the logged-out state after the page reloads.
   */
  async signOut(hard: boolean): Promise<{ success: boolean; message: string }> {
    const url = `${API_BASE_URL}/me${hard ? '?hard=true' : ''}`;
    const response = await fetch(url, {
      method:      'DELETE',
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error ?? `Sign-out failed: ${response.status}`);
    }

    // Clear the client-visible profile cookie so the UI switches back to the
    // logged-out state when the page reloads.
    document.cookie = 'profile_medium=; max-age=0; path=/';

    return data;
  }
}

export const api = new LeaderboardAPI();

// Export convenience functions for cleaner imports
export const getChallenges = async (): Promise<Challenge[]> => {
  return await api.getChallenges();
};

export const getClassification = async (gender?: 'M' | 'F'): Promise<Classification[]> => {
  return await api.getClassification(gender);
};

export const getAthletes = async (): Promise<Athlete[]> => {
  return await api.getAthletes();
};

export const getChallengeResults = async (
  challengeId: string,
  segmentType?: 'sprint' | 'climb',
  gender?: 'M' | 'F'
): Promise<Result[]> => {
  return await api.getChallengeResults(challengeId, segmentType, gender);
};