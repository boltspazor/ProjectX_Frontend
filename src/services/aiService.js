import { api } from '../utils/httpClient';
import { API_ENDPOINTS } from '../config/api';

/**
 * AI Service
 */
export const aiService = {
  /**
   * Get credit costs for AI features
   */
  async getCreditCosts() {
    try {
      const response = await api.get(API_ENDPOINTS.AI.CREDIT_COSTS);
      return response.success ? response.data : {};
    } catch (error) {
      console.error('Get credit costs error:', error);
      throw error;
    }
  },

  /**
   * Generate image
   */
  async generateImage(prompt, options = {}) {
    try {
      const response = await api.post(API_ENDPOINTS.AI.GENERATE_IMAGE, { prompt, ...options });
      return response.success ? response.data : null;
    } catch (error) {
      console.error('Generate image error:', error);
      throw error;
    }
  },

  /**
   * Generate caption
   */
  async generateCaption(imageUrl, context = '') {
    try {
      const response = await api.post(API_ENDPOINTS.AI.GENERATE_CAPTION, { imageUrl, context });
      return response.success ? response.data : null;
    } catch (error) {
      console.error('Generate caption error:', error);
      throw error;
    }
  },

  /**
   * Generate bio
   */
  async generateBio(description) {
    try {
      const response = await api.post(API_ENDPOINTS.AI.GENERATE_BIO, { description });
      return response.success ? response.data : null;
    } catch (error) {
      console.error('Generate bio error:', error);
      throw error;
    }
  },

  /**
   * Generate theme
   */
  async generateTheme(themePrompt) {
    try {
      const response = await api.post(API_ENDPOINTS.AI.GENERATE_THEME, themePrompt);
      return response.success ? response.data : null;
    } catch (error) {
      console.error('Generate theme error:', error);
      throw error;
    }
  },

  /**
   * Generate avatar
   */
  async generateAvatar(avatarConfig) {
    try {
      const response = await api.post(API_ENDPOINTS.AI.GENERATE_AVATAR, avatarConfig);
      return response.success ? response.data : null;
    } catch (error) {
      console.error('Generate avatar error:', error);
      throw error;
    }
  },

  /**
   * Generate community icon
   */
  async generateCommunityIcon(name, description) {
    try {
      const response = await api.post(API_ENDPOINTS.AI.GENERATE_COMMUNITY_ICON, { name, description });
      return response.success ? response.data : null;
    } catch (error) {
      console.error('Generate community icon error:', error);
      throw error;
    }
  },
};
