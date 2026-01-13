import { api } from '../utils/httpClient';
import { API_ENDPOINTS } from '../config/api';

/**
 * Notification Service
 */
export const notificationService = {
  /**
   * Get notifications
   */
  async getNotifications(limit = 20, skip = 0, unreadOnly = false) {
    try {
      // Backend expects skip-based pagination and unreadOnly as query param
      const response = await api.get(API_ENDPOINTS.NOTIFICATIONS.LIST, { limit, skip, unreadOnly });
      return response.success ? response.data.notifications : [];
    } catch (error) {
      console.error('Get notifications error:', error);
      throw error;
    }
  },

  /**
   * Get unread count
   */
  async getUnreadCount() {
    try {
      const response = await api.get(API_ENDPOINTS.NOTIFICATIONS.UNREAD_COUNT);
      return response.success ? response.data : { count: 0 };
    } catch (error) {
      console.error('Get unread count error:', error);
      throw error;
    }
  },

  /**
   * Mark notification as read
   */
  async markAsRead(notificationId) {
    try {
      const response = await api.put(API_ENDPOINTS.NOTIFICATIONS.MARK_READ(notificationId));
      return response;
    } catch (error) {
      console.error('Mark notification as read error:', error);
      throw error;
    }
  },

  /**
   * Mark all as read
   */
  async markAllAsRead() {
    try {
      const response = await api.put(API_ENDPOINTS.NOTIFICATIONS.MARK_ALL_READ);
      return response;
    } catch (error) {
      console.error('Mark all as read error:', error);
      throw error;
    }
  },

  /**
   * Delete notification
   */
  async deleteNotification(notificationId) {
    try {
      const response = await api.delete(API_ENDPOINTS.NOTIFICATIONS.DELETE(notificationId));
      return response;
    } catch (error) {
      console.error('Delete notification error:', error);
      throw error;
    }
  },
};
