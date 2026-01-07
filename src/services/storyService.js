import { api } from '../utils/httpClient';
import { API_ENDPOINTS } from '../config/api';
import { USE_MOCK_API, mockApi } from '../mocks/mockApi';

/**
 * Story Service
 */
export const storyService = {
  /**
   * Get active stories
   */
  async getStories() {
    try {
      if (USE_MOCK_API) {
        const response = await mockApi.stories.getStories();
        return response.success ? response.data : [];
      }
      
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
      if (USE_MOCK_API) return await mockApi.stories.createStory(story);
      
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


