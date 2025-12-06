import { api } from '../utils/httpClient';
import { API_ENDPOINTS } from '../config/api';

/**
 * Search Service
 */
export const searchService = {
  /**
   * Universal search
   */
  async search(query, type = 'all', page = 1, limit = 20) {
    try {
      const response = await api.get(API_ENDPOINTS.SEARCH.UNIVERSAL, { q: query, type, page, limit });
      return response.success ? response.data : {};
    } catch (error) {
      console.error('Search error:', error);
      throw error;
    }
  },

  /**
   * Get trending hashtags
   */
  async getTrendingHashtags(page = 1, limit = 10) {
    try {
      const response = await api.get(API_ENDPOINTS.SEARCH.TRENDING_HASHTAGS, { page, limit });
      return response.success ? response.data : { hashtags: [], pagination: {} };
    } catch (error) {
      console.error('Get trending hashtags error:', error);
      throw error;
    }
  },

  /**
   * Search by hashtag
   */
  async searchByHashtag(hashtag, page = 1, limit = 20) {
    try {
      const response = await api.get(API_ENDPOINTS.SEARCH.BY_HASHTAG(hashtag), { page, limit });
      return response.success ? response.data : { posts: [], pagination: {} };
    } catch (error) {
      console.error('Search by hashtag error:', error);
      throw error;
    }
  },

  /**
   * Get AI-generated posts
   */
  async getAIPosts(page = 1, limit = 20) {
    try {
      const response = await api.get(API_ENDPOINTS.SEARCH.AI_POSTS, { page, limit });
      return response.success ? response.data : { posts: [], pagination: {} };
    } catch (error) {
      console.error('Get AI posts error:', error);
      throw error;
    }
  },
};
