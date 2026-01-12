import { api } from '../utils/httpClient';
import { API_ENDPOINTS } from '../config/api';

/**
 * Analytics Service
 */
export const analyticsService = {
  /**
   * Get user analytics
   */
  async getUserAnalytics() {
    try {
      const response = await api.get(API_ENDPOINTS.ANALYTICS.USER);
      return response.success ? response.data : null;
    } catch (error) {
      console.error('Get user analytics error:', error);
      throw error;
    }
  },

  /**
   * Get daily analytics (admin only)
   */
  async getDailyAnalytics(startDate, endDate) {
    try {
      const params = {};
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;
      
      const response = await api.get(API_ENDPOINTS.ANALYTICS.DAILY, params);
      return response.success ? response.data : null;
    } catch (error) {
      console.error('Get daily analytics error:', error);
      throw error;
    }
  },

  /**
   * Get engagement metrics
   */
  async getEngagementMetrics() {
    try {
      const response = await api.get(API_ENDPOINTS.ANALYTICS.ENGAGEMENT);
      return response.success ? response.data : null;
    } catch (error) {
      console.error('Get engagement metrics error:', error);
      throw error;
    }
  },

  /**
   * Log analytics event
   */
  async logEvent(event, data = {}) {
    try {
      const response = await api.post(API_ENDPOINTS.ANALYTICS.EVENTS, { event, data });
      return response.success ? response.data : null;
    } catch (error) {
      console.error('Log analytics event error:', error);
      throw error;
    }
  },

  /**
   * Get platform stats (admin only)
   */
  async getPlatformStats() {
    try {
      const response = await api.get(API_ENDPOINTS.ANALYTICS.PLATFORM);
      return response.success ? response.data : null;
    } catch (error) {
      console.error('Get platform stats error:', error);
      throw error;
    }
  },
};
