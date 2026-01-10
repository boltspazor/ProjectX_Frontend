import { api } from '../utils/httpClient';
import { API_ENDPOINTS } from '../config/api';
import { USE_MOCK_API, mockApi } from '../mocks/mockApi';

/**
 * Community Service
 */
export const communityService = {
  /**
   * Get public communities
   */
  async getPublicCommunities(limit = 20) {
    try {
      if (USE_MOCK_API) {
        const response = await mockApi.communities.getPublicCommunities(limit);
        return response.success ? response.data : [];
      }
      
      const response = await api.get(API_ENDPOINTS.COMMUNITIES.PUBLIC, { limit });
      return response.success ? response.data : [];
    } catch (error) {
      console.error('Get public communities error:', error);
      throw error;
    }
  },

  /**
   * Get user's communities
   */
  async getUserCommunities(limit = 20) {
    try {
      if (USE_MOCK_API) {
        const response = await mockApi.communities.getUserCommunities(limit);
        return response.success ? response.data : [];
      }
      
      const response = await api.get(API_ENDPOINTS.COMMUNITIES.USER_COMMUNITIES, { limit });
      return response.success ? response.data : [];
    } catch (error) {
      console.error('Get user communities error:', error);
      throw error;
    }
  },

  /**
   * Create community
   */
  async createCommunity(communityData) {
    try {
      if (USE_MOCK_API) return await mockApi.communities.createCommunity(communityData);
      
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
      if (USE_MOCK_API) {
        const response = await mockApi.communities.getCommunityBySlug(slug);
        return response.success ? response.data : null;
      }
      
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
      if (USE_MOCK_API) {
        const response = await mockApi.communities.getCommunityPosts(communityId, limit, page);
        return response.success ? response.data : { posts: [], pagination: {} };
      }
      
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
