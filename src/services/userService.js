import { api } from '../utils/httpClient';
import { API_ENDPOINTS } from '../config/api';

/**
 * User Service
 */
export const userService = {
  /**
   * Search users
   */
  async searchUsers(query, limit = 10) {
    try {
      const response = await api.get(API_ENDPOINTS.USERS.SEARCH, { q: query, limit });
      return response.success ? response.data : [];
    } catch (error) {
      console.error('Search users error:', error);
      throw error;
    }
  },

  /**
   * Update user profile
   */
  async updateProfile(profileData) {
    try {
      const response = await api.put(API_ENDPOINTS.USERS.PROFILE, profileData);
      
      if (response.success && response.data) {
        // Update stored user data
        localStorage.setItem('user', JSON.stringify(response.data));
        return response.data;
      }
      
      return response;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  },

  /**
   * Get credits balance
   */
  async getCreditsBalance() {
    try {
      const response = await api.get(API_ENDPOINTS.USERS.CREDITS_BALANCE);
      return response.success ? response.data : { credits: 0 };
    } catch (error) {
      console.error('Get credits balance error:', error);
      throw error;
    }
  },

  /**
   * Get credit transactions
   */
  async getCreditTransactions(page = 1, limit = 20) {
    try {
      const response = await api.get(API_ENDPOINTS.USERS.CREDITS_TRANSACTIONS, { page, limit });
      return response.success ? response.data : { transactions: [], pagination: {} };
    } catch (error) {
      console.error('Get credit transactions error:', error);
      throw error;
    }
  },

  /**
   * Get user by username
   */
  async getUserByUsername(username) {
    try {
      const response = await api.get(API_ENDPOINTS.USERS.BY_USERNAME(username));
      return response.success ? response.data : null;
    } catch (error) {
      console.error('Get user by username error:', error);
      throw error;
    }
  },

  /**
   * Get user followers
   */
  async getUserFollowers(username, page = 1, limit = 20) {
    try {
      const response = await api.get(API_ENDPOINTS.USERS.FOLLOWERS(username), { page, limit });
      return response.success ? response.data : { followers: [], pagination: {} };
    } catch (error) {
      console.error('Get user followers error:', error);
      throw error;
    }
  },

  /**
   * Get user following
   */
  async getUserFollowing(username, page = 1, limit = 20) {
    try {
      const response = await api.get(API_ENDPOINTS.USERS.FOLLOWING(username), { page, limit });
      return response.success ? response.data : { following: [], pagination: {} };
    } catch (error) {
      console.error('Get user following error:', error);
      throw error;
    }
  },

  /**
   * Get user stats
   */
  async getUserStats(username) {
    try {
      const response = await api.get(API_ENDPOINTS.USERS.STATS(username));
      return response.success ? response.data : { posts: 0, followers: 0, following: 0 };
    } catch (error) {
      console.error('Get user stats error:', error);
      throw error;
    }
  },

  /**
   * Follow user
   */
  async followUser(userId) {
    try {
      const response = await api.post(API_ENDPOINTS.USERS.FOLLOW(userId));
      return response;
    } catch (error) {
      console.error('Follow user error:', error);
      throw error;
    }
  },

  /**
   * Unfollow user
   */
  async unfollowUser(userId) {
    try {
      const response = await api.delete(API_ENDPOINTS.USERS.UNFOLLOW(userId));
      return response;
    } catch (error) {
      console.error('Unfollow user error:', error);
      throw error;
    }
  },

  /**
   * Update user profile
   */
  async updateProfile(profileData) {
    try {
      const response = await api.put('/api/users/me', profileData);
      return response;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  },
};
