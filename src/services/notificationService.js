import { api } from '../utils/httpClient';
import { API_ENDPOINTS } from '../config/api';

/**
 * Notification Service
 */
export const notificationService = {
  /**
   * Get notifications
   */
  async getNotifications(page = 1, limit = 20) {
    try {
      const response = await api.get(API_ENDPOINTS.NOTIFICATIONS.LIST, { page, limit });
      return response.success ? response.data : { notifications: [], pagination: {} };
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
