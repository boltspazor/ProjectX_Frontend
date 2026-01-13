import { api } from '../utils/httpClient';
import { API_ENDPOINTS } from '../config/api';

/**
 * Story Service
 */
export const storyService = {
  /**
   * Get active stories
   */
  async getStories() {
    try {
      const response = await api.get(API_ENDPOINTS.STORIES.LIST, {}, false);
      return response.success ? response.data?.stories || [] : [];
    } catch (error) {
      console.error('Get stories error:', error);
      throw error;
    }
  },

  /**
   * Create story
   */
  async createStory(story) {
    try {
      const response = await api.post(API_ENDPOINTS.STORIES.CREATE, story);
      return response.success ? response.data?.story || null : null;
    } catch (error) {
      console.error('Create story error:', error);
      throw error;
    }
  },

  /**
   * Mark story viewed
   */
  async markViewed(storyId) {
    try {
      const response = await api.post(API_ENDPOINTS.STORIES.VIEW(storyId), {});
      return response;
    } catch (error) {
      console.error('View story error:', error);
      throw error;
    }
  },
};


