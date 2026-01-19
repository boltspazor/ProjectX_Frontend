import { api } from '../utils/httpClient';
import { API_ENDPOINTS } from '../config/api';

/**
 * Community Service
 */
export const communityService = {
  /**
   * Get public communities
   */
  async getPublicCommunities(limit = 20) {
    try {
      const response = await api.get(API_ENDPOINTS.COMMUNITIES.PUBLIC, { limit });
      if (response.success && response.data) {
        // Handle nested structure: response.data.communities
        if (Array.isArray(response.data.communities)) {
          return response.data.communities;
        }
        // Handle direct array
        if (Array.isArray(response.data)) {
          return response.data;
        }
      }
      return [];
    } catch (error) {
      console.error('Get public communities error:', error);
      return []; // Return empty array instead of throwing
    }
  },

  /**
   * Get user's communities
   */
  async getUserCommunities(limit = 20) {
    try {
      const response = await api.get(API_ENDPOINTS.COMMUNITIES.USER_COMMUNITIES, { limit });
      if (response.success && response.data) {
        // Handle nested structure: response.data.communities
        if (Array.isArray(response.data.communities)) {
          return response.data.communities;
        }
        // Handle direct array
        if (Array.isArray(response.data)) {
          return response.data;
        }
      }
      return [];
    } catch (error) {
      console.error('Get user communities error:', error);
      return []; // Return empty array instead of throwing to prevent crashes
    }
  },

  /**
   * Create community
   */
  async createCommunity(communityData) {
    try {
      const response = await api.post(API_ENDPOINTS.COMMUNITIES.CREATE, communityData);
      return response.success ? response.data : null;
    } catch (error) {
      console.error('Create community error:', error);
      throw error;
    }
  },

  /**
   * Get community by slug
   */
  async getCommunityBySlug(slug) {
    try {
      const response = await api.get(API_ENDPOINTS.COMMUNITIES.BY_SLUG(slug));
      return response.success ? response.data : null;
    } catch (error) {
      console.error('Get community by slug error:', error);
      throw error;
    }
  },

  /**
   * Get community posts
   */
  async getCommunityPosts(communityId, limit = 10, page = 1) {
    try {
      const response = await api.get(API_ENDPOINTS.COMMUNITIES.POSTS(communityId), { limit, page });
      return response.success ? response.data : { posts: [], pagination: {} };
    } catch (error) {
      console.error('Get community posts error:', error);
      throw error;
    }
  },

  /**
   * Update community
   */
  async updateCommunity(communityId, communityData) {
    try {
      const response = await api.put(API_ENDPOINTS.COMMUNITIES.UPDATE(communityId), communityData);
      return response.success ? response.data : null;
    } catch (error) {
      console.error('Update community error:', error);
      throw error;
    }
  },

  /**
   * Delete community
   */
  async deleteCommunity(communityId) {
    try {
      const response = await api.delete(API_ENDPOINTS.COMMUNITIES.DELETE(communityId));
      return response;
    } catch (error) {
      console.error('Delete community error:', error);
      throw error;
    }
  },

  /**
   * Join community
   */
  async joinCommunity(communityId) {
    try {
      const response = await api.post(API_ENDPOINTS.COMMUNITIES.JOIN(communityId));
      return response;
    } catch (error) {
      console.error('Join community error:', error);
      throw error;
    }
  },

  /**
   * Leave community
   */
  async leaveCommunity(communityId) {
    try {
      const response = await api.post(API_ENDPOINTS.COMMUNITIES.LEAVE(communityId));
      return response;
    } catch (error) {
      console.error('Leave community error:', error);
      throw error;
    }
  },

  /**
   * Add moderator
   */
  async addModerator(communityId, userId) {
    try {
      const response = await api.post(API_ENDPOINTS.COMMUNITIES.ADD_MODERATOR(communityId, userId));
      return response;
    } catch (error) {
      console.error('Add moderator error:', error);
      throw error;
    }
  },

  /**
   * Ban user from community
   */
  async banUser(communityId, userId) {
    try {
      const response = await api.post(API_ENDPOINTS.COMMUNITIES.BAN_USER(communityId, userId));
      return response;
    } catch (error) {
      console.error('Ban user error:', error);
      throw error;
    }
  },
};
